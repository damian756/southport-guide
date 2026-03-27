// ── Guides Config ────────────────────────────────────────────────────────────
// Single source of truth for all editorial guide pages.
// Adding a new guide: add one entry here + create app/guides/[slug]/page.tsx.
// Drives: /guides/ index, sitemap, related guides, dynamic listings, nav.

export type GuideCategory =
  | "beaches-coast"
  | "events"
  | "areas"
  | "practical"
  | "food-drink";

export type GuideStatus = "published" | "coming-soon";

export interface Guide {
  slug: string;
  title: string;
  /** Shorter label used in nav dropdowns where space is tight */
  shortTitle?: string;
  /** One-liner shown on index cards */
  description: string;
  /** Longer excerpt used in SEO meta description */
  excerpt: string;
  category: GuideCategory;
  heroImage: string;
  /** 0–1 for sitemap priority */
  seoPriority: number;
  datePublished: string;
  dateUpdated: string;
  tags: string[];
  status: GuideStatus;
  /**
   * Controls which business listings the GuideLayout renders at the bottom.
   * Matches against Business.secondaryCategoryIds (category slugs) or Business.tags.
   */
  listingFilter?: {
    categorySlugs?: string[];
    tags?: string[];
  };
  /** Optional override for SEO title */
  metaTitle?: string;
  /** Optional override for SEO description */
  metaDescription?: string;
}

export const GUIDE_CATEGORIES: Record<GuideCategory, { label: string; description: string; emoji: string }> = {
  "beaches-coast": {
    label: "Beaches & Coast",
    description: "The 22-mile Sefton Coast — from Southport Beach to Crosby.",
    emoji: "🏖️",
  },
  events: {
    label: "Events",
    description: "Major annual events — The Open, Air Show, Flower Show, and more.",
    emoji: "📅",
  },
  areas: {
    label: "Areas",
    description: "The neighbourhoods and districts that make up Southport.",
    emoji: "📍",
  },
  practical: {
    label: "Practical",
    description: "Parking, transport, rainy days, and dog-friendly — the useful stuff.",
    emoji: "🔧",
  },
  "food-drink": {
    label: "Food & Drink",
    description: "Where to eat, drink, and brunch in Southport.",
    emoji: "🍽️",
  },
};

export const GUIDES: Guide[] = [
  // ── Beaches & Coast ──────────────────────────────────────────────────────
  {
    slug: "southport-beach",
    title: "Southport Beach",
    description: "One of England's widest beaches. Postcode, parking, dogs, tides, and what to expect.",
    excerpt:
      "Southport Beach guide — postcode PR8 1RX, parking on Marine Drive, dog rules, tides, facilities, and honest advice on what to expect. Written by a Southport local.",
    category: "beaches-coast",
    heroImage: "/images/southport-beach.webp",
    seoPriority: 0.92,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["beach", "coastal", "dog-friendly", "free", "parking"],
    status: "published",
    listingFilter: {
      categorySlugs: ["cafes", "activities", "attractions"],
      tags: ["beach", "seafront"],
    },
    metaTitle: "Southport Beach Guide | Postcode PR8 1RX, Parking, Dogs & Tips",
    metaDescription:
      "Southport Beach — postcode PR8 1RX, free parking on Marine Drive, dogs welcome year-round, tide times, facilities and honest local advice. One of England's widest beaches.",
  },
  {
    slug: "southport-pier",
    title: "Southport Pier",
    description: "England's second longest pier — 1,108m. Free to walk. Views to Wales on a clear day.",
    excerpt:
      "Southport Pier is 1,108 metres long — England's second longest. Free to walk. History, the walk out, views from the pierhead, and practical info.",
    category: "beaches-coast",
    heroImage: "/southport-pier.webp",
    seoPriority: 0.88,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["pier", "seafront", "heritage", "free", "walking"],
    status: "published",
    listingFilter: {
      categorySlugs: ["cafes", "attractions"],
      tags: ["seafront", "promenade"],
    },
    metaTitle: "Southport Pier | England's Second Longest Pier | Complete Guide",
    metaDescription:
      "Southport Pier — 1,108 metres, England's second longest. History, what to see, when to visit, parking, and honest advice from a local. Free to walk.",
  },

  // ── Events ───────────────────────────────────────────────────────────────
  {
    slug: "southport-fa-trophy-semi-final",
    title: "Southport FC v Southend United — FA Trophy Semi-Final",
    shortTitle: "FA Trophy Semi-Final",
    description: "Saturday 28 March 2026. Haig Avenue. First semi-final in 28 years. Parking, pubs, getting there, and making a day of it.",
    excerpt:
      "Southport FC host Southend United in the FA Trophy semi-final on Saturday 28 March 2026 — the biggest home game in 28 years. Parking, pubs, how to get to Haig Avenue, and what else to do in Southport if you're making a day of it.",
    category: "events",
    heroImage: "/images/southport-fa-trophy-semifinal-hero.webp",
    seoPriority: 0.92,
    datePublished: "2026-03-08",
    dateUpdated: "2026-03-08",
    tags: ["football", "events", "fa-trophy", "southport-fc", "matchday"],
    status: "published",
    listingFilter: {
      categorySlugs: ["bars-nightlife", "restaurants", "parking", "hotels"],
    },
    metaTitle: "Southport FC v Southend FA Trophy Semi-Final | Matchday Guide",
    metaDescription:
      "Visiting Haig Avenue for the FA Trophy semi-final on 28 March 2026? Parking, pubs near the ground, how to get there by train, and what Southport has to offer if you're making a day of it.",
  },
  {
    slug: "southport-fc-matchday",
    title: "Visiting Haig Avenue — Southport FC Matchday Guide",
    shortTitle: "Matchday at Haig Avenue",
    description: "Everything an away fan needs. Parking, pubs, getting there, the ground itself, and making a day of Southport.",
    excerpt:
      "The complete visitor's guide to Haig Avenue and Southport FC. Postcode, parking, pubs near the ground, how to arrive by train, what the away end is like, and what Southport has to offer before and after the match.",
    category: "events",
    heroImage: "/images/southport-fc-matchday-hero.webp",
    seoPriority: 0.88,
    datePublished: "2026-03-08",
    dateUpdated: "2026-03-08",
    tags: ["football", "events", "southport-fc", "matchday", "haig-avenue"],
    status: "published",
    listingFilter: {
      categorySlugs: ["bars-nightlife", "restaurants", "parking"],
    },
    metaTitle: "Southport FC Matchday Guide | Haig Avenue Parking, Pubs & Getting There",
    metaDescription:
      "Visiting Haig Avenue for a Southport FC match? Postcode PR8 6JZ, street parking tips, pubs near the ground, the nearest train station, what the away end is like, and what to do in Southport on a matchday.",
  },
  {
    slug: "southport-flower-show",
    title: "Southport Flower Show 2026",
    description: "One of England's most prestigious flower shows. 20–23 August 2026 at Victoria Park.",
    excerpt:
      "Southport Flower Show 2026 — 20–23 August, Victoria Park. Tickets from £23, celebrity schedule, what to see, parking, and honest advice on which day to go from someone who's been too many times to count.",
    category: "events",
    heroImage: "/images/southport-flower-show.webp",
    seoPriority: 0.92,
    datePublished: "2026-02-27",
    dateUpdated: "2026-03-19",
    tags: ["flower-show", "events", "august", "tickets", "victoria-park"],
    status: "published",
    listingFilter: {
      categorySlugs: ["hotels", "restaurants", "parking"],
    },
    metaTitle: "Southport Flower Show 2026 | 20–23 August · Tickets, Dates & Complete Guide",
    metaDescription:
      "Southport Flower Show 2026 — 20–23 August at Victoria Park. Tickets from £23 early bird, celebrity schedule, parking, and everything you need. Written by a Southport local.",
  },
  {
    slug: "southport-air-show",
    title: "Southport Air Show 2026",
    description: "Free. 100,000+ visitors. 29–30 August 2026. Southport Beach.",
    excerpt:
      "Southport Air Show 2026 — 29–30 August, Bank Holiday weekend. Free event on Southport Beach. Expected aircraft, best viewing spots, parking table, and day-by-day timeline.",
    category: "events",
    heroImage: "/images/southport-air-show.webp",
    seoPriority: 0.92,
    datePublished: "2026-02-27",
    dateUpdated: "2026-03-19",
    tags: ["air-show", "events", "free", "beach", "summer"],
    status: "published",
    listingFilter: {
      categorySlugs: ["hotels", "restaurants", "cafes", "parking"],
    },
    metaTitle: "Southport Air Show 2026 | 29–30 August · Free Event, Aircraft & Guide",
    metaDescription:
      "Southport Air Show 2026 — 29–30 August, Bank Holiday weekend. Free on Southport Beach. Expected aircraft, best viewing spots, parking table, and a timeline of the day.",
  },

  {
    slug: "southport-fireworks-championship",
    title: "British Musical Fireworks Championship 2026",
    shortTitle: "Fireworks Championship",
    description: "Pyrotechnics choreographed to music. Two nights at Victoria Park. 26–27 September 2026.",
    excerpt:
      "The British Musical Fireworks Championship 2026 — 26–27 September, Victoria Park. Pyrotechnics synchronized to music, a drone show, street food, and bars. Tickets £12. No gate sales.",
    category: "events",
    heroImage: "/images/southport-fireworks-championship.webp",
    seoPriority: 0.88,
    datePublished: "2026-03-19",
    dateUpdated: "2026-03-19",
    tags: ["fireworks", "events", "september", "victoria-park", "tickets"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "parking"] },
    metaTitle: "British Musical Fireworks Championship Southport 2026 | Tickets, Dates & Guide",
    metaDescription:
      "British Musical Fireworks Championship 2026 — 26–27 September, Victoria Park, Southport. Tickets from £12. Pyrotechnics synchronized to music, drone show, and full practical guide.",
  },
  {
    slug: "southport-comedy-festival",
    title: "Southport Comedy Festival 2026",
    shortTitle: "Comedy Festival",
    description: "15th annual comedy festival. 17 nights in a luxury heated marquee at Victoria Park. 2–18 October.",
    excerpt:
      "Southport Comedy Festival 2026 — 2 to 18 October, 15th annual festival. Luxury heated marquee at Victoria Park. Confirmed acts include Henning Wehn, Gary Delaney and more. 6,000+ attend each year.",
    category: "events",
    heroImage: "/images/southport-comedy-festival.webp",
    seoPriority: 0.88,
    datePublished: "2026-03-19",
    dateUpdated: "2026-03-19",
    tags: ["comedy", "events", "october", "victoria-park", "tickets", "entertainment"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "bars-nightlife"] },
    metaTitle: "Southport Comedy Festival 2026 | 2–18 October · Lineup, Tickets & Guide",
    metaDescription:
      "Southport Comedy Festival 2026 — 2 to 18 October in a luxury heated marquee at Victoria Park. 15th annual festival. Henning Wehn, Gary Delaney, and more confirmed. Tickets via southportcomedyfestival.com.",
  },
  {
    slug: "southport-armed-forces-festival",
    title: "Southport Armed Forces Festival 2026",
    shortTitle: "Armed Forces Festival",
    description: "Town-wide military celebration. 27–28 June 2026. Parades, fly-overs, vehicles. Free to attend.",
    excerpt:
      "Southport Armed Forces Festival 2026 — 27–28 June. Free town-wide event across the Promenade, King's Gardens, and The Atkinson. Military parades, fly-overs, Drumhead Service, and live entertainment.",
    category: "events",
    heroImage: "/images/southport-armed-forces-festival.webp",
    seoPriority: 0.85,
    datePublished: "2026-03-19",
    dateUpdated: "2026-03-19",
    tags: ["armed-forces", "events", "june", "free", "military", "promenade"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "parking"] },
    metaTitle: "Southport Armed Forces Festival 2026 | 27–28 June · Free Event Guide",
    metaDescription:
      "Southport Armed Forces Festival 2026 — 27–28 June. Free town-wide event. Military parades, fly-overs, vehicles on display, Drumhead Service. Across the Promenade, King's Gardens, and town centre.",
  },
  {
    slug: "southport-sausage-cider-festival",
    title: "Sausage & Cider Festival Southport 2026",
    shortTitle: "Sausage & Cider Festival",
    description: "Bavarian-style food and drink festival. Victoria Park, 18 April 2026. Bratwurst, cider, oompah bands.",
    excerpt:
      "Sausage & Cider Festival Southport 2026 — Saturday 18 April at Victoria Park. Afternoon and evening sessions. Bratwurst, artisan ciders, live oompah bands, and folk dancers.",
    category: "events",
    heroImage: "/images/southport-sausage-cider-festival.webp",
    seoPriority: 0.82,
    datePublished: "2026-03-19",
    dateUpdated: "2026-03-19",
    tags: ["food-festival", "events", "april", "victoria-park", "tickets", "food-drink"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "bars-nightlife", "parking"] },
    metaTitle: "Sausage & Cider Festival Southport 2026 | 18 April · Tickets & Guide",
    metaDescription:
      "Sausage & Cider Festival Southport 2026 — Saturday 18 April at Victoria Park. Two sessions (afternoon and evening). Bratwurst, artisan ciders, live oompah bands. Tickets required.",
  },
  {
    slug: "southport-beer-week-2026",
    title: "Southport Beer Week 2026",
    shortTitle: "Beer Week 2026",
    description: "18 pubs, 90+ beers, one bank holiday weekend. 20–25 May 2026. The complete visitor guide.",
    excerpt:
      "Southport Beer Week 2026 runs 20–25 May across 18 town-centre pubs and bars. Free to join. 90+ beers. Stamp-card ale trail, Big Top Festival in the same weekend. Here's everything you need to plan the trip.",
    category: "events",
    heroImage: "/images/beer-week.webp",
    seoPriority: 0.9,
    datePublished: "2026-03-26",
    dateUpdated: "2026-03-26",
    tags: ["beer-week", "events", "may", "bars-nightlife", "free", "ale-trail", "bank-holiday"],
    status: "published",
    listingFilter: { categorySlugs: ["bars-nightlife", "restaurants", "hotels", "parking"] },
    metaTitle: "Southport Beer Week 2026 | 20–25 May · Ale Trail, Venues & Complete Guide",
    metaDescription:
      "Southport Beer Week 2026 — 20 to 25 May across 18 pubs and bars. Free ale trail, 90+ beers, Big Top Festival on the same weekend. Getting here from Liverpool, Manchester, Wigan. Parking, hotels, and practical guide.",
  },
  {
    slug: "southport-year-of-culture-2026",
    title: "Southport 2026: Elegantly Eccentric",
    shortTitle: "Year of Culture 2026",
    description: "Southport's year-round cultural programme — Cristal Palace, Big Top Festival, Books Alive! and more.",
    excerpt:
      "Southport 2026: Elegantly Eccentric — a year-round cultural programme backed by Sefton Council and the Liverpool City Region. Cristal Palace on Lord Street (April), Big Top Festival (May), Summer Solstice (June), Books Alive! (October).",
    category: "events",
    heroImage: "/images/southport-year-of-culture-2026.webp",
    seoPriority: 0.90,
    datePublished: "2026-03-19",
    dateUpdated: "2026-03-19",
    tags: ["culture", "events", "2026", "lord-street", "street-theatre", "circus", "free"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "attractions"] },
    metaTitle: "Southport 2026: Elegantly Eccentric | Year of Culture Events Guide",
    metaDescription:
      "Southport's year of culture 2026 — Cristal Palace street theatre on Lord Street (April), Big Top circus festival (May), Summer Solstice (June), Books Alive! (October). Free events across the town.",
  },

  // ── Areas ────────────────────────────────────────────────────────────────
  {
    slug: "birkdale-village",
    title: "Birkdale Village",
    description: "Independent shops, proper restaurants, and decent coffee — the locals' preference.",
    excerpt:
      "Birkdale Village — Southport's independent shopping and dining quarter on Liverpool Road. Two minutes from Royal Birkdale Golf Club. The complete local guide.",
    category: "areas",
    heroImage: "/images/birkdale-village.webp",
    seoPriority: 0.85,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["birkdale", "shopping", "restaurants", "cafes", "golf", "independent"],
    status: "published",
    listingFilter: {
      categorySlugs: ["restaurants", "cafes", "shopping", "bars-nightlife"],
      tags: ["birkdale"],
    },
    metaTitle: "Birkdale Village | Shops, Restaurants, Cafés & Guide",
    metaDescription:
      "Birkdale Village — Southport's independent shopping and dining quarter. The best shops, restaurants, and cafés on Liverpool Road, two minutes from Royal Birkdale Golf Club.",
  },
  {
    slug: "lord-street",
    title: "Lord Street",
    description: "Southport's Victorian boulevard — the street that may have inspired the redesign of Paris.",
    excerpt:
      "Lord Street is a mile-long Victorian boulevard at the heart of Southport — independent boutiques, restaurants, and a Napoleon connection. Your complete guide.",
    category: "areas",
    heroImage: "/images/categories/shopping.webp",
    seoPriority: 0.85,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["lord-street", "shopping", "restaurants", "heritage", "victorian"],
    status: "published",
    metaTitle: "Lord Street Southport | Shops, Restaurants & Guide",
    metaDescription: "Lord Street is Southport's mile-long Victorian boulevard — glass canopies, independent boutiques, restaurants, and a Napoleon III connection. Your complete guide.",
    listingFilter: {
      categorySlugs: ["restaurants", "shopping", "cafes", "bars-nightlife"],
      tags: ["lord-street"],
    },
  },
  {
    slug: "churchtown",
    title: "Churchtown",
    description: "Southport's medieval village — Botanic Gardens, St Cuthbert's church, and local independents.",
    excerpt:
      "Churchtown is the oldest part of Southport — a medieval village within the town. Botanic Gardens celebrating 150 years, St Cuthbert's church, and independent shops most visitors never find.",
    category: "areas",
    heroImage: "/images/categories/attractions.webp",
    seoPriority: 0.82,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["churchtown", "heritage", "gardens", "shopping"],
    status: "published",
    metaTitle: "Churchtown Southport | Botanic Gardens, St Cuthbert's & Guide",
    metaDescription: "Churchtown is Southport's oldest village — Botanic Gardens (free entry), St Cuthbert's Church, Hesketh Park, and the independent shops most visitors never find.",
    listingFilter: {
      categorySlugs: ["restaurants", "cafes", "shopping"],
      tags: ["churchtown"],
    },
  },

  // ── Practical ────────────────────────────────────────────────────────────
  {
    slug: "parking-southport",
    title: "Parking in Southport",
    description: "Where to park near the beach, Lord Street, and the town centre — prices and tips.",
    excerpt:
      "The complete parking guide for Southport — car parks near the beach, Lord Street, and the town centre. Prices, blue badge bays, and which ones fill first on a summer Saturday.",
    category: "practical",
    heroImage: "/images/categories/transport.webp",
    seoPriority: 0.85,
    datePublished: "2026-02-27",
    dateUpdated: "2026-03-05",
    tags: ["parking", "practical", "car"],
    status: "published",
    listingFilter: {
      categorySlugs: ["parking"],
    },
    metaTitle: "Parking in Southport | Car Parks, Prices, Free Options & Postcodes",
    metaDescription: "Where to park in Southport — car parks near the beach, Lord Street, and town centre. Prices, postcodes, free options, blue badge bays, and which ones fill up first on a summer Saturday.",
  },
  {
    slug: "free-parking-southport",
    title: "Free Parking in Southport",
    description: "Every free and low-cost parking option in Southport — with postcodes and walking times.",
    excerpt:
      "Free parking in Southport does exist. Here is where to find it — every free car park, free on-street area, and low-cost option across the town, with postcodes and honest walking times to the main destinations.",
    category: "practical",
    heroImage: "/images/categories/parking.webp",
    seoPriority: 0.85,
    datePublished: "2026-03-05",
    dateUpdated: "2026-03-05",
    tags: ["parking", "practical", "free", "car"],
    status: "published",
    listingFilter: {
      categorySlugs: ["parking"],
      tags: ["free-parking"],
    },
    metaTitle: "Free Parking in Southport | Every Free Option With Postcodes",
    metaDescription: "Free parking in Southport: every free car park, free on-street area, and low-cost option across the town. Postcodes, walking times, and honest tips from a local.",
  },
  {
    slug: "rainy-day-southport",
    title: "Rainy Day Southport",
    description: "Indoor options, covered attractions, and what to do when Lancashire does its thing.",
    excerpt:
      "Lancashire weather is what it is. Splash World, The Atkinson, Southport Market, Wayfarers Arcade — everything worth doing in Southport when it's raining.",
    category: "practical",
    heroImage: "/images/categories/activities.webp",
    seoPriority: 0.82,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["indoor", "rainy-day", "practical", "families"],
    status: "published",
    metaTitle: "Rainy Day Southport | Indoor Things to Do",
    metaDescription: "What to do in Southport when it rains — Splash World, The Atkinson, Southport Market, Wayfarers Arcade, and everything else worth knowing for a wet day.",
    listingFilter: {
      categorySlugs: ["attractions", "cafes", "activities"],
    },
  },
  {
    slug: "dog-friendly-southport",
    title: "Dog-Friendly Southport",
    description: "Dog-welcoming beaches, pubs, cafés, and walks — the guide for dogs and their people.",
    excerpt:
      "Southport is genuinely dog-friendly — most of the beach, most of the Promenade, and a good number of pubs and cafés that mean it. The complete guide.",
    category: "practical",
    heroImage: "/images/southport-beach.webp",
    seoPriority: 0.82,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["dog-friendly", "practical", "beach", "pubs", "walks"],
    status: "published",
    metaTitle: "Dog-Friendly Southport | Beach Rules, Walks, Pubs & Cafés",
    metaDescription: "Southport is genuinely dog-friendly. Beach access rules, best off-lead walks, dog-welcoming pubs and cafés — the complete guide for dogs and their people.",
    listingFilter: {
      categorySlugs: ["bars-nightlife", "cafes", "restaurants"],
    },
  },

  // ── Food & Drink ─────────────────────────────────────────────────────────
  {
    slug: "best-restaurants-southport",
    title: "Best Restaurants in Southport",
    description: "The honest ranking — from Lord Street fine dining to hidden neighbourhood gems.",
    excerpt:
      "The best restaurants in Southport right now — Terry's honest ranking. Lord Street, Birkdale village, and the places most visitors never find.",
    category: "food-drink",
    heroImage: "/images/categories/restaurants.webp",
    seoPriority: 0.88,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["restaurants", "food", "dining"],
    status: "published",
    metaTitle: "Best Restaurants in Southport 2026 | Honest Local Guide",
    metaDescription: "The best restaurants in Southport — Terry's honest guide. Lord Street, Birkdale Village, and the places most visitors never find. No sponsored results.",
    listingFilter: {
      categorySlugs: ["restaurants"],
    },
  },
  {
    slug: "southport-eateries",
    title: "Southport Eateries",
    description: "Where to eat in Southport — every option from a quick lunch to a proper occasion, by area and cuisine.",
    excerpt:
      "Southport eateries guide — where to eat by area, by occasion, and by budget. Lord Street, Birkdale Village, Churchtown, and the seafront. Named places, honest opinions.",
    category: "food-drink",
    heroImage: "/images/categories/restaurants.webp",
    seoPriority: 0.90,
    datePublished: "2026-03-05",
    dateUpdated: "2026-03-05",
    tags: ["restaurants", "food", "dining", "eateries"],
    status: "published",
    metaTitle: "Southport Eateries | Where to Eat in Southport | Complete Local Guide",
    metaDescription: "The complete guide to Southport eateries — where to eat by area, occasion, and budget. Lord Street, Birkdale Village, Churchtown, and the seafront. Written by a local.",
    listingFilter: {
      categorySlugs: ["restaurants", "cafes", "bars-nightlife"],
    },
  },
  {
    slug: "best-cafes-southport",
    title: "Best Cafés in Southport",
    description: "Independent coffee shops and proper tea rooms — where locals actually go.",
    excerpt:
      "The best cafés and coffee shops in Southport — independent places with proper espresso machines and food worth eating. Terry's unfiltered guide.",
    category: "food-drink",
    heroImage: "/images/categories/cafes.webp",
    seoPriority: 0.85,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["cafes", "coffee", "food"],
    status: "published",
    metaTitle: "Best Cafés in Southport 2026 | Independent Coffee Shops",
    metaDescription: "The best cafés and coffee shops in Southport — independent places with proper espresso machines and food worth ordering. Terry's unfiltered local guide.",
    listingFilter: {
      categorySlugs: ["cafes"],
    },
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────

/** Get a single guide by slug. Throws if not found. */
export function getGuide(slug: string): Guide {
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Guide not found: ${slug}`);
  return guide;
}

/** Get all published guides. */
export function getPublishedGuides(): Guide[] {
  return GUIDES.filter((g) => g.status === "published");
}

/** Get guides in a category. */
export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return GUIDES.filter((g) => g.category === category);
}

/**
 * Get related guides for a given guide.
 * Returns up to `limit` guides that share tags or category, excluding self.
 */
export function getRelatedGuides(slug: string, limit = 4): Guide[] {
  const current = GUIDES.find((g) => g.slug === slug);
  if (!current) return [];

  const scored = GUIDES.filter((g) => g.slug !== slug && g.status === "published").map((g) => {
    let score = 0;
    if (g.category === current.category) score += 2;
    const sharedTags = g.tags.filter((t) => current.tags.includes(t));
    score += sharedTags.length;
    return { guide: g, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.guide);
}
