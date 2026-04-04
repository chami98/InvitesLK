"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const defaultViewport = {
  once: true as const,
  amount: 0.12 as const,
  margin: "0px 0px -72px 0px" as const,
};

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay (e.g. stagger index * 0.07) */
  delay?: number;
  /** Vertical slide distance (px) */
  y?: number;
};

export function ScrollReveal({ children, className, delay = 0, y = 32 }: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.58, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealLiProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  style?: CSSProperties;
};

export function ScrollRevealLi({
  children,
  className,
  delay = 0,
  y = 22,
  style,
}: ScrollRevealLiProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.li
      className={className}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.52, delay, ease }}
    >
      {children}
    </motion.li>
  );
}

/** Optional horizontal slide for variety */
export function ScrollRevealFromRight({
  children,
  className,
  delay = 0,
  x = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
