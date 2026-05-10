"use client";

import { AnimatedGradient } from "@/app/components/animated-gradient";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { LockKeyhole, MessageCircle, Zap } from "lucide-react";
import Link from "next/link";

const signals = [
  { icon: Zap, label: "Fast match" },
  { icon: LockKeyhole, label: "No accounts" },
  { icon: MessageCircle, label: "Text only" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[64vh] flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
      <AnimatedGradient />
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-full text-balance font-heading text-3xl font-bold leading-tight text-white sm:max-w-3xl sm:text-6xl"
      >
        Anonymous chat online, no signup, text only.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-5 max-w-full text-sm leading-relaxed text-zinc-300 sm:max-w-2xl sm:text-base"
      >
        Ghostline pairs two strangers in a private temporary chat room over realtime Socket.IO, then
        clears the session when either person leaves.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="mt-3 max-w-xs text-xs font-medium uppercase text-teal-100/80 sm:max-w-2xl"
      >
        Popular anonymous chat for random stranger text conversations
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.18 }}
        className="mt-6 flex max-w-xs flex-wrap items-center justify-center gap-2 sm:max-w-none"
      >
        {signals.map((signal) => (
          <span
            key={signal.label}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-zinc-200"
          >
            <signal.icon size={14} className="text-teal-200" />
            {signal.label}
          </span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.26 }}
        className="mt-8"
      >
        <Link href="/chat">
          <Button size="lg" className="min-w-52">
            Start Chatting
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
