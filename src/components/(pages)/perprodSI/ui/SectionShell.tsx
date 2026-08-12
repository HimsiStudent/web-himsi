import type { ReactNode } from "react";
import { cn } from "@/lib/perprodSI/utils";

type SectionShellProps = {
  children: ReactNode;
  /** Anchor id for in-page navigation. */
  id?: string;
  /** Fullscreen section (100svh) instead of vertical-rhythm padding. */
  full?: boolean;
  className?: string;
};

/**
 * Consistent <section> scaffold: relative positioning for layered atmosphere
 * and the shared vertical rhythm. Inner width is handled by <Container>.
 */
export function SectionShell({
  children,
  id,
  full = false,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        full ? "min-h-[100svh]" : "py-[var(--spacing-section-y)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
