"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag, Waves, Dumbbell, Car, Sparkles, CalendarDays, Newspaper } from "lucide-react";

const CATEGORIES = [
  { slug: "restaurants",    label: "Restaurants",      icon: Utensils,    color: "text-red-500" },
  { slug: "hotels",         label: "Hotels",           icon: Hotel,       color: "text-blue-600" },
  { slug: "bars-nightlife", label: "Bars & Pubs",      icon: Beer,        color: "text-purple-500" },
  { slug: "cafes",          label: "Cafes",            icon: Coffee,      color: "text-amber-600" },
  { slug: "attractions",    label: "Attractions",      icon: MapPin,      color: "text-teal-600" },
  { slug: "shopping",       label: "Shopping",         icon: ShoppingBag, color: "text-rose-500" },
  { slug: "golf",           label: "Golf",             icon: Flag,        color: "text-green-600" },
  { slug: "beaches-parks",  label: "Beaches & Parks",  icon: Waves,       color: "text-sky-500" },
  { slug: "wellness",       label: "Wellness",         icon: Sparkles,    color: "text-violet-500" },
  { slug: "activities",     label: "Activities",       icon: Dumbbell,    color: "text-orange-500" },
  { slug: "transport",      label: "Transport",        icon: Car,         color: "text-slate-500" },
];

export default function NavMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-1">

        {/* Explore dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setExploreOpen(true)}
          onMouseLeave={() => setExploreOpen(false)}
        >
          <button className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] transition-colors font-medium px-3 py-2 rounded-lg text-sm">
            Explore
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Mega dropdown */}
          <div className={`absolute top-full right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72 z-50 transition-all duration-200 ${exploreOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3 px-2">Browse all categories</p>
            <div className="grid grid-cols-1 gap-0.5">
              {CATEGORIES.map(({ slug, label, icon: Icon, color }) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAF8F5] text-[#1B2E4B] text-sm transition-colors group"
                  onClick={() => setExploreOpen(false)}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium group-hover:text-[#C9A84C] transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <Link href="/events" className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] font-medium px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[#FAF8F5]">
          <CalendarDays className="w-3.5 h-3.5" />
          Events
        </Link>
        <Link href="/blog" className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] font-medium px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[#FAF8F5]">
          <Newspaper className="w-3.5 h-3.5" />
          Blog
        </Link>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <Link href="/the-open-2026" className="text-green-700 hover:text-green-800 font-medium px-3 py-2 rounded-lg text-sm transition-colors hover:bg-green-50">
          🏌️ The Open 2026
        </Link>
        <Link href="/mlec" className="text-purple-700 hover:text-purple-800 font-medium px-3 py-2 rounded-lg text-sm transition-colors hover:bg-purple-50">
          🎭 MLEC
        </Link>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <Link
          href="/claim-listing"
          className="bg-[#C9A84C] hover:bg-[#B8972A] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm shadow-[#C9A84C]/30"
        >
          List Your Business
        </Link>
      </div>

      {/* ── Mobile hamburger ────────────────────────────────── */}
      <button
        className="md:hidden text-[#1B2E4B] p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── Mobile menu ─────────────────────────────────────── */}
      <div className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="overflow-y-auto max-h-[85vh] px-4 py-4">

          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Explore Southport</p>
          <div className="grid grid-cols-2 gap-1 mb-5">
            {CATEGORIES.map(({ slug, label, icon: Icon, color }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-[#FAF8F5] text-[#1B2E4B] text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-1 mb-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">What&apos;s On</p>
            <Link href="/events" className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-sm font-medium" onClick={() => setMobileOpen(false)}>
              <CalendarDays className="w-4 h-4 text-[#C9A84C]" /> <span>Events Calendar</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-sm font-medium" onClick={() => setMobileOpen(false)}>
              <Newspaper className="w-4 h-4 text-[#C9A84C]" /> <span>Blog — Local Guides</span>
            </Link>
            <Link href="/the-open-2026" className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-green-50 text-green-800 text-sm font-medium" onClick={() => setMobileOpen(false)}>
              🏌️ <span>The Open 2026 — Royal Birkdale</span>
            </Link>
            <Link href="/mlec" className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-purple-50 text-purple-800 text-sm font-medium" onClick={() => setMobileOpen(false)}>
              🎭 <span>MLEC — Opening April 2027</span>
            </Link>
          </div>

          <Link
            href="/claim-listing"
            className="block w-full text-center bg-[#C9A84C] text-white px-4 py-3.5 rounded-xl font-semibold hover:bg-[#B8972A] transition-colors mb-4"
            onClick={() => setMobileOpen(false)}
          >
            List Your Business →
          </Link>
        </div>
      </div>
    </>
  );
}
