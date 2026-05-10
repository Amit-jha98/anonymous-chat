"use client";

import { MAX_MESSAGE_LENGTH } from "@/app/lib/constants";
import type {
  ChatMessage,
  ChatStatus,
  DisconnectPayload,
  MatchPayload,
  ReceiveMessagePayload,
  WaitingPayload,
} from "@/app/types/chat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";

interface ServerToClientEvents {
  waiting: (payload?: WaitingPayload) => void;
  matched: (payload: MatchPayload) => void;
  "receive-message": (payload: ReceiveMessagePayload) => void;
  "stranger-typing": () => void;
  "stranger-stop-typing": () => void;
  "stranger-disconnected": (payload?: DisconnectPayload) => void;
  "system-message": (message: string) => void;
}

interface ClientToServerEvents {
  "find-partner": () => void;
  "send-message": (payload: { text: string }) => void;
  typing: () => void;
  "stop-typing": () => void;
  "skip-chat": () => void;
  "disconnect-chat": () => void;
}

type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChatSocket() {
  const socketRef = useRef<ChatSocket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTypingAtRef = useRef(0);
  const endingRef = useRef(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [strangerTyping, setStrangerTyping] = useState(false);
  const [connected, setConnected] = useState(false);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearTypingTimer = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, []);

  const findPartner = useCallback(() => {
    endingRef.current = false;
    setMessages([]);
    setStrangerTyping(false);
    setStatus("waiting");

    const socket = socketRef.current;
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
      return;
    }

    socket.emit("find-partner");
  }, []);

  useEffect(() => {
    const socket: ChatSocket = io({
      autoConnect: true,
      path: "/socket.io",
      reconnection: true,
      reconnectionDelay: 700,
      reconnectionDelayMax: 4000,
      timeout: 8000,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setStatus("waiting");
      socket.emit("find-partner");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      setStrangerTyping(false);
      if (!endingRef.current) setStatus("disconnected");
    });

    socket.io.on("reconnect_attempt", () => {
      setStatus("waiting");
    });

    socket.on("waiting", (payload) => {
      setStatus("waiting");
      setStrangerTyping(false);

      if (payload?.message) {
        toast.info(payload.message);
      }
    });

    socket.on("matched", () => {
      endingRef.current = false;
      setMessages([]);
      setStatus("connected");
      setStrangerTyping(false);
      toast.success("You are now chatting with a stranger");
    });

    socket.on("receive-message", (payload) => {
      addMessage({
        id: createMessageId(),
        sender: "stranger",
        text: payload.text,
        timestamp: payload.timestamp,
      });
    });

    socket.on("stranger-typing", () => {
      setStrangerTyping(true);
    });

    socket.on("stranger-stop-typing", () => {
      setStrangerTyping(false);
    });

    socket.on("stranger-disconnected", (payload) => {
      setStrangerTyping(false);

      if (endingRef.current) {
        endingRef.current = false;
        return;
      }

      setMessages([]);
      setStatus("disconnected");
      toast.info(payload?.reason || "Stranger disconnected");
    });

    socket.on("system-message", (message) => {
      toast.warning(message);
    });

    socket.on("connect_error", () => {
      setConnected(false);
      setStatus("disconnected");
      toast.error("Realtime server is unavailable. Retrying...");
    });

    return () => {
      endingRef.current = true;
      clearTypingTimer();
      socket.emit("disconnect-chat");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [addMessage, clearTypingTimer]);

  const sendMessage = useCallback(
    (text: string) => {
      const sanitizedText = text.trim();
      const socket = socketRef.current;
      if (status !== "connected" || !sanitizedText || !socket?.connected) return;

      if (sanitizedText.length > MAX_MESSAGE_LENGTH) {
        toast.warning(`Message is too long. Max ${MAX_MESSAGE_LENGTH} chars.`);
        return;
      }

      addMessage({
        id: createMessageId(),
        sender: "you",
        text: sanitizedText,
        timestamp: Date.now(),
      });

      socket.emit("send-message", { text: sanitizedText });
      socket.emit("stop-typing");
      clearTypingTimer();
    },
    [addMessage, clearTypingTimer, status],
  );

  const startTyping = useCallback(() => {
    const socket = socketRef.current;
    if (status !== "connected" || !socket?.connected) return;

    const now = Date.now();
    if (now - lastTypingAtRef.current > 900) {
      lastTypingAtRef.current = now;
      socket.emit("typing");
    }

    clearTypingTimer();
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing");
    }, 1200);
  }, [clearTypingTimer, status]);

  const stopTyping = useCallback(() => {
    const socket = socketRef.current;
    if (!socket?.connected) return;

    clearTypingTimer();
    socket.emit("stop-typing");
  }, [clearTypingTimer]);

  const skipChat = useCallback(() => {
    const socket = socketRef.current;
    endingRef.current = false;
    setStatus("waiting");
    setMessages([]);
    setStrangerTyping(false);

    if (!socket?.connected) {
      socket?.connect();
      return;
    }

    socket.emit("skip-chat");
  }, []);

  const endChat = useCallback(() => {
    const socket = socketRef.current;
    endingRef.current = true;
    clearTypingTimer();
    setStatus("disconnected");
    setMessages([]);
    setStrangerTyping(false);

    if (socket?.connected) {
      socket.emit("disconnect-chat");
    }
  }, [clearTypingTimer]);

  return useMemo(
    () => ({
      connected,
      messages,
      status,
      strangerTyping,
      findPartner,
      sendMessage,
      startTyping,
      stopTyping,
      skipChat,
      endChat,
    }),
    [
      connected,
      messages,
      status,
      strangerTyping,
      findPartner,
      sendMessage,
      startTyping,
      stopTyping,
      skipChat,
      endChat,
    ],
  );
}
