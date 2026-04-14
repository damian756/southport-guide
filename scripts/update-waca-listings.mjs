/**
 * Update WACA listings in the database.
 * 1. Fix the existing waca-recreation-centre (bad AI description, wrong phone)
 * 2. Add the Woodvale Community Centre (Meadow Lane) if not already present
 *
 * Run: node --env-file=.env.local scripts/update-waca-listings.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

// ── 1. Get category ID for Activities ────────────────────────────────────────
const catResult = await client.query(`SELECT id FROM "Category" WHERE slug = 'activities' LIMIT 1`);
if (catResult.rowCount === 0) {
  console.error('activities category not found');
  await client.end();
  process.exit(1);
}
const activitiesCatId = catResult.rows[0].id;

// ── 2. Fix existing waca-recreation-centre ────────────────────────────────────
const recDesc = `WACA Recreation Centre on Orchard Lane is one of two community facilities run by Woodvale & Ainsdale Community Association, a registered charity (No. 1146522) based in Southport.

The recreation centre sits adjacent to Sandbrook Park recreational grounds in Ainsdale and provides flexible activity and event spaces for community use. The building is DDA-compliant with disabled toilet facilities.

Available for hire by community groups, workshops and events, subject to availability. Run on a not-for-profit basis by a team committed to the local area.

For bookings and enquiries contact the main office on 01704 573084 (Monday to Thursday, 9am–4pm). Full guide to WACA and all their activities at SouthportGuide.co.uk/guides/woodvale-community-centre.`;

await client.query(`
  UPDATE "Business" SET
    description = $1,
    phone = $2,
    website = $3,
    "updatedAt" = NOW()
  WHERE slug = 'waca-recreation-centre'
`, [
  recDesc,
  '01704 573084',
  'https://www.woodvalecommunitycentre.org',
]);
console.log('  Updated: waca-recreation-centre');

// ── 3. Upsert Woodvale Community Centre (Meadow Lane) ────────────────────────
const mainDesc = `Woodvale Community Centre on Meadow Lane is the headquarters of Woodvale & Ainsdale Community Association (WACA), a registered charity (No. 1146522) serving the Woodvale and Ainsdale communities of Southport.

Founded in 1992 and purpose-built in 1999, the centre runs a full programme of daytime and evening activities for all ages. Classes include Chair Based Exercise (booking essential), Craft Group (every other Monday, 10:30am–12:30pm), Let's Get Digital drop-in digital support (Tuesdays, 10:30am–12pm), and Tai Chi (Thursdays, 1–2pm, £5). Youth sessions run Monday and Tuesday evenings, 5–7pm. School holiday programmes also available.

The building is DDA-compliant with disabled toilets and baby changing facilities. Small car park on site. Buses 44, 47, 49 and X2 serve the area. Next door to Kings Meadow Primary School.

Office hours: Monday to Thursday, 9am to 4pm. Tel: 01704 573084.`;

const existing = await client.query(`SELECT id FROM "Business" WHERE slug = 'woodvale-community-centre'`);

if (existing.rowCount > 0) {
  await client.query(`
    UPDATE "Business" SET
      name = $1, description = $2, address = $3, phone = $4, website = $5,
      "updatedAt" = NOW()
    WHERE slug = 'woodvale-community-centre'
  `, [
    'Woodvale Community Centre',
    mainDesc,
    'Meadow Lane, Woodvale, Southport, Merseyside, PR8 3RS',
    '01704 573084',
    'https://www.woodvalecommunitycentre.org',
  ]);
  console.log('  Updated: woodvale-community-centre');
} else {
  await client.query(`
    INSERT INTO "Business" (
      id, slug, name, description, address, postcode, phone, website,
      "categoryId", claimed, featured, "listingTier", "hubTier",
      tags, "createdAt", "updatedAt"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false, false, 'free', 'free', $10, NOW(), NOW())
  `, [
    randomUUID(),
    'woodvale-community-centre',
    'Woodvale Community Centre',
    mainDesc,
    'Meadow Lane, Woodvale, Southport, Merseyside, PR8 3RS',
    'PR8 3RS',
    '01704 573084',
    'https://www.woodvalecommunitycentre.org',
    activitiesCatId,
    ['community', 'charity', 'family-friendly', 'accessible', 'indoor'],
  ]);
  console.log('  Inserted: woodvale-community-centre (new)');
}

await client.end();
console.log('\nDone.');
