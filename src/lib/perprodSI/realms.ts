import { assets } from "@/lib/perprodSI/assets";
import { colors, realms as realmTokens, type RealmKey } from "@/lib/perprodSI/design-system";

export type RealmContent = {
  key: RealmKey;
  name: string;
  element: string;
  /** Official division tag (from the emblem artwork). */
  roleTag: string;
  color: string;
  emblem: string;
  /** Short hook shown while collapsed. */
  tagline: string;
  /** Revealed on expand. */
  description: string;
  symbolism: string;
  role: string;
};

/**
 * The seven realms. Element symbolism is drawn from the project brief; the
 * roleTag is the authoritative division codename carried on each emblem.
 */
export const realms: RealmContent[] = [
  {
    key: "dharani",
    name: realmTokens.dharani.name,
    element: realmTokens.dharani.element, // Earth
    roleTag: "BPH",
    color: colors.earth,
    emblem: assets.divisi.dharani,
    tagline: "Badan Pengurus Harian",
    description:
      "Tanah tempat segalanya berpijak — tenang, kokoh, dan diam-diam menumbuhkan.",
    symbolism: "Bumi yang menahan akar dan menanggung beban perjalanan.",
    role: "Fondasi yang menjaga arah dan menopang seluruh gerak acara.",
  },
  {
    key: "salila",
    name: realmTokens.salila.name,
    element: realmTokens.salila.element, // Water
    roleTag: "ACARA",
    color: realmTokens.salila.color,
    emblem: assets.divisi.salila,
    tagline: "Divisi Acara",
    description:
      "Air yang luwes mengikuti bentuk, namun sabar menembus batu paling keras.",
    symbolism: "Aliran yang menyatukan setiap babak menjadi satu perjalanan.",
    role: "Merangkai alur acara agar mengalir tanpa pernah terputus.",
  },
  {
    key: "pavaka",
    name: realmTokens.pavaka.name,
    element: realmTokens.pavaka.element, // Fire
    roleTag: "KEAMANAN",
    color: realmTokens.pavaka.color,
    emblem: assets.divisi.pavaka,
    tagline: "Divisi Keamanan",
    description:
      "Api yang hangat menerangi sekaligus tegas melindungi mereka di sekitarnya.",
    symbolism: "Nyala yang memberi keberanian sekaligus batas yang aman.",
    role: "Menjaga setiap langkah tetap aman dan terkendali.",
  },
  {
    key: "skandha",
    name: realmTokens.skandha.name,
    element: realmTokens.skandha.element, // Wood
    roleTag: "PERLENGKAPAN",
    color: realmTokens.skandha.color,
    emblem: assets.divisi.skandha,
    tagline: "Divisi Perlengkapan",
    description:
      "Kayu yang lentur saat muda dan teguh saat matang — selalu siap menaungi.",
    symbolism: "Batang yang menyiapkan tempat bernaung dan bertumpu.",
    role: "Menyiapkan dan menopang segala perlengkapan perjalanan.",
  },
  {
    key: "anila",
    name: realmTokens.anila.name,
    element: realmTokens.anila.element, // Air
    roleTag: "PUBLIC RELATIONS",
    color: realmTokens.anila.color,
    emblem: assets.divisi.anila,
    tagline: "Divisi Public Relations",
    description:
      "Angin yang tak terlihat namun terasa di mana-mana, membawa setiap kabar.",
    symbolism: "Embusan yang menghubungkan jarak dan menyampaikan suara.",
    role: "Menyampaikan suara Navajivana hingga ke luar batas.",
  },
  {
    key: "vajra",
    name: realmTokens.vajra.name,
    element: realmTokens.vajra.element, // Lightning
    roleTag: "DOKVIS",
    color: realmTokens.vajra.color,
    emblem: assets.divisi.vajra,
    tagline: "Divisi Dokumentasi dan Visual",
    description:
      "Petir yang menyambar sekejap, namun terpatri abadi dalam ingatan.",
    symbolism: "Kilat yang mengabadikan momen tepat sebelum ia berlalu.",
    role: "Merekam dan merancang wajah visual dari setiap momen.",
  },
  {
    key: "kirana",
    name: realmTokens.kirana.name,
    element: realmTokens.kirana.element, // Light
    roleTag: "PIC",
    color: realmTokens.kirana.color,
    emblem: assets.divisi.kirana,
    tagline: "Divisi PIC",
    description:
      "Cahaya yang lembut menyentuh dan terang menuntun di tiap persimpangan.",
    symbolism: "Sinar yang menyingkap arah ketika langkah mulai ragu.",
    role: "Memancarkan informasi dan menerangi tiap langkah peserta.",
  },
];
