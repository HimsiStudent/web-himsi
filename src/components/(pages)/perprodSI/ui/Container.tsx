import type { ReactNode } from "react";
import { cn } from "@/lib/perprodSI/utils";

/**
 * Centered content measure with site padding. Sits above absolute atmosphere
 * layers (z-10) so section backgrounds can bleed full-width behind it.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-[72rem] px-[var(--spacing-site-x)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
