import Image from "next/image";
import { assets } from "@/lib/perprodSI/assets";
import { cn } from "@/lib/perprodSI/utils";

/**
 * Decorative gold filigree divider (Pembatas) marking the seam between
 * sections. Purely ornamental — aria-hidden and non-interactive.
 *
 * Full-bleed edge to edge. The source PNG (3110×1350) is mostly transparent
 * padding — the filigree occupies only the middle ~18% of its height — so the
 * frame is given a much wider aspect ratio and `object-cover` crops the empty
 * bands away instead of leaving a tall gap between sections.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative aspect-[2000/240] w-full", className)}
    >
      <Image
        src={assets.divider}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-75"
      />
    </div>
  );
}
