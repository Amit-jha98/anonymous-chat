"use client";

import { motion } from "framer-motion";

interface WaitingScreenProps {
  disconnected?: boolean;
  onReconnect: () => void;
}

export function WaitingScreen({ disconnected = false, onReconnect }: WaitingScreenProps) {
  return (
    <div className="glass flex min-h-[56vh] flex-1 flex-col items-center justify-center rounded-lg px-6 py-10 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-full border-2 border-teal-300/20 border-t-teal-300"
      />
      <h3 className="mt-5 font-heading text-xl font-semibold text-white">
        {disconnected ? "Stranger disconnected" : "Looking for someone to chat with..."}
      </h3>
      <p className="mt-2 max-w-xs text-sm text-zinc-400">
        {disconnected
          ? "Reconnecting you with a new stranger right away."
          : "Your next anonymous one-to-one chat is just a moment away."}
      </p>
      {disconnected && (
        <button
          type="button"
          onClick={onReconnect}
          className="mt-5 rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-100 transition hover:border-teal-200/50 hover:bg-white/10"
        >
          Find New Stranger
        </button>
      )}
    </div>
  );
}
