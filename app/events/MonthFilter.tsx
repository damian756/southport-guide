"use client";

import { useRouter, useSearchParams } from "next/navigation";

const QUICK_FILTERS = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this-week" },
  { label: "This Weekend", value: "this-weekend" },
];

export default function MonthFilter({
  months,
  categories,
}: {
  months: string[];
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMonth = searchParams.get("month") ?? "";
  const activeCategory = searchParams.get("category") ?? "";
  const activeWhen = searchParams.get("when") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "when" && value) params.delete("month");
    if (key === "month" && value) params.delete("when");
    router.push(`/events?${params.toString()}`);
  }

  const hasActiveFilter = !!(activeMonth || activeCategory || activeWhen);

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Quick filters row */}
        <div className="flex items-center gap-2 pt-3 pb-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <span className="flex-none text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Quick:</span>
          {QUICK_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => update("when", activeWhen === value ? "" : value)}
              className={`flex-none text-xs font-bold px-4 py-1.5 rounded-full transition-all border ${
                activeWhen === value
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#C9A84C] hover:text-[#1B2E4B]"
              }`}
            >
              {label}
            </button>
          ))}
          {hasActiveFilter && (
            <button
              onClick={() => router.push("/events")}
              className="flex-none ml-auto text-xs text-gray-400 hover:text-[#C9A84C] transition-colors whitespace-nowrap"
            >
              Clear filters ×
            </button>
          )}
        </div>

        {/* Month tabs row */}
        <div className="flex gap-2 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => update("month", "")}
            className={`flex-none text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              !activeMonth && !activeWhen
                ? "bg-[#1B2E4B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All months
          </button>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => update("month", activeMonth === month ? "" : month)}
              className={`flex-none text-xs font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                activeMonth === month
                  ? "bg-[#C9A84C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {month.replace(" 2026", "").replace(" 2027", "")}
            </button>
          ))}
        </div>

        {/* Category filter row */}
        <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => update("category", "")}
            className={`flex-none text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
              !activeCategory
                ? "bg-[#1B2E4B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All types
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => update("category", activeCategory === cat ? "" : cat)}
              className={`flex-none text-xs font-semibold px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#C9A84C] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
