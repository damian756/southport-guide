"use client";

import dynamic from "next/dynamic";
import { PROPERTY_TYPE_LABELS } from "@/lib/property-config";

const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
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

export type PropertyTypeData = { type: string; avgPrice: number; count: number };

type Props = {
  data: PropertyTypeData[];
  height?: number;
};

export default function PropertyTypeChart({ data, height = 280 }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    label: PROPERTY_TYPE_LABELS[d.type] ?? d.type,
  }));

  if (formatted.length === 0) return null;

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="label"
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
                  <p className="font-semibold text-gray-900">{d.label}</p>
                  <p className="text-sm text-gray-600">
                    Avg: £{(d.avgPrice / 1000).toFixed(0)}k · {d.count} sales
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="avgPrice" fill="#1B2E4B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
