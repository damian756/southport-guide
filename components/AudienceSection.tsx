import { AUDIENCE_STATS, type Point } from "@/lib/audience-stats";

// "The audience is growing" on /advertise. Renders nothing while the figures
// in lib/audience-stats.ts are marked provisional.

const fmt = (n: number) => n.toLocaleString("en-GB");
const SHORT: Record<string, string> = {
  "Late May": "May",
  "Early July": "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  "Early November": "Nov",
};

function SearchChart({ points }: { points: readonly Point[] }) {
  // A narrow viewBox keeps the labels readable at phone width.
  const W = 380;
  const H = 240;
  const pad = { l: 40, r: 14, t: 22, b: 30 };
  const t0 = Date.parse("2026-05-10");
  const t1 = Date.parse("2026-11-25");
  const yMax = 6000;
  const x = (d: string) => pad.l + ((Date.parse(d) - t0) / (t1 - t0)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / yMax) * (H - pad.t - pad.b);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.date).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const summary = `Line chart of Semrush's estimate of monthly visits from search, 2026: ${points
    .map((p) => `about ${fmt(p.value)} in ${p.label.toLowerCase()}`)
    .join(", ")}.`;

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="w-full h-auto max-w-[520px] mx-auto block">
        <title>{summary}</title>
        {[0, 2000, 4000, 6000].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="#1B2E4B" strokeOpacity={v === 0 ? 0.35 : 0.1} />
            <text x={pad.l - 6} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#6B7280">
              {fmt(v)}
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke="#1B2E4B" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={p.date}>
            <circle cx={x(p.date)} cy={y(p.value)} r={4} fill="#C9A84C" stroke="#fff" strokeWidth={1.5} />
            {/* Value labels sit above and to the left of each point, clear of the rising line. */}
            <text
              x={i === 0 ? x(p.date) : x(p.date) - 6}
              y={y(p.value) - 8}
              textAnchor={i === 0 ? "middle" : "end"}
              fontSize="12"
              fontWeight={700}
              fill="#1B2E4B"
            >
              {fmt(p.value)}
            </text>
            <text x={x(p.date)} y={H - pad.b + 18} textAnchor="middle" fontSize="12" fill="#6B7280">
              {SHORT[p.label] ?? p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-xs text-gray-400 mt-3">{AUDIENCE_STATS.searchVisits.caption}</figcaption>
      <table className="sr-only">
        <caption>{AUDIENCE_STATS.searchVisits.caption}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Estimated visits from search</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.date}>
              <td>{p.label} 2026</td>
              <td>about {fmt(p.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default function AudienceSection() {
  const s = AUDIENCE_STATS;
  if (s.provisional) return null;

  const search = s.searchVisits.points;
  const first = search[0];
  const last = search[search.length - 1];
  const c = s.clicksThrough;

  return (
    <section className="container mx-auto px-4 max-w-6xl pt-14" aria-labelledby="audience-heading">
      <h2 id="audience-heading" className="font-display text-3xl font-bold text-[#1B2E4B] mb-2">
        The audience is growing
      </h2>
      <p className="text-gray-500 text-sm mb-8 max-w-2xl">
        The visit and search figures are estimates by Semrush, not our own count. The clicks through to businesses are our own count.
      </p>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">Estimated visits a month from search</h3>
          <SearchChart points={search} />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-3xl font-bold text-[#1B2E4B]">about {fmt(last.value)} a month</p>
            <p className="text-sm text-gray-600 mt-1">
              estimated visits from search in early November 2026, from about {fmt(first.value)} in late May 2026
            </p>
            <p className="text-xs text-gray-400 mt-2">Semrush estimate, read 11 November 2026, rounded</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-3xl font-bold text-[#1B2E4B]">about {fmt(s.rankedKeywords.now)}</p>
            <p className="text-sm text-gray-600 mt-1">
              search terms the site ranked for in the top 100 results in November 2026, from about {fmt(s.rankedKeywords.lateMay)} in late May
            </p>
            <p className="text-xs text-gray-400 mt-2">Semrush estimate, read 11 November 2026, rounded</p>
          </div>
          <div className="bg-[#1B2E4B] text-white rounded-2xl p-5">
            <p className="font-display text-3xl font-bold">{fmt(c.total)}</p>
            <p className="text-sm text-white/80 mt-1">
              clicks from Southport Guide through to local businesses, {c.period}: {fmt(c.directions)} for directions,{" "}
              {fmt(c.googleReviews)} to read Google reviews and {fmt(c.websites)} to business websites.
            </p>
            <p className="text-sm text-white/80 mt-3">
              Busiest categories, {c.period}: {c.topCategories.map((t) => `${t.name} ${fmt(t.clicks)}`).join(", ")}.
            </p>
            <p className="text-xs text-white/50 mt-3">Our own count of clicks on listings. July is the busiest month.</p>
            <table className="sr-only">
              <caption>Clicks from listings through to businesses, by month, {c.period}</caption>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Clicks through</th>
                </tr>
              </thead>
              <tbody>
                {c.monthly.map((m) => (
                  <tr key={m.date}>
                    <td>{m.label} 2026</td>
                    <td>{fmt(m.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
