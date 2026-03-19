type Props = {
  avgMbps: number | null;
  maxMbps: number | null;
  fttpAvailable: boolean | null;
};

export default function BroadbandSummary({ avgMbps, maxMbps, fttpAvailable }: Props) {
  if (avgMbps == null && maxMbps == null && fttpAvailable == null) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
      <p className="text-sm font-medium text-gray-500">Broadband</p>
      <div className="mt-2 space-y-1">
        {avgMbps != null && (
          <p className="text-gray-900">
            Average download: <span className="font-semibold">{avgMbps.toFixed(0)} Mbps</span>
          </p>
        )}
        {maxMbps != null && (
          <p className="text-sm text-gray-600">Max available: {maxMbps.toFixed(0)} Mbps</p>
        )}
        {fttpAvailable != null && (
          <p className="text-sm text-gray-600">
            Full fibre (FTTP): {fttpAvailable ? "Available" : "Not available"}
          </p>
        )}
      </div>
    </div>
  );
}
