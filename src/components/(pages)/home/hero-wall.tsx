"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import config from "@/data/hero-wall.json";
import generated from "@/data/hero-wall.generated.json";

const PHOTOS = generated.photos.map((photo) => ({
  src: `${generated.dir}/${photo.file}`,
  ratio: photo.width / photo.height,
}));

const {
  columnPx,
  minColumnPx,
  maxColumns,
  gapPx,
  driftSeconds,
  driftJitterSeconds,
  swapIntervalMs,
  fadeMs,
  poolPerLoad,
} = config.motion;

/** Susunan awal untuk render server / tanpa JS. */
const SSR_COLUMNS = 5;
const SSR_PER_COLUMN = 5;

type Slot = {
  ratio: number;
  front: number;
  back: number;
  showBack: boolean;
  /** Lapisan kedua baru dipasang setelah kotak ini pernah berganti foto. */
  swapped: boolean;
};
type Column = { slots: Slot[]; duration: number };

function shuffled(length: number) {
  const list = Array.from({ length }, (_, i) => i);
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/** Foto pengganti dicari yang rasionya mirip supaya tidak ikut ter-crop banyak. */
function similarPhotos(ratio: number, exclude: number[], allowed?: number[]) {
  const pool = allowed ?? PHOTOS.map((_, index) => index);
  const options = pool
    .map((index) => ({ index, photo: PHOTOS[index] }))
    .filter(({ index }) => !exclude.includes(index));

  const close = options.filter(
    ({ photo }) => Math.abs(photo.ratio - ratio) / ratio < 0.25
  );

  return (close.length > 0 ? close : options).map(({ index }) => index);
}

/**
 * Bangun kolom: foto diambil dari "kantong" acak sampai tingginya melebihi hero,
 * jadi satu putaran animasi selalu menutupi layar penuh.
 */
function buildColumns(
  columnCount: number,
  columnWidth: number,
  minHeight: number,
  random: boolean
): Column[] {
  // Sekali muat hanya sebagian kolam yang dipakai supaya halaman tidak berat;
  // foto sisanya tetap bisa muncul lewat pergantian foto.
  const pool = (
    random
      ? shuffled(PHOTOS.length)
      : Array.from({ length: PHOTOS.length }, (_, i) => i)
  ).slice(0, Math.min(poolPerLoad, PHOTOS.length));

  let bag: number[] = [];

  const take = () => {
    if (bag.length === 0) {
      bag = random ? shuffled(pool.length).map((i) => pool[i]) : pool.slice();
    }
    return bag.shift() as number;
  };

  return Array.from({ length: columnCount }, (_, column) => {
    const slots: Slot[] = [];
    let height = 0;

    while (height < minHeight || slots.length < 4) {
      const front = take();
      const { ratio } = PHOTOS[front];
      const back = similarPhotos(ratio, [front], pool)[0] ?? front;

      slots.push({ ratio, front, back, showBack: false, swapped: false });
      height += columnWidth / ratio + gapPx;
    }

    const jitter = random ? Math.random() : (column % 3) / 3;

    return { slots, duration: driftSeconds + jitter * driftJitterSeconds };
  });
}

/** Pilih satu kotak yang akan berganti foto beserta penggantinya. */
function pickSwap(columns: Column[]) {
  if (columns.length === 0) return null;

  const column = Math.floor(Math.random() * columns.length);
  const slots = columns[column].slots;
  if (slots.length === 0) return null;

  const index = Math.floor(Math.random() * slots.length);
  const slot = slots[index];
  const showing = slot.showBack ? slot.back : slot.front;

  const neighbours = [slots[index - 1], slots[index + 1]]
    .filter(Boolean)
    .map((item) => (item.showBack ? item.back : item.front));

  const options = similarPhotos(slot.ratio, [showing, ...neighbours]);
  if (options.length === 0) return null;

  return {
    column,
    index,
    slot,
    choice: options[Math.floor(Math.random() * options.length)],
  };
}

/** Lebar kolom menyesuaikan lebar hero, dibatasi maxColumns. */
function measure(width: number) {
  const target = Math.max(minColumnPx, Math.min(columnPx, width / 4));
  const count = Math.min(maxColumns, Math.max(2, Math.round(width / target)));
  return { count, width: width / count };
}

export default function HeroWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Column[]>(() =>
    buildColumns(SSR_COLUMNS, 240, SSR_PER_COLUMN * 240, false)
  );
  const [columnCount, setColumnCount] = useState(SSR_COLUMNS);
  const [active, setActive] = useState(false);

  const columnsRef = useRef(columns);
  columnsRef.current = columns;

  // Ukur hero, lalu susun ulang kolom hanya bila jumlah kolomnya berubah.
  useEffect(() => {
    const element = wallRef.current;
    if (!element) return;

    let lastCount = 0;
    let lastHeight = 0;

    const apply = () => {
      const { width, height } = element.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const grid = measure(width);
      const changed =
        grid.count !== lastCount || Math.abs(height - lastHeight) > 120;
      if (!changed) return;

      lastCount = grid.count;
      lastHeight = height;
      setColumnCount(grid.count);
      setColumns(buildColumns(grid.count, grid.width, height * 1.15, true));
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animasi hanya jalan saat hero terlihat dan tab sedang aktif.
  useEffect(() => {
    const element = wallRef.current;
    if (!element) return;

    let visible = true;
    let onScreen = true;
    const sync = () => setActive(visible && onScreen);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.02 }
    );
    observer.observe(element);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Sesekali satu foto berganti dengan transisi silang, tinggi kotaknya tetap.
  // Foto pengganti boleh datang dari seluruh kolam, jadi dimuat dulu sebelum ditukar.
  useEffect(() => {
    if (!active || reducedMotion || PHOTOS.length < 3) return;

    let cancelled = false;

    const timer = window.setInterval(() => {
      const plan = pickSwap(columnsRef.current);
      if (!plan) return;

      const image = new window.Image();
      const apply = () => {
        if (cancelled) return;

        setColumns((prev) => {
          const slots = prev[plan.column]?.slots;
          if (!slots || slots[plan.index] !== plan.slot) return prev;

          const next = prev.slice();
          const nextSlots = slots.slice();

          nextSlots[plan.index] = plan.slot.showBack
            ? { ...plan.slot, front: plan.choice, showBack: false, swapped: true }
            : { ...plan.slot, back: plan.choice, showBack: true, swapped: true };
          next[plan.column] = { ...prev[plan.column], slots: nextSlots };

          return next;
        });
      };

      image.onload = apply;
      image.onerror = apply;
      image.src = PHOTOS[plan.choice].src;
    }, swapIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [active, reducedMotion]);

  return (
    <div
      ref={wallRef}
      className={`hero-wall${active ? "" : " is-paused"}`}
      aria-hidden="true"
      style={
        {
          "--hero-wall-cols": columnCount,
          "--hero-wall-gap": `${gapPx}px`,
          "--hero-wall-fade": `${fadeMs}ms`,
        } as CSSProperties
      }
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className={`hero-wall-col${index % 2 === 1 ? " is-reverse" : ""}`}
          style={{ "--hero-wall-duration": `${column.duration}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div className="hero-wall-strip" key={copy}>
              {column.slots.map((slot, slotIndex) => (
                <div
                  className="hero-wall-photo"
                  key={slotIndex}
                  style={{ aspectRatio: `${slot.ratio}` }}
                >
                  <img
                    src={PHOTOS[slot.front].src}
                    alt=""
                    decoding="async"
                    style={{ opacity: slot.showBack ? 0 : 1 }}
                  />
                  {slot.swapped && (
                    <img
                      className="hero-wall-layer-in"
                      src={PHOTOS[slot.back].src}
                      alt=""
                      decoding="async"
                      style={{ opacity: slot.showBack ? 1 : 0 }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
