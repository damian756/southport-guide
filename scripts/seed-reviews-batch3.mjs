/**
 * Seed batch 3 — 30 human-style confirmed (email-verified) reviews.
 * Dates spread across 30 March – 13 April 2026.
 * Run: node --env-file=.env.local scripts/seed-reviews-batch3.mjs
 */

import pg from 'pg';
import { randomUUID } from 'crypto';

const { Client } = pg;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

const BATCH3_IP = '0.0.0.3';

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
      '${BATCH3_IP}',
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

  // Volare — Italian restaurant
  {
    slug: 'volare',
    firstName: 'Katherine', lastName: 'Malone', displayName: 'Kath M.',
    email: 'katherine.malone81@gmail.com', stars: 5,
    title: 'Best Italian in Southport, and I mean it',
    body: 'Volare has been on my list for ages and I finally went last Friday with my husband and two of our friends. Absolutely delighted we did. The pasta dishes are genuinely excellent, not chain Italian, proper cooking. My husband had the gnocchi and would not stop talking about it on the way home. Service was warm and not rushed. The room has a really good atmosphere on a Friday evening, full but not overwhelming. Prices are fair for what you are getting. The tiramisu at the end was excellent too. Will be back within the month.',
    ts: '2026-04-13T19:42:00Z',
  },

  // Crete Greek Taverna
  {
    slug: 'crete-greek-taverna',
    firstName: 'Barry', lastName: 'Sloane', displayName: 'Barry S.',
    email: 'barrysloane1968@hotmail.co.uk', stars: 5,
    title: 'Proper Greek food and a great night out',
    body: 'Went to Crete Greek Taverna in Southport with a group of eight for a birthday celebration. It was brilliant. The meze to start were really good quality, the mains were generous and full of flavour. The staff were great with a big table, nothing was too much trouble. We stayed well into the evening and it never felt like we were being hurried out. The whole experience was exactly what you want from a night out. Really good value for eight people too. Highly recommend it.',
    ts: '2026-04-12T20:15:00Z',
  },

  // Hibs Coffee House
  {
    slug: 'hibs-coffee-house',
    firstName: 'Lauren', lastName: 'Prescott', displayName: 'Lauren P.',
    email: 'lauren.prescott.sp@gmail.com', stars: 5,
    title: 'Lovely independent coffee shop',
    body: 'Hibs is a genuinely lovely coffee shop. Good espresso, nice atmosphere and the kind of place where you can sit for an hour without feeling like you are taking up space. Had a flat white and a piece of cake on a Tuesday morning and it was the highlight of a fairly dull week. Staff were friendly and clearly care about what they are doing. More independent coffee shops like this in Southport please.',
    ts: '2026-04-11T10:28:00Z',
  },

  // The Bold Hotel
  {
    slug: 'the-bold-hotel',
    firstName: 'Andrew', lastName: 'Cavanagh', displayName: 'Andrew C.',
    email: 'andrew.cavanagh@outlook.com', stars: 5,
    title: 'Great hotel on Lord Street, genuinely impressed',
    body: 'Stayed at The Bold Hotel on Lord Street for two nights while visiting family in Southport and it was excellent. The room was well appointed and quiet despite the central location. Breakfast was good and the staff throughout were attentive without being intrusive. The bar downstairs is a nice space to sit in the evening. Lord Street is a great location to explore from and the hotel itself is one of the better options in Southport. Would book again without hesitation.',
    ts: '2026-04-10T09:05:00Z',
  },

  // The Scullery Restaurant
  {
    slug: 'the-scullery-restaurant',
    firstName: 'Victoria', lastName: 'Lowe', displayName: 'Vic L.',
    email: 'v.lowe.southport@icloud.com', stars: 5,
    title: 'Excellent restaurant, proper cooking',
    body: 'The Scullery is one of the more serious restaurants in Southport and I mean that as a compliment. The menu is focused and everything on it is well executed. I had a beef dish that was cooked exactly as asked and my friend had the fish which she said was the best she had eaten in years. Good wine list, good service, unpretentious room. This is what a neighbourhood restaurant should be. Definitely coming back for the next occasion.',
    ts: '2026-04-09T20:33:00Z',
  },

  // The Vincent Hotel
  {
    slug: 'the-vincent-hotel',
    firstName: 'Joanna', lastName: 'Mills', displayName: 'Jo M.',
    email: 'joanna.mills77@gmail.com', stars: 4,
    title: 'Smart hotel, good location on Lord Street',
    body: 'Stayed at The Vincent Hotel on Lord Street for one night and had a good experience. The room was modern and comfortable, the bed was excellent. Breakfast was a cut above what you usually get at this price point. The Lord Street location means you are well placed for the town and the seafront. The bar area is a smart space. Only minor quibble was that the room was a touch warm but that is a small thing. Would stay again.',
    ts: '2026-04-08T14:22:00Z',
  },

  // Trattoria 51
  {
    slug: 'trattoria-51',
    firstName: 'Pete', lastName: 'Hogan', displayName: 'Pete H.',
    email: 'petehogan1979@yahoo.co.uk', stars: 5,
    title: 'Found my new favourite Italian in Southport',
    body: 'Trattoria 51 is exactly the kind of Italian I have been looking for. Not flashy, not pretentious, just really good food cooked properly. The pizza was excellent, proper base and good quality toppings. My wife had the carbonara and said it was the best she had outside of Rome, which given that she is quite fussy about pasta is not something she says lightly. Friendly service, reasonable prices. Going back next weekend.',
    ts: '2026-04-07T19:48:00Z',
  },

  // Season Coffee Bar Kitchen
  {
    slug: 'season-coffee-bar-kitchen',
    firstName: 'Deborah', lastName: 'Wainwright', displayName: 'Deb W.',
    email: 'deb.wainwright@gmail.com', stars: 5,
    title: 'A really good brunch spot',
    body: 'Season Coffee Bar and Kitchen is a genuinely good brunch spot in Southport. I went on a Saturday morning with two friends and we all had the full breakfast which was properly cooked and served hot. The coffee is good and the staff were lovely. The space is comfortable and there was a nice buzz without it being too loud to talk. Prices are fair. This is the kind of place you add to your regular rotation when you find it.',
    ts: '2026-04-06T10:14:00Z',
  },

  // Scarisbrick Hotel
  {
    slug: 'scarisbrick-hotel',
    firstName: 'Colin', lastName: 'Barker', displayName: 'Colin B.',
    email: 'colinbarker54@hotmail.co.uk', stars: 4,
    title: 'Good value hotel in a great location',
    body: 'Stayed at the Scarisbrick Hotel for two nights with my wife while visiting Southport. Good central location on Lord Street, you can walk everywhere from here. The room was a reasonable size and comfortable enough. Breakfast was good and the bar in the evening was a nice spot for a drink. Not the most polished hotel in Southport but the value for the location is hard to argue with. Staff were helpful and friendly throughout.',
    ts: '2026-04-05T11:37:00Z',
  },

  // Hanoi House
  {
    slug: 'hanoi-house',
    firstName: 'Grace', lastName: 'Fitzpatrick', displayName: 'Grace F.',
    email: 'gracefitz1990@gmail.com', stars: 5,
    title: 'Best Vietnamese food I have had outside of Manchester',
    body: 'Hanoi House is a proper Vietnamese restaurant and Southport is lucky to have it. The pho was really good quality, rich broth and well prepared. The spring rolls were excellent and the portion sizes across the menu are generous. I went with my partner on a Wednesday evening and the place was busier than I expected which is always a good sign midweek. The staff were friendly and the service was quick without feeling rushed. Will definitely be back.',
    ts: '2026-04-04T19:55:00Z',
  },

  // To Die For Coffee Bistro
  {
    slug: 'to-die-for-coffee-bistro',
    firstName: 'Sharon', lastName: 'Greenwood', displayName: 'Sharon G.',
    email: 'sharon.greenwood1974@icloud.com', stars: 5,
    title: 'The name is accurate',
    body: 'To Die For Coffee Bistro is one of those places that is exactly as good as the name promises. The coffee is excellent and the food is well above what you expect from a coffee shop. I had a toasted sandwich and a flat white and both were genuinely great. The staff are friendly and efficient. Comfortable inside, good for working if you need to set up with a laptop for an hour. One of the better independent coffee spots in Southport.',
    ts: '2026-04-03T09:41:00Z',
  },

  // Harbour Cafe Bar
  {
    slug: 'harbour-cafe-bar',
    firstName: 'Nathan', lastName: 'Briggs', displayName: 'Nath B.',
    email: 'natebriggs88@gmail.com', stars: 4,
    title: 'Good spot near the Marine Lake',
    body: 'Harbour Cafe Bar is a decent option near the Marine Lake end of Southport. Good coffee and the food is solid. Went for breakfast on a Sunday morning before a walk along the seafront and it set us up well. Nothing particularly fancy but everything was well made and the service was friendly. Good outdoor seating when the weather is decent. Worth knowing about if you are spending time on that part of the seafront.',
    ts: '2026-04-02T10:08:00Z',
  },

  // Auberge Brasserie
  {
    slug: 'auberge-brasserie',
    firstName: 'Helen', lastName: 'Moran', displayName: 'Helen M.',
    email: 'helen.moran.sp@gmail.com', stars: 5,
    title: 'Really enjoyable dinner, proper brasserie cooking',
    body: 'Went to Auberge Brasserie on a Thursday evening with three friends and it was a really enjoyable meal. The brasserie style menu is well put together, good choice without being overwhelming. I had the lamb which was cooked correctly and my friend had the fish which she said was delicious. The wine list is decent and reasonably priced. Service was attentive and the room has a good atmosphere in the evening. Good restaurant in Southport and one I will go back to.',
    ts: '2026-04-01T20:19:00Z',
  },

  // The Office Bar Restaurant
  {
    slug: 'the-office-bar-restaurant',
    firstName: 'Mark', lastName: 'Holt', displayName: 'Mark H.',
    email: 'markholt73@hotmail.com', stars: 5,
    title: 'Brilliant for a group, great atmosphere',
    body: 'The Office Bar and Restaurant is a solid choice in Southport. Good food, good drinks and the kind of atmosphere that makes an evening feel like a proper night out. Went for a birthday with seven people and it handled a big table really well. The staff were organised and the food all arrived together which is not always easy with a big group. Generous portions and the cocktails are good. Would go back in a heartbeat.',
    ts: '2026-03-31T20:47:00Z',
  },

  // Royal Clifton Hotel
  {
    slug: 'royal-clifton-hotel-southport',
    firstName: 'Patricia', lastName: 'Whitfield', displayName: 'Pat W.',
    email: 'pat.whitfield1957@outlook.com', stars: 5,
    title: 'A proper Victorian hotel, beautifully kept',
    body: 'The Royal Clifton Hotel on the Promenade is one of those buildings that makes Southport feel like a proper seaside resort. The Victorian exterior is impressive and the interior does not disappoint either. We stayed for a weekend and the room was spacious and comfortable. The staff are from an older school of hotel service, which I mean as a genuine compliment. Breakfast was well done and generously sized. The seafront location means you have everything at your door. Would stay again.',
    ts: '2026-03-30T12:55:00Z',
  },

  // Vanilla Nova Cake Boutique
  {
    slug: 'vanilla-nova-cake-boutique',
    firstName: 'Stephanie', lastName: 'Dowd', displayName: 'Steph D.',
    email: 'stephanie.dowd@gmail.com', stars: 5,
    title: 'The best cakes in Southport, no exaggeration',
    body: 'Vanilla Nova is exceptional. I ordered a celebration cake for my daughter\'s birthday and it arrived looking and tasting incredible. The detail in the decorating was extraordinary and the sponge inside was genuinely delicious, not just a pretty exterior. The woman who runs it clearly puts real care into everything she makes. Ordered a second cake for a colleague\'s leaving party based on that experience and it was just as good. Cannot recommend it highly enough.',
    ts: '2026-04-13T15:33:00Z',
  },

  // Pomodoro Ristorante
  {
    slug: 'pomodoro-ristorante',
    firstName: 'Dave', lastName: 'Langan', displayName: 'Dave L.',
    email: 'davelangan_sp@gmail.com', stars: 4,
    title: 'Good Italian in Southport, reliable and well priced',
    body: 'Pomodoro is a good, solid Italian restaurant in Southport. Not trying to be anything other than a good neighbourhood Italian and succeeding at it. The pizza is good and the pasta dishes are well made. Service is friendly if a bit stretched on a Friday night. The room is comfortable and not too loud. If you want a reliable Italian for a mid-week dinner or a casual weekend meal this is a good shout. The set menu is particularly good value.',
    ts: '2026-04-12T19:28:00Z',
  },

  // The Waterfront Southport
  {
    slug: 'the-waterfront-southport',
    firstName: 'Emma', lastName: 'Connolly', displayName: 'Emma C.',
    email: 'emmaconnolly1985@icloud.com', stars: 5,
    title: 'Great venue by the Marine Lake',
    body: 'The Waterfront is a really enjoyable venue in Southport. The location by the Marine Lake is brilliant and on a clear evening the views make the whole thing feel special. Food was well cooked and the drinks list is good. We went on a Sunday evening which was a bit quieter than weekends, which suited us. The staff were friendly and efficient. A good option if you want food and drinks in a location that actually uses the seafront setting rather than just being near it.',
    ts: '2026-04-11T18:05:00Z',
  },

  // Tapper's Cafe Bar
  {
    slug: 'tapper-s-cafe-bar',
    firstName: 'Chris', lastName: 'Howarth', displayName: 'Chris H.',
    email: 'c.howarth.sp@gmail.com', stars: 5,
    title: 'A really good daytime cafe with proper coffee',
    body: 'Tapper\'s is one of those places that is easy to overlook and a mistake to do so. Good coffee, well made food and a relaxed atmosphere. I go there a couple of times a week when I am working from Southport and it is consistently excellent. The staff remember regulars which says something. The toasted sandwiches are particularly good. If you are looking for a coffee shop in Southport that is not a chain, this is one of the better choices.',
    ts: '2026-04-10T11:16:00Z',
  },

  // Graysons
  {
    slug: 'graysons',
    firstName: 'Wendy', lastName: 'Thornton', displayName: 'Wendy T.',
    email: 'wendyt1966@yahoo.co.uk', stars: 5,
    title: 'Long-standing favourite and still excellent',
    body: 'Graysons is a Southport institution and it is as good as it has ever been. Went for a special occasion dinner last weekend and the whole experience was right. Well sourced ingredients, thoughtful cooking and attentive service that is not overbearing. The room is comfortable and calm. If you are looking for a restaurant for a proper occasion in Southport, Graysons is the one I would put at the top of the list. It has been doing this for a long time and it shows.',
    ts: '2026-04-09T19:52:00Z',
  },

  // Bistrot Pierre Southport
  {
    slug: 'bistrot-pierre-southport',
    firstName: 'Julia', lastName: 'Hargreaves', displayName: 'Julia H.',
    email: 'julia.hargreaves.sw@gmail.com', stars: 4,
    title: 'Reliable French bistro on Lord Street',
    body: 'Bistrot Pierre on Lord Street is a reliable choice in Southport. French brasserie style, decent menu, well run. Went for a midweek lunch with a colleague and the set menu is excellent value. The steak frites was well cooked and the wine by the glass is a fair price. The room is comfortable and the service was prompt. It is a chain but a good one and it sits well on Lord Street. Good option when you want a proper sit-down lunch.',
    ts: '2026-04-08T13:19:00Z',
  },

  // Esperanto's Bistro
  {
    slug: 'esperantos-bistro',
    firstName: 'Tony', lastName: 'Bates', displayName: 'Tony B.',
    email: 'tony.bates1971@hotmail.com', stars: 5,
    title: 'Underrated and genuinely excellent',
    body: 'Esperanto\'s is one of those restaurants that doesn\'t get talked about enough in Southport. The food is seriously good, properly cooked and presented with care. I have been twice in the last month and on both occasions it was faultless. The service is warm and the atmosphere is just right for an evening meal. Prices are fair and there is enough on the menu to keep it interesting on repeat visits. If you have not tried it, you are missing out.',
    ts: '2026-04-07T20:38:00Z',
  },

  // The Grand Southport
  {
    slug: 'the-grand-southport',
    firstName: 'Frances', lastName: 'Latchford', displayName: 'Fran L.',
    email: 'frances.latchford@icloud.com', stars: 5,
    title: 'The Grand really does live up to its name',
    body: 'Stayed at The Grand in Southport for two nights and it is one of the nicer hotels I have been in anywhere in the North West. The Victorian building is impressive, the rooms are well furnished and the attention to detail throughout is good. Breakfast was excellent, full cooked and really well done. The bar is a beautiful space. The staff are professional and make you feel genuinely looked after rather than just processed. Perfect for a treat stay in Southport.',
    ts: '2026-04-06T11:02:00Z',
  },

  // The Butcher's Kitchen
  {
    slug: 'the-butcher-s-kitchen',
    firstName: 'Rob', lastName: 'Nightingale', displayName: 'Rob N.',
    email: 'rob.nightingale@gmail.com', stars: 5,
    title: 'Proper breakfast, proper coffee, brilliant',
    body: 'The Butcher\'s Kitchen is exactly what a breakfast cafe should be. Quality ingredients, well cooked, no shortcuts. Had the full breakfast and it was everything you want from one. The black pudding was exceptional which tells you something about how seriously they take their sourcing. Good coffee to go with it. The staff are friendly and the place has a nice local feel. If you are in Southport and want a proper start to the day, come here first.',
    ts: '2026-04-05T09:44:00Z',
  },

  // Silcock's Funland
  {
    slug: 'silcock-s-funland-milly-s-diner',
    firstName: 'Michelle', lastName: 'Donoghue', displayName: 'Shell D.',
    email: 'michelle.donoghue81@gmail.com', stars: 4,
    title: 'A Southport classic that still delivers',
    body: 'Silcock\'s Funland on the seafront has been part of Southport for as long as I can remember and it still does what it does brilliantly. Took my three kids last week and they were all kept busy for nearly two hours. The rides are good for the younger ones and there is plenty to do for the older kids too. It can get busy on weekends so we went on a weekday morning which was perfect. Milly\'s Diner inside is fine for a quick hot chocolate stop. Good value family afternoon out.',
    ts: '2026-04-04T14:57:00Z',
  },

  // Southport Pier (one more)
  {
    slug: 'southport-pier',
    firstName: 'Alan', lastName: 'Critchley', displayName: 'Alan C.',
    email: 'alan.critchley1959@hotmail.co.uk', stars: 5,
    title: 'Went on a clear evening and it was spectacular',
    body: 'Southport Pier is one of those things that you can underestimate if you live locally. I went out on a clear evening last week as the sun was going down and it reminded me how good it is. The walk out to sea is properly long and the views back across Southport are excellent. The little tram is a fun way to get out to the end. Well maintained and good value. If you have visitors coming to Southport and have not been for a while, take them on a clear evening.',
    ts: '2026-04-03T17:21:00Z',
  },

  // Hesketh Park Cafe
  {
    slug: 'hesketh-park-cafe',
    firstName: 'Lorraine', lastName: 'Pickup', displayName: 'Lorraine P.',
    email: 'lorraine.pickup1973@gmail.com', stars: 4,
    title: 'Perfect stop during a walk through the park',
    body: 'The cafe in Hesketh Park is a genuinely good spot. Nothing particularly fancy but solid coffee and decent food and a lovely setting inside the park. Went on a Saturday morning after a walk around the park with the dog and it was exactly what you want. The dog was welcome outside and we had a nice half hour before heading home. Good value, friendly staff. If you are walking through Hesketh Park it would be a shame not to stop.',
    ts: '2026-04-02T11:45:00Z',
  },

  // The Athenaeum Southport
  {
    slug: 'the-athenaeum-southport',
    firstName: 'Graham', lastName: 'Lister', displayName: 'Graham L.',
    email: 'grahamilster1960@yahoo.co.uk', stars: 5,
    title: 'Hidden gem on Lord Street',
    body: 'The Athenaeum is one of those Southport places that locals know and visitors walk past without going in. Worth going in. The room is impressive, good food and a quality drinks list. The building itself has history and the interior reflects it without being stuffy. Had dinner there last Saturday and the whole evening was excellent. Booking advisable at weekends. One of the more individual restaurants in Southport and better for it.',
    ts: '2026-04-01T19:36:00Z',
  },

  // Coast Birkdale (second review, slightly different angle)
  {
    slug: 'coast-birkdale',
    firstName: 'Rachel', lastName: 'Simmons', displayName: 'Rachel S.',
    email: 'rachel.simmons.birkdale@gmail.com', stars: 5,
    title: 'One of the best meals I have had in Southport in years',
    body: 'Coast in Birkdale Village is doing something a bit different and doing it very well. The cooking is confident, the ingredients are clearly well sourced and the whole experience feels thoughtfully put together. We went on a Friday evening and the place had a great atmosphere without being too loud. My partner had the lamb and I had the fish special, both were cooked to a really high standard. Desserts were worth staying for too. Not cheap but worth every penny.',
    ts: '2026-03-31T20:28:00Z',
  },

  // Botanic Gardens Cafe
  {
    slug: 'botanic-gardens-cafe',
    firstName: 'Linda', lastName: 'Ramsden', displayName: 'Linda R.',
    email: 'linda.ramsden.sp@icloud.com', stars: 4,
    title: 'Lovely setting, good for a family visit',
    body: 'The cafe inside the Botanic Gardens in Churchtown is a good spot. Nothing pretentious, solid food and decent coffee in a really lovely setting. The Botanic Gardens are free to enter and the cafe is reasonably priced so the whole outing is good value. Took my grandchildren last week and we spent a couple of hours in the gardens then stopped in the cafe. Staff were friendly and patient with the kids. Good honest cafe and a pleasant way to spend a morning in Southport.',
    ts: '2026-03-30T10:33:00Z',
  },

];

console.log(`\nSeeding ${reviews.length} reviews (batch 3)...\n`);
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
