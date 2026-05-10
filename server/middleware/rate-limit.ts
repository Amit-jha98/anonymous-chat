interface Bucket {
  count: number;
  resetAt: number;
}

export class SocketRateLimiter {
  private buckets = new Map<string, Bucket>();

  allow(key: string, maxCount: number, windowMs: number) {
    const now = Date.now();
    const entry = this.buckets.get(key);

    if (!entry || now > entry.resetAt) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (entry.count >= maxCount) {
      return false;
    }

    entry.count += 1;
    return true;
  }

  clear(prefix: string) {
    for (const key of this.buckets.keys()) {
      if (key.startsWith(prefix)) {
        this.buckets.delete(key);
      }
    }
  }
}
