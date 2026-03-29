/**
 * Download and localise all business listing images.
 *
 * For each business with a Google CDN image URL (lh3.googleusercontent.com):
 *   1. Downloads the image via HTTP
 *   2. Compresses to WebP (800px wide, quality 78) using sharp
 *   3. Saves to public/images/businesses/{slug}.webp
 *   4. Updates the DB images column to ['/images/businesses/{slug}.webp']
 *
 * If a CDN URL is expired (403/404), and the business has a placeId,
 * it will try to refresh the URL via the Google Places API first.
 *
 * Run from project root:
 *   node scripts/download-business-images.mjs
 *
 * Options:
 *   --dry-run     Print what would be done without downloading/writing
 *   --limit N     Only process N businesses (for testing)
 *   --slug SLUG   Process only a specific business slug
 */

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
dotenv.config({ path: join(ROOT, ".env.local") });

// ── Config ───────────────────────────────────────────────────────────────────

const OUT_DIR   = join(ROOT, "public", "images", "businesses");
const IMG_W     = 800;
const QUALITY   = 78;
const CONCURRENCY = 8;       // parallel downloads
const DELAY_MS    = 150;     // ms between batches

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const LIMIT   = args.includes("--limit") ? parseInt(args[args.indexOf("--limit") + 1]) : null;
const SLUG    = args.includes("--slug")  ? args[args.indexOf("--slug") + 1] : null;

// ── DB ────────────────────────────────────────────────────────────────────────

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma  = new PrismaClient({ adapter });

// ── Helpers ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "SouthportGuide/1.0 image-downloader" },
    });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

async function refreshGoogleUrl(placeId) {
  if (!GOOGLE_API_KEY || !placeId) return null;
  try {
    const detailsRes = await fetchWithTimeout(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`
    );
    if (!detailsRes.ok) return null;
    const data = await detailsRes.json();
    const ref  = data.result?.photos?.[0]?.photo_reference;
    if (!ref) return null;

    const photoRes = await fetchWithTimeout(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${GOOGLE_API_KEY}`,
      10000
    );
    // Follow one redirect level if needed
    const cdnUrl = photoRes.headers.get("location") ?? photoRes.url;
    return cdnUrl || null;
  } catch {
    return null;
  }
}

async function downloadAndCompress(url, outPath) {
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuf = await res.arrayBuffer();
  const inputBuf = Buffer.from(arrayBuf);
  await sharp(inputBuf)
    .resize(IMG_W, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outPath);
  const bytes = (await import("fs")).statSync(outPath).size;
  return bytes;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  // Query: all non-parking businesses with Google CDN image URLs
  let businesses = await prisma.$queryRaw`
    SELECT b.id, b.slug, b."placeId", b.images[1] AS current_image,
           c.slug AS category
    FROM "Business" b
    JOIN "Category" c ON b."categoryId" = c.id
    WHERE c.slug != 'parking'
      AND (
        b.images[1] LIKE '%googleusercontent%'
        OR b.images[1] LIKE '%maps.googleapis%'
      )
    ORDER BY c.slug, b.name
  `;

  if (SLUG) businesses = businesses.filter(b => b.slug === SLUG);
  if (LIMIT) businesses = businesses.slice(0, LIMIT);

  const total = businesses.length;
  console.log(`\n🖼  Business image downloader`);
  console.log(`   Output: ${OUT_DIR}`);
  console.log(`   To process: ${total}`);
  console.log(`   Concurrency: ${CONCURRENCY}`);
  if (DRY_RUN) console.log(`   DRY RUN — no files written\n`);
  else console.log();

  let done = 0, skipped = 0, refreshed = 0, failed = 0;

  // Process in batches
  for (let i = 0; i < businesses.length; i += CONCURRENCY) {
    const batch = businesses.slice(i, i + CONCURRENCY);

    await Promise.all(batch.map(async (b) => {
      const outPath   = join(OUT_DIR, `${b.slug}.webp`);
      const localUrl  = `/images/businesses/${b.slug}.webp`;
      const prefix    = `[${String(i + batch.indexOf(b) + 1).padStart(4)}/${total}]`;

      // Already downloaded in a previous run — just update DB
      if (existsSync(outPath)) {
        if (!DRY_RUN) {
          await prisma.$executeRaw`UPDATE "Business" SET images = ${[localUrl]}::text[] WHERE id = ${b.id}`;
        }
        process.stdout.write(`${prefix} ⏭  ${b.slug}\n`);
        skipped++;
        return;
      }

      if (DRY_RUN) {
        process.stdout.write(`${prefix} 🔍 ${b.slug} (${b.category})\n`);
        done++;
        return;
      }

      let imageUrl = b.current_image;

      // Try primary URL first
      try {
        const bytes = await downloadAndCompress(imageUrl, outPath);
        await prisma.$executeRaw`UPDATE "Business" SET images = ${[localUrl]}::text[] WHERE id = ${b.id}`;
        process.stdout.write(`${prefix} ✓  ${b.slug}  ${Math.round(bytes / 1024)}KB\n`);
        done++;
        return;
      } catch (e) {
        // Primary failed — try refreshing via Places API if we have a placeId
        if (b.placeId) {
          try {
            const freshUrl = await refreshGoogleUrl(b.placeId);
            if (freshUrl) {
              const bytes = await downloadAndCompress(freshUrl, outPath);
              await prisma.$executeRaw`UPDATE "Business" SET images = ${[localUrl]}::text[] WHERE id = ${b.id}`;
              process.stdout.write(`${prefix} ↺  ${b.slug}  ${Math.round(bytes / 1024)}KB  (refreshed)\n`);
              refreshed++;
              return;
            }
          } catch {}
        }
        // Both failed — remove partial file if created
        if (existsSync(outPath)) { try { unlinkSync(outPath); } catch {} }
        process.stdout.write(`${prefix} ✗  ${b.slug}  (${e.message.slice(0, 40)})\n`);
        failed++;
      }
    }));

    if (i + CONCURRENCY < businesses.length) await sleep(DELAY_MS);

    // Progress summary every 50 items
    const processed = Math.min(i + CONCURRENCY, total);
    if (processed % 50 === 0 || processed === total) {
      console.log(`\n   Progress: ${processed}/${total} | ✓ ${done} | ↺ ${refreshed} | ⏭ ${skipped} | ✗ ${failed}\n`);
    }
  }

  console.log(`\n${"─".repeat(60)}`);
  console.log(`Done!`);
  console.log(`  ✓  Downloaded & compressed: ${done}`);
  console.log(`  ↺  Refreshed via Places API: ${refreshed}`);
  console.log(`  ⏭  Already cached (skipped): ${skipped}`);
  console.log(`  ✗  Failed: ${failed}`);
  console.log(`  📁  Images saved to: ${OUT_DIR}`);
  console.log(`${"─".repeat(60)}\n`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
