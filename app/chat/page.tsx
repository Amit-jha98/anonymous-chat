"use client";

import { ChatInput } from "@/app/components/chat-input";
import { ChatWindow } from "@/app/components/chat-window";
import { ConnectionStatus } from "@/app/components/connection-status";
import { useChatSocket } from "@/app/hooks/use-chat-socket";
import { ArrowLeft, RefreshCcw, X } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const {
    connected,
    messages,
    status,
    strangerTyping,
    sendMessage,
    startTyping,
    stopTyping,
    skipChat,
    endChat,
    findPartner,
  } = useChatSocket();

  return (
    <div className="app-gradient flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071013]/85 px-3 py-3 backdrop-blur-lg sm:px-5">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2">
          <Link
            href="/"
            aria-label="Back to home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-200 transition hover:border-teal-200/40 hover:bg-white/10"
          >
            <ArrowLeft size={16} />
          </Link>
          <ConnectionStatus connected={connected} status={status} />
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={skipChat}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-amber-200/30 bg-amber-300/10 px-3 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/20"
            >
              <RefreshCcw size={14} />
              Skip
            </button>
            <button
              type="button"
              onClick={endChat}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-rose-300/30 bg-rose-400/10 px-3 text-xs font-semibold text-rose-100 transition hover:bg-rose-300/20"
            >
              <X size={14} />
              End
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 pb-3 pt-2 sm:px-5 sm:pb-5">
        <ChatWindow
          messages={messages}
          status={status}
          strangerTyping={strangerTyping}
          onReconnect={findPartner}
        />
        <ChatInput
          disabled={status !== "connected"}
          onSend={sendMessage}
          onTyping={startTyping}
          onStopTyping={stopTyping}
        />
      </main>
    </div>
  );
}
