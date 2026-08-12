import Link from "next/link";
import type { ReactNode } from "react";
import { Medallion } from "./Medallion";
import { cn } from "@/lib/perprodSI/utils";

type QuickAccessCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  cta?: string;
  className?: string;
};

/**
 * A calm, vertical "portal" card — medallion, serif title, hairline ornament,
 * short description, and a quiet link cue. Deliberately not a dashboard tile:
 * centered, airy, parchment surface with a gentle lift on hover/focus.
 */
export function QuickAccessCard({
  href,
  title,
  description,
  icon,
  cta = "Selengkapnya",
  className,
}: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        // The card now sits over drifting photographs, so the surface has to
        // do real work: a heavy backdrop blur plus a near-opaque parchment
        // wash, which is what keeps the navy text legible whatever passes
        // underneath. A soft shadow separates it from the moving layer.
        "group flex h-full flex-col items-center gap-5 rounded-[1.75rem] border border-gold/35 bg-cream/88 px-7 py-10 text-center shadow-[0_18px_44px_-28px_rgba(36,55,74,0.5)] backdrop-blur-xl",
        "transition-all duration-[var(--motion-fast)] ease-[var(--ease-sacred)]",
        "hover:-translate-y-1.5 hover:border-gold/60 hover:bg-cream hover:shadow-[0_28px_58px_-24px_rgba(139,109,83,0.5)]",
        "focus-visible:-translate-y-1.5 focus-visible:border-gold/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        className,
      )}
    >
      <Medallion>{icon}</Medallion>
      <h3 className="font-serif text-xl font-semibold text-navy">{title}</h3>
      <span
        aria-hidden
        className="-mt-2 h-px w-10 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <p className="text-sm leading-relaxed text-navy/70">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium uppercase tracking-[0.18em] text-earth-deep transition-colors group-hover:text-earth">
        {cta}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-sacred)] group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
