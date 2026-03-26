import sharp from "sharp";

const TARGETS = [
  "./public/images/blog/blog-southport-september-2026.webp",
  "./public/images/blog/blog-victoria-park-events.webp",
  "./public/images/blog/blog-southport-june-2026.webp",
  "./public/images/blog/blog-southport-spring-april.webp",
  "./public/images/blog/blog-open-2026-no-tickets.webp",
  "./public/images/blog/blog-august-bank-holiday-southport.webp",
];

for (const filepath of TARGETS) {
  const tmp = filepath + ".tmp.webp";
  const before = (await import("fs")).statSync(filepath).size;
  await sharp(filepath)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 70, effort: 6 })
    .toFile(tmp);
  const after = (await import("fs")).statSync(tmp).size;
  (await import("fs")).renameSync(tmp, filepath);
  const name = filepath.split("/").pop();
  console.log(`${name}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
}
console.log("Done.");
