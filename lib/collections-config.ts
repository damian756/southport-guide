// ── Collection Pages Config ───────────────────────────────────────────────────
// Programmatic tag-filtered listing pages at /collections/[slug].
// Each entry queries the DB for businesses matching the given tags + categories.
// Pages with fewer than MIN_LISTINGS results are served noindex automatically.

export const MIN_LISTINGS = 4;

export interface Collection {
  slug: string;
  /** H1 and page title */
  title: string;
  /** Meta description */
  metaDescription: string;
  /** Terry-voice intro — 60–100 words, shown above the listings */
  intro: string;
  /** Exclude from sitemap (e.g. pages that render noindex due to thin content) */
  sitemapExclude?: boolean;
  /** Tags to match (business must have ALL of these) */
  tags: string[];
  /** Category slugs to filter by (business must be in ONE of these) */
  categorySlugs: string[];
  /** Emoji shown in the hero */
  emoji: string;
  /** Sitemap priority */
  priority: number;
  /** Card image path (relative to /public) */
  image?: string;
}

export const COLLECTIONS: Collection[] = [
  // ── Dog-friendly ──────────────────────────────────────────────────────────
  {
    slug: "dog-friendly-restaurants-southport",
    title: "Dog-Friendly Restaurants in Southport",
    metaDescription:
      "Dog-friendly restaurants in Southport — places that actually mean it, with water bowls outside and dogs welcome inside. Updated local list.",
    intro:
      "Frank has been to most of the dog-friendly restaurants in Southport at least once. The ones that genuinely welcome dogs are a shorter list than you might think: water bowls out front, space inside, staff who don't look panicked when you walk in with a bulldog. Those are the ones on this list. Phone ahead for evening visits. Most places have limited outside tables and the inside situation can change.",
    tags: ["dog-friendly"],
    categorySlugs: ["restaurants"],
    emoji: "🐾",
    priority: 0.8,
    image: "/images/collections/collection-dog-friendly-restaurants.jpg",
  },
  {
    slug: "dog-friendly-pubs-southport",
    title: "Dog-Friendly Pubs in Southport",
    metaDescription:
      "Dog-friendly pubs in Southport — welcoming dogs inside, with outdoor space and post-walk food worth having. The honest local list.",
    intro:
      "Frank rates a pub partly on its beer garden and partly on whether the bar staff acknowledge him when he walks in. He has strong opinions. These are the Southport pubs that pass both tests: dogs genuinely welcome inside, outdoor space worth using, and post-walk food that makes the trip worthwhile. Call ahead at weekends. Some of the smaller places fill up fast.",
    tags: ["dog-friendly"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🐶",
    priority: 0.8,
    image: "/images/collections/collection-dog-friendly-pubs.jpg",
  },
  {
    slug: "dog-friendly-cafes-southport",
    title: "Dog-Friendly Cafés in Southport",
    metaDescription:
      "Dog-friendly cafés in Southport — independent coffee shops and tea rooms that welcome dogs. Honest local list, water bowls and all.",
    intro:
      "After a walk on the beach or through the dunes, a coffee is non-negotiable. Frank's view is that a decent café has a water bowl outside and doesn't make you tie him to a post in the rain. I agree. These are the Southport cafes that actually mean it when they say dogs welcome. They're almost all independents, which is usually a reliable indicator.",
    tags: ["dog-friendly"],
    categorySlugs: ["cafes"],
    emoji: "☕",
    priority: 0.75,
    image: "/images/collections/collection-dog-friendly-cafes.jpg",
  },

  // ── Outdoor seating ──────────────────────────────────────────────────────
  {
    slug: "outdoor-seating-restaurants-southport",
    title: "Restaurants with Outdoor Seating in Southport",
    metaDescription:
      "Restaurants with outdoor seating in Southport — the best places to eat outside when the weather actually plays ball.",
    intro:
      "Southport's outdoor eating is entirely dependent on the weather cooperating, which it does maybe half the time. When it does, these are the restaurants where sitting outside is actually worth it: proper terraces, not two chairs on a pavement. Lord Street has a few. Birkdale village has more. Book ahead in summer, especially when the sun is forecast. Everyone else has the same idea.",
    tags: ["outdoor-seating"],
    categorySlugs: ["restaurants"],
    emoji: "🌤️",
    priority: 0.75,
    image: "/images/collections/collection-outdoor-seating.jpg",
  },

  // ── Family-friendly ──────────────────────────────────────────────────────
  {
    slug: "family-friendly-restaurants-southport",
    title: "Family-Friendly Restaurants in Southport",
    metaDescription:
      "Family-friendly restaurants in Southport — places with kids' menus, highchairs, and staff who don't visibly panic when children arrive.",
    intro:
      "I've taken four kids to most of the restaurants in this town, so I know which ones are genuinely set up for families and which ones just tolerate them. These are the ones with proper kids' menus, highchairs, and enough space that your four-year-old dropping a fork doesn't ruin anyone's evening. Covers everything from pizza to something a bit more ambitious, depending on what your lot will actually eat.",
    tags: ["family-friendly"],
    categorySlugs: ["restaurants"],
    emoji: "👨‍👩‍👧‍👦",
    priority: 0.8,
    image: "/images/collections/collection-family-friendly-restaurants.jpg",
  },
  {
    slug: "family-friendly-things-to-do-southport",
    title: "Family-Friendly Things to Do in Southport",
    metaDescription:
      "Family-friendly things to do in Southport — activities and attractions worth the effort with kids. Honest, no filler.",
    intro:
      "Southport is genuinely good with kids. I've been taking mine to the beach, the Atkinson, Pleasureland, and the Botanic Gardens for years, and I have a reasonable sense of what holds up with actual children in tow and what looks better in a leaflet than it is. This list is the honest version, across a range of ages and budgets.",
    tags: ["family-friendly"],
    categorySlugs: ["attractions", "activities"],
    emoji: "🎡",
    priority: 0.8,
    image: "/images/collections/collection-family-friendly-things.jpg",
  },

  // ── Location-based: restaurants ──────────────────────────────────────────
  {
    slug: "lord-street-restaurants-southport",
    title: "Lord Street Restaurants in Southport",
    metaDescription:
      "Restaurants on Lord Street Southport — dining along the Victorian boulevard. The best places to eat on Southport's main street.",
    intro:
      "Lord Street is a mile long and the quality varies enormously. I've eaten along most of it over the years. These are the restaurants worth your time: actually on or just off the boulevard, under the Victorian canopies. The street itself is worth walking even between courses. Not many town centres look like this.",
    tags: ["lord-street"],
    categorySlugs: ["restaurants"],
    emoji: "🍽️",
    priority: 0.8,
    image: "/images/collections/collection-lord-street-restaurants.jpg",
  },
  {
    slug: "lord-street-cafes-southport",
    title: "Cafés on Lord Street Southport",
    metaDescription:
      "Cafés on Lord Street Southport — coffee shops and tea rooms along the Victorian boulevard. Where to stop for a proper coffee.",
    intro:
      "There are more cafes on Lord Street than most people realise. They're tucked into the arcades and behind the glass canopies. Some are good, some are average, some are overpriced because of the location. These are the ones worth stopping at. If you're spending time on the street anyway, a coffee and something to eat is the right way to do it.",
    tags: ["lord-street"],
    categorySlugs: ["cafes"],
    emoji: "☕",
    priority: 0.75,
    image: "/images/collections/collection-lord-street-cafes.jpg",
  },
  {
    slug: "birkdale-village-restaurants",
    title: "Birkdale Village Restaurants",
    metaDescription:
      "Restaurants in Birkdale Village Southport — dining on Liverpool Road, two minutes from Royal Birkdale Golf Club. The local favourite.",
    intro:
      "Birkdale village is where I go when I want a decent meal without the town centre. Liverpool Road has a cluster of independent restaurants that are genuinely good: not fancy, just reliable. Better quality per square mile than most of the town centre, honestly. Book at weekends. Parking is straightforward compared to Lord Street.",
    tags: ["birkdale"],
    categorySlugs: ["restaurants"],
    emoji: "🍷",
    priority: 0.8,
    image: "/images/collections/collection-birkdale-village-restaurants.jpg",
  },

  // ── Dining style ─────────────────────────────────────────────────────────
  {
    slug: "afternoon-tea-southport",
    title: "Afternoon Tea in Southport",
    metaDescription:
      "Afternoon tea in Southport — the best places for a proper afternoon tea. Hotels, independent tea rooms, and the ones worth booking ahead.",
    intro:
      "Southport does afternoon tea reasonably well. Not Bath, but better than you'd think for a seaside town in Merseyside. These are the places doing it properly: sandwiches that are actually worth eating, scones with decent jam, tea in a pot rather than a bag on a string. The hotels tend to be the safer bet. Book ahead at weekends, especially in summer.",
    tags: ["afternoon-tea"],
    categorySlugs: ["restaurants", "cafes", "hotels"],
    emoji: "🫖",
    priority: 0.78,
    image: "/images/collections/collection-afternoon-tea.jpg",
  },
  {
    slug: "bottomless-brunch-southport",
    title: "Bottomless Brunch in Southport",
    metaDescription:
      "Bottomless brunch in Southport — restaurants and bars offering bottomless brunch deals. What's on, where, and what to expect.",
    intro:
      "Bottomless brunch in Southport is a growing thing. Not everywhere offers it, and quality varies. These are the places worth booking: typically weekends only, and you do need to book. The best ones do it properly. The worst just pour cheap prosecco at speed. The ones on this list are the former.",
    tags: ["bottomless-brunch"],
    categorySlugs: ["restaurants", "bars-nightlife"],
    emoji: "🥂",
    priority: 0.72,
    sitemapExclude: true,
  },

  // ── Hotels ───────────────────────────────────────────────────────────────
  {
    slug: "hotels-with-parking-southport",
    title: "Hotels with Parking in Southport",
    metaDescription:
      "Hotels with parking in Southport — accommodation with on-site or adjacent parking. Useful for The Open 2026 and peak summer visits.",
    intro:
      "Parking in central Southport on a busy weekend is a genuine headache. During the Air Show or Open week it gets properly difficult. These hotels either have their own car park or sit close enough to one that it removes the problem. Confirm the arrangements when you book. Some places have limited spaces and they go quickly.",
    tags: ["parking"],
    categorySlugs: ["hotels"],
    emoji: "🏨",
    priority: 0.8,
    image: "/images/collections/collection-hotels-parking.jpg",
  },
  {
    slug: "budget-hotels-southport",
    title: "Budget Hotels in Southport",
    metaDescription:
      "Budget hotels in Southport — affordable accommodation without the premium. Good value places to stay in Southport and nearby.",
    intro:
      "Southport has plenty of budget accommodation. Some of it is genuinely good value; some of it is just cheap. These are the ones worth the money: independent guest houses and mid-market options that offer a decent stay without the premium. Good for families and anyone who doesn't need a fancy hotel to enjoy the town.",
    tags: ["budget"],
    categorySlugs: ["hotels"],
    emoji: "💷",
    priority: 0.78,
    image: "/images/collections/collection-budget-hotels.jpg",
  },
  {
    slug: "hotels-near-royal-birkdale",
    title: "Hotels Near Royal Birkdale",
    metaDescription:
      "Hotels near Royal Birkdale Golf Club Southport — accommodation for The Open 2026 and golf visitors. Where to stay near the course.",
    intro:
      "The Open is at Royal Birkdale, 12 to 19 July 2026. If you're going, where you're staying matters more than it normally would. These are the closest hotels to the course. Some you can walk from. All of them avoid the worst of the traffic. July availability is already tight. I am not exaggerating. Book now if you haven't.",
    tags: ["birkdale"],
    categorySlugs: ["hotels"],
    emoji: "⛳",
    priority: 0.85,
    image: "/images/collections/collection-hotels-birkdale.jpg",
  },

  // ── Sunflower-friendly ───────────────────────────────────────────────────
  {
    slug: "sunflower-friendly-southport",
    title: "Sunflower-Friendly Venues in Southport",
    metaDescription:
      "Sunflower-friendly venues in Southport — businesses and attractions registered with the Hidden Disabilities Sunflower scheme, where staff recognise the lanyard and offer support.",
    intro:
      "These Southport venues are registered with the Hidden Disabilities Sunflower scheme. Staff have been trained to recognise the lanyard and know to offer support quietly, without asking for explanations or proof. No fuss required. The list is shorter than it should be, and we're working on that. Lanyards are free to collect at Southport train station or order from hiddendisabilitiesstore.com.",
    tags: ["sunflower-friendly"],
    categorySlugs: ["attractions", "cafes", "restaurants", "hotels", "activities", "transport"],
    emoji: "🌻",
    priority: 0.82,
  },

  // ── Sensory-friendly ─────────────────────────────────────────────────────
  {
    slug: "sensory-friendly-southport",
    title: "Sensory-Friendly Places in Southport",
    metaDescription:
      "Sensory-friendly places in Southport — calm venues, open spaces, and businesses welcoming to autistic visitors and those with sensory sensitivities.",
    intro:
      "Some places in Southport are naturally calmer: open outdoor spaces, quieter galleries, cafes that don't have music blaring. These are the venues and attractions that tend to work well for autistic visitors and families with sensory sensitivities. Not every place will suit every person, but these are the ones I'd point you to first when planning a day out.",
    tags: ["sensory-friendly"],
    categorySlugs: ["attractions", "activities", "cafes", "restaurants", "beaches-parks"],
    emoji: "🧩",
    priority: 0.8,
    image: "/images/collections/collection-sensory-friendly.jpg",
  },

  // ── Art galleries ─────────────────────────────────────────────────────────
  {
    slug: "art-galleries-southport",
    title: "Art Galleries in Southport",
    metaDescription:
      "Art galleries in Southport — independent galleries and exhibition spaces across the town. From Lord Street to Wayfarers Arcade and beyond.",
    intro:
      "Most visitors walk straight past the galleries in Southport without realising they're there. Wayfarers Arcade alone has three of them. The Atkinson on Lord Street is the main one: free entry, regularly changing exhibitions, and genuinely good. It's the kind of place that makes you proud to live here. The independents on Lord Street and out in Ainsdale are smaller but worth the stop. No booking, no entry fee.",
    tags: ["gallery"],
    categorySlugs: ["attractions", "shopping"],
    emoji: "🖼️",
    priority: 0.78,
    image: "/images/collections/collection-art-galleries.jpg",
  },

  // ── Nature reserves ───────────────────────────────────────────────────────
  {
    slug: "nature-reserves-southport",
    title: "Nature Reserves Near Southport",
    metaDescription:
      "Nature reserves near Southport — coastal dunes, wetland reserves, and wildlife sites on the Sefton Coast. RSPB Marshside, Ainsdale Dunes, and more.",
    intro:
      "The dunes and wetland reserves along this stretch of coast are genuinely significant. I've been walking them for forty years and they still surprise me. Ainsdale Sand Dunes, Birkdale Sandhills, RSPB Marshside, Freshfield Dune Heath: all within easy reach of the town, almost all free. Go on a weekday morning and you'll have most of them to yourself. The RSPB reserve at Marshside is best in winter: wide skies, wading birds, and almost nobody else there.",
    tags: ["nature-reserve"],
    categorySlugs: ["beaches-parks", "activities", "attractions"],
    emoji: "🌿",
    priority: 0.8,
    image: "/images/collections/collection-nature-reserves.jpg",
  },

  // ── Botanic Gardens ───────────────────────────────────────────────────────
  {
    slug: "botanic-gardens-southport",
    title: "Botanic Gardens Southport",
    metaDescription:
      "Botanic Gardens Southport — the Victorian walled garden in Churchtown. Fernery, aviaries, cafe, and free entry. A Southport institution since 1874.",
    intro:
      "I grew up a ten-minute walk from the Botanic Gardens in Churchtown and took them completely for granted for about thirty years. Visitors discover it by accident and can't believe it's free. It opened in 1874 and has a proper heated fernery, an aviary, formal gardens, and a café. It's calm in a way that most visitor attractions aren't. The surrounding Churchtown village is worth the extra half hour. It's the historic heart of Southport, older than the town itself.",
    tags: ["botanic-gardens"],
    categorySlugs: ["attractions", "cafes", "activities"],
    emoji: "🌱",
    priority: 0.8,
    image: "/images/collections/collection-botanic-gardens.jpg",
  },

  // ── Marine Lake ───────────────────────────────────────────────────────────
  {
    slug: "marine-lake-southport",
    title: "Marine Lake Southport",
    metaDescription:
      "Marine Lake Southport — boating, cafes, and open water on the Southport seafront. Everything at and around the Marine Lake, including boat hire and the adjacent King's Gardens.",
    intro:
      "Marine Lake is 140 acres of flat, calm water right on the seafront. On a good day it looks like something from a different town. You can hire pedalos, take a boat trip, walk the path around the edge, or just sit at the cafe and watch the water. King's Gardens runs alongside it. Marine Drive car park is the closest, but it fills by 10am on a summer Saturday. Go early or park further back and walk. Free to access. Good for families, good on your own.",
    tags: ["marine-lake"],
    categorySlugs: ["attractions", "activities", "cafes", "beaches-parks"],
    emoji: "⛵",
    priority: 0.82,
    image: "/images/collections/collection-marine-lake.jpg",
  },

  // ── Free / budget-friendly ────────────────────────────────────────────────
  {
    slug: "free-things-to-do-southport",
    title: "Free Things to Do in Southport",
    metaDescription:
      "Free things to do in Southport — the beach, Botanic Gardens, Southport Pier, Victoria Park, Marine Lake, and 30+ more attractions that cost nothing. Updated local list.",
    intro:
      "Southport has more free things to do than most seaside towns its size. The beach is free. The pier is free to walk. The Botanic Gardens in Churchtown are free. The Atkinson gallery on Lord Street is free. This list covers the attractions, outdoor spaces, and activities that genuinely cost nothing. Some of the best things in this town are on it.",
    tags: ["free"],
    categorySlugs: ["attractions", "beaches-parks", "activities"],
    emoji: "🎟️",
    priority: 0.82,
    image: "/images/collections/collection-free-things.jpg",
  },

  // ── Bars ─────────────────────────────────────────────────────────────────
  {
    slug: "live-music-bars-southport",
    title: "Live Music Bars in Southport",
    metaDescription:
      "Live music bars in Southport — pubs and bars with regular live music. Where to find a proper night out with live acts.",
    intro:
      "Southport has a decent live music scene, most of it concentrated in a handful of bars. These are the ones with regular acts, usually at weekends and occasionally midweek. The quality varies, which is honest. The best of them are worth planning a night around. Check the venue's social media before you go: the listings change and cancellations happen.",
    tags: ["live-music"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🎸",
    priority: 0.75,
    image: "/images/collections/collection-live-music.jpg",
  },
  {
    slug: "late-night-bars-southport",
    title: "Late Night Bars in Southport",
    metaDescription:
      "Late night bars in Southport — bars and venues open past midnight. Where to go for a late drink in Southport.",
    intro:
      "Southport's late-night scene is mainly clustered around the town centre. These are the bars that are actually open past midnight and worth going to when they are. Friday and Saturday are when it makes sense. Midweek is quieter than you'd expect for a town this size, but the weekend can be lively. Don't expect a city.",
    tags: ["late-night"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🌙",
    priority: 0.72,
    image: "/images/collections/collection-late-night-bars.jpg",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getAllCollectionSlugs(): string[] {
  return COLLECTIONS.map((c) => c.slug);
}
