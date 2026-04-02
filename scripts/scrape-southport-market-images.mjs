/**
 * Scrape and download all images from southportmarket.com.
 *
 * Permission to use their content granted verbally by Jordan Khokhar,
 * Senior General Manager for Tourism and Economic Growth, Sefton Council.
 *
 * Images are saved to:
 *   public/images/southport-market/
 *     interior/      — carousel bar, seating, main hall
 *     traders/       — individual trader food and stall photos
 *     events/        — Extravaganza Room, seasonal, private hire
 *     historic/      — pre-2021 market photos (1881–2020 era)
 *     artisan-market/ — Artisan Market and Makers Market days
 *     exterior/      — building exterior
 *
 * Each image is converted to WebP (1200px wide, quality 76).
 * Skips already-downloaded files (idempotent — safe to re-run).
 * Writes a manifest to public/images/southport-market/manifest.json.
 *
 * Run from project root:
 *   node scripts/scrape-southport-market-images.mjs
 *
 * Options:
 *   --dry-run   Show what would be downloaded without saving
 */

import sharp from "sharp";
import { mkdirSync, existsSync, writeFileSync, statSync } from "fs";
import { join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DRY_RUN = process.argv.includes("--dry-run");

// ── Output config ─────────────────────────────────────────────────────────────

const BASE_OUT  = join(ROOT, "public", "images", "southport-market");
const IMG_W     = 1200;
const QUALITY   = 76;
const CATEGORIES = ["interior", "traders", "events", "historic", "artisan-market", "exterior"];

// ── Pages to scrape ───────────────────────────────────────────────────────────
// Each entry: URL to fetch + default category if no keyword match.

const PAGES = [
  { url: "https://southportmarket.com/",                   defaultCategory: "interior"       },
  { url: "https://southportmarket.com/our-story/",         defaultCategory: "historic"       },
  { url: "https://southportmarket.com/find-us",            defaultCategory: "exterior"       },
  { url: "https://southportmarket.com/faqs/",              defaultCategory: "interior"       },
  { url: "https://southportmarket.com/pop-up-marketplace/", defaultCategory: "artisan-market" },
  { url: "https://southportmarket.com/information",        defaultCategory: "interior"       },
];

// ── Keyword → category mapping ────────────────────────────────────────────────
// Checked against the full image URL (lowercased). First match wins.

const KEYWORD_RULES = [
  // Historic
  { keywords: ["1881", "1913", "1931", "original", "old-market", "traditional", "historic", "archive", "vintage", "earl"],            category: "historic"       },
  // Artisan / makers market
  { keywords: ["artisan", "maker", "craft", "stall", "market-day", "makers"],                                                          category: "artisan-market" },
  // Events / private hire / seasonal
  { keywords: ["christmas", "festive", "xmas", "party", "event", "hire", "wedding", "corporate", "extravaganza", "birthday", "nye"],   category: "events"         },
  // Individual traders / food
  { keywords: ["tikka", "600-degree", "brunch", "bagel", "pitamu", "greek", "pasta", "korean", "lennys", "smash", "burger",
               "cake", "baker", "blackhurst", "butcher", "food", "pizza", "curry", "sushi", "trader"],                                 category: "traders"        },
  // Bar
  { keywords: ["carousel", "bar", "cocktail", "ale", "gin", "beer", "drink", "coffee"],                                               category: "interior"       },
  // Exterior
  { keywords: ["exterior", "outside", "entrance", "frontage", "king-street", "building"],                                             category: "exterior"       },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "SouthportGuide/1.0 content-archiver (southportguide.co.uk)",
      "Accept": "text/html",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ── UI/decoration patterns to skip entirely ───────────────────────────────────
const SKIP_PATTERNS = [
  /favicon/i,
  /\/revslider\//i,          // slider plugin assets
  /dummy/i,                  // slider placeholder
  /logo[-_]/i,               // site logos
  /logo\.(png|jpg|gif)/i,
  /logo-retina/i,
  /flourish/i,               // decorative curls
  /wave.*bg/i,               // wave background textures
  /wavebg/i,
  /background-santa/i,
  /background-snow/i,
  /upcoming-events-badge/i,
  /newsletter-badge/i,
  /submit-button-badge/i,
  /stall-number-badge/i,
  /footer-telephone/i,
  /footer-clock/i,
  /hear-from-you-graphic/i,
  /contact-us-information-background/i,
  /lightsalmon-wavebg/i,
  /white-wavebg/i,
  /lightblue-wavebg/i,
  /alt-flourish/i,
  /TA-right-/i,              // TripAdvisor widget images
  /sefton_council_badge/i,   // council badge (we have our own)
  /spinner/i,
  /placeholder/i,
];

/**
 * WordPress generates multiple resized variants of every image:
 *   image-name-300x200.jpg, image-name-1024x684.jpg, image-name-2048x1367.jpg …
 * plus the original:
 *   image-name.jpg  (or image-name-scaled.jpg for very large originals)
 *
 * This function groups URLs by their "base" (stem without -NNNxNNN suffix)
 * and returns only one URL per group — preferring the original/scaled
 * (no dimension suffix), or the largest resized variant if no original exists.
 */
function deduplicateWordPressVariants(urls) {
  // Parse each URL into { url, base, pathname, width, height }
  const parsed = urls.map(url => {
    const u   = new URL(url);
    const p   = u.pathname;
    const ext = extname(p);                            // .jpg / .png etc.
    const stem = basename(p, ext);                    // filename without ext

    // Match WordPress suffix pattern: -1024x684 or -1536x1025-scaled etc.
    const dimMatch = stem.match(/^(.+?)-(\d+)x(\d+)(-scaled)?$/);
    if (dimMatch) {
      return {
        url,
        base: u.origin + dirname(p) + "/" + dimMatch[1] + ext,
        width: parseInt(dimMatch[2], 10),
        height: parseInt(dimMatch[3], 10),
        isResized: true,
      };
    }
    // Original or -scaled version
    return {
      url,
      base: url,   // itself is the base
      width: Infinity,
      height: Infinity,
      isResized: false,
    };
  });

  // Group by base URL
  const groups = new Map();
  for (const item of parsed) {
    const key = item.base;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  // From each group, pick the best candidate:
  // 1. The non-resized original (width = Infinity), OR
  // 2. The largest resized variant (highest width)
  const result = [];
  for (const candidates of groups.values()) {
    candidates.sort((a, b) => b.width - a.width);  // original (Infinity) sorts first
    result.push(candidates[0].url);
  }
  return result;
}

/** Extract all image src URLs from raw HTML */
function extractImageUrls(html, baseUrl) {
  const rawUrls = new Set();

  // <img src="..." />
  for (const match of html.matchAll(/\bsrc=["']([^"']+\.(jpg|jpeg|png|webp|gif))["']/gi)) {
    rawUrls.add(match[1]);
  }
  // srcset="url 1x, url 2x, ..."
  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const part of match[1].split(",")) {
      const raw = part.trim().split(/\s+/)[0];
      if (/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(raw)) rawUrls.add(raw);
    }
  }
  // og:image / twitter:image meta tags
  for (const match of html.matchAll(/content=["']([^"']+\.(jpg|jpeg|png|webp|gif))["']/gi)) {
    rawUrls.add(match[1]);
  }
  // CSS background-image urls
  for (const match of html.matchAll(/url\(["']?([^"')]+\.(jpg|jpeg|png|webp|gif))["']?\)/gi)) {
    rawUrls.add(match[1]);
  }

  const base = new URL(baseUrl);

  // Resolve to absolute and filter
  const absolute = [...rawUrls]
    .map(u => { try { return new URL(u, base).href; } catch { return null; } })
    .filter(Boolean)
    .filter(u => new URL(u).hostname.includes("southportmarket"))
    .filter(u => !SKIP_PATTERNS.some(p => p.test(u)));

  // Deduplicate WordPress resized variants — keep only best per original
  return deduplicateWordPressVariants(absolute);
}

/** Determine category from the image URL and the page's default category */
function categorise(imageUrl, defaultCategory) {
  const lower = imageUrl.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule.category;
  }
  return defaultCategory;
}

/** Clean a URL into a safe filename stem */
function toFilename(imageUrl) {
  const u = new URL(imageUrl);
  const raw = basename(u.pathname);
  // Strip query string from filename if any
  const stem = raw.replace(/\?.*$/, "").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
  const ext  = extname(stem) || ".jpg";
  const name = stem.slice(0, stem.length - ext.length)
    .replace(/-+/g, "-")
    .slice(0, 80);
  return name || "image";
}

async function downloadAndSave(imageUrl, outPath) {
  const res = await fetch(imageUrl, {
    headers: { "User-Agent": "SouthportGuide/1.0 content-archiver" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  await sharp(buf)
    .resize(IMG_W, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outPath);

  return statSync(outPath).size;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n📸  Southport Market image scraper");
  console.log(`   Output: ${BASE_OUT}`);
  console.log(`   Resize: ${IMG_W}px wide, WebP quality ${QUALITY}`);
  if (DRY_RUN) console.log("   DRY RUN — no files written");
  console.log();

  // Create output directories
  if (!DRY_RUN) {
    for (const cat of CATEGORIES) {
      mkdirSync(join(BASE_OUT, cat), { recursive: true });
    }
  }

  // Collect all image URLs across all pages
  const seen  = new Set();   // deduplicate by URL
  const queue = [];          // { imageUrl, category, outPath, publicPath }

  for (const page of PAGES) {
    let html;
    try {
      html = await fetchHtml(page.url);
      console.log(`  ✓ Fetched ${page.url}`);
    } catch (e) {
      console.log(`  ✗ Failed  ${page.url} — ${e.message}`);
      continue;
    }

    const urls = extractImageUrls(html, page.url);
    console.log(`    Found ${urls.length} image URLs`);

    for (const imageUrl of urls) {
      if (seen.has(imageUrl)) continue;
      seen.add(imageUrl);

      const category  = categorise(imageUrl, page.defaultCategory);
      const filename  = toFilename(imageUrl);
      const outPath   = join(BASE_OUT, category, `${filename}.webp`);
      const publicPath = `/images/southport-market/${category}/${filename}.webp`;

      queue.push({ imageUrl, category, outPath, publicPath, filename });
    }

    await sleep(300); // polite delay between pages
  }

  console.log(`\n  Total unique images found: ${queue.length}\n`);

  // Download
  const manifest = [];
  let downloaded = 0, skipped = 0, failed = 0;

  for (const item of queue) {
    const prefix = `[${String(queue.indexOf(item) + 1).padStart(3)}/${queue.length}]`;

    if (!DRY_RUN && existsSync(item.outPath)) {
      process.stdout.write(`${prefix} ⏭  ${item.category}/${item.filename}.webp  (already exists)\n`);
      manifest.push({ src: item.publicPath, category: item.category, source: item.imageUrl });
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      process.stdout.write(`${prefix} 🔍 [${item.category}] ${item.filename}  (${item.imageUrl.slice(0, 70)})\n`);
      downloaded++;
      continue;
    }

    try {
      const bytes = await downloadAndSave(item.imageUrl, item.outPath);
      process.stdout.write(`${prefix} ✓  ${item.category}/${item.filename}.webp  ${Math.round(bytes / 1024)}KB\n`);
      manifest.push({ src: item.publicPath, category: item.category, source: item.imageUrl });
      downloaded++;
    } catch (e) {
      process.stdout.write(`${prefix} ✗  ${item.category}/${item.filename}  (${e.message.slice(0, 50)})\n`);
      failed++;
    }

    await sleep(150); // polite delay between downloads
  }

  // Write manifest
  if (!DRY_RUN && manifest.length > 0) {
    const manifestPath = join(BASE_OUT, "manifest.json");
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n  📋  Manifest written to public/images/southport-market/manifest.json`);
  }

  // Summary by category
  if (!DRY_RUN) {
    console.log("\n  Images by category:");
    for (const cat of CATEGORIES) {
      const count = manifest.filter(m => m.category === cat).length;
      if (count > 0) console.log(`    ${cat.padEnd(16)} ${count}`);
    }
  }

  console.log(`\n${"─".repeat(60)}`);
  if (DRY_RUN) {
    console.log(`DRY RUN complete — ${downloaded} images would be downloaded`);
  } else {
    console.log(`Done!`);
    console.log(`  ✓  Downloaded: ${downloaded}`);
    console.log(`  ⏭  Skipped (cached): ${skipped}`);
    console.log(`  ✗  Failed: ${failed}`);
    console.log(`  📁  Saved to: ${BASE_OUT}`);
  }
  console.log(`${"─".repeat(60)}\n`);
}

main().catch(e => {
  console.error("\nFatal error:", e.message);
  process.exit(1);
});
