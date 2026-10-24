// Builds public/thumbs/<id>.webp from each portfolio item's poster.
// Run `npm run thumbs` after adding videos to src/data/work.js.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { WORK, SHOWREEL, posterOf } = await import(pathToFileURL(path.join(root, "src/data/work.js")).href);
const outDir = path.join(root, "public/thumbs");
fs.mkdirSync(outDir, { recursive: true });

let made = 0;
for (const item of [...WORK, SHOWREEL]) {
  // Self-hosted items ship their thumbnail in public/thumbs already.
  if (item.local) continue;
  const res = await fetch(posterOf(item), { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) {
    console.warn(`skipped ${item.id}: HTTP ${res.status}`);
    continue;
  }
  const width = item.ratio === "9:16" ? 480 : 800;
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(outDir, `${item.id}.webp`));
  made++;
}
console.log(`wrote ${made} thumbnails to public/thumbs`);
