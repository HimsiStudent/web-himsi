import Image from "next/image";

/** Geometry is expressed in one SVG user-space so the leader lines, the ring
 *  and the absolutely-positioned labels can never drift apart on resize. */
const VB_W = 1600;
const VB_H = 1000;
const CX = VB_W / 2;
const CY = VB_H / 2;
/** Radius of the centre image. */
const R = 300;
/** The drawn fallback ring — a hairline just outside the image. */
const RING_R = R + 42;
/**
 * The mandala artwork needs a much larger box than the hairline: its rosette
 * only fills the middle of its own square, so matching RING_R would tuck the
 * whole ornament behind the centre image.
 */
const RING_IMG_R = R * 1.34;
/** Label column width, as a fraction of the frame. */
const LABEL_W = 0.28;
/** Where a leader line leaves its label, in user space. */
const LEFT_START = VB_W * LABEL_W + 22;
const RIGHT_START = VB_W * (1 - LABEL_W) - 22;

export type OrbitCallout = {
  name: string;
  meaning: string;
  /** Point the leader line lands on, in centre-image space (0–1, 0 = top-left). */
  target: { x: number; y: number };
  side: "left" | "right";
  /** Vertical placement of the label, 0–1 of the frame height. */
  at: number;
};

/**
 * Radial callout diagram: a circular centre image with leader lines drawn out
 * to labelled explanations, the way an anatomical plate is annotated.
 *
 * Every callout must point at something genuinely visible in the image —
 * a line to a part that isn't drawn there reads as a mistake. Desktop only;
 * callers render their own stacked list below `md`, where a radial layout
 * would collide with itself.
 */
export function SymbolOrbit({
  src,
  alt,
  callouts,
  ringSrc,
}: {
  src: string;
  alt: string;
  callouts: OrbitCallout[];
  /** Decorative ring behind the labels. Falls back to a drawn circle. */
  ringSrc?: string;
}) {
  const point = (c: OrbitCallout) => ({
    x: CX - R + c.target.x * (R * 2),
    y: CY - R + c.target.y * (R * 2),
  });

  return (
    <div className="relative mx-auto hidden w-full max-w-[1000px] md:block">
      <div className="relative aspect-[16/10] w-full">
        {/* Ring */}
        {ringSrc ? (
          <Image
            src={ringSrc}
            alt=""
            aria-hidden
            width={1200}
            height={1200}
            sizes="720px"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
            style={{ width: `${((RING_IMG_R * 2) / VB_W) * 100}%`, height: "auto" }}
          />
        ) : null}

        {/* Leader lines + ring fallback, in the same user space as everything else */}
        <svg
          aria-hidden
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {!ringSrc ? (
            <circle
              cx={CX}
              cy={CY}
              r={RING_R}
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity={0.45}
              strokeWidth={1.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {callouts.map((c) => {
            const p = point(c);
            const sx = c.side === "left" ? LEFT_START : RIGHT_START;
            const sy = c.at * VB_H;
            return (
              <g key={c.name}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-gold)"
                  strokeOpacity={0.75}
                  strokeWidth={1.25}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={sx} cy={sy} r={4} fill="var(--color-gold)" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill="var(--color-cream)"
                  stroke="var(--color-gold)"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* Centre image, clipped to the circle the geometry assumes */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-gold/40 shadow-[0_30px_70px_-32px_rgba(36,55,74,0.55)]"
          style={{
            width: `${((R * 2) / VB_W) * 100}%`,
            aspectRatio: "1 / 1",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={1024}
            sizes="620px"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Labels */}
        {callouts.map((c) => (
          <div
            key={c.name}
            className={`absolute -translate-y-1/2 ${
              c.side === "left" ? "left-0 text-right" : "right-0 text-left"
            }`}
            style={{ top: `${c.at * 100}%`, width: `${LABEL_W * 100}%` }}
          >
            <h3 className="font-serif text-xl font-semibold text-navy">
              {c.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-navy/70">
              {c.meaning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
