import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import { getCategoryBySlug, isValidCategory } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) return { title: "Business" };
  try {
    const cat = await prisma.category.findFirst({ where: { slug: category } });
    if (!cat) return { title: slug };
    const business = await prisma.business.findFirst({
      where: { slug, categoryId: cat.id },
      select: { name: true, shortDescription: true },
    });
    if (!business) return { title: slug };
    return {
      title: `${business.name} | ${getCategoryBySlug(category)?.name} in Southport`,
      description: business.shortDescription || `${business.name} - ${getCategoryBySlug(category)?.name} in Southport`,
    };
  } catch {
    return { title: slug };
  }
}

export default async function BusinessPage({ params }: Props) {
  const { category, slug } = await params;
  if (!isValidCategory(category)) notFound();
  const cat = getCategoryBySlug(category)!;

  let business: {
    name: string;
    address: string;
    postcode: string;
    phone: string | null;
    website: string | null;
    description: string | null;
    shortDescription: string | null;
    listingTier: string;
    priceRange: string | null;
    openingHours: unknown;
    images: string[];
    claimed: boolean;
  } | null = null;

  try {
    const categoryRecord = await prisma.category.findFirst({ where: { slug: category } });
    if (categoryRecord) {
      business = await prisma.business.findFirst({
        where: { slug, categoryId: categoryRecord.id },
      });
    }
  } catch {
    // DB not connected
  }

  if (!business) notFound();

  const isFeatured = business.listingTier === "featured" || business.listingTier === "premium";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${category}`} className="hover:text-blue-600">{cat.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{business.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero image placeholder */}
          <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            {business.images?.[0] ? (
              <img src={business.images[0]} alt={business.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-lg">No image</span>
            )}
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {isFeatured && (
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded">FEATURED</span>
              )}
              {business.priceRange && (
                <span className="text-gray-600">{business.priceRange}</span>
              )}
              <span className="text-gray-500">• {cat.name}</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{business.name}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {business.website && (
                <a
                  href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
              {business.phone && (
                <a href={`tel:${business.phone}`} className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <Phone className="w-4 h-4" /> {business.phone}
                </a>
              )}
            </div>

            {(business.description || business.shortDescription) && (
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-lg text-gray-700">
                  {business.description || business.shortDescription}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 border-t pt-8">
              <div>
                <h2 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Address
                </h2>
                <p className="text-gray-700">{business.address}, {business.postcode}</p>
              </div>
              {business.openingHours != null && typeof business.openingHours === "object" ? (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Opening hours
                  </h2>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(business.openingHours, null, 2)}
                  </pre>
                </div>
              ) : null}
            </div>

            {!business.claimed && (
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 font-medium">Is this your business?</p>
                <p className="text-amber-700 text-sm mt-1">Claim your free listing to update details and add photos.</p>
                <Link href="/claim-listing" className="inline-block mt-3 text-blue-600 font-medium hover:underline">
                  Claim this listing →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
