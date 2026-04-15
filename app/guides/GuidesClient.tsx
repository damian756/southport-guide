"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, X } from "lucide-react";
import { GUIDE_CATEGORIES, type Guide, type GuideCategory } from "@/lib/guides-config";

const CATEGORY_ORDER: GuideCategory[] = [
  "beaches-coast",
  "events",
  "areas",
  "practical",
  "food-drink",
];

interface Props {
  guides: Guide[];
}

export default function GuidesClient({ guides }: Props) {
  const [query, setQuery]               = useState("");
  const [activeCategory, setActiveCategory] = useState<GuideCategory | "all">("all");

  const publishedGuides = useMemo(() => guides.filter((g) => g.status === "published"), [guides]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return publishedGuides.filter((g) => {
      const matchesCat = activeCategory === "all" || g.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [publishedGuides, query, activeCategory]);

  const isFiltered = query.trim() !== "" || activeCategory !== "all";

  function clear() {
    setQuery("");
    setActiveCategory("all");
  }

  return (
    <div>
      {/* ── Search + category filter ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-10 sticky top-[72px] z-30">
        {/* Search input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides — beach, parking, dog-friendly..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1B2E4B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition-all bg-[#FAF8F5]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === "all"
                ? "bg-[#1B2E4B] text-white"
                : "bg-[#FAF8F5] text-gray-600 hover:bg-gray-100 hover:text-[#1B2E4B]"
            }`}
          >
            All guides
          </button>
          {CATEGORY_ORDER.map((cat) => {
            const { label, emoji } = GUIDE_CATEGORIES[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? "all" : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#C9A84C] text-white"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-gray-100 hover:text-[#1B2E4B]"
                }`}
              >
                {emoji} {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Result count + clear (only when filtering) ── */}
      {isFiltered && (
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-[#1B2E4B]">{filtered.length}</span>
            {" "}guide{filtered.length !== 1 ? "s" : ""} found
          </p>
          <button
            onClick={clear}
            className="text-xs font-bold text-[#C9A84C] hover:text-[#1B2E4B] transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        </div>
      )}

      {/* ── Results ── */}
      {isFiltered ? (
        filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-[#1B2E4B] font-bold text-xl mb-2">No guides found</p>
            <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
              Try a different search term or browse by category below.
            </p>
            <button
              onClick={clear}
              className="bg-[#1B2E4B] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2A4A73] transition-colors"
            >
              Show all guides
            </button>
          </div>
        )
      ) : (
        /* ── Grouped sections (default view) ── */
        <div className="space-y-20">
          {CATEGORY_ORDER.map((category) => {
            const catGuides = guides.filter((g) => g.category === category);
            if (catGuides.length === 0) return null;
            const published  = catGuides.filter((g) => g.status === "published");
            const comingSoon = catGuides.filter((g) => g.status === "coming-soon");
            const { label, description, emoji } = GUIDE_CATEGORIES[category];

            return (
              <section key={category} id={category} className="scroll-mt-24">
                {/* Section header */}
                <div className="flex items-end justify-between mb-8 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-1">
                      {published.length} guide{published.length !== 1 ? "s" : ""} published
                      {comingSoon.length > 0 ? ` · ${comingSoon.length} coming` : ""}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B]">
                      {emoji} {label}
                    </h2>
                    <p className="text-gray-600 mt-1 text-base">{description}</p>
                  </div>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className="flex-shrink-0 text-xs font-bold text-[#C9A84C] hover:text-[#1B2E4B] transition-colors"
                  >
                    Filter →
                  </button>
                </div>

                {/* Published guides */}
                {published.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                    {published.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} categoryLabel={label} />
                    ))}
                  </div>
                )}

                {/* Coming soon */}
                {comingSoon.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comingSoon.map((guide) => (
                      <div
                        key={guide.slug}
                        className="bg-white/50 rounded-xl border border-gray-200 border-dashed p-5 opacity-70"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Coming Soon
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-gray-600 text-base mb-1">
                          {guide.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GuideCard({ guide, categoryLabel }: { guide: Guide; categoryLabel?: string }) {
  const { label } = GUIDE_CATEGORIES[guide.category];
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={guide.heroImage}
          alt={guide.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#C9A84C] text-[#1B2E4B] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            {categoryLabel ?? label}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-1.5 group-hover:text-[#C9A84C] transition-colors leading-tight">
          {guide.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {guide.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm">
          Read guide <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
