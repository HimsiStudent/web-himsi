"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionDurations, sacredEase } from "@/lib/perprodSI/motion";

type RevealVariant = "fadeUp" | "softReveal";

type RevealOnViewProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds to wait before animating in (used for staggered reveals). */
  delay?: number;
  duration?: number;
  /** Fraction of element visible before triggering (0–1). */
  amount?: number;
  className?: string;
};

/**
 * Soft, sacred entrance reveal. Fades content up or de-blurs it once it enters
 * the viewport. Honors prefers-reduced-motion (opacity-only, near-instant).
 */
export function RevealOnView({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = motionDurations.base,
  amount = 0.35,
  className,
}: RevealOnViewProps) {
  const reduce = useReducedMotion();

  const hidden = reduce
    ? { opacity: 0 }
    : variant === "softReveal"
      ? { opacity: 0, filter: "blur(10px)" }
      : { opacity: 0, y: 24 };

  const visible = reduce
    ? { opacity: 1, transition: { duration: 0.2, delay } }
    : variant === "softReveal"
      ? {
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration, ease: sacredEase, delay },
        }
      : {
          opacity: 1,
          y: 0,
          transition: { duration, ease: sacredEase, delay },
        };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ hidden, visible }}
    >
      {children}
    </motion.div>
  );
}
