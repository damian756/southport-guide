/**
 * Refresh the Event table for 2026.
 * Removes any stale/relative-dated seeded events and inserts accurate 2026 events.
 * Run: node --env-file=.env.local scripts/refresh-events-2026.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

// ── Remove stale seeded events ────────────────────────────────────────────────
const staleSlugs = [
  'southport-spring-market-2026',
  'southport-easter-weekend-2026',
  'southport-food-festival-2026',
  'the-open-royal-birkdale-2026',
  'southport-airshow-2026',
  'southport-flower-show-2026',
];

for (const slug of staleSlugs) {
  const r = await client.query('DELETE FROM "Event" WHERE slug = $1', [slug]);
  if (r.rowCount > 0) console.log(`  Removed: ${slug}`);
}

// ── 2026 event calendar ───────────────────────────────────────────────────────
const events = [
  {
    slug: 'sausage-cider-festival-2026',
    name: 'Sausage & Cider Festival',
    description: 'A weekend of artisan sausages, craft ciders and live music in Southport town centre.',
    dateStart: new Date('2026-04-18T10:00:00Z'),
    dateEnd:   new Date('2026-04-19T18:00:00Z'),
    category: 'festival',
    featured: true,
  },
  {
    slug: 'comedy-pub-crawl-2026',
    name: 'Comedy Pub Crawl',
    description: 'Stand-up comedy across multiple Lord Street venues in one night. Tickets required.',
    dateStart: new Date('2026-04-22T19:00:00Z'),
    dateEnd:   new Date('2026-04-22T23:59:00Z'),
    category: 'entertainment',
    featured: false,
  },
  {
    slug: 'big-top-festival-2026',
    name: 'Big Top Festival',
    description: 'Live music festival under the big top on Southport seafront. Multiple stages and artists across the weekend.',
    dateStart: new Date('2026-05-02T12:00:00Z'),
    dateEnd:   new Date('2026-05-04T22:00:00Z'),
    category: 'festival',
    featured: true,
  },
  {
    slug: 'beer-week-2026',
    name: 'Beer Week 2026',
    description: 'A week of craft beer events, tap takeovers and special menus across Southport bars and pubs.',
    dateStart: new Date('2026-05-20T12:00:00Z'),
    dateEnd:   new Date('2026-05-26T23:00:00Z'),
    category: 'festival',
    featured: false,
  },
  {
    slug: 'food-drink-festival-2026',
    name: 'Food & Drink Festival',
    description: 'Outdoor food and drink festival with local producers, street food, chef demos and tastings.',
    dateStart: new Date('2026-05-29T10:00:00Z'),
    dateEnd:   new Date('2026-05-31T18:00:00Z'),
    category: 'festival',
    featured: true,
  },
  {
    slug: 'summer-solstice-2026',
    name: 'Summer Solstice Event',
    description: 'Southport seafront celebrations for the longest day of the year.',
    dateStart: new Date('2026-06-20T18:00:00Z'),
    dateEnd:   new Date('2026-06-21T00:00:00Z'),
    category: 'entertainment',
    featured: false,
  },
  {
    slug: 'armed-forces-festival-2026',
    name: 'Armed Forces Festival',
    description: 'Southport honours the Armed Forces with a festival weekend on the seafront and town centre.',
    dateStart: new Date('2026-06-27T10:00:00Z'),
    dateEnd:   new Date('2026-06-28T18:00:00Z'),
    category: 'festival',
    featured: false,
  },
  {
    slug: 'the-open-championship-2026',
    name: 'The Open Championship — Royal Birkdale',
    description: 'The 154th Open Championship at Royal Birkdale. One of golf\'s four majors returns to Southport for the first time since 2017. Tens of thousands of visitors expected.',
    dateStart: new Date('2026-07-12T07:00:00Z'),
    dateEnd:   new Date('2026-07-19T18:00:00Z'),
    category: 'sport',
    featured: true,
  },
  {
    slug: 'southport-flower-show-2026-aug',
    name: 'Southport Flower Show 2026',
    description: 'One of the UK\'s largest horticultural shows at Victoria Park. Four days of show gardens, food, entertainment and exhibitors.',
    dateStart: new Date('2026-08-20T09:00:00Z'),
    dateEnd:   new Date('2026-08-23T18:00:00Z'),
    category: 'show',
    featured: true,
  },
  {
    slug: 'southport-airshow-2026-sep',
    name: 'Southport Air Show 2026',
    description: 'Southport\'s annual air show draws over 100,000 visitors to the seafront over two days.',
    dateStart: new Date('2026-09-12T10:00:00Z'),
    dateEnd:   new Date('2026-09-13T17:00:00Z'),
    category: 'entertainment',
    featured: true,
  },
  {
    slug: 'fireworks-championship-2026',
    name: 'British Musical Fireworks Championship',
    description: 'Three nights of spectacular fireworks displays set to music on the Southport seafront. One of the UK\'s top fireworks competitions.',
    dateStart: new Date('2026-09-18T20:00:00Z'),
    dateEnd:   new Date('2026-09-20T22:30:00Z'),
    category: 'entertainment',
    featured: true,
  },
];

// ── Insert (skip if already exists) ──────────────────────────────────────────
let inserted = 0;
let skipped = 0;

for (const ev of events) {
  const existing = await client.query('SELECT id FROM "Event" WHERE slug = $1', [ev.slug]);
  if (existing.rowCount > 0) {
    console.log(`  Skip (exists): ${ev.name}`);
    skipped++;
    continue;
  }

  await client.query(
    `INSERT INTO "Event" (id, slug, name, description, "dateStart", "dateEnd", category, featured, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
    [
      randomUUID(),
      ev.slug,
      ev.name,
      ev.description,
      ev.dateStart.toISOString(),
      ev.dateEnd?.toISOString() ?? null,
      ev.category,
      ev.featured,
    ]
  );
  console.log(`  Inserted: ${ev.name} (${ev.dateStart.toDateString()})`);
  inserted++;
}

await client.end();
console.log(`\nDone. ${inserted} inserted, ${skipped} skipped.`);
