import sharp from "sharp";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

const SRC = "C:\\Users\\Idree\\.cursor\\projects\\c-Projects\\assets";
const DEST = "C:\\Projects\\southport-guide\\public\\images\\blog";

const images = [
  "blog-comedy-lineup.webp",
  "blog-armed-forces-day.webp",
  "blog-sausage-cider-fun.webp",
  "blog-cristal-palace.webp",
  "blog-southport-culture.webp",
  "blog-open-week-southport.webp",
  "blog-flower-show-guide.webp",
  "blog-august-southport.webp",
  "blog-airshow-crowds.webp",
];

let saved = 0;
for (const name of images) {
  const src = join(SRC, name);
  const dest = join(DEST, name);
  if (!existsSync(src)) {
    console.log(`MISSING: ${name}`);
    continue;
  }
  const tmp = dest + ".tmp.webp";
  const before = (await import("fs")).statSync(src).size;
  await sharp(src)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toFile(tmp);
  const { renameSync, statSync } = await import("fs");
  const after = statSync(tmp).size;
  renameSync(tmp, dest);
  const pct = Math.round((1 - after / before) * 100);
  saved += before - after;
  console.log(`✓ ${name}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${pct}%)`);
}
console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(1)} MB`);
