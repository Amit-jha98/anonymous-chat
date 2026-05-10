import { SocketRateLimiter } from "../middleware/rate-limit";
import { Matchmaker } from "../matchmaking/matchmaker";
import { cleanMessage } from "../utils/filter";
import type { Server, Socket } from "socket.io";
import type {
  DisconnectPayload,
  MatchPayload,
  ReceiveMessagePayload,
  SendMessagePayload,
  WaitingPayload,
} from "../types/socket";

const limiter = new SocketRateLimiter();

function ipAddress(socket: Socket) {
  const forwarded = socket.handshake.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return socket.handshake.address || "unknown";
}

export function registerChatHandlers(io: Server) {
  const matchmaker = new Matchmaker();

  const emitWaiting = (socket: Socket, message?: string) => {
    const payload: WaitingPayload = { message };
    socket.emit("waiting", payload);
  };

  const notifyMatched = (socketA: Socket, socketB: Socket, roomId: string) => {
    const payload: MatchPayload = { roomId };
    socketA.join(roomId);
    socketB.join(roomId);
    socketA.emit("matched", payload);
    socketB.emit("matched", payload);
  };

  const placeInQueue = (socket: Socket) => {
    matchmaker.removeFromQueue(socket.id);
    const partnerId = matchmaker.popWaiting(socket.id);
    if (!partnerId) {
      matchmaker.enqueue(socket.id);
      emitWaiting(socket);
      return;
    }

    const partnerSocket = io.sockets.sockets.get(partnerId);
    if (!partnerSocket || !partnerSocket.connected) {
      matchmaker.enqueue(socket.id);
      emitWaiting(socket);
      return;
    }

    const roomId = matchmaker.createPair(socket.id, partnerSocket.id);
    notifyMatched(socket, partnerSocket, roomId);
  };

  const endPair = (socket: Socket, reason: string, requeueSelf = false, requeuePartner = false) => {
    const pair = matchmaker.breakPair(socket.id);
    if (!pair) {
      if (requeueSelf) placeInQueue(socket);
      return;
    }

    const partner = io.sockets.sockets.get(pair.partnerId);
    socket.leave(pair.roomId);
    partner?.leave(pair.roomId);

    const payload: DisconnectPayload = { reason };
    socket.emit("stranger-disconnected", payload);
    partner?.emit("stranger-disconnected", payload);

    if (requeueSelf) placeInQueue(socket);
    if (requeuePartner && partner?.connected) placeInQueue(partner);
  };

  io.on("connection", (socket) => {
    socket.on("find-partner", () => {
      const key = `${socket.id}:find-partner`;
      if (!limiter.allow(key, 4, 10000)) {
        socket.emit("system-message", "Please wait a moment before retrying.");
        return;
      }

      const ip = ipAddress(socket);
      if (matchmaker.inCooldown(ip)) {
        emitWaiting(socket, "Short cooldown active to prevent spam. Retrying...");
        return;
      }

      endPair(socket, "Session ended", false, false);
      placeInQueue(socket);
    });

    socket.on("send-message", (payload: SendMessagePayload) => {
      const msgKey = `${socket.id}:send-message`;
      if (!limiter.allow(msgKey, 45, 60000)) {
        socket.emit("system-message", "Too many messages. Slow down.");
        return;
      }

      const pair = matchmaker.getPair(socket.id);
      if (!pair) return;

      if (!payload?.text || !payload.text.trim()) return;
      if (!matchmaker.canSendMessage(socket.id)) {
        socket.emit("system-message", "Message rate limit reached.");
        return;
      }

      const text = cleanMessage(payload.text.trim()).slice(0, 320);
      const eventPayload: ReceiveMessagePayload = {
        text,
        timestamp: Date.now(),
      };

      io.to(pair.partnerId).emit("receive-message", eventPayload);
    });

    socket.on("typing", () => {
      const pair = matchmaker.getPair(socket.id);
      if (!pair) return;
      io.to(pair.partnerId).emit("stranger-typing");
    });

    socket.on("stop-typing", () => {
      const pair = matchmaker.getPair(socket.id);
      if (!pair) return;
      io.to(pair.partnerId).emit("stranger-stop-typing");
    });

    socket.on("skip-chat", () => {
      const ip = ipAddress(socket);
      matchmaker.setCooldown(ip, 2500);
      endPair(socket, "Stranger skipped", true, true);
    });

    socket.on("disconnect-chat", () => {
      endPair(socket, "Stranger ended the chat", false, true);
      matchmaker.removeFromQueue(socket.id);
    });

    socket.on("disconnect", () => {
      endPair(socket, "Stranger disconnected", false, true);
      limiter.clear(socket.id);
      matchmaker.clearSocket(socket.id);
    });
  });
}
