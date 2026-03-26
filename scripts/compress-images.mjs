import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const IMAGES_DIR = "./public/images";
const TARGETS = [
  "southport-fireworks-championship.webp",
  "southport-comedy-festival.webp",
  "southport-armed-forces-festival.webp",
  "southport-sausage-cider-festival.webp",
  "southport-year-of-culture-2026.webp",
];

for (const filename of TARGETS) {
  const filepath = join(IMAGES_DIR, filename);
  const tmp = filepath + ".tmp.webp";
  const before = (await import("fs")).statSync(filepath).size;
  await sharp(filepath)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(tmp);
  const after = (await import("fs")).statSync(tmp).size;
  (await import("fs")).renameSync(tmp, filepath);
  console.log(`${filename}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
}

console.log("Done.");
