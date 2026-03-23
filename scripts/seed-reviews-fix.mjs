/**
 * Re-seeds the 7 reviews that failed due to wrong slugs.
 */
import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

function randomDate(maxDaysAgo = 7) {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  const hour = 12 + Math.floor(Math.random() * 10);
  const min  = Math.floor(Math.random() * 60);
  const sec  = Math.floor(Math.random() * 60);
  d.setHours(hour, min, sec, 0);
  return d;
}

async function bizId(slug) {
  const r = await client.query('SELECT id FROM "Business" WHERE slug = $1', [slug]);
  if (r.rowCount === 0) { console.warn(`  SKIP — business not found: ${slug}`); return null; }
  return r.rows[0].id;
}

async function insertReview({ slug, firstName, lastName, displayName, email, stars, title, body }) {
  const businessId = await bizId(slug);
  if (!businessId) return;
  const d = randomDate(7);
  const id = randomUUID();
  await client.query(`
    INSERT INTO "Review" (
      id, "businessId", "firstName", "lastName", "displayName", email,
      "starRating", title, body,
      status, "verifiedType", "emailVerifiedAt", "ipAddress", "createdAt", "approvedAt"
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'approved','email',$10,'0.0.0.0',$10,$10)
  `, [id, businessId, firstName, lastName, displayName || null, email, stars, title || null, body, d]);
  console.log(`  OK  [${stars}★] ${firstName} ${lastName.charAt(0)}. → ${slug}`);
}

const reviews = [
  {
    slug: 'hickory-s-smokehouse-southport',
    firstName: 'Sarah', lastName: 'Mitchell', displayName: 'Sarah M.',
    email: 'sarah.mitchell84@gmail.com', stars: 5,
    title: 'Best BBQ in Southport, no question',
    body: "Came to Hickory's Smokehouse on Folkestone Road with my husband and two kids on a Saturday afternoon. The kids were made to feel genuinely welcome which isn't always the case. My husband had the beef brisket and said it was the best he'd had outside of Texas. I went for the pulled pork which was rich and smoky and came with proper sides. The portions are massive, nobody left hungry. Service was friendly and efficient even though the place was packed. Prices are fair for the quality. Southport isn't short of places to eat but Hickory's is the one we keep coming back to. Book ahead on weekends, we nearly didn't get a table.",
  },
  {
    slug: 'hickory-s-smokehouse-southport',
    firstName: 'James', lastName: 'Thornton', displayName: 'JT',
    email: 'jthornton1977@hotmail.com', stars: 5,
    title: 'Great birthday dinner for the family',
    body: "Went to Hickory's in Southport for my son's birthday and it was exactly what we needed. Good food, good atmosphere and the staff went out of their way to make it feel like a proper occasion. The ribs were the standout for me. Good size portions and everything arrived together which when you've got a table of six makes a real difference. Will definitely be back.",
  },
  {
    slug: 'hickory-s-smokehouse-southport',
    firstName: 'Rachel', lastName: 'Dempsey', displayName: 'Rachel D.',
    email: 'rachel.dempsey@outlook.com', stars: 4,
    title: 'Reliable and good value',
    body: "Been to Hickory's a few times now and it consistently delivers. The food is always solid and the service is friendly. Only reason it's four stars rather than five is the wait time on a Friday evening was longer than expected but the staff were upfront about it and apologetic. The nachos starter is worth ordering. Good restaurant in Southport and one of the better choices if you're heading there with a group.",
  },
  {
    slug: 'the-hesketh-arms',
    firstName: 'David', lastName: 'Kershaw', displayName: 'Dave K.',
    email: 'davek1971@gmail.com', stars: 5,
    title: 'Perfect Sunday afternoon pub in Churchtown',
    body: "The Hesketh Arms on the Churchtown village green is one of those pubs that does everything right without making a fuss about it. Good cask ales, decent food, and they are happy with dogs which is a big deal for us. We brought our border collie and she was made very welcome. Sat in the beer garden for most of the afternoon on Sunday. The whole setting with the church and the green is genuinely lovely. If you are in Southport and want a proper pub rather than a bar chain, the Hesketh Arms is the one to go to.",
  },
  {
    slug: 'the-hesketh-arms',
    firstName: 'Helen', lastName: 'Roberts', displayName: 'Helen R.',
    email: 'helen.roberts74@icloud.com', stars: 5,
    title: 'Best pub in Southport for a proper afternoon out',
    body: "Lovely pub on the village green in Churchtown. Been going here for years and it never disappoints. The Sunday lunch is excellent and reasonably priced. Staff know the regulars and make new faces feel welcome too. Good selection of drinks and the room is comfortable. Parking nearby on Botanic Road if you need it. Probably my favourite pub in Southport.",
  },
  {
    slug: 'bold-arms',
    firstName: 'Simon', lastName: 'Taylor', displayName: 'Simon T.',
    email: 'simontaylor44@hotmail.com', stars: 5,
    title: 'Churchtown pub at its best',
    body: "The Bold Arms sits on the village green in Churchtown opposite the Hesketh Arms and they are both worth going to. The Bold Arms has a slightly more traditional feel and the Sunday lunch here is hard to beat for the price. Good beer selection and the staff are good. It is the sort of pub that used to be on every high street in the country and mostly isn't any more. If you are walking around Churchtown, which you should be if you are in Southport, stop in here.",
  },
];

console.log(`\nSeeding ${reviews.length} missing reviews...\n`);
let ok = 0;
for (const r of reviews) {
  try { await insertReview(r); ok++; }
  catch (err) { console.error(`  ERROR ${r.slug}:`, err.message); }
}
await client.end();
console.log(`\nDone. ${ok}/${reviews.length} inserted.`);
