export type Rule = {
  text: string;
  /** "Catatan" lines that qualify the rule above it. */
  notes?: string[];
};

export type RuleCategory = {
  /** Roman chapter marker, consistent with the Timeline's numbering. */
  ordinal: string;
  title: string;
  /** Short qualifier for where/when the chapter applies. */
  subtitle?: string;
  rules: Rule[];
};

/**
 * Peraturan peserta Navajivana 2026 — dua babak sesuai format pelaksanaan:
 * hari briefing (daring via Zoom) dan hari kegiatan di kampus (luring).
 * Sumber: dokumen peraturan divisi Pavaka.
 */
export const ruleCategories: RuleCategory[] = [
  {
    ordinal: "I",
    title: "Hari Briefing (Zoom)",
    subtitle: "Kegiatan daring",
    rules: [
      {
        text: "Peserta WAJIB mengikuti seluruh rangkaian kegiatan Navajivana 2026 dari awal hingga akhir. Perizinan hanya dapat dilakukan untuk kondisi darurat seperti sakit, duka, ataupun kondisi darurat lainnya dan harus melaporkan kepada PIC dengan melampirkan bukti yang jelas.",
      },
      {
        text: "Peserta WAJIB menghadiri rangkaian acara tepat waktu, batas keterlambatan hanya 5 menit sejak kegiatan dimulai.",
      },
      {
        text: "Peserta DILARANG menggunakan riasan muka, kontak lensa berwarna, kutek, eyelash extension, pomade, anting, kalung, gelang, jam tangan, tato, dan aksesoris lainnya.",
        notes: [
          "Segala bentuk aksesoris bisa dilepas / dihapus, dan tato bisa ditutup dengan perban / hansaplast.",
        ],
      },
      {
        text: "Peserta yang berambut panjang wajib diikat dan bagi yang berponi panjang wajib menggunakan bando atau jepitan.",
        notes: [
          "Rambut laki-laki dan perempuan yang tidak bisa diikat tetapi menutupi alis dan menyentuh daun telinga wajib menggunakan bando atau dijepit.",
        ],
      },
      {
        text: "Peserta DILARANG untuk mengkonsumsi makanan, merokok, dan melakukan kegiatan lainnya yang tidak berhubungan dengan kegiatan Navajivana 2026.",
        notes: ["Minum diperbolehkan."],
      },
      {
        text: "Peserta DIHARAPKAN dapat menyiapkan kuota internet dan jaringan yang stabil.",
      },
      {
        text: "Segala bentuk kendala dan perizinan WAJIB dilaporkan kepada KIRANA (PIC) masing-masing dan PAVAKA (Keamanan) yang bertugas, dengan memberikan alasan yang jelas dan bukti yang kuat jika diperlukan.",
      },
      {
        text: "Peserta WAJIB mengganti penamaan Zoom dengan format NomorKelompok_NamaLengkap.",
      },
      {
        text: "Peserta WAJIB mengaktifkan kamera dan mengatur posisi tubuh sejajar dengan kamera agar terlihat jelas minimal mulai dari kepala hingga ke pundak.",
      },
      {
        text: "Peserta DILARANG menggunakan filter atau efek apapun, baik efek untuk wajah maupun efek pengubah suara.",
      },
      {
        text: "Peserta WAJIB berada pada tempat yang kondusif selama rangkaian kegiatan berlangsung; peserta tidak diperkenankan berada di dalam toilet, di kasur, dan di tempat umum.",
      },
      {
        text: "Peserta hanya diperbolehkan untuk menyalakan mikrofon ketika diminta, selain itu peserta dihimbau untuk mematikan mikrofon.",
      },
      {
        text: "Peserta DILARANG untuk membuat keributan selama kegiatan berlangsung.",
      },
      {
        text: "Peserta tidak diperbolehkan untuk didampingi oleh orang lain selama kegiatan berlangsung.",
      },
      {
        text: "DILARANG melakukan pencemaran nama baik UMN atau Navajivana 2026.",
      },
      {
        text: "Peserta WAJIB berpakaian sopan sesuai dengan ketentuan.",
      },
      {
        text: "Tidak diperbolehkan melakukan perekaman pada saat pembacaan tugas oleh MC, harus ditulis tangan. Jika ada yang ketahuan melakukan perekaman ataupun menerima hasil rekaman akan dinyatakan gugur dan mengulang perkenalan prodi Sistem Informasi tahun depan.",
      },
    ],
  },
  {
    ordinal: "II",
    title: "Hari Kegiatan (Kampus UMN)",
    subtitle: "Kegiatan luring",
    rules: [
      {
        text: "Peserta WAJIB mengikuti seluruh rangkaian kegiatan Navajivana 2026 dari awal hingga akhir. Perizinan hanya dapat dilakukan untuk kondisi darurat seperti sakit, duka, ataupun kondisi darurat lainnya dan harus melaporkan kepada PIC dengan melampirkan bukti yang jelas.",
      },
      {
        text: "Peserta WAJIB menghadiri rangkaian acara tepat waktu, dengan batas keterlambatan hanya 5 menit sejak kegiatan dimulai.",
      },
      {
        text: "Peserta DILARANG menggunakan riasan muka, kontak lensa berwarna, kutek, eyelash extension, pomade, anting, kalung, gelang, jam tangan, tato, dan aksesoris lainnya.",
        notes: [
          "Segala bentuk aksesoris bisa dilepas / dihapus, dan tato bisa ditutup dengan perban / hansaplast.",
        ],
      },
      {
        text: "Peserta yang berambut panjang wajib diikat dan bagi yang berponi panjang wajib menggunakan bando atau jepitan.",
        notes: [
          "Rambut laki-laki dan perempuan yang tidak bisa diikat tetapi menutupi alis dan menyentuh daun telinga wajib menggunakan bando atau dijepit.",
        ],
      },
      {
        text: "Peserta DILARANG untuk mengkonsumsi makanan dan melakukan kegiatan lainnya yang tidak berhubungan dengan kegiatan yang sedang berlangsung.",
        notes: ["Peserta diperbolehkan membawa botol minum tidak sekali pakai."],
      },
      {
        text: "Segala bentuk kendala dan perizinan WAJIB dilaporkan kepada KIRANA (PIC) masing-masing dan PAVAKA (Keamanan) yang bertugas, dengan memberikan alasan yang jelas dan bukti yang kuat jika diperlukan.",
      },
      {
        text: "Peserta WAJIB menonaktifkan (mematikan daya) gawai yang dibawa dan dititipkan kepada KIRANA (PIC) masing-masing kelompok.",
        notes: [
          "Peserta diharapkan untuk menginfokan hal ini dan memberikan kontak KIRANA (PIC) kepada orangtua/walinya sebelum rangkaian acara.",
          "Segala kondisi darurat peserta yang memerlukan gawai untuk menghubungi orangtua atau wali wajib menggunakan gawai KIRANA (PIC) masing-masing, begitu juga sebaliknya orangtua diharapkan untuk menghubungi peserta melalui kontak KIRANA (PIC).",
          "Perlu diingat, hal ini hanya dapat dilakukan dalam kondisi tertentu atau dalam kondisi darurat.",
        ],
      },
      {
        text: "Bagi peserta yang membawa kendaraan pribadi, DILARANG parkir di dalam lingkungan kampus UMN.",
        notes: [
          "Tidak disediakan area parkir di kampus dan keamanan area di luar kampus tidak menjadi tanggung jawab UMN maupun panitia Navajivana 2026.",
        ],
      },
      {
        text: "Peserta WAJIB menjaga kebersihan ruangan dan lingkungan UMN.",
      },
      {
        text: "Peserta DILARANG berkata dan bertindak kasar.",
      },
      {
        text: "Peserta DILARANG untuk membuat keributan ketika kegiatan sedang berlangsung.",
      },
      {
        text: "Peserta DILARANG melakukan pencemaran nama baik UMN atau Navajivana 2026.",
      },
      {
        text: "Peserta WAJIB berpakaian sopan dan atribut sesuai dengan ketentuan.",
      },
      {
        text: "Peserta WAJIB menggunakan tas serut atau “String Bag”.",
      },
      {
        text: "Segala bentuk kehilangan barang milik peserta tidak menjadi tanggung jawab UMN maupun seluruh panitia Navajivana 2026.",
      },
      {
        text: "Selama kegiatan Navajivana 2026 berlangsung, seluruh peraturan kampus tetap berlaku.",
      },
      {
        text: "Peserta WAJIB berperilaku dan bertutur kata sopan kepada seluruh warga kampus, serta menerapkan 5S (Senyum, Sapa, Salam, Sopan, Santun).",
      },
      {
        text: "DILARANG melakukan kekerasan verbal dan nonverbal terhadap semua peserta, panitia, dan staf kampus.",
      },
    ],
  },
];
