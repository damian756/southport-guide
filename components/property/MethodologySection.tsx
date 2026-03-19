"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MethodologySection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50"
      >
        How we calculate this data
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
          <ul className="space-y-2">
            <li>
              <strong>Prices:</strong> Land Registry Price Paid Data. Average and median from sales
              in the last 3 years. Excludes record status D (deleted).
            </li>
            <li>
              <strong>Schools:</strong> DfE Get Information About Schools, Ofsted inspection data.
              Distance calculated from postcode centroid. Selective/grammar schools flagged from
              establishment type.
            </li>
            <li>
              <strong>Crime:</strong> police.uk API. 12-month rolling totals by category. Trend
              compares to previous 12 months.
            </li>
            <li>
              <strong>Flood risk:</strong> Environment Agency long-term flood risk. Zone 1 = low,
              Zone 2 = medium, Zone 3 = high.
            </li>
            <li>
              <strong>EPC:</strong> Open EPC data. Average rating and floor area from domestic
              certificates in this postcode.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
