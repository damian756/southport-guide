import { FLOOD_ZONE_LABELS } from "@/lib/property-config";

type Props = {
  zone: string | null;
  isSector?: boolean;
};

const ZONE_STYLES: Record<string, string> = {
  "1": "bg-green-100 text-green-800 border-green-200",
  "2": "bg-amber-100 text-amber-800 border-amber-200",
  "3": "bg-red-100 text-red-800 border-red-200",
};

export default function FloodRiskBadge({ zone, isSector = false }: Props) {
  if (!zone) return null;

  const label = FLOOD_ZONE_LABELS[zone] ?? `Zone ${zone}`;
  const style = ZONE_STYLES[zone] ?? "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="rounded-xl border bg-gray-50/50 p-4">
      <p className="text-sm font-medium text-gray-500">
        Flood risk{isSector ? " (sector)" : ""}
      </p>
      <p className={`mt-1 inline-block rounded border px-3 py-1 font-semibold ${style}`}>
        Zone {zone} — {label}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        {zone === "1" && "Low probability of flooding from rivers or the sea."}
        {zone === "2" && "Medium probability. Check the Environment Agency flood map for details."}
        {zone === "3" && "High probability. Flood defences or flood storage areas."}
      </p>
      {isSector && (
        <p className="mt-2 text-xs text-gray-400">
          Based on predominant risk across postcodes in this sector. Individual postcode risk may vary — check each unit page.
        </p>
      )}
    </div>
  );
}
