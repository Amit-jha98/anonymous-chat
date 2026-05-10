"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="mb-2 ml-2 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-zinc-300"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
        />
      ))}
      <span className="ml-1 text-xs text-zinc-400">Stranger is typing...</span>
    </div>
  );
}
