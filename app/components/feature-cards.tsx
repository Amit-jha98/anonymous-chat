"use client";

import { Card } from "@/app/components/ui/card";
import { Bolt, Lock, MessageSquareHeart, ShieldCheck, TimerReset, UserRoundX } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: UserRoundX, title: "Anonymous", text: "No names, profiles, or identity data." },
  { icon: TimerReset, title: "Temporary", text: "Rooms live in memory and disappear after exit." },
  { icon: Bolt, title: "Instant matching", text: "Join the queue and get paired in seconds." },
  { icon: ShieldCheck, title: "Render ready", text: "Next.js, Express, and Socket.IO ship as one service." },
  { icon: MessageSquareHeart, title: "Realtime text", text: "Socket.IO powers messages, typing, skips, and reconnects." },
  { icon: Lock, title: "Small surface", text: "No uploads, no database, no local message storage." },
];

export function FeatureCards() {
  return (
    <section className="py-8">
      <h2 className="font-heading text-center text-2xl font-semibold text-white sm:text-3xl">Core Features</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
          >
            <Card className="h-full transition hover:-translate-y-1 hover:border-teal-200/35">
              <item.icon className="text-teal-200" size={18} />
              <h3 className="mt-4 font-heading text-lg font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
