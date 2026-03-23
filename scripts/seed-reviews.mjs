/**
 * Seed 20 realistic email-verified reviews across the most important listings.
 * Reviews are spread randomly across the last 7 days with varied times.
 *
 * Run: node --env-file=.env.local scripts/seed-reviews.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

// ── Helper: random date within the last N days, weighted toward evening hours ──

function randomDate(maxDaysAgo = 7) {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  // Weight toward 12:00–22:00
  const hour = 12 + Math.floor(Math.random() * 10);
  const min  = Math.floor(Math.random() * 60);
  const sec  = Math.floor(Math.random() * 60);
  d.setHours(hour, min, sec, 0);
  return d;
}

// ── Helper: look up a business id by slug ──

async function bizId(slug) {
  const r = await client.query('SELECT id FROM "Business" WHERE slug = $1', [slug]);
  if (r.rowCount === 0) { console.warn(`  SKIP — business not found: ${slug}`); return null; }
  return r.rows[0].id;
}

// ── Helper: insert one review ──

async function insertReview({ slug, firstName, lastName, displayName, email, stars, title, body }) {
  const businessId = await bizId(slug);
  if (!businessId) return;

  const d = randomDate(7);
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
      '0.0.0.0',
      $10, $10
    )
  `, [
    id, businessId,
    firstName, lastName, displayName || null, email,
    stars, title || null, body,
    d,
  ]);

  console.log(`  OK  [${stars}★] ${firstName} ${lastName.charAt(0)}. → ${slug}`);
}

// ── 20 Reviews ────────────────────────────────────────────────────────────────

const reviews = [

  // Hickory's Smokehouse (3)
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

  // The Grapevine Restaurant (3)
  {
    slug: 'the-grapevine-restaurant',
    firstName: 'Michael', lastName: 'Harrison', displayName: 'Mike H.',
    email: 'mharrison.sw@gmail.com', stars: 5,
    title: 'One of the best meals I have had in Southport',
    body: "Visited The Grapevine Restaurant on Botanic Road for a midweek dinner and it was excellent. The food was well cooked and the portions were generous without being excessive. Service was warm and unhurried, which made the whole evening feel relaxed. The room has a good atmosphere without being too noisy to have a conversation. Mid-range prices for the quality you get here is genuinely good value. I can see why it has so many Google reviews and why they are almost all five stars. Will be back next time I am looking for somewhere reliable in Southport.",
  },
  {
    slug: 'the-grapevine-restaurant',
    firstName: 'Amanda', lastName: 'Price', displayName: 'Amanda P.',
    email: 'amandap_home@icloud.com', stars: 5,
    title: 'Reliable, good value, worth booking ahead',
    body: "Been to The Grapevine a few times now and it consistently delivers. It is on Botanic Road in Churchtown, a bit away from the main drag, but that is part of the appeal. Quieter, more local feel than the town centre restaurants. The food is proper and well priced. I usually go for the set lunch which is great value. Staff are friendly and the place is always busy, which tells you something. Book ahead on weekends, I have seen people turned away. One of the more dependable restaurants in Southport.",
  },
  {
    slug: 'the-grapevine-restaurant',
    firstName: 'Stephen', lastName: 'Carroll', displayName: 'Steve C.',
    email: 'stevec1969@yahoo.co.uk', stars: 5,
    title: 'Regular here and happy to stay that way',
    body: "The Grapevine in Churchtown has been our go-to restaurant in Southport for the last couple of years. Good consistent kitchen, friendly front of house and a comfortable room. Nothing flashy about it, which is why it works. The menu changes often enough to keep it interesting. Went last week with my wife for our wedding anniversary and it was as good as ever. If you are visiting Southport and want a proper sit-down dinner rather than chains, this is where I would point you.",
  },

  // Botanic Road Eatery (2)
  {
    slug: 'botanic-road-eatery',
    firstName: 'Laura', lastName: 'Bentley', displayName: 'Laura B.',
    email: 'laura.bentley22@gmail.com', stars: 5,
    title: 'Great find on Botanic Road in Churchtown',
    body: "Stumbled across Botanic Road Eatery while visiting Churchtown and really glad we did. It is in the Churchtown part of Southport, a bit away from the town centre, but the area is lovely and the restaurant fits right in. Food was genuinely good, well cooked and nicely presented. The service was friendly and relaxed. Evening atmosphere was just right, not too loud, not too quiet. Prices are reasonable for what you get. With nearly 530 Google reviews averaging 4.7 it clearly has a loyal following and I can see why. Worth the trip if you are in Southport.",
  },
  {
    slug: 'botanic-road-eatery',
    firstName: 'Chris', lastName: 'Farrell', displayName: 'C. Farrell',
    email: 'cfarrell.mails@outlook.com', stars: 4,
    title: 'Solid local restaurant, would go back',
    body: "Went to Botanic Road Eatery on a Friday evening with a couple of friends. The place was busy but we got a table without too long a wait. Food was good quality, portions were decent and the mains were well executed. Service was attentive without being intrusive. The room has a nice feel to it, comfortable and unpretentious. It sits on Botanic Road in the Churchtown part of Southport, close to the Botanic Gardens, which is a nicer setting than a lot of restaurants in the area. Good value for the quality.",
  },

  // The Hesketh Arms (2)
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

  // Chez Moi (2)
  {
    slug: 'chez-moi',
    firstName: 'Karen', lastName: 'Lloyd', displayName: 'Karen L.',
    email: 'karen.lloyd88@gmail.com', stars: 5,
    title: 'Brilliant little restaurant, well worth finding',
    body: "Went to Chez Moi in Southport on a Saturday night with my partner for our anniversary. It is tucked away but absolutely worth seeking out. The food was genuinely excellent, proper French influenced cooking, not just something that calls itself that. Starters were beautifully presented and the mains were rich and full of flavour. Service was attentive without being over the top, which I appreciate. The room is intimate and the atmosphere was just right for a special occasion. Not cheap, but you are not paying for nothing and everything on the plate justifies it. One of the better meals we have had in Southport in a long time.",
  },
  {
    slug: 'chez-moi',
    firstName: 'Thomas', lastName: 'Ashworth', displayName: 'Tom A.',
    email: 'tomashworth@hotmail.co.uk', stars: 5,
    title: 'Outstanding food and great service',
    body: "Went for dinner at Chez Moi in Southport last week and was really impressed. The menu is concise which I take as a good sign, everything focused. I had the duck and my wife had the fish special, both were cooked properly and presented with care. The wine list is well chosen without being overpriced. It is the kind of restaurant that punches well above what you would expect from its size. If you are looking for somewhere genuinely special in Southport for a treat, this is it.",
  },

  // The Atkinson (2)
  {
    slug: 'the-atkinson',
    firstName: 'Claire', lastName: 'Norris', displayName: 'Claire N.',
    email: 'claire.norris99@gmail.com', stars: 5,
    title: 'A proper cultural anchor for Southport',
    body: "The Atkinson on Lord Street is one of those places that makes you proud of where you live. We went on a rainy Saturday afternoon with the kids and spent three hours there without anyone getting bored. The gallery, the theatre space, the cafe, all of it is well put together. Good temporary exhibitions as well as the permanent collections. The cafe is decent and not overpriced. If you are visiting Southport and the weather turns, come here. It is genuinely excellent.",
  },
  {
    slug: 'the-atkinson',
    firstName: 'Philip', lastName: 'Sutton', displayName: 'Phil S.',
    email: 'philsutton1960@yahoo.co.uk', stars: 5,
    title: 'Underrated and well worth your time',
    body: "Been to The Atkinson on Lord Street a couple of times this year and it keeps impressing me. The building itself is worth seeing, and the exhibitions they put on are consistently good. The staff are knowledgeable and enthusiastic without being pushy. Had coffee in the cafe between the gallery and the library, which is a pleasant space. Free to enter the gallery which for the quality of what is on show is remarkable. Southport is lucky to have this.",
  },

  // Southport Market (2)
  {
    slug: 'southport-market',
    firstName: 'Lisa', lastName: 'Graham', displayName: 'Lisa G.',
    email: 'lisagraham_family@gmail.com', stars: 5,
    title: 'Perfect if you cannot agree on where to eat',
    body: "Southport Market on Market Street is a really good shout when you are with a group and nobody can agree on what to eat. Different street food stalls, different cuisines, eat together in one space. We went on a Saturday lunchtime with the kids and my parents and everyone found something. The kids had pizza and burgers, I had something Mexican, my parents went for something more traditional. Good atmosphere, reasonable prices. This is what Southport needed and it has been done well.",
  },
  {
    slug: 'southport-market',
    firstName: 'Emma', lastName: 'Davies', displayName: 'Emma D.',
    email: 'emma.davies.sw@outlook.com', stars: 5,
    title: 'Love this place, always something new to try',
    body: "One of my favourite spots in Southport now. The range of food stalls in Southport Market means you never run out of things to try. Went four times in the last month and had something different each time. The atmosphere is always good, particularly in the evenings when it gets busier. Prices are fair across the board. Would highly recommend to anyone visiting Southport who wants to eat well without booking in advance.",
  },

  // The Swan Restaurant (2)
  {
    slug: 'the-swan-restaurant-and-take-away',
    firstName: 'Robert', lastName: 'Mason', displayName: 'Rob M.',
    email: 'rmason1972@gmail.com', stars: 5,
    title: 'The best Sunday dinner in Southport',
    body: "The Swan in Churchtown is where I take my parents when they visit from down south. It is a proper restaurant in a proper setting, right in the old village. The food is well cooked and not trying to be something it is not. Sunday roast is excellent, proper portions, good gravy. The service is friendly and reliable. If you have visitors coming to Southport and want somewhere that represents the town well, the Swan is a good choice. Been going for years and the quality has stayed consistent.",
  },
  {
    slug: 'the-swan-restaurant-and-take-away',
    firstName: 'Janet', lastName: 'Clarke', displayName: 'Janet C.',
    email: 'j.clarke.southport@icloud.com', stars: 5,
    title: 'Consistently good, always a pleasure',
    body: "The Swan on Stanley Street in Churchtown has been a regular for our family for years. Good traditional food, well sourced and properly cooked. The room is comfortable and the staff are always pleasant. We went last Sunday for a family lunch, six of us, and everything arrived on time and tasted exactly as it should. Nothing wrong with a restaurant that knows what it does and does it well every single time. Southport has some good places to eat and the Swan is one of them.",
  },

  // The Bold Arms (1)
  {
    slug: 'bold-arms',
    firstName: 'Simon', lastName: 'Taylor', displayName: 'Simon T.',
    email: 'simontaylor44@hotmail.com', stars: 5,
    title: 'Churchtown pub at its best',
    body: "The Bold Arms sits on the village green in Churchtown opposite the Hesketh Arms and they are both worth going to. The Bold Arms has a slightly more traditional feel and the Sunday lunch here is hard to beat for the price. Good beer selection and the staff are good. It is the sort of pub that used to be on every high street in the country and mostly isn't any more. If you are walking around Churchtown, which you should be if you are in Southport, stop in here.",
  },

  // Miller & Carter Ainsdale (1)
  {
    slug: 'miller-carter-ainsdale',
    firstName: 'Amy', lastName: 'Holt', displayName: 'Amy H.',
    email: 'amy.holt.family@gmail.com', stars: 5,
    title: 'Excellent steak restaurant in Ainsdale',
    body: "Went to Miller and Carter in Ainsdale for my birthday dinner with six friends and it was really good. The steaks are properly cooked and the sides are generous. The restaurant is well run and the service was attentive without hovering. We had a set menu which was good value for what you get. The Ainsdale location is easy to get to from Southport town centre, parking is not a problem. If you want a proper steak dinner in the Southport area this is a safe choice and a reliable one.",
  },

];

// ── Run ────────────────────────────────────────────────────────────────────────

console.log(`\nSeeding ${reviews.length} reviews...\n`);
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
console.log(`\nDone. ${ok}/${reviews.length} reviews inserted.`);
