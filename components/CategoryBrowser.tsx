"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Star, ShieldCheck, ShieldAlert, ShieldX, Shield,
  MapPin, Search, X, LayoutGrid, Map, ArrowUpDown,
} from "lucide-react";
import { MapSkeleton, type MapPin as MapPinType } from "./CategoryMap";

const CategoryMap = dynamic(() => import("./CategoryMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

// ── Types ──────────────────────────────────────────────────

export type BrowserBusiness = {
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  listingTier: string;
  address: string;
  postcode: string;
  rating: number | null;
  reviewCount: number | null;
  priceRange: string | null;
  hygieneRating: string | null;
  hygieneRatingShow: boolean;
  lat: number | null;
  lng: number | null;
};

type SortOption = { key: string; label: string };

type AreaDef = { key: string; label: string };

type Props = {
  businesses: BrowserBusiness[];
  mapPins: MapPinType[];
  accentColor: string;
  themeGradient: string;
  emoji: string;
  category: string;
  isFoodCat: boolean;
  activeArea: string | undefined;
  activeSort: string;
  sortOptions: SortOption[];
  areas: AreaDef[];
  currentSort: string | undefined;
  currentArea: string | undefined;
};

// ── Helpers ────────────────────────────────────────────────

function getSnippet(b: BrowserBusiness): string | null {
  if (b.shortDescription) return b.shortDescription;
  if (b.description) {
    const first = b.description.split(/(?<=[.!?])\s+/)[0] ?? b.description;
    return first.length > 140 ? first.slice(0, 137) + "…" : first;
  }
  return null;
}

function getAreaLabel(address: string): string {
  const areas = ["Birkdale", "Ainsdale", "Churchtown", "Crossens", "Marshside",
    "Formby", "Ormskirk", "Scarisbrick", "Banks", "Halsall", "Burscough"];
  for (const a of areas) { if (address.includes(a)) return a; }
  return "Southport";
}

function hygieneStyle(r: string) {
  const n = parseInt(r);
  if (n >= 4) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
  if (n === 3) return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
  if (n <= 2) return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  return { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" };
}

function HygieneIcon({ r }: { r: string }) {
  const n = parseInt(r);
  if (n >= 4) return <ShieldCheck className="w-3 h-3" />;
  if (n === 3) return <Shield className="w-3 h-3" />;
  if (n >= 0) return <ShieldAlert className="w-3 h-3" />;
  return <ShieldX className="w-3 h-3" />;
}

// ── Component ──────────────────────────────────────────────

export default function CategoryBrowser({
  businesses,
  mapPins,
  accentColor,
  themeGradient,
  emoji,
  category,
  isFoodCat,
  activeArea,
  activeSort,
  sortOptions,
  areas,
  currentSort,
  currentArea,
}: Props) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "map">("list");

  function buildUrl(overrides: Record<string, string | undefined>): string {
    const merged: Record<string, string> = {};
    if (currentSort) merged.sort = currentSort;
    if (currentArea) merged.area = currentArea;
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === undefined) delete merged[k];
      else merged[k] = v;
    });
    const qs = new URLSearchParams(merged).toString();
    return `/${category}${qs ? `?${qs}` : ""}`;
  }

  const q = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return businesses;
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.shortDescription ?? "").toLowerCase().includes(q) ||
        (b.description ?? "").toLowerCase().includes(q)
    );
  }, [businesses, q]);

  const filteredPins = useMemo(() => {
    if (!q) return mapPins;
    return mapPins.filter((p) => p.name.toLowerCase().includes(q));
  }, [mapPins, q]);

  return (
    <>
      {/* ── Area filter pills ─────────────────────────────── */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-xs font-medium text-gray-400 shrink-0">Area:</span>
        <Link
          href={buildUrl({ area: undefined })}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
            !activeArea
              ? "bg-[#1B2E4B] text-white border-[#1B2E4B]"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
          }`}
        >
          All areas
        </Link>
        {areas.map(({ key, label }) => (
          <Link
            key={key}
            href={buildUrl({ area: key })}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
              activeArea === key
                ? "text-white border-transparent"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
            }`}
            style={activeArea === key ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── Sort bar + Search + View toggle ───────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        {/* Search row */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${category}…`}
              className="w-full pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
              style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sort + count + view toggle */}
        <div className="flex items-center gap-2 px-3 py-2 flex-wrap">
          <ArrowUpDown className="w-4 h-4 text-gray-300 ml-1 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-400 mr-1">Sort:</span>
          {sortOptions.map(({ key, label }) => (
            <Link
              key={key}
              href={buildUrl({ sort: key === "default" ? undefined : key })}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeSort === key
                  ? "text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
              style={activeSort === key ? { backgroundColor: accentColor } : {}}
            >
              {label}
            </Link>
          ))}

          <span className="ml-auto text-xs text-gray-400 hidden sm:block mr-2">
            {q ? (
              <><span className="font-semibold text-gray-700">{filtered.length}</span> of {businesses.length}</>
            ) : (
              <>{filtered.length} listing{filtered.length !== 1 ? "s" : ""}{activeArea ? ` · ${areas.find((a) => a.key === activeArea)?.label}` : ""}</>
            )}
          </span>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                view === "list" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              List
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                view === "map" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Map
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      {view === "map" ? (
        <CategoryMap pins={filteredPins} accentColor={accentColor} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">{emoji}</div>
          {q ? (
            <>
              <p className="text-gray-500 text-lg mb-2">No results for &ldquo;{search}&rdquo;</p>
              <button
                onClick={() => setSearch("")}
                className="text-[#C9A84C] font-semibold text-sm hover:underline"
              >
                Clear search
              </button>
            </>
          ) : activeArea ? (
            <>
              <p className="text-gray-500 text-lg mb-2">No listings in this area</p>
              <Link href={`/${category}`} className="text-[#C9A84C] font-semibold text-sm hover:underline">
                Clear area filter
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-lg mb-2">No listings yet</p>
              <p className="text-gray-400 text-sm mb-6">Be the first to list your business here.</p>
              <Link href="/claim-listing" className="inline-block bg-[#C9A84C] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#B8972A] transition-colors">
                Add Your Business
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const isFeatured = b.listingTier === "featured" || b.listingTier === "premium";
            const areaLabel = getAreaLabel(b.address);
            const showHygiene = isFoodCat && b.hygieneRating && b.hygieneRatingShow && /^\d+$/.test(b.hygieneRating);
            const hStyle = showHygiene && b.hygieneRating ? hygieneStyle(b.hygieneRating) : null;
            const snippet = getSnippet(b);

            return (
              <Link
                key={b.slug}
                href={`/${category}/${b.slug}`}
                className={`group flex flex-col bg-white rounded-2xl overflow-hidden card-hover border transition-colors ${
                  isFeatured
                    ? "border-[#C9A84C]/40 ring-1 ring-[#C9A84C]/15 shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div
                  className={`w-full bg-gradient-to-r ${themeGradient} ${isFeatured ? "h-2" : "h-1.5"}`}
                />

                <div className="p-5 flex flex-col flex-1">
                  {isFeatured && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C9A84C]/20">
                        ✦ Featured
                      </span>
                    </div>
                  )}

                  <h2 className="font-display font-bold text-[#1B2E4B] text-lg leading-snug group-hover:text-[#C9A84C] transition-colors mb-1 line-clamp-2">
                    {b.name}
                  </h2>

                  <p className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    {areaLabel}{areaLabel !== "Southport" ? ", Southport" : ""}
                  </p>

                  {snippet ? (
                    <p className="text-gray-500 text-sm line-clamp-2 flex-1 mb-4 leading-relaxed">{snippet}</p>
                  ) : (
                    <div className="flex-1 mb-4" />
                  )}

                  <div className="flex items-center gap-2 flex-wrap mt-auto pt-3 border-t border-gray-50">
                    {b.rating ? (
                      <span className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {b.rating.toFixed(1)}
                        {b.reviewCount && (
                          <span className="font-normal text-amber-500">
                            ({b.reviewCount >= 1000 ? `${(b.reviewCount / 1000).toFixed(1)}k` : b.reviewCount})
                          </span>
                        )}
                      </span>
                    ) : null}

                    {showHygiene && hStyle && b.hygieneRating && (
                      <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${hStyle.bg} ${hStyle.text} ${hStyle.border}`}>
                        <HygieneIcon r={b.hygieneRating} />
                        FSA {b.hygieneRating}★
                      </span>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                      {b.priceRange && (
                        <span className="text-gray-400 text-xs font-semibold">{b.priceRange}</span>
                      )}
                      <span
                        className="text-xs font-bold group-hover:translate-x-0.5 transition-transform"
                        style={{ color: accentColor }}
                      >
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
