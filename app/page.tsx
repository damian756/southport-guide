import Link from "next/link";
import { Search, MapPin, Utensils, Hotel, Beer } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Southport
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your definitive guide to eating, staying, and exploring Southport
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-xl p-2 flex items-center gap-2 max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search restaurants, hotels, attractions..."
                className="flex-1 px-4 py-3 text-gray-900 outline-none"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                Search
              </button>
            </div>

            {/* Event Banners */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/the-open-2026"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                🏌️ The Open 2026 at Royal Birkdale
              </Link>
              <Link
                href="/mlec"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                🎭 MLEC Opening April 2027
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <CategoryCard
              href="/restaurants"
              icon={<Utensils className="w-8 h-8" />}
              title="Restaurants"
              count="150+"
            />
            <CategoryCard
              href="/hotels"
              icon={<Hotel className="w-8 h-8" />}
              title="Hotels"
              count="60+"
            />
            <CategoryCard
              href="/bars-nightlife"
              icon={<Beer className="w-8 h-8" />}
              title="Bars & Pubs"
              count="80+"
            />
            <CategoryCard
              href="/cafes"
              icon={<Utensils className="w-8 h-8" />}
              title="Cafes"
              count="50+"
            />
            <CategoryCard
              href="/attractions"
              icon={<MapPin className="w-8 h-8" />}
              title="Attractions"
              count="30+"
            />
            <CategoryCard
              href="/golf"
              icon={<MapPin className="w-8 h-8" />}
              title="Golf"
              count="12+"
            />
          </div>
        </div>
      </section>

      {/* Featured Businesses (Placeholder) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Listings
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
              <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center text-gray-400">
                Business Image
              </div>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">FEATURED</span>
              <h3 className="text-xl font-bold mt-2">Sample Restaurant</h3>
              <p className="text-gray-600 mt-2">Italian • £££ • Town Centre</p>
              <Link href="#" className="text-blue-600 hover:underline mt-4 inline-block">
                View Details →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
              <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center text-gray-400">
                Business Image
              </div>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">FEATURED</span>
              <h3 className="text-xl font-bold mt-2">Sample Hotel</h3>
              <p className="text-gray-600 mt-2">Boutique • ££££ • Promenade</p>
              <Link href="#" className="text-blue-600 hover:underline mt-4 inline-block">
                View Details →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
              <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center text-gray-400">
                Business Image
              </div>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">FEATURED</span>
              <h3 className="text-xl font-bold mt-2">Sample Attraction</h3>
              <p className="text-gray-600 mt-2">Family Fun • £ • Beach</p>
              <Link href="#" className="text-blue-600 hover:underline mt-4 inline-block">
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Businesses */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">List Your Business</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 500+ businesses on Southport's fastest-growing guide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim-listing"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Claim Your Free Listing
            </Link>
            <Link
              href="/pricing"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition border-2 border-white"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  href,
  icon,
  title,
  count,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  count: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-center group"
    >
      <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{count}</p>
    </Link>
  );
}
