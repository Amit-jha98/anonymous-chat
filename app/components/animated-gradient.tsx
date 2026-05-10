"use client";

import { motion } from "framer-motion";

export function AnimatedGradient() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0.35 }}
      animate={{
        opacity: [0.28, 0.5, 0.28],
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-x-0 top-10 h-40 bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.34),rgba(245,158,11,0.18),transparent)] bg-[length:220%_100%] blur-2xl [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"
    />
  );
}
