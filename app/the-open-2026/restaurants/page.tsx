import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Restaurants for The Open 2026 | SouthportGuide",
  description: "Restaurants and pubs in Southport for The Open Championship 2026. Eat and drink near Royal Birkdale.",
};

export default async function OpenRestaurantsPage() {
  let restaurants: { slug: string; name: string; shortDescription: string | null }[] = [];
  try {
    const cat = await prisma.category.findFirst({ where: { slug: "restaurants" } });
    if (cat) {
      restaurants = await prisma.business.findMany({
        where: { categoryId: cat.id },
        take: 24,
        select: { slug: true, name: true, shortDescription: true },
      });
    }
  } catch {
    restaurants = [{ slug: "sample", name: "Sample Restaurant", shortDescription: "Great for groups." }];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-green-800 text-white py-16">
        <div className="absolute inset-0">
          <Image src="/images/open-2026.png" alt="" fill sizes="100vw" quality={90} className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/50 to-green-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <Link href="/the-open-2026" className="text-green-200 hover:text-white text-sm mb-4 inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">← The Open 2026</Link>
          <h1 className="text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Restaurants & Pubs for The Open 2026</h1>
          <p className="text-green-100 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Eat and drink in Southport during championship week</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <Link key={r.slug} href={`/restaurants/${r.slug}`} className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition">
              <h2 className="text-xl font-bold text-gray-900">{r.name}</h2>
              <p className="text-gray-600 mt-1">{r.shortDescription || ""}</p>
              <span className="text-green-600 text-sm mt-2 inline-block">View →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
