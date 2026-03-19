"use client";

import { useState } from "react";
import { OFSTED_LABELS } from "@/lib/property-config";

export type SchoolItem = {
  id: string;
  name: string;
  phase: string;
  schoolType: string;
  ofstedRating: number | null;
  ofstedDate: Date | null;
  isSelective: boolean;
  distanceM: number;
  address: string | null;
  website: string | null;
};

type Props = {
  schools: SchoolItem[];
  maxDistanceM?: number;
};

const OFSTED_COLORS: Record<number, string> = {
  1: "bg-green-100 text-green-800 border-green-200",
  2: "bg-blue-100 text-blue-800 border-blue-200",
  3: "bg-amber-100 text-amber-800 border-amber-200",
  4: "bg-red-100 text-red-800 border-red-200",
};

// Normalise DfE phase names into clean display labels
function normalisePhase(phase: string): string {
  const p = phase.trim().toLowerCase();
  if (p === "primary") return "Primary";
  if (p === "secondary") return "Secondary";
  if (p === "16 plus" || p === "16plus") return "Sixth Form / Post-16";
  if (p === "all-through" || p === "all through") return "All-Through";
  if (!p || p === "not applicable" || p === "n/a") return "Special / Other";
  return phase;
}

function phaseOrder(p: string): number {
  const order: Record<string, number> = {
    Primary: 0,
    Secondary: 1,
    "Sixth Form / Post-16": 2,
    "All-Through": 3,
    "Special / Other": 4,
  };
  return order[p] ?? 5;
}

// Per-phase default limits before "show more"
const PHASE_LIMITS: Record<string, number> = {
  Primary: 3,
  Secondary: 3,
  "Sixth Form / Post-16": 2,
  "All-Through": 2,
  "Special / Other": 2,
};

function PhaseGroup({ phase, list }: { phase: string; list: SchoolItem[] }) {
  const limit = PHASE_LIMITS[phase] ?? 3;
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? list : list.slice(0, limit);
  const hidden = list.length - limit;

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {phase}
      </h4>
      <ul className="space-y-2">
        {visible.map((s) => (
          <li
            key={s.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{s.name}</p>
              <p className="truncate text-xs text-gray-500">
                {s.schoolType}
                {s.isSelective && (
                  <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                    Selective
                  </span>
                )}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              {s.ofstedRating ? (
                <span
                  className={`rounded border px-1.5 py-0.5 text-xs font-semibold ${OFSTED_COLORS[s.ofstedRating] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}
                >
                  {OFSTED_LABELS[s.ofstedRating]}
                </span>
              ) : (
                <span className="rounded border border-gray-100 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400">
                  Not Ofsted rated
                </span>
              )}
              <span className="text-xs text-gray-400">
                {s.distanceM < 1000
                  ? `${s.distanceM}m`
                  : `${(s.distanceM / 1000).toFixed(1)}km`}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {!expanded && hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 text-xs text-teal-600 hover:underline"
        >
          +{hidden} more {phase.toLowerCase()} school{hidden !== 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
}

export default function SchoolsList({ schools, maxDistanceM = 2400 }: Props) {
  const filtered = schools
    .filter((s) => s.distanceM <= maxDistanceM)
    .map((s) => ({ ...s, phase: normalisePhase(s.phase) }))
    .sort((a, b) => phaseOrder(a.phase) - phaseOrder(b.phase) || a.distanceM - b.distanceM);

  const grouped = new Map<string, SchoolItem[]>();
  for (const s of filtered) {
    if (!grouped.has(s.phase)) grouped.set(s.phase, []);
    grouped.get(s.phase)!.push(s);
  }

  if (grouped.size === 0) return null;

  return (
    <div className="space-y-5">
      {Array.from(grouped.entries()).map(([phase, list]) => (
        <PhaseGroup key={phase} phase={phase} list={list} />
      ))}
    </div>
  );
}
