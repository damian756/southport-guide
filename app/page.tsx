import Link from "next/link";
import Image from "next/image";
import { Star, Utensils, Hotel, Beer, Coffee, MapPin, ShoppingBag, Flag, Waves, Dumbbell, Car, Sparkles, ArrowRight, Trophy, Music } from "lucide-react";
import { prisma } from "@/lib/prisma";

// ── Category configuration ────────────────────────────────────────────────
const CATEGORIES = [
  { slug: "restaurants",    label: "Restaurants",     icon: Utensils,    emoji: "🍽️", gradient: "from-[#8B2635] to-[#C94B3B]",  light: "#FDF0EE" },
  { slug: "hotels",         label: "Hotels",          icon: Hotel,       emoji: "🏨", gradient: "from-[#1B2E4B] to-[#2A4A73]",  light: "#EEF1F7" },
  { slug: "bars-nightlife", label: "Bars & Pubs",     icon: Beer,        emoji: "🍺", gradient: "from-[#3D1A5C] to-[#6B3AA0]",  light: "#F3EEF9" },
  { slug: "cafes",          label: "Cafes",           icon: Coffee,      emoji: "☕", gradient: "from-[#6B3A1F] to-[#A06040]",  light: "#FAF0E8" },
  { slug: "attractions",    label: "Attractions",     icon: MapPin,      emoji: "🎡", gradient: "from-[#1A5C5B] to-[#2E8B7A]",  light: "#E8F5F3" },
  { slug: "beaches-parks",  label: "Beaches & Parks", icon: Waves,       emoji: "🏖️", gradient: "from-[#1A5C7A] to-[#1E8AB0]",  light: "#E8F4FA" },
  { slug: "golf",           label: "Golf",            icon: Flag,        emoji: "⛳", gradient: "from-[#1A4020] to-[#2E6830]",  light: "#E8F2E8" },
  { slug: "shopping",       label: "Shopping",        icon: ShoppingBag, emoji: "🛍️", gradient: "from-[#8B2847] to-[#C45C6A]",  light: "#FAE8EC" },
  { slug: "wellness",       label: "Wellness",        icon: Sparkles,    emoji: "💆", gradient: "from-[#4A2060] to-[#7B3FAA]",  light: "#F0E8F8" },
  { slug: "activities",     label: "Activities",      icon: Dumbbell,    emoji: "🏄", gradient: "from-[#8B3A1A] to-[#C46B2C]",  light: "#FAF0E5" },
  { slug: "transport",      label: "Transport",       icon: Car,         emoji: "🚌", gradient: "from-[#2A3F5C] to-[#3A5070]",  light: "#E8EEF5" },
];

function getArea(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Formby", "Ormskirk", "Scarisbrick"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

export default async function Home() {
  let categoryCounts: Record<string, number> = {};
  let featured: {
    slug: string; name: string; shortDescription: string | null;
    rating: number | null; reviewCount: number | null;
    address: string; category: { slug: string };
  }[] = [];
  let totalBusinesses = 0;

  try {
    const cats = await prisma.category.findMany({
      select: { slug: true, _count: { select: { businesses: true } } },
    });
    categoryCounts = Object.fromEntries(cats.map((c) => [c.slug, c._count.businesses]));
    totalBusinesses = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

    featured = await prisma.$queryRaw<typeof featured>`
      SELECT b.slug, b.name, b."shortDescription", b.rating, b."reviewCount", b.address,
             json_build_object('slug', c.slug) as category
      FROM "Business" b
      JOIN "Category" c ON c.id = b."categoryId"
      WHERE c.slug NOT IN ('transport')
        AND b.rating IS NOT NULL
        AND b."reviewCount" > 100
      ORDER BY (b.rating * LOG(b."reviewCount" + 1)) DESC
      LIMIT 7
    `;
  } catch { /* DB unavailable */ }

  const catMeta: Record<string, { gradient: string; light: string; emoji: string }> =
    Object.fromEntries(CATEGORIES.map((c) => [c.slug, { gradient: c.gradient, light: c.light, emoji: c.emoji }]));

  return (
    <div className="min-h-screen flex flex-col">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1B2E4B]">
        {/* Hero background photo */}
        <div className="absolute inset-0">
          <Image
            src="/southport-pier.webp"
            alt="Southport Pier at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/70 via-[#1B2E4B]/40 to-[#1B2E4B]/70" />
        </div>

        {/* Gold top accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent relative z-10" />

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">

            {/* Pre-heading pill */}
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-[#C9A84C]/25">
              <Trophy className="w-3.5 h-3.5" />
              Home of The Open Championship 2026
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
              Discover<br />
              <span className="text-[#C9A84C]">Southport.</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
              The complete guide to eating, staying and exploring one of Britain&apos;s great seaside towns.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mb-10">
              {[
                { value: totalBusinesses || "999", label: "Businesses" },
                { value: "11", label: "Categories" },
                { value: "Free", label: "To List" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-[#C9A84C]">{value}</div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 backdrop-blur border border-white/12 hover:border-white/25 text-white/80 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-200"
                >
                  <span className="text-sm">{cat.emoji}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative z-10 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48L60 42C120 36 240 24 360 18C480 12 600 12 720 18C840 24 960 36 1080 38C1200 40 1320 30 1380 25L1440 20V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z" fill="#FAF8F5"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BIG EVENTS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Coming to Southport</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Big Events</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* The Open */}
            <Link href="/the-open-2026" className="group relative overflow-hidden rounded-2xl bg-[#1A4020] p-8 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0">
                <Image src="/images/open-2026.webp" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A4020]/60 to-[#2E6830]/40" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-4xl mb-4">⛳</span>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Royal Birkdale · 2026</p>
                <h3 className="font-display text-3xl font-bold text-white mb-3">The Open Championship</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Golf&apos;s oldest major returns to Royal Birkdale. Book accommodation early — Southport fills up fast.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#C9A84C] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#E8C87A] transition-colors">
                  Plan your visit <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>

            {/* MLEC */}
            <Link href="/mlec" className="group relative overflow-hidden rounded-2xl bg-[#3D1A5C] p-8 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0">
                <Image src="/images/mlec.webp" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D1A5C]/60 to-[#6B3AA0]/40" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
              <div className="relative">
                <span className="inline-block text-4xl mb-4"><Music className="w-10 h-10 text-[#C9A84C]" /></span>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Opening April 2027</p>
                <h3 className="font-display text-3xl font-bold text-white mb-3">MLEC</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Southport&apos;s new world-class entertainment and culture destination is coming. The town is transforming.
                </p>
                <span className="inline-flex items-center gap-2 bg-[#C9A84C] text-white text-sm font-semibold px-5 py-2.5 rounded-full group-hover:bg-[#E8C87A] transition-colors">
                  Find out more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EXPLORE CATEGORIES
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Everything in one place</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-3">Explore Southport</h2>
            <p className="text-gray-400 text-sm">
              {totalBusinesses.toLocaleString() || "999"} local businesses across {CATEGORIES.length} categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl card-hover min-h-[120px] sm:min-h-[140px]"
                >
                  <Image
                    src={`/images/categories/${cat.slug}.webp`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    quality={80}
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="relative p-5 flex flex-col justify-end h-full text-center">
                    <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">
                      {cat.emoji}
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">{cat.label}</h3>
                    <p className="text-white/90 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {count > 0 ? `${count} listings` : "Explore →"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOP RATED — MAGAZINE GRID
      ══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="py-16 bg-[#FAF8F5]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Verified by Google</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-3">Top Rated in Southport</h2>
              <p className="text-gray-400 text-sm">The highest-rated businesses based on thousands of Google reviews</p>
            </div>

            {/* Asymmetric magazine grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Big card — first item */}
              {featured[0] && (() => {
                const b = featured[0];
                const theme = catMeta[b.category.slug];
                const area = getArea(b.address);
                return (
                  <Link
                    href={`/${b.category.slug}/${b.slug}`}
                    className="md:col-span-2 group relative overflow-hidden rounded-2xl min-h-[260px] card-hover"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient || "from-[#1B2E4B] to-[#2A4A73]"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full">
                        #{1} Rated
                      </span>
                    </div>
                    <div className="relative p-7 flex flex-col justify-end h-full min-h-[260px]">
                      <div className="mt-auto">
                        <span className="text-white/60 text-xs uppercase tracking-wider">
                          {theme?.emoji} {b.category.slug.replace("-", " ")} · {area}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1 mb-2 group-hover:text-[#C9A84C] transition-colors">
                          {b.name}
                        </h3>
                        {b.shortDescription && (
                          <p className="text-white/70 text-sm line-clamp-2 mb-3">{b.shortDescription}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[#C9A84C]">
                            <Star className="w-4 h-4 fill-[#C9A84C]" />
                            <span className="font-bold text-white">{b.rating?.toFixed(1)}</span>
                            {b.reviewCount && <span className="text-white/50 text-sm">({b.reviewCount.toLocaleString()} reviews)</span>}
                          </div>
                          <span className="text-white/70 text-sm group-hover:text-white group-hover:translate-x-0.5 transition-all">
                            View listing →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })()}

              {/* Two smaller cards */}
              <div className="grid grid-rows-2 gap-4">
                {featured.slice(1, 3).map((b, i) => {
                  const theme = catMeta[b.category.slug];
                  const area = getArea(b.address);
                  return (
                    <Link
                      key={b.slug}
                      href={`/${b.category.slug}/${b.slug}`}
                      className="group relative overflow-hidden rounded-2xl card-hover"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient || "from-[#1B2E4B] to-[#2A4A73]"}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#C9A84C] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                          #{i + 2}
                        </span>
                      </div>
                      <div className="relative p-5 flex flex-col justify-end min-h-[118px]">
                        <div className="mt-auto">
                          <span className="text-white/50 text-xs">{theme?.emoji} {area}</span>
                          <h3 className="font-display font-bold text-white text-lg leading-tight group-hover:text-[#C9A84C] transition-colors line-clamp-1">
                            {b.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                            <span className="text-white font-semibold text-sm">{b.rating?.toFixed(1)}</span>
                            {b.reviewCount && <span className="text-white/50 text-xs">({b.reviewCount.toLocaleString()})</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Bottom row — 4 more */}
              {featured.slice(3, 7).map((b, i) => {
                const theme = catMeta[b.category.slug];
                const area = getArea(b.address);
                return (
                  <Link
                    key={b.slug}
                    href={`/${b.category.slug}/${b.slug}`}
                    className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#C9A84C]/30 card-hover flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: theme?.light || "#EEF1F7", color: "#1B2E4B" }}
                      >
                        {theme?.emoji} {b.category.slug.replace(/-/g, " ")}
                      </span>
                      <span className="text-[#C9A84C] text-xs font-bold">#{i + 4}</span>
                    </div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-base group-hover:text-[#C9A84C] transition-colors mb-1 line-clamp-2 flex-1">
                      {b.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3">{area}</p>
                    <div className="flex items-center gap-1.5 mt-auto">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-sm text-gray-800">{b.rating?.toFixed(1)}</span>
                      {b.reviewCount && <span className="text-gray-400 text-xs">({b.reviewCount.toLocaleString()})</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          BUSINESS CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#1B2E4B] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2E7D6E]/8 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center max-w-2xl">
          <div className="font-display text-4xl font-bold text-white mb-4">
            List Your Business.<br />
            <span className="text-[#C9A84C]">It&apos;s Free.</span>
          </div>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Join {totalBusinesses.toLocaleString() || "999"}+ businesses on Southport&apos;s fastest-growing guide. Get discovered by visitors planning their trip.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claim-listing"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30"
            >
              Claim Your Free Listing →
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold text-base transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
