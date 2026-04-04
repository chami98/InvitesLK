"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

const defaultTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export function AnimatedBlock({
  children,
  className,
  delay = 0,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
