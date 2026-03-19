"use client";

import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const Cell = dynamic(() => import("recharts").then((m) => m.Cell), { ssr: false });

export type EPCDistribution = { rating: string; count: number };

const EPC_COLORS: Record<string, string> = {
  A: "#22c55e",
  B: "#84cc16",
  C: "#eab308",
  D: "#f97316",
  E: "#ef4444",
  F: "#dc2626",
  G: "#991b1b",
};

type Props = {
  data: EPCDistribution[];
  height?: number;
};

export default function EPCDistributionChart({ data, height = 200 }: Props) {
  const ordered = ["A", "B", "C", "D", "E", "F", "G"].map((r) => ({
    rating: r,
    count: data.find((d) => d.rating.toUpperCase() === r)?.count ?? 0,
  }));

  if (ordered.every((d) => d.count === 0)) return null;

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ordered}
          layout="vertical"
          margin={{ top: 8, right: 8, left: 24, bottom: 8 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="rating"
            tick={{ fontSize: 12, fill: "#374151" }}
            tickLine={false}
            axisLine={false}
            width={20}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload;
              return (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
                  <p className="font-semibold text-gray-900">EPC {d.rating}</p>
                  <p className="text-sm text-gray-600">{d.count} properties</p>
                </div>
              );
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
            {ordered.map((entry, i) => (
              <Cell key={i} fill={EPC_COLORS[entry.rating] ?? "#9ca3af"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
