import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, Star } from "lucide-react";

type Props = {
  lat: number;
  lng: number;
  radiusM?: number;
  limit?: number;
};

type NearbyPlace = {
  slug: string;
  name: string;
  address: string;
  categorySlug: string;
  categoryName: string;
  distance_m: number;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
};

export default async function NearbyBusinesses({
  lat,
  lng,
  radiusM = 1600,
  limit = 8,
}: Props) {
  const places = await prisma.$queryRaw<NearbyPlace[]>`
    SELECT sub.slug, sub.name, sub.address, sub."categorySlug", sub."categoryName",
           ROUND(sub.distance_m::numeric) AS distance_m,
           sub.rating, sub."reviewCount", sub."priceRange"
    FROM (
      SELECT b.slug, b.name, b.address,
             c.slug AS "categorySlug", c.name AS "categoryName",
             (6371000 * acos(LEAST(1.0,
               cos(radians(${lat})) * cos(radians(b.lat)) *
               cos(radians(b.lng) - radians(${lng})) +
               sin(radians(${lat})) * sin(radians(b.lat))
             ))) AS distance_m,
             b.rating, b."reviewCount", b."priceRange"
      FROM "Business" b
      JOIN "Category" c ON b."categoryId" = c.id
      WHERE c.slug IN ('restaurants','cafes','bars-nightlife','attractions','beaches-parks','shopping','activities','parking')
        AND b.lat IS NOT NULL AND b.lng IS NOT NULL
    ) sub
    WHERE sub.distance_m < ${radiusM}
    ORDER BY sub.distance_m
    LIMIT ${limit}
  `;

  if (places.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Nearby on SouthportGuide</h3>
      <ul className="space-y-2">
        {places.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${p.categorySlug}/${p.slug}`}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 transition hover:border-gray-200 hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-500">{p.categoryName}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-sm">
                {p.rating != null && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Star className="h-4 w-4 fill-amber-400" />
                    {p.rating.toFixed(1)}
                  </span>
                )}
                <span className="text-gray-500">
                  {p.distance_m < 1000 ? `${p.distance_m}m` : `${(p.distance_m / 1000).toFixed(1)}km`}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
