// ── Shared site data ──────────────────────────────────────────────────────
// Events and blog posts are defined here so they can be imported by
// the homepage, the events page, and the blog page without duplication.

export interface SouthportEvent {
  title: string;
  /** ISO date string (YYYY-MM-DD) used for sorting / filtering */
  isoDate: string;
  /** Human-readable date label shown on cards */
  dayLabel: string;
  venue: string;
  category: string;
  emoji: string;
  free: boolean;
  link: string;
}

export const EVENTS: SouthportEvent[] = [
  {
    title: "Mark Watson: Live Comedy",
    isoDate: "2026-02-20",
    dayLabel: "Fri 20 Feb",
    venue: "The Atkinson",
    category: "Comedy",
    emoji: "🎭",
    free: false,
    link: "https://theatkinson.co.uk/events/mark-watson/",
  },
  {
    title: "Las Vegas Charity Night",
    isoDate: "2026-02-21",
    dayLabel: "Sat 21 Feb",
    venue: "The Grand",
    category: "Entertainment",
    emoji: "🎉",
    free: false,
    link: "https://www.thegrand.co.uk/events/las-vegas-charity-night/",
  },
  {
    title: "Comedy Pub Crawl",
    isoDate: "2026-02-25",
    dayLabel: "Wed 25 Feb",
    venue: "Multiple Venues",
    category: "Comedy",
    emoji: "🎭",
    free: false,
    link: "https://theatkinson.co.uk/events/mark-watson/",
  },
  {
    title: "Chess The Musical",
    isoDate: "2026-02-25",
    dayLabel: "25–28 Feb",
    venue: "Little Theatre",
    category: "Theatre",
    emoji: "🎶",
    free: false,
    link: "https://littletheatresouthport.co.uk/",
  },
  {
    title: "International Women's Day",
    isoDate: "2026-03-06",
    dayLabel: "Fri 6 Mar",
    venue: "The Grand",
    category: "Community",
    emoji: "🌸",
    free: false,
    link: "https://www.queenscourt.org.uk/",
  },
  {
    title: "St Patrick's Day Beer Festival",
    isoDate: "2026-03-21",
    dayLabel: "Sat 21 Mar",
    venue: "Victoria Park",
    category: "Festival",
    emoji: "🍺",
    free: false,
    link: "https://www.southportoktoberfest.com/",
  },
  {
    title: "Cristal Palace — Street Theatre",
    isoDate: "2026-04-03",
    dayLabel: "3–4 Apr",
    venue: "Lord Street",
    category: "Street Arts",
    emoji: "🎪",
    free: true,
    link: "https://www.southport2026.com/",
  },
  {
    title: "Sausage & Cider Festival",
    isoDate: "2026-04-18",
    dayLabel: "Sat 18 Apr",
    venue: "Victoria Park",
    category: "Festival",
    emoji: "🌭",
    free: false,
    link: "https://www.southportoktoberfest.com/",
  },
  {
    title: "Red Squirrel 10k",
    isoDate: "2026-04-19",
    dayLabel: "Sun 19 Apr",
    venue: "Formby",
    category: "Sport",
    emoji: "🏃",
    free: false,
    link: "https://www.facebook.com/Southportstrollers",
  },
  {
    title: "Big Top Festival",
    isoDate: "2026-05-02",
    dayLabel: "2–3 May",
    venue: "Town Centre",
    category: "Circus & Arts",
    emoji: "🎪",
    free: true,
    link: "https://www.southport2026.com/",
  },
  {
    title: "Lancashire County Cricket",
    isoDate: "2026-05-15",
    dayLabel: "15–18 May",
    venue: "S&B Sports Club",
    category: "Sport",
    emoji: "🏏",
    free: false,
    link: "https://www.sandbsportsclub.co.uk/",
  },
  {
    title: "Southport Beer Week",
    isoDate: "2026-05-20",
    dayLabel: "20–25 May",
    venue: "Town Centre",
    category: "Food & Drink",
    emoji: "🍺",
    free: true,
    link: "https://www.yoursouthport.com/",
  },
  {
    title: "Food & Drink Festival",
    isoDate: "2026-05-29",
    dayLabel: "29–31 May",
    venue: "Town Centre",
    category: "Food & Drink",
    emoji: "🍽️",
    free: true,
    link: "https://www.visitsouthport.com/",
  },
  {
    title: "Summer Solstice Festival",
    isoDate: "2026-06-20",
    dayLabel: "Sat 20 Jun",
    venue: "Victoria Park",
    category: "Music",
    emoji: "🎶",
    free: false,
    link: "https://www.indemandradio.com/liverpool",
  },
  {
    title: "Armed Forces Festival",
    isoDate: "2026-06-27",
    dayLabel: "27–28 Jun",
    venue: "Town Centre",
    category: "Community",
    emoji: "🎖️",
    free: true,
    link: "https://www.visitsouthport.com/",
  },
  {
    title: "The Open Championship",
    isoDate: "2026-07-12",
    dayLabel: "12–19 Jul",
    venue: "Royal Birkdale",
    category: "Golf",
    emoji: "⛳",
    free: false,
    link: "/the-open-2026",
  },
  {
    title: "Southport Flower Show",
    isoDate: "2026-08-20",
    dayLabel: "20–23 Aug",
    venue: "Victoria Park",
    category: "Festival",
    emoji: "🌸",
    free: false,
    link: "https://southportflowershow.co.uk/",
  },
  {
    title: "Southport Air Show",
    isoDate: "2026-08-29",
    dayLabel: "29–30 Aug",
    venue: "Southport Beach",
    category: "Festival",
    emoji: "✈️",
    free: true,
    link: "https://www.visitsouthport.com/",
  },
  {
    title: "Yacht Race — 24 Hours",
    isoDate: "2026-09-12",
    dayLabel: "12–13 Sep",
    venue: "Marine Lake",
    category: "Sport",
    emoji: "⛵",
    free: true,
    link: "https://wlyc.org.uk/page/wlyc-24-hour-race",
  },
  {
    title: "British Fireworks Championship",
    isoDate: "2026-09-26",
    dayLabel: "26–27 Sep",
    venue: "Victoria Park",
    category: "Festival",
    emoji: "🎆",
    free: false,
    link: "https://www.visitsouthport.com/",
  },
  {
    title: "Southport Comedy Festival",
    isoDate: "2026-10-02",
    dayLabel: "2–18 Oct",
    venue: "Victoria Park",
    category: "Comedy",
    emoji: "🎭",
    free: false,
    link: "https://southportcomedyfestival.com/",
  },
  {
    title: "Books Alive! Literature Festival",
    isoDate: "2026-10-24",
    dayLabel: "24–31 Oct",
    venue: "Town Centre",
    category: "Arts & Culture",
    emoji: "📚",
    free: true,
    link: "https://www.southport2026.com/",
  },
  {
    title: "Oktoberfest Southport",
    isoDate: "2026-10-24",
    dayLabel: "24–25 Oct",
    venue: "Victoria Park",
    category: "Festival",
    emoji: "🍺",
    free: false,
    link: "https://www.southportoktoberfest.com/",
  },
  {
    title: "Southport Santa Sprint",
    isoDate: "2026-12-06",
    dayLabel: "Sun 6 Dec",
    venue: "Town Centre",
    category: "Sport",
    emoji: "🎅",
    free: false,
    link: "https://www.queenscourt.org.uk/",
  },
];

// ── Blog categories ────────────────────────────────────────────────────────

export interface BlogCategory {
  slug: string;
  label: string;
  color: string;
  description: string;
  /** Matches a site category slug for cross-linking */
  siteCategory?: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "food-drink",
    label: "Food & Drink",
    color: "#8B2635",
    description: "Restaurant reviews, cafe guides, and food news from across Southport.",
    siteCategory: "restaurants",
  },
  {
    slug: "where-to-stay",
    label: "Where to Stay",
    color: "#1B2E4B",
    description: "Hotels, B&Bs, and accommodation guides for every budget.",
    siteCategory: "hotels",
  },
  {
    slug: "bars-nightlife",
    label: "Bars & Nightlife",
    color: "#3D1A5C",
    description: "The best bars, pubs, and live music venues in Southport.",
    siteCategory: "bars-nightlife",
  },
  {
    slug: "cafes",
    label: "Coffee & Cafes",
    color: "#6B3A1F",
    description: "Independent coffee shops, tea rooms, and brunch spots.",
    siteCategory: "cafes",
  },
  {
    slug: "things-to-do",
    label: "Things to Do",
    color: "#1A5C5B",
    description: "Attractions, experiences, and activities for all ages.",
    siteCategory: "attractions",
  },
  {
    slug: "outdoors",
    label: "Outdoors",
    color: "#1A5C7A",
    description: "Beaches, parks, coastal walks, and outdoor adventures.",
    siteCategory: "beaches-parks",
  },
  {
    slug: "golf",
    label: "Golf",
    color: "#1A4020",
    description: "Golf courses, news, and guides — including The Open 2026.",
    siteCategory: "golf",
  },
  {
    slug: "shopping",
    label: "Shopping",
    color: "#8B2847",
    description: "Lord Street boutiques, markets, and the best independent shops.",
    siteCategory: "shopping",
  },
  {
    slug: "wellness",
    label: "Health & Wellness",
    color: "#4A2060",
    description: "Spas, gyms, yoga, and wellbeing in Southport.",
    siteCategory: "wellness",
  },
  {
    slug: "activities",
    label: "Activities",
    color: "#0D6E6E",
    description: "Family activities, watersports, and things to do for all ages.",
    siteCategory: "activities",
  },
  {
    slug: "getting-around",
    label: "Getting Around",
    color: "#2A3F5C",
    description: "Parking, trains, and transport guides for visiting Southport.",
    siteCategory: "transport",
  },
  {
    slug: "local-guides",
    label: "Local Guides",
    color: "#5C3A1A",
    description: "In-depth guides written by locals who know Southport best.",
  },
  {
    slug: "events",
    label: "Events",
    color: "#8B5A1A",
    description: "Event previews, reviews, and what's on in Southport.",
  },
];

// ── Blog posts ─────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  image: string;
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [
  // Food & Drink
  {
    slug: "best-restaurants-southport-2026",
    title: "The Best Restaurants in Southport 2026",
    excerpt:
      "From fine dining on Lord Street to hidden seaside gems, we've rounded up the very best places to eat in Southport right now.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "15 Feb 2026",
  },
  {
    slug: "dog-friendly-pubs-southport",
    title: "Dog-Friendly Pubs in Southport and Birkdale",
    excerpt:
      "Taking your four-legged friend to Southport? Here are the warmest welcomes for dogs across the town's best pubs and bars.",
    categorySlug: "food-drink",
    image: "/images/categories/bars-nightlife.webp",
    date: "12 Feb 2026",
  },
  // Where to Stay
  {
    slug: "where-to-stay-open-championship-2026",
    title: "Where to Stay for The Open Championship 2026",
    excerpt:
      "Royal Birkdale hosts golf's greatest major this July. Our guide to the best hotels and accommodation — and why you need to book now.",
    categorySlug: "where-to-stay",
    image: "/images/blog-hero.jpg",
    date: "10 Feb 2026",
  },
  {
    slug: "best-bnbs-southport",
    title: "The Best B&Bs and Guest Houses in Southport",
    excerpt:
      "Looking for something more personal than a hotel? Southport has a fantastic range of B&Bs and guest houses, from Victorian townhouses to coastal retreats.",
    categorySlug: "where-to-stay",
    image: "/images/categories/hotels.webp",
    date: "8 Feb 2026",
  },
  // Things to Do
  {
    slug: "things-to-do-rainy-day-southport",
    title: "Things to Do in Southport on a Rainy Day",
    excerpt:
      "The British weather doesn't always cooperate, but Southport has plenty to offer indoors — from the Atkinson to Silcock's Funland.",
    categorySlug: "things-to-do",
    image: "/images/categories/attractions.webp",
    date: "5 Feb 2026",
  },
  {
    slug: "southport-with-kids-full-guide",
    title: "Southport with Kids: The Complete Family Guide",
    excerpt:
      "Southport is one of the best seaside destinations for families. Here's everything you need to know — beaches, rides, parks, and where to eat.",
    categorySlug: "things-to-do",
    image: "/images/categories/activities.webp",
    date: "3 Feb 2026",
  },
  // Outdoors
  {
    slug: "southport-hidden-gems",
    title: "10 Southport Hidden Gems Locals Love",
    excerpt:
      "Beyond the pier and the beach, Southport has a wealth of secret spots. A local's guide to the places visitors rarely find.",
    categorySlug: "outdoors",
    image: "/images/categories/cafes.webp",
    date: "5 Feb 2026",
  },
  {
    slug: "best-beaches-near-southport",
    title: "The Best Beaches Near Southport",
    excerpt:
      "Southport Beach stretches for miles, but nearby Ainsdale, Formby, and Crosby offer very different coastal experiences. Here's how to choose.",
    categorySlug: "outdoors",
    image: "/images/categories/beaches-parks.webp",
    date: "1 Feb 2026",
  },
  // Golf
  {
    slug: "pubs-near-royal-birkdale-open-2026",
    title: "Best Pubs Near Royal Birkdale for The Open 2026",
    excerpt:
      "Where to drink during Open week — from Birkdale village classics to town centre options that won't drive you mad with queues. A local's honest guide.",
    categorySlug: "food-drink",
    image: "/images/blog-pubs.jpg",
    date: "17 Feb 2026",
  },
  {
    slug: "getting-to-royal-birkdale-open-2026",
    title: "Getting to Royal Birkdale for The Open 2026: Full Transport Guide",
    excerpt:
      "Don't drive. Seriously. Here's how to get to Royal Birkdale by train, shuttle, taxi, and on foot — everything you need to arrive without the stress.",
    categorySlug: "getting-around",
    image: "/images/categories/transport.webp",
    date: "18 Feb 2026",
  },
  {
    slug: "royal-birkdale-guide-the-open",
    title: "Royal Birkdale: What to Know Before The Open 2026",
    excerpt:
      "The 154th Open Championship returns to Royal Birkdale in July 2026. Here's your complete guide to the course, tickets, and planning your visit.",
    categorySlug: "golf",
    image: "/images/open-2026.webp",
    date: "7 Feb 2026",
  },
  {
    slug: "best-golf-courses-southport",
    title: "The Best Golf Courses Near Southport",
    excerpt:
      "Southport is one of England's premier golfing destinations. From Royal Birkdale to Hillside and Southport & Ainsdale — here's your guide.",
    categorySlug: "golf",
    image: "/images/categories/golf.webp",
    date: "2 Feb 2026",
  },
  // Shopping
  {
    slug: "best-independent-shops-lord-street",
    title: "The Best Independent Shops on Lord Street",
    excerpt:
      "Lord Street is one of England's most beautiful Victorian boulevards, lined with independent boutiques, galleries, and specialty shops. Here's where to go.",
    categorySlug: "shopping",
    image: "/images/categories/shopping.webp",
    date: "4 Feb 2026",
  },
  // Bars & Nightlife
  {
    slug: "best-bars-southport-lord-street",
    title: "The Best Bars on Lord Street Southport",
    excerpt:
      "Lord Street isn't just for shopping — Southport's main boulevard is home to some of the town's finest bars. Here's where locals actually drink.",
    categorySlug: "bars-nightlife",
    image: "/images/blog-pubs.jpg",
    date: "11 Feb 2026",
  },
  // Wellness
  {
    slug: "best-spas-southport",
    title: "The Best Spas and Wellness Retreats in Southport",
    excerpt:
      "From luxury hotel spas to independent beauty studios, Southport has a growing wellness scene. Here's where to relax and recharge.",
    categorySlug: "wellness",
    image: "/images/categories/wellness.webp",
    date: "6 Feb 2026",
  },
  // Activities
  {
    slug: "marine-lake-water-sports-southport",
    title: "Water Sports and Activities on Southport's Marine Lake",
    excerpt:
      "Marine Lake is one of the UK's largest man-made lakes — and it's right in the heart of Southport. Here's how to make the most of it.",
    categorySlug: "activities",
    image: "/images/categories/beaches-parks.webp",
    date: "9 Feb 2026",
  },
  // Getting Around
  {
    slug: "parking-guide-southport",
    title: "Parking Guide for Southport Town Centre",
    excerpt:
      "Visiting Southport by car? Here's our complete guide to car parks, pricing, and the best places to park near Lord Street and the seafront.",
    categorySlug: "getting-around",
    image: "/images/categories/transport.webp",
    date: "13 Feb 2026",
  },
  // Local Guides
  {
    slug: "perfect-weekend-southport",
    title: "The Perfect Weekend in Southport: A Local's Itinerary",
    excerpt:
      "If you only have a weekend in Southport, here's exactly how to spend it — from Friday night dinner to Sunday afternoon on the beach.",
    categorySlug: "local-guides",
    image: "/southport-pier.webp",
    date: "14 Feb 2026",
  },
  // Events
  {
    slug: "southport-events-guide-2026",
    title: "Southport 2026: The Complete Events Guide",
    excerpt:
      "From Lightport to The Open Championship and the Flower Show — 2026 is the biggest year in Southport's recent history. Here's everything in your diary.",
    categorySlug: "events",
    image: "/images/mlec.webp",
    date: "16 Feb 2026",
  },
];

// ── Blog helper functions ──────────────────────────────────────────────────

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.categorySlug === categorySlug);
}

export function getBlogPostCategory(post: BlogPost): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === post.categorySlug);
}

/** Returns upcoming events from today onwards, sorted by date */
export function getUpcomingEvents(limit?: number): SouthportEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = EVENTS.filter((e) => new Date(e.isoDate) >= today).sort(
    (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
  );
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** Group events by month label for the full calendar view */
export function getEventsByMonth(): Record<string, SouthportEvent[]> {
  const grouped: Record<string, SouthportEvent[]> = {};
  for (const event of EVENTS) {
    const d = new Date(event.isoDate);
    const label = d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(event);
  }
  return grouped;
}
