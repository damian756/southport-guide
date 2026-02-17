import Link from "next/link";
import { Search, Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag, Waves, Dumbbell, Car, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode; description: string }> = {
  restaurants:    { label: "Restaurants",      icon: <Utensils className="w-7 h-7" />,    description: "Where to eat" },
  hotels:         { label: "Hotels & Stays",   icon: <Hotel className="w-7 h-7" />,       description: "Places to stay" },
  "bars-nightlife":{ label: "Bars & Pubs",     icon: <Beer className="w-7 h-7" />,        description: "Drinks & nightlife" },
  cafes:          { label: "Cafes",            icon: <Coffee className="w-7 h-7" />,      description: "Coffee & cake" },
  attractions:    { label: "Attractions",      icon: <MapPin className="w-7 h-7" />,      description: "Things to see" },
  shopping:       { label: "Shopping",         icon: <ShoppingBag className="w-7 h-7" />, description: "Shops & boutiques" },
  golf:           { label: "Golf",             icon: <Flag className="w-7 h-7" />,        description: "Courses & clubs" },
  "beaches-parks":{ label: "Beaches & Parks",  icon: <Waves className="w-7 h-7" />,       description: "Outdoors & nature" },
  wellness:       { label: "Wellness",         icon: <Star className="w-7 h-7" />,        description: "Beauty & fitness" },
  activities:     { label: "Activities",       icon: <Dumbbell className="w-7 h-7" />,    description: "Sport & leisure" },
  transport:      { label: "Transport",        icon: <Car className="w-7 h-7" />,         description: "Getting around" },
};

export default async function Home() {
  // Fetch real category counts and top-rated businesses
  let categoryCounts: Record<string, number> = {};
  let featured: { slug: string; name: string; shortDescription: string | null; rating: number | null; reviewCount: number | null; address: string; category: { slug: string } }[] = [];

  try {
    const cats = await prisma.category.findMany({
      select: { slug: true, _count: { select: { businesses: true } } },
    });
    categoryCounts = Object.fromEntries(cats.map((c) => [c.slug, c._count.businesses]));

    // Top 3 businesses by weighted score (excluding transport/parking)
    featured = await prisma.$queryRaw<typeof featured>`
      SELECT b.slug, b.name, b."shortDescription", b.rating, b."reviewCount", b.address,
             json_build_object('slug', c.slug) as category
      FROM "Business" b
      JOIN "Category" c ON c.id = b."categoryId"
      WHERE c.slug NOT IN ('transport')
        AND b.rating IS NOT NULL
        AND b."reviewCount" > 50
      ORDER BY (b.rating * LOG(b."reviewCount" + 1)) DESC
      LIMIT 6
    `;
  } catch {
    // DB unavailable
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Southport</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your definitive guide to eating, staying, and exploring Southport
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-2 flex items-center gap-2 max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search restaurants, hotels, attractions..."
                className="flex-1 px-4 py-3 text-gray-900 outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium">
                Search
              </button>
            </div>

            {/* Category pill shortcuts */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["restaurants", "hotels", "bars-nightlife", "cafes", "attractions", "golf", "shopping", "wellness"].map((slug) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur text-white text-sm px-4 py-1.5 rounded-full transition border border-white/20"
                >
                  {CATEGORY_META[slug]?.label}
                </Link>
              ))}
            </div>

            {/* Event banners */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/the-open-2026" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                🏌️ The Open 2026 at Royal Birkdale
              </Link>
              <Link href="/mlec" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                🎭 MLEC Opening April 2027
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All 11 Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Explore Southport</h2>
          <p className="text-center text-gray-500 mb-10">
            {Object.values(categoryCounts).reduce((a, b) => a + b, 0).toLocaleString()} local businesses across {Object.keys(categoryCounts).length} categories
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(CATEGORY_META).map(([slug, meta]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition text-center p-5 group border border-gray-100 hover:border-blue-200"
              >
                <div className="text-blue-500 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {meta.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{meta.label}</h3>
                <p className="text-xs text-gray-500">
                  {categoryCounts[slug] ? `${categoryCounts[slug]} listings` : meta.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top rated businesses */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">Top Rated in Southport</h2>
            <p className="text-center text-gray-500 mb-10">Highest rated businesses based on Google reviews</p>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.category.slug}/${b.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded capitalize">
                      {CATEGORY_META[b.category.slug]?.label || b.category.slug}
                    </span>
                    {b.rating && (
                      <span className="flex items-center gap-1 text-amber-600 text-sm font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {b.rating.toFixed(1)}
                        {b.reviewCount && (
                          <span className="text-gray-400 font-normal text-xs">({b.reviewCount.toLocaleString()})</span>
                        )}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-1">{b.name}</h3>
                  {b.shortDescription && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{b.shortDescription}</p>
                  )}
                  <p className="text-gray-400 text-xs line-clamp-1">{b.address.replace(/,\s*(United Kingdom|UK)$/i, "")}</p>
                  <span className="text-blue-600 text-sm mt-3 inline-block group-hover:underline">View listing →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA for businesses */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">List Your Business</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join {Object.values(categoryCounts).reduce((a, b) => a + b, 0).toLocaleString() || "900"}+ businesses on Southport&apos;s fastest-growing guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/claim-listing" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              Claim Your Free Listing
            </Link>
            <Link href="/pricing" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition border-2 border-white">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
