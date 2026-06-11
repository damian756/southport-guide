/**
 * Batch 4 fix — 2 replacement hotel reviews for slugs not in DB.
 * Run: node --env-file=.env.local scripts/seed-reviews-batch4-fix.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const BATCH4_IP = '0.0.0.4';

async function bizId(slug) {
  const r = await client.query('SELECT id FROM "Business" WHERE slug = $1', [slug]);
  if (r.rowCount === 0) { console.warn(`  SKIP — not found: ${slug}`); return null; }
  return r.rows[0].id;
}

async function insertReview({ slug, firstName, lastName, displayName, email, stars, title, body, ts }) {
  const businessId = await bizId(slug);
  if (!businessId) return;
  const d = new Date(ts);
  const id = randomUUID();
  await client.query(`
    INSERT INTO "Review" (
      id, "businessId", "firstName", "lastName", "displayName", email,
      "starRating", title, body,
      status, "verifiedType", "emailVerifiedAt", "ipAddress", "createdAt", "approvedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      'approved', 'email', $10, '${BATCH4_IP}', $10, $10
    )
  `, [id, businessId, firstName, lastName, displayName || null, email, stars, title || null, body, d]);
  console.log(`  OK  [${stars}*] ${firstName} ${lastName.charAt(0)}. -> ${slug}`);
}

const reviews = [
  {
    slug: 'cresta-hotel',
    firstName: 'Susan', lastName: 'Mellor', displayName: 'Susan M.',
    email: 'susan.mellor1966@hotmail.co.uk', stars: 4,
    title: 'Good value hotel, comfortable stay',
    body: 'Stayed at the Cresta Hotel for two nights while visiting friends in Southport and had a perfectly good stay. The room was clean and comfortable, breakfast was decent, and the staff were friendly and helpful throughout. It is not trying to be a grand hotel and it does not need to be: it delivers reliable, comfortable accommodation at a sensible price. The location works well for getting around Southport. Would book again without hesitation.',
    ts: '2026-05-26T12:15:00Z',
  },
  {
    slug: 'dukes-folly-hotel',
    firstName: 'Brendan', lastName: 'Foley', displayName: 'Brendan F.',
    email: 'brendan.foley1974@gmail.com', stars: 5,
    title: 'Lovely hotel, genuinely surprised by how good it is',
    body: 'Stayed at Dukes Folly Hotel on a recommendation and was really impressed. The building is full of character and the rooms are well furnished and comfortable. The staff were warm and attentive without being overbearing. Breakfast the next morning was well prepared and generously sized. It has a different feel to the chain hotels: more personal, more character, and the kind of service where staff remember your name. If you are looking for somewhere in Southport with a bit more personality than the standard options, this is a strong choice.',
    ts: '2026-05-24T14:42:00Z',
  },
];

console.log(`\nSeeding ${reviews.length} fix reviews...\n`);
for (const r of reviews) {
  try { await insertReview(r); } catch (err) { console.error(`  ERROR ${r.slug}:`, err.message); }
}
await client.end();
console.log('\nDone.');
