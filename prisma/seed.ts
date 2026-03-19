import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { slug: "restaurants", name: "Restaurants", description: "Best restaurants in Southport", sortOrder: 1 },
  { slug: "hotels", name: "Hotels & Accommodation", description: "Where to stay in Southport", sortOrder: 2 },
  { slug: "bars-nightlife", name: "Bars & Nightlife", description: "Pubs and bars in Southport", sortOrder: 3 },
  { slug: "cafes", name: "Cafes & Tea Rooms", description: "Cafes and coffee shops in Southport", sortOrder: 4 },
  { slug: "attractions", name: "Attractions", description: "Things to see and do in Southport", sortOrder: 5 },
  { slug: "beaches-parks", name: "Beaches & Parks", description: "Beaches and parks in Southport", sortOrder: 6 },
  { slug: "shopping", name: "Shopping", description: "Shops and boutiques in Southport", sortOrder: 7 },
  { slug: "golf", name: "Golf", description: "Golf courses in and around Southport", sortOrder: 8 },
  { slug: "activities", name: "Activities", description: "Tours, rentals and activities", sortOrder: 9 },
  { slug: "wellness", name: "Wellness", description: "Spas and salons in Southport", sortOrder: 10 },
  { slug: "transport", name: "Transport", description: "Taxis, parking and bike hire", sortOrder: 11 },
  { slug: "parking", name: "Parking", description: "Car parks and parking in Southport", sortOrder: 12 },
  { slug: "property-services", name: "Property Services", description: "Estate agents, solicitors and mortgage brokers in Southport", sortOrder: 13 },
];

const BUSINESSES: Array<{
  slug: string;
  name: string;
  categorySlug: string;
  address: string;
  postcode: string;
  phone?: string;
  website?: string;
  shortDescription?: string;
  description?: string;
  priceRange?: string;
  tags?: string[];
  lat?: number;
  lng?: number;
}> = [
  { slug: "the-waterfront-southport", name: "The Waterfront", categorySlug: "restaurants", address: "Promenade, Southport", postcode: "PR8 1QX", phone: "01704 123456", website: "https://example.com", shortDescription: "Seaside dining with views over the Marine Lake.", priceRange: "££" },
  { slug: "bistro-pierre-southport", name: "Bistro Pierre", categorySlug: "restaurants", address: "Unit 5, Southport Market, Eastbank Street", postcode: "PR8 1EJ", phone: "01704 234567", shortDescription: "French-inspired bistro in Southport Market.", priceRange: "££" },
  { slug: "the-athenaeum-southport", name: "The Athenaeum", categorySlug: "restaurants", address: "Lord Street, Southport", postcode: "PR8 1DB", shortDescription: "Brasserie and bar on Lord Street.", priceRange: "£££" },
  {
    slug: "roberto-s-italian",
    name: "Roberto's Italian",
    categorySlug: "restaurants",
    address: "47 Lord Street, Southport",
    postcode: "PR8 1DA",
    shortDescription: "Classic Italian restaurant on Lord Street — good portions, relaxed atmosphere, reliable food.",
    description: "Roberto's is one of those Southport restaurants that's been here a while and consistently delivers. Lord Street location, classic Italian menu — pasta, risotto, grilled meat and fish. The portions are proper and the prices are reasonable for the quality. Relaxed atmosphere that works for families, couples and groups alike.\n\nIf you want straightforward Italian food done well, without any fuss, this is a solid choice. Popular enough that booking at weekends is sensible. Accessible from the main Lord Street car parks on foot.",
    priceRange: "££",
    tags: ["lord-street", "italian", "family-friendly", "book-ahead-weekends"],
    lat: 53.6455,
    lng: -3.0063,
  },
  {
    slug: "limoncello",
    name: "Limoncello",
    categorySlug: "restaurants",
    address: "Liverpool Road, Birkdale, Southport",
    postcode: "PR8 4AT",
    shortDescription: "Popular Italian restaurant in Birkdale Village — consistently good food, worth booking at weekends.",
    description: "Limoncello is in Birkdale Village, which already tells you something. This is the southern end of Southport that most visitors don't find unless they know to look. The restaurant has built a strong local following for good reason — the food is consistently good, the atmosphere is relaxed without being casual, and the menu balances Italian classics with seasonal specials.\n\nIf you're eating in Birkdale, this is the obvious choice. Pasta done properly, decent wine list, friendly service. The kind of place locals book for a regular treat rather than a special occasion — which usually means the quality holds up reliably.\n\nBook ahead at weekends. It fills up. Parking on Liverpool Road or the surrounding streets. Ten minutes from Southport town centre by car.",
    priceRange: "£££",
    tags: ["birkdale", "birkdale-village", "italian", "book-ahead-weekends", "local-favourite"],
    lat: 53.6283,
    lng: -3.0152,
  },
  { slug: "prince-of-wales-hotel", name: "Prince of Wales Hotel", categorySlug: "hotels", address: "Lord Street, Southport", postcode: "PR8 1JS", phone: "01704 536688", website: "https://www.princeofwales-southport.co.uk", shortDescription: "Historic hotel on Lord Street with spa and restaurant.", priceRange: "£££" },
  { slug: "the-bold-hotel", name: "The Bold Hotel", categorySlug: "hotels", address: "601 Lord Street, Southport", postcode: "PR9 0AQ", phone: "01704 533521", shortDescription: "Family-run hotel with bar and restaurant.", priceRange: "££" },
  { slug: "scarisbrick-hotel", name: "Scarisbrick Hotel", categorySlug: "hotels", address: "Lord Street, Southport", postcode: "PR8 1NJ", phone: "01704 534771", shortDescription: "Victorian hotel in the heart of Southport.", priceRange: "£££" },
  { slug: "the-coffee-house-southport", name: "The Coffee House", categorySlug: "cafes", address: "Eastbank Street, Southport", postcode: "PR8 1EJ", shortDescription: "Specialty coffee and light bites.", priceRange: "£" },
  { slug: "palm-court-cafe", name: "Palm Court Café", categorySlug: "cafes", address: "Wayfarers Arcade, Lord Street", postcode: "PR8 1JH", phone: "01704 532123", shortDescription: "Tea room in a Victorian arcade.", priceRange: "£" },
  { slug: "costa-coffee-lord-street", name: "Costa Coffee Lord Street", categorySlug: "cafes", address: "Lord Street, Southport", postcode: "PR8 1DB", shortDescription: "Coffee shop on Southport's main street.", priceRange: "£" },
];

async function main() {
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
    });
  }
  console.log("Seeded categories:", CATEGORIES.length);

  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  const categoryById = new Map(categories.map((c) => [c.slug, c.id]));

  for (const b of BUSINESSES) {
    const categoryId = categoryById.get(b.categorySlug);
    if (!categoryId) throw new Error(`Category not found: ${b.categorySlug}`);
    const { categorySlug, ...rest } = b;
    await prisma.business.upsert({
      where: { slug: b.slug },
      create: { ...rest, categoryId, images: [] },
      update: {
        name: rest.name,
        address: rest.address,
        postcode: rest.postcode,
        phone: rest.phone ?? undefined,
        website: rest.website ?? undefined,
        shortDescription: rest.shortDescription ?? undefined,
        description: rest.description ?? undefined,
        priceRange: rest.priceRange ?? undefined,
        tags: rest.tags ?? undefined,
        lat: rest.lat ?? undefined,
        lng: rest.lng ?? undefined,
      },
    });
  }
  console.log("Seeded businesses:", BUSINESSES.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
