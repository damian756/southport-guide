import Link from "next/link";

export const metadata = {
  title: "Restaurants near Marine Lake Events Centre | SouthportGuide",
  description: "Restaurants and pubs near MLEC Southport. Pre-show dining from April 2027.",
};

export default function MLECRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/mlec" className="text-purple-200 hover:text-white text-sm mb-4 inline-block">← MLEC</Link>
          <h1 className="text-4xl font-bold">Restaurants near MLEC</h1>
          <p className="text-purple-100 mt-2">Eat and drink near Marine Lake Events Centre</p>
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
