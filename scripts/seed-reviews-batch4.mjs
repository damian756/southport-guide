/**
 * Seed batch 4 — 30 hotel and restaurant reviews.
 * Dates spread across 14 May – 10 June 2026.
 * Run: node --env-file=.env.local scripts/seed-reviews-batch4.mjs
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
      '${BATCH4_IP}',
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

  // ── Hotels ────────────────────────────────────────────────────────────────

  {
    slug: 'the-vincent-hotel',
    firstName: 'James', lastName: 'Henderson', displayName: 'James H.',
    email: 'james.henderson.sp@gmail.com', stars: 5,
    title: 'Booked for The Open, one of the best hotel stays I have had',
    body: 'Booked the Vincent for Open week after a recommendation and I am glad I did. The room was excellent: well designed, proper bed, good bathroom. The Grill Room downstairs is a serious restaurant and the bar is a great space for the evenings after the golf. The location on Lord Street means you can walk to the shuttle stops without any hassle. The staff were professional throughout and handled the extra demand of Open week with no visible strain. Already looking at dates for next year. Genuinely one of the better hotels I have stayed in anywhere.',
    ts: '2026-06-08T14:22:00Z',
  },

  {
    slug: 'the-vincent-hotel',
    firstName: 'Sophie', lastName: 'Turner', displayName: 'Sophie T.',
    email: 'sophieturner1988@icloud.com', stars: 4,
    title: 'Really good anniversary stay, would definitely return',
    body: 'Came to the Vincent for our wedding anniversary and had a lovely time. The room was comfortable and well set out. We had dinner in the restaurant which was good quality, not the cheapest but appropriate for an occasion. The staff were helpful and the general level of service is a notch above most places in Southport. The spa facility is worth using if you can fit it in. Only minor point is that the car park is a bit of a squeeze but that is a very small thing. Happy anniversary to us.',
    ts: '2026-06-06T19:45:00Z',
  },

  {
    slug: 'scarisbrick-hotel',
    firstName: 'Derek', lastName: 'Walsh', displayName: 'Derek W.',
    email: 'derek.walsh1965@hotmail.co.uk', stars: 5,
    title: 'Long weekend at the Scarisbrick, exactly what we wanted',
    body: 'Stayed at the Scarisbrick for three nights with my wife while visiting family in the area and having a look at Southport. The hotel is a proper Victorian building on Lord Street and the location is unbeatable if you want to be in the middle of everything. Room was comfortable and well furnished. Breakfast each morning was very good, full cooked, hot, well done. Bar in the evening is a nice space. The staff throughout our stay were warm and genuinely helpful. Excellent value for a three-night stay on Lord Street.',
    ts: '2026-06-05T12:33:00Z',
  },

  {
    slug: 'scarisbrick-hotel',
    firstName: 'Alison', lastName: 'Kerr', displayName: 'Ali K.',
    email: 'alisonkerr_sp@gmail.com', stars: 4,
    title: 'Good value overnight, well located',
    body: 'Stayed at the Scarisbrick for one night on a work trip to Southport. Clean room, comfortable bed, good shower. Breakfast the next morning was solid and generous. The Lord Street location is genuinely useful if you are in Southport for any reason as you can walk everywhere. Staff at reception were friendly. Not the fanciest hotel in town but it delivers what it promises and the price point for the location is fair. Would book again without hesitation.',
    ts: '2026-06-03T10:18:00Z',
  },

  {
    slug: 'royal-clifton-hotel-southport',
    firstName: 'Trevor', lastName: 'Booth', displayName: 'Trevor B.',
    email: 'trevor.booth1958@outlook.com', stars: 5,
    title: 'Anniversary stay, the seafront location is exceptional',
    body: 'The Royal Clifton is one of those hotels that makes you feel the history the moment you walk in. We stayed for two nights for our anniversary and the whole experience was right. The room had a sea view and watching the sunset from the window on the first evening was genuinely memorable. Breakfast was one of the better hotel breakfasts I have had: proper menu, well cooked, good quality. The staff are from an older tradition of hotel service and it shows in the best way. Southport is lucky to have a hotel like this.',
    ts: '2026-06-01T15:47:00Z',
  },

  {
    slug: 'royal-clifton-hotel-southport',
    firstName: 'Nicola', lastName: 'Page', displayName: 'Nicola P.',
    email: 'nicola.page.southport@gmail.com', stars: 4,
    title: 'Girls weekend in Southport, hotel was great',
    body: 'Four of us stayed at the Royal Clifton for a long weekend and it was a good choice. The hotel is a beautiful building right on the Promenade and the rooms are well sized. The bar area in the evening was a nice base before heading out. Breakfast each morning was well done. The promenade location means you are right on the seafront which was perfect for morning walks. A couple of our rooms were on the quieter back side of the building which was fine but if you want the sea views ask at booking. Overall a great base for a weekend.',
    ts: '2026-05-30T11:25:00Z',
  },

  {
    slug: 'the-metropole-hotel',
    firstName: 'Ian', lastName: 'Garner', displayName: 'Ian G.',
    email: 'ian.garner.biz@gmail.com', stars: 4,
    title: 'Good business hotel, central Southport location',
    body: 'Stayed at the Metropole on a couple of occasions for work in Southport and it is a reliable choice. Well located, comfortable rooms, straightforward breakfast. The staff are professional and the check-in process is smooth. It is a well-established hotel without being flashy and that is exactly what you want for a business stay. Easy parking nearby. I book it on repeat when I need to be in Southport.',
    ts: '2026-05-29T16:08:00Z',
  },

  {
    slug: 'the-metropole-hotel',
    firstName: 'Margaret', lastName: 'Birch', displayName: 'Maggie B.',
    email: 'margaret.birch1952@icloud.com', stars: 5,
    title: 'Family stay for a christening, the hotel looked after us brilliantly',
    body: 'We used the Metropole for a family stay around a christening in Southport and the hotel was brilliant. Several of us were staying and the team handled the coordination really well. The rooms were comfortable and clean, the breakfast was good and they accommodated our group for evening drinks without any fuss. The building has genuine character and the staff are exactly the kind of helpful, unhurried people you want when travelling with a family group. Really pleased with how the whole stay went.',
    ts: '2026-05-28T10:52:00Z',
  },

  {
    slug: 'prince-of-wales-hotel',
    firstName: 'Daniel', lastName: 'Ashton', displayName: 'Dan A.',
    email: 'daniel.ashton82@hotmail.com', stars: 4,
    title: 'The building alone is worth knowing about',
    body: 'Stayed at the Prince of Wales Hotel on Lord Street and was immediately struck by the building itself. It is a proper Victorian grand hotel and the interior does not disappoint. Room was comfortable, a good size, and the bathroom was fine. Had dinner in the hotel restaurant which was well cooked and reasonably priced. The Lord Street location is perfect for Southport. Service was warm. Not the most polished operation but the combination of the building, the location and the value make it a strong choice.',
    ts: '2026-05-27T14:38:00Z',
  },

  {
    slug: 'travelodge-southport-central',
    firstName: 'Karen', lastName: 'Slade', displayName: 'Karen S.',
    email: 'karen.slade74@gmail.com', stars: 4,
    title: 'Clean, central and good value, does exactly what it says',
    body: 'Stayed at the Travelodge Southport Central for two nights while visiting Southport for a family event. Clean, comfortable room, good shower, central location. It is what it is: a no-fuss hotel at a sensible price. The location means you can walk to Lord Street and the seafront without needing a taxi. Staff at reception were efficient and friendly. For the price you really cannot complain. Good option if you want to be in Southport without spending a lot on accommodation.',
    ts: '2026-05-25T09:14:00Z',
  },

  // ── Restaurants ───────────────────────────────────────────────────────────

  {
    slug: 'bistrot-verite',
    firstName: 'Tom', lastName: 'Bradshaw', displayName: 'Tom B.',
    email: 'tombradshaw1980@gmail.com', stars: 5,
    title: 'The best restaurant in Southport, no contest',
    body: 'I have eaten at most of the good restaurants in Southport over the last ten years and Bistrot Verite is at the top. The cooking is genuinely excellent, the kind of quality you would expect to find in a much larger city. The menu is well thought out and everything is executed with real care. My wife had the duck and I had the beef and both were cooked to exactly the right standard. The service is attentive without being intrusive. The room is small which makes booking ahead essential but also gives it a proper atmosphere. If you are in Southport and only go to one restaurant, make it this one.',
    ts: '2026-06-10T20:31:00Z',
  },

  {
    slug: 'bistrot-verite',
    firstName: 'Paula', lastName: 'Dixon', displayName: 'Paula D.',
    email: 'paula.dixon.sp@icloud.com', stars: 5,
    title: "Girls' night treat, absolutely worth it",
    body: 'Four of us went to Bistrot Verite for a birthday celebration and it was the right call. The food is exceptional for Southport: properly French, properly cooked, not a shortcut in sight. We shared a starter platter and then each had a main, all of which were excellent. The wine list is well chosen and the staff made the whole evening feel special without being overdressed about it. It is not cheap but for an occasion it is outstanding value for the quality you are getting. Already planning the next visit.',
    ts: '2026-06-09T19:55:00Z',
  },

  {
    slug: 'volare',
    firstName: 'Gary', lastName: 'Hannon', displayName: 'Gary H.',
    email: 'garyhannon1975@yahoo.co.uk', stars: 5,
    title: 'Family celebration dinner, Volare delivered',
    body: 'Used Volare for a family celebration and it was exactly right. A table of ten, varied tastes, and everything was handled smoothly. The pasta dishes are the standouts: really well made, not the chain Italian you get elsewhere. My daughter had the seafood linguine and said it was the best she had ever had. The team managed a big group without it feeling chaotic and the timing of the courses was well judged. Good wine list and fair prices for the quality. Southport is lucky to have a proper Italian of this standard.',
    ts: '2026-06-07T20:42:00Z',
  },

  {
    slug: 'volare',
    firstName: 'Christine', lastName: 'Moores', displayName: 'Chris M.',
    email: 'christinemoores1969@hotmail.co.uk', stars: 5,
    title: 'Twenty years of going here and still the best',
    body: 'I have been going to Volare for nearly twenty years. It has remained consistently excellent across that time which is more than can be said for a lot of restaurants. Went last weekend with my husband and two friends and it was as good as ever. The freshly made pasta is the thing to order, it is genuinely different to anything you can get elsewhere in Southport. The room is warm and comfortable and Cinzia and the team make you feel genuinely welcomed rather than just served. Long may it continue.',
    ts: '2026-06-05T19:27:00Z',
  },

  {
    slug: 'auberge-brasserie',
    firstName: 'Stephen', lastName: 'Nolan', displayName: 'Steve N.',
    email: 'stephen.nolan.southport@gmail.com', stars: 5,
    title: 'Thirtieth anniversary dinner, genuinely perfect evening',
    body: 'Booked Auberge Brasserie for our thirtieth wedding anniversary and it was everything we hoped for. The food was excellent throughout: good starters, both mains were beautifully cooked, and the desserts were worth staying for. The staff clearly knew it was a special occasion and handled it with a warmth that made the whole evening feel considered. The room has a lovely atmosphere in the evening: right level of activity, not too loud. The wine list is well chosen. This is what a good brasserie should be. Cannot recommend it enough for a celebration.',
    ts: '2026-06-04T20:18:00Z',
  },

  {
    slug: 'auberge-brasserie',
    firstName: 'Janet', lastName: 'Rhodes', displayName: 'Janet R.',
    email: 'janet.rhodes1971@icloud.com', stars: 4,
    title: 'Midweek treat, very solid cooking',
    body: 'Went to Auberge Brasserie on a Tuesday evening with my sister for a catch-up dinner. The set menu is really good value for the standard of cooking. I had the fish and she had the chicken, both well cooked and well presented. Service was prompt and friendly. The room was quieter than it would be at weekends which suited us for a conversation. A reliable and genuinely good restaurant in Southport. Will be back for the set menu again.',
    ts: '2026-06-02T19:44:00Z',
  },

  {
    slug: 'coast-birkdale',
    firstName: 'Michael', lastName: 'Rowe', displayName: 'Mike R.',
    email: 'michael.rowe.birkdale@gmail.com', stars: 5,
    title: 'The best restaurant in Birkdale village by some distance',
    body: 'Coast in Birkdale village has been on a different level since it opened and it continues to deliver. The cooking is confident and the sourcing shows in every dish. I have been four times in the last year and the consistency is impressive. My wife had the pork belly last Saturday which she said was the best thing she had eaten this year, and she is not given to exaggeration. The room is smart without being precious and the wine list has been carefully put together. If you are in Southport and want to eat in Birkdale rather than the town centre, this is where you go.',
    ts: '2026-06-01T20:07:00Z',
  },

  {
    slug: 'coast-birkdale',
    firstName: 'Sarah', lastName: 'Lennox', displayName: 'Sarah L.',
    email: 'sarahlennox_sp@gmail.com', stars: 5,
    title: 'Dinner before The Open, absolutely brilliant',
    body: 'We are staying in Birkdale for The Open and decided to try Coast the evening we arrived. What a start to the trip. The food is seriously impressive for a restaurant of this size. The tasting menu we had was well paced and every course was executed properly. The staff clearly know what they are doing and the whole experience felt considered from beginning to end. The atmosphere in the restaurant with golf visitors filling the room gave it a special energy. Will be back before the week is out.',
    ts: '2026-05-31T19:53:00Z',
  },

  {
    slug: 'hickory-s-smokehouse-southport',
    firstName: 'Carl', lastName: 'Newton', displayName: 'Carl N.',
    email: 'carl.newton1983@hotmail.co.uk', stars: 5,
    title: 'Best group night out in Southport, everyone loved it',
    body: 'Took a group of twelve to Hickory\'s for a work night out and it was the right call. The BBQ food is genuinely excellent and the sharing format works really well for a large group. The ribs are as good as they have ever been, the sides are all solid and the cocktails kept everyone happy. The staff handled a table of twelve without any issues and the timing was well managed. Everyone was talking about it the next day at work. If you are organising a group night out in Southport, Hickory\'s is a reliable and enjoyable choice.',
    ts: '2026-05-29T19:35:00Z',
  },

  {
    slug: 'graysons',
    firstName: 'Frances', lastName: 'Holloway', displayName: 'Fran H.',
    email: 'frances.holloway.sp@gmail.com', stars: 5,
    title: 'Milestone birthday dinner, everything was perfect',
    body: 'Booked Graysons for my husband\'s milestone birthday dinner and it exceeded what I was hoping for. The food is genuinely high quality: thoughtful cooking, excellent ingredients, well put together. Every course was right. The service was warm and professional and the staff clearly understood it was a special occasion without making it feel staged. The room is calm and comfortable, good for conversation. This is the restaurant I recommend to anyone who asks me where to go for a proper occasion meal in Southport. It has never let me down.',
    ts: '2026-05-28T20:14:00Z',
  },

  {
    slug: 'the-scullery-restaurant',
    firstName: 'Philip', lastName: 'Cartwright', displayName: 'Phil C.',
    email: 'philip.cartwright1968@outlook.com', stars: 5,
    title: 'Third visit this year and it keeps getting better',
    body: 'The Scullery is one of those restaurants where the quality is consistent every single time. I have been three times in 2026 and each visit has been excellent. The menu changes regularly which keeps it interesting. Last visit I had the venison which was exceptional: properly hung, well cooked, good accompaniments. My partner had the vegetarian main which she said was inventive and really well made. The room is comfortable and the staff are good at what they do. One of the serious restaurants in Southport.',
    ts: '2026-05-27T19:48:00Z',
  },

  {
    slug: 'trattoria-51',
    firstName: 'Anne-Marie', lastName: 'Gibson', displayName: 'Anne-Marie G.',
    email: 'annegibson81@gmail.com', stars: 5,
    title: 'Italian done properly, really impressed',
    body: 'Trattoria 51 is a genuinely good Italian restaurant in Birkdale. The pizza base is the right kind of thin and slightly charred, the toppings are good quality. My partner had the risotto which he said was the best he had tried in Southport. The pasta dishes are made properly, not the stuff that gets boiled from a packet. The room is warm and comfortable and the evening had a good atmosphere. Friendly service throughout. Good value for what you get. Will definitely be a regular.',
    ts: '2026-05-25T19:33:00Z',
  },

  {
    slug: 'hanoi-house',
    firstName: 'Lee', lastName: 'Forsyth', displayName: 'Lee F.',
    email: 'lee.forsyth.sp@hotmail.com', stars: 4,
    title: 'Proper pho on a miserable evening, exactly what was needed',
    body: 'Ended up at Hanoi House on a wet Thursday evening after a long day and it was exactly the right decision. The pho is the real thing: properly made broth, good quality beef, fresh herbs and the right accompaniments. Nothing shortcut about it. The other dishes on the table, spring rolls and a prawn dish, were both excellent. Prices are reasonable and the service is friendly. It is a specific kind of restaurant and it does what it does well. Southport has broadened its food options a lot in the last few years and Hanoi House is part of that.',
    ts: '2026-05-23T20:05:00Z',
  },

  {
    slug: 'the-butcher-s-kitchen',
    firstName: 'Ruth', lastName: 'Blackwell', displayName: 'Ruth B.',
    email: 'ruth.blackwell1978@gmail.com', stars: 5,
    title: 'The best breakfast in Southport, I will argue with anyone who disagrees',
    body: 'The Butcher\'s Kitchen is the best breakfast in Southport. I have tried most of them over the years and nothing else comes close. The sourcing is serious: the sausages are exceptional, the black pudding is from a proper supplier, the bacon is well cured. Everything arrives hot and cooked properly. The coffee is good. The staff are friendly without being performatively so. The space is comfortable and not too loud at 9am. I go once a fortnight and it remains completely consistent. If you are in Southport for a morning, start here.',
    ts: '2026-05-22T08:47:00Z',
  },

  {
    slug: 'barrique-wine-bar-cafe-deli',
    firstName: 'David', lastName: 'Parkinson', displayName: 'David P.',
    email: 'dparkinson.southport@gmail.com', stars: 5,
    title: 'Excellent wine list and really good sharing plates',
    body: 'Barrique is a genuine find in Southport. The wine list is well put together and the staff know it, which makes a difference: I asked for a recommendation with the charcuterie board and the suggestion was spot on. The food is the right kind for a wine bar: good sharing plates, quality ingredients, nothing fussy. The room has a relaxed atmosphere in the evening that makes it easy to spend a couple of hours there without noticing the time passing. Different kind of evening out to a full restaurant and a good one. Regularly recommended to anyone asking about Southport evenings out.',
    ts: '2026-05-21T20:28:00Z',
  },

  {
    slug: 'the-hesketh-arms',
    firstName: 'Patricia', lastName: 'Holt', displayName: 'Pat H.',
    email: 'patricia.holt1960@icloud.com', stars: 5,
    title: 'Sunday lunch tradition upheld, as good as ever',
    body: 'The Hesketh Arms has been our Sunday lunch place for years and it continues to be excellent. The roast beef is properly cooked, the Yorkshire puddings are the real thing and the vegetables are not an afterthought. The pub itself has a good atmosphere on a Sunday: busy but comfortable, service prompt without being rushed. The beer garden is good in decent weather. It is a proper Southport pub doing proper pub food well. That sounds straightforward but it is rarer than it should be. Long may it continue.',
    ts: '2026-05-18T12:33:00Z',
  },

  {
    slug: 'miller-carter-ainsdale',
    firstName: 'Jonathan', lastName: 'Spear', displayName: 'Jon S.',
    email: 'jonathanspear_sp@gmail.com', stars: 4,
    title: 'Good steak night, right quality at the right price',
    body: 'Went to Miller and Carter in Ainsdale for a steak dinner and came away pleased. The steak was well cooked to order, good quality cut, and the sides were solid. It is a chain but it does what it does to a decent standard and the Ainsdale location is a pleasant setting. The service was attentive and the wine list was reasonable. Not the place for a ground-breaking gastronomic experience but if you want a well-executed steak dinner at a fair price in a comfortable setting, it delivers. Would go back.',
    ts: '2026-05-17T20:41:00Z',
  },

  {
    slug: 'esperantos-bistro',
    firstName: 'Claire', lastName: 'Duggan', displayName: 'Claire D.',
    email: 'claire.duggan.sp@gmail.com', stars: 5,
    title: 'Third visit, still completely faultless',
    body: 'I discovered Esperanto\'s Bistro earlier this year and have been back three times since. It is one of those restaurants that is easy to walk past and a serious mistake to keep doing so. The cooking is inventive without being pretentious and everything I have ordered across three visits has been excellent. The staff are warm and the atmosphere in the evening is just right. It does not try to be a grand restaurant and is better for it: just good food, good service and a pleasant room. One of the better kept secrets in Southport.',
    ts: '2026-05-16T19:52:00Z',
  },

  {
    slug: 'the-waterfront-southport',
    firstName: 'Keith', lastName: 'Saunders', displayName: 'Keith S.',
    email: 'keith.saunders1973@hotmail.co.uk', stars: 4,
    title: 'Good food in a genuinely lovely setting',
    body: 'The Waterfront is one of those Southport venues where the location does half the work. The Marine Lake setting is excellent and in good weather the outdoor terrace is a genuinely nice place to spend an evening. But the food is better than just trading on the view. Had the fish and chips which were well made and my wife had a pasta dish which she said was good quality. The cocktails are well made. Service could have been a touch quicker when it got busy but nothing that spoiled the evening. A good venue that Southport needed.',
    ts: '2026-05-15T17:19:00Z',
  },

  {
    slug: 'harry-s-rooftop-bar-terrace',
    firstName: 'Natalie', lastName: 'Booth', displayName: 'Nat B.',
    email: 'natalie.booth.sp@gmail.com', stars: 5,
    title: 'Brilliant summer evening on the rooftop, great food too',
    body: 'Harry\'s Rooftop Bar and Terrace is the kind of place Southport needed. We went on a clear evening in May and the terrace is a brilliant space: proper views, good outdoor heating for when it cools down, excellent cocktails. The food is well above bar snacks level: small plates that are genuinely well cooked and generous. The chilli prawn skewers are brilliant and the loaded fries are the right kind of guilty pleasure. The staff are enthusiastic and the whole place has a good energy. Already planning the next visit. This is a proper addition to Southport.',
    ts: '2026-05-14T20:03:00Z',
  },

];

console.log(`\nSeeding ${reviews.length} reviews (batch 4 — hotels and restaurants)...\n`);
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
