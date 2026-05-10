"use client";

import { Card } from "@/app/components/ui/card";
import { motion } from "framer-motion";

const privacyPoints = [
  "No accounts",
  "No stored messages",
  "No database",
  "No localStorage message history",
  "Session destroyed after exit",
];

export function PrivacySection() {
  return (
    <section className="py-10">
      <Card className="overflow-hidden p-6 sm:p-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl font-semibold text-white"
        >
          Privacy first. Always.
        </motion.h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-300 sm:text-base">
          Ghostline is intentionally minimal. Every conversation is ephemeral, text-only, and kept
          only in the running server process while the chat is active.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {privacyPoints.map((point, idx) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100"
            >
              {point}
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}
