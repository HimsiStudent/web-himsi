import { assets } from "@/lib/perprodSI/assets";

export type MilestoneStatus = "done" | "active" | "soon" | "upcoming";

export type Milestone = {
  /** Roman chapter marker shown inside the path node. */
  ordinal: string;
  /** Poetic chapter name. */
  phase: string;
  /** The concrete moment this chapter represents. */
  when: string;
  description: string;
  /** ISO date string (YYYY-MM-DD) used to auto-compute status. */
  date: string;
  status: MilestoneStatus;
  /** Optional decorative image displayed above the card. */
  image?: string;
};

/**
 * The journey as five chapters (babak) rather than a schedule. Progression is
 * carried by `status`; the final chapter echoes the tagline — Jejak Baru.
 * Status is computed automatically from `date` via `computeStatus` — no manual edits needed.
 */
export const milestones: Milestone[] = [
  {
    ordinal: "I",
    phase: "Pendaftaran Perkenalan Prodi",
    when: "Pembukaan",
    description:
      "Pendaftaran ini dibuka khusus bagi mahasiswa Sistem Informasi yang berstatus mengulang atau belum berkesempatan mengikuti rangkaian kegiatan perkenalan program studi pada periode sebelumnya.",
    date: "2026-07-01",
    status: "upcoming",
    image: assets.wayang.brown,
  },
  {
    ordinal: "II",
    phase: "Hari Briefing",
    when: "Pelaksanaan",
    description:
      "Sesi pemaparan informasi secara komprehensif mengenai alur kegiatan, tata tertib, serta penjelasan detail terkait penugasan yang harus diselesaikan oleh setiap peserta.",
    date: "2026-08-15",
    status: "upcoming",
  },
  {
    ordinal: "III",
    phase: "Pengumpulan Penugasan",
    when: "Tenggat Waktu",
    description:
      "Batas akhir penyerahan hasil karya atau penugasan yang telah diberikan saat hari briefing.",
    date: "2026-08-17",
    status: "upcoming",
  },
  {
    ordinal: "IV",
    phase: "Hari Perpaduan",
    when: "Puncak Acara",
    description:
      "Acara puncak yang dirancang sebagai momen integrasi dan kebersamaan. Kegiatan ini bertujuan untuk mempererat solidaritas serta semangat kolaborasi antar sesama mahasiswa.",
    date: "2026-08-18",
    status: "upcoming",
  },
  {
    ordinal: "V",
    phase: "Menjadi Mahasiswa SI",
    when: "Awal Perjalanan",
    description:
      "Langkah awal yang menandai bergabungnya mahasiswa secara resmi ke dalam keluarga besar Sistem Informasi. Sebuah gerbang untuk mulai belajar, berkolaborasi, dan berkembang bersama di dunia perkuliahan.",
    date: "2026-08-21",
    status: "upcoming",
  },
];

/**
 * Menghitung status setiap milestone secara otomatis berdasarkan tanggal hari ini.
 *
 * Logika:
 * - "done"     → tanggal sudah lewat
 * - "active"   → tanggal tepat hari ini (hari H)
 * - "soon"     → H-2 sampai H-1 (2 hari sebelum hari H)
 * - "upcoming" → lebih dari 2 hari lagi
 */
export function computeStatus(items: Milestone[]): Milestone[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return items.map((m) => {
    const d = new Date(m.date);
    d.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    let status: MilestoneStatus;
    if (diffDays === 0) status = "active";
    else if (d < today) status = "done";
    else if (diffDays <= 2) status = "soon";
    else status = "upcoming";

    return { ...m, status };
  });
}

/**
 * Array milestones dengan status yang sudah dihitung otomatis berdasarkan tanggal.
 * komponen sebagai pengganti `milestones` langsung.
 */
export const computedMilestones: Milestone[] = computeStatus(milestones);
