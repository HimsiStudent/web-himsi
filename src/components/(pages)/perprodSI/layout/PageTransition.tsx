"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { sacredEase } from "@/lib/perprodSI/motion";

/**
 * Cross-page transition — lives in the root layout (outside Header/Footer,
 * see layout.tsx) so the chrome stays put while only the routed content
 * fades/lifts between pages. Keyed on pathname: AnimatePresence treats a key
 * change as the old page unmounting and the new one mounting, which is what
 * lets the exit animation actually play under the App Router.
 *
 * Reuses RevealOnView's "softReveal" blur language so a page swap reads as
 * the same sacred motion system, not a separate effect.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, y: 16, filter: "blur(8px)" }
        }
        animate={
          reduce
            ? { opacity: 1, transition: { duration: 0.2 } }
            : {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: sacredEase },
              }
        }
        exit={
          reduce
            ? { opacity: 0, transition: { duration: 0.01 } }
            : {
                opacity: 0,
                y: -12,
                filter: "blur(8px)",
                transition: { duration: 0.35, ease: sacredEase },
              }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
