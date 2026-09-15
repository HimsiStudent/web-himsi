This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Kolase Section "About"

Kolase foto di section `#about` (dulu satu file `public/img/about_section.webp`) sekarang
disusun per-foto lewat konfigurasi, jadi bisa diubah tanpa mengedit gambar di Photoshop.

- Konfigurasi: `src/data/about-collage.json`
  - `slots[]` = kotak foto. `x/y/w/h` dalam persen kanvas 1:1, `focusX/focusY` mengatur
    bagian foto yang dipertahankan saat di-crop, `source` = nama file di folder
    `asset tambahan/` (sejajar dengan folder `web-himsi`).
  - `spares[]` = foto cadangan yang belum dipakai, tinggal ditukar ke `source` slot mana pun.
- Generator aset: `npm run collage`
  Menghasilkan `public/img/about-collage/slot-XX.webp` (foto ter-crop) dan `deco.webp`
  (layer ornamen halftone oranye/biru yang diekstrak dari kolase lama).
- Komponen: `src/components/(pages)/home/about-section/about-collage.tsx`
- Gaya: blok "Kolase section #about" di `src/app/_lib/css/global.css` dan
  `src/app/_lib/css/media-queries.css`.

Alur mengubah kolase: edit JSON -> `npm run collage` -> cek `npm run dev`.

## Photo-Wall Hero

Background hero (dulu satu gambar `public/img/hero-compressed-hd.webp`) sekarang jadi
dinding foto hidup: foto disusun dalam kolom-kolom yang hanyut pelan berlawanan arah,
dan sesekali ada foto yang berganti dengan transisi silang. Rasio asli foto dipertahankan
(tidak dipotong jadi kotak) supaya tidak terlihat ke-zoom.

- Konfigurasi: `src/data/hero-wall.json`
  - `photos[]` = kolam foto. Nama file polos diambil dari folder `asset tambahan/`, sedangkan
    path yang diawali `public/` diambil dari aset yang sudah ada di project (foto angkatan,
    dokumentasi acara, dokumentasi perkenalan prodi). Urutannya jadi `photo-01`, `photo-02`, ...
  - `tile.width` / `tile.quality` = ukuran & kualitas file hasil (mempengaruhi berat halaman).
  - `motion`:
    - `columnPx` / `minColumnPx` / `maxColumns` -> lebar dan jumlah kolom
    - `driftSeconds` + `driftJitterSeconds` -> lama satu putaran hanyut (makin besar makin pelan;
      tiap kolom dapat variasi sendiri supaya tidak seragam)
    - `swapIntervalMs` / `fadeMs` -> jeda dan durasi pergantian foto
    - `poolPerLoad` -> berapa foto yang dipakai sekali muat (dipilih acak dari kolam, jadi
      susunannya beda tiap kunjungan dan halaman tidak perlu mengunduh seluruh kolam)
    - `gapPx` -> jarak antar foto
- Generator aset: `npm run hero-wall`
  Menghasilkan `public/img/hero-wall/photo-XX.webp` dan manifest
  `src/data/hero-wall.generated.json` (daftar file + ukurannya, dipakai komponen; jangan diedit manual).
- Komponen: `src/components/(pages)/home/hero-wall.tsx`
- Gaya: blok "Photo-wall hero" di `src/app/_lib/css/global.css`

Catatan: tinggi tiap kotak mengikuti rasio foto pertamanya dan tidak berubah, jadi putaran
animasi tetap mulus; foto pengganti selalu dipilih yang rasionya mirip. Animasi berhenti
sendiri saat hero tidak terlihat atau tab tidak aktif, dan dimatikan untuk pengguna dengan
preferensi `prefers-reduced-motion`.

## Optimasi Ukuran Gambar

Banyak gambar di `public/` tersimpan jauh lebih besar dari kebutuhan tampilnya
(contoh: `compile.webp` 3749x4999 padahal tampil 425x600; strip galeri 15 MB per file).

- Skrip: `npm run optimize-images` (`scripts/optimize-images.mjs`)
- Aturan target ada di bagian `rules` dalam skrip itu; tiap gambar dikecilkan ke
  **2x ukuran terbesarnya saat tampil** (aman untuk layar retina), lalu di-encode webp q82.
- Aman dijalankan berulang: file yang lebarnya sudah <= target akan dilewati.
- Dikecualikan: `public/img/about_section.webp` (sumber ornamen kolase about),
  `public/img/hero-wall/` dan `public/img/about-collage/` (sudah dihasilkan generator sendiri).
- Dua file berganti format saat dikecilkan, jadi rujukannya ikut diperbarui:
  `public/img/gallery/*.png` -> `.webp` (dipakai `about/gallery.tsx`) dan
  `public/LOGO-BIMSI.png` -> `.webp` (dipakai `home/bimsi-section.tsx`).

Kalau menambah gambar baru yang besar, tambahkan aturannya di skrip lalu jalankan sekali.
