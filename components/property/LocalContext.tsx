import Link from "next/link";

type ContextEntry = {
  headline: string;
  body: string;
  link: string;
  linkLabel: string;
  icon: string;
  border: string;
  bg: string;
  labelColor: string;
  tag: string;
};

const SECTOR_CONTEXT: Record<string, ContextEntry> = {
  "PR8 4": {
    tag: "The Open 2026",
    headline: "Royal Birkdale Golf Club — The Open Championship",
    body: "Royal Birkdale is at the southern end of PR8 4 and is hosting The Open Championship from 12–19 July 2026. If you're buying in Birkdale, you're buying next door to one of the world's great links courses. The Open returns to Royal Birkdale roughly every 8–12 years — the next visit after 2026 won't be until the mid-2030s.",
    link: "/the-open-2026",
    linkLabel: "Full Open 2026 guide →",
    icon: "⛳",
    border: "border-amber-300",
    bg: "bg-amber-50",
    labelColor: "text-amber-700",
  },
  "PR8 2": {
    tag: "The Open 2026",
    headline: "Near Royal Birkdale — short-term rental potential",
    body: "PR8 2 is within a few miles of Royal Birkdale Golf Club, which hosts The Open in July 2026. Accommodation across the whole area is already scarce for Open week. Buyers in this postcode should factor in the short-term rental potential — properties with parking and spare rooms are particularly sought during major events.",
    link: "/the-open-2026",
    linkLabel: "The Open 2026 guide →",
    icon: "⛳",
    border: "border-amber-200",
    bg: "bg-amber-50",
    labelColor: "text-amber-700",
  },
  "PR8 3": {
    tag: "The Open 2026",
    headline: "Ainsdale — within reach of Royal Birkdale",
    body: "Ainsdale is about 3 miles from Royal Birkdale Golf Club, which hosts The Open in July 2026. For buyers considering short-term rentals, Ainsdale is close enough to benefit from Open week demand while sitting at a lower price point than Birkdale itself.",
    link: "/the-open-2026",
    linkLabel: "The Open 2026 guide →",
    icon: "⛳",
    border: "border-amber-200",
    bg: "bg-amber-50",
    labelColor: "text-amber-700",
  },
  "PR9 0": {
    tag: "MLEC — opens 2027",
    headline: "Marine Lake Events Centre — on your doorstep",
    body: "The Marine Lake Events Centre opens in 2027, directly within PR9 0 on the seafront. Projections put additional annual visitor numbers at 515,000. For buyers in the promenade postcode, this is the most significant development in Southport in decades — the seafront is where the footfall will land. Factor it into your investment thinking either way.",
    link: "/mlec",
    linkLabel: "MLEC guide →",
    icon: "🏗️",
    border: "border-purple-200",
    bg: "bg-purple-50",
    labelColor: "text-purple-700",
  },
  "PR8 1": {
    tag: "MLEC — opens 2027",
    headline: "Marine Lake Events Centre — a short walk away",
    body: "The MLEC opens on the seafront in 2027, just a short walk from the PR8 1 / PR9 0 boundary on Lord Street. An additional 515,000 annual visitors are projected. For town centre buyers, this is worth understanding: more footfall supports the retail and hospitality on Lord Street, but it also means the promenade gets busier.",
    link: "/mlec",
    linkLabel: "MLEC guide →",
    icon: "🏗️",
    border: "border-purple-200",
    bg: "bg-purple-50",
    labelColor: "text-purple-700",
  },
};

type Props = {
  sector: string;
};

export default function LocalContext({ sector }: Props) {
  const ctx = SECTOR_CONTEXT[sector];
  if (!ctx) return null;

  return (
    <div className={`rounded-2xl border ${ctx.border} ${ctx.bg} p-5`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{ctx.icon}</span>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${ctx.labelColor}`}>
            {ctx.tag}
          </p>
          <h3 className="font-semibold text-gray-900 mb-1.5">{ctx.headline}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{ctx.body}</p>
          <Link
            href={ctx.link}
            className={`mt-3 inline-block text-sm font-semibold ${ctx.labelColor} hover:underline`}
          >
            {ctx.linkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
