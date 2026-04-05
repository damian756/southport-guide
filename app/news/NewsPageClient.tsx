"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Clock,
  AlertTriangle,
  Building2,
  Users,
  Calendar,
  Utensils,
  Home,
  ShieldAlert,
  Train,
  Gavel,
  Trophy,
  Star,
  Mail,
} from "lucide-react";
import type { NewsItemCard } from "./page";

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All news" },
  { value: "planning", label: "Planning" },
  { value: "business", label: "Business" },
  { value: "sport", label: "Sport" },
  { value: "council", label: "Council" },
  { value: "community", label: "Community" },
  { value: "events", label: "Events" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "property", label: "Property" },
  { value: "crime-safety", label: "Crime & Safety" },
  { value: "transport", label: "Transport" },
];

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  planning: { bg: "bg-amber-100", text: "text-amber-800", icon: Gavel },
  business: { bg: "bg-blue-100", text: "text-blue-800", icon: Building2 },
  sport: { bg: "bg-green-100", text: "text-green-800", icon: Trophy },
  council: { bg: "bg-indigo-100", text: "text-indigo-800", icon: Users },
  community: { bg: "bg-rose-100", text: "text-rose-800", icon: Users },
  events: { bg: "bg-purple-100", text: "text-purple-800", icon: Calendar },
  "food-drink": { bg: "bg-orange-100", text: "text-orange-800", icon: Utensils },
  property: { bg: "bg-teal-100", text: "text-teal-800", icon: Home },
  "crime-safety": { bg: "bg-red-100", text: "text-red-800", icon: ShieldAlert },
  transport: { bg: "bg-sky-100", text: "text-sky-800", icon: Train },
};

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatLastUpdated(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] ?? { bg: "bg-gray-100", text: "text-gray-700", icon: Newspaper };
  const Icon = style.icon;
  const label = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function FallbackCard({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] ?? { bg: "bg-gray-100", text: "text-gray-500", icon: Newspaper };
  const Icon = style.icon;
  return (
    <div className={`w-full h-full flex items-center justify-center ${style.bg}`}>
      <Icon className={`w-12 h-12 ${style.text} opacity-40`} />
    </div>
  );
}

function FeaturedHero({ item }: { item: NewsItemCard }) {
  const timeStr = item.publishedAt ?? item.createdAt;
  const firstParagraph = item.summary.split("\n\n")[0] ?? item.summary;

  return (
    <Link href={`/news/${item.slug ?? item.id}`} className="block mb-8 group">
      <div className="bg-white rounded-2xl border border-[#C9A84C]/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-64 sm:h-80 bg-gray-100 overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          ) : (
            <FallbackCard category={item.category} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 bg-[#C9A84C] text-white text-xs font-semibold rounded-full">
              <Star className="w-3 h-3" />
              Featured
            </span>
            <CategoryBadge category={item.category} />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2E4B] leading-tight mb-3 group-hover:text-[#C9A84C] transition-colors">
            {item.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {firstParagraph}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(timeStr)}</span>
            <span className="text-gray-300">·</span>
            <span>Full story</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsCard({ item }: { item: NewsItemCard }) {
  const timeStr = item.publishedAt ?? item.createdAt;

  return (
    <Link href={`/news/${item.slug ?? item.id}`} className="block h-full">
      <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-40 bg-gray-50 overflow-hidden flex-shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <FallbackCard category={item.category} />
          )}
          <div className="absolute top-2 left-2">
            <CategoryBadge category={item.category} />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-semibold text-[#1B2E4B] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
            {item.title}
          </h2>
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 flex-1">
            {item.summary}
          </p>
          <div className="mt-3 flex items-center text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(timeStr)}
            </span>
          </div>
          {item.imageCredit && (
            <p className="mt-1 text-[10px] text-gray-300">{item.imageCredit}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function GotAStoryCTA() {
  return (
    <div className="my-8 bg-[#1B2E4B] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="flex-1">
        <p className="font-bold text-lg leading-snug">Got a tip or a story?</p>
        <p className="text-white/70 text-sm mt-1">
          Know something that Southport should know about? Send it over. A photo, a tip, a local issue, or something worth celebrating.
        </p>
      </div>
      <a
        href="mailto:news@southportguide.co.uk?subject=Story tip"
        className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#C9A84C] text-white font-semibold text-sm rounded-xl hover:bg-[#b8963d] transition-colors"
      >
        <Mail className="w-4 h-4" />
        Get in touch
      </a>
    </div>
  );
}

export default function NewsPageClient({
  items,
  featuredItem,
  activeCategory,
  lastUpdated,
}: {
  items: NewsItemCard[];
  featuredItem: NewsItemCard | null;
  activeCategory: string;
  lastUpdated: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleCategory(value: string) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("category", value);
    router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
  }

  // Insert CTA after 9th card (3 rows of 3 on desktop)
  const gridItems = items;
  const beforeCta = gridItems.slice(0, 9);
  const afterCta = gridItems.slice(9);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:px-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-xs font-medium uppercase tracking-wide">Live</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold font-display">Southport Live</h1>
              <p className="text-white/60 mt-1 text-sm">
                Planning applications, local news, sport and community updates. Updated throughout the day.
              </p>
            </div>
            {lastUpdated && (
              <div className="text-right text-xs text-white/40 mt-1">
                <p>Last updated</p>
                <p className="text-white/60">{formatLastUpdated(lastUpdated)}</p>
              </div>
            )}
          </div>

          {/* Category filters */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-[#C9A84C] text-[#1B2E4B]"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8">
        {/* Featured hero */}
        {featuredItem && activeCategory === "all" && (
          <FeaturedHero item={featuredItem} />
        )}

        {items.length === 0 ? (
          <div className="text-center py-20">
            <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No news yet in this category.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon or try another filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {beforeCta.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* Got a story CTA — between rows */}
            <GotAStoryCTA />

            {afterCta.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {afterCta.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer note */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 max-w-2xl">
            Southport Live pulls from public sources including Sefton Council, Merseyside Police, the Environment Agency, and Southport FC.
            Some items are rewritten in Terry's voice. Unsplash images credited where used.
          </p>
        </div>
      </div>
    </div>
  );
}
