/**
 * LLM-powered description generator for SouthportGuide business listings.
 * Uses OpenRouter (Gemini Flash) to generate genuine, Terry-voice descriptions.
 *
 * Targets high-priority categories first: restaurants, hotels, bars, cafes,
 * then everything else — ranked by (rating × log(reviewCount+1)) within each category.
 *
 * Run:
 *   npx tsx scripts/generate-llm-descriptions.ts
 *   npx tsx scripts/generate-llm-descriptions.ts --limit 20     (test run)
 *   npx tsx scripts/generate-llm-descriptions.ts --category restaurants
 *   npx tsx scripts/generate-llm-descriptions.ts --overwrite    (redo all, not just blanks)
 */

import { config as loadEnv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Load .env then .env.local so local overrides (and OPENROUTER_API_KEY lives in .env.local)
loadEnv({ path: ".env" });
loadEnv({ path: ".env.local", override: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error(
    "Missing OPENROUTER_API_KEY. Add it to .env.local (see .env.example). " +
      "If a key was ever committed to git, rotate it at https://openrouter.ai/keys before use."
  );
  process.exit(1);
}

const MODEL = "google/gemini-2.0-flash-001";

// Parse CLI args
const args = process.argv.slice(2);
const LIMIT = (() => { const i = args.indexOf("--limit"); return i !== -1 ? parseInt(args[i + 1]) : Infinity; })();
const CATEGORY_FILTER = (() => { const i = args.indexOf("--category"); return i !== -1 ? args[i + 1] : null; })();
const OVERWRITE = args.includes("--overwrite");

// Category processing order — most commercially important first
const CATEGORY_ORDER = [
  "restaurants",
  "hotels",
  "bars-nightlife",
  "cafes",
  "golf",
  "attractions",
  "shopping",
  "wellness",
  "activities",
  "beaches-parks",
  "parking",
  "transport",
];

function extractArea(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Marshside",
                 "Formby", "Ormskirk", "Scarisbrick", "Banks", "Halsall", "Burscough"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

function formatOpeningHours(oh: unknown): string {
  if (!oh || typeof oh !== "object") return "";
  const hours = oh as { weekdayText?: string[] };
  if (!hours.weekdayText?.length) return "";
  return hours.weekdayText.join(", ");
}

function buildPrompt(b: {
  name: string;
  address: string;
  postcode: string;
  shortDescription: string | null;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  openingHours: unknown;
  phone: string | null;
  website: string | null;
  tags: string[];
  category: { slug: string; name: string };
}): string {
  const area = extractArea(b.address);
  const location = area === "Southport" ? "Southport town centre" : `${area}, Southport`;
  const hoursStr = formatOpeningHours(b.openingHours);
  const catSlug = b.category.slug;

  const facts = [
    `Name: ${b.name}`,
    `Category: ${b.category.name}`,
    `Location: ${location} (Merseyside)`,
    b.shortDescription ? `Key detail: ${b.shortDescription}` : null,
    b.rating ? `Google rating: ${b.rating.toFixed(1)}/5${b.reviewCount ? ` (${b.reviewCount.toLocaleString()} reviews)` : ""}` : null,
    b.priceRange ? `Price range: ${b.priceRange}` : null,
    hoursStr ? `Opening hours: ${hoursStr}` : null,
    b.phone ? `Phone: ${b.phone}` : null,
    b.website ? `Website: ${b.website}` : null,
    b.tags?.length ? `Tags: ${b.tags.join(", ")}` : null,
  ].filter(Boolean).join("\n");

  const contextHints: Record<string, string> = {
    restaurants: "Mention whether it suits families, couples, or both. Mention booking ahead at weekends if relevant. Be specific about what type of food or atmosphere if you can infer it.",
    hotels: "The Open Championship 2026 is at Royal Birkdale (12-19 July) — mention this naturally if the hotel is relevant. Mention whether it suits families or couples.",
    "bars-nightlife": "Mention atmosphere honestly. Note if it's a local pub, sports bar, cocktail bar etc. Mention whether dogs are welcome if the tags suggest it.",
    cafes: "Mention whether it suits a quick stop or a longer sit-down. Good for rainy day? Mention if there's cake, proper coffee, etc.",
    golf: "Royal Birkdale hosts The Open 2026 — mention this if relevant. Be specific about the type of course (links, parkland). Mention green fees or booking if you can.",
    parking: "Lead with the most practical info — is it free or paid, how busy does it get, where exactly is it relative to key destinations.",
    attractions: "Mention whether it suits families with kids. Is it indoor or outdoor? Year-round or seasonal?",
  };

  const categoryHint = contextHints[catSlug] || "";

  return `You are writing a business listing description for SouthportGuide.co.uk — a local guide to Southport, Merseyside.

The tone is written by Terry: a 41-year-old Southport local who has lived in Churchtown his whole life. He writes like a trusted local friend giving honest, practical recommendations — not like a brochure or PR copy. He is warm but not gushing. He names specifics. He is honest about catches.

STRICT RULES:
- Southport is in MERSEYSIDE — never Lancashire
- NEVER use: hidden gem, nestled, stunning vistas, picturesque, discerning, vibrant, breathtaking, world-class, truly unique, a must-visit, quaint, charming, unforgettable, iconic, bustling, foodie paradise
- Write 3–4 paragraphs, around 150–220 words total
- Lead with something specific and useful, not a generic opener
- Use real data from the facts below — rating, review count, hours, phone
- End with one practical note (booking, parking, hours, what to bring)
- Separate paragraphs with a blank line
- Output ONLY the description text — no headers, no quotes, no markdown

Business facts:
${facts}

${categoryHint}`;
}

async function callOpenRouter(prompt: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://southportguide.co.uk",
      "X-Title": "SouthportGuide Description Generator",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content?.trim() ?? "";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`\n🚀 LLM Description Generator — SouthportGuide`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   Overwrite mode: ${OVERWRITE ? "YES (all listings)" : "NO (skip if description exists)"}`);
  if (CATEGORY_FILTER) console.log(`   Category filter: ${CATEGORY_FILTER}`);
  if (LIMIT !== Infinity) console.log(`   Limit: ${LIMIT}`);
  console.log();

  // Fetch businesses in priority order
  const categories = CATEGORY_FILTER
    ? [CATEGORY_FILTER]
    : CATEGORY_ORDER;

  let totalProcessed = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const catSlug of categories) {
    if (totalProcessed >= LIMIT) break;

    const catRecord = await prisma.category.findFirst({
      where: { slug: catSlug },
      select: { id: true, name: true, slug: true },
    });
    if (!catRecord) {
      console.log(`  ⚠️  Category not found: ${catSlug}`);
      continue;
    }

    // Fetch businesses in this category, ranked by quality signal
    const businesses = await prisma.$queryRaw<{
      id: string;
      slug: string;
      name: string;
      address: string;
      postcode: string;
      shortDescription: string | null;
      description: string | null;
      rating: number | null;
      reviewCount: number | null;
      priceRange: string | null;
      openingHours: unknown;
      phone: string | null;
      website: string | null;
      tags: string[];
    }[]>`
      SELECT id, slug, name, address, postcode, "shortDescription", description,
             rating, "reviewCount", "priceRange", "openingHours", phone, website, tags
      FROM "Business"
      WHERE "categoryId" = ${catRecord.id}
      ORDER BY (COALESCE(rating, 0) * LOG(COALESCE("reviewCount", 0) + 1)) DESC
    `;

    const toProcess = OVERWRITE
      ? businesses
      : businesses.filter((b) => !b.description || b.description.trim() === "");

    if (toProcess.length === 0) {
      console.log(`  ✓ ${catRecord.name}: all ${businesses.length} listings already have descriptions`);
      continue;
    }

    console.log(`\n── ${catRecord.name.toUpperCase()} (${toProcess.length} to process of ${businesses.length} total) ──`);

    for (const b of toProcess) {
      if (totalProcessed >= LIMIT) break;

      const prompt = buildPrompt({
        ...b,
        tags: (b.tags as string[]) ?? [],
        category: { slug: catRecord.slug, name: catRecord.name },
      });

      try {
        process.stdout.write(`  ${b.name.padEnd(45)} … `);
        const description = await callOpenRouter(prompt);

        if (!description) {
          console.log("⚠️  empty response, skipping");
          totalSkipped++;
        } else {
          await prisma.business.update({
            where: { id: b.id },
            data: { description },
          });
          console.log(`✓ (${description.length} chars)`);
          totalUpdated++;
        }
      } catch (err) {
        console.log(`✗ ERROR: ${err instanceof Error ? err.message : String(err)}`);
        totalErrors++;
      }

      totalProcessed++;
      // Polite rate limiting — ~3 req/sec
      await sleep(350);
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`  Updated:  ${totalUpdated}`);
  console.log(`  Skipped:  ${totalSkipped}`);
  console.log(`  Errors:   ${totalErrors}`);
  console.log(`  Total:    ${totalProcessed}`);
  console.log(`─────────────────────────────────────\n`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
