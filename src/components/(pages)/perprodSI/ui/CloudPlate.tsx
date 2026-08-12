import Image from "next/image";
import { cn } from "@/lib/perprodSI/utils";

/**
 * A pre-composed cloud plate from the 4:5 poster set, cropped to the edge it
 * was drawn for.
 *
 * These differ from `CloudLayer`: that one places individual clouds and lets
 * each drift on its own timing, which is the right tool when you want control.
 * These plates arrive as finished compositions, so the only real decision is
 * where to cut them. Each variant's ink sits against one edge — `top` fills
 * the upper 21% of its frame, `bottom` the lower 39%, `left`/`right` run the
 * full height against their side — so the caller sizes a window and anchors
 * `object-position` to that same edge. Crop the empty part, never the art.
 *
 * Size the window with `aspect-[…]`, never a fixed height. `object-cover`
 * scales the source by the window's *width*, so a pixel height means the
 * visible slice of the art changes with every breakpoint — and at most of them
 * it guillotines a cloud mid-body. An aspect ratio keeps the same slice
 * everywhere. The ratios that frame each plate's ink exactly:
 *
 *   top    1080/284    bottom 1080/527    full 2048/774
 *   left / right / front / all — use the source's own 1080/1350: their ink
 *   reaches the frame edges, so any crop at all would cut art.
 *
 * Decorative only: aria-hidden, non-interactive, and always behind content.
 */
export function CloudPlate({
  src,
  className,
  objectPosition = "object-top",
  opacity = 0.3,
}: {
  src: string;
  /** Position, size and stack the window — e.g. "inset-x-0 top-0 h-[140px] z-0". */
  className?: string;
  /** Anchor the crop to the edge this plate's art was drawn against. */
  objectPosition?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute overflow-hidden", className)}
      style={{ opacity }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className={cn("object-cover", objectPosition)}
      />
    </div>
  );
}
