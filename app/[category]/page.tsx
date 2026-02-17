import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return [
    { category: "restaurants" },
    { category: "hotels" },
    { category: "bars-nightlife" },
    { category: "cafes" },
    { category: "attractions" },
    { category: "beaches-parks" },
    { category: "shopping" },
    { category: "golf" },
    { category: "activities" },
    { category: "wellness" },
    { category: "transport" },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category" };
  return {
    title: `${cat.name} in Southport | SouthportGuide.co.uk`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();
  const cat = getCategoryBySlug(category)!;

  let businesses: { slug: string; name: string; shortDescription: string | null; listingTier: string; address: string; rating: number | null; reviewCount: number | null; priceRange: string | null }[] = [];
  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      businesses = await prisma.business.findMany({
        where: { categoryId: categoryRecord.id },
        orderBy: [{ listingTier: "desc" }, { name: "asc" }],
        select: { slug: true, name: true, shortDescription: true, listingTier: true, address: true, rating: true, reviewCount: true, priceRange: true },
      });
    }
  } catch {
    // DB not connected yet – show empty state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{cat.name}</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{cat.name} in Southport</h1>
        <p className="text-xl text-gray-600 mb-10">{cat.description}</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businesses.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">No listings yet. Check back soon!</p>
              <Link href="/claim-listing" className="text-blue-600 hover:underline">List your business →</Link>
            </div>
          ) : (
            businesses.map((b) => (
              <Link
                key={b.slug}
                href={`/${category}/${b.slug}`}
                className={cn(
                  "block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition",
                  (b.listingTier === "featured" || b.listingTier === "premium") && "border-2 border-blue-200"
                )}
              >
                {(b.listingTier === "featured" || b.listingTier === "premium") && (
                  <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2">FEATURED</span>
                )}
                <h2 className="text-xl font-bold text-gray-900">{b.name}</h2>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="line-clamp-1">{b.address}</span>
                </p>
                {b.shortDescription && (
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">{b.shortDescription}</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  {b.rating ? (
                    <span className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {b.rating.toFixed(1)}
                      {b.reviewCount && <span className="text-gray-400 font-normal">({b.reviewCount.toLocaleString()})</span>}
                    </span>
                  ) : <span />}
                  <div className="flex items-center gap-2">
                    {b.priceRange && <span className="text-gray-500 text-sm">{b.priceRange}</span>}
                    <span className="text-blue-600 text-sm">View →</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
