/**
 * Perkecil gambar yang ukurannya jauh melebihi kebutuhan tampilan.
 *
 * Target tiap gambar = 2x ukuran terbesarnya saat tampil di layar (aman untuk
 * layar retina), diukur langsung dari halaman: kartu event di home 425x600,
 * kartu di halaman event 578x325, modal event 680x383, logo 170x170,
 * produk himfact 512x472, foto angkatan tampil selebar layar.
 *
 * Aman dijalankan berulang: file yang lebarnya sudah <= target akan dilewati.
 *
 * Jalankan: npm run optimize-images
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** Aturan dibaca berurutan, yang pertama cocok dipakai. */
const rules = [
  // Dipakai generator ornamen kolase about - jangan disentuh.
  { match: "public/img/about_section.webp", skip: true },
  // Sudah dihasilkan generator sendiri dengan ukuran pas.
  { match: "public/img/hero-wall/*", skip: true },
  { match: "public/img/about-collage/*", skip: true },

  // Logo detail tampil besar (910px), beda dengan logo acara.
  { match: "public/img/logo-details.webp", maxWidth: 1820 },

  { match: "public/img/compile*.webp", maxWidth: 850 },
  { match: "public/img/event/*.webp", maxWidth: 1360 },
  { match: "public/img/logo-*.webp", maxWidth: 340 },
  { match: "public/LOGO-BIMSI.png", maxWidth: 600, toWebp: true },
  { match: "public/img/lanyard_*.webp", maxWidth: 1024 },
  { match: "public/img/jahim_front.webp", maxWidth: 1024 },
  { match: "public/img/himfact13_baju*.webp", maxWidth: 1024 },
  { match: "public/img/gen*.webp", maxWidth: 2560 },
  { match: "public/img/is-white.webp", maxWidth: 740 },
  { match: "public/img/umn-putih.webp", maxWidth: 200 },

  // Strip galeri: PNG 15MB per file, diubah jadi webp setinggi 2x tampilan.
  { match: "public/img/gallery/*.png", maxHeight: 600, toWebp: true, quality: 78 },
];

/** Pencocokan sederhana: "*" hanya berlaku pada nama file. */
function matches(pattern, file) {
  const dir = path.posix.dirname(pattern);
  if (path.posix.dirname(file) !== dir) return false;

  const base = path.posix.basename(pattern);
  if (!base.includes("*")) return base === path.posix.basename(file);

  const [head, tail] = base.split("*");
  const name = path.posix.basename(file);
  return name.startsWith(head) && name.endsWith(tail) && name.length >= head.length + tail.length;
}

function ruleFor(file) {
  return rules.find((rule) => matches(rule.match, file));
}

async function listImages(dir) {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listImages(rel)));
    } else if (/\.(webp|png|jpe?g)$/i.test(entry.name)) {
      files.push(rel);
    }
  }

  return files;
}

const extras = ["public/LOGO-BIMSI.png"];
const files = [...(await listImages("public/img"))];

for (const extra of extras) {
  try {
    await fs.access(path.join(root, extra));
    files.push(extra);
  } catch {
    // sudah diubah pada eksekusi sebelumnya
  }
}

let before = 0;
let after = 0;
const changed = [];

for (const file of files.sort()) {
  const rule = ruleFor(file);
  if (!rule || rule.skip) continue;

  const absolute = path.join(root, file);
  // Dibaca ke memori dulu: menulis ke file yang masih dibuka sharp akan gagal di Windows.
  const input = await fs.readFile(absolute);
  const meta = await sharp(input).metadata();

  const tooWide = rule.maxWidth && meta.width > rule.maxWidth;
  const tooTall = rule.maxHeight && meta.height > rule.maxHeight;
  if (!tooWide && !tooTall) continue;

  const sourceBytes = input.length;
  const target = rule.toWebp ? absolute.replace(/\.[^.]+$/, ".webp") : absolute;

  const keepPng = !rule.toWebp && path.extname(absolute).toLowerCase() === ".png";
  const pipeline = sharp(input).resize({
    width: rule.maxWidth,
    height: rule.maxHeight,
    fit: "inside",
    withoutEnlargement: true,
  });

  const buffer = await (keepPng
    ? pipeline.png({ compressionLevel: 9 })
    : pipeline.webp({ quality: rule.quality ?? 82, effort: 6 })
  ).toBuffer();

  if (buffer.length >= sourceBytes && !rule.toWebp) continue; // jangan sampai malah membengkak

  await fs.writeFile(target, buffer);
  if (target !== absolute) await fs.rm(absolute);

  const outMeta = await sharp(buffer).metadata();
  before += sourceBytes;
  after += buffer.length;
  changed.push({ file, target: path.posix.relative(root.replace(/\\/g, "/"), target.replace(/\\/g, "/")), sourceBytes, bytes: buffer.length, meta, outMeta });

  console.log(
    `${(sourceBytes / 1024).toFixed(0).padStart(6)}KB -> ${(buffer.length / 1024)
      .toFixed(0)
      .padStart(5)}KB   ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}   ${file}`
  );
}

if (changed.length === 0) {
  console.log("Semua gambar sudah sesuai target, tidak ada yang diubah.");
} else {
  console.log(
    `\n${changed.length} file: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(
      2
    )} MB (hemat ${((before - after) / 1024 / 1024).toFixed(2)} MB)`
  );
}
