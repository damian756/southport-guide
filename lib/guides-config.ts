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

export const GUIDE_CATEGORIES: Record<GuideCategory, { label: string; description: string }> = {
  "beaches-coast": {
    label: "Beaches & Coast",
    description: "The 22-mile Sefton Coast — from Southport Beach to Crosby.",
  },
  events: {
    label: "Events",
    description: "Major annual events — The Open, Air Show, Flower Show, and more.",
  },
  areas: {
    label: "Areas",
    description: "The neighbourhoods and districts that make up Southport.",
  },
  practical: {
    label: "Practical",
    description: "Parking, transport, rainy days, and dog-friendly — the useful stuff.",
  },
  "food-drink": {
    label: "Food & Drink",
    description: "Where to eat, drink, and brunch in Southport.",
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
    metaTitle: "Southport Beach | Postcode, Parking, Dogs & What to Expect | SouthportGuide",
    metaDescription:
      "Southport Beach guide — postcode PR8 1RX, parking on Marine Drive, dog rules, tides, facilities, and honest advice on what to expect. Written by a Southport local.",
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
    slug: "southport-flower-show",
    title: "Southport Flower Show 2026",
    description: "One of England's most prestigious flower shows. Victoria Park, August 2026.",
    excerpt:
      "Southport Flower Show 2026 — Victoria Park, August 2026. Tickets, what to see, parking, and advice on which day to go from someone who's been too many times to count.",
    category: "events",
    heroImage: "/images/southport-flower-show.webp",
    seoPriority: 0.88,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["flower-show", "events", "august", "tickets", "victoria-park"],
    status: "published",
    listingFilter: {
      categorySlugs: ["hotels", "restaurants"],
      tags: ["flower-show"],
    },
    metaTitle: "Southport Flower Show 2026 | Tickets, Dates, Parking & What to Expect",
    metaDescription:
      "Southport Flower Show 2026 — Victoria Park, August 2026. Tickets, what to see, parking, getting there, and advice from someone who has been more times than he'd like to admit.",
  },
  {
    slug: "southport-air-show",
    title: "Southport Air Show 2026",
    description: "Free. 100,000+ visitors. Southport Beach. One of the UK's best air shows.",
    excerpt:
      "Southport Air Show 2026 — free event on Southport Beach. Dates, best viewing spots, parking advice (come by train), and how to make the most of one of the UK's best free air shows.",
    category: "events",
    heroImage: "/images/southport-air-show.webp",
    seoPriority: 0.88,
    datePublished: "2026-02-27",
    dateUpdated: "2026-02-27",
    tags: ["air-show", "events", "free", "beach", "summer"],
    status: "published",
    listingFilter: {
      categorySlugs: ["hotels", "restaurants", "cafes"],
      tags: ["air-show", "seafront"],
    },
    metaTitle: "Southport Air Show 2026 | Free Event, Dates, Best Viewing Spots & Guide",
    metaDescription:
      "Southport Air Show 2026 — free event on Southport Beach. Dates, best viewing spots, parking, and how to make the most of one of the UK's best air shows. Over 100,000 visitors.",
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
    metaTitle: "Birkdale Village | Shops, Restaurants, Cafés & Guide | SouthportGuide",
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
    metaTitle: "Lord Street Southport | Shops, Restaurants & Guide | SouthportGuide",
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
    metaTitle: "Churchtown Southport | Botanic Gardens, St Cuthbert's & Guide | SouthportGuide",
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
    dateUpdated: "2026-02-27",
    tags: ["parking", "practical", "car"],
    status: "published",
    metaTitle: "Parking in Southport | Car Parks, Prices & Tips | SouthportGuide",
    metaDescription: "Where to park in Southport — car parks near the beach, Lord Street, and the town centre. Prices, postcode, blue badge bays, and which ones fill first on a summer Saturday.",
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
    metaTitle: "Rainy Day Southport | Indoor Things to Do | SouthportGuide",
    metaDescription: "What to do in Southport when it rains — Splash World, The Atkinson, Southport Market, Wayfarers Arcade, and everything else worth knowing for a wet day.",
    listingFilter: {
      categorySlugs: ["attractions", "cafes", "activities"],
      tags: ["indoor", "all-weather"],
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
    metaTitle: "Dog-Friendly Southport | Beach Rules, Walks, Pubs & Cafés | SouthportGuide",
    metaDescription: "Southport is genuinely dog-friendly. Beach access rules, best off-lead walks, dog-welcoming pubs and cafés — the complete guide for dogs and their people.",
    listingFilter: {
      categorySlugs: ["bars-nightlife", "cafes", "restaurants"],
      tags: ["dog-friendly"],
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
    metaTitle: "Best Restaurants in Southport 2026 | Honest Local Guide | SouthportGuide",
    metaDescription: "The best restaurants in Southport — Terry's honest guide. Lord Street, Birkdale Village, and the places most visitors never find. No sponsored results.",
    listingFilter: {
      categorySlugs: ["restaurants"],
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
    metaTitle: "Best Cafés in Southport 2026 | Independent Coffee Shops | SouthportGuide",
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
