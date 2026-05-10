"use client";

import type { ChatMessage } from "@/app/types/chat";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === "you";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow ${
          isMe
            ? "rounded-br-md bg-teal-300 text-slate-950"
            : "glass rounded-bl-md text-zinc-100"
        }`}
      >
        <p className="break-words leading-relaxed">{message.text}</p>
      </div>
    </motion.div>
  );
}
