// Usage: node scripts/optimise-location-photos.mjs <slug> <cover.jpg> <interior.jpg>...
// Writes public/images/locations/<slug>/cover-01.webp and interior-NN.webp (WebP, q80, no EXIF).
// Covers are capped at 2400px on the long edge, gallery shots at 1600px. Order of interior
// arguments is the order they appear on the page.
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

// sharp ships with Next; resolve it through next so it doesn't need its own dependency.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const [slug, cover, ...interiors] = process.argv.slice(2);
if (!slug || !cover) {
  console.error("Usage: node scripts/optimise-location-photos.mjs <slug> <cover.jpg> [interior.jpg...]");
  process.exit(1);
}

const outDir = join("public/images/locations", slug);
mkdirSync(outDir, { recursive: true });

async function convert(src, name, maxEdge) {
  const out = join(outDir, `${name}.webp`);
  const info = await sharp(src)
    .rotate() // apply EXIF orientation before metadata is dropped
    .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(`${src} -> ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

await convert(cover, "cover-01", 2400);
for (const [i, src] of interiors.entries()) {
  await convert(src, `interior-${String(i + 1).padStart(2, "0")}`, 1600);
}
