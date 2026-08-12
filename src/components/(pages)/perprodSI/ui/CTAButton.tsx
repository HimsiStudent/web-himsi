import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/perprodSI/utils";

type CTAVariant = "primary" | "ghost";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-[var(--motion-fast)] ease-[var(--ease-sacred)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<CTAVariant, string> = {
  primary:
    "bg-navy text-cream shadow-[0_10px_30px_-12px_rgba(36,55,74,0.55)] hover:-translate-y-0.5 hover:bg-navy/90",
  ghost:
    "border border-gold/70 text-navy hover:border-gold hover:bg-gold/10",
};

/**
 * Calm, pill-shaped call to action. Renders a next/link for internal anchors
 * and routes. No flashy motion — a gentle lift on hover only.
 */
export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
