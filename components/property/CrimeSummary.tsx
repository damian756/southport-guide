import { TrendingDown, TrendingUp, Minus } from "lucide-react";

export type CrimeCategory = { category: string; count: number; prevCount: number };

type Props = {
  categories: CrimeCategory[];
  totalCount: number;
  prevTotalCount: number;
  southportAvg?: number;
  southportAvgByCategory?: Map<string, number>;
};

const CATEGORY_LABELS: Record<string, string> = {
  "anti-social-behaviour": "Anti-social behaviour",
  "bicycle-theft": "Bicycle theft",
  "burglary": "Burglary",
  "criminal-damage-arson": "Criminal damage & arson",
  "drugs": "Drugs",
  "other-theft": "Other theft",
  "possession-of-weapons": "Possession of weapons",
  "public-order": "Public order",
  "robbery": "Robbery",
  "shoplifting": "Shoplifting",
  "theft-from-the-person": "Theft from person",
  "vehicle-crime": "Vehicle crime",
  "violent-crime": "Violent & sexual offences",
  "other-crime": "Other crime",
};

function TrendIcon({ current, prev }: { current: number; prev: number }) {
  if (prev === 0) return <Minus className="h-3.5 w-3.5 text-gray-300" />;
  const pct = ((current - prev) / prev) * 100;
  if (pct > 5) return <TrendingUp className="h-3.5 w-3.5 text-amber-400" />;
  if (pct < -5) return <TrendingDown className="h-3.5 w-3.5 text-green-500" />;
  return <Minus className="h-3.5 w-3.5 text-gray-300" />;
}

function AvgDot({ count, avg }: { count: number; avg: number | undefined }) {
  if (!avg) return null;
  const diff = count - avg;
  const threshold = avg * 0.1; // 10% tolerance = "average"

  if (Math.abs(diff) <= threshold) {
    return <span className="h-2 w-2 rounded-full bg-gray-300" title="Average for Southport" />;
  }
  if (diff < 0) {
    return <span className="h-2 w-2 rounded-full bg-green-400" title={`Below Southport average (${Math.round(avg)})`} />;
  }
  return <span className="h-2 w-2 rounded-full bg-amber-400" title={`Above Southport average (${Math.round(avg)})`} />;
}

function OverallBadge({ total, avg }: { total: number; avg: number }) {
  if (!avg) return null;
  const diff = total - avg;
  const pct = Math.round(Math.abs((diff / avg) * 100));

  if (Math.abs(diff) < avg * 0.05) {
    return (
      <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">
        Average for Southport
      </span>
    );
  }
  if (diff < 0) {
    return (
      <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
        {pct}% below Southport average
      </span>
    );
  }
  return (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
      {pct}% above Southport average
    </span>
  );
}

export default function CrimeSummary({
  categories,
  totalCount,
  prevTotalCount,
  southportAvg,
  southportAvgByCategory,
}: Props) {
  const sorted = [...categories].sort((a, b) => b.count - a.count);
  const totalTrend = prevTotalCount > 0 ? ((totalCount - prevTotalCount) / prevTotalCount) * 100 : 0;

  const showCategoryComparison = southportAvgByCategory && southportAvgByCategory.size > 0;

  return (
    <div className="space-y-4">
      {/* Overall total row */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium text-gray-900">Total (12 months)</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{totalCount.toLocaleString()}</span>
            <TrendIcon current={totalCount} prev={prevTotalCount} />
            {prevTotalCount > 0 && (
              <span className={`text-sm ${totalTrend > 0 ? "text-amber-600" : totalTrend < 0 ? "text-green-600" : "text-gray-500"}`}>
                {totalTrend > 0 ? "+" : ""}{totalTrend.toFixed(0)}% vs prev year
              </span>
            )}
          </div>
        </div>
        {southportAvg != null && southportAvg > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <OverallBadge total={totalCount} avg={southportAvg} />
            <span className="text-xs text-gray-400">
              Southport sector average: {southportAvg.toLocaleString()} crimes/yr
            </span>
          </div>
        )}
      </div>

      {/* Per-category rows */}
      <ul className="space-y-1.5">
        {sorted.slice(0, 10).map((c) => {
          const catAvg = southportAvgByCategory?.get(c.category);
          return (
            <li
              key={c.category}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                {showCategoryComparison && (
                  <AvgDot count={c.count} avg={catAvg} />
                )}
                <span className="text-sm text-gray-700 truncate">
                  {CATEGORY_LABELS[c.category] ?? c.category}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 ml-2">
                <span className={`text-sm font-semibold ${
                  catAvg == null ? "text-gray-900"
                  : c.count <= catAvg * 0.9 ? "text-green-600"
                  : c.count >= catAvg * 1.1 ? "text-red-500"
                  : "text-gray-900"
                }`}>
                  {c.count}
                </span>
                <TrendIcon current={c.count} prev={c.prevCount} />
                {catAvg != null && (
                  <span className="text-xs text-gray-400 tabular-nums">
                    avg <span className="font-medium text-gray-500">{catAvg}</span>
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {showCategoryComparison && (
        <p className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-400 inline-block" /> Below average</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gray-300 inline-block" /> Average</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400 inline-block" /> Above average</span>
        </p>
      )}
    </div>
  );
}
