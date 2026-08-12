export const colors = {
  cream: "#FFFBF4",
  ivory: "#F8F1E7",
  gold: "#D7B97A",
  earth: "#8B6D53",
  sky: "#A9C9E8",
  navy: "#24374A",

  // Extended palette — shared project swatch. Browns/terracotta are the
  // "title text" tones (see swatch annotation); reused inverted as the
  // Footer surface (cream text on brownDeep/maroon).
  brownDeep: "#370B03",
  maroon: "#57322A",
  umber: "#59453F",
  clay: "#97694F",
  terracotta: "#AA7971",
  rose: "#C6978F",
  rosePale: "#CEB0A3",
  blush: "#EFBBBD",
  coral: "#FD8483",
  brick: "#C55145",
  periwinklePale: "#BDCEF2",
  periwinkle: "#AFC5F0",
  peach: "#FFB39E",
  tealPale: "#C0D7DF",
  teal: "#55A2B2",
  tealLight: "#8EBAC9",
  honeyPale: "#F9E3AD",
  honey: "#DFBF4C",
  linen: "#FEF8EA",
  amberLight: "#FADA9E",
  amber: "#F1C751",
  amberDeep: "#B78B10",
} as const;

export const fonts = {
  heading: 'Cinzel, "Cormorant Garamond", Georgia, serif',
  body: '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif',
} as const;

export const spacing = {
  siteX: "clamp(1rem, 5vw, 5rem)",
  sectionY: "clamp(4rem, 10vw, 8rem)",
  contentMax: "72rem",
  measure: "42rem",
} as const;

export const realms = {
  dharani: {
    name: "DHARANI",
    element: "DIVISI",
    color: colors.earth,
  },
  salila: {
    name: "SALILA",
    element: "DIVISI",
    color: colors.sky,
  },
  pavaka: {
    name: "PAVAKA",
    element: "DIVISI",
    color: colors.gold,
  },
  skandha: {
    name: "SKANDHA",
    element: "DIVISI",
    color: "#6F7A54",
  },
  anila: {
    name: "ANILA",
    element: "DIVISI",
    color: "#B8D7E8",
  },
  vajra: {
    name: "VAJRA",
    element: "DIVISI",
    color: "#D9C66E",
  },
  kirana: {
    name: "KIRANA",
    element: "DIVISI",
    color: "#F0DFA6",
  },
} as const;

export type RealmKey = keyof typeof realms;
