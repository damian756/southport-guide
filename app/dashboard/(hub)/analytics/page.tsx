import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Eye, Globe, Phone, MapPin, BarChart2 } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getClicksForPeriod,
  getDailyClickTrend,
  getAllTimeClicks,
  getCategoryBenchmark,
  getCategoryRank,
} from "@/lib/hub-analytics";
import PeriodSelector from "./PeriodSelector";

export const metadata = {
  title: "Analytics | Business Hub",
  description: "View your listing performance.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ period?: string }>;
};

export default async function AnalyticsPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/dashboard");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { businesses: { include: { category: true } } },
  });
  const business = user?.businesses[0];
  if (!business) redirect("/dashboard");

  const { period = "30" } = await searchParams;
  const periodNum =
    period === "all" ? null : Math.min(365, Math.max(1, parseInt(period, 10) || 30));

  const now = new Date();
  const from = periodNum
    ? new Date(now.getTime() - periodNum * 86400000)
    : new Date(0);
  const to = new Date();

  const [
    periodClicks,
    dailyTrend,
    allTimeClicks,
    categoryBenchmark,
    categoryRank,
  ] = await Promise.all([
    getClicksForPeriod(business.id, from, to),
    getDailyClickTrend(business.id, periodNum ?? 365),
    getAllTimeClicks(business.id),
    periodNum
      ? getCategoryBenchmark(business.id, business.categoryId, from, to)
      : Promise.resolve(0),
    periodNum
      ? getCategoryRank(business.id, business.categoryId, from, to)
      : Promise.resolve({ rank: 0, total: 0 }),
  ]);

  const views = periodClicks.view;
  const totalPeriod = views + periodClicks.website + periodClicks.phone + periodClicks.directions;
  const maxDaily = Math.max(1, ...dailyTrend.map((d) => d.count));

  const dayNames = dailyTrend.map((d) => {
    const dt = new Date(d.date);
    return dt.toLocaleDateString("en-GB", { weekday: "short" });
  });

  const statCards = [
    { key: "view", label: "Listing views", icon: Eye, value: periodClicks.view },
    { key: "website", label: "Website clicks", icon: Globe, value: periodClicks.website },
    { key: "phone", label: "Phone clicks", icon: Phone, value: periodClicks.phone },
    { key: "directions", label: "Directions", icon: MapPin, value: periodClicks.directions },
  ];

  const dayOfWeekCounts = new Array(7).fill(0);
  const hourCounts = new Array(24).fill(0);

  const clicksForInsights = await prisma.businessClick.findMany({
    where: { businessId: business.id },
    select: { createdAt: true },
  });
  for (const c of clicksForInsights) {
    const d = new Date(c.createdAt);
    dayOfWeekCounts[(d.getDay() + 6) % 7]++;
    hourCounts[d.getHours()]++;
  }
  const busiestDayIdx = dayOfWeekCounts.indexOf(Math.max(...dayOfWeekCounts));
  const busiestHourIdx = hourCounts.indexOf(Math.max(...hourCounts));
  const busiestDay =
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][
      busiestDayIdx
    ];
  const busiestHour =
    hourCounts.every((h) => h === 0)
      ? null
      : `${busiestHourIdx}:00–${busiestHourIdx + 1}:00`;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-[#1B2E4B]">
          Analytics
        </h1>
        <PeriodSelector />
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ key, label, icon: Icon, value }) => (
          <div
            key={key}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 text-xs text-gray-400 uppercase mb-2">
              <Icon className="w-4 h-4" />
              <span>
                {period === "all" ? "All time" : `Last ${period} days`}
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-[#1B2E4B]">
              {value}
            </p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">
          Daily Activity — last{" "}
          {period === "all" ? "365" : period} days
        </h2>
        {maxDaily > 0 && dailyTrend.length > 0 ? (
          <>
            <div className="flex items-end gap-0.5 h-32 overflow-x-auto">
              {dailyTrend.map((d, i) => (
                <div
                  key={d.date}
                  className="flex-1 min-w-[4px] flex flex-col justify-end group"
                  title={`${d.date}: ${d.count} clicks`}
                >
                  <div
                    className="w-full rounded-t bg-[#1B2E4B]/30 hover:bg-[#1B2E4B]/50 transition-colors"
                    style={{
                      height: `${(d.count / maxDaily) * 100}%`,
                      minHeight: d.count > 0 ? "4px" : "0",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 flex-wrap text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1B2E4B]/30" />
                Views
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <BarChart2 className="w-12 h-12 text-gray-300 mb-3" />
            <p>No activity in this period</p>
          </div>
        )}
      </div>

      {/* Insights */}
      {(busiestDay || busiestHour) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">
            Insights
          </h2>
          <div className="space-y-2 text-sm">
            {busiestDay && (
              <p className="text-gray-600">
                Your busiest day of the week: <strong>{busiestDay}</strong>
              </p>
            )}
            {busiestHour && (
              <p className="text-gray-600">
                Peak hour: <strong>{busiestHour}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Benchmark row */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">
          How you compare
        </h2>
        {business.hubTier === "pro" && periodNum ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-gray-400 uppercase mb-1">Your views</p>
              <p className="font-display text-2xl font-bold text-[#1B2E4B]">
                {views}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase mb-1">
                Category average
              </p>
              <p className="font-display text-2xl font-bold text-[#1B2E4B]">
                {Math.round(categoryBenchmark)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase mb-1">Your rank</p>
              <p className="font-display text-2xl font-bold text-[#1B2E4B]">
                {categoryRank.rank}th of {categoryRank.total}{" "}
                {business.category.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-[#1B2E4B] p-6 text-white">
            <p className="font-semibold mb-2">
              Upgrade to Pro to see how you compare
            </p>
            <p className="text-white/70 text-sm mb-4">
              See your rank versus other {business.category.name} in Southport,
              and get category benchmarks.
            </p>
            <Link
              href="/dashboard/upgrade"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8972A] text-[#1B2E4B] px-4 py-2 rounded-full font-bold text-sm transition-colors"
            >
              Upgrade to Pro →
            </Link>
          </div>
        )}
      </div>

      {/* All-time totals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">
          All-time totals
        </h2>
        <p className="text-gray-600 text-sm">
          Since joining:{" "}
          <strong>{allTimeClicks.view}</strong> views,{" "}
          <strong>{allTimeClicks.website}</strong> website clicks,{" "}
          <strong>{allTimeClicks.phone}</strong> phone clicks,{" "}
          <strong>{allTimeClicks.directions}</strong> directions
        </p>
      </div>
    </div>
  );
}
