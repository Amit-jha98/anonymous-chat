"use client";

import { motion } from "framer-motion";

const steps = [
  "Tap Start Chatting",
  "Get randomly matched with one stranger",
  "Chat in real time with zero account setup",
  "Skip or end instantly at any time",
];

export function HowItWorks() {
  return (
    <section className="py-10">
      <h2 className="font-heading text-center text-2xl font-semibold text-white sm:text-3xl">
        How it works
      </h2>
      <div className="mx-auto mt-6 max-w-3xl space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="glass flex items-center gap-3 rounded-lg px-4 py-4"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-300/20 text-sm font-bold text-amber-100">
              {index + 1}
            </span>
            <p className="text-sm text-zinc-200 sm:text-base">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
