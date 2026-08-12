import Image from "next/image";
import { cn } from "@/lib/perprodSI/utils";

export type CloudConfig = {
  src: string;
  /** Natural pixel width (for aspect ratio). */
  width: number;
  /** Natural pixel height (for aspect ratio). */
  height: number;
  /** Tailwind positioning + sizing utilities, e.g. "left-[-6%] top-[8%] w-[38vw]". */
  className?: string;
  /** CSS animation-duration, e.g. "18s". Longer = calmer drift. */
  duration?: string;
  /** CSS animation-delay, e.g. "-4s". */
  delay?: string;
};

type CloudLayerProps = {
  clouds: CloudConfig[];
  className?: string;
};

/**
 * Decorative floating cloud layer. Purely atmospheric — marked aria-hidden and
 * non-interactive. Drift uses the CSS `cloud-float` keyframes, which are frozen
 * automatically under prefers-reduced-motion (see globals.css).
 */
export function CloudLayer({ clouds, className }: CloudLayerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {clouds.map((cloud, i) => (
        <span
          key={`${cloud.src}-${i}`}
          className={cn("absolute block", cloud.className)}
          style={{
            animationName: "cloud-float",
            animationTimingFunction: "var(--ease-sacred)",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationDuration: cloud.duration ?? "18s",
            animationDelay: cloud.delay ?? "0s",
          }}
        >
          <Image
            src={cloud.src}
            alt=""
            width={cloud.width}
            height={cloud.height}
            sizes="50vw"
            loading="lazy"
            fetchPriority="low"
            className="h-auto w-full select-none"
          />
        </span>
      ))}
    </div>
  );
}
