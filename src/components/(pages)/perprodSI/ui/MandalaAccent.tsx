import Image from "next/image";
import { cn } from "@/lib/perprodSI/utils";

/**
 * A rosette bled off a section's edge — each section gets a different one, as
 * a quiet visual signature. Purely decorative: aria-hidden, never interactive,
 * and always behind content.
 *
 * Position and size belong to the caller (`className`); the default opacity is
 * deliberately low, because these carry far more colour than the site's other
 * watermarks and read as noise the moment they compete with body copy.
 */
export function MandalaAccent({
  src,
  className,
  opacity = 0.14,
}: {
  src: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute z-0", className)}
      style={{ opacity }}
    >
      <Image
        src={src}
        alt=""
        width={1400}
        height={1400}
        sizes="(max-width: 768px) 60vw, 520px"
        className="h-auto w-full"
      />
    </div>
  );
}
