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
  /** ISO date (YYYY-MM-DD) for event guides — enables chronological sorting in nav and homepage */
  eventDate?: string;
  /** Explicit related guide slugs — overrides the automatic tag/category scoring when present */
  relatedSlugs?: string[];
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
      "Southport Beach guide — parking postcode PR8 1RQ (Marine Drive), dog rules, tides, facilities, and honest advice on what to expect. Written by a Southport local.",
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
    metaTitle: "Southport Beach Guide | Parking PR8 1RQ, Dogs, Tide Times & Tips",
    metaDescription:
      "Southport Beach — parking postcode PR8 1RQ (Marine Drive), dogs welcome year-round, tide times, facilities and honest local advice. One of England's widest beaches.",
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
    eventDate: "2026-03-28",
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
    eventDate: "2026-08-20",
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
    eventDate: "2026-08-29",
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
    eventDate: "2026-09-26",
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
    eventDate: "2026-10-02",
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
    eventDate: "2026-06-27",
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
    eventDate: "2026-04-18",
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
    eventDate: "2026-05-20",
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

  // ── New 2026 Event Guides ─────────────────────────────────────────────────
  {
    slug: "cristal-palace-southport-2026",
    title: "Cristal Palace Southport 2026",
    shortTitle: "Cristal Palace",
    description: "A 12-metre chandelier suspended above the crowd. Free street theatre on Lord Street. 3–4 April 2026.",
    excerpt:
      "Cristal Palace 2026 — free aerial street theatre by French company Transe Express. A 12-metre chandelier, 36 local performers, and a 90-minute spectacle above Town Hall Gardens on Lord Street. 3–4 April, 7:30pm.",
    category: "events",
    heroImage: "/images/guides/cristal-palace-southport-2026.jpg",
    seoPriority: 0.90,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-03",
    tags: ["street-theatre", "events", "april", "free", "lord-street", "arts-culture"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "bars-nightlife", "parking"] },
    metaTitle: "Cristal Palace Southport 2026 | 3–4 April · Free Street Theatre Guide",
    metaDescription:
      "Cristal Palace Southport 2026 — free aerial spectacle by Transe Express. 12-metre chandelier, 36 performers, Town Hall Gardens, Lord Street. 3–4 April, 7:30pm. Parking, where to stand, and what to expect.",
  },
  {
    slug: "easter-in-southport-2026",
    title: "Easter in Southport 2026",
    shortTitle: "Easter Events",
    description: "All the Easter events in one place — egg hunts, craft workshops, panto, Cristal Palace, and more. 1–6 April 2026.",
    excerpt:
      "Easter in Southport 2026 — everything happening across the Easter school holidays. Cristal Palace street theatre, Wayfarers Arcade egg hunt, Make It! craft workshops at The Atkinson, Easter Panto, and family raves. By day.",
    category: "events",
    heroImage: "/images/guides/easter-in-southport-2026.jpg",
    seoPriority: 0.85,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-01",
    tags: ["easter", "events", "april", "families", "kids", "free"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "cafes", "activities", "attractions"] },
    metaTitle: "Easter in Southport 2026 | Easter Events, Egg Hunts & Family Activities",
    metaDescription:
      "Easter in Southport 2026 — every family event across the Easter holidays. Cristal Palace free street theatre, Wayfarers egg hunt, craft workshops, Easter panto, and more. What's on each day.",
  },
  {
    slug: "southport-artisan-market",
    title: "Southport Artisan Market",
    shortTitle: "Artisan Market",
    description: "50+ independent makers at Southport Market. Monthly. Free entry. PR8 1EF.",
    excerpt:
      "Southport Artisan Market — 50+ independent makers, artists, and food producers at Southport Market on Market Street. Monthly event, free entry. Handmade gifts, street food, and proper independent browsing.",
    category: "events",
    heroImage: "/images/guides/southport-artisan-market.jpg",
    seoPriority: 0.80,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    tags: ["artisan-market", "shopping", "monthly", "free", "southport-market", "food"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "cafes", "shopping"] },
    metaTitle: "Southport Artisan Market | Monthly Market Guide | Dates, Location & What to Expect",
    metaDescription:
      "Southport Artisan Market at Southport Market (PR8 1EF) — 50+ independent makers, artists, and food producers. Monthly event, free entry. Parking, what to expect, and where to eat after.",
  },
  {
    slug: "kc-artisan-party-in-the-park-southport-2026",
    title: "KC Artisan Party in the Park Southport 2026",
    shortTitle: "Party in the Park",
    description: "Live music, artisan stalls, street food, and kids entertainment at Victoria Park. 11–12 April 2026. Free.",
    excerpt:
      "KC Artisan Party in the Park 2026 — two days of live music, artisan market stalls, street food, and family entertainment at Victoria Park, Southport. 11–12 April. Free entry.",
    category: "events",
    heroImage: "/images/guides/kc-artisan-party-in-the-park-southport-2026.jpg",
    seoPriority: 0.78,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-11",
    tags: ["artisan-market", "events", "april", "free", "victoria-park", "live-music", "families"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "parking"] },
    metaTitle: "KC Artisan Party in the Park Southport 2026 | 11–12 April · Free Event Guide",
    metaDescription:
      "KC Artisan Party in the Park Southport 2026 — two days at Victoria Park. Live music, artisan stalls, street food, and kids entertainment. 11–12 April. Free entry. Parking, getting there, and what to expect.",
  },
  {
    slug: "comedy-pub-crawl-southport-2026",
    title: "Comedy Pub Crawl Southport 2026",
    shortTitle: "Comedy Pub Crawl",
    description: "Live comedy across multiple Southport pubs in one night. 22 April 2026. Tickets required.",
    excerpt:
      "Southport Comedy Pub Crawl 2026 — live stand-up comedy at multiple venues across town in a single evening. 22 April 2026. Mystery route revealed on the night. Tickets required.",
    category: "events",
    heroImage: "/images/guides/comedy-pub-crawl-southport-2026.jpg",
    seoPriority: 0.78,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-22",
    tags: ["comedy", "events", "april", "pubs", "nightlife", "tickets"],
    status: "published",
    listingFilter: { categorySlugs: ["bars-nightlife", "restaurants"] },
    metaTitle: "Comedy Pub Crawl Southport 2026 | 22 April · Tickets & Complete Guide",
    metaDescription:
      "Southport Comedy Pub Crawl 2026 — live comedy across multiple venues, 22 April. Mystery route, tickets required. Which pubs are typically included, where to eat beforehand, and how to get home.",
  },
  {
    slug: "whistle-down-the-wind-southport-2026",
    title: "Whistle Down the Wind at The Atkinson",
    shortTitle: "Whistle Down the Wind",
    description: "Andrew Lloyd Webber's musical at The Atkinson, Lord Street. 9–11 April 2026.",
    excerpt:
      "Whistle Down the Wind at The Atkinson Southport — Andrew Lloyd Webber's powerful musical performed by SONG Productions. 9–11 April 2026. Lord Street, PR8 1DB. Booking essential.",
    category: "events",
    heroImage: "/images/guides/whistle-down-the-wind-southport-2026.jpg",
    seoPriority: 0.75,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-09",
    tags: ["theatre", "events", "april", "atkinson", "musical", "tickets"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "parking"] },
    metaTitle: "Whistle Down the Wind Southport 2026 | The Atkinson 9–11 April · Guide",
    metaDescription:
      "Whistle Down the Wind at The Atkinson Southport 2026 — Andrew Lloyd Webber musical by SONG Productions. 9–11 April, Lord Street PR8 1DB. Tickets, parking, where to eat before the show.",
  },
  {
    slug: "39-steps-southport-2026",
    title: "The 39 Steps at Southport Little Theatre",
    shortTitle: "The 39 Steps",
    description: "Southport Dramatic Club's production of the spy thriller. 10–18 April 2026. Little Theatre, PR9 0SX.",
    excerpt:
      "The 39 Steps at Southport Little Theatre — Southport Dramatic Club's production of John Buchan's spy thriller. 10–18 April 2026, nine-night run. Little Theatre, Hoghton Street, PR9 0SX.",
    category: "events",
    heroImage: "/images/guides/39-steps-southport-2026.jpg",
    seoPriority: 0.72,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-10",
    tags: ["theatre", "events", "april", "little-theatre", "drama", "tickets"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "bars-nightlife"] },
    metaTitle: "The 39 Steps Southport 2026 | Little Theatre 10–18 April · Tickets & Guide",
    metaDescription:
      "The 39 Steps at Southport Little Theatre — Southport Dramatic Club, 10–18 April 2026. Hoghton Street, PR9 0SX. Tickets, parking nearby, and where to eat before the show.",
  },
  {
    slug: "the-atkinson-southport",
    title: "The Atkinson Southport",
    shortTitle: "The Atkinson",
    description: "Gallery, theatre, café, and library on Lord Street. The cultural heart of Southport. PR8 1DB.",
    excerpt:
      "The Atkinson on Lord Street is Southport's main arts and cultural centre — a gallery, theatre, café, and library in a Victorian building in the middle of town. Free gallery entry. The full guide.",
    category: "events",
    heroImage: "/images/guides/the-atkinson-southport.jpg",
    seoPriority: 0.88,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    tags: ["atkinson", "gallery", "theatre", "free", "lord-street", "arts-culture", "rainy-day"],
    status: "published",
    listingFilter: { categorySlugs: ["cafes", "restaurants", "parking"] },
    metaTitle: "The Atkinson Southport | Gallery, Theatre & Café on Lord Street | Complete Guide",
    metaDescription:
      "The Atkinson on Lord Street, Southport (PR8 1DB) — gallery, theatre, café, and library. Free gallery entry. What's on, what to see, parking, and the café. The complete guide.",
  },
  {
    slug: "southport-bijou-cinema",
    title: "Southport Bijou Cinema",
    shortTitle: "Bijou Cinema",
    description: "Southport's independent community cinema. Weekly screenings, Screen Club, and live music. Post Office Avenue.",
    excerpt:
      "The Bijou Cinema on Post Office Avenue is Southport's independent community cinema — weekly Tuesday screenings, a monthly film school (Screen Club), and live gig nights in a proper old-school venue. The complete guide.",
    category: "events",
    heroImage: "/images/guides/southport-bijou-cinema.jpg",
    seoPriority: 0.82,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    tags: ["cinema", "film", "independent", "live-music", "arts-culture"],
    status: "published",
    listingFilter: { categorySlugs: ["bars-nightlife", "restaurants"] },
    metaTitle: "Southport Bijou Cinema | Independent Cinema Guide | Screen Club & What's On",
    metaDescription:
      "Southport Bijou Cinema on Post Office Avenue (PR9 0AG) — independent community cinema. Weekly screenings, Screen Club film school, live gig nights. How to book, what's on, and parking.",
  },
  {
    slug: "live-music-southport",
    title: "Live Music in Southport",
    shortTitle: "Live Music",
    description: "Where to find live music in Southport — every venue, every night of the week.",
    excerpt:
      "Live music in Southport happens every weekend and most weeknights — jazz at Coopers, acoustic at The Auld Dubliner, rock at the ChopHouse, and open mic nights across town. The complete venue-by-venue guide.",
    category: "events",
    heroImage: "/images/guides/live-music-southport.jpg",
    seoPriority: 0.85,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    tags: ["live-music", "music", "pubs", "bars-nightlife", "entertainment"],
    status: "published",
    listingFilter: { categorySlugs: ["bars-nightlife", "restaurants"] },
    metaTitle: "Live Music in Southport | Every Venue & Night Guide 2026",
    metaDescription:
      "Live music in Southport — every venue doing regular live music. Jazz, rock, acoustic, open mic. Which nights, which venues, what to expect. Written by a local who's been to most of them.",
  },
  {
    slug: "big-top-festival-southport-2026",
    title: "Big Top Festival Southport 2026",
    shortTitle: "Big Top Festival",
    description: "Circus arts festival in Southport town centre. Circa and Gandini Juggling. 2–3 May 2026. Free outdoor events.",
    excerpt:
      "Big Top Festival Southport 2026 — two days of world-class circus and street arts in the town centre. Circa and Gandini Juggling performing at Southport's main cultural festival of the spring. 2–3 May. Mix of free outdoor and ticketed indoor shows.",
    category: "events",
    heroImage: "/images/guides/big-top-festival-southport-2026.jpg",
    seoPriority: 0.82,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-05-02",
    tags: ["circus", "events", "may", "free", "street-arts", "entertainment"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "parking"] },
    metaTitle: "Big Top Festival Southport 2026 | 2–3 May · Circus Arts & Complete Guide",
    metaDescription:
      "Big Top Festival Southport 2026 — 2–3 May in the town centre. Circa, Gandini Juggling, and world-class circus arts. Free outdoor events and ticketed shows. Parking, hotels, and what to expect.",
  },
  {
    slug: "southport-food-drink-festival-2026",
    title: "Southport Food and Drink Festival 2026",
    shortTitle: "Food & Drink Festival",
    description: "Bank Holiday weekend food festival in the town centre. 29–31 May 2026. Free entry. 100+ traders.",
    excerpt:
      "Southport Food and Drink Festival 2026 — three days across the Bank Holiday weekend, 29–31 May. Free entry, 100+ food and drink traders, live entertainment, and the town centre buzzing. The complete visitor guide.",
    category: "events",
    heroImage: "/images/guides/southport-food-drink-festival-2026.jpg",
    seoPriority: 0.82,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-05-29",
    tags: ["food-festival", "events", "may", "free", "bank-holiday", "food-drink"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "parking"] },
    metaTitle: "Southport Food and Drink Festival 2026 | 29–31 May · Bank Holiday Weekend Guide",
    metaDescription:
      "Southport Food and Drink Festival 2026 — 29–31 May, Bank Holiday weekend. Free entry, 100+ traders, live entertainment. Parking, hotels, and what to expect from one of the town's biggest weekends.",
  },
  {
    slug: "summer-solstice-southport-2026",
    title: "Summer Solstice Festival Southport 2026",
    shortTitle: "Summer Solstice",
    description: "8-hour dance and music event at Victoria Park. 20 June 2026. 2pm–10pm. Ticketed.",
    excerpt:
      "Summer Solstice Festival Southport 2026 — an 8-hour outdoor dance and music event at Victoria Park on the longest day. 20 June, 2pm to 10pm. Ticketed VIP event as part of the Southport 2026: Elegantly Eccentric cultural programme.",
    category: "events",
    heroImage: "/images/guides/summer-solstice-southport-2026.jpg",
    seoPriority: 0.78,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-06-20",
    tags: ["summer", "events", "june", "music", "victoria-park", "tickets", "dance"],
    status: "published",
    listingFilter: { categorySlugs: ["hotels", "restaurants", "parking"] },
    metaTitle: "Summer Solstice Festival Southport 2026 | 20 June · Victoria Park · Tickets & Guide",
    metaDescription:
      "Summer Solstice Festival Southport 2026 — 20 June, 2pm to 10pm at Victoria Park. 8-hour dance and music event. Tickets, parking, where to eat, and what to expect.",
  },
  {
    slug: "sefton-open-2026",
    title: "Sefton Open 2026",
    shortTitle: "Sefton Open",
    description: "Annual open art exhibition at The Atkinson. Painting, sculpture, print, and mixed media. 2 April – 13 June 2026.",
    excerpt:
      "Sefton Open 2026 at The Atkinson on Lord Street — the annual open art exhibition showcasing work from local and regional artists. Painting, sculpture, print, and mixed media. 2 April to 13 June. Free to visit.",
    category: "events",
    heroImage: "/images/guides/sefton-open-2026.jpg",
    seoPriority: 0.75,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-04-02",
    tags: ["art", "exhibition", "events", "april", "atkinson", "free", "arts-culture"],
    status: "published",
    listingFilter: { categorySlugs: ["cafes", "restaurants"] },
    metaTitle: "Sefton Open 2026 | The Atkinson · 2 April–13 June · Free Art Exhibition",
    metaDescription:
      "Sefton Open 2026 at The Atkinson, Lord Street, Southport — annual open art exhibition. Painting, sculpture, print, mixed media. 2 April to 13 June. Free entry. Opening times and visitor info.",
  },
  {
    slug: "books-alive-southport-2026",
    title: "Books Alive! Literature Festival Southport 2026",
    shortTitle: "Books Alive!",
    description: "Half-term family literature festival across Southport. Storytelling, author events, workshops. 24–31 October 2026.",
    excerpt:
      "Books Alive! Southport 2026 — a week-long family literature festival running over October half-term. Storytelling installations, author performances, and workshops at venues across the town. 24–31 October. Free events.",
    category: "events",
    heroImage: "/images/guides/books-alive-southport-2026.jpg",
    seoPriority: 0.78,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    eventDate: "2026-10-24",
    tags: ["books", "literature", "events", "october", "half-term", "families", "free"],
    status: "published",
    listingFilter: { categorySlugs: ["restaurants", "cafes", "activities"] },
    metaTitle: "Books Alive! Literature Festival Southport 2026 | 24–31 October · Family Guide",
    metaDescription:
      "Books Alive! Southport 2026 — family literature festival over October half-term. Storytelling, author events, workshops. 24–31 October, venues across town. Free events. What to expect and how to get there.",
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
    slug: "southport-market",
    title: "Southport Market",
    shortTitle: "Southport Market",
    description: "Nine traders, one bar, and the best food hall on the Sefton Coast. The complete local guide.",
    excerpt:
      "Southport Market — the complete guide. Every trader reviewed, opening times, what to order, the sensory-friendly picture, parking, and the history. King Street, PR8 1LA.",
    category: "food-drink",
    heroImage: "/images/southport-market/exterior/entrance-main-signage.webp",
    seoPriority: 0.92,
    datePublished: "2026-04-02",
    dateUpdated: "2026-04-02",
    tags: ["southport-market", "food", "food-hall", "restaurants", "family-friendly", "dog-friendly", "sensory-friendly", "events"],
    status: "published",
    relatedSlugs: [
      "southport-artisan-market",
      "easter-in-southport-2026",
      "live-music-southport",
      "autism-friendly-southport",
    ],
    metaTitle: "Southport Market Guide | Every Trader, Menu, Parking & Tips (2026)",
    metaDescription:
      "Southport Market on King Street (PR8 1LA) — every trader reviewed, what to order, opening times, parking, accessibility, and the honest picture. Written by a Southport local.",
  },
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

  // ── Practical: Sunflower membership ─────────────────────────────────────
  {
    slug: "southportguide-sunflower-member",
    title: "SouthportGuide Joins the Hidden Disabilities Sunflower Scheme",
    shortTitle: "Sunflower Member",
    description: "SouthportGuide is now a member of the Hidden Disabilities Sunflower scheme. What it means for visitors and our plans for accessible Southport.",
    excerpt:
      "SouthportGuide has joined the Hidden Disabilities Sunflower scheme. Our commitment to accessible content, sensory-friendly events, and why it matters — written by a Southport local with a 17-year-old autistic son.",
    category: "practical",
    heroImage: "/images/sunflower/PROUD-To-SUPPORT-UK_2.webp",
    seoPriority: 0.85,
    datePublished: "2026-04-02",
    dateUpdated: "2026-04-02",
    tags: ["accessibility", "hidden-disabilities", "sunflower", "autism", "sensory-friendly"],
    status: "published",
    relatedSlugs: ["autism-friendly-southport", "southport-market", "southport-artisan-market"],
    metaTitle: "SouthportGuide Joins the Hidden Disabilities Sunflower Scheme",
    metaDescription:
      "SouthportGuide is now a proud supporter of the Hidden Disabilities Sunflower scheme. Our commitment to accessible Southport, sensory-friendly events, and helping visitors with hidden disabilities.",
  },

  // ── Practical: Autism and sensory ────────────────────────────────────────
  {
    slug: "autism-friendly-southport",
    title: "Autism Friendly Southport",
    shortTitle: "Autism Friendly",
    description: "Sensory-friendly venues, quiet beaches, and honest advice for autistic visitors and their families planning a trip to Southport.",
    excerpt:
      "Autism friendly Southport — a practical guide for autistic visitors and families. Quiet beaches, calm venues, which events to avoid, parking close to entrances, and the honest picture of what works and what does not.",
    category: "practical",
    heroImage: "/images/autism-logo.png",
    seoPriority: 0.92,
    datePublished: "2026-03-31",
    dateUpdated: "2026-03-31",
    tags: ["autism", "sensory-friendly", "accessibility", "family-friendly"],
    status: "published",
    metaTitle: "Autism Friendly Southport | Sensory-Friendly Guide for Visitors",
    metaDescription:
      "Autism friendly Southport — quiet beaches, calm venues, sensory-friendly days out, and honest advice about which events to avoid. A practical guide for autistic visitors and their families.",
    listingFilter: {
      tags: ["sensory-friendly"],
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

  // If explicit slugs are specified, use them in order
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    return current.relatedSlugs
      .slice(0, limit)
      .map((s) => GUIDES.find((g) => g.slug === s && g.status === "published"))
      .filter((g): g is Guide => g !== undefined);
  }

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
