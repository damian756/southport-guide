import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Getting to The Open 2026 | SouthportGuide",
  description: "Parking, transport and how to get to Royal Birkdale for The Open Championship 2026.",
};

export default function OpenGettingTherePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-green-800 text-white py-16">
        <div className="absolute inset-0">
          <Image src="/images/open-2026.webp" alt="" fill sizes="100vw" quality={80} className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/50 to-green-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <Link href="/the-open-2026" className="text-green-200 hover:text-white text-sm mb-4 inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">← The Open 2026</Link>
          <h1 className="text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Getting to Royal Birkdale</h1>
          <p className="text-green-100 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Transport and parking for The Open 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">
          <p className="text-gray-700 mb-6">
            Official transport and parking details will be published by The R&A closer to the championship. 
            Southport is well connected by train (Southport station) and road (A565, A59). 
            Park and ride facilities are typically available for ticket holders.
          </p>
          <p className="text-gray-600 text-sm">
            For the latest information, visit{" "}
            <a href="https://www.theopen.com" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
              theopen.com
            </a>{" "}
            and check our{" "}
            <Link href="/transport" className="text-green-600 hover:underline">transport</Link> section for local taxis and car parks.
          </p>
        </div>
      </div>
    </div>
  );
}
