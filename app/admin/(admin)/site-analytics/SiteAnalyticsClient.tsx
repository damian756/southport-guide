"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Zap,
  BarChart2,
} from "lucide-react";

type Pulse = {
  totalLast24h: number;
  totalPrior24h: number;
  viewsLast24h: number;
  viewsPrior24h: number;
  conversionsLast24h: number;
  conversionsPrior24h: number;
  pageViewsLast24h: number;
  pageViewsPrior24h: number;
  pendingReviews: number;
  pendingClaims: number;
  activeBoosts: number;
};

type Trend = {
  businessClickDaily: { date: string; count: number }[];
  pageViewDaily: { date: string; count: number }[];
  eventsInPeriod: { title: string; isoDate: string; dayLabel: string; emoji: string }[];
};

type CategoryRow = {
  category: { slug: string; name: string };
  viewsCurrent: number;
  viewsPrior: number;
  pctChange: number;
  engagementRate: number;
  claimedPct: number;
  deadCount: number;
  topPerformer: string;
};

type Funnel = {
  total: number;
  withActivity: number;
  claimed: number;
  pro: number;
  paidTier: number;
  activeBoost: number;
};

type BusinessBasic = {
  id: string;
  name: string;
  slug: string;
  category: { slug: string; name: string };
};

type VisibilityResult = { score: number; items: { label: string; earned: boolean }[] };

type Props = {
  period: number;
  periodLabel: string;
  pulse: Pulse;
  trend: Trend;
  categoryMatrix: CategoryRow[];
  funnel: Funnel;
  highTrafficUnclaimed: { business: BusinessBasic; views: number }[];
  claimedLowEngagement: { business: BusinessBasic; views: number; conversions: number; rate: number }[];
  notConvertingWithVisibility: {
    business: BusinessBasic & { description?: string | null; shortDescription?: string | null; phone?: string | null; website?: string | null; openingHours?: unknown; images?: string[]; rating?: number | null };
    clicks: Record<string, number>;
    visibility: VisibilityResult;
  }[];
  hotRightNow: { business: BusinessBasic; currViews: number; priorViews: number; delta: number }[];
  consistentlyStrong: (BusinessBasic & { weeksInTop20: number })[];
  reviews: { status: string; emailVerifiedAt: string | Date | null; verifiedType: string; flaggedAt: string | Date | null; createdAt: string | Date; approvedAt: string | Date | null; businessId: string }[];
  mrr: number;
  boostRevenuePounds: number;
  activeSubscriptions: number;
  avgPendingReviewAge: number;
  topReviewedBusinesses: { id: string; name: string; slug: string; category: { slug: string } }[];
  topReviewedCounts: Record<string, number>;
  showOpen2026: boolean;
  openBoosts: { business: { name: string }; category: { name: string }; type: string; startsAt: string | Date; label: string | null }[];
  openUnclaimed: { businessId: string; views: number; business?: { name: string; slug: string; category: { name: string; slug: string } } | null }[];
};

function PctChange({ current, prior }: { current: number; prior: number }) {
  if (prior === 0) return current > 0 ? <span className="text-emerald-600 text-xs font-semibold">+100%</span> : null;
  const pct = ((current - prior) / prior) * 100;
  if (pct > 0)
    return (
      <span className="text-emerald-600 text-xs font-semibold flex items-center gap-0.5">
        <TrendingUp className="w-3 h-3" /> +{pct.toFixed(0)}%
      </span>
    );
  if (pct < 0)
    return (
      <span className="text-red-600 text-xs font-semibold flex items-center gap-0.5">
        <TrendingDown className="w-3 h-3" /> {pct.toFixed(0)}%
      </span>
    );
  return null;
}

export default function SiteAnalyticsClient({
  period,
  periodLabel,
  pulse,
  trend,
  categoryMatrix,
  funnel,
  highTrafficUnclaimed,
  claimedLowEngagement,
  notConvertingWithVisibility,
  hotRightNow,
  consistentlyStrong,
  reviews,
  mrr,
  boostRevenuePounds,
  activeSubscriptions,
  avgPendingReviewAge,
  topReviewedBusinesses,
  topReviewedCounts,
  showOpen2026,
  openBoosts,
  openUnclaimed,
}: Props) {
  const [categorySort, setCategorySort] = useState<"views" | "engagement" | "dead">("views");

  const bcByDate = new Map(trend.businessClickDaily.map((r) => [r.date, r.count]));
  const pvByDate = new Map(trend.pageViewDaily.map((r) => [r.date, r.count]));
  const allDates: string[] = [];
  for (let d = 0; d < period; d++) {
    const dt = new Date();
    dt.setDate(dt.getDate() - (period - 1 - d));
    allDates.push(dt.toISOString().slice(0, 10));
  }
  const maxDaily = Math.max(
    1,
    ...allDates.map((d) => (bcByDate.get(d) ?? 0) + (pvByDate.get(d) ?? 0))
  );

  const sortedCategories = [...categoryMatrix].sort((a, b) => {
    if (categorySort === "views") return b.viewsCurrent - a.viewsCurrent;
    if (categorySort === "engagement") return b.engagementRate - a.engagementRate;
    return b.deadCount - a.deadCount;
  });

  const totalSubmitted = reviews.length;
  const emailVerified = reviews.filter((r) => r.emailVerifiedAt).length;
  const approved = reviews.filter((r) => r.status === "approved").length;
  const verifiedPurchase = reviews.filter((r) => r.verifiedType === "purchase").length;
  const flagged = reviews.filter((r) => r.flaggedAt).length;
  const avgApprovalDays =
    reviews.filter((r) => r.approvedAt).length > 0
      ? reviews
          .filter((r) => r.approvedAt)
          .reduce((s, r) => {
            const approved = new Date(r.approvedAt as string | Date).getTime();
            const created = new Date(r.createdAt as string | Date).getTime();
            return s + (approved - created) / 86400000;
          }, 0) / reviews.filter((r) => r.approvedAt).length
      : 0;

  return (
    <div className="max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#1B2E4B]">Site Analytics</h1>
          <p className="text-gray-500 text-sm mt-0.5">Last {period} days</p>
        </div>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm text-sm">
          {["7", "30", "90"].map((p) => (
            <Link
              key={p}
              href={`/admin/site-analytics?period=${p}`}
              className={`px-3 py-1.5 font-medium transition-colors ${
                periodLabel === p ? "bg-[#1B2E4B] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}d
            </Link>
          ))}
        </div>
      </div>

      {/* Section 1 — Site Pulse */}
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total interactions (24h)</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.totalLast24h.toLocaleString()}</p>
          <PctChange current={pulse.totalLast24h} prior={pulse.totalPrior24h} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Listing views (24h)</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.viewsLast24h.toLocaleString()}</p>
          <PctChange current={pulse.viewsLast24h} prior={pulse.viewsPrior24h} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Conversions (24h)</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.conversionsLast24h.toLocaleString()}</p>
          <PctChange current={pulse.conversionsLast24h} prior={pulse.conversionsPrior24h} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Page views (24h)</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.pageViewsLast24h.toLocaleString()}</p>
          <PctChange current={pulse.pageViewsLast24h} prior={pulse.pageViewsPrior24h} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pending reviews</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.pendingReviews}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pending claims</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.pendingClaims}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Active boosts</p>
          <p className="font-display text-2xl font-bold text-[#1B2E4B]">{pulse.activeBoosts}</p>
        </div>
      </div>

      {/* Section 2 — Traffic Trend */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-5">Traffic trend</h2>
        <div className="flex gap-0.5 items-end h-32">
          {allDates.map((d) => {
            const bc = bcByDate.get(d) ?? 0;
            const pv = pvByDate.get(d) ?? 0;
            const total = bc + pv;
            const pct = (total / maxDaily) * 100;
            return (
              <div key={d} className="flex-1 flex flex-col justify-end gap-0.5" title={`${d}: ${bc} listing, ${pv} page`}>
                <div
                  className="w-full bg-[#1B2E4B] rounded-t min-h-[2px]"
                  style={{ height: `${Math.max(2, (bc / maxDaily) * 100)}%` }}
                />
                <div
                  className="w-full bg-[#C9A84C]/60 rounded-t min-h-[2px]"
                  style={{ height: `${Math.max(2, (pv / maxDaily) * 100)}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#1B2E4B]" /> Listing views</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#C9A84C]/60" /> Page views</span>
        </div>
        {trend.eventsInPeriod.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
            {trend.eventsInPeriod.map((e) => (
              <span key={e.isoDate} className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded border border-amber-200">
                {e.emoji} {e.title} ({e.dayLabel})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Section 3 — Category Matrix */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-5">Category performance</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setCategorySort("views")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${categorySort === "views" ? "bg-[#1B2E4B] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            By views
          </button>
          <button
            onClick={() => setCategorySort("engagement")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${categorySort === "engagement" ? "bg-[#1B2E4B] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            By engagement
          </button>
          <button
            onClick={() => setCategorySort("dead")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${categorySort === "dead" ? "bg-[#1B2E4B] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            By dead listings
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-semibold text-gray-600">Category</th>
                <th className="text-right py-2 font-semibold text-gray-600">Views</th>
                <th className="text-right py-2 font-semibold text-gray-600">vs prior</th>
                <th className="text-right py-2 font-semibold text-gray-600">Engagement %</th>
                <th className="text-right py-2 font-semibold text-gray-600">Claimed %</th>
                <th className="text-right py-2 font-semibold text-gray-600">Dead</th>
                <th className="text-left py-2 font-semibold text-gray-600">Top performer</th>
              </tr>
            </thead>
            <tbody>
              {sortedCategories.map((row) => (
                <tr key={row.category.slug} className="border-b border-gray-50">
                  <td className="py-3 font-medium text-[#1B2E4B]">{row.category.name}</td>
                  <td className="py-3 text-right">{row.viewsCurrent.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    {row.viewsPrior > 0 ? `${((row.viewsCurrent - row.viewsPrior) / row.viewsPrior * 100).toFixed(0)}%` : "—"}
                  </td>
                  <td className="py-3 text-right">{row.engagementRate.toFixed(1)}%</td>
                  <td className="py-3 text-right">{row.claimedPct.toFixed(0)}%</td>
                  <td className="py-3 text-right">{row.deadCount}</td>
                  <td className="py-3 text-gray-600">{row.topPerformer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4 — Funnel + Revenue */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-5">Business funnel</h2>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">1</span>
            <span className="font-semibold">Total listings</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.total}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">2</span>
            <span className="font-semibold">With activity</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.withActivity}</span>
            <span className="text-gray-400 text-xs">({funnel.total > 0 ? ((funnel.withActivity / funnel.total) * 100).toFixed(0) : 0}%)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">3</span>
            <span className="font-semibold">Claimed</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.claimed}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">4</span>
            <span className="font-semibold">Pro hub</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.pro}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">5</span>
            <span className="font-semibold">Paid tier</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.paidTier}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-gray-500 w-8">6</span>
            <span className="font-semibold">Active boost</span>
            <span className="text-[#1B2E4B] font-bold">{funnel.activeBoost}</span>
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <div>
            <p className="text-xs text-gray-400 uppercase">Est. MRR</p>
            <p className="font-display text-xl font-bold text-[#1B2E4B]">£{mrr}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Boost revenue (period)</p>
            <p className="font-display text-xl font-bold text-[#1B2E4B]">£{boostRevenuePounds.toFixed(0)}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[#1B2E4B] mb-3">High-traffic unclaimed</h3>
            {highTrafficUnclaimed.length === 0 ? (
              <p className="text-gray-400 text-sm">None</p>
            ) : (
              <ul className="space-y-2">
                {highTrafficUnclaimed.map(({ business, views }) => (
                  <li key={business.id} className="flex items-center justify-between text-sm">
                    <Link href={`/admin/businesses/${business.id}`} className="font-medium text-[#1B2E4B] hover:text-[#C9A84C]">
                      {business.name}
                    </Link>
                    <span className="text-gray-500">{views} views</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[#1B2E4B] mb-3">Claimed, low engagement</h3>
            {claimedLowEngagement.length === 0 ? (
              <p className="text-gray-400 text-sm">None</p>
            ) : (
              <ul className="space-y-2">
                {claimedLowEngagement.map(({ business, views, rate }) => (
                  <li key={business.id} className="flex items-center justify-between text-sm">
                    <Link href={`/admin/businesses/${business.id}`} className="font-medium text-[#1B2E4B] hover:text-[#C9A84C]">
                      {business.name}
                    </Link>
                    <span className="text-gray-500">{views} views, {rate.toFixed(1)}% conv</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Section 5 — Engagement Intel */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-display font-bold text-[#1B2E4B] mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Getting views, not converting
          </h3>
          {notConvertingWithVisibility.length === 0 ? (
            <p className="text-gray-400 text-sm">None</p>
          ) : (
            <ul className="space-y-3">
              {notConvertingWithVisibility.slice(0, 5).map(({ business, clicks, visibility }) => (
                <li key={business.id}>
                  <Link href={`/admin/businesses/${business.id}`} className="font-medium text-sm text-[#1B2E4B] hover:text-[#C9A84C]">
                    {business.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Score: {visibility.score}/100</p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    Missing: {visibility.items.filter((i) => !i.earned).map((i) => i.label).join(", ") || "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-display font-bold text-[#1B2E4B] mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Hot right now
          </h3>
          {hotRightNow.length === 0 ? (
            <p className="text-gray-400 text-sm">None</p>
          ) : (
            <ul className="space-y-2">
              {hotRightNow.map(({ business, currViews, delta }) => (
                <li key={business.id} className="flex items-center justify-between text-sm">
                  <Link href={`/admin/businesses/${business.id}`} className="font-medium text-[#1B2E4B] hover:text-[#C9A84C]">
                    {business.name}
                  </Link>
                  <span className="text-emerald-600 font-semibold">+{delta}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-display font-bold text-[#1B2E4B] mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Consistently strong
          </h3>
          {consistentlyStrong.length === 0 ? (
            <p className="text-gray-400 text-sm">None</p>
          ) : (
            <ul className="space-y-2">
              {consistentlyStrong.map((b) => (
                <li key={b.id} className="flex items-center justify-between text-sm">
                  <Link href={`/${b.category.slug}/${b.slug}`} target="_blank" rel="noopener noreferrer" className="font-medium text-[#1B2E4B] hover:text-[#C9A84C]">
                    {b.name}
                  </Link>
                  <span className="text-gray-500 text-xs">{b.weeksInTop20}w</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Section 6 — Review Health */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-5">Review system health</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400">Submitted</p>
            <p className="font-display text-xl font-bold">{totalSubmitted}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email verified</p>
            <p className="font-display text-xl font-bold">{totalSubmitted > 0 ? ((emailVerified / totalSubmitted) * 100).toFixed(0) : 0}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Approval rate</p>
            <p className="font-display text-xl font-bold">{totalSubmitted > 0 ? ((approved / totalSubmitted) * 100).toFixed(0) : 0}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Verified Purchase</p>
            <p className="font-display text-xl font-bold">{approved > 0 ? approved : 0} approved, {verifiedPurchase} with receipt</p>
          </div>
        </div>
        <div className="flex gap-6 mb-4">
          <div>
            <p className="text-xs text-gray-400">IP flag rate</p>
            <p className="font-semibold">{totalSubmitted > 0 ? ((flagged / totalSubmitted) * 100).toFixed(1) : 0}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Avg days to approval</p>
            <p className="font-semibold">{avgApprovalDays.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Pending avg age</p>
            <p className={`font-semibold ${avgPendingReviewAge > 3 ? "text-amber-600" : ""}`}>{avgPendingReviewAge.toFixed(1)} days</p>
          </div>
        </div>
        {topReviewedBusinesses.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2">Top reviewed businesses</p>
            <ul className="space-y-1">
              {topReviewedBusinesses.map((b) => (
                <li key={b.id}>
                  <Link href={`/${b.category.slug}/${b.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#1B2E4B] hover:text-[#C9A84C]">
                    {b.name}
                  </Link>
                  <span className="text-gray-500 text-xs ml-2">{topReviewedCounts[b.id] ?? 0} reviews</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Section 7 — Open 2026 */}
      {showOpen2026 && (
        <div className="bg-[#1B2E4B] rounded-2xl p-6 text-white">
          <h2 className="font-display text-lg font-bold text-white mb-5">Open 2026 command centre</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#C9A84C] mb-3">Active boosts in Open window</h3>
              {openBoosts.length === 0 ? (
                <p className="text-white/60 text-sm">None</p>
              ) : (
                <ul className="space-y-2">
                  {openBoosts.map((b, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-medium">{b.business.name}</span>
                      <span className="text-white/60 ml-2">{b.category.name} · {b.type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-[#C9A84C] mb-3">Unclaimed high-traffic (Open categories)</h3>
              {openUnclaimed.length === 0 ? (
                <p className="text-white/60 text-sm">None</p>
              ) : (
                <ul className="space-y-2">
                  {openUnclaimed.map((u) => (
                    <li key={u.businessId} className="flex items-center justify-between text-sm">
                      <Link
                        href={u.business ? `/${u.business.category.slug}/${u.business.slug}` : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-[#C9A84C]"
                      >
                        {u.business?.name ?? u.businessId}
                      </Link>
                      <span className="text-white/60">{u.views} views</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
