"use client";

import { MessageBubble } from "@/app/components/message-bubble";
import { TypingIndicator } from "@/app/components/typing-indicator";
import { WaitingScreen } from "@/app/components/waiting-screen";
import type { ChatMessage, ChatStatus } from "@/app/types/chat";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  messages: ChatMessage[];
  status: ChatStatus;
  strangerTyping: boolean;
  onReconnect: () => void;
}

export function ChatWindow({ messages, status, strangerTyping, onReconnect }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, strangerTyping]);

  if (status !== "connected" && messages.length === 0) {
    return <WaitingScreen disconnected={status === "disconnected"} onReconnect={onReconnect} />;
  }

  return (
    <section className="glass message-scroll flex min-h-[56vh] flex-1 flex-col overflow-y-auto rounded-lg p-3 sm:p-4">
      <div className="mb-3 rounded-lg border border-teal-200/30 bg-teal-300/10 px-3 py-2 text-center text-xs font-medium text-teal-100">
        You are now chatting with a stranger
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>

      {strangerTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </section>
  );
}
