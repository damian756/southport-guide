"use client";

import { useState, useEffect } from "react";

function monthlyRepayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

type Props = {
  defaultPrice: number;
  defaultLtv?: number;
  dark?: boolean;
};

export default function MortgageEstimate({ defaultPrice, defaultLtv = 75, dark = false }: Props) {
  const [priceK, setPriceK] = useState(Math.round(defaultPrice / 1000));
  const [ltv, setLtv] = useState(defaultLtv);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);
  const [repayment, setRepayment] = useState(0);

  const principal = Math.round((priceK * 1000 * ltv) / 100);

  useEffect(() => {
    setRepayment(monthlyRepayment(principal, rate, years));
  }, [principal, rate, years]);

  const deposit = Math.round(priceK * 1000 * (1 - ltv / 100));

  const labelCls = dark ? "text-white/60" : "text-gray-500";
  const titleCls = dark ? "text-white/80 font-semibold" : "text-gray-700 font-semibold";
  const resultCls = dark ? "text-white" : "text-gray-900";
  const mutedCls = dark ? "text-white/40" : "text-gray-400";
  const dividerCls = dark ? "border-white/10" : "border-gray-100";
  const inputCls = dark
    ? "rounded border border-white/20 bg-white/10 px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/40"
    : "rounded border border-gray-200 px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-500";

  return (
    <div>
      <p className={`text-sm ${titleCls}`}>Mortgage estimate</p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        <Row label="Price" labelCls={labelCls}>
          <div className="flex items-center gap-1">
            <span className={`text-sm ${labelCls}`}>£</span>
            <input
              type="number"
              min={0}
              value={priceK}
              onChange={(e) => setPriceK(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className={`w-20 ${inputCls}`}
            />
            <span className={`text-sm ${labelCls}`}>k</span>
          </div>
        </Row>
        <Row label="LTV" labelCls={labelCls}>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={5}
              max={95}
              value={ltv}
              onChange={(e) => setLtv(Math.min(95, Math.max(5, parseInt(e.target.value || "75", 10))))}
              className={`w-16 ${inputCls}`}
            />
            <span className={`text-sm ${labelCls}`}>%</span>
          </div>
        </Row>
        <Row label="Rate" labelCls={labelCls}>
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="0.1"
              min={0.1}
              max={20}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value || "4.5"))}
              className={`w-16 ${inputCls}`}
            />
            <span className={`text-sm ${labelCls}`}>%</span>
          </div>
        </Row>
        <Row label="Term" labelCls={labelCls}>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={5}
              max={40}
              value={years}
              onChange={(e) => setYears(Math.min(40, Math.max(5, parseInt(e.target.value || "25", 10))))}
              className={`w-16 ${inputCls}`}
            />
            <span className={`text-sm ${labelCls}`}>yrs</span>
          </div>
        </Row>
      </div>

      <div className={`mt-4 flex items-baseline gap-1 border-t ${dividerCls} pt-3`}>
        <span className={`text-xl font-bold ${resultCls}`}>
          ~£{Math.round(repayment).toLocaleString()}
        </span>
        <span className={`text-sm ${labelCls}`}>/month</span>
      </div>
      <p className={`mt-0.5 text-xs ${mutedCls}`}>
        Deposit: £{deposit.toLocaleString()} · Loan: £{principal.toLocaleString()}
      </p>
      <p className={`mt-1 text-xs ${mutedCls}`}>
        Estimate only. Speak to a mortgage broker.
      </p>
    </div>
  );
}

function Row({ label, labelCls, children }: { label: string; labelCls: string; children: React.ReactNode }) {
  return (
    <>
      <span className={`self-center text-sm ${labelCls}`}>{label}</span>
      <div>{children}</div>
    </>
  );
}
