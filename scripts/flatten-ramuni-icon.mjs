import sharp from 'sharp';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error('Usage: node scripts/flatten-ramuni-icon.mjs INPUT OUTPUT');

const palette = [
  [255, 0, 255, 0],
  [11, 48, 69, 255],
  [22, 140, 140, 255],
  [242, 177, 52, 255],
  [244, 240, 231, 255],
  [255, 255, 255, 255],
];

const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let minX = info.width;
let minY = info.height;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const offset = (y * info.width + x) * 4;
    let best = palette[0];
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const candidate of palette) {
      const distance = (data[offset] - candidate[0]) ** 2 + (data[offset + 1] - candidate[1]) ** 2 + (data[offset + 2] - candidate[2]) ** 2;
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
    data.set(best, offset);
    if (best[3] > 0) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

if (maxX < minX || maxY < minY) throw new Error('No foreground remained after chroma-key removal');
const width = maxX - minX + 1;
const height = maxY - minY + 1;
const cropped = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .extract({ left: minX, top: minY, width, height })
  .png()
  .toBuffer();

await sharp(cropped)
  .resize(128, 128, { fit: 'contain', kernel: sharp.kernel.lanczos3, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ lossless: true, alphaQuality: 100 })
  .toFile(outputPath);

console.log(JSON.stringify({ inputPath, outputPath, source: `${info.width}x${info.height}`, crop: `${width}x${height}`, output: '160x160 lossless WebP' }));
