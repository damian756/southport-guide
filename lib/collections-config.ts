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
  /** Short Clare-voice intro — 60–100 words, shown above the listings */
  intro: string;
  /** Tags to match (business must have ALL of these) */
  tags: string[];
  /** Category slugs to filter by (business must be in ONE of these) */
  categorySlugs: string[];
  /** Emoji shown in the hero */
  emoji: string;
  /** Sitemap priority */
  priority: number;
}

export const COLLECTIONS: Collection[] = [
  // ── Dog-friendly ──────────────────────────────────────────────────────────
  {
    slug: "dog-friendly-restaurants-southport",
    title: "Dog-Friendly Restaurants in Southport",
    metaDescription:
      "Dog-friendly restaurants in Southport — places that actually mean it, with water bowls outside and dogs welcome inside. Updated local list.",
    intro:
      "Finding a restaurant that genuinely welcomes dogs (rather than just tolerating them on the pavement) takes a bit of research. These are the places in Southport that actually mean it — dogs inside, water bowls, no fuss when you walk in with a muddy spaniel. Worth phoning ahead for evening visits, as capacity can change.",
    tags: ["dog-friendly"],
    categorySlugs: ["restaurants"],
    emoji: "🐾",
    priority: 0.8,
  },
  {
    slug: "dog-friendly-pubs-southport",
    title: "Dog-Friendly Pubs in Southport",
    metaDescription:
      "Dog-friendly pubs in Southport — welcoming dogs inside, with outdoor space and post-walk food worth having. The honest local list.",
    intro:
      "Post-walk pub visits with the dog in tow work much better when you know which pubs are genuinely on board with the idea. These are Southport's most reliably dog-welcoming pubs — water bowls, dogs inside, no side-eye from the bar staff. Best to call ahead on busy weekends.",
    tags: ["dog-friendly"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🐶",
    priority: 0.8,
  },
  {
    slug: "dog-friendly-cafes-southport",
    title: "Dog-Friendly Cafés in Southport",
    metaDescription:
      "Dog-friendly cafés in Southport — independent coffee shops and tea rooms that welcome dogs. Honest local list, water bowls and all.",
    intro:
      "A decent coffee after a beach walk is non-negotiable. These Southport cafés are the ones that put water bowls outside and mean it when they say dogs are welcome — inside, not just chained to a post in the rain. Independents tend to be more accommodating than chains; most of the places here are exactly that.",
    tags: ["dog-friendly"],
    categorySlugs: ["cafes"],
    emoji: "☕",
    priority: 0.75,
  },

  // ── Outdoor seating ──────────────────────────────────────────────────────
  {
    slug: "outdoor-seating-restaurants-southport",
    title: "Restaurants with Outdoor Seating in Southport",
    metaDescription:
      "Restaurants with outdoor seating in Southport — the best places to eat outside when the weather actually plays ball.",
    intro:
      "Southport's outdoor eating scene depends heavily on the weather playing along, which it does sometimes. When it does, these are the restaurants worth booking for a table outside — proper al fresco, not just a couple of chairs on a pavement. Lord Street has some decent options; Birkdale Village has a few more.",
    tags: ["outdoor-seating"],
    categorySlugs: ["restaurants"],
    emoji: "🌤️",
    priority: 0.75,
  },

  // ── Family-friendly ──────────────────────────────────────────────────────
  {
    slug: "family-friendly-restaurants-southport",
    title: "Family-Friendly Restaurants in Southport",
    metaDescription:
      "Family-friendly restaurants in Southport — places with kids' menus, highchairs, and staff who don't visibly panic when children arrive.",
    intro:
      "Family dining in Southport has improved a lot. These are the restaurants that actively cater for families — proper kids' menus, highchairs, and the kind of space where nobody's going to glare at you if your five-year-old drops something. Covers the full range from pizza-and-pasta to slightly more ambitious cooking.",
    tags: ["family-friendly"],
    categorySlugs: ["restaurants"],
    emoji: "👨‍👩‍👧‍👦",
    priority: 0.8,
  },
  {
    slug: "family-friendly-things-to-do-southport",
    title: "Family-Friendly Things to Do in Southport",
    metaDescription:
      "Family-friendly things to do in Southport — activities and attractions worth the effort with kids. Honest, no filler.",
    intro:
      "Southport is genuinely good for families — the beach, Pleasureland, Southport Zoo, the Atkinson. These are the attractions and activities that are actually worth the trip with kids in tow, rather than the ones that look good in a leaflet and disappoint in person. Covers a range of ages and budgets.",
    tags: ["family-friendly"],
    categorySlugs: ["attractions", "activities"],
    emoji: "🎡",
    priority: 0.8,
  },

  // ── Location-based: restaurants ──────────────────────────────────────────
  {
    slug: "lord-street-restaurants-southport",
    title: "Lord Street Restaurants in Southport",
    metaDescription:
      "Restaurants on Lord Street Southport — dining along the Victorian boulevard. The best places to eat on Southport's main street.",
    intro:
      "Lord Street is a mile long and has restaurants scattered all the way along it — some good, some less so. These are the ones actually on or immediately off Lord Street that are worth your time. The street itself is beautiful for a walk between courses, which helps.",
    tags: ["lord-street"],
    categorySlugs: ["restaurants"],
    emoji: "🍽️",
    priority: 0.8,
  },
  {
    slug: "lord-street-cafes-southport",
    title: "Cafés on Lord Street Southport",
    metaDescription:
      "Cafés on Lord Street Southport — coffee shops and tea rooms along the Victorian boulevard. Where to stop for a proper coffee.",
    intro:
      "Lord Street has more cafés than you'd think for a single street — they're tucked into the Victorian arcades and under the glass canopies. These are the ones worth stopping at, from proper espresso to a decent pot of tea. Good for a browse-and-coffee combination if you're spending time on the street.",
    tags: ["lord-street"],
    categorySlugs: ["cafes"],
    emoji: "☕",
    priority: 0.75,
  },
  {
    slug: "birkdale-village-restaurants",
    title: "Birkdale Village Restaurants",
    metaDescription:
      "Restaurants in Birkdale Village Southport — dining on Liverpool Road, two minutes from Royal Birkdale Golf Club. The local favourite.",
    intro:
      "Birkdale Village is where Southport locals tend to eat when they want somewhere decent without going into town. Liverpool Road has a solid cluster of independent restaurants and bars — better quality per square mile than most of the town centre. Worth booking at weekends. Parking is straightforward.",
    tags: ["birkdale"],
    categorySlugs: ["restaurants"],
    emoji: "🍷",
    priority: 0.8,
  },

  // ── Dining style ─────────────────────────────────────────────────────────
  {
    slug: "afternoon-tea-southport",
    title: "Afternoon Tea in Southport",
    metaDescription:
      "Afternoon tea in Southport — the best places for a proper afternoon tea. Hotels, independent tea rooms, and the ones worth booking ahead.",
    intro:
      "Southport has a decent afternoon tea scene — not quite Bath, but better than you'd expect. These are the places doing it properly, with proper sandwiches, scones worth eating, and tea that comes in a pot. The hotel options tend to be the more reliable end of the market. Book ahead at weekends.",
    tags: ["afternoon-tea"],
    categorySlugs: ["restaurants", "cafes", "hotels"],
    emoji: "🫖",
    priority: 0.78,
  },
  {
    slug: "bottomless-brunch-southport",
    title: "Bottomless Brunch in Southport",
    metaDescription:
      "Bottomless brunch in Southport — restaurants and bars offering bottomless brunch deals. What's on, where, and what to expect.",
    intro:
      "Bottomless brunch in Southport is a growing thing — not everywhere offers it, but the places that do are increasingly worth knowing about. Typically weekends only, and booking essential. These are the current options in Southport doing it properly rather than just pouring house prosecco at speed.",
    tags: ["bottomless-brunch"],
    categorySlugs: ["restaurants", "bars-nightlife"],
    emoji: "🥂",
    priority: 0.72,
  },

  // ── Hotels ───────────────────────────────────────────────────────────────
  {
    slug: "hotels-with-parking-southport",
    title: "Hotels with Parking in Southport",
    metaDescription:
      "Hotels with parking in Southport — accommodation with on-site or adjacent parking. Useful for The Open 2026 and peak summer visits.",
    intro:
      "Parking in central Southport can be a hassle on busy weekends, particularly during the Air Show and around The Open 2026. These hotels have their own parking or direct access to nearby car parks — which removes one headache from the stay. Worth confirming parking arrangements when you book.",
    tags: ["parking"],
    categorySlugs: ["hotels"],
    emoji: "🏨",
    priority: 0.8,
  },
  {
    slug: "budget-hotels-southport",
    title: "Budget Hotels in Southport",
    metaDescription:
      "Budget hotels in Southport — affordable accommodation without the premium. Good value places to stay in Southport and nearby.",
    intro:
      "Southport has a solid range of budget accommodation — from mid-market chains to independent guest houses that offer better value than you'd expect. These are the affordable end of the market that are still worth staying in, rather than places where you're just paying for the location. Good for families and short breaks.",
    tags: ["budget"],
    categorySlugs: ["hotels"],
    emoji: "💷",
    priority: 0.78,
  },
  {
    slug: "hotels-near-royal-birkdale",
    title: "Hotels Near Royal Birkdale",
    metaDescription:
      "Hotels near Royal Birkdale Golf Club Southport — accommodation for The Open 2026 and golf visitors. Where to stay near the course.",
    intro:
      "If you're here for The Open 2026 — or just playing Royal Birkdale — where you stay matters more than usual. These hotels are the closest options to Royal Birkdale Golf Club, meaning you can walk to the course or at least avoid the worst of the traffic. Book early; July 2026 availability is already tight.",
    tags: ["birkdale"],
    categorySlugs: ["hotels"],
    emoji: "⛳",
    priority: 0.85,
  },

  // ── Free / budget-friendly ────────────────────────────────────────────────
  {
    slug: "free-things-to-do-southport",
    title: "Free Things to Do in Southport",
    metaDescription:
      "Free things to do in Southport — beaches, parks, parks and attractions that cost nothing. The honest local list.",
    intro:
      "Southport has more free things to do than most seaside towns — the beach is free, the Promenade is free, the Botanic Gardens in Churchtown are free, and the pier is free to walk. These are the attractions, outdoor spaces, and activities in and around Southport that genuinely cost nothing. Good for families on a budget.",
    tags: ["free"],
    categorySlugs: ["attractions", "beaches-parks", "activities"],
    emoji: "🎟️",
    priority: 0.82,
  },

  // ── Bars ─────────────────────────────────────────────────────────────────
  {
    slug: "live-music-bars-southport",
    title: "Live Music Bars in Southport",
    metaDescription:
      "Live music bars in Southport — pubs and bars with regular live music. Where to find a proper night out with live acts.",
    intro:
      "Southport has a decent live music scene concentrated in a handful of bars and venues. These are the ones with regular live acts — usually weekends, sometimes midweek. The quality varies but the best of them are worth making a night of. Worth checking the venue's social media for current listings before you go.",
    tags: ["live-music"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🎸",
    priority: 0.75,
  },
  {
    slug: "late-night-bars-southport",
    title: "Late Night Bars in Southport",
    metaDescription:
      "Late night bars in Southport — bars and venues open past midnight. Where to go for a late drink in Southport.",
    intro:
      "Southport's nightlife is centred on a cluster of bars and clubs around the town centre. These are the late-night options — open past midnight, with the kind of atmosphere that warrants it. The weekend scene is more active than midweek; Friday and Saturday are when these places make sense.",
    tags: ["late-night"],
    categorySlugs: ["bars-nightlife"],
    emoji: "🌙",
    priority: 0.72,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getAllCollectionSlugs(): string[] {
  return COLLECTIONS.map((c) => c.slug);
}
