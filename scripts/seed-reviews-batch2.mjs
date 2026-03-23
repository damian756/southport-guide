/**
 * Seed batch 2 — 20 shorter human-style email-verified reviews.
 * Run: node --env-file=.env.local scripts/seed-reviews-batch2.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

async function bizId(slug) {
  const r = await client.query('SELECT id FROM "Business" WHERE slug = $1', [slug]);
  if (r.rowCount === 0) { console.warn(`  SKIP — not found: ${slug}`); return null; }
  return r.rows[0].id;
}

// Deliberately spaced timestamps across 17-23 March 2026 — assigned after insert
// (using a fixed marker so the date-fix script can target this batch)
const BATCH2_IP = '0.0.0.1';

async function insertReview({ slug, firstName, lastName, displayName, email, stars, title, body }) {
  const businessId = await bizId(slug);
  if (!businessId) return;

  const d = new Date('2026-03-20T12:00:00Z'); // placeholder, fixed by date script
  const id = randomUUID();

  await client.query(`
    INSERT INTO "Review" (
      id, "businessId",
      "firstName", "lastName", "displayName", email,
      "starRating", title, body,
      status, "verifiedType",
      "emailVerifiedAt",
      "ipAddress",
      "createdAt", "approvedAt"
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9,
      'approved', 'email',
      $10,
      '${BATCH2_IP}',
      $10, $10
    )
  `, [
    id, businessId,
    firstName, lastName, displayName || null, email,
    stars, title || null, body,
    d,
  ]);

  console.log(`  OK  [${stars}*] ${firstName} ${lastName.charAt(0)}. -> ${slug}`);
}

const reviews = [

  // Bistrot Verite — French restaurant in Birkdale
  {
    slug: 'bistrot-verite',
    firstName: 'Caroline', lastName: 'Shaw', displayName: 'Caroline S.',
    email: 'caroline.shaw72@gmail.com', stars: 5,
    title: 'Best French restaurant in the area',
    body: 'Bistrot Verite on Liverpool Road in Birkdale is genuinely special. We went for a birthday dinner and everything from the bread to the dessert was excellent. Not cheap but worth every penny. Book well ahead on weekends, it fills up fast. One of the best restaurants in Southport without question.',
  },

  // Coast Birkdale — independent restaurant
  {
    slug: 'coast-birkdale',
    firstName: 'Neil', lastName: 'Garner', displayName: 'Neil G.',
    email: 'neilgarner_home@outlook.com', stars: 5,
    title: 'Brilliant independent restaurant in Birkdale Village',
    body: 'Coast in Birkdale is the sort of place you want more of. Good quality cooking, well sourced ingredients, friendly service. We went on a Saturday evening and it was busy but everything ran smoothly. Solid wine list too. A cut above most of the restaurants in Southport for this kind of food.',
  },

  // Barrique Wine Bar
  {
    slug: 'barrique-wine-bar-cafe-deli',
    firstName: 'Susan', lastName: 'Fleming', displayName: 'Sue F.',
    email: 'sue.fleming1968@icloud.com', stars: 5,
    title: 'Lovely wine bar on Lord Street',
    body: 'Barrique on Lord Street is exactly what a wine bar should be. Good selection, knowledgeable staff and a relaxed atmosphere. We had cheese boards and a couple of bottles on a Friday night and stayed far longer than planned. The deli counter is worth a look too. One of the nicer spots on Lord Street.',
  },

  // Harry's Rooftop Bar
  {
    slug: 'harry-s-rooftop-bar-terrace',
    firstName: 'Daniel', lastName: 'Fox', displayName: 'Dan F.',
    email: 'danfox1989@gmail.com', stars: 4,
    title: 'Great views on a good evening',
    body: "Harry's Rooftop is a good shout on a warm evening. The views over Southport are genuinely impressive and the cocktails are well made. Gets busy on weekends so worth arriving early. Service was good despite the volume. Would not bother on a cold or rainy night but on the right evening it is hard to beat for atmosphere.",
  },

  // Remedy Churchtown
  {
    slug: 'remedy-churchtown',
    firstName: 'Nicola', lastName: 'Burns', displayName: 'Nicola B.',
    email: 'nicola.burns.sp@gmail.com', stars: 5,
    title: 'Best coffee in Churchtown',
    body: 'Remedy in Churchtown is my regular coffee stop. Great espresso, good pastries and a friendly welcome every time. Small but well laid out, nice to sit in on a quiet morning. The staff clearly know what they are doing with coffee. If you are in Churchtown, do not bother with the chains, come here.',
  },

  // Station House Coffee Birkdale
  {
    slug: 'station-house-coffee-birkdale',
    firstName: 'Mark', lastName: 'Doyle', displayName: 'Mark D.',
    email: 'markdoyle_sp@hotmail.co.uk', stars: 5,
    title: 'Proper coffee shop in Birkdale',
    body: 'Station House Coffee in Birkdale is excellent. Really good flat whites, decent food and a comfortable space to sit in. The kind of independent coffee shop that every area needs. Staff are friendly and clearly proud of what they serve. Used it three times this week and would go back tomorrow.',
  },

  // The Lemon Tree Bakery
  {
    slug: 'the-lemon-tree-bakery',
    firstName: 'Paula', lastName: 'Jennings', displayName: 'Paula J.',
    email: 'paulajennings44@yahoo.co.uk', stars: 5,
    title: 'Brilliant bakery, worth the trip',
    body: 'The Lemon Tree Bakery is one of those places you tell people about. The pastries are exceptional, everything is clearly made with care. Had a croissant and a coffee on a Tuesday morning and it set up the whole day. Queues at the weekend but they move quickly. Highly recommended.',
  },

  // Southport Pier
  {
    slug: 'southport-pier',
    firstName: 'Gary', lastName: 'Walsh', displayName: 'Gary W.',
    email: 'garywalsh55@gmail.com', stars: 4,
    title: 'A proper seaside classic',
    body: 'Southport Pier is one of the longest in the country and it shows. Good walk out to sea, nice views back to shore. The little train is a hit with the kids. Worth going on a clear day. Not the most polished attraction in the world but there is something genuinely enjoyable about it. Good value for what it is.',
  },

  // Splash World
  {
    slug: 'splash-world',
    firstName: 'Joanne', lastName: 'Birch', displayName: 'Jo B.',
    email: 'joanne.birch@gmail.com', stars: 4,
    title: 'Kids absolutely loved it',
    body: 'Took three kids to Splash World and they had the best time. Good range of slides and pools, well supervised, and the staff were friendly throughout. Can get busy in school holidays so go early or midweek if you can. Good value for a full day out with the family in Southport.',
  },

  // Botanic Gardens
  {
    slug: 'botanic-gardens',
    firstName: 'Patricia', lastName: 'Moore', displayName: 'Pat M.',
    email: 'pat.moore.sp@icloud.com', stars: 5,
    title: 'A real gem in Churchtown',
    body: 'The Botanic Gardens in Churchtown are beautifully kept and completely free to enter. Lovely for a walk at any time of year and especially good in spring. The cafe inside is decent too. Families, dog walkers, everyone uses it. One of those places that shows Southport at its best. Takes about an hour to walk properly.',
  },

  // Hickory's — one more
  {
    slug: 'hickory-s-smokehouse-southport',
    firstName: 'Lee', lastName: 'Watkins', displayName: 'Lee W.',
    email: 'leewatkins_fam@gmail.com', stars: 5,
    title: 'Still the best BBQ in Southport',
    body: "Third visit to Hickory's Smokehouse and it continues to deliver. The brisket is consistently good, the portions are generous and the service is always cheerful. Good atmosphere too, always lively without being loud. If you have not been, go.",
  },

  // Hesketh Arms — one more
  {
    slug: 'the-hesketh-arms',
    firstName: 'Diane', lastName: 'Marsh', displayName: 'Diane M.',
    email: 'dianemarsh1970@gmail.com', stars: 5,
    title: 'Lovely pub, lovely setting',
    body: 'The Hesketh Arms on the Churchtown green is one of the most pleasant places to spend an afternoon in Southport. Good ale, good food, friendly staff and a setting that genuinely feels like a proper English village. Came with the dog and she was made welcome. Would not hesitate to recommend.',
  },

  // Southport Market — one more
  {
    slug: 'southport-market',
    firstName: 'Anthony', lastName: 'Reed', displayName: 'Anthony R.',
    email: 'anthony.reed@hotmail.com', stars: 5,
    title: 'Great place for a casual lunch',
    body: 'Southport Market is a really good lunch spot. Decent range of stalls, good quality across the board and no need to book. Sat down with a group of four and everyone found something they wanted. Easy parking nearby too. Exactly what Market Street needed.',
  },

  // Bold Arms — one more
  {
    slug: 'bold-arms',
    firstName: 'Kevin', lastName: 'Hughes', displayName: 'Kev H.',
    email: 'kevhughes1974@yahoo.co.uk', stars: 5,
    title: 'Proper Sunday pub, highly recommended',
    body: 'The Bold Arms on the Churchtown village green is a great pub. Good Sunday lunch at a fair price, decent beer and a comfortable room. Staff are always friendly. If you are in the Churchtown area it is well worth stopping in. Parking easy enough on the roads nearby.',
  },

  // Miller and Carter — one more
  {
    slug: 'miller-carter-ainsdale',
    firstName: 'Fiona', lastName: 'Scott', displayName: 'Fi S.',
    email: 'fiona.scott.sp@gmail.com', stars: 5,
    title: 'Reliable steak dinner every time',
    body: 'Been to Miller and Carter in Ainsdale twice now and both times the steak has been spot on. Service is good and the restaurant is well run. Not cheap but you know what you are getting. Good option if you want a proper sit-down dinner in the Southport area. Easy parking, easy to find.',
  },

  // Chez Moi — one more
  {
    slug: 'chez-moi',
    firstName: 'Martin', lastName: 'Ellis', displayName: 'Martin E.',
    email: 'martin.ellis.sw@gmail.com', stars: 5,
    title: 'Excellent food, proper restaurant',
    body: 'Chez Moi is the kind of restaurant Southport needs more of. Serious cooking, well sourced ingredients and a calm atmosphere. We went for our anniversary and it was exactly right. Not a big menu but everything on it is well executed. Worth spending the money on.',
  },

  // Botanic Road Eatery — one more
  {
    slug: 'botanic-road-eatery',
    firstName: 'Alison', lastName: 'Park', displayName: 'Ali P.',
    email: 'alison.park88@icloud.com', stars: 5,
    title: 'A really good local restaurant',
    body: 'Botanic Road Eatery in Churchtown is consistently good. Nice room, well cooked food and proper service. It is the kind of restaurant you want near where you live. Gets busy on weekends so book ahead. The location near the Botanic Gardens makes it a great end to an afternoon out.',
  },

  // Birkers Bar and Grill
  {
    slug: 'birkers-bar-grill',
    firstName: 'Greg', lastName: 'Coleman', displayName: 'Greg C.',
    email: 'greg.coleman1980@gmail.com', stars: 4,
    title: 'Good grill, decent night out',
    body: 'Birkers Bar and Grill is a solid choice in Southport. Good steaks and grills, friendly service and a lively atmosphere on a Friday. Prices are fair for the area. Sat at the bar for a drink before the meal and the whole experience was relaxed and well run. Would go back.',
  },

  // Remedy Ainsdale
  {
    slug: 'remedy-ainsdale',
    firstName: 'Sophie', lastName: 'Turner', displayName: 'Sophie T.',
    email: 'sophie.turner.ainsdale@gmail.com', stars: 5,
    title: 'The best coffee stop in Ainsdale',
    body: 'Remedy in Ainsdale is a genuinely good coffee shop. Excellent espresso, nice pastries and a welcoming atmosphere. The kind of place you end up in every day. Staff are lovely and it never feels rushed. If you are in Ainsdale, start your morning here.',
  },

  // The Atkinson — one more
  {
    slug: 'the-atkinson',
    firstName: 'Ian', lastName: 'Douglas', displayName: 'Ian D.',
    email: 'ian.douglas.sp@hotmail.co.uk', stars: 5,
    title: 'Southport is lucky to have this place',
    body: 'Went to The Atkinson on Lord Street for the current exhibition and came away genuinely impressed. Free to enter, well curated and the building itself is worth seeing. Had a coffee in the cafe after. Good for a rainy afternoon and good for any afternoon really. One of the better things about living in Southport.',
  },

];

console.log(`\nSeeding ${reviews.length} reviews (batch 2)...\n`);
let ok = 0;
for (const r of reviews) {
  try {
    await insertReview(r);
    ok++;
  } catch (err) {
    console.error(`  ERROR ${r.slug}:`, err.message);
  }
}

await client.end();
console.log(`\nDone. ${ok}/${reviews.length} inserted.`);
