import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Getting to Marine Lake Events Centre | SouthportGuide",
  description: "Parking and transport to MLEC Southport. Opening April 2027.",
};

export default function MLECGettingTherePage() {
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
          <h1 className="text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Getting to MLEC</h1>
          <p className="text-purple-100 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Marine Lake Events Centre, Southport</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
          <p className="text-gray-700">
            Marine Lake Events Centre is located on the Promenade, Southport. 
            Southport station is approximately 15 minutes on foot. 
            Parking and full access details will be published ahead of the April 2027 opening.
          </p>
          <Link href="/transport" className="inline-block mt-6 text-purple-600 font-medium hover:underline">
            Taxis & parking in Southport →
          </Link>
        </div>
      </div>
    </div>
  );
}
