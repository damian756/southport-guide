"use client";

import dynamic from "next/dynamic";

const PieChart = dynamic(() => import("recharts").then((m) => m.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((m) => m.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((m) => m.Cell), { ssr: false });
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const Legend = dynamic(() => import("recharts").then((m) => m.Legend), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });

export type TenureData = { name: string; value: number; color: string }[];

type Props = {
  owned: number | null;
  rented: number | null;
  social: number | null;
  height?: number;
};

const COLORS = ["#1B2E4B", "#2E7D6E", "#C9A84C"];

export default function TenureMix({ owned, rented, social, height = 220 }: Props) {
  const data: TenureData = [];
  if (owned != null && owned > 0) data.push({ name: "Owner-occupied", value: owned, color: COLORS[0] });
  if (rented != null && rented > 0) data.push({ name: "Private rented", value: rented, color: COLORS[1] });
  if (social != null && social > 0) data.push({ name: "Social rented", value: social, color: COLORS[2] });

  if (data.length === 0) return null;

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: unknown) => (typeof value === "number" ? `${value.toFixed(1)}%` : String(value))}
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Legend
            formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
