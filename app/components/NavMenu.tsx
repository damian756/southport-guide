"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu, X, ChevronDown, Instagram,
  Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag,
  Waves, Dumbbell, Car, Sparkles, LayoutDashboard,
  Flower2, Wind, BookOpen, ListFilter,
} from "lucide-react";
import { INSTAGRAM_URL, FACEBOOK_URL } from "@/components/InstagramCta";
import { GUIDES, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/guides-config";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

const CATEGORIES = [
  { slug: "restaurants",    label: "Restaurants",     icon: Utensils,    color: "text-red-500" },
  { slug: "hotels",         label: "Hotels",          icon: Hotel,       color: "text-blue-600" },
  { slug: "bars-nightlife", label: "Bars & Pubs",     icon: Beer,        color: "text-purple-500" },
  { slug: "cafes",          label: "Cafes",           icon: Coffee,      color: "text-amber-600" },
  { slug: "attractions",    label: "Attractions",     icon: MapPin,      color: "text-teal-600" },
  { slug: "shopping",       label: "Shopping",        icon: ShoppingBag, color: "text-rose-500" },
  { slug: "golf",           label: "Golf",            icon: Flag,        color: "text-green-600" },
  { slug: "beaches-parks",  label: "Beaches & Parks", icon: Waves,       color: "text-sky-500" },
  { slug: "wellness",       label: "Wellness",        icon: Sparkles,    color: "text-violet-500" },
  { slug: "activities",     label: "Activities",      icon: Dumbbell,    color: "text-orange-500" },
  { slug: "transport",      label: "Transport",       icon: Car,         color: "text-slate-500" },
  { slug: "parking",        label: "Parking",         icon: Car,         color: "text-blue-700" },
];

const FEATURED_COLLECTIONS = [
  { href: "/collections/dog-friendly-restaurants-southport", label: "Dog-friendly",    emoji: "🐾" },
  { href: "/collections/lord-street-restaurants-southport",  label: "Lord Street",     emoji: "🍽️" },
  { href: "/collections/hotels-near-royal-birkdale",         label: "Near Birkdale",   emoji: "⛳" },
  { href: "/collections/free-things-to-do-southport",        label: "Free to do",      emoji: "🎟️" },
];

const GUIDE_EMOJIS: Record<string, string> = {
  "southport-flower-show": "🌸",
  "southport-air-show": "✈️",
  "southport-fireworks-championship": "🎆",
  "southport-comedy-festival": "🎤",
  "southport-armed-forces-festival": "🎖️",
  "southport-sausage-cider-festival": "🌭",
  "southport-beer-week-2026": "🍺",
  "southport-year-of-culture-2026": "🎪",
  "cristal-palace-southport-2026": "🎪",
  "easter-in-southport-2026": "🐣",
  "southport-artisan-market": "🎨",
  "kc-artisan-party-in-the-park-southport-2026": "🎵",
  "comedy-pub-crawl-southport-2026": "😂",
  "whistle-down-the-wind-southport-2026": "🎭",
  "39-steps-southport-2026": "🕵️",
  "the-atkinson-southport": "🎭",
  "southport-bijou-cinema": "🎬",
  "live-music-southport": "🎵",
  "big-top-festival-southport-2026": "🎡",
  "southport-food-drink-festival-2026": "🍴",
  "summer-solstice-southport-2026": "☀️",
  "sefton-open-2026": "🖼️",
  "books-alive-southport-2026": "📚",
};

function guideShortDate(guide: { eventDate?: string; description: string }): string {
  if (guide.eventDate) {
    const d = new Date(guide.eventDate);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  // Extract first date-like fragment from description (e.g. "20–23 Aug" or "18 Apr 2026")
  const m = guide.description.match(/\d{1,2}[–\-]\d{1,2}\s+\w+|\d{1,2}\s+\w{3,9}\s+\d{4}|\d{1,2}\s+\w{3,9}/);
  return m ? m[0].replace(/\s+\d{4}$/, "") : "";
}

// Shared nav link style — uppercase editorial feel
const NAV_LINK = "text-[11px] font-bold tracking-[0.12em] uppercase text-[#1B2E4B] hover:text-[#C9A84C] px-3 py-2 transition-colors flex items-center gap-1";

export default function NavMenu() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [guidesOpen,  setGuidesOpen]  = useState(false);
  const [eventsOpen,  setEventsOpen]  = useState(false);

  const publishedGuides = GUIDES.filter((g) => g.status === "published");

  return (
    <>
      {/* ── Desktop ──────────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-0">

        {/* EXPLORE dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setExploreOpen(true)}
          onMouseLeave={() => setExploreOpen(false)}
        >
          <Link href="/things-to-do" className={NAV_LINK}>
            Explore
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
          </Link>

          <div className="absolute top-full left-0 right-0 h-3 z-40" />

          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-[380px] z-50 transition-all duration-200 ${exploreOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>

            {/* Key pages */}
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              <Link href="/things-to-do" onClick={() => setExploreOpen(false)}
                className="col-span-2 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#1B2E4B] text-white text-sm hover:bg-[#2A4A73] transition-colors">
                <span className="font-semibold">Things to Do — Full Guide</span>
              </Link>
              <Link href="/events" onClick={() => setExploreOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                📅 Events
              </Link>
              <Link href="/mlec" onClick={() => setExploreOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 text-purple-800 text-xs font-semibold hover:bg-purple-100 transition-colors whitespace-nowrap">
                🎭 MLEC
              </Link>
              <Link href="/blog" onClick={() => setExploreOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                ✍️ Blog
              </Link>
              <Link href="/property" onClick={() => setExploreOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                🏠 House Prices
              </Link>
            </div>

            {/* Categories */}
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 px-1">Browse by category</p>
            <div className="grid grid-cols-2 gap-0.5 mb-4">
              {CATEGORIES.map(({ slug, label, icon: Icon, color }) => (
                <Link key={slug} href={`/${slug}`}
                  onClick={() => setExploreOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B2E4B] text-xs font-medium transition-colors group">
                  <Icon className={`w-3.5 h-3.5 flex-none ${color}`} />
                  <span className="group-hover:text-[#C9A84C] transition-colors truncate">{label}</span>
                </Link>
              ))}
            </div>

            {/* Curated lists */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">Curated Lists</p>
                <Link href="/collections" onClick={() => setExploreOpen(false)}
                  className="text-[#C9A84C] text-[10px] font-bold hover:text-[#1B2E4B] transition-colors">All collections →</Link>
              </div>
              <div className="grid grid-cols-2 gap-0.5">
                {FEATURED_COLLECTIONS.map(({ href, label, emoji }) => (
                  <Link key={href} href={href}
                    onClick={() => setExploreOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B2E4B] text-xs font-medium transition-colors group">
                    <span className="text-sm leading-none flex-none">{emoji}</span>
                    <span className="group-hover:text-[#C9A84C] transition-colors truncate">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GUIDES dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setGuidesOpen(true)}
          onMouseLeave={() => setGuidesOpen(false)}
        >
          <Link href="/guides" className={NAV_LINK}>
            Guides
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${guidesOpen ? "rotate-180" : ""}`} />
          </Link>

          <div className="absolute top-full left-0 right-0 h-3 z-40" />

          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-[340px] z-50 transition-all duration-200 ${guidesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
            {/* Hero */}
            <Link href="/guides" onClick={() => setGuidesOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#1B2E4B] text-white text-sm hover:bg-[#2A4A73] transition-colors mb-3">
              <BookOpen className="w-4 h-4 flex-none text-[#C9A84C]" />
              <span className="font-semibold">All Guides — Full Index</span>
            </Link>
            {/* Top 2 per category */}
            {(["events", "beaches-coast", "areas", "food-drink", "practical"] as GuideCategory[]).map((cat) => {
              const catGuides = publishedGuides
                .filter((g) => g.category === cat)
                .sort((a, b) => b.seoPriority - a.seoPriority);
              if (catGuides.length === 0) return null;
              const { label, emoji } = GUIDE_CATEGORIES[cat];
              const top = catGuides.slice(0, 2);
              const rest = catGuides.length - 2;
              return (
                <div key={cat} className="mb-2">
                  <div className="flex items-center justify-between px-1 mb-0.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">{emoji} {label}</p>
                    {rest > 0 && (
                      <Link href="/guides" onClick={() => setGuidesOpen(false)}
                        className="text-[9px] font-bold text-[#C9A84C] hover:text-[#1B2E4B] transition-colors">
                        +{rest} more →
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {top.map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`}
                        onClick={() => setGuidesOpen(false)}
                        className="flex items-center px-2.5 py-1.5 rounded-lg text-xs text-[#1B2E4B] font-medium hover:bg-[#FAF8F5] hover:text-[#C9A84C] transition-colors truncate">
                        {g.shortTitle ?? g.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2026 EVENTS dropdown */}
        <div className="w-px h-4 bg-gray-200 mx-2" />
        <div
          className="relative"
          onMouseEnter={() => setEventsOpen(true)}
          onMouseLeave={() => setEventsOpen(false)}
        >
          <button className="text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-2 text-[#C9A84C] hover:text-[#B8972A] transition-colors flex items-center gap-1">
            2026 Events
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${eventsOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="absolute top-full left-0 right-0 h-3 z-40" />

          {(() => {
            const today = new Date().toISOString().slice(0, 10);
            const eventGuides = publishedGuides
              .filter((g) => g.category === "events" && g.slug !== "southport-year-of-culture-2026")
              .sort((a, b) => {
                const aDate = a.eventDate ?? "9999-12-31";
                const bDate = b.eventDate ?? "9999-12-31";
                const aUpcoming = aDate >= today;
                const bUpcoming = bDate >= today;
                if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
                if (aDate !== bDate) return aDate.localeCompare(bDate);
                return b.seoPriority - a.seoPriority;
              })
              .slice(0, 9);
            return (
              <div className={`absolute top-full -translate-x-1/2 left-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-[520px] z-50 transition-all duration-200 ${eventsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <Link href="/the-open-2026" onClick={() => setEventsOpen(false)}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-all mb-3">
                  <span className="text-2xl flex-none">🏌️</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#B8972A] text-[10px] font-bold uppercase tracking-widest mb-0.5">12–19 July 2026 · Royal Birkdale</p>
                    <p className="font-bold text-[#1B2E4B] text-sm group-hover:text-[#B8972A] transition-colors">The Open Championship</p>
                    <p className="text-gray-500 text-xs mt-0.5">The 154th Open. Southport&apos;s biggest sporting event.</p>
                  </div>
                  <span className="text-[#B8972A] text-sm opacity-0 group-hover:opacity-100 transition-opacity flex-none">→</span>
                </Link>
                <div className="grid grid-cols-3 gap-2">
                  {eventGuides.map((g) => (
                    <Link key={g.slug} href={`/guides/${g.slug}`} onClick={() => setEventsOpen(false)}
                      className="group p-3 rounded-xl bg-[#FAF8F5] border border-gray-100 hover:border-[#C9A84C]/40 hover:bg-amber-50 transition-all">
                      <span className="text-xl">{GUIDE_EMOJIS[g.slug] ?? "📅"}</span>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2 mb-0.5">{guideShortDate(g)}</p>
                      <p className="font-bold text-[#1B2E4B] text-xs group-hover:text-[#C9A84C] transition-colors leading-tight">{g.shortTitle ?? g.title}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <Link href="/guides/southport-year-of-culture-2026" onClick={() => setEventsOpen(false)}
                    className="text-[10px] font-bold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
                    🎪 Southport 2026: Elegantly Eccentric →
                  </Link>
                  <Link href="/events" onClick={() => setEventsOpen(false)}
                    className="text-[10px] font-bold text-[#C9A84C] hover:text-[#1B2E4B] transition-colors">
                    All 2026 events →
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
        <div className="w-px h-4 bg-gray-200 mx-2" />

        {/* Business Login */}
        <Link href="/dashboard"
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase text-[#1B2E4B]/70 hover:text-[#1B2E4B] hover:bg-gray-100 transition-colors">
          <LayoutDashboard className="w-3.5 h-3.5" />
          Business Login
        </Link>

        <div className="ml-2 flex items-center gap-1.5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SouthportGuide on Instagram (@southportguide)"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B2E4B]/10 bg-[#FAF8F5] text-[#1B2E4B] transition hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 hover:text-[#B8972A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A84C]"
          >
            <Instagram className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SouthportGuide on Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B2E4B]/10 bg-[#FAF8F5] text-[#1B2E4B] transition hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 hover:text-[#1877F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"
          >
            <FacebookIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        {/* CTA */}
        <Link href="/claim-listing"
          className="ml-1 bg-[#C9A84C] hover:bg-[#B8972A] text-white px-4 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase transition-colors shadow-sm shadow-[#C9A84C]/30">
          List Your Business
        </Link>
      </div>

      {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
      <button
        className="md:hidden text-[#1B2E4B] p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── Mobile menu ──────────────────────────────────────────────────── */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="overflow-y-auto max-h-[90vh] px-4 py-5 space-y-5">

          {/* Hero links */}
          <div className="space-y-1.5">
            <Link href="/things-to-do" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#1B2E4B] text-white text-sm font-semibold">
              Things to Do in Southport
            </Link>
            <div className="grid grid-cols-2 gap-1.5">
              <Link href="/events" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold">
                📅 Events
              </Link>
              <Link href="/mlec" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-purple-50 text-purple-800 text-xs font-semibold">
                🎭 MLEC
              </Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold">
                ✍️ Blog
              </Link>
              <Link href="/property" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-semibold">
                🏠 House Prices
              </Link>
            </div>
            <Link href="/the-open-2026" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 text-[#B8972A] text-sm font-bold">
              🏌️ The Open Championship — 12–19 July · Royal Birkdale
            </Link>
            <div className="grid grid-cols-2 gap-1.5">
              {(() => {
                const today = new Date().toISOString().slice(0, 10);
                return publishedGuides
                  .filter((g) => g.category === "events" && g.slug !== "southport-year-of-culture-2026")
                  .sort((a, b) => {
                    const aDate = a.eventDate ?? "9999-12-31";
                    const bDate = b.eventDate ?? "9999-12-31";
                    const aUpcoming = aDate >= today;
                    const bUpcoming = bDate >= today;
                    if (aUpcoming !== bUpcoming) return aUpcoming ? -1 : 1;
                    if (aDate !== bDate) return aDate.localeCompare(bDate);
                    return b.seoPriority - a.seoPriority;
                  })
                  .slice(0, 6)
                  .map((g) => (
                    <Link key={g.slug} href={`/guides/${g.slug}`} onClick={() => setMobileOpen(false)}
                      className="flex flex-col px-3 py-3 rounded-xl bg-[#FAF8F5] border border-gray-100">
                      <span className="text-lg mb-1.5">{GUIDE_EMOJIS[g.slug] ?? "📅"}</span>
                      <span className="text-xs font-bold text-[#1B2E4B]">{g.shortTitle ?? g.title}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">{guideShortDate(g)}</span>
                    </Link>
                  ));
              })()}
            </div>
            <Link href="/guides/southport-year-of-culture-2026" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-50 text-purple-800 text-sm font-bold">
              🎪 Southport 2026: Elegantly Eccentric
            </Link>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 px-1">Browse by category</p>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map(({ slug, label, icon: Icon, color }) => (
                <Link key={slug} href={`/${slug}`} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-[#FAF8F5] text-[#1B2E4B] text-sm transition-colors">
                  <Icon className={`w-4 h-4 flex-none ${color}`} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">Guides</p>
              <Link href="/guides" onClick={() => setMobileOpen(false)}
                className="text-[#C9A84C] text-[10px] font-bold">All guides →</Link>
            </div>
            {(["events", "beaches-coast", "areas", "food-drink", "practical"] as GuideCategory[]).map((cat) => {
              const catGuides = publishedGuides
                .filter((g) => g.category === cat)
                .sort((a, b) => b.seoPriority - a.seoPriority);
              if (catGuides.length === 0) return null;
              const { label, emoji } = GUIDE_CATEGORIES[cat];
              const top = catGuides.slice(0, 2);
              const rest = catGuides.length - 2;
              return (
                <div key={cat} className="mb-3">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">{emoji} {label}</p>
                    {rest > 0 && (
                      <Link href="/guides" onClick={() => setMobileOpen(false)}
                        className="text-[9px] font-bold text-[#C9A84C]">+{rest} more →</Link>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {top.map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`} onClick={() => setMobileOpen(false)}
                        className="flex items-center px-3 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-medium truncate">
                        {g.shortTitle ?? g.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collections */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">Curated Lists</p>
              <Link href="/collections" onClick={() => setMobileOpen(false)}
                className="text-[#C9A84C] text-[10px] font-bold">All →</Link>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {FEATURED_COLLECTIONS.map(({ href, label, emoji }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-xs font-medium">
                  <span className="text-base leading-none">{emoji}</span> {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Business */}
          <div className="border-t border-gray-100 pt-4 space-y-1.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 px-1">For Business</p>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-[#FAF8F5] text-[#1B2E4B] text-sm font-medium">
              <LayoutDashboard className="w-4 h-4 text-[#C9A84C]" /> Business Hub Login
            </Link>
            <Link href="/claim-listing" onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-[#C9A84C] text-white px-4 py-3.5 rounded-xl font-bold text-sm hover:bg-[#B8972A] transition-colors tracking-wide">
              List Your Business →
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-gray-200 text-[#1B2E4B] text-sm font-semibold hover:border-[#C9A84C]/40 hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                  <Instagram className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden />
                </span>
                Instagram
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-gray-200 text-[#1B2E4B] text-sm font-semibold hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877F2]">
                  <FacebookIcon className="h-4 w-4 text-white" />
                </span>
                Facebook
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
