"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { dokumPools, type DokumPhoto, type Orientation } from "@/lib/perprodSI/dokum";
import { assets } from "@/lib/perprodSI/assets";
import { sacredEase } from "@/lib/perprodSI/motion";

/** How long before the next card in the wall turns its photograph over. */
const TURN_INTERVAL = 3200;

type CardSpec = { shape: Orientation; ratio: number };

type RowSpec = {
  /** Row height; card widths follow from each card's aspect ratio. */
  height: string;
  /** Pixels per second of horizontal drift. */
  speed: number;
  direction: 1 | -1;
  cards: CardSpec[];
};

const L: CardSpec = { shape: "landscape", ratio: 3 / 2 };
const P: CardSpec = { shape: "portrait", ratio: 2 / 3 };
const W: CardSpec = { shape: "wide", ratio: 1.9 };

/**
 * Three rows drifting in opposite directions — the middle one larger, slower
 * and travelling against its neighbours, which is what gives the wall its
 * sense of depth and keeps it from reading as a static grid.
 *
 * Card counts per shape stay *below* that shape's pool size (landscape 8 of
 * 10, portrait 2 of 3, wide 3 of 5) so a turn always has an unseen photograph
 * left to bring in.
 */
const rows: RowSpec[] = [
  {
    height: "clamp(104px, 12vw, 170px)",
    speed: 26,
    direction: -1,
    cards: [L, W, L, P, L],
  },
  {
    height: "clamp(134px, 16vw, 220px)",
    speed: 18,
    direction: 1,
    cards: [W, L, L, P],
  },
  {
    height: "clamp(104px, 12vw, 170px)",
    speed: 31,
    direction: -1,
    cards: [L, W, L, L],
  },
];

const cardCount = rows.reduce((n, row) => n + row.cards.length, 0);

/**
 * Opening assignment: the n-th card of a given shape takes the n-th photograph
 * of that pool. Derived identically on server and client, so there is nothing
 * for hydration to disagree about.
 */
function initialAssignment() {
  const seen: Partial<Record<Orientation, number>> = {};
  return rows.flatMap((row) =>
    row.cards.map((card) => {
      const n = seen[card.shape] ?? 0;
      seen[card.shape] = n + 1;
      return n;
    }),
  );
}

/** Flat index of a card, used to address the shared assignment array. */
function flatIndex(rowIndex: number, cardIndex: number) {
  let n = 0;
  for (let r = 0; r < rowIndex; r += 1) n += rows[r].cards.length;
  return n + cardIndex;
}

type CardProps = {
  card: CardSpec;
  photo: DokumPhoto;
  height: string;
  /** Alternating lean, so the wall looks hand-placed rather than ruled. */
  lean: number;
  still: boolean;
};

/**
 * One photograph in the drift. The lean and hover lift sit on separate layers
 * from the crossfade so none of them compete for the same transform, and every
 * animated property is transform or opacity — the whole row stays on the
 * compositor while it scrolls.
 */
function Card({ card, photo, height, lean, still }: CardProps) {
  return (
    <motion.figure
      className="group relative m-0 shrink-0 overflow-hidden rounded-[22px] bg-ivory/70 shadow-[0_22px_50px_-30px_rgba(36,55,74,0.55)] transition-shadow duration-500 ease-out hover:shadow-[0_40px_80px_-32px_rgba(36,55,74,0.45)]"
      style={{ height, aspectRatio: card.ratio, rotate: still ? 0 : lean }}
      whileHover={still ? undefined : { scale: 1.06, rotate: 0, zIndex: 20 }}
      transition={{ duration: 0.55, ease: sacredEase }}
    >
      {/* The outgoing photograph stays mounted through the crossfade, so a card
          is never briefly empty while the next one decodes. initial={false}
          keeps the blur-in for swaps only — on first paint every card would
          otherwise animate a filter at once, and blur is the one effect here
          that cannot run on the compositor. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.slug}
          className="absolute inset-0"
          initial={still ? { opacity: 0 } : { opacity: 0, scale: 1.09, filter: "blur(10px)" }}
          animate={still ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(7px)" }}
          transition={{ duration: still ? 0.3 : 1.3, ease: sacredEase }}
        >
          {/* Slow Ken Burns push — deliberately longer than the time a card
              holds its photograph, so the zoom never finishes and stalls. */}
          <motion.div
            className="h-full w-full"
            animate={still ? undefined : { scale: [1, 1.1] }}
            transition={{
              duration: (TURN_INTERVAL / 1000) * cardCount + 8,
              ease: "linear",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 38vw, (max-width: 1024px) 24vw, 16vw"
              className="select-none object-cover"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Warm inner edge — stops the photo sitting flat on the cream. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-navy/10 transition-colors duration-500 group-hover:ring-gold/45"
      />
      {/* A permanent soft sheen across the top — glass, even at rest. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"
      />
      {/* Glass reflection sweeping across on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[150%] group-hover:opacity-100"
      />
      {/* Thin gold glow that breathes in behind the frame on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 shadow-[0_0_0_1px_rgba(215,185,122,0.55),0_0_34px_rgba(215,185,122,0.4)] transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.figure>
  );
}

type RowProps = {
  row: RowSpec;
  rowIndex: number;
  assignment: number[];
  still: boolean;
  /** Whether the wall is on screen — rows idle completely when it is not. */
  active: boolean;
  /** Scroll speed multiplier shared by every row. */
  boost: MotionValue<number>;
};

/**
 * A single drifting row. The track holds two identical copies of the cards and
 * is wrapped from 0% to -50%, so the moment copy one leaves the viewport copy
 * two is already exactly in its place — the loop has no seam.
 */
function Row({ row, rowIndex, assignment, still, active, boost }: RowProps) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (still || !active) return;
    const width = trackRef.current?.scrollWidth ?? 0;
    if (!width) return;
    // Convert px/sec into a percentage of the doubled track, so every row
    // drifts at the same visual speed regardless of how wide its cards are.
    const perSecond = (row.speed / (width / 2)) * 100;
    baseX.set(baseX.get() + row.direction * perSecond * (delta / 1000) * boost.get());
  });

  const cards = row.cards.map((card, i) => ({
    card,
    photo: dokumPools[card.shape][assignment[flatIndex(rowIndex, i)]],
    lean: i % 2 === 0 ? -1.2 : 1.4,
  }));

  // The wrap swaps copy one for copy two, so a copy narrower than the screen
  // would leave a bare strip at the trailing edge for the rest of the cycle.
  // Small cards make that likely on wide monitors, so each copy repeats its
  // cards as many times as it takes to span the viewport. Measured rather
  // than assumed: card widths come from a clamp(), so they are not knowable
  // until layout has run.
  const [repeat, setRepeat] = useState(1);
  const setRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (still) return;

    const measure = () => {
      const setWidth = setRef.current?.offsetWidth ?? 0;
      if (!setWidth) return;
      setRepeat(Math.max(1, Math.ceil(window.innerWidth / setWidth)));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [still]);

  return (
    // Rows arrive one after another when the wall first scrolls into view.
    <motion.div
      className="relative overflow-hidden py-2"
      initial={still ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={still ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        still
          ? { duration: 0.2 }
          : { duration: 1, ease: sacredEase, delay: rowIndex * 0.16 }
      }
    >
      <motion.div
        ref={trackRef}
        className="flex w-max gap-3 sm:gap-4 lg:gap-5"
        style={still ? undefined : { x }}
      >
        {/* Two copies: the second is what the wrap lands on, and is hidden
            from assistive tech so photographs are not announced twice. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-3 sm:gap-4 lg:gap-5" aria-hidden={copy === 1}>
            {Array.from({ length: repeat }, (_, r) => (
              <div
                key={r}
                // The first set is the one measured for the repeat count.
                ref={copy === 0 && r === 0 ? setRef : undefined}
                className="flex gap-3 sm:gap-4 lg:gap-5"
              >
                {cards.map((entry, i) => (
                  <Card
                    key={i}
                    card={entry.card}
                    photo={entry.photo}
                    height={row.height}
                    lean={entry.lean}
                    still={still}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/** Slow gradient blooms that give the rows something to drift above. */
const blooms = [
  {
    className: "left-[-10%] top-[-6%] h-[52vw] w-[52vw] max-h-[600px] max-w-[600px]",
    tint: "rgba(215,185,122,0.55)",
    tempo: 22,
    shift: [0, 36, 0],
  },
  {
    className: "right-[-12%] top-[28%] h-[56vw] w-[56vw] max-h-[660px] max-w-[660px]",
    tint: "rgba(169,201,232,0.5)",
    tempo: 28,
    shift: [0, -30, 0],
  },
  {
    className: "bottom-[-12%] left-[30%] h-[48vw] w-[48vw] max-h-[560px] max-w-[560px]",
    tint: "rgba(206,176,163,0.5)",
    tempo: 25,
    shift: [0, 28, 0],
  },
];

const motes = [
  { left: "8%", top: "16%", size: 3, rise: 30, tempo: 13, delay: 0 },
  { left: "21%", top: "62%", size: 2, rise: 22, tempo: 16, delay: -3 },
  { left: "34%", top: "26%", size: 4, rise: 34, tempo: 15, delay: -7 },
  { left: "47%", top: "78%", size: 2, rise: 24, tempo: 18, delay: -1 },
  { left: "58%", top: "34%", size: 3, rise: 30, tempo: 14, delay: -9 },
  { left: "69%", top: "70%", size: 2, rise: 22, tempo: 17, delay: -5 },
  { left: "78%", top: "20%", size: 4, rise: 34, tempo: 12, delay: -2 },
  { left: "88%", top: "56%", size: 3, rise: 28, tempo: 19, delay: -11 },
  { left: "94%", top: "30%", size: 2, rise: 24, tempo: 15, delay: -6 },
];

/**
 * Edge-to-edge wall of drifting photographs. Three rows travel in alternating
 * directions and speed up with the page scroll, while individual cards turn
 * their photograph over one at a time — so the whole archive is shown without
 * ever crowding the screen. No captions by design: the wall is meant to be
 * looked at, not read.
 *
 * In `backdrop` mode it becomes the atmosphere *behind* a section's real
 * content: it fills its positioned parent, dims itself under a scrim so
 * foreground text keeps its contrast, and feathers away at all four edges.
 */
export function DriftCollage({ backdrop = false }: { backdrop?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const still = Boolean(reduce);

  const [assignment, setAssignment] = useState<number[]>(initialAssignment);
  const turn = useRef(0);
  const inView = useInView(sectionRef, { amount: 0.05 });

  // Scrolling drives the rows faster, which couples the wall to the reader's
  // own movement. It only ever adds speed — the drift never reverses, because
  // photographs snapping backwards reads as a glitch rather than an effect.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, (v) => 1 + Math.min(Math.abs(v) / 900, 3));

  useEffect(() => {
    if (still || !inView) return;

    const id = setInterval(() => {
      setAssignment((prev) => {
        const slot = turn.current % cardCount;
        turn.current += 1;

        // Resolve which shape this flat slot belongs to.
        const flat = rows.flatMap((row) => row.cards);
        const shape = flat[slot].shape;
        const pool = dokumPools[shape];

        // Never bring in a photograph another card is already showing.
        const onScreen = new Set(
          flat.map((c, i) => (i !== slot && c.shape === shape ? prev[i] : -1)),
        );

        let next = (prev[slot] + 1) % pool.length;
        for (let step = 0; step < pool.length && onScreen.has(next); step += 1) {
          next = (next + 1) % pool.length;
        }

        const updated = [...prev];
        updated[slot] = next;
        return updated;
      });
    }, TURN_INTERVAL);

    return () => clearInterval(id);
  }, [still, inView]);

  return (
    <div
      ref={sectionRef}
      className={
        backdrop
          ? "relative flex h-full w-full flex-col justify-center overflow-hidden"
          : "relative w-full"
      }
    >
      {/* Ambient depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {blooms.map((bloom, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[90px] ${bloom.className}`}
            style={{ background: `radial-gradient(circle, ${bloom.tint} 0%, transparent 70%)` }}
            animate={still ? undefined : { y: bloom.shift, scale: [1, 1.1, 1] }}
            transition={{ duration: bloom.tempo, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* The site's own clouds drift behind the wall, tying the section back
          to the Hero rather than letting it read as a foreign component. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span
          className="absolute left-[-8%] top-[2%] block w-[42vw] max-w-[420px] opacity-40"
          style={{
            animation: still ? undefined : "cloud-float 26s var(--ease-sacred) infinite alternate",
          }}
        >
          <Image
            src={assets.clouds.outline[1]}
            alt=""
            width={1920}
            height={1080}
            sizes="42vw"
            loading="lazy"
            className="h-auto w-full"
          />
        </span>
        <span
          className="absolute bottom-[4%] right-[-10%] block w-[46vw] max-w-[460px] opacity-35"
          style={{
            animation: still ? undefined : "cloud-float 31s var(--ease-sacred) -6s infinite alternate",
          }}
        >
          <Image
            src={assets.clouds.outline[2]}
            alt=""
            width={1920}
            height={1080}
            sizes="46vw"
            loading="lazy"
            className="h-auto w-full"
          />
        </span>
      </div>

      {/* Motes of light */}
      {!still && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {motes.map((mote, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-gold"
              style={{ left: mote.left, top: mote.top, width: mote.size, height: mote.size }}
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: [0.12, 0.5, 0.12], y: [0, -mote.rise, 0] }}
              transition={{
                duration: mote.tempo,
                delay: mote.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`relative z-10 flex flex-col gap-3 sm:gap-4 lg:gap-5 ${
          // Behind real content the photographs are atmosphere, not targets:
          // muted so foreground text keeps its contrast, and unhittable so
          // they never steal a hover or a click from the cards on top.
          backdrop ? "pointer-events-none opacity-[0.45]" : ""
        }`}
      >
        {rows.map((row, i) => (
          <Row
            key={i}
            row={row}
            rowIndex={i}
            assignment={assignment}
            still={still}
            active={inView}
            boost={boost}
          />
        ))}
      </div>

      {/* Scrim: heaviest through the middle band, where the foreground cards
          sit, and clearing towards the edges so the photographs still read. */}
      {backdrop && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            // Never clears completely: even at the edges a thin cream veil
            // stays, so the section heading keeps its contrast wherever it
            // happens to fall over the drift.
            background:
              "radial-gradient(ellipse 75% 70% at 50% 50%, var(--color-cream) 0%, rgba(255,251,244,0.85) 45%, rgba(255,251,244,0.42) 78%, rgba(255,251,244,0.16) 100%)",
          }}
        />
      )}

      {/* Cards dissolve into the background at both ends instead of being cut
          off by the viewport edge. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[8vw] max-w-[130px] bg-gradient-to-r from-cream via-cream/70 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[8vw] max-w-[130px] bg-gradient-to-l from-cream via-cream/70 to-transparent"
      />

      {/* As a backdrop the rows are taller than the section and would other-
          wise be sliced off mid-photograph at the top and bottom. */}
      {backdrop && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-gradient-to-b from-cream to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-cream to-transparent"
          />
        </>
      )}
    </div>
  );
}
