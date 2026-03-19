/**
 * Static Merseyrail commute time lookup for each Southport postcode sector.
 * Journey times are approximate based on Merseyrail Northern Line timetable.
 * Southport → Liverpool Central line only.
 */

type StationInfo = {
  name: string;
  walkMins: number;
  toSouthport: number;
  toLiverpool: number;
  note?: string;
};

const SECTOR_STATIONS: Record<string, StationInfo | null> = {
  "PR8 1": {
    name: "Southport",
    walkMins: 8,
    toSouthport: 0,
    toLiverpool: 46,
  },
  "PR8 2": {
    name: "Ainsdale",
    walkMins: 15,
    toSouthport: 12,
    toLiverpool: 50,
    note: "Coastal streets — station is inland, ~15 min walk or short drive",
  },
  "PR8 3": {
    name: "Ainsdale",
    walkMins: 7,
    toSouthport: 12,
    toLiverpool: 50,
  },
  "PR8 4": {
    name: "Birkdale",
    walkMins: 8,
    toSouthport: 6,
    toLiverpool: 46,
  },
  "PR8 5": null,
  "PR8 6": {
    name: "Meols Cop",
    walkMins: 12,
    toSouthport: 7,
    toLiverpool: 47,
  },
  "PR9 0": {
    name: "Southport",
    walkMins: 10,
    toSouthport: 0,
    toLiverpool: 46,
  },
  "PR9 7": {
    name: "Meols Cop",
    walkMins: 8,
    toSouthport: 7,
    toLiverpool: 47,
  },
  "PR9 8": null,
  "PR9 9": {
    name: "Meols Cop",
    walkMins: 12,
    toSouthport: 7,
    toLiverpool: 47,
    note: "Northern streets closer to Marshside are further from the station",
  },
};

type Props = {
  sector: string;
};

export default function MerseyrailTimes({ sector }: Props) {
  const info = SECTOR_STATIONS[sector];

  if (!info) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
          🚂 Commute
        </p>
        <p className="text-sm text-gray-600">
          No Merseyrail station within this sector. Nearest options require driving to Southport or Birkdale stations.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        🚂 Merseyrail
      </p>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{info.name} station</p>
          <p className="text-xs text-gray-500">{info.walkMins} min walk</p>
        </div>
        <a
          href="https://www.merseyrail.org/plan-your-journey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--teal)] hover:underline"
        >
          Timetables →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {info.toSouthport > 0 && (
          <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
            <p className="text-lg font-bold text-[var(--navy)]">{info.toSouthport}m</p>
            <p className="text-xs text-gray-500 mt-0.5">to Southport</p>
          </div>
        )}
        <div className={`rounded-lg bg-gray-50 px-3 py-2 text-center ${info.toSouthport === 0 ? "col-span-1" : ""}`}>
          <p className="text-lg font-bold text-[var(--navy)]">{info.toLiverpool}m</p>
          <p className="text-xs text-gray-500 mt-0.5">to Liverpool Central</p>
        </div>
        {info.toSouthport === 0 && (
          <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
            <p className="text-lg font-bold text-[var(--navy)]">—</p>
            <p className="text-xs text-gray-500 mt-0.5">terminus</p>
          </div>
        )}
      </div>

      {info.note && (
        <p className="mt-2 text-xs text-gray-400">{info.note}</p>
      )}
      <p className="mt-2 text-xs text-gray-400">Approximate. Merseyrail Northern Line.</p>
    </div>
  );
}
