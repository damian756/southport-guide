// ── Shared site data ──────────────────────────────────────────────────────
// Blog posts are defined here so they can be imported by the homepage and the
// blog page without duplication. Events live in lib/events-data.ts and are
// re-exported here so existing imports keep working.

export type { SouthportEvent } from "./events-data";
export { EVENTS, getUpcomingEvents, getEventsByMonth, isEventCurrent } from "./events-data";

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
    description: "Restaurant and café guides, and food news from across Southport.",
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
    description: "Bars, pubs, and live music venues in Southport.",
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
    description: "Golf courses, news, and guides, including The Open 2026.",
    siteCategory: "golf",
  },
  {
    slug: "shopping",
    label: "Shopping",
    color: "#8B2847",
    emoji: "🛍️",
    description: "Lord Street boutiques, markets, and independent shops.",
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
    description: "The SouthportGuide Business Hub: tools, news, and updates for Southport businesses.",
  },
  {
    slug: "history",
    label: "History",
    color: "#5C3A1A",
    emoji: "🏛️",
    description: "The history of Southport and its villages, from Viking settlements and medieval churches to Victorian seaside ambition.",
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
  /** Override canonical URL — use when a guide page is the authoritative version of this content. */
  canonicalUrl?: string;
  /** Alt text for the hero image when the title does not describe the picture. */
  heroAlt?: string;
  /** Short line shown under the hero, e.g. when the photo is illustrative. */
  heroCaption?: string;
  /**
   * Last day (YYYY-MM-DD) of the event or season a dated post was written for.
   * From the next day the post shows a note that it has passed, with a link to
   * what is on now. Leave unset for evergreen posts.
   */
  eventEndDate?: string;
  /**
   * For a post about one dated event: the post page adds Event JSON-LD built
   * from these facts, next to its Article JSON-LD. Dates are YYYY-MM-DD.
   */
  event?: {
    name: string;
    /** What the event is, in plain words (not a summary of the post). */
    description?: string;
    startDate: string;
    endDate: string;
    venue: string;
    locality: string;
    postalCode: string;
    organizer: { name: string; url: string };
    url: string;
    /** Only when a ticket page exists. */
    ticketUrl?: string;
  };
  /**
   * Set only for a paid, sponsored article (see /advertise). The post is then
   * labelled Sponsored, bylined "Sponsored by <name>" instead of Terry, has no
   * persona bio, and links to the sponsor carry rel="sponsored noopener".
   */
  sponsor?: { name: string; url: string };
}

export const BLOG_POSTS: BlogPost[] = [
  // Food & Drink
  {
    slug: "best-restaurants-southport-2026",
    title: "Restaurants in Southport 2026: Where to Eat",
    excerpt:
      "From Lord Street to Birkdale Village and the seafront, a guide to where to eat in Southport.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "15 Feb 2026",
  },
  {
    slug: "dog-friendly-pubs-southport",
    title: "Dog-Friendly Pubs in Southport and Birkdale",
    excerpt:
      "Taking your four-legged friend to Southport? These pubs and bars welcome dogs.",
    categorySlug: "food-drink",
    image: "/images/categories/bars-nightlife.webp",
    date: "12 Feb 2026",
  },
  // Where to Stay
  {
    slug: "where-to-stay-open-championship-2026",
    title: "Where to Stay for The Open Championship 2026",
    excerpt:
      "Royal Birkdale hosts golf's greatest major this July. Our guide to hotels and accommodation, and why you need to book now.",
    categorySlug: "where-to-stay",
    image: "/images/blog-hero.jpg",
    date: "10 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "best-bnbs-southport",
    title: "B&Bs and Guest Houses in Southport",
    excerpt:
      "Looking for something more personal than a hotel? Southport has a range of B&Bs and guest houses, from Victorian townhouses to coastal retreats.",
    categorySlug: "where-to-stay",
    image: "/images/categories/hotels.webp",
    date: "8 Feb 2026",
  },
  // Things to Do
  {
    slug: "things-to-do-rainy-day-southport",
    title: "Things to Do in Southport on a Rainy Day",
    excerpt:
      "The British weather doesn't always cooperate, but Southport has plenty to offer indoors, from the Atkinson to Silcock's Funland.",
    categorySlug: "things-to-do",
    image: "/images/categories/attractions.webp",
    date: "5 Feb 2026",
  },
  {
    slug: "southport-with-kids-full-guide",
    title: "Southport with Kids: The Complete Family Guide",
    excerpt:
      "Southport is one of the best seaside destinations for families. Here's everything you need to know: beaches, rides, parks, and where to eat.",
    categorySlug: "things-to-do",
    image: "/images/categories/activities.webp",
    date: "3 Feb 2026",
  },
  // Outdoors
  {
    slug: "southport-hidden-gems",
    title: "10 Southport Places Visitors Often Miss",
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
    title: "Beachcombing at Ainsdale: What We Found on a Winter Morning",
    excerpt:
      "Mermaid's purses, two species of jellyfish, a whelk egg mass, and a razor clam. One winter morning at Ainsdale beach. Here's what it all was.",
    categorySlug: "outdoors",
    image: "/images/blog/ainsdale/ainsdale-beach-dunes-sea-view.webp",
    date: "4 Mar 2026",
  },
  // Golf
  {
    slug: "pubs-near-royal-birkdale-open-2026",
    title: "Pubs Near Royal Birkdale for The Open 2026",
    excerpt:
      "Where to drink during Open week: from Birkdale village pubs to town centre options. A local's guide.",
    categorySlug: "food-drink",
    image: "/images/blog-pubs.jpg",
    date: "17 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "getting-to-royal-birkdale-open-2026",
    title: "Getting to Royal Birkdale for The Open 2026: Full Transport Guide",
    excerpt:
      "Don't drive. Seriously. Here's how to get to Royal Birkdale by train, shuttle, taxi, and on foot. Everything you need to arrive without the stress.",
    categorySlug: "getting-around",
    image: "/images/categories/transport.webp",
    date: "18 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "royal-birkdale-guide-the-open",
    title: "Royal Birkdale: What to Know Before The Open 2026",
    excerpt:
      "Royal Birkdale hosted the 154th Open Championship in July 2026. Our guide to the course, tickets and planning a visit, kept for reference.",
    categorySlug: "golf",
    image: "/images/open-2026.webp",
    date: "7 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "best-golf-courses-southport",
    title: "Golf Courses Near Southport",
    excerpt:
      "Southport is one of England's premier golfing destinations, from Royal Birkdale to Hillside and Southport & Ainsdale. Here's your guide.",
    categorySlug: "golf",
    image: "/images/categories/golf.webp",
    date: "2 Feb 2026",
  },
  // Shopping
  {
    slug: "best-independent-shops-lord-street",
    title: "Independent Shops on Lord Street",
    excerpt:
      "Lord Street is one of England's most beautiful Victorian boulevards, lined with independent boutiques, galleries, and specialty shops. Here's where to go.",
    categorySlug: "shopping",
    image: "/images/categories/shopping.webp",
    date: "4 Feb 2026",
  },
  // Bars & Nightlife
  {
    slug: "best-bars-southport-lord-street",
    title: "Bars on Lord Street Southport",
    excerpt:
      "Lord Street isn't just for shopping: Southport's main boulevard is home to many of the town's bars. Here's where to find them.",
    categorySlug: "bars-nightlife",
    image: "/images/blog-pubs.jpg",
    date: "11 Feb 2026",
  },
  // Wellness
  {
    slug: "best-spas-southport",
    title: "Spas and Wellness Retreats in Southport",
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
      "Marine Lake is one of the UK's largest man-made lakes, and it's right in the heart of Southport. Here's how to make the most of it.",
    categorySlug: "activities",
    image: "/images/categories/beaches-parks.webp",
    date: "9 Feb 2026",
  },
  // Property
  {
    slug: "southport-house-prices-by-postcode",
    title: "Southport House Prices by Postcode: What's Actually Selling and What It Costs",
    excerpt:
      "We've mapped every Land Registry sale in PR8 and PR9 over the last three years: 10 postcode sectors, hundreds of transactions, real prices. Here's what Southport property actually looks like.",
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
      "106 verified car parks within 12km of Southport town centre: official, unofficial, free, paid, and a few that surprised us. Here's what we found.",
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
      "If you only have a weekend in Southport, here's exactly how to spend it, from Friday night dinner to Sunday afternoon on the beach.",
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
      "From Lightport to The Open Championship and the Flower Show: 2026 is the biggest year in Southport's recent history. Here's everything in your diary.",
    categorySlug: "events",
    image: "/images/mlec.webp",
    date: "16 Feb 2026",
    eventEndDate: "2026-12-31",
  },

  // ── New posts: Open 2026 cluster ──────────────────────────────────────────
  {
    slug: "open-championship-2026-tickets-guide",
    title: "How to Get Tickets for The Open Championship 2026",
    excerpt:
      "Practice rounds, championship days, hospitality packages: everything you need to know about buying Open 2026 tickets, what they cost, and what you get for your money.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-tickets-guide.webp",
    date: "19 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "what-to-bring-open-championship-2026",
    title: "What to Pack for The Open Championship 2026",
    excerpt:
      "The official restricted items list, Terry's personal packing checklist, and what to wear when you're spending a full day on a links course in Lancashire in July.",
    categorySlug: "golf",
    image: "/images/blog/what-to-bring-open-championship-2026.webp",
    date: "19 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "open-championship-2026-spectator-guide",
    title: "First-Timer's Guide to Watching The Open Championship",
    excerpt:
      "Never been to The Open before? Here's everything you need: how the day works, where to stand, how to follow the action, and how not to make a fool of yourself.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-spectator-guide.webp",
    date: "19 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "restaurants-open-week-southport-2026",
    title: "Where to Eat in Southport During Open Week 2026",
    excerpt:
      "Open week means 40,000 extra people wanting a table. Here's where to eat, when to book, and which restaurants to book when Southport is at full capacity.",
    categorySlug: "food-drink",
    image: "/images/blog/restaurants-open-week-southport-2026.webp",
    date: "19 Feb 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "open-championship-2026-day-by-day",
    title: "The Open 2026: What's On Each Day at Royal Birkdale",
    excerpt:
      "A day-by-day breakdown: practice rounds Monday to Wednesday, championship rounds Thursday to Sunday, what to expect from each day, and which is worth attending most.",
    categorySlug: "golf",
    image: "/images/blog/open-championship-2026-day-by-day.webp",
    date: "19 Feb 2026",
    eventEndDate: "2026-07-19",
  },

  // ── New posts: Evergreen gaps ─────────────────────────────────────────────
  {
    slug: "best-cafes-southport",
    title: "Cafes and Coffee Shops in Southport",
    excerpt:
      "Independent coffee shops, tea rooms, and the spots where Southport locals go for a flat white. Terry's guide.",
    categorySlug: "food-drink",
    image: "/images/blog/best-cafes-southport.webp",
    date: "19 Feb 2026",
    canonicalUrl: "https://www.southportguide.co.uk/guides/best-cafes-southport",
  },
  {
    slug: "best-brunch-southport",
    title: "Brunch in Southport: Where to Go",
    excerpt:
      "Weekend brunch in Southport: where to go for eggs, toast and flat whites.",
    categorySlug: "food-drink",
    image: "/images/blog/best-brunch-southport.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "southport-pier-guide",
    title: "Southport Pier: The Complete Guide",
    excerpt:
      "England's second-longest pier has been closed since December 2022 while it is restored. Its history, what was on it, and where to check for reopening news.",
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
    eventEndDate: "2026-08-23",
  },
  {
    slug: "southport-vs-blackpool",
    title: "Southport vs Blackpool: Which Should You Visit?",
    excerpt:
      "Both Lancashire seaside towns. Very different experiences. Terry gives the honest comparison, and has a clear view on which one wins.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-vs-blackpool.webp",
    date: "19 Feb 2026",
  },

  // ── New posts: Content gap closers ────────────────────────────────────────
  {
    slug: "best-indian-restaurants-southport",
    title: "Indian Restaurants in Southport",
    excerpt:
      "Southport has a proper curry scene, most of it clustered around the town centre and Lord Street. Terry's guide to the curry scene.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "best-italian-restaurants-southport",
    title: "Italian Restaurants in Southport",
    excerpt:
      "From Lord Street trattorias to neighbourhood Italian joints, Here's a guide to Italian food in Southport.",
    categorySlug: "food-drink",
    image: "/images/categories/restaurants.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "watersports-southport",
    title: "Watersports in Southport: The Complete Guide",
    excerpt:
      "Marine Lake, the Sefton Coast, and Crosby Lakeside: Southport's watersports scene is better than most people expect. Wakeboarding, sailing, kayaking, and more.",
    categorySlug: "activities",
    image: "/images/categories/beaches-parks.webp",
    date: "19 Feb 2026",
  },
  {
    slug: "cocktail-bars-southport",
    title: "Cocktail Bars in Southport",
    excerpt:
      "Where to go for a cocktail on Lord Street and beyond, from craft cocktails to classic pours.",
    categorySlug: "bars-nightlife",
    image: "/images/categories/bars-nightlife.webp",
    date: "19 Feb 2026",
  },
  // Local Guides
  {
    slug: "churchtown-botanic-gardens-crocuses",
    title: "The Crocus Display at Churchtown Botanic Gardens Is On Right Now",
    excerpt:
      "Every year around late February the slope under the trees at Churchtown Botanic Gardens fills with purple and white crocuses. Free to visit, ten minutes from town.",
    categorySlug: "local-guides",
    image: "/images/blog/churchtown-botanic-crocuses-carpet.jpg",
    date: "02 Mar 2026",
    author: "damian",
  },
  // March 2026 — keyword gap closers
  {
    slug: "afternoon-tea-southport",
    title: "Afternoon Tea in Southport",
    excerpt:
      "The Scarisbrick, The Vincent and others. Terry's guide to afternoon tea in Southport: where to go, what to book ahead for, and what to expect.",
    categorySlug: "food-drink",
    image: "/images/blog/afternoon-tea-southport.webp",
    date: "14 Mar 2026",
  },
  {
    slug: "splash-world-southport",
    title: "Splash World Southport: What to Expect",
    excerpt:
      "Indoor waterpark, wave machine, flumes, and a toddler pool: Splash World is Southport's all-weather family option. What's actually there, prices, and when to go.",
    categorySlug: "things-to-do",
    image: "/images/blog/splash-world-southport.webp",
    date: "14 Mar 2026",
  },
  {
    slug: "atkinson-southport",
    title: "The Atkinson Southport: Gallery, Theatre and What to Expect",
    excerpt:
      "Free gallery and museum on Lord Street, a theatre programme and a café.",
    categorySlug: "things-to-do",
    image: "/images/blog/atkinson-southport.webp",
    date: "15 Mar 2026",
  },
  {
    slug: "marine-lake-events-centre-southport",
    title: "The Marine Lake Events Centre (MLEC): What Southport is Building",
    excerpt:
      "A £106m events centre on Marine Lake, due to be built by winter 2028, with an intended opening in spring 2029. What MLEC is and where the build stands.",
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
      "House prices, schools, commute times, what to eat and where to drink. A genuinely honest look at what it's like to live in Birkdale. One of Southport's most sought-after postcodes, and for good reason.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/birkdale.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "living-in-churchtown-southport",
    title: "Living in Churchtown, Southport: An Honest Guide to PR9 9",
    excerpt:
      "Churchtown is the old village at the north end of Southport, and it's the bit most people don't know about. Quiet streets, Botanic Gardens, a handful of good pubs, and house prices that still feel reasonable. Here's what it's actually like.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/churchtown.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "living-in-ainsdale-southport",
    title: "Living in Ainsdale, Southport: What You Need to Know About PR8 3",
    excerpt:
      "Ainsdale sits between Southport and Formby: its own village feel, a decent beach, National Trust land, and a commuter-friendly train line. House prices and everything else you'd want to know before you move.",
    categorySlug: "local-guides",
    image: "/images/neighbourhoods/ainsdale.webp",
    date: "19 Mar 2026",
  },
  {
    slug: "should-i-buy-in-southport-2026",
    title: "Should I Buy in Southport in 2026? An Honest Assessment",
    excerpt:
      "MLEC is on the way. House prices are moving. Here's a straightforward, data-backed look at whether buying in Southport right now makes sense, and which postcodes are worth watching.",
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
    title: "The SouthportGuide Business Hub Is in Final Testing. Here Is What It Means for You",
    excerpt:
      "A free business dashboard for every Southport business. Real analytics, a weekly performance email, and full listing control. Try the demo today and register to claim your spot.",
    categorySlug: "for-business",
    image: "/images/blog/southport-business-hub.jpg",
    date: "26 Feb 2026",
    author: "damian",
  },
  {
    slug: "southport-market-guide",
    title: "Southport Market: The Guide to Market Street",
    excerpt:
      "Southport Market on Market Street has street food, independent traders, coffee and a bar. Here's what it is, how it works, and when to go.",
    categorySlug: "local-guides",
    image: "/images/blog/southport-market-guide.jpg",
    date: "17 Mar 2026",
  },
  {
    slug: "easter-things-to-do-southport-2026",
    title: "Easter in Southport 2026: What's Worth Your Time",
    excerpt:
      "Easter weekend in Southport means the season is starting. The beach is back, the pier is closed for restoration, the Botanic Gardens have the crocuses out, and the town actually feels alive again. Here's what to do with the bank holiday.",
    categorySlug: "events",
    image: "/images/blog/easter-southport.jpg",
    date: "18 Mar 2026",
    eventEndDate: "2026-04-06",
  },
  {
    slug: "best-sunday-lunch-southport",
    title: "Sunday Lunch in Southport: Where to Go",
    excerpt:
      "Sunday lunch in Southport is worth doing properly. Here are the pubs and restaurants that serve it, and what to know before you book.",
    categorySlug: "food-drink",
    image: "/images/blog/sunday-lunch-southport.jpg",
    date: "19 Mar 2026",
  },

  // ── 2026 Events cluster ──────────────────────────────────────────────────

  // Fireworks Championship
  {
    slug: "southport-fireworks-championship-explained",
    title: "How the British Musical Fireworks Championship Works. It's Not Just a Display",
    excerpt:
      "Most people don't realise the Southport fireworks is a competition. Teams are judged. Every burst is choreographed. Once you understand the format, you watch it completely differently.",
    categorySlug: "events",
    image: "/images/southport-fireworks-championship.webp",
    date: "26 Mar 2026",
  },
  {
    slug: "southport-september-2026-events",
    title: "Southport in September 2026: What's On and What to Book Now",
    excerpt:
      "September is quieter than summer but it has the best event of the year: the British Musical Fireworks Championship. Here's the full picture of what's happening in Southport this September.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-september-2026.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-09-30",
  },

  // Comedy Festival
  {
    slug: "southport-comedy-festival-2026-lineup",
    title: "Southport Comedy Festival 2026: Lineup, Why It Sells Out, and How to Book",
    excerpt:
      "15th year. 17 nights. A luxury heated marquee in Victoria Park. In 2025, nine shows sold out. Here's who's confirmed for 2026 and how to get tickets before the good nights are gone.",
    categorySlug: "events",
    image: "/images/blog/blog-comedy-lineup.webp",
    date: "26 Mar 2026",
    eventEndDate: "2026-10-18",
  },
  {
    slug: "victoria-park-southport-events-2026",
    title: "Victoria Park Southport: Every Major Event Happening There in 2026",
    excerpt:
      "Flower Show, Fireworks Championship, Comedy Festival, Sausage & Cider Festival. More major events happen in Victoria Park than most people realise. Here's the full 2026 calendar.",
    categorySlug: "events",
    image: "/images/blog/blog-victoria-park-events.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-12-31",
  },

  // Armed Forces Festival
  {
    slug: "southport-june-2026-guide",
    title: "Southport in June 2026: Armed Forces Weekend and Everything Else",
    excerpt:
      "June 2026 is a big month in Southport. The Armed Forces Festival on 27–28 June is the headline act, but the whole month has plenty going on. Here's how to make the most of it.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-june-2026.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-06-30",
  },

  // Sausage & Cider Festival
  // ── April 2026 posts ──────────────────────────────────────────────────────
  {
    slug: "easter-weekend-southport-2026",
    title: "Easter Weekend in Southport 2026: What to Do, Where to Eat, What's On",
    excerpt: "The beach, the Botanic Gardens, Southport Market, the Pier. Here's how I'm spending Easter weekend in Southport with four kids and a bulldog.",
    categorySlug: "events",
    image: "/images/blog/blog-easter-southport.jpg",
    date: "3 Apr 2026",
    eventEndDate: "2026-04-06",
  },
  {
    slug: "southport-marine-lake-seafront-walk",
    title: "Southport Marine Lake and Seafront Walk: The Local's Complete Guide",
    excerpt: "The Marine Lake is one of Southport's genuinely great things and most visitors barely notice it. Here's the full loop, what to stop for, and when to go.",
    categorySlug: "outdoors",
    image: "/images/blog/blog-marine-lake-walk.jpg",
    date: "3 Apr 2026",
    featured: true,
  },
  {
    slug: "getting-to-the-open-2026-transport-parking",
    title: "Getting to The Open 2026: Transport, Parking, and What Not to Do",
    excerpt: "I live three miles from Royal Birkdale. I've been to Open weeks before. Here's the honest guide to getting there without ruining the day before you even arrive.",
    categorySlug: "golf",
    image: "/images/blog/blog-birkdale-station-real.jpg",
    date: "4 Apr 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-sausage-cider-festival-which-session",
    title: "Southport Sausage & Cider Festival 2026: Afternoon or Evening Session?",
    excerpt:
      "The festival runs in two sessions on 18 April. The afternoon is better for food and families. The evening is livelier. I'll tell you which one to book and what to expect from each.",
    categorySlug: "events",
    image: "/images/blog/blog-sausage-cider-fun.webp",
    date: "30 Mar 2026",
    eventEndDate: "2026-04-18",
    canonicalUrl: "https://www.southportguide.co.uk/guides/southport-sausage-cider-festival",
  },
  {
    slug: "southport-spring-events-2026",
    title: "Things to Do in Southport in Spring 2026: April and May Events",
    excerpt:
      "Spring 2026 is unexpectedly packed. Cristal Palace on Lord Street in April. Big Top Festival in May. Sausage & Cider Festival. Easter. Here's how the season shapes up.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-spring-april.webp",
    date: "26 Mar 2026",
    eventEndDate: "2026-05-31",
  },

  // Year of Culture
  {
    slug: "cristal-palace-lord-street-southport-2026",
    title: "Cristal Palace on Lord Street: What to Expect from Southport's Most Spectacular Event",
    excerpt:
      "A 15-metre flying chandelier. Lord Street as an open-air ballroom. Aerial performers, live music, thousands watching from the pavement. This is Cristal Palace by Transe Express: 3–4 April 2026.",
    categorySlug: "events",
    image: "/images/blog/blog-cristal-palace.webp",
    date: "26 Mar 2026",
    eventEndDate: "2026-04-04",
  },
  {
    slug: "southport-2026-elegantly-eccentric-explained",
    title: "Southport 2026: Elegantly Eccentric. What Is It and Why Does It Matter?",
    excerpt:
      "The biggest year of culture in Southport's recent history. Four brand-new events backed by the Liverpool City Region. Here's what's happening, when, and why it matters for the town's future.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-culture.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-12-31",
  },

  // Open Championship
  {
    slug: "open-2026-southport-day-by-day",
    title: "Open Week in Southport 2026: A Day-by-Day Visitor Guide",
    excerpt:
      "If you're visiting Southport during Open week, you need a plan. The town is genuinely transformed. Here's how to make the most of every day from Tuesday 14 to Sunday 19 July.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-week-southport.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "open-2026-southport-without-tickets",
    title: "The Open 2026 in Southport: What to Do If You Don't Have Tickets",
    excerpt:
      "Tickets are scarce and the town fills up anyway. Here's what you can actually do in Southport during Open week without setting foot inside Royal Birkdale.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-2026-no-tickets.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-07-19",
  },

  // Flower Show
  {
    slug: "southport-flower-show-first-timers-guide-2026",
    title: "Southport Flower Show 2026: First Timer's Complete Guide",
    excerpt:
      "Never been to Southport Flower Show before? Here's exactly what to expect: which gate to use, what order to do it in, how to avoid the queues, and what's actually worth your time.",
    categorySlug: "events",
    image: "/images/blog/blog-flower-show-guide.webp",
    date: "26 Mar 2026",
    eventEndDate: "2026-08-23",
  },
  {
    slug: "southport-august-2026-guide",
    title: "August in Southport 2026: Flower Show, Air Show and the Most Events in a Single Month",
    excerpt:
      "Flower Show 20–23 August. Air Show 29–30 August. They're 9 days apart. I've lived here 41 years and 2026 is going to be the busiest August in Southport's recent memory. Here's how to plan it.",
    categorySlug: "events",
    image: "/images/blog/blog-august-southport.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-08-31",
  },

  // Air Show
  {
    slug: "southport-air-show-best-viewing-spots-2026",
    title: "Best Viewing Spots for Southport Air Show 2026: Where to Actually Stand",
    excerpt:
      "100,000+ people turn up for the Southport Air Show. Some will stand in the wrong place and see half the display. Here's where the locals go, including the spots most visitors miss.",
    categorySlug: "events",
    image: "/images/blog/blog-airshow-crowds.webp",
    date: "29 Mar 2026",
    eventEndDate: "2026-08-30",
  },
  {
    slug: "southport-august-bank-holiday-2026",
    title: "Southport Bank Holiday Weekend August 2026: How to Do It Properly",
    excerpt:
      "The August Bank Holiday this year is Air Show weekend. If you haven't planned ahead, parking will be a nightmare and the seafront will be rammed. Here's how to do it without the stress.",
    categorySlug: "events",
    image: "/images/blog/blog-august-bank-holiday-southport.webp",
    date: "25 Mar 2026",
    eventEndDate: "2026-08-31",
  },
  {
    slug: "gemini-lounge-lord-street",
    title: "Gemini Lounge, Lord Street: The Old Bank Has a New Purpose",
    excerpt:
      "Southport's former NatWest bank on Lord Street is now a cocktail bar and restaurant. Here's what it offers.",
    categorySlug: "food-drink",
    image: "/images/blog/gemini-lounge-lord-street.jpg",
    date: "13 Apr 2026",
    featured: true,
  },
  {
    slug: "cristal-palace-southport-2026",
    title: "Cristal Palace in Southport: What It Was Actually Like",
    excerpt:
      "36 performers, a 12-metre chandelier, and two nights on Lord Street. I took the kids on Friday. Here's what Cristal Palace was like in person, and why it's the best free event Southport has put on in years.",
    categorySlug: "events",
    image: "/images/blog/blog-cristal-palace.webp",
    date: "12 Apr 2026",
  },
  {
    slug: "blackpool-or-southport-day-out",
    title: "Blackpool or Southport for a Day Out? An Honest Answer from Someone Who Lives Here",
    excerpt:
      "People ask me this a lot. I've lived in Southport for 41 years and I've been to Blackpool plenty of times. Here's a straight comparison. No promotional fluff, no bias. Just what each place actually does well.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-blackpool-southport-daytrip.jpg",
    date: "2 Apr 2026",
  },
  {
    slug: "blackpool-open-week-add-southport",
    title: "Staying Near Blackpool for The Open? Add Southport to the Itinerary",
    excerpt:
      "Some Open visitors are staying in Blackpool and driving to Royal Birkdale. Makes sense. Accommodation near the course is almost gone. Here's what to do with the rest of your time in the area.",
    categorySlug: "golf",
    image: "/images/blog/blog-blackpool-open-southport.jpg",
    date: "2 Apr 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "big-top-festival-southport-2026-what-to-expect",
    title: "Big Top Festival Southport 2026: What to Expect This Weekend",
    excerpt:
      "Circa and Gandini Juggling are in town this Bank Holiday weekend. Free outdoor shows and ticketed indoor performances across the town centre. Here's what's on, when, and how to make the most of it.",
    categorySlug: "events",
    image: "/images/blog/blog-big-top-festival-2026.jpg",
    date: "1 May 2026",
    eventEndDate: "2026-05-03",
  },
  {
    slug: "southport-beer-week-2026-guide",
    title: "Southport Beer Week 2026: The Preview",
    excerpt:
      "Six days, 18 pubs, 90+ beers and a free ale trail stamp card. Beer Week runs 20–25 May and it's the best week to visit Southport if you like a proper drink. Here's the breakdown.",
    categorySlug: "bars-nightlife",
    image: "/images/blog/blog-beer-week-southport-2026.jpg",
    date: "1 May 2026",
    eventEndDate: "2026-05-25",
  },
  {
    slug: "best-hotels-southport-2026",
    title: "Hotels in Southport 2026: Where to Stay and What to Pay",
    excerpt:
      "From The Scarisbrick and Vincent on Lord Street to B&Bs in Birkdale and budget chains near Ocean Plaza. What each one offers and what to pay.",
    categorySlug: "where-to-stay",
    image: "/images/blog/blog-hotels-southport-2026.jpg",
    date: "1 May 2026",
  },
  {
    slug: "the-open-2026-park-and-ride-transport-guide",
    title: "The Open 2026: Park and Ride, Trains and Getting to Royal Birkdale Without the Stress",
    excerpt:
      "Don't drive to the course. There are road closures, no parking near the club, and Birkdale's residential streets are enforcement-controlled all week. Here's the sensible way to get there.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-2026-transport.jpg",
    date: "1 May 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "things-to-do-southport-may-2026",
    title: "Things to Do in Southport in May 2026",
    excerpt:
      "Big Top Festival this weekend, Beer Week on the 20th, Food and Drink Festival at the end of the month. May is one of the better months to visit. Here's the full rundown.",
    categorySlug: "events",
    image: "/images/blog/blog-southport-may-2026.jpg",
    date: "1 May 2026",
    eventEndDate: "2026-05-31",
  },
  {
    slug: "southport-food-and-drink-festival-2026",
    title: "Southport Food and Drink Festival 2026: What to Expect",
    excerpt:
      "Bank Holiday weekend, May 29-31. Victoria Park fills up with food stalls, craft producers and live music. I've been most years. Here's the guide to what's on.",
    categorySlug: "events",
    image: "/images/blog/blog-food-festival-southport-2026.jpg",
    date: "7 May 2026",
    eventEndDate: "2026-05-31",
    canonicalUrl: "https://www.southportguide.co.uk/guides/southport-food-drink-festival-2026",
  },
  {
    slug: "where-to-watch-the-open-2026-southport-pubs",
    title: "Where to Watch The Open 2026 in Southport: Pubs With Screens",
    excerpt:
      "Not everyone has a ticket. The Open runs 12-19 July at Royal Birkdale and if you're in Southport that week you'll want somewhere to watch the coverage. Here's where to go.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-southport-pubs.jpg",
    date: "7 May 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-fish-and-chips-guide",
    title: "Southport Fish and Chips: The Local Guide",
    excerpt: "I've eaten fish and chips in this town for 41 years. Here's where to go, what to order, and the one thing most visitors get wrong.",
    categorySlug: "food-drink",
    image: "/images/blog/blog-fish-chips-southport.jpg",
    date: "17 May 2026",
  },
  {
    slug: "southport-rainy-day-guide",
    title: "What to Do in Southport When It Rains: Terry's Honest Plan",
    excerpt: "It rains in the North West. This is not news. Here's what actually works for a day in Southport when the weather goes wrong.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-rainy-day-southport.jpg",
    date: "18 May 2026",
  },
  {
    slug: "open-2026-southport-ten-weeks-out",
    title: "The Open 2026: Ten Weeks Out. What Southport Looks Like Right Now.",
    excerpt:
      "The Open Championship is at Royal Birkdale on 12 July. We're ten weeks out and the bookings are flooding in. Here's the honest state of play: what's gone, what's left, and what to expect.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-ten-weeks-southport.jpg",
    date: "10 May 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-restaurants-open-week-2026",
    title: "Eating in Southport During Open Week: Book Now or You Won't Eat Well",
    excerpt:
      "Open week in Southport means the restaurants are full. Here's where to book and what to expect.",
    categorySlug: "restaurants",
    image: "/images/blog/blog-southport-restaurants-open-week.jpg",
    date: "11 May 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-in-may-2026",
    title: "Southport in May: What the Town Is Like Right Now",
    excerpt:
      "May is when Southport properly wakes up. The beach fills out, the events calendar kicks off, and this year there's an extra energy in the town with The Open ten weeks away. Here's what it actually looks like right now.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-may-2026.jpg",
    date: "12 May 2026",
    eventEndDate: "2026-05-31",
  },
  {
    slug: "southport-half-term-may-2026",
    title: "Southport Half-Term May 2026: What to Do with the Kids",
    excerpt:
      "Late May half-term is one of the better weeks to bring the kids to Southport. The beach is accessible, the weather is usually decent, and there's enough going on that you won't hear 'I'm bored' more than twice. Here's what actually works.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-halfterm-may-2026.jpg",
    date: "18 May 2026",
    eventEndDate: "2026-05-31",
  },
  {
    slug: "southport-food-drink-festival-2026-what-to-know",
    title: "Southport Food and Drink Festival 2026: Eleven Days to Go",
    excerpt:
      "Victoria Park, Bank Holiday weekend, May 29 to 31. This is the one that actually fills up. Here's what to expect, what to book in advance, and how not to spend the whole afternoon queuing for a pulled pork bun.",
    categorySlug: "events",
    image: "/images/blog/blog-food-festival-countdown-2026.jpg",
    date: "19 May 2026",
    eventEndDate: "2026-05-31",
    canonicalUrl: "https://www.southportguide.co.uk/guides/southport-food-drink-festival-2026",
  },
  {
    slug: "the-open-2026-eight-weeks-out",
    title: "The Open 2026: Eight Weeks Out. What's Still Bookable in Southport.",
    excerpt:
      "Royal Birkdale, 12 to 19 July. Eight weeks out and the town is almost fully booked. Here's the honest picture of what accommodation, restaurants and transport options are still available, and what to do if you haven't planned yet.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-8-weeks-2026.jpg",
    date: "20 May 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-armed-forces-festival-2026-guide",
    title: "Southport Armed Forces Festival 2026: What to Expect and Why This One Is Different",
    excerpt:
      "27–28 June 2026, free, town-wide, on the Promenade. Southport has since been announced as host of the national Armed Forces Day on Saturday 26 June 2027.",
    categorySlug: "events",
    image: "/images/blog/blog-armed-forces-day-flag.jpg",
    date: "20 May 2026",
    eventEndDate: "2026-06-28",
  },
  {
    slug: "southport-food-drink-festival-this-weekend-2026",
    title: "Southport Food and Drink Festival Is On This Weekend: What to Know Before You Go",
    excerpt:
      "It starts tomorrow. Victoria Park, May 29 to 31. 150 traders, street food, craft beer, live music. If you're planning to go, here's everything you need to know about parking, what to bring, and what to eat first.",
    categorySlug: "events",
    image: "/images/blog/blog-food-festival-this-weekend.jpg",
    date: "28 May 2026",
    eventEndDate: "2026-05-31",
    canonicalUrl: "https://www.southportguide.co.uk/guides/southport-food-drink-festival-2026",
  },
  {
    slug: "southport-in-june-2026",
    title: "Southport in June 2026: What's On, What's Worth It, and What to Book Now",
    excerpt:
      "June is a solid month in Southport. The Open is six weeks away, the Armed Forces Festival is at the end of the month, and the weather is finally starting to behave. Here's what's worth planning for.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-june-2026.webp",
    date: "28 May 2026",
    eventEndDate: "2026-06-30",
  },
  {
    slug: "best-ice-cream-southport",
    title: "Ice Cream in Southport: Where to Go on a Hot Day",
    excerpt:
      "Southport does ice cream properly. From the seafront kiosks to the proper parlours, here is where I actually go when the sun comes out and the kids start asking.",
    categorySlug: "food-drink",
    image: "/images/blog/blog-southport-ice-cream.jpg",
    date: "1 Jun 2026",
    featured: true,
  },
  {
    slug: "southport-summer-holidays-2026",
    title: "Southport Summer Holidays 2026: What to Plan For Six Weeks with Kids",
    excerpt:
      "Schools break up around 22 July. Six weeks is a long time. Here is the honest guide to keeping kids entertained in Southport through August, from someone who has done it with four of them.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-summer-holidays-kids.jpg",
    date: "1 Jun 2026",
    eventEndDate: "2026-08-31",
  },
  {
    slug: "cottages-near-southport-the-open-2026",
    title: "Cottages Near Southport for The Open 2026: What's Still Available and Where to Look",
    excerpt:
      "Hotels near Royal Birkdale are almost all gone. Self-catering cottages are a different story. If you're coming for The Open (12–19 July) and haven't sorted accommodation yet, this is where to focus your search.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-cottages-sefton.jpg",
    date: "4 Jun 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "fathers-day-southport-2026",
    title: "Father's Day in Southport 2026: Where to Go, Where to Eat, and What Not to Leave to Chance",
    excerpt:
      "Father's Day is Sunday 15 June. Plan ahead: leave it too late and the tables are gone. Here is what Terry would actually do.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-fathers-day-restaurant.webp",
    date: "10 Jun 2026",
    eventEndDate: "2026-06-21",
  },
  {
    slug: "southport-open-week-for-locals",
    title: "The Open 2026 in Southport: A Practical Guide for People Who Live Here",
    excerpt:
      "The Open is 32 days away. If you live in Southport, here is what to expect: what changes, what gets better, what gets worse, and how to make the most of the biggest week this town has had in years.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-open-watching-links.webp",
    date: "10 Jun 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "birkdale-village-open-week-2026",
    title: "Birkdale Village During The Open 2026: The Local's Guide",
    excerpt:
      "Birkdale village is ten minutes' walk from the Royal Birkdale entrance and most Open visitors barely know it exists. Here's what's there, what to book, and why it's a better base than the town centre.",
    categorySlug: "golf",
    image: "/images/blog/blog-birkdale-village-open-week.jpg",
    date: "5 Jun 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-july-2026-guide",
    title: "Southport in July 2026: The Open, the Summer and What Else Is On",
    excerpt:
      "July 2026 is the biggest month in Southport's recent history. The Open is the headline, but the full month is worth understanding whether you're here for the golf or not.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-southport-july-2026.jpg",
    date: "5 Jun 2026",
    eventEndDate: "2026-07-31",
  },
  {
    slug: "the-open-2026-three-weeks-out",
    title: "The Open 2026: Three Weeks to Go. Here Is What You Still Need to Sort.",
    excerpt:
      "Three weeks. If you have tickets but no accommodation, or accommodation but no plan, this is where to start. What is still available, what you can realistically sort in the next fortnight, and what to accept is gone.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-three-weeks.webp",
    date: "22 Jun 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "southport-marine-lake-summer",
    title: "Southport Marine Lake in Summer: What to Do and When to Go",
    excerpt:
      "Marine Lake is at its best from late June through August. Sailing, paddleboarding, the miniature railway, and the seafront walk. Here is what is there, what it costs, and the honest view on timing.",
    categorySlug: "outdoors",
    image: "/images/blog/blog-southport-seafront-summer.webp",
    date: "22 Jun 2026",
  },
  {
    slug: "getting-around-southport-open-week",
    title: "Getting Around Southport During Open Week: The Practical Guide",
    excerpt:
      "Driving into Southport during Open week is a bad idea. Here is what actually works: the shuttle, the train, taxis, and where parking exists if you genuinely need a car.",
    categorySlug: "getting-around",
    image: "/images/blog/blog-southport-transport-open.webp",
    date: "1 Jul 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "open-2026-ryan-fox-wins-southport",
    title: "Ryan Fox Wins The Open 2026 at Royal Birkdale: What Happened and What It Meant for Southport",
    excerpt: "A 39-year-old New Zealander nobody had down as the favourite sank a 12-foot birdie on the 72nd hole to lift the Claret Jug. Here is what the week was like from the inside.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-2026-ryan-fox.webp",
    date: "19 Jul 2026",
  },
  {
    slug: "open-2026-round-1-southport",
    title: "The Open 2026: Round 1 Has Started. Here Is What Royal Birkdale Is Like Right Now.",
    excerpt: "Round 1 of the 154th Open Championship began this morning at 6:35am. I have been here for three Opens at Royal Birkdale. This is what the town and the course look like when it actually happens.",
    categorySlug: "golf",
    image: "/images/blog/blog-open-round1-southport.webp",
    date: "16 Jul 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "birkdale-village-restaurants-open-week",
    title: "Birkdale Village Restaurants: Where to Eat During Open Week",
    excerpt: "The restaurants in Birkdale village are busier this week than at any other point in the year. Here is what is there, what to book, and walk-in chances.",
    categorySlug: "food-drink",
    image: "/images/blog/blog-birkdale-restaurants.webp",
    date: "14 Jul 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "open-2026-southport-local-view",
    title: "What The Open Does to Southport: A Local's View from the Inside",
    excerpt: "I have lived in Southport through three Opens at Royal Birkdale. The town changes in ways that are hard to describe to someone who has not seen it. Here is what it actually looks like from the inside.",
    categorySlug: "local-guides",
    image: "/images/blog/blog-open-local-view.webp",
    date: "14 Jul 2026",
    eventEndDate: "2026-07-19",
  },
  {
    slug: "lord-street-southport-summer",
    title: "Lord Street in Summer: What Is There and Why It Is Worth Your Time",
    excerpt:
      "Lord Street is the best boulevard in the north of England and most visitors walk one end without seeing the other. Here is what is along it, what to stop at, and what the Victorian glass canopies look like on a good July day.",
    categorySlug: "things-to-do",
    image: "/images/blog/blog-lord-street-summer.webp",
    date: "1 Jul 2026",
  },
  {
    slug: "best-breakfast-southport",
    title: "Breakfast in Southport: Where to Go",
    excerpt: "I have had a lot of breakfasts in this town over four decades. Here is where to go for a full English, coffee and pastries, and how to beat the weekend rush.",
    categorySlug: "food-drink",
    image: "/images/blog/blog-best-breakfast-southport.webp",
    date: "9 Sep 2026",
    featured: true,
  },
  {
    slug: "southport-october-half-term-2026",
    title: "Southport October Half Term 2026: Family Guide to the Week",
    excerpt: "October half term is 26-30 October. Southport has more going on than most families realise. Splash World, the Marine Lake, the market. Here is the honest guide to making the week work.",
    categorySlug: "family",
    image: "/images/blog/blog-southport-october-half-term.webp",
    date: "9 Sep 2026",
    eventEndDate: "2026-10-30",
  },
  {
    slug: "hesketh-arms-southport",
    title: "The Hesketh Arms, Churchtown: A Guide to the Pub",
    excerpt: "The Hesketh Arms is a traditional pub in Churchtown: low ceilings, real ale and a beer garden Frank approves of.",
    categorySlug: "food-drink",
    image: "/images/blog/blog-hesketh-arms-southport.webp",
    date: "21 Aug 2026",
    featured: true,
  },
  {
    slug: "autumn-walks-southport",
    title: "Autumn Walks in Southport: The Best Routes as the Season Changes",
    excerpt: "Late August is when Southport starts to change. The crowds thin, the light softens, and the walks that were too busy in July become genuinely peaceful. Here is where to go and what to expect.",
    categorySlug: "outdoors",
    image: "/images/blog/blog-autumn-walks-southport.webp",
    date: "21 Aug 2026",
  },
  {
    slug: "southport-pier-closure-restoration",
    title: "Is Southport Pier Open? The Closure and £20m Restoration",
    excerpt:
      "Southport Pier has been closed since December 2022. Why it shut, what the £20 million restoration involves, how far the work has got and where to check for updates.",
    categorySlug: "things-to-do",
    image: "/southport-pier.webp",
    heroAlt: "Southport Pier at sunset, before the restoration",
    heroCaption: "Southport Pier before the restoration. The lighting arches and kiosks in this photo have since been removed.",
    date: "11 Nov 2026",
    featured: true,
  },
  {
    slug: "hesketh-park-southport",
    title: "Hesketh Park, Southport: Lake, Gardens and Observatory",
    excerpt:
      "A 12-hectare Victorian park north-east of the town centre, with a lake, a floral clock, a listed conservatory and an observatory. How it came about, what to look for and how to get there.",
    categorySlug: "outdoors",
    image: "/images/blog/blog-autumn-walks-southport.webp",
    heroAlt: "A tarmac path curving between trees in early autumn, with a wooden bench on the grass",
    heroCaption: "An autumn park path, used to illustrate this post. It is not a photo of Hesketh Park.",
    date: "11 Nov 2026",
    featured: true,
  },
  {
    // Sources (11 Nov 2026): the organisers' email to us that evening; southportagriculturalshow.co.uk
    // home, /aboutus/, /tickets/, /whats-on/; ticketquarter.co.uk/Online/article/Southport-Agricultural-Show
    // (venue postcode PR8 1RX); merseyrail.org station pages (Southport, Birkdale); walking distances
    // measured on OpenStreetMap's walking route planner (routing.openstreetmap.de).
    // Images: the show's own logo and Llamapalooza artwork from southportagriculturalshow.co.uk
    // (home page), fetched 11 Nov 2026, resized; credited on the page.
    slug: "southport-agricultural-show-2027",
    title: "Southport Agricultural Show 2027: Dates and What's On",
    excerpt:
      "The first Southport Agricultural Show, 17 and 18 April 2027 at Victoria Park: livestock, local produce and machinery, plus tickets and how to get there.",
    categorySlug: "events",
    image: "/images/agshow/southport-agricultural-show-logo-header.webp",
    heroAlt:
      "The Southport Agricultural Show logo in white on dark blue: an ear of wheat above curved fields in a circle, with the words Southport Agricultural Show, Est. 2027",
    heroCaption: "The show's logo. Image: Southport Agricultural Show",
    date: "11 Nov 2026",
    featured: true,
    eventEndDate: "2027-04-18",
    event: {
      name: "Southport Agricultural Show",
      description:
        "The first Southport Agricultural Show: local produce, modern and vintage machinery, livestock and other animals, demonstrations, exhibits and entertainment over two days at Victoria Park, Southport.",
      startDate: "2027-04-17",
      endDate: "2027-04-18",
      venue: "Victoria Park",
      locality: "Southport",
      postalCode: "PR8 1RX",
      organizer: { name: "Southport Agricultural Show", url: "https://southportagriculturalshow.co.uk" },
      url: "https://southportagriculturalshow.co.uk",
      ticketUrl: "https://ticketquarter.co.uk/Online/article/Southport-Agricultural-Show",
    },
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
