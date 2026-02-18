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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  image: string;
  date: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "best-restaurants-southport-2026",
    title: "The Best Restaurants in Southport 2026",
    excerpt:
      "From fine dining on Lord Street to hidden seaside gems, we've rounded up the very best places to eat in Southport right now.",
    category: "Food & Drink",
    categoryColor: "#8B2635",
    image: "/images/categories/restaurants.webp",
    date: "15 Feb 2026",
  },
  {
    slug: "where-to-stay-open-championship-2026",
    title: "Where to Stay for The Open Championship 2026",
    excerpt:
      "Royal Birkdale hosts golf's greatest major this July. Our guide to the best hotels and accommodation — and why you need to book now.",
    category: "The Open 2026",
    categoryColor: "#1A4020",
    image: "/images/open-2026.webp",
    date: "10 Feb 2026",
  },
  {
    slug: "southport-hidden-gems",
    title: "10 Southport Hidden Gems Locals Love",
    excerpt:
      "Beyond the pier and the beach, Southport has a wealth of secret spots. A local's guide to the places visitors rarely find.",
    category: "Local Guides",
    categoryColor: "#1A5C7A",
    image: "/images/categories/beaches-parks.webp",
    date: "5 Feb 2026",
  },
];

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
