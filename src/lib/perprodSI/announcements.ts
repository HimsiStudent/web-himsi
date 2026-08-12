export type AnnouncementItem = {
  /** Unique key. */
  id: string;
  /** Card title. */
  title: string;
  /** Brief summary shown below the title. */
  summary: string;
  /** Detail rows rendered inside the expandable body. */
  details: { label: string; value: string }[];
  /** Optional emphasised note beneath the details. */
  note?: string;
};

/**
 * Pengumuman items — kept in data so the component stays presentation-only.
 * Order is preserved as-written; add, remove, or reorder freely.
 */
export const announcements: AnnouncementItem[] = [
  {
    id: "jadwal",
    title: "Jadwal Kegiatan",
    summary:
      "Rangkuman waktu pelaksanaan setiap tahap Navajivana 2026.",
    details: [
      { label: "Hari Briefing", value: "Sabtu, 15 Agustus 2026" },
      { label: "Hari Perpaduan", value: "Selasa, 18 Agustus 2026" },
    ],
    note: "Jadwal dapat berubah sewaktu-waktu. Pantau grup resmi LINE untuk update terbaru.",
  },
  {
    id: "lokasi",
    title: "Lokasi & Tempat Kegiatan",
    summary:
      "Informasi lokasi pelaksanaan rangkaian kegiatan Navajivana 2026.",
    details: [
      { label: "Hari Briefing", value: "Dilakukan secara daring melalui Zoom Meeting" },
      { label: "Hari Perpaduan", value: "Gedung B Ruang Jawa Lantai 3 — Universitas Multimedia Nusantara" },
    ],
  },
  {
    id: "Atribut",
    title: "Atribut Wajib",
    summary:
      "Ketentuan atribut yang wajib digunakan selama rangkaian kegiatan.",
    details: [
      {
        label: "Atasan Berkerah",
        value: "Mempersiapkan kaos berkerah berwarna putih dan orange",
      },
      {
        label: "Jeans & Hijab",
        value: "Menggunakan jeans berwarna hitam. Khusus bagi yang berhijab, memakai hijab berwarna hitam",
      },
      {
        label: "Bando & Ikat Rambut",
        value: "Peserta berponi/berambut panjang wajib memakai bando/ikat rambut hitam",
      },
      {
        label: "Perhiasan & Riasan Wajah",
        value: "Dilarang menggunakan make up ataupun perhiasan",
      },
      {
        label: "Buku Tulis & Botol",
        value: "Membawa alat tulis, buku catatan, dan botol minum bukan sekali pakai",
      },
      {
        label: "Laptop & Earphone",
        value: "Mempersiapkan laptop dan earphone untuk kelancaran kegiatan daring",
      },
      {
        label: "Perangkat Lunak",
        value: "Menyiapkan Zoom, Figma, serta memastikan jaringan yang stabil",
      },
    ],
    note: "Pelanggaran ketentuan atribut akan ditegur langsung dan dapat berpengaruh pada kelulusan peserta.",
  },
  {
    id: "pengumpulan",
    title: "Pengumpulan Penugasan",
    summary:
      "Detail tenggat waktu dan mekanisme penyerahan tugas peserta.",
    details: [
      { label: "Format Penugasan", value: "File Figma" },
      { label: "Media Pengumpulan", value: "Google Form yang disediakan panitia" },
      { label: "Keterlambatan", value: "Tidak ada perpanjangan waktu. Pengumpulan setelah tenggat dianggap tidak mengumpulkan." },
    ],
    note: "Pastikan link Figma yang dikumpulkan dapat diakses. Kesalahan akses file menjadi tanggung jawab peserta.",
  },
];
