"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag, Waves, Dumbbell, Car, Star } from "lucide-react";

const CATEGORIES = [
  { slug: "restaurants",   label: "Restaurants",       icon: Utensils },
  { slug: "hotels",        label: "Hotels",             icon: Hotel },
  { slug: "bars-nightlife",label: "Bars & Pubs",        icon: Beer },
  { slug: "cafes",         label: "Cafes",              icon: Coffee },
  { slug: "attractions",   label: "Attractions",        icon: MapPin },
  { slug: "shopping",      label: "Shopping",           icon: ShoppingBag },
  { slug: "golf",          label: "Golf",               icon: Flag },
  { slug: "beaches-parks", label: "Beaches & Parks",    icon: Waves },
  { slug: "wellness",      label: "Wellness & Beauty",  icon: Star },
  { slug: "activities",    label: "Activities",         icon: Dumbbell },
  { slug: "transport",     label: "Transport",          icon: Car },
];

export default function NavMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Explore dropdown */}
        <div className="relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
          <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium py-4">
            Explore <ChevronDown className={`w-4 h-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
          </button>
          {exploreOpen && (
            <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border border-gray-100 p-4 w-64 grid grid-cols-1 gap-1 z-50">
              {CATEGORIES.map(({ slug, label, icon: Icon }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-700 text-sm transition"
                  onClick={() => setExploreOpen(false)}
                >
                  <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/the-open-2026" className="text-green-600 hover:text-green-700 font-semibold transition">
          The Open 2026
        </Link>
        <Link href="/mlec" className="text-purple-600 hover:text-purple-700 font-semibold transition">
          MLEC
        </Link>
        <Link
          href="/advertise"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium"
        >
          List Your Business
        </Link>
      </div>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden text-gray-700 p-1"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-50 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Explore</p>
            <div className="grid grid-cols-2 gap-1 mb-4">
              {CATEGORIES.map(({ slug, label, icon: Icon }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Events</p>
              <Link href="/the-open-2026" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-green-50 text-green-700 font-medium text-sm" onClick={() => setMobileOpen(false)}>
                🏌️ The Open 2026 at Royal Birkdale
              </Link>
              <Link href="/mlec" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-purple-50 text-purple-700 font-medium text-sm" onClick={() => setMobileOpen(false)}>
                🎭 MLEC Opening April 2027
              </Link>
            </div>

            <div className="border-t border-gray-100 pt-3 mt-3">
              <Link
                href="/advertise"
                className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
