import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronRight, ArrowRight, Umbrella, Clock, Users } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { getBusinessLinks, bizHref } from "@/lib/guide-business-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("rainy-day-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "rainy day Southport, indoor things to do Southport, Splash World Southport, The Atkinson Southport, Southport Market, Wayfarers Arcade, indoor activities Southport",
  alternates: { canonical: `${BASE_URL}/guides/rainy-day-southport` },
  openGraph: {
    title: "Rainy Day Southport | Indoor Things to Do | SouthportGuide",
    description:
      "Lancashire weather is what it is. Splash World, The Atkinson, Southport Market, Wayfarers Arcade — everything worth doing in Southport when it rains.",
    url: `${BASE_URL}/guides/rainy-day-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/activities.webp` }],
  },
};

const FAQS = [
  {
    q: "What is Splash World Southport?",
    a: "Splash World is an indoor waterpark in Southport — one of the UK's largest. It has slides, pools, wave machine, and facilities for all ages. Located in Southport Pleasureland on Marine Drive. Tickets should be booked in advance online; it gets busy in school holidays and wet weather.",
  },
  {
    q: "Is The Atkinson free?",
    a: "The Atkinson is Southport's arts and cultural centre on Lord Street. Gallery entry is free. Theatre performances and ticketed events are paid. The café is open to everyone. It's worth 30–45 minutes even without a specific exhibition in mind.",
  },
  {
    q: "What is Wayfarers Arcade?",
    a: "Wayfarers Arcade is a Victorian indoor shopping arcade just off Lord Street in Southport town centre. It's covered, independently run, and has a mix of shops and a café. Good for browsing on a wet afternoon without the exposure of the main street.",
  },
  {
    q: "What is Southport Market?",
    a: "Southport Market is a covered indoor market hall in the town centre. It has independent food stalls, street food, craft traders, and a café area. Open most days. Good for lunch and a browse when it's raining.",
  },
  {
    q: "Is there a cinema in Southport?",
    a: "Yes — Vue Cinema is on The Esplanade near the seafront. Standard multiplex with mainstream releases. Worth checking listings if you're stuck for a wet afternoon.",
  },
  {
    q: "What can kids do in Southport on a rainy day?",
    a: "Splash World is the main dedicated option for families with children — it's genuinely excellent and very popular. Beyond that, the Pleasureland indoor attractions, The Atkinson (family-friendly gallery and activities), and Southport Market are all good. Bowling is available at Southport Superbowl near the seafront.",
  },
];

const INDOOR_OPTIONS = [
  {
    name: "Splash World",
    type: "Indoor Waterpark",
    postcode: "PR8 1RX",
    cost: "Paid (book online)",
    bestFor: "Families, groups",
    notes: "One of the UK's largest indoor waterparks. Book ahead — fills up. Right on Marine Drive.",
  },
  {
    name: "The Atkinson",
    type: "Arts Centre",
    postcode: "PR8 1DB",
    cost: "Gallery free / Theatre paid",
    bestFor: "Adults, couples",
    notes: "Gallery, museum, theatre, café. On Lord Street. Worth an hour at minimum.",
  },
  {
    name: "Southport Market",
    type: "Covered Market",
    postcode: "PR8 1HH",
    cost: "Free entry",
    bestFor: "Everyone",
    notes: "Indoor market with food traders, street food, café. Good for lunch.",
  },
  {
    name: "Wayfarers Arcade",
    type: "Indoor Arcade",
    postcode: "PR8 1QN",
    cost: "Free entry",
    bestFor: "Everyone",
    notes: "Victorian covered arcade off Lord Street. Shops and a café. Good for a browse.",
  },
  {
    name: "Vue Cinema",
    type: "Cinema",
    postcode: "PR8 1QS",
    cost: "Paid",
    bestFor: "Everyone",
    notes: "Standard multiplex on The Esplanade. Check listings for showings.",
  },
  {
    name: "Southport Superbowl",
    type: "Bowling",
    postcode: "PR8 1RX",
    cost: "Paid (book online)",
    bestFor: "Families, groups",
    notes: "Ten-pin bowling near the seafront. Arcade games alongside.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Rainy Day Southport — Indoor Things to Do",
  description:
    "Indoor things to do in Southport — Splash World, The Atkinson, Southport Market, Wayfarers Arcade, and everything else worth doing when it rains.",
  url: `${BASE_URL}/guides/rainy-day-southport`,
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function RainyDaySouthportGuidePage() {
  const bizLinks = await getBusinessLinks(INDOOR_OPTIONS.map((r) => r.name));
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[50vh] flex items-end bg-[#2C3E50] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/activities.webp"
            alt="Indoor things to do in Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50] via-[#2C3E50]/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <Umbrella className="w-4 h-4" />
            Practical Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Rainy Day Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Lancashire does its thing. Here&apos;s everything actually worth doing
            in Southport when the weather isn&apos;t playing along.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-[#C9A84C]" />
              <span>Splash World — book ahead</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span>The Atkinson — gallery is free</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-4xl py-14">

        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Honest Reality</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Southport on a sunny day is genuinely excellent. On a rainy Tuesday in November it&apos;s a different proposition — but not a hopeless one. The town has enough indoor options to salvage a wet day, provided you know where they are.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The main event for families is Splash World — an indoor waterpark that most people either don&apos;t know about or don&apos;t associate with Southport. It&apos;s one of the UK&apos;s largest and it&apos;s good. For adults without children, The Atkinson and Southport Market are the more useful options. Wayfarers Arcade takes care of the browsing instinct when Lord Street feels too exposed.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">💡</span>
              If Splash World is in the plan, book online before you arrive. On a wet school holiday day, walk-up availability can be limited.
            </p>
          </div>
        </section>

        {/* Quick reference table */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Indoor Options at a Glance</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1B2E4B] text-white">
                  <th className="text-left px-5 py-3.5 font-semibold">Place</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden md:table-cell">Type</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Cost</th>
                  <th className="text-left px-5 py-3.5 font-semibold hidden lg:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {INDOOR_OPTIONS.map((row) => {
                  const biz = bizLinks[row.name];
                  return (
                  <tr key={row.name} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">
                      {biz ? (
                        <Link href={bizHref(biz)} className="hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors">{row.name}</Link>
                      ) : (
                        <span>{row.name}</span>
                      )}
                      <div className="text-xs text-gray-400 font-mono mt-0.5">{row.postcode}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{row.type}</td>
                    <td className="px-5 py-3.5 text-gray-600">{row.cost}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden lg:table-cell">{row.notes}</td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        </section>

        {/* Splash World */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Splash World</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Splash World is the standout option for families. It&apos;s an indoor waterpark on Marine Drive — part of the Southport Pleasureland complex — with slides, flumes, a wave machine, pools, and facilities for young children and older kids alike.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Postcode: <strong>PR8 1RX</strong>. Book tickets online at splashworld.co.uk — it&apos;s cheaper and guarantees entry. On wet school holiday days, walk-up can be difficult.
          </p>
          <p className="text-gray-700 leading-relaxed">
            It&apos;s genuinely one of the better attractions in Southport and significantly underrated by visitors who come primarily for the beach. Worth building a day around if you have children.
          </p>
        </section>

        {/* The Atkinson */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">The Atkinson</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Atkinson is Southport&apos;s arts centre, at the northern end of Lord Street. It has a gallery (free entry), a museum covering local history, a theatre, and a café. The gallery runs changing exhibitions — the quality varies but the building itself is good and the café is a solid rainy-day stop.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Postcode: <strong>PR8 1DB</strong>. Check theatkinson.co.uk for current exhibitions and what&apos;s on. Even without a specific draw, it&apos;s worth 30–45 minutes and the café is decent.
          </p>
        </section>

        {/* Market and Arcade */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Southport Market &amp; Wayfarers Arcade</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Southport Market</strong> is a covered indoor market hall in the town centre (postcode PR8 1HH). It has independent food stalls, street food traders, a café, and craft vendors. A good lunch option and pleasant to browse for an hour without spending anything.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wayfarers Arcade</strong> is a Victorian arcade just off Lord Street (PR8 1QN). Covered and independent, with a café inside. Not a destination in itself but a genuinely pleasant alternative to walking in the rain, and the architecture is worth a look.
          </p>
        </section>

        {/* Cinema and bowling */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Cinema, Bowling &amp; Other Options</h2>
          <ul className="space-y-4">
            {[
              { title: "Vue Cinema", desc: "Mainstream multiplex on The Esplanade (PR8 1QS). Check vue.com for listings. A solid fallback if nothing else appeals.", },
              { title: "Southport Superbowl", desc: "Ten-pin bowling near the seafront. Good for groups and families. Has an arcade games section. Book online at peak times." },
              { title: "Southport Pleasureland", desc: "Some indoor attractions within the Pleasureland complex on Marine Drive alongside Splash World. Check what's open seasonally." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-[#1B2E4B] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </ul>
        </section>

        {/* Café strategy */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Where to Sit It Out</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Sometimes the best rainy-day strategy is a good café and running out the clock. The Atkinson café and Southport Market are the best bets in the town centre — both have space, decent coffee, and food worth ordering. Wayfarers Arcade has a café too.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For more café options, see our <Link href="/guides/best-cafes-southport" className="text-[#C9A84C] font-semibold hover:underline">Best Cafés guide</Link>.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-[#1B2E4B] text-sm hover:text-[#C9A84C] transition-colors list-none">
                  {q}
                  <ChevronRight className="w-4 h-4 flex-none group-open:rotate-90 transition-transform text-[#C9A84C]" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">More Southport guides</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/dog-friendly-southport", label: "Dog-Friendly Southport" },
              { href: "/guides/best-cafes-southport", label: "Best Cafés" },
              { href: "/guides/parking-southport", label: "Parking Guide" },
              { href: "/guides/southport-beach", label: "Southport Beach" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] text-sm font-semibold transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
