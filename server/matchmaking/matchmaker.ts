import { v4 as uuid } from "uuid";

interface PairInfo {
  partnerId: string;
  roomId: string;
}

export class Matchmaker {
  private queue: string[] = [];
  private pairBySocket = new Map<string, PairInfo>();
  private cooldownUntil = new Map<string, number>();
  private spamState = new Map<string, { lastAt: number; count: number; resetAt: number }>();

  enqueue(socketId: string) {
    if (this.pairBySocket.has(socketId)) return;
    if (!this.queue.includes(socketId)) {
      this.queue.push(socketId);
    }
  }

  removeFromQueue(socketId: string) {
    this.queue = this.queue.filter((id) => id !== socketId);
  }

  popWaiting(excludeId: string) {
    while (this.queue.length) {
      const id = this.queue.shift();
      if (!id || id === excludeId || this.pairBySocket.has(id)) continue;
      return id;
    }
    return null;
  }

  createPair(a: string, b: string) {
    const roomId = uuid();
    this.pairBySocket.set(a, { partnerId: b, roomId });
    this.pairBySocket.set(b, { partnerId: a, roomId });
    return roomId;
  }

  getPair(socketId: string) {
    return this.pairBySocket.get(socketId);
  }

  breakPair(socketId: string) {
    const pair = this.pairBySocket.get(socketId);
    if (!pair) return null;

    this.pairBySocket.delete(socketId);
    this.pairBySocket.delete(pair.partnerId);
    return pair;
  }

  clearSocket(socketId: string) {
    this.removeFromQueue(socketId);
    this.pairBySocket.delete(socketId);
    this.spamState.delete(socketId);
  }

  inCooldown(ip: string) {
    const until = this.cooldownUntil.get(ip);
    return Boolean(until && until > Date.now());
  }

  setCooldown(ip: string, ms = 3500) {
    this.cooldownUntil.set(ip, Date.now() + ms);
  }

  canSendMessage(socketId: string) {
    const now = Date.now();
    const state = this.spamState.get(socketId);

    if (!state) {
      this.spamState.set(socketId, { lastAt: now, count: 1, resetAt: now + 60000 });
      return true;
    }

    if (now - state.lastAt < 320) {
      return false;
    }

    if (now > state.resetAt) {
      state.count = 1;
      state.resetAt = now + 60000;
      state.lastAt = now;
      return true;
    }

    if (state.count >= 40) {
      return false;
    }

    state.count += 1;
    state.lastAt = now;
    return true;
  }
}
