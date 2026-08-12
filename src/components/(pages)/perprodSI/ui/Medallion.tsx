import type { ReactNode } from "react";
import { cn } from "@/lib/perprodSI/utils";

type MedallionProps = {
  children: ReactNode;
  /** Outer diameter in pixels. */
  size?: number;
  className?: string;
};

/**
 * Sacred medallion frame — a ketupat diamond layered over a gold ring and a
 * soft cream disc. Houses a single glyph. Ornamental but quiet; purely visual,
 * so it is marked aria-hidden (the surrounding label carries the meaning).
 * Insets are percentage-based so the frame scales cleanly with `size`.
 */
export function Medallion({ children, size = 80, className }: MedallionProps) {
  return (
    <span
      aria-hidden
      className={cn("relative grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Ketupat diamond frame */}
      <span className="absolute inset-[8%] rotate-45 rounded-[26%] border border-gold/35" />
      {/* Outer ring */}
      <span className="absolute inset-0 rounded-full border border-gold/45" />
      {/* Inner disc */}
      <span className="absolute inset-[14%] rounded-full bg-gradient-to-b from-cream to-ivory shadow-[inset_0_1px_5px_rgba(215,185,122,0.3)]" />
      {/* Glyph */}
      <span className="relative text-earth">{children}</span>
    </span>
  );
}
