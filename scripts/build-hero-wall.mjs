/**
 * Generator foto untuk photo-wall (kolom melayang) di belakang hero.
 *
 * Membaca src/data/hero-wall.json lalu menghasilkan:
 *   public/img/hero-wall/photo-XX.webp  -> foto dengan rasio asli (tanpa crop)
 *   src/data/hero-wall.generated.json   -> daftar file + ukurannya, dipakai komponen
 *
 * Jalankan: npm run hero-wall
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const config = JSON.parse(
  await fs.readFile(path.join(root, "src/data/hero-wall.json"), "utf8")
);

const sourceDir = path.resolve(root, config.sourceDir);
const outputDir = path.resolve(root, config.outputDir);
const { width: targetWidth, quality } = config.tile;

await fs.mkdir(outputDir, { recursive: true });

// Bersihkan hasil lama supaya tidak ada file yatim saat daftar foto berubah.
for (const file of await fs.readdir(outputDir)) {
  if (file.endsWith(".webp")) await fs.rm(path.join(outputDir, file));
}

/** Sumber boleh dari folder foto mentah, atau dari aset yang sudah ada di project. */
async function resolveSource(source) {
  const inProject = path.resolve(root, source);
  try {
    await fs.access(inProject);
    return inProject;
  } catch {
    return path.join(sourceDir, source);
  }
}

const manifest = [];
let totalBytes = 0;

for (const [index, photo] of config.photos.entries()) {
  const source = await resolveSource(photo.source);
  const file = `photo-${String(index + 1).padStart(2, "0")}.webp`;
  const outFile = path.join(outputDir, file);

  const { info } = await sharp(source)
    .rotate()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outFile)
    .then(async (result) => ({ info: result }));

  const { size: bytes } = await fs.stat(outFile);
  totalBytes += bytes;

  manifest.push({ file, width: info.width, height: info.height });
  console.log(
    `foto  ${file}  ${info.width}x${info.height}  ${Math.round(bytes / 1024)}KB  <- ${photo.source}`
  );
}

await fs.writeFile(
  path.join(root, "src/data/hero-wall.generated.json"),
  `${JSON.stringify(
    {
      _readme: "Dibuat otomatis oleh scripts/build-hero-wall.mjs - jangan diedit manual.",
      dir: `/${config.outputDir.replace(/^public\//, "")}`,
      photos: manifest,
    },
    null,
    2
  )}\n`
);

console.log(
  `\nSelesai. ${manifest.length} foto (${Math.round(totalBytes / 1024)}KB) di ${config.outputDir}`
);
