/**
 * Single source of truth for static asset paths (served from /public/assets/perprodSI).
 * Treat these as world-building elements, not decorations.
 */
export const assets = {
  logo: {
    main: "/assets/perprodSI/logo/main-logo.png",
    rainbow: "/assets/perprodSI/logo/main-logo-rainbow.png",
    /** Same mark with a soft cream halo — reads as a sticker on busy grounds. */
    glow: "/assets/perprodSI/logo/main-logo-glow.webp",
    /** "NAVAJIVANA 2026" lettering, rose-gold with sparkles. */
    wordmark: "/assets/perprodSI/logo/wordmark.webp",
  },
  bg: {
    color: "/assets/perprodSI/bg/bg-color.webp",
    /** Two meru gates against a warm gold haze. Opaque — a full backdrop. */
    candi: "/assets/perprodSI/bg/candi.webp",
  },
  /** Ornamental rosettes. Transparent, square, meant to sit behind or around. */
  mandala: {
    starEmber: "/assets/perprodSI/mandala/star-ember.webp",
    bloomPastel: "/assets/perprodSI/mandala/bloom-pastel.webp",
    bloomLight: "/assets/perprodSI/mandala/bloom-light.webp",
    bloomCopper: "/assets/perprodSI/mandala/bloom-copper.webp",
    rosetteGold: "/assets/perprodSI/mandala/rosette-gold.webp",
  },
  /** Layered hills in earth tones, anchored to the bottom edge. */
  wave: "/assets/perprodSI/misc/wave.webp",
  sparkle: "/assets/perprodSI/misc/sparkle.webp",
  clouds: {
    // Filled clouds (square 2380×2380)
    soft: ["/assets/perprodSI/clouds/cloud-1.png", "/assets/perprodSI/clouds/cloud-2.png"],
    // Stylised swirl clusters, blue + amber (square 2380×2380)
    swirl: ["/assets/perprodSI/clouds/swirl-1.webp", "/assets/perprodSI/clouds/swirl-2.webp"],
    // Pre-composed drifts sized to a 4:5 frame
    layer: {
      all: "/assets/perprodSI/clouds/layer-all.webp",
      top: "/assets/perprodSI/clouds/layer-top.webp",
      bottom: "/assets/perprodSI/clouds/layer-bottom.webp",
      left: "/assets/perprodSI/clouds/layer-left.webp",
      right: "/assets/perprodSI/clouds/layer-right.webp",
      front: "/assets/perprodSI/clouds/layer-front.webp",
      full: "/assets/perprodSI/clouds/layer-full.webp",
    },
    // Outline clouds (16:9 1920×1080)
    outline: [
      "/assets/perprodSI/clouds/cloud-outline-1.png",
      "/assets/perprodSI/clouds/cloud-outline-2.png",
      "/assets/perprodSI/clouds/cloud-outline-3.png",
      "/assets/perprodSI/clouds/cloud-outline-4.png",
    ],
  },
  wayang: {
    center: "/assets/perprodSI/wayang/wayang.png",
    brown: "/assets/perprodSI/wayang/wayang-brown.png",
    left: "/assets/perprodSI/wayang/wayang-left.png",
    right: "/assets/perprodSI/wayang/wayang-right.png",
    /** Pale cream figure hugging the right edge — a watermark, not a subject. */
    orangRight: "/assets/perprodSI/wayang/orang-right.webp",
  },
  divider: "/assets/perprodSI/misc/divider.png",
  temple: "/assets/perprodSI/misc/temple.png",
  divisi: {
    dharani: "/assets/perprodSI/divisi/dharani.png",
    salila: "/assets/perprodSI/divisi/salila.png",
    pavaka: "/assets/perprodSI/divisi/pavaka.png",
    skandha: "/assets/perprodSI/divisi/skandha.png",
    anila: "/assets/perprodSI/divisi/anila.png",
    vajra: "/assets/perprodSI/divisi/vajra.png",
    kirana: "/assets/perprodSI/divisi/kirana.png",
  },
} as const;
