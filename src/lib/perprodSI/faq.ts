/**
 * FAQ content — pertanyaan seputar perkenalan program studi. Edit isi array
 * ini untuk menambah, mengubah, atau menghapus pertanyaan; struktur dan
 * tampilan (lihat FAQ.tsx) tidak perlu disentuh.
 */
export type FAQItem = {
  question: string;
  answer: string;
  /**
   * Grouping used by the category filter. Keep the number of distinct values
   * well below the number of questions — a category that matches only one
   * question makes the filter pointless.
   */
  category: string;
};

/** A single scannable fact shown in the quick-facts strip above the list. */
export type FAQHighlight = {
  label: string;
  value: string;
};

/** A category and the questions filed under it, in source order. */
export type FAQGroup = {
  category: string;
  /** Stable DOM id, used by the sidebar's topic links. */
  slug: string;
  entries: FAQItem[];
};

/** `Pelaksanaan` -> `faq-pelaksanaan`. */
export function faqCategorySlug(category: string): string {
  return `faq-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

/** Groups questions by category, preserving the order they first appear in. */
export function groupFAQs(items: FAQItem[]): FAQGroup[] {
  const byCategory = new Map<string, FAQItem[]>();

  for (const item of items) {
    const entries = byCategory.get(item.category);
    if (entries) entries.push(item);
    else byCategory.set(item.category, [item]);
  }

  return Array.from(byCategory, ([category, entries]) => ({
    category,
    slug: faqCategorySlug(category),
    entries,
  }));
}

export const faqHighlights: FAQHighlight[] = [
  { label: "Peserta", value: "Seluruh mahasiswa baru" },
  { label: "Sifat kegiatan", value: "Wajib diikuti" },
  { label: "Informasi resmi", value: "Kanal & grup panitia" },
];

export const faqs: FAQItem[] = [
  {
    category: "Umum",
    question: "Apa itu Navajivana?",
    answer:
      "Navajivana adalah rangkaian kegiatan perkenalan program studi yang mengangkat tema “Beginning Anew — Becoming Starts Now”, sebuah gerbang bagi mahasiswa baru untuk mengenal program studi, lingkungan akademik, dan komunitasnya.",
  },
  {
    category: "Peserta",
    question: "Siapa saja yang wajib mengikuti kegiatan ini?",
    answer:
      "Seluruh mahasiswa baru program studi pada tahun akademik berjalan wajib mengikuti seluruh rangkaian kegiatan perkenalan program studi, kecuali ada pemberitahuan khusus dari panitia.",
  },
  {
    category: "Pelaksanaan",
    question: "Di mana dan kapan kegiatan akan dilaksanakan?",
    answer:
      "Jadwal dan lokasi lengkap akan diinformasikan melalui pengumuman resmi panitia dan grup komunikasi masing-masing kelompok. Pastikan untuk selalu memantau kanal informasi resmi.",
  },
  {
    category: "Pelaksanaan",
    question: "Apa saja yang perlu dipersiapkan atau dibawa?",
    answer:
      "Perlengkapan yang perlu dibawa akan disampaikan melalui panduan teknis (technical meeting) sebelum hari pelaksanaan. Umumnya meliputi kelengkapan administrasi, atribut, dan perlengkapan pribadi sesuai instruksi panitia.",
  },
  {
    category: "Peserta",
    question: "Bagaimana jika saya berhalangan hadir?",
    answer:
      "Jika berhalangan hadir karena alasan mendesak, segera hubungi penanggung jawab kelompok atau panitia untuk berkoordinasi mengenai izin dan konsekuensinya.",
  },
  {
    category: "Umum",
    question: "Ke mana saya bisa bertanya jika ada hal yang belum jelas?",
    answer:
      "Silakan hubungi panitia melalui kontak resmi yang tertera pada materi pengenalan, atau tanyakan langsung kepada penanggung jawab kelompok masing-masing.",
  },
];
