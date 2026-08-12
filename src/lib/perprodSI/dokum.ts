/**
 * Documentation photographs, drifting behind the Quick Access cards.
 *
 * The source RAW files (CR2/CR3/NEF) in /public/assets/dokum are not
 * browser-decodable; each has a WebP derivative in /public/assets/dokum/web
 * (a 1000px-wide display copy plus an `@full` higher-quality copy). Intrinsic
 * dimensions mirror that folder's manifest.json — they are declared here so
 * next/image can reserve space and the masonry never reflows on load.
 *
 * Order is deliberate: aspect ratios alternate (landscape / portrait / wide)
 * so the columns stay balanced and the collage never falls into a visible grid.
 */

type SourcePhoto = {
  slug: string;
  width: number;
  height: number;
  /** Screen-reader description only — never rendered as a visible caption. */
  alt: string;
};

const sources: SourcePhoto[] = [
  { slug: "kedatangan-01", width: 1000, height: 667, alt: "Peserta berdatangan di hari pertama." },
  { slug: "sesi-02", width: 1000, height: 1500, alt: "Suasana sesi bersama pemateri." },
  { slug: "kelompok-01", width: 1000, height: 667, alt: "Kebersamaan dalam kelompok kecil." },
  { slug: "daring-01", width: 1000, height: 527, alt: "Pertemuan daring bersama peserta." },
  { slug: "sesi-01", width: 1000, height: 667, alt: "Peserta menyimak jalannya sesi." },
  { slug: "kelompok-02", width: 1000, height: 1500, alt: "Diskusi hangat antar anggota kelompok." },
  { slug: "daring-02", width: 1000, height: 526, alt: "Layar pertemuan daring yang terisi penuh." },
  { slug: "apresiasi-01", width: 1000, height: 667, alt: "Momen apresiasi bagi para peserta." },
  { slug: "sesi-03", width: 1000, height: 667, alt: "Ruang sesi yang penuh perhatian." },
  { slug: "daring-03", width: 1000, height: 523, alt: "Wajah-wajah peserta dalam pertemuan daring." },
  { slug: "kelompok-04", width: 1000, height: 1500, alt: "Kelompok berkumpul menyusun rencana." },
  { slug: "sesi-04", width: 1000, height: 667, alt: "Catatan dan percakapan di sela sesi." },
  { slug: "kedatangan-02", width: 1000, height: 667, alt: "Langkah pertama memasuki rangkaian acara." },
  { slug: "daring-04", width: 1000, height: 523, alt: "Sesi daring yang berlangsung bersama." },
  { slug: "apresiasi-02", width: 1000, height: 667, alt: "Penyerahan apresiasi di penghujung acara." },
  { slug: "kelompok-03", width: 1000, height: 667, alt: "Potret kelompok setelah kegiatan." },
  { slug: "daring-05", width: 1000, height: 523, alt: "Kebersamaan yang tetap terjaga dari jarak jauh." },
  { slug: "sesi-05", width: 1000, height: 667, alt: "Penutup sesi yang meninggalkan kesan." },
];

/**
 * Frames are fixed-aspect, so a photograph is only ever rotated into a frame
 * whose shape matches it — a 2:3 portrait dropped into a 3:2 frame would lose
 * half its subject to the crop.
 */
export type Orientation = "landscape" | "portrait" | "wide";

function orientationOf({ width, height }: SourcePhoto): Orientation {
  const ratio = width / height;
  if (ratio < 0.9) return "portrait";
  if (ratio > 1.7) return "wide";
  return "landscape";
}

export type DokumPhoto = SourcePhoto & {
  src: string;
  /** Higher-quality encode, reserved for the largest viewports. */
  srcFull: string;
  orientation: Orientation;
};

export const dokumPhotos: DokumPhoto[] = sources.map((photo) => ({
  ...photo,
  src: `/assets/perprodSI/dokum/web/${photo.slug}.webp`,
  srcFull: `/assets/perprodSI/dokum/web/${photo.slug}@full.webp`,
  orientation: orientationOf(photo),
}));

/** Photographs bucketed by shape — the rotation pool for each frame. */
export const dokumPools: Record<Orientation, DokumPhoto[]> = {
  landscape: dokumPhotos.filter((p) => p.orientation === "landscape"),
  portrait: dokumPhotos.filter((p) => p.orientation === "portrait"),
  wide: dokumPhotos.filter((p) => p.orientation === "wide"),
};
