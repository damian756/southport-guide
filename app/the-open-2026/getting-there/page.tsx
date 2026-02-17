import Link from "next/link";

export const metadata = {
  title: "Getting to The Open 2026 | SouthportGuide",
  description: "Parking, transport and how to get to Royal Birkdale for The Open Championship 2026.",
};

export default function OpenGettingTherePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/the-open-2026" className="text-green-200 hover:text-white text-sm mb-4 inline-block">← The Open 2026</Link>
          <h1 className="text-4xl font-bold">Getting to Royal Birkdale</h1>
          <p className="text-green-100 mt-2">Transport and parking for The Open 2026</p>
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
