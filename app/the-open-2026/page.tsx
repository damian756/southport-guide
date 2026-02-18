import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Hotel, Utensils, Car } from "lucide-react";

export const metadata = {
  title: "The Open Championship 2026 at Royal Birkdale | SouthportGuide",
  description: "Plan your visit to The 154th Open at Royal Birkdale. Accommodation, restaurants, transport and things to do in Southport, July 12-19 2026.",
};

export default function TheOpen2026Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-green-800 to-green-900 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/open-2026.png"
            alt=""
            fill
            sizes="100vw"
            quality={95}
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/90 to-green-900/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <span className="inline-block text-green-300 text-sm font-semibold mb-2">JULY 12-19, 2026</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">The 154th Open</h1>
          <p className="text-2xl text-green-100 mb-8">Royal Birkdale Golf Club, Southport</p>
          <p className="max-w-2xl mx-auto text-lg">
            Championship play runs Thursday 16th – Sunday 19th July. Plan where to stay, eat and explore in Southport.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/the-open-2026/accommodation" className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 flex items-center gap-2">
              <Hotel className="w-5 h-5" /> Find Accommodation
            </Link>
            <Link href="/the-open-2026/restaurants" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 flex items-center gap-2 border-2 border-white">
              <Utensils className="w-5 h-5" /> Restaurants & Pubs
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/the-open-2026/accommodation" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Hotel className="w-10 h-10 text-green-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Where to Stay</h2>
            <p className="text-gray-600 text-sm">Hotels, B&Bs and self-catering near Royal Birkdale</p>
          </Link>
          <Link href="/the-open-2026/restaurants" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Utensils className="w-10 h-10 text-green-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Eat & Drink</h2>
            <p className="text-gray-600 text-sm">Restaurants and pubs for before and after play</p>
          </Link>
          <Link href="/the-open-2026/getting-there" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <Car className="w-10 h-10 text-green-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Getting There</h2>
            <p className="text-gray-600 text-sm">Parking, transport and shuttle info</p>
          </Link>
          <Link href="/attractions" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <MapPin className="w-10 h-10 text-green-600 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Things to Do</h2>
            <p className="text-gray-600 text-sm">Beaches, golf and attractions in Southport</p>
          </Link>
        </div>

        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Open 2026 Partners</h2>
          <p className="text-gray-600 mb-6">
            Featured accommodation and dining partners for The Open Championship. Book with confidence.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-green-200 rounded-lg p-4 text-center">
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">Partner 1</div>
              <p className="font-semibold mt-2">Featured Hotel</p>
              <Link href="/hotels/sample" className="text-green-600 text-sm hover:underline">View →</Link>
            </div>
            <div className="border-2 border-green-200 rounded-lg p-4 text-center">
              <div className="h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">Partner 2</div>
              <p className="font-semibold mt-2">Featured Restaurant</p>
              <Link href="/restaurants/sample" className="text-green-600 text-sm hover:underline">View →</Link>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
              <p className="text-sm">Your business here?</p>
              <Link href="/advertise?open=1" className="text-green-600 text-sm font-medium hover:underline">Advertise with us</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
