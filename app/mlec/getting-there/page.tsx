import Link from "next/link";

export const metadata = {
  title: "Getting to Marine Lake Events Centre | SouthportGuide",
  description: "Parking and transport to MLEC Southport. Opening April 2027.",
};

export default function MLECGettingTherePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/mlec" className="text-purple-200 hover:text-white text-sm mb-4 inline-block">← MLEC</Link>
          <h1 className="text-4xl font-bold">Getting to MLEC</h1>
          <p className="text-purple-100 mt-2">Marine Lake Events Centre, Southport</p>
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
