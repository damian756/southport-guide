/**
 * Process manually downloaded Southport Market Instagram images.
 *
 * Reads from:   C:\Users\Idree\Desktop\southport-market-instagram\[category]\
 * Writes to:    public/images/southport-market/[category]/   (images → WebP)
 *               public/videos/southport-market/              (videos → copied as-is)
 *
 * Converts all images to WebP (1200px wide, quality 76).
 * Copies MP4 videos directly — no conversion needed.
 * Merges results into the existing manifest.json.
 * Safe to re-run — skips already-processed files.
 *
 * Run from project root:
 *   node scripts/process-southport-market-instagram.mjs
 *
 * Options:
 *   --dry-run   Preview what would be processed without writing anything
 */

import sharp from "sharp";
import { mkdirSync, existsSync, writeFileSync, readFileSync, statSync, copyFileSync } from "fs";
import { readdirSync } from "fs";
import { join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, "..");
const DRY_RUN   = process.argv.includes("--dry-run");

// ── Config ────────────────────────────────────────────────────────────────────

const STAGING_DIR  = "C:\\Users\\Idree\\Desktop\\southport-market-instagram";
const IMG_OUT_BASE = join(ROOT, "public", "images", "southport-market");
const VID_OUT_DIR  = join(ROOT, "public", "videos", "southport-market");
const MANIFEST     = join(IMG_OUT_BASE, "manifest.json");

const IMG_W    = 1200;
const QUALITY  = 76;

const IMG_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VID_EXTS = new Set([".mp4", ".mov", ".webm"]);

const CATEGORIES = ["interior", "traders", "events", "artisan-market", "exterior", "historic"];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Sanitise a filename: lowercase, spaces → hyphens, remove unsafe chars */
function sanitise(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function processImage(srcPath, outPath) {
  const buf = readFileSync(srcPath);
  await sharp(buf)
    .resize(IMG_W, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outPath);
  return statSync(outPath).size;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🖼  Southport Market Instagram processor");
  console.log(`   Source:  ${STAGING_DIR}`);
  console.log(`   Images → ${IMG_OUT_BASE}`);
  console.log(`   Videos → ${VID_OUT_DIR}`);
  if (DRY_RUN) console.log("   DRY RUN — no files written");
  console.log();

  // Load existing manifest
  let manifest = [];
  if (existsSync(MANIFEST)) {
    try { manifest = JSON.parse(readFileSync(MANIFEST, "utf8")); } catch {}
  }
  const existingPaths = new Set(manifest.map(m => m.src));

  // Create output directories
  if (!DRY_RUN) {
    for (const cat of CATEGORIES) {
      mkdirSync(join(IMG_OUT_BASE, cat), { recursive: true });
    }
    mkdirSync(VID_OUT_DIR, { recursive: true });
  }

  let imgDone = 0, vidDone = 0, skipped = 0, failed = 0;
  const newEntries = [];

  for (const category of CATEGORIES) {
    const srcDir = join(STAGING_DIR, category);
    if (!existsSync(srcDir)) {
      console.log(`  ⚠  No folder: ${category} — skipping`);
      continue;
    }

    let files;
    try {
      files = readdirSync(srcDir).filter(f => !f.startsWith("."));
    } catch {
      continue;
    }

    if (files.length === 0) {
      console.log(`  –  ${category}/  (empty)`);
      continue;
    }

    console.log(`  📁  ${category}/  (${files.length} file${files.length !== 1 ? "s" : ""})`);

    for (const file of files) {
      const srcPath = join(srcDir, file);
      const ext     = extname(file).toLowerCase();
      const stem    = sanitise(basename(file, extname(file)));

      if (IMG_EXTS.has(ext)) {
        // ── Image ──────────────────────────────────────────────────────
        const outName   = `${stem}.webp`;
        const outPath   = join(IMG_OUT_BASE, category, outName);
        const publicPath = `/images/southport-market/${category}/${outName}`;

        if (existingPaths.has(publicPath) || (!DRY_RUN && existsSync(outPath))) {
          process.stdout.write(`     ⏭  ${outName} (already exists)\n`);
          skipped++;
          continue;
        }

        if (DRY_RUN) {
          process.stdout.write(`     🔍 [image] ${outName}\n`);
          imgDone++;
          continue;
        }

        try {
          const bytes = await processImage(srcPath, outPath);
          process.stdout.write(`     ✓  ${outName}  ${Math.round(bytes / 1024)}KB\n`);
          newEntries.push({ src: publicPath, category, source: "instagram" });
          imgDone++;
        } catch (e) {
          process.stdout.write(`     ✗  ${file}  (${e.message.slice(0, 50)})\n`);
          failed++;
        }

      } else if (VID_EXTS.has(ext)) {
        // ── Video ──────────────────────────────────────────────────────
        const outName    = `${stem}${ext}`;
        const outPath    = join(VID_OUT_DIR, outName);
        const publicPath = `/videos/southport-market/${outName}`;

        if (!DRY_RUN && existsSync(outPath)) {
          process.stdout.write(`     ⏭  ${outName} (already exists)\n`);
          skipped++;
          continue;
        }

        if (DRY_RUN) {
          const mb = Math.round(statSync(srcPath).size / (1024 * 1024));
          process.stdout.write(`     🔍 [video] ${outName}  ${mb}MB\n`);
          vidDone++;
          continue;
        }

        try {
          copyFileSync(srcPath, outPath);
          const mb = Math.round(statSync(outPath).size / (1024 * 1024));
          process.stdout.write(`     ✓  ${outName}  ${mb}MB  (video — copied as-is)\n`);
          newEntries.push({ src: publicPath, category, source: "instagram", type: "video" });
          vidDone++;
        } catch (e) {
          process.stdout.write(`     ✗  ${file}  (${e.message.slice(0, 50)})\n`);
          failed++;
        }

      } else {
        process.stdout.write(`     –  ${file}  (skipped — unsupported type ${ext})\n`);
      }
    }
  }

  // Update manifest
  if (!DRY_RUN && newEntries.length > 0) {
    const updated = [...manifest, ...newEntries];
    writeFileSync(MANIFEST, JSON.stringify(updated, null, 2));
    console.log(`\n  📋  Manifest updated — ${updated.length} total entries`);
  }

  // Summary
  console.log(`\n${"─".repeat(60)}`);
  if (DRY_RUN) {
    console.log(`DRY RUN — ${imgDone} images and ${vidDone} videos would be processed`);
  } else {
    console.log(`Done!`);
    console.log(`  ✓  Images converted to WebP: ${imgDone}`);
    console.log(`  ✓  Videos copied:            ${vidDone}`);
    console.log(`  ⏭  Skipped (cached):         ${skipped}`);
    console.log(`  ✗  Failed:                   ${failed}`);
  }
  console.log(`${"─".repeat(60)}\n`);
}

main().catch(e => {
  console.error("\nFatal error:", e.message);
  process.exit(1);
});
