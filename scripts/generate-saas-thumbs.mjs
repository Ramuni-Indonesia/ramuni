import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourceRoot = 'marketing-assets/screenshots/saas-e2e';
const outputRoot = 'public/website-original/product-screens/saas-e2e/thumbs';

for (const viewport of ['desktop', 'tablet', 'mobile']) {
  const sourceDir = path.join(sourceRoot, viewport);
  const outputDir = path.join(outputRoot, viewport);
  fs.mkdirSync(outputDir, { recursive: true });
  const width = viewport === 'desktop' ? 720 : viewport === 'tablet' ? 640 : 390;
  const files = fs.readdirSync(sourceDir).filter((name) => name.endsWith('.png')).sort();
  for (const name of files) {
    await sharp(path.join(sourceDir, name), { failOn: 'none' })
      .resize({ width, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 55, effort: 4, smartSubsample: true })
      .toFile(path.join(outputDir, name.replace(/\.png$/i, '.webp')));
  }
  console.log(`${viewport}: ${files.length} thumbnails`);
}
