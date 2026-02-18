import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Restaurants near Marine Lake Events Centre | SouthportGuide",
  description: "Restaurants and pubs near MLEC Southport. Pre-show dining from April 2027.",
};

export default function MLECRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-purple-800 text-white py-16">
        <div className="absolute inset-0">
          <Image src="/images/mlec.webp" alt="" fill sizes="100vw" quality={80} className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-purple-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <Link href="/mlec" className="text-purple-200 hover:text-white text-sm mb-4 inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">← MLEC</Link>
          <h1 className="text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Restaurants near MLEC</h1>
          <p className="text-purple-100 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Eat and drink near Marine Lake Events Centre</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-6">
          Browse all <Link href="/restaurants" className="text-purple-600 hover:underline">restaurants in Southport</Link> — 
          many are within walking distance of Marine Lake.
        </p>
        <Link href="/restaurants" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
          View all restaurants →
        </Link>
      </div>
    </div>
  );
}
