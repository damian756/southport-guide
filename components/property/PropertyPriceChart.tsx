"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const LineChart = dynamic(
  () => import("recharts").then((m) => m.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
);

export type QuarterData = { quarter: string; avgPrice: number; count: number };

type Props = {
  data: QuarterData[];
  height?: number;
};

export default function PropertyPriceChart({ data, height = 280 }: Props) {
  const formatted = useMemo(() => {
    return data.map((d) => ({
      ...d,
      label: d.quarter,
      priceLabel: `£${(d.avgPrice / 1000).toFixed(0)}k`,
    }));
  }, [data]);

  if (formatted.length === 0) return null;

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload;
              return (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
                  <p className="font-semibold text-gray-900">{d.quarter}</p>
                  <p className="text-sm text-gray-600">
                    Avg: £{(d.avgPrice / 1000).toFixed(0)}k · {d.count} sales
                  </p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="avgPrice"
            stroke="#1B2E4B"
            strokeWidth={2}
            dot={{ fill: "#1B2E4B", r: 4 }}
            activeDot={{ r: 6, stroke: "#C9A84C", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
