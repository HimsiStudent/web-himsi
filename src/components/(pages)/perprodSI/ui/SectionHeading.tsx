import type { ReactNode } from "react";
import { cn } from "@/lib/perprodSI/utils";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/**
 * Shared editorial section header: small letter-spaced kicker, serif title,
 * optional subtitle, and a hairline gold ornament. Keeps every section's
 * opening rhythm consistent with the Hero.
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        center ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-earth-deep sm:text-xs">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight text-navy">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-navy/70",
            center && "max-w-[40rem]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
      <span
        aria-hidden
        className={cn(
          "mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent",
          !center && "via-gold/80",
        )}
      />
    </div>
  );
}
