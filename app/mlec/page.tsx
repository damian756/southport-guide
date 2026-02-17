import Link from "next/link";
import { Hotel, Utensils, MapPin, Calendar } from "lucide-react";

export const metadata = {
  title: "Marine Lake Events Centre (MLEC) | SouthportGuide",
  description: "Marine Lake Events Centre opens April 2027. Find accommodation, restaurants and things to do near MLEC Southport.",
};

export default function MLECPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block text-purple-300 text-sm font-semibold mb-2">OPENING APRIL 2027</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Marine Lake Events Centre</h1>
          <p className="text-2xl text-purple-100 mb-8">Southport&apos;s new entertainment destination</p>
          <p className="max-w-2xl mx-auto text-lg">
            1,350-seat venue for concerts, theatre and events. Expected to bring 515,000 additional visitors to Southport every year.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/mlec/accommodation" className="bg-white text-purple-800 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 flex items-center gap-2">
              <Hotel className="w-5 h-5" /> Where to Stay
            </Link>
            <Link href="/mlec/restaurants" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 flex items-center gap-2 border-2 border-white">
              <Utensils className="w-5 h-5" /> Restaurants Nearby
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/mlec/accommodation" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Hotel className="w-10 h-10 text-purple-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Where to Stay</h2>
            <p className="text-gray-600 text-sm">Hotels and B&Bs near Marine Lake</p>
          </Link>
          <Link href="/mlec/restaurants" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Utensils className="w-10 h-10 text-purple-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Eat & Drink</h2>
            <p className="text-gray-600 text-sm">Pre-show dining and nearby pubs</p>
          </Link>
          <Link href="/mlec/getting-there" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <MapPin className="w-10 h-10 text-purple-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Getting There</h2>
            <p className="text-gray-600 text-sm">Parking and transport to MLEC</p>
          </Link>
          <Link href="/attractions" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Calendar className="w-10 h-10 text-purple-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Things to Do</h2>
            <p className="text-gray-600 text-sm">Make a weekend of it in Southport</p>
          </Link>
        </div>

        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official MLEC Partners</h2>
          <p className="text-gray-600 mb-6">
            Featured accommodation and dining partners for visitors to the Marine Lake Events Centre.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
              <p className="text-sm">Partner listings will appear here from 2027.</p>
              <Link href="/advertise?mlec=1" className="text-purple-600 text-sm font-medium hover:underline mt-2 inline-block">Become an MLEC Partner</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
