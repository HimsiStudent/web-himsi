/**
 * Generator aset kolase section #about.
 *
 * Membaca src/data/about-collage.json lalu menghasilkan:
 *   public/img/about-collage/<slot-id>.webp  -> foto yang sudah dipotong sesuai slot
 *   public/img/about-collage/deco.webp       -> layer ornamen halftone (transparan)
 *
 * Jalankan: npm run collage
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const config = JSON.parse(
  await fs.readFile(path.join(root, "src/data/about-collage.json"), "utf8")
);

const sourceDir = path.resolve(root, config.sourceDir);
const outputDir = path.resolve(root, config.outputDir);
const quality = config.quality ?? 80;

await fs.mkdir(outputDir, { recursive: true });

/** Ukuran gambar setelah orientasi EXIF diterapkan. */
function orientedSize(metadata) {
  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
  return rotated
    ? { width: metadata.height, height: metadata.width }
    : { width: metadata.width, height: metadata.height };
}

/** Kotak crop "cover" dengan titik fokus. */
function coverBox(width, height, targetRatio, focusX, focusY) {
  let cropWidth = width;
  let cropHeight = height;

  if (width / height > targetRatio) {
    cropWidth = Math.round(height * targetRatio);
  } else {
    cropHeight = Math.round(width / targetRatio);
  }

  const left = Math.round((width - cropWidth) * focusX);
  const top = Math.round((height - cropHeight) * focusY);

  return {
    left: Math.max(0, Math.min(left, width - cropWidth)),
    top: Math.max(0, Math.min(top, height - cropHeight)),
    width: cropWidth,
    height: cropHeight,
  };
}

async function buildSlot(slot) {
  const source = path.join(sourceDir, slot.source);
  const targetWidth = Math.round((slot.w / 100) * config.renderWidth);
  const targetHeight = Math.round((slot.h / 100) * config.renderWidth);

  // Rotasi EXIF diselesaikan lebih dulu supaya koordinat crop selalu benar.
  const upright = await sharp(source).rotate().toBuffer();
  const { width, height } = orientedSize(await sharp(source).metadata());
  const box = coverBox(
    width,
    height,
    targetWidth / targetHeight,
    slot.focusX ?? 0.5,
    slot.focusY ?? 0.5
  );

  const outFile = path.join(outputDir, `${slot.id}.webp`);
  await sharp(upright)
    .extract(box)
    .resize(targetWidth, targetHeight, { fit: "fill" })
    .webp({ quality })
    .toFile(outFile);

  return { file: path.basename(outFile), size: `${targetWidth}x${targetHeight}` };
}

/**
 * Ornamen halftone diambil dari kolase lama: area foto ditutup putih,
 * lalu putih diubah jadi transparan sehingga tersisa layer dekorasinya saja.
 */
async function buildDecoration() {
  const { from, file, padding = 5, width: outWidth } = config.decoration;
  const src = path.resolve(root, from);

  const { data, info } = await sharp(src)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const scaleX = width / 100;
  const scaleY = height / 100;

  for (const slot of config.slots) {
    const x0 = Math.max(0, Math.round(slot.x * scaleX) - padding);
    const y0 = Math.max(0, Math.round(slot.y * scaleY) - padding);
    const x1 = Math.min(width, Math.round((slot.x + slot.w) * scaleX) + padding);
    const y1 = Math.min(height, Math.round((slot.y + slot.h) * scaleY) + padding);

    for (let y = y0; y < y1; y += 1) {
      const rowStart = (y * width + x0) * channels;
      data.fill(255, rowStart, rowStart + (x1 - x0) * channels);
    }
  }

  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);
    const alpha = 255 - min;

    if (alpha < 6) continue; // praktis putih -> transparan penuh

    // Hanya tinta ornamen (oranye & biru) yang dipertahankan, sisa tepi foto dibuang.
    const isOrange = r > g && r - b > 20;
    const isBlue = b - r > 20;
    if (!isOrange && !isBlue) continue;

    // Un-premultiply terhadap latar putih agar warna tinta kembali pekat.
    const a = alpha / 255;
    rgba[j] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - a)) / a)));
    rgba[j + 1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - a)) / a)));
    rgba[j + 2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - a)) / a)));
    rgba[j + 3] = alpha;
  }

  const target = outWidth ?? width;
  const outFile = path.join(outputDir, file);
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize(target, Math.round((height / width) * target))
    .webp({ quality: 82, alphaQuality: 100, effort: 6 })
    .toFile(outFile);

  return { file, size: `${target}x${Math.round((height / width) * target)}` };
}

const deco = await buildDecoration();
console.log(`ornamen  ${deco.file.padEnd(14)} ${deco.size}`);

for (const slot of config.slots) {
  const result = await buildSlot(slot);
  console.log(`foto     ${result.file.padEnd(14)} ${result.size}  <- ${slot.source}`);
}

console.log(`\nSelesai. ${config.slots.length + 1} file di ${config.outputDir}`);
