import Link from "next/link";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { AD_OPTIONS, NETWORK_BUNDLE, describeSpace, enquiryHref, AD_SLOTS, type AdOption } from "@/lib/ad-slots";
import { DISPLAY_EMAIL } from "@/lib/contact";
import AudienceSection from "@/components/AudienceSection";

const PAGE_URL = "https://www.southportguide.co.uk/advertise";
const DESCRIPTION =
  "Advertising on SouthportGuide: guide and event sponsorships, a home page card, sponsored articles and Featured places. Fixed prices, every advert labelled.";

export const metadata: Metadata = {
  title: "Advertise on SouthportGuide | Sefton Coast Network",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    title: "Advertise on SouthportGuide | Sefton Coast Network",
    description: DESCRIPTION,
    url: PAGE_URL,
  },
};

const RULES = [
  "Every advert is labelled Advertisement, Sponsor, Sponsored or Featured.",
  "Paid links are marked as sponsored for search engines.",
  "Adverts never appear inside a review, and paying for a space does not change what we write.",
  "No ad networks and no advertising cookies; our analytics set no cookies. Adverts are a picture, a few words and a link.",
];

const SITES = [
  { name: "SouthportGuide.co.uk", desc: "Southport: things to do, events, beaches, parking and a directory of local businesses." },
  { name: "FormbyGuide.co.uk", desc: "Formby: the beach, the pinewoods, red squirrels and the village." },
  { name: "SeftonLinks.com", desc: "Golf on the Sefton Coast: Royal Birkdale, Hillside, Formby and the other links courses." },
  { name: "SeftonCoastWildlife.co.uk", desc: "Birds, mammals, insects and plants of the Sefton Coast, season by season." },
];

type Props = { searchParams: Promise<{ space?: string }> };

function OptionCard({ o, askHref }: { o: AdOption; askHref: string }) {
  const isFeatured = o.id === "featured";
  return (
    <div id={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col scroll-mt-28">
      <h3 className="font-display text-xl font-bold text-[#1B2E4B] mb-3">{o.name}</h3>
      <p className="mb-1">
        <span className={`${isFeatured ? "text-xl" : "text-3xl"} font-bold text-[#1B2E4B]`}>{o.price}</span>{" "}
        {o.per && <span className="text-sm text-gray-500">{o.per}</span>}
      </p>
      <p className="text-xs text-gray-400 mb-4">
        {isFeatured ? o.note : `${o.note}. Plus VAT.`}
      </p>
      <ul className="space-y-2 text-sm text-gray-600 mb-5 flex-1">
        {o.points.map((p) => (
          <li key={p} className="flex gap-2">
            <Check className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <p className="text-xs font-semibold text-[#C9A84C] mb-4">{o.term}</p>
      {isFeatured ? (
        <Link
          href="/pricing"
          className="text-center bg-[#1B2E4B] hover:bg-[#C9A84C] hover:text-[#1B2E4B] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors"
        >
          See Pro and boost prices
        </Link>
      ) : (
        <Link
          href={askHref}
          className="text-center bg-[#1B2E4B] hover:bg-[#C9A84C] hover:text-[#1B2E4B] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors"
        >
          Ask about this space
        </Link>
      )}
    </div>
  );
}

export default async function AdvertisePage({ searchParams }: Props) {
  const { space } = await searchParams;
  // Only known space ids are named back to the visitor.
  const asked = describeSpace(space);
  const askedOption = space ? (AD_SLOTS[space]?.option ?? space) : null;
  const askFor = (o: AdOption) => enquiryHref(asked && askedOption === o.id ? space : o.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ── Hero ── */}
      <section className="bg-[#1B2E4B] relative overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="relative container mx-auto px-4 max-w-6xl py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">Advertising</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Advertise to people planning a day in Southport
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Simple local options for advertising in Southport, at a fixed price. Every advert is clearly labelled, there are no ad networks or
              tracking cookies, and you pay by invoice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={enquiryHref(asked ? space : undefined)}
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] font-bold px-6 py-3 rounded-full transition-colors"
              >
                Ask about a space
              </Link>
              <Link
                href="/claim-listing"
                className="border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Claim your free listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audience figures (lib/audience-stats.ts; hidden while provisional) ── */}
      <AudienceSection />

      {/* ── Ways to advertise ── */}
      <section className="container mx-auto px-4 max-w-6xl py-14">
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-2">Featured listings and display advertising</h2>
        <p className="text-gray-700 mb-2 max-w-2xl">
          Two ways to advertise your business in Southport: a Featured place in your category, or a labelled
          advertising space on the guide.
        </p>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          Advertising spaces are invoiced, and their prices are plus VAT. Pro and boosts are paid by card in the Business Hub at the price shown. Every listing in the directory stays free; these options add visibility on top.
        </p>

        {asked && (
          <div className="mb-6 rounded-xl border border-[#C9A84C]/40 bg-white px-5 py-3 text-sm text-[#1B2E4B]">
            You asked about: <strong>{asked}</strong>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AD_OPTIONS.map((o) => (
            <OptionCard key={o.id} o={o} askHref={askFor(o)} />
          ))}

          <div id={NETWORK_BUNDLE.id} className="bg-[#1B2E4B] text-white rounded-2xl p-6 flex flex-col scroll-mt-28">
            <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest mb-2">All four sites</p>
            <h3 className="font-display text-xl font-bold mb-3">{NETWORK_BUNDLE.name}</h3>
            <p className="mb-1">
              <span className="text-3xl font-bold">{NETWORK_BUNDLE.price}</span>{" "}
              <span className="text-sm text-white/60">{NETWORK_BUNDLE.per}</span>
            </p>
            <p className="text-xs text-white/50 mb-4">{NETWORK_BUNDLE.note}. Plus VAT.</p>
            <ul className="space-y-2 text-sm text-white/80 mb-5 flex-1">
              {NETWORK_BUNDLE.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={askFor(NETWORK_BUNDLE)}
              className="text-center bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] text-sm font-bold px-4 py-2.5 rounded-full transition-colors"
            >
              Ask about the bundle
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 p-6">
          <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-1">Founding advertisers</h3>
          <p className="text-sm text-gray-700">
            Half price for your first three months, and your monthly price held for twelve months, for the first ten
            advertisers across the Sefton Coast sites.
          </p>
        </div>
      </section>

      {/* ── How it works / Our rules ── */}
      <section className="bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl py-14 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">How it works</h2>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal pl-5">
              <li>Tell us which space you would like through the contact form.</li>
              <li>We confirm it is free and send an invoice.</li>
              <li>Send a photo and up to 30 words. Your advert goes live within two working days.</li>
              <li>After any minimum term, stop with a month&apos;s notice.</li>
            </ol>
            <p className="text-sm text-gray-700 mt-5">We reply to advertising enquiries within one working day.</p>
            <p className="text-sm text-gray-500 mt-3">
              Prefer email? Write to{" "}
              <a href={`mailto:${DISPLAY_EMAIL}`} className="text-[#C9A84C] font-semibold hover:underline">{DISPLAY_EMAIL}</a>.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">Our rules</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              {RULES.map((r) => (
                <li key={r} className="flex gap-2">
                  <Check className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-5">
              More on how the guide is paid for is on our{" "}
              <Link href="/disclosure#advertising" className="text-[#C9A84C] font-semibold hover:underline">disclosure page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── The sites ── */}
      <section className="container mx-auto px-4 max-w-6xl py-14">
        <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">The Sefton Coast sites</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-2xl">
          SouthportGuide is one of four local sites published by Churchtown Media Ltd.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITES.map((s) => (
            <div key={s.name} className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="font-bold text-[#1B2E4B] text-sm mb-1.5">{s.name}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-8">
          Listing your business in the directory is free:{" "}
          <Link href="/claim-listing" className="underline hover:text-[#C9A84C]">claim your listing</Link>.
        </p>
      </section>
    </div>
  );
}
