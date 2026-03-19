"use client";

import { useState, useEffect } from "react";

// England & Northern Ireland SDLT rates from 1 April 2025
const STANDARD_BANDS = [
  { max: 125_000, rate: 0 },
  { max: 250_000, rate: 0.02 },
  { max: 925_000, rate: 0.05 },
  { max: 1_500_000, rate: 0.10 },
  { max: Infinity, rate: 0.12 },
];

// First-time buyer relief (up to £500k purchase price)
const FTB_BANDS = [
  { max: 300_000, rate: 0 },
  { max: 500_000, rate: 0.05 },
  { max: Infinity, rate: null }, // standard rates above £500k
];

function calcDuty(priceGbp: number, firstTimeBuyer: boolean): number {
  if (priceGbp <= 0) return 0;

  if (firstTimeBuyer && priceGbp <= 500_000) {
    let duty = 0;
    let prev = 0;
    for (const band of FTB_BANDS) {
      if (band.rate === null) break;
      const slice = Math.min(priceGbp - prev, band.max - prev);
      if (slice <= 0) break;
      duty += slice * band.rate;
      prev = band.max;
    }
    return Math.round(duty);
  }

  let duty = 0;
  let prev = 0;
  for (const band of STANDARD_BANDS) {
    const slice = Math.min(priceGbp - prev, band.max - prev);
    if (slice <= 0) break;
    duty += slice * band.rate;
    prev = band.max;
  }
  return Math.round(duty);
}

type Props = { defaultPrice: number; dark?: boolean };

export default function StampDutyCalc({ defaultPrice, dark = false }: Props) {
  const [priceK, setPriceK] = useState(Math.round(defaultPrice / 1000));
  const [ftb, setFtb] = useState(false);
  const [duty, setDuty] = useState(0);

  useEffect(() => {
    setDuty(calcDuty(priceK * 1000, ftb));
  }, [priceK, ftb]);

  const label = dark ? "text-white/60" : "text-gray-500";
  const title = dark ? "text-white/80 font-semibold" : "text-gray-700 font-semibold";
  const result = dark ? "text-white" : "text-gray-900";
  const muted = dark ? "text-white/40" : "text-gray-400";
  const inputCls = dark
    ? "w-24 rounded border border-white/20 bg-white/10 px-2 py-1 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
    : "w-24 rounded border border-gray-200 px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div>
      <p className={`text-sm ${title}`}>Stamp duty estimate</p>
      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-2">
          <span className={`w-12 shrink-0 text-sm ${label}`}>Price</span>
          <div className="flex items-center gap-1">
            <span className={`text-sm ${label}`}>£</span>
            <input
              type="number"
              min={0}
              value={priceK}
              onChange={(e) => setPriceK(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className={inputCls}
            />
            <span className={`text-sm ${label}`}>k</span>
          </div>
        </div>
        <label className={`flex items-center gap-2 text-sm cursor-pointer select-none ${dark ? "text-white/60" : "text-gray-600"}`}>
          <input
            type="checkbox"
            checked={ftb}
            onChange={(e) => setFtb(e.target.checked)}
            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          First-time buyer
        </label>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={`text-xl font-bold ${result}`}>£{duty.toLocaleString()}</span>
        <span className={`text-sm ${label}`}>stamp duty</span>
      </div>
      <p className={`mt-1 text-xs ${muted}`}>
        England &amp; N. Ireland rates from April 2025.{" "}
        {ftb && priceK * 1000 <= 500_000 ? "First-time buyer relief applied." : ""}
      </p>
    </div>
  );
}
