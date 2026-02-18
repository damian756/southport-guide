import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Accommodation near Marine Lake Events Centre | SouthportGuide",
  description: "Hotels and B&Bs near MLEC Southport. Book your stay for shows and events from April 2027.",
};

export default function MLECAccommodationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-purple-800 text-white py-16">
        <div className="absolute inset-0">
          <Image src="/images/mlec.webp" alt="" fill sizes="100vw" quality={80} className="object-cover" style={{ objectPosition: "center 15%" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 to-purple-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <Link href="/mlec" className="text-purple-200 hover:text-white text-sm mb-4 inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">← MLEC</Link>
          <h1 className="text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Accommodation near MLEC</h1>
          <p className="text-purple-100 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Where to stay for Marine Lake Events Centre</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 mb-6">
          MLEC opens April 2027. We&apos;ll list featured accommodation partners here. In the meantime, browse all{" "}
          <Link href="/hotels" className="text-purple-600 hover:underline">hotels in Southport</Link>.
        </p>
        <Link href="/hotels" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
          View all Southport hotels →
        </Link>
      </div>
    </div>
  );
}
