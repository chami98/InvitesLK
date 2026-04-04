"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Parent: staggers direct `motion` children with `weddingSectionVariants`. */
export const weddingStaggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const weddingSectionVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeOut },
  },
};

/** Soft radial wash at the top of the invite — runs once on load. */
export function WeddingLoadBackdrop({
  accent,
  reducedMotion,
}: {
  accent: string;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(42vh,20rem)] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[min(120vw,48rem)] -translate-x-1/2"
        initial={reducedMotion ? { opacity: 0.7 } : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reducedMotion ? 0.2 : 1,
          ease: easeOut,
        }}
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${accent}24 0%, transparent 72%)`,
        }}
      />
    </div>
  );
}
