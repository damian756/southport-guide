export const CATEGORIES = [
  { slug: "restaurants", name: "Restaurants", description: "Best restaurants in Southport" },
  { slug: "hotels", name: "Hotels & Accommodation", description: "Where to stay in Southport" },
  { slug: "bars-nightlife", name: "Bars & Nightlife", description: "Pubs and bars in Southport" },
  { slug: "cafes", name: "Cafes & Tea Rooms", description: "Cafes and coffee shops in Southport" },
  { slug: "attractions", name: "Attractions", description: "Things to see and do in Southport" },
  { slug: "beaches-parks", name: "Beaches & Parks", description: "Beaches and parks in Southport" },
  { slug: "shopping", name: "Shopping", description: "Shops and boutiques in Southport" },
  { slug: "golf", name: "Golf", description: "Golf courses in and around Southport" },
  { slug: "activities", name: "Activities", description: "Tours, rentals and activities" },
  { slug: "wellness", name: "Wellness", description: "Spas and salons in Southport" },
  { slug: "transport", name: "Transport", description: "Taxis, parking and bike hire" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function isValidCategory(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}
