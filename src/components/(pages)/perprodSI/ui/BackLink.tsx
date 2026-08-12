import Link from "next/link";
import { cn } from "@/lib/perprodSI/utils";

/**
 * Quiet "return to home" cue for standalone pages (FAQ, Rules, ...) that live
 * outside the homepage's section flow and so need an explicit way back.
 */
export function BackLink({ className }: { className?: string }) {
  return (
    <Link
      href="/perkenalan-prodi"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-cream/70 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-navy shadow-[0_6px_18px_-12px_rgba(139,109,83,0.5)] transition-all duration-[var(--motion-fast)] ease-[var(--ease-sacred)]",
        "hover:-translate-x-0.5 hover:border-gold hover:bg-gold/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-sacred)] group-hover:-translate-x-1"
      >
        <path d="M19 12H5M11 6l-6 6 6 6" />
      </svg>
      Kembali ke Beranda
    </Link>
  );
}
