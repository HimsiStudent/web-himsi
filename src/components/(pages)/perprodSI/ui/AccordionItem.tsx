"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { sacredEase } from "@/lib/perprodSI/motion";
import { cn } from "@/lib/perprodSI/utils";

type AccordionItemProps = {
  question: ReactNode;
  children: ReactNode;
  /** Open by default. Ignored when `open` is supplied. */
  defaultOpen?: boolean;
  /**
   * Controlled open state. Pass this together with `onToggle` when a parent
   * coordinates the rows (e.g. an exclusive accordion where opening one row
   * closes the others); omit both to let the row manage itself.
   */
  open?: boolean;
  onToggle?: (next: boolean) => void;
  className?: string;
};

/**
 * One question, as a quiet bordered card. Three states, each a small step up:
 * resting is a hairline on ivory, hover warms the fill to plain white, and the
 * open card grows a thin brass rule down its leading edge. No lift, no glow —
 * the accent line is the only colour in the component.
 *
 * The question sits in the body face; the project serif is an inscriptional
 * titling face and renders full sentences as small caps.
 *
 * Follows the W3C accordion pattern (heading → button[aria-expanded] → region).
 */
export function AccordionItem({
  question,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  className,
}: AccordionItemProps) {
  const [selfOpen, setSelfOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const panelId = useId();

  const open = controlledOpen ?? selfOpen;

  const toggle = () => {
    if (onToggle) onToggle(!open);
    else setSelfOpen((v) => !v);
  };

  return (
    <div
      data-open={open}
      className={cn(
        "group relative rounded-[14px] border border-hairline bg-white/50 transition-[background-color,border-color] duration-[var(--motion-ui)] ease-[var(--ease-sacred)]",
        "hover:border-hairline-strong hover:bg-white",
        "data-[open=true]:border-hairline-strong data-[open=true]:bg-white",
        className,
      )}
    >
      {/* Thin accent rule marking the open card — grows from the top edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 rounded-l-[14px] bg-brass transition-transform duration-[var(--motion-ui)] ease-[var(--ease-sacred)] group-data-[open=true]:scale-y-100"
      />

      <h3 className="m-0">
        <button
          type="button"
          data-accordion-trigger
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className="flex w-full items-start justify-between gap-6 rounded-[14px] px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-warm"
        >
          <span className="text-[1.02rem] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
            {question}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-[0.2rem] h-4 w-4 shrink-0 text-ink-muted/50 transition-[transform,color] duration-[var(--motion-ui)] ease-[var(--ease-sacred)] group-hover:text-ink-muted group-data-[open=true]:rotate-180 group-data-[open=true]:text-brass"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.42, ease: sacredEase }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] px-6 pb-6 text-[0.94rem] leading-[1.78] text-ink-muted">
              {children}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
