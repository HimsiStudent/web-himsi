"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { RuleCategory } from "@/lib/perprodSI/rules";
import { sacredEase } from "@/lib/perprodSI/motion";

/**
 * One chapter of rules — clean, firm accordion. Ordinal + title header,
 * numbered rule list revealed on click. No decorative fluff.
 */
export function RuleCategoryCard({
  category,
  defaultOpen = false,
  id,
}: {
  category: RuleCategory;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <div
      id={id}
      data-open={open}
      className="group scroll-mt-24 border-b border-gold/25 last:border-b-0"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-5 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:py-7"
      >
        {/* Ordinal */}
        <span className="shrink-0 font-serif text-2xl font-semibold leading-none text-gold sm:text-3xl">
          {category.ordinal}
        </span>

        {/* Title + rule count */}
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="font-serif text-lg font-semibold leading-tight text-navy sm:text-xl">
            {category.title}
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth-deep/60">
            {category.subtitle ? `${category.subtitle} · ` : ""}
            {category.rules.length} Ketentuan
          </span>
        </span>

        {/* Toggle indicator — horizontal line rotates to plus/minus */}
        <span
          aria-hidden
          className="relative grid h-7 w-7 shrink-0 place-items-center"
        >
          <span className="absolute h-[1.5px] w-3.5 bg-navy/60 transition-transform duration-300 ease-[var(--ease-sacred)] group-data-[open=true]:rotate-0" />
          <span className="absolute h-[1.5px] w-3.5 rotate-90 bg-navy/60 transition-transform duration-300 ease-[var(--ease-sacred)] group-data-[open=true]:rotate-0" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: sacredEase }}
            className="overflow-hidden"
          >
            <ol className="pb-7 pl-[3.25rem] sm:pl-[3.75rem]">
              {category.rules.map((rule, idx) => (
                <li
                  key={rule.text}
                  className="flex items-baseline gap-3 py-2 first:pt-0 last:pb-0"
                >
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-earth-deep/70">
                    {idx + 1}.
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm leading-relaxed text-navy/70 sm:text-[0.925rem]">
                      {rule.text}
                    </p>
                    {rule.notes?.length ? (
                      <ul className="flex flex-col gap-1.5 border-l border-gold/30 pl-3">
                        {rule.notes.map((note) => (
                          <li
                            key={note}
                            className="text-xs leading-relaxed text-navy/55"
                          >
                            <span className="font-semibold text-earth-deep/70">
                              Catatan:{" "}
                            </span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
