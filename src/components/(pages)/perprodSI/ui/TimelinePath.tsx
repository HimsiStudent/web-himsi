"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated vertical path for the timeline.
 * As the user scrolls, a warm gold fill grows downward — like lighting a path ahead.
 * The background track stays faint; only the traveled portion glows.
 */
export function TimelinePath() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      // Fill up to the 60% mark of the viewport (center-ish)
      const pct = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - top) / height));
      setFillPct(pct * 100);
    };

    window.addEventListener("scroll", update, { passive: true });
    update(); // run on mount
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="absolute left-5 top-1 bottom-1 w-px -translate-x-1/2 md:left-1/2"
    >
      {/* Faint static background track */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/5" />

      {/* Scroll-driven fill — warm gold glow */}
      <div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          height: `${fillPct}%`,
          background: "linear-gradient(to bottom, #F1C751, #D7B97A)",
          boxShadow: fillPct > 0 ? "0 0 8px 1px rgba(241,199,81,0.55)" : "none",
          transition: "height 0.15s ease-out",
        }}
      />
    </div>
  );
}
