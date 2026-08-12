"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { groupFAQs, type FAQItem } from "@/lib/perprodSI/faq";
import { sacredEase } from "@/lib/perprodSI/motion";
import { cn } from "@/lib/perprodSI/utils";

const ALL = "Semua";

/**
 * Height of the clipped grid, in px. Tall enough to clear the first row of
 * cards and cut into the second, so the fade reads as "there is more" rather
 * than as a card that failed to render.
 */
const COLLAPSED_HEIGHT = 430;

/** Below this many questions nothing is ever clipped, so no chevron appears. */
const COLLAPSE_AFTER = 4;

/**
 * The clipped grid fades out via a mask rather than an ivory gradient painted
 * on top of it. The section behind now carries grain, clouds and a watermark;
 * an opaque overlay would stamp a flat rectangle over all of it, while the mask
 * dissolves only the text and lets the atmosphere continue through.
 */
const fadeMask = {
  maskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.35) 84%, transparent 100%)",
} as const;

type FAQTabsProps = {
  items: FAQItem[];
};

/**
 * Category tabs over a two-column answer grid. Every answer is visible at once
 * rather than folded into an accordion — with six short answers, opening them
 * one at a time costs more clicks than it saves reading.
 *
 * Long sets are clipped to COLLAPSED_HEIGHT behind a fade and reopened by the
 * chevron. The chevron is rendered only when something is actually cut off; an
 * expand control over fully visible content is a promise with nothing behind
 * it.
 *
 * The tabs are toggle buttons rather than ARIA tabs: the content below is one
 * filtered list, not a set of panels, and `aria-pressed` describes that
 * honestly without needing roving tabindex.
 */
export function FAQTabs({ items }: FAQTabsProps) {
  const [tab, setTab] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const gridId = useId();

  const categories = useMemo(
    () => [ALL, ...groupFAQs(items).map((group) => group.category)],
    [items],
  );

  const visible = useMemo(
    () => (tab === ALL ? items : items.filter((item) => item.category === tab)),
    [items, tab],
  );

  const clipped = visible.length > COLLAPSE_AFTER && !expanded;
  const showChevron = visible.length > COLLAPSE_AFTER;

  const selectTab = (name: string) => {
    setTab(name);
    setExpanded(false);
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        role="group"
        aria-label="Kategori pertanyaan"
        className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:mt-12 sm:gap-x-11"
      >
        {categories.map((name) => {
          const active = name === tab;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => selectTab(name)}
              className={cn(
                "relative pb-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-colors duration-[var(--motion-ui)] ease-[var(--ease-sacred)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-4 focus-visible:ring-offset-ivory-warm",
                active ? "text-ink" : "text-brass-ink hover:text-ink",
              )}
            >
              {name}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[2px] bg-ink transition-transform duration-[var(--motion-ui)] ease-[var(--ease-sacred)]",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} pertanyaan ditampilkan
      </p>

      {/* Answer grid */}
      <motion.div
        id={gridId}
        animate={{ height: clipped ? COLLAPSED_HEIGHT : "auto" }}
        transition={{ duration: reduce ? 0.01 : 0.55, ease: sacredEase }}
        className="relative mt-14 overflow-hidden sm:mt-16"
        style={clipped ? fadeMask : undefined}
      >
        {/* Each answer sits on its own card. On the bare ivory of the earlier
            draft plain type was enough; with a sky drifting behind the section
            the copy needs a surface of its own to keep its contrast, and the
            cards give the grid the density the whitespace alone did not. */}
        <dl className="m-0 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {visible.map((faq) => (
            <div
              key={faq.question}
              className="group relative rounded-md border border-hairline bg-white/70 px-7 py-7 shadow-[0_1px_2px_rgba(24,49,83,0.03)] backdrop-blur-[2px] transition-[border-color,box-shadow,background-color] duration-[var(--motion-ui)] ease-[var(--ease-sacred)] hover:border-brass/45 hover:bg-white/85 hover:shadow-[0_18px_40px_-28px_rgba(24,49,83,0.35)]"
            >
              {/* The tick lives inside the <dt>: a <div> inside a <dl> may only
                  group a term with its description, so anything else has to be
                  part of one of them. */}
              <dt className="text-[1.05rem] font-semibold leading-snug tracking-[-0.012em] text-ink">
                {/* Gold tick opening the card — the same accent the handbook
                    uses to open a chapter. */}
                <span
                  aria-hidden
                  className="block h-px w-8 bg-brass/70 transition-[width] duration-[var(--motion-ui)] ease-[var(--ease-sacred)] group-hover:w-12"
                />
                <span className="mt-5 block">{faq.question}</span>
              </dt>
              <dd className="m-0 mt-3 max-w-[46ch] text-[0.94rem] leading-[1.8] text-ink-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>

      </motion.div>

      {showChevron ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={gridId}
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-ink-muted transition-[background-color,border-color,color] duration-[var(--motion-ui)] ease-[var(--ease-sacred)] hover:border-ink/25 hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-warm"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "h-4 w-4 transition-transform duration-[var(--motion-ui)] ease-[var(--ease-sacred)]",
                expanded && "rotate-180",
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span className="sr-only">
              {expanded
                ? "Tampilkan lebih sedikit"
                : "Tampilkan semua pertanyaan"}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
