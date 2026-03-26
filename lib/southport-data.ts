// ── Shared site data ──────────────────────────────────────────────────────
// Events and blog posts are defined here so they can be imported by
// the homepage, the events page, and the blog page without duplication.

export interface SouthportEvent {
  title: string;
  /** ISO date string (YYYY-MM-DD) used for sorting / filtering */
  isoDate: string;
  /** ISO end date for multi-day events (YYYY-MM-DD). Omit for single-day events. */
  endIsoDate?: string;
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
    title: "Chess The Musical",
    isoDate: "2026-02-25",
    endIsoDate: "2026-02-28",
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
    endIsoDate: "2026-04-04",
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
    endIsoDate: "2026-05-03",
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
    endIsoDate: "2026-05-18",
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
    endIsoDate: "2026-05-25",
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
    endIsoDate: "2026-05-31",
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
    endIsoDate: "2026-06-28",
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
    endIsoDate: "2026-07-19",
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
    endIsoDate: "2026-08-23",
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
    endIsoDate: "2026-08-30",
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
    endIsoDate: "2026-09-13",
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
    endIsoDate: "2026-09-27",
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
    endIsoDate: "2026-10-18",
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
    endIsoDate: "2026-10-31",
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
    endIsoDate: "2026-10-25",
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
  emoji: string;
  description: string;
  /** Matches a site category slug for cross-linking */
  siteCategory?: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "food-drink",
    label: "Food & Drink",
    color: "#8B2635",
    emoji: "🍽️",
    description: "Restaurant reviews, cafe guides, and food news from across Southport.",
    siteCategory: "restaurants",
  },
  {
    slug: "where-to-stay",
    label: "Where to Stay",
    color: "#1B2E4B",
    emoji: "🏨",
    description: "Hotels, B&Bs, and accommodation guides for every budget.",
    siteCategory: "hotels",
  },
  {
    slug: "bars-nightlife",
    label: "Bars & Nightlife",
    color: "#3D1A5C",
    emoji: "🍺",
    description: "The best bars, pubs, and live music venues in Southport.",
    siteCategory: "bars-nightlife",
  },
  {
    slug: "cafes",
    label: "Coffee & Cafes",
    color: "#6B3A1F",
    emoji: "☕",
    description: "Independent coffee shops, tea rooms, and brunch spots.",
    siteCategory: "cafes",
  },
  {
    slug: "things-to-do",
    label: "Things to Do",
    color: "#1A5C5B",
    emoji: "🎡",
    description: "Attractions, experiences, and activities for all ages.",
    siteCategory: "attractions",
  },
  {
    slug: "outdoors",
    label: "Outdoors",
    color: "#1A5C7A",
    emoji: "🏖️",
    description: "Beaches, parks, coastal walks, and outdoor adventures.",
    siteCategory: "beaches-parks",
  },
  {
    slug: "golf",
    label: "Golf",
    color: "#1A4020",
    emoji: "⛳",
    description: "Golf courses, news, and guides — including The Open 2026.",
    siteCategory: "golf",
  },
  {
    slug: "shopping",
    label: "Shopping",
    color: "#8B2847",
    emoji: "🛍️",
    description: "Lord Street boutiques, markets, and the best independent shops.",
    siteCategory: "shopping",
  },
  {
    slug: "wellness",
    label: "Health & Wellness",
    color: "#4A2060",
    emoji: "💆",
    description: "Spas, gyms, yoga, and wellbeing in Southport.",
    siteCategory: "wellness",
  },
  {
    slug: "activities",
    label: "Activities",
    color: "#0D6E6E",
    emoji: "🏄",
    description: "Family activities, watersports, and things to do for all ages.",
    siteCategory: "activities",
  },
  {
    slug: "getting-around",
    label: "Getting Around",
    color: "#2A3F5C",
    emoji: "🚌",
    description: "Parking, trains, and transport guides for visiting Southport.",
    siteCategory: "transport",
  },
  {
    slug: "local-guides",
    label: "Local Guides",
    color: "#5C3A1A",
    emoji: "📍",
    description: "In-depth guides written by locals who know Southport best.",
  },
  {
    slug: "events",
    label: "Events",
    color: "#8B5A1A",
    emoji: "🎉",
    description: "Event previews, reviews, and what's on in Southport.",
  },
  {
    slug: "for-business",
    label: "For Business",
    color: "#1A5C3A",
    emoji: "📊",
    description: "The SouthportGuide Business Hub — tools, news, and updates for Southport businesses.",
  },
  {
    slug: "history",
    label: "History",
    color: "#5C3A1A",
    emoji: "🏛️",
    description: "The history of Southport and its villages — from Viking settlements and medieval churches to Victorian seaside ambition.",
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
  /** Omit for default Terry author. Set to "damian" for posts written by Damian Roche. */
  author?: "terry" | "damian";
  /** Pin this post to the homepage blog section. Up to 3 featured posts are shown; extras are ignored. */
  featured?: boolean;
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
  {
    slug: "beachcombing-ainsdale-winter",
    title: "Beachcombing at Ainsdale — What We Found on a Winter Morning",
    excerpt:
      "Mermaid's purses, two species of jellyfish, a whelk egg mass, and a razor clam. One winter morning at Ainsdale beach. Here's what it all was.",
    categorySlug: "outdoors",
    image: "/images/blog/ainsdale/ainsdale-beach-dunes-sea-view.webp",
    date: "4 Mar 2026",
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
  // Property
  {
    slug: "southport-house-prices-by-postcode",
    title: "Southport House Prices by Postcode: What's Actually Selling and What It Costs",
    excerpt:
      "We've mapped every Land Registry sale in PR8 and PR9 over the last three years — 10 postcode sectors, hundreds of transactions, real prices. Here's what Southport property actually looks like.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-house-prices.webp",
    date: "19 Mar 2026",
    featured: true,
  },
  // Parking
  {
    slug: "southport-parking-directory-2026",
    title: "We've Mapped 106 Car Parks Across Southport and the Sefton Coast",
    excerpt:
      "106 verified car parks within 12km of Southport town centre — official, unofficial, free, paid, and a few that surprised us. Here's what we found.",
    categorySlug: "getting-around",
    image: "/images/categories/parking.webp",
    date: "5 Mar 2026",
    featured: true,
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
    featured: true,
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

  // ── New posts: Open 2026 cluster ──────────────────────────────────────────
  {
    slug: "open-championship-2026-tickets-guide",
    title: "How to Get Tickets for The Open Championship 2026",
    excerpt:
      "Practice rounds, championship days, hospitality packages — everything you need to know about buying Open 2026 tickets, what they cost, and what you get for your money.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-tickets-guide.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "what-to-bring-open-championship-2026",
    title: "What to Pack for The Open Championship 2026",
    excerpt:
      "The official restricted items list, Terry's personal packing checklist, and what to wear when you're spending a full day on a links course in Lancashire in July.",
    categorySlug: "golf",
    image: "/images/blog/what-to-bring-open-championship-2026.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "open-championship-2026-spectator-guide",
    title: "First-Timer's Guide to Watching The Open Championship",
    excerpt:
      "Never been to The Open before? Here's everything you need — how the day works, where to stand, how to follow the action, and how not to make a fool of yourself.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-spectator-guide.webp",
    date: "19 Feb 2026",
    featured: true,
  },
  {
    slug: "restaurants-open-week-southport-2026",
    title: "Where to Eat in Southport During Open Week 2026",
    excerpt:
      "Open week means 40,000 extra people wanting a table. Here's where to eat, when to book, and which restaurants are worth the effort when Southport is at full capacity.",
    categorySlug: "food-drink",
    image: "/images/blog/restaurants-open-week-southport-2026.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "open-championship-2026-day-by-day",
    title: "The Open 2026: What's On Each Day at Royal Birkdale",
    excerpt:
      "A day-by-day breakdown — practice rounds Monday to Wednesday, championship rounds Thursday to Sunday, what to expect from each day, and which is worth attending most.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-day-by-day.webp",
    date: "19 Feb 2026",
  },

  // ── New posts: Evergreen gaps ─────────────────────────────────────────────
  {
    slug: "best-cafes-southport",
    title: "The Best Cafes and Coffee Shops in Southport",
    excerpt:
      "Independent coffee shops, proper tea rooms, and the spots where Southport locals actually go for a decent flat white. Terry's unfiltered guide.",
    categorySlug: "food-drink",
    image: "/images/blog/best-cafes-southport.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "best-brunch-southport",
    title: "Best Brunch Spots in Southport",
    excerpt:
      "Weekend brunch in Southport has improved considerably. Here's where to go — and where to avoid — for the best eggs, toast, and flat whites in town.",
    categorySlug: "food-drink",
    image: "/images/blog/best-brunch-southport.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "best-hotels-southport-2026",
    title: "The Best Hotels in Southport 2026",
    excerpt:
      "From The Grand on Lord Street to boutique options in Birkdale village — the definitive guide to where to stay in Southport, ranked honestly by a local.",
    categorySlug: "where-to-stay",
    image: "/images/blog/best-hotels-southport-2026.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "southport-pier-guide",
    title: "Southport Pier: The Complete Guide",
    excerpt:
      "England's second-longest pier gets less credit than it deserves. Here's what's actually there, when to visit, and why it's worth walking the full length.",
    categorySlug: "things-to-do",
    image: "/images/blog/southport-pier-guide.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "day-trips-from-southport",
    title: "The Best Day Trips from Southport",
    excerpt:
      "Within an hour of Southport you've got Liverpool, Formby, the Ribble Valley, and more. Here's how to make the most of what's on your doorstep.",
    categorySlug: "local-guides",
    image: "/images/blog/day-trips-from-southport.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "southport-flower-show-guide",
    title: "Southport Flower Show 2026: The Complete Guide",
    excerpt:
      "One of England's most prestigious flower shows returns to Victoria Park in August. Tickets, what to see, where to park, and tips from someone who has been more times than he'd like to admit.",
    categorySlug: "events",
    image: "/images/blog/southport-flower-show-guide.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "southport-vs-blackpool",
    title: "Southport vs Blackpool: Which Should You Visit?",
    excerpt:
      "Both Lancashire seaside towns. Very different experiences. Terry gives the honest comparison — and has a clear view on which one wins.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-vs-blackpool.webp",
    date: "19 Feb 2026",
  },

  // ── New posts: Content gap closers ────────────────────────────────────────
  {
    slug: "best-indian-restaurants-southport",
    title: "The Best Indian Restaurants in Southport",
    excerpt:
      "Southport has a proper curry scene — most of it clustered around the town centre and Lord Street. Terry's honest guide to where to actually go.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "best-italian-restaurants-southport",
    title: "The Best Italian Restaurants in Southport",
    excerpt:
      "From Lord Street trattorias to neighbourhood Italian joints, Southport does Italian better than you'd expect. Here's where to actually go.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "watersports-southport",
    title: "Watersports in Southport: The Complete Guide",
    excerpt:
      "Marine Lake, the Sefton Coast, and Crosby Lakeside — Southport's watersports scene is better than most people expect. Wakeboarding, sailing, kayaking, and more.",
    categorySlug: "activities",
    image: "/images/categories/beaches-parks.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "cocktail-bars-southport",
    title: "The Best Cocktail Bars in Southport",
    excerpt:
      "Southport's cocktail scene has quietly improved. Here's where to go for a proper drink on Lord Street and beyond — from craft cocktails to classic pours.",
    categorySlug: "bars-nightlife",
    image: "/images/categories/bars-nightlife.webp",
    date: "19 Feb 2026",
  },
  // Local Guides
  {
    slug: "churchtown-botanic-gardens-crocuses",
    title: "The Crocus Display at Churchtown Botanic Gardens Is On Right Now",
    excerpt:
      "Every year around late February the slope under the trees at Churchtown Botanic Gardens fills with purple and white crocuses. This year it's brilliant. Free to visit, ten minutes from town.",
    categorySlug: "local-guides",
    image: "/images/blog/churchtown-botanic-crocuses-carpet.jpg",
    date: "02 Mar 2026",
    author: "damian",
  },
  // March 2026 — keyword gap closers
  {
    slug: "afternoon-tea-southport",
    title: "The Best Afternoon Tea in Southport",
    excerpt:
      "The Grand, The Vincent, and a few others worth knowing about. Terry's guide to afternoon tea in Southport — what's actually good, what to book ahead for, and what to expect.",
    categorySlug: "food-drink",
    image: "/images/blog/afternoon-tea-southport.webp",
    date: "14 Mar 2026",
  },
  {
    slug: "splash-world-southport",
    title: "Splash World Southport: What to Expect",
    excerpt:
      "Indoor waterpark, wave machine, flumes, and a toddler pool — Splash World is Southport's all-weather family option. What's actually there, prices, and when to go.",
    categorySlug: "things-to-do",
    image: "/images/blog/splash-world-southport.webp",
    date: "14 Mar 2026",
  },
  {
    slug: "atkinson-southport",
    title: "The Atkinson Southport: Gallery, Theatre and What to Expect",
    excerpt:
      "Free gallery and museum on Lord Street, a proper theatre programme, and a decent café. If you've walked past the Atkinson without going in, here's why you should.",
    categorySlug: "things-to-do",
    image: "/images/blog/atkinson-southport.webp",
    date: "15 Mar 2026",
  },
  {
    slug: "marine-lake-events-centre-southport",
    title: "The Marine Lake Events Centre (MLEC): What Southport is Building",
    excerpt:
      "A 4,000-capacity waterfront arena opening in 2027. 515,000 extra visitors projected. Here's what MLEC is, when it opens, and what it means for the town.",
    categorySlug: "local-guides",
    image: "/images/blog/mlec-southport.webp",
    date: "16 Mar 2026",
    featured: true,
  },
  // Property sector guides
  {
    slug: "living-in-birkdale-southport",
    title: "Living in Birkdale, Southport: What PR8 4 Is Actually Like",
    excerpt:
      "House prices, schools, commute times, what to eat and where to drink — a genuinely honest look at what it's like to live in Birkdale. One of Southport's most sought-after postcodes, and for good reason.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/birkdale.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "living-in-churchtown-southport",
    title: "Living in Churchtown, Southport: An Honest Guide to PR9 9",
    excerpt:
      "Churchtown is the old village at the north end of Southport — and it's the bit most people don't know about. Quiet streets, Botanic Gardens, a handful of good pubs, and house prices that still feel reasonable. Here's what it's actually like.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/churchtown.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "living-in-ainsdale-southport",
    title: "Living in Ainsdale, Southport: What You Need to Know About PR8 3",
    excerpt:
      "Ainsdale sits between Southport and Formby — its own village feel, a decent beach, National Trust land, and a commuter-friendly train line. House prices and everything else you'd want to know before you move.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/ainsdale.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "should-i-buy-in-southport-2026",
    title: "Should I Buy in Southport in 2026? An Honest Assessment",
    excerpt:
      "The Open is coming. MLEC opens in 2027. House prices are moving. Here's a straightforward, data-backed look at whether buying in Southport right now makes sense — and which postcodes are worth watching.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-house-prices.webp",
    date: "19 Mar 2026",
  },
  // History
  {
    slug: "history-of-churchtown-southport",
    title: "The History of Churchtown: Southport's Ancient Village",
    excerpt:
      "Vikings settled here in 940 AD. Monks brought St Cuthbert's bones to escape Norse raiders. A local innkeeper left Churchtown and founded an entire town. And someone buried here spent 16 years as a captive in North Africa. This is Churchtown's story.",
    categorySlug: "history",
    image: "/images/blog/churchtown-st-cuthberts-history.jpg",
    date: "19 Mar 2026",
  },
  // For Business
  {
    slug: "southport-business-hub-launch",
    title: "The SouthportGuide Business Hub Is in Final Testing — Here Is What It Means for You",
    excerpt:
      "A free business dashboard for every Southport business. Real analytics, a weekly performance email, and full listing control. Try the demo today and register to claim your spot.",
    categorySlug: "for-business",
    image: "/images/blog/southport-business-hub.jpg",
    date: "26 Feb 2026",
    author: "damian",
  },
  {
    slug: "southport-market-guide",
    title: "Southport Market: The Honest Guide to Market Street",
    excerpt:
      "Southport Market on Market Street is genuinely one of the better things in this town — street food, independent traders, a decent coffee, and a proper atmosphere. Here's what it is, how it works, and when to go.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-market-guide.jpg",
    date: "17 Mar 2026",
  },
  {
    slug: "easter-things-to-do-southport-2026",
    title: "Easter in Southport 2026 — What's Worth Your Time",
    excerpt:
      "Easter weekend in Southport means the season is starting. The beach is back, the pier is busy, the Botanic Gardens have the crocuses out, and the town actually feels alive again. Here's what to do with the bank holiday.",
    categorySlug: "events",
    image: "/images/blog/easter-southport.jpg",
    date: "18 Mar 2026",
  },
  {
    slug: "best-sunday-lunch-southport",
    title: "Best Sunday Lunch in Southport — Where to Actually Go",
    excerpt:
      "Sunday lunch in Southport is worth doing properly. The town has a handful of pubs and restaurants that take it seriously — proper roasts, decent gravy, no microwave involved. I've eaten at most of them. Here's the honest breakdown.",
    categorySlug: "food-drink",
    image: "/images/blog/sunday-lunch-southport.jpg",
    date: "19 Mar 2026",
  },

  // ── 2026 Events cluster ──────────────────────────────────────────────────

  // Fireworks Championship
  {
    slug: "southport-fireworks-championship-explained",
    title: "How the British Musical Fireworks Championship Works — It's Not Just a Display",
    excerpt:
      "Most people don't realise the Southport fireworks is a competition. Teams are judged. Every burst is choreographed. Once you understand the format, you watch it completely differently.",
    categorySlug: "events",
    image: "/images/southport-fireworks-championship.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "southport-september-2026-events",
    title: "Southport in September 2026 — What's On and What to Book Now",
    excerpt:
      "September is quieter than summer but it has the best event of the year: the British Musical Fireworks Championship. Here's the full picture of what's happening in Southport this September.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-september-2026.webp",
    date: "25 Mar 2026",
  },

  // Comedy Festival
  {
    slug: "southport-comedy-festival-2026-lineup",
    title: "Southport Comedy Festival 2026 — Lineup, Why It Sells Out, and How to Book",
    excerpt:
      "15th year. 17 nights. A luxury heated marquee in Victoria Park. In 2025, nine shows sold out. Here's who's confirmed for 2026 and how to get tickets before the good nights are gone.",
    categorySlug: "events",
    image: "/images/blog/blog-comedy-lineup.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "victoria-park-southport-events-2026",
    title: "Victoria Park Southport — Every Major Event Happening There in 2026",
    excerpt:
      "Flower Show, Fireworks Championship, Comedy Festival, Sausage & Cider Festival. More major events happen in Victoria Park than most people realise. Here's the full 2026 calendar.",
    categorySlug: "events",
    image: "/images/blog/blog-victoria-park-events.webp",
    date: "25 Mar 2026",
  },

  // Armed Forces Festival
  {
    slug: "southport-armed-forces-festival-2026-guide",
    title: "Southport Armed Forces Festival 2026 — What to See and Where to Be",
    excerpt:
      "27–28 June. Free. Town-wide. Parade on the Promenade, Drumhead Service, fly-overs, vehicle displays at Princes Park. Everything you need to plan your day.",
    categorySlug: "events",
    image: "/images/blog/blog-armed-forces-day.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "southport-june-2026-guide",
    title: "Southport in June 2026 — Armed Forces Weekend and Everything Else",
    excerpt:
      "June 2026 is a big month in Southport. The Armed Forces Festival on 27–28 June is the headline act, but the whole month has plenty going on. Here's how to make the most of it.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-june-2026.webp",
    date: "25 Mar 2026",
  },

  // Sausage & Cider Festival
  {
    slug: "southport-sausage-cider-festival-which-session",
    title: "Southport Sausage & Cider Festival 2026 — Afternoon or Evening Session?",
    excerpt:
      "The festival runs in two sessions on 18 April. The afternoon is better for food and families. The evening is livelier. I'll tell you which one to book and what to expect from each.",
    categorySlug: "events",
    image: "/images/blog/blog-sausage-cider-fun.webp",
    date: "26 Mar 2026",
    featured: true,
  },
  {
    slug: "southport-spring-events-2026",
    title: "Things to Do in Southport in Spring 2026 — April and May Events",
    excerpt:
      "Spring 2026 is unexpectedly packed. Cristal Palace on Lord Street in April. Big Top Festival in May. Sausage & Cider Festival. Easter. Here's how the season shapes up.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-spring-april.webp",
    date: "26 Mar 2026",
    featured: true,
  },

  // Year of Culture
  {
    slug: "cristal-palace-lord-street-southport-2026",
    title: "Cristal Palace on Lord Street — What to Expect from Southport's Most Spectacular Event",
    excerpt:
      "A 15-metre flying chandelier. Lord Street as an open-air ballroom. Aerial performers, live music, thousands watching from the pavement. This is Cristal Palace by Transe Express — 3–4 April 2026.",
    categorySlug: "events",
    image: "/images/blog/blog-cristal-palace.webp",
    date: "26 Mar 2026",
    featured: true,
  },
  {
    slug: "southport-2026-elegantly-eccentric-explained",
    title: "Southport 2026: Elegantly Eccentric — What Is It and Why Does It Matter?",
    excerpt:
      "The biggest year of culture in Southport's recent history. Four brand-new events backed by the Liverpool City Region. Here's what's happening, when, and why it matters for the town's future.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-culture.webp",
    date: "25 Mar 2026",
  },

  // Open Championship
  {
    slug: "open-2026-southport-day-by-day",
    title: "Open Week in Southport 2026 — A Day-by-Day Visitor Guide",
    excerpt:
      "If you're visiting Southport during Open week, you need a plan. The town is genuinely transformed. Here's how to make the most of every day from Tuesday 14 to Sunday 19 July.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-week-southport.webp",
    date: "25 Mar 2026",
  },
  {
    slug: "open-2026-southport-without-tickets",
    title: "The Open 2026 in Southport — What to Do If You Don't Have Tickets",
    excerpt:
      "Tickets are scarce and the town fills up anyway. Here's what you can actually do in Southport during Open week without setting foot inside Royal Birkdale.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-2026-no-tickets.webp",
    date: "25 Mar 2026",
  },

  // Flower Show
  {
    slug: "southport-flower-show-first-timers-guide-2026",
    title: "Southport Flower Show 2026 — First Timer's Complete Guide",
    excerpt:
      "Never been to Southport Flower Show before? Here's exactly what to expect: which gate to use, what order to do it in, how to avoid the queues, and what's actually worth your time.",
    categorySlug: "events",
    image: "/images/blog/blog-flower-show-guide.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "southport-august-2026-guide",
    title: "August in Southport 2026 — Flower Show, Air Show and the Most Events in a Single Month",
    excerpt:
      "Flower Show 20–23 August. Air Show 29–30 August. They're 9 days apart. I've lived here 41 years and 2026 is going to be the busiest August in Southport's recent memory. Here's how to plan it.",
    categorySlug: "events",
    image: "/images/blog/blog-august-southport.webp",
    date: "25 Mar 2026",
  },

  // Air Show
  {
    slug: "southport-air-show-best-viewing-spots-2026",
    title: "Best Viewing Spots for Southport Air Show 2026 — Where to Actually Stand",
    excerpt:
      "100,000+ people turn up for the Southport Air Show. Some will stand in the wrong place and see half the display. Here's where the locals go — including the spots most visitors miss.",
    categorySlug: "events",
    image: "/images/blog/blog-airshow-crowds.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "southport-august-bank-holiday-2026",
    title: "Southport Bank Holiday Weekend August 2026 — How to Do It Properly",
    excerpt:
      "The August Bank Holiday this year is Air Show weekend. If you haven't planned ahead, parking will be a nightmare and the seafront will be rammed. Here's how to do it without the stress.",
    categorySlug: "events",
    image: "/images/blog/blog-august-bank-holiday-southport.webp",
    date: "25 Mar 2026",
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
  const upcoming = EVENTS.filter((e) => new Date(e.endIsoDate ?? e.isoDate) >= today).sort(
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
