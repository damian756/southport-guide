import Link from "next/link";
import Image from "next/image";
import { LATEROOMS } from "@/lib/affiliate-links";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Ticket,
  Clock,
  Utensils,
  Star,
  Sparkles,
} from "lucide-react";
import SensoryInfoCard from "@/app/components/SensoryInfoCard";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-flower-show");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Flower Show 2026, Southport Flower Show tickets, Southport Flower Show dates, Southport Flower Show parking, Victoria Park Southport",
  alternates: { canonical: `${BASE_URL}/guides/southport-flower-show` },
  openGraph: {
    title: "Southport Flower Show 2026 | 20–23 August · Complete Guide",
    description: "One of England's most prestigious flower shows. Tickets from £25, celebrity schedule, parking, and what to see at Victoria Park, 20–23 August 2026.",
    url: `${BASE_URL}/guides/southport-flower-show`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-flower-show-hero.webp`, width: 1200, height: 630, alt: "The SFS flower letters at Southport Flower Show, decorated with sunflowers and blue hydrangeas" }],
  },
};

const CELEBRITIES = [
  {
    day: "Thursday",
    date: "20 Aug",
    guests: [
      { name: "Adam Frost", role: "BBC Gardeners' World presenter" },
      { name: "Martin & Jill Fish", role: "The Potting Shed, show daily" },
    ],
    tip: "Opening day, quietest. Best day for first-timers.",
    badgeColor: "bg-green-100 text-green-800",
    dayColor: "bg-green-600",
  },
  {
    day: "Friday",
    date: "21 Aug",
    guests: [
      { name: "Arit Anderson", role: "BBC Gardeners' World presenter" },
      { name: "Phil Vickery", role: "Chef · cookery demonstrations" },
    ],
    tip: "Good balance, busier than Thursday, calmer than the weekend.",
    badgeColor: "bg-blue-100 text-blue-800",
    dayColor: "bg-blue-600",
  },
  {
    day: "Saturday",
    date: "22 Aug",
    guests: [
      { name: "Anton Du Beke", role: "Strictly Come Dancing" },
      { name: "Andy Day", role: "CBeebies · family entertainment" },
    ],
    tip: "Busiest day. Arrive early or expect large crowds from 11am.",
    badgeColor: "bg-amber-100 text-amber-800",
    dayColor: "bg-amber-600",
  },
  {
    day: "Sunday",
    date: "23 Aug",
    guests: [
      { name: "Briony May Williams", role: "Great British Bake Off" },
      { name: "Martin & Jill Fish", role: "The Potting Shed finale" },
    ],
    tip: "Quieter afternoon. Some exhibitors sell off plants at reduced prices.",
    badgeColor: "bg-purple-100 text-purple-800",
    dayColor: "bg-purple-600",
  },
];

const TICKETS = [
  { type: "Adult Day Ticket", earlyBird: "£25", gate: "—", notes: "Early bird online price. Children under 16 free." },
  { type: "Child (under 16)", earlyBird: "Free", gate: "Free", notes: "With a paying adult" },
  { type: "4-Day Patron Pass", earlyBird: "£90", gate: "—", notes: "Online only. All four days." },
  { type: "Afternoon Tea + Entry", earlyBird: "£55", gate: "—", notes: "Includes show entry + catering. Book early." },
  { type: "VIP Experience", earlyBird: "£120", gate: "—", notes: "Full VIP package. Limited availability." },
];

const FAQS = [
  { q: "When is the Southport Flower Show 2026?", a: "The Southport Flower Show 2026 runs from Thursday 20 August to Sunday 23 August 2026. Four days at Victoria Park, Southport. The show typically opens at 9am and closes at 6pm Thursday to Saturday, with an earlier close on Sunday." },
  { q: "Where is the Southport Flower Show?", a: "Victoria Park, Southport. The postcode is PR8 1RX. Victoria Park is on the eastern edge of Southport town centre, approximately 15 minutes' walk from Southport railway station and 10 minutes' walk from Lord Street." },
  { q: "How much are Southport Flower Show 2026 tickets?", a: "Early bird adult day tickets are £25 online. Children under 16 are free with a paying adult. The 4-day Patron Pass is £90 online. Afternoon Tea packages start at £55 (includes entry). Book at southportflowershow.co.uk via Ticket Quarter." },
  { q: "Is there parking at the Southport Flower Show?", a: "Victoria Park has limited on-site parking (PR8 1RX). Most visitors use park-and-ride services operating during the show from Birkdale Common (PR8 2LX), or park in town centre car parks and walk approximately 10–15 minutes. Full parking details are published at southportflowershow.co.uk before the show." },
  { q: "What is the best day to go to the Southport Flower Show?", a: "Thursday (opening day) is consistently the quietest. Everything is fresh, exhibitors are at their most enthusiastic, and you can take your time in the competitive classes without crowds. First-timers should go Thursday. Saturday is the busiest day, arrive early if that's your only option." },
  { q: "What should I wear to the Southport Flower Show?", a: "Comfortable walking shoes are non-negotiable, the site is large and mostly on grass. August weather in Lancashire can be warm and sunny, cool and rainy, or both on the same day. Bring layers and a waterproof. Sun cream for warm days. Avoid heels on the grass." },
  { q: "How do I get to the Southport Flower Show without a car?", a: "Train to Southport station (Merseyrail from Liverpool Central, approximately 45 minutes), then 15 minutes' walk or a short bus ride to Victoria Park. Shuttle buses usually operate from the town centre during the show. The show also publishes cycling routes from Southport station." },
  { q: "What's at the Southport Flower Show?", a: "Show gardens (Chelsea-calibre designed gardens created for the event), competitive flower and vegetable classes (the heart of the show), a large shopping area of exhibitors, a regional food and drink market, live demonstrations, celebrity appearances, and live entertainment. The competitive horticulture is the bit that surprises first-timers most." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Flower Show 2026",
  startDate: "2026-08-20",
  endDate: "2026-08-23",
  description: "One of England's most prestigious horticultural shows, held at Victoria Park, Southport, 20–23 August 2026.",
  url: `${BASE_URL}/guides/southport-flower-show`,
  location: {
    "@type": "Place",
    name: "Victoria Park, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Victoria Park",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Southport Flower Show" },
  offers: [
    { "@type": "Offer", name: "Adult Day Ticket (Early Bird)", price: "25.00", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://ticketquarter.co.uk/southportflowershow/Online/default.asp" },
    { "@type": "Offer", name: "Child (under 16)", price: "0.00", priceCurrency: "GBP", availability: "https://schema.org/InStock" },
    { "@type": "Offer", name: "4-Day Patron Pass", price: "90.00", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://ticketquarter.co.uk/southportflowershow/Online/default.asp" },
    { "@type": "Offer", name: "Afternoon Tea + Entry", price: "55.00", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://ticketquarter.co.uk/southportflowershow/Online/default.asp" },
  ],
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

export default function SouthportFlowerShowGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1A4020] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-flower-show-hero.webp"
            alt="The SFS flower letters at Southport Flower Show, decorated with sunflowers and blue hydrangeas at Victoria Park"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                20–23 August 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Victoria Park · Southport · PR8 1RX</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Flower Show</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              One of England&apos;s most prestigious horticultural shows. Four days every August in Victoria Park,
              show gardens, champion flowers, celebrity appearances, food market, and competitive horticulture
              that takes year-round preparation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://ticketquarter.co.uk/southportflowershow/Online/default.asp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Buy Tickets from £25 →
              </a>
              <a href="#celebrities" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Celebrity Schedule
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#1A4020] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "20–23 Aug", label: "When", sub: "Thu–Sun, August 2026" },
              { icon: MapPin, value: "PR8 1RX", label: "Where", sub: "Victoria Park" },
              { icon: Ticket, value: "From £25", label: "Tickets", sub: "Early bird online" },
              { icon: Star, value: "Since 1924", label: "Heritage", sub: "100+ years of shows" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-4">
                <s.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <div className="text-lg font-extrabold text-[#C9A84C]">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                <div className="text-[11px] text-white/40 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-20">

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Flower Show, Honestly</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I&apos;ll be honest: I went to the Southport Flower Show for the first time under duress. My wife wanted to go,
                I went along, and within about twenty minutes I was completely absorbed by the competitive horticulture section
                and had forgotten I&apos;d been reluctant. That&apos;s the show&apos;s trick.
                It looks like it&apos;s for gardeners, and then it turns out to be for everyone.
              </p>
              <p>
                The show gardens are genuinely impressive, the same level of craft you&apos;d expect from Chelsea,
                in a park that Southport locals walk through every week without thinking about it. The competitive flower and
                vegetable classes are a revelation: the standard is extraordinary, the exhibitors have been preparing all year,
                and the judging takes it completely seriously. A prize-winning onion here is treated as seriously as a prize-winning
                garden. Rightly.
              </p>
              <p>
                The food market is also excellent, regional producers, proper food, not the usual show fare.
                And the shopping for garden tools, accessories, plants, and gifts tends to be better quality
                than anything you&apos;d find in a garden centre.
              </p>
              <p>
                2026 brings The Lakeside Reset, a new wellness and wellbeing garden area. I&apos;ll reserve judgement
                until I see it, but the principle of adding more structured rest areas to a site you spend 6+ hours on
                is sound.
              </p>
              <p>
                Go Thursday if you can, quieter, easier to move around, same show. Saturday is busy.
                Wear comfortable shoes. Bring something waterproof just in case.
              </p>
            </div>
          </div>
        </section>

        {/* ── New for 2026 ── */}
        <section>
          <div className="bg-gradient-to-r from-[#1A4020] to-[#2D6A35] rounded-2xl p-8 md:p-10 text-white">
            <div className="flex items-start gap-4">
              <div className="flex-none bg-[#C9A84C] rounded-full p-2.5">
                <Sparkles className="w-5 h-5 text-[#1B2E4B]" />
              </div>
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">New for 2026</p>
                <h2 className="font-display text-2xl font-bold mb-3">The Lakeside Reset</h2>
                <p className="text-white/75 text-base leading-relaxed max-w-2xl">
                  New for 2026: a dedicated wellness and wellbeing garden area alongside the main show site.
                  Designed to give visitors somewhere to slow down, sensory planting, water features, quiet seating.
                  It&apos;s a sensible addition for a show that&apos;s been gradually expanding for over a century.
                  More details will be published at{" "}
                  <a href="https://www.southportflowershow.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-medium">southportflowershow.co.uk</a>{" "}
                  ahead of the show.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Celebrity Schedule ── */}
        <section id="celebrities" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Who&apos;s Appearing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Celebrity Schedule 2026</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-2xl leading-relaxed">
              Based on announced and expected appearances. Full programme confirmed at{" "}
              <a href="https://www.southportflowershow.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-medium">southportflowershow.co.uk</a>.
              Day assignments may change.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CELEBRITIES.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${day.dayColor} px-5 py-3`}>
                  <p className="text-white font-black text-base">{day.day}</p>
                  <p className="text-white/70 text-xs">{day.date}</p>
                </div>
                <div className="p-5">
                  <div className="space-y-3 mb-4">
                    {day.guests.map((g) => (
                      <div key={g.name}>
                        <p className="font-bold text-[#1B2E4B] text-sm">{g.name}</p>
                        <p className="text-gray-500 text-xs">{g.role}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`text-[11px] font-semibold px-2 py-1.5 rounded-lg ${day.badgeColor}`}>
                    {day.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What to See ── */}
        <section id="what-to-see" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">At the Show</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s There</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🌹", title: "Show Gardens", detail: "The centrepiece of the show. Full-scale designed gardens created specifically for the event, the same calibre of craft you&apos;d see at Chelsea or Hampton Court. The brief changes each year; some years formal, some naturalistic, some contemporary. Give yourself time here." },
              { emoji: "🏆", title: "Competitive Classes", detail: "The heart of the show. Classes for flowers (roses, dahlias, sweet peas, chrysanthemums), vegetables (leeks, onions, potatoes, runner beans), floral art, and more. Exhibitors compete nationally. The standard is exceptional. This is where the show&apos;s century of heritage lives." },
              { emoji: "🛍️", title: "Show Shopping", detail: "Enormous range of exhibitors selling tools, plants, garden accessories, gifts, and specialist items you won&apos;t find elsewhere. Much better quality than a garden centre sale. Allow a proper hour for browsing, and a bag for what you buy." },
              { emoji: "🍽️", title: "Food Market", detail: "Regional food and drink producers, street food, and specialist suppliers. Quality is consistently high. The food market has become one of the show&apos;s highlights in recent years, plan to eat lunch here rather than bringing a packed lunch." },
              { emoji: "🎭", title: "Demonstrations", detail: "Live demonstrations from horticultural experts, chefs, and craftspeople. Cooking on the outdoor stage, planting and growing workshops, and specialist talks throughout the day. The celebrity appearances are part of this programme, check the programme when you arrive." },
              { emoji: "🌿", title: "The Lakeside Reset", detail: "New for 2026: a dedicated wellness garden area with sensory planting, water features, and quiet seating. A place to step away from the crowds for half an hour. Particularly good for those who find large shows overwhelming, or who just want to sit somewhere green and quiet." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Which Day ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Which Day?</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Choosing Your Day</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { day: "Thursday 20 Aug", label: "Opening Day", emoji: "⭐", highlight: "Best for quiet browsing", detail: "Opening day is almost always the least crowded. Everything is fresh, exhibitors are enthusiastic, and you can take your time in the competitive classes without a crowd in the way. First-timers: go Thursday.", badge: "Recommended", badgeColor: "bg-green-100 text-green-800" },
              { day: "Friday 21 Aug", label: "Mid-Show", emoji: "🌸", highlight: "Good balance", detail: "Friday is busier than Thursday but calmer than the weekend. Good day for a relaxed visit. The food market is usually at its best Friday through Sunday, producers tend to bring more on the second day.", badge: "Good choice", badgeColor: "bg-blue-100 text-blue-800" },
              { day: "Saturday 22 Aug", label: "Peak Day", emoji: "🎉", highlight: "Busiest, arrive early", detail: "The most popular day. Atmosphere is excellent, entertainment is at its best, Anton Du Beke is here, but the site is very busy. If Saturday is your only option: arrive at opening, head to the show gardens first before crowds build from 11am.", badge: "Book early", badgeColor: "bg-amber-100 text-amber-800" },
              { day: "Sunday 23 Aug", label: "Final Day", emoji: "🌻", highlight: "Quieter afternoon", detail: "Sunday morning is busy, but the afternoon quietens as visitors drift away. Some exhibitors sell off plants and produce at reduced prices toward the end of the day. A good option if you can&apos;t make Thursday or Friday.", badge: "Bargains later", badgeColor: "bg-purple-100 text-purple-800" },
            ].map((item) => (
              <div key={item.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mt-3 mb-0.5">{item.day}</h3>
                <p className="text-[11px] text-gray-400 font-medium mb-2">{item.label}</p>
                <p className="text-[#C9A84C] text-xs font-semibold mb-3">{item.highlight}</p>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Tickets Table ── */}
        <section id="tickets" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Tickets &amp; Prices</h2>
            <p className="text-gray-600 mt-3 text-lg max-w-2xl">
              Early bird prices are significantly cheaper than gate prices. Book at{" "}
              <a href="https://www.southportflowershow.co.uk" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] font-medium hover:underline">southportflowershow.co.uk</a>{" "}
             . Saturday tends to sell out.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#1A4020] text-white">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-bold text-xs tracking-wider">Ticket</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider">Early Bird</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider">Gate Price</th>
                    <th className="text-left px-4 py-3.5 font-bold text-xs tracking-wider hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {TICKETS.map((t) => (
                    <tr key={t.type} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#1B2E4B]">{t.type}</td>
                      <td className="px-4 py-4 text-[#1A4020] font-bold">{t.earlyBird}</td>
                      <td className="px-4 py-4 text-gray-600">{t.gate}</td>
                      <td className="px-4 py-4 text-gray-500 hidden sm:table-cell text-sm">{t.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">Prices shown are indicative 2026 early bird rates. Confirm at southportflowershow.co.uk before booking.</p>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Parking &amp; Getting Here</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: MapPin, title: "Venue", items: ["Victoria Park, Southport, PR8 1RX", "10–15 minute walk from Southport town centre (Lord Street)", "15 minute walk from Southport railway station", "Follow show signage from town centre, well posted during show week"] },
              { icon: Car, title: "Parking", items: ["Park-and-ride from Birkdale Common, PR8 2LX, runs during the show", "Town centre car parks: 10–15 min walk to Victoria Park", "Limited on-site parking at PR8 1RX, sold through the website, books fast", "Train to Southport (Merseyrail from Liverpool Central) + 15 min walk is the easiest option"] },
              { icon: Ticket, title: "Tickets", items: ["Adult day ticket: £25 early bird online. Children under 16 free.", "4-day Patron Pass: £90 online. Afternoon Tea + entry from £55.", "Saturday sells out. Book early if that&apos;s your day.", "Book via Ticket Quarter at southportflowershow.co.uk"] },
              { icon: Clock, title: "What to Bring", items: ["Comfortable walking shoes, the site is large and mostly grass", "Light waterproof. August in Lancashire, always prepared", "Sun cream for warm days on an open site", "Cash and/or card, most exhibitors accept both", "Bags for purchases, exhibitors often don&apos;t provide them", "A plan, it&apos;s a big show, some people find a rough priority order helpful"] },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.items.map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── First Timer Guide ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">First Timer&apos;s Order of the Day</h2>
            <p className="text-gray-600 text-sm mb-6">What Terry&apos;s learned after going more times than he planned to.</p>
            <div className="space-y-4">
              {[
                { step: "1", text: "Arrive at opening (9am). Head straight to the show gardens before the crowds build. This is where you need the most space and time." },
                { step: "2", text: "Competitive classes next, flowers and vegetables. Before 11am is when the displays are at their best and the halls are quieter." },
                { step: "3", text: "Early lunch at the food market, before the 12–2pm rush. The queues double from noon onwards." },
                { step: "4", text: "Shopping in the afternoon, exhibitors are settled and less rushed than opening. This is when conversations happen." },
                { step: "5", text: "Celebrity appearance / main stage entertainment after lunch. Check the day's programme at the entrance when you arrive." },
                { step: "6", text: "The Lakeside Reset (new 2026) for a 20-minute break before the afternoon session. Your feet will thank you." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-[#1A4020] text-[#C9A84C] text-sm font-black flex items-center justify-center">{item.step}</div>
                  <p className="text-gray-700 text-sm leading-relaxed pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Staying nearby ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Staying in Southport for the Flower Show</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <Utensils className="w-6 h-6 text-[#C9A84C] mb-3" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">Eating Out</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Show week in August is busy across Southport. If you&apos;re eating out in the evening,
                  book in advance, particularly for Thursday and Saturday nights when the show is at full attendance.
                  Lord Street has the widest restaurant choice (10 minutes from Victoria Park).
                  Birkdale village is excellent for dinner and tends to be slightly less hectic than the town centre.
                </p>
                <Link href="/restaurants" className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors">
                  Restaurant Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div>
                <Star className="w-6 h-6 text-[#C9A84C] mb-3" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">Hotels &amp; Accommodation</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Flower Show week fills Southport&apos;s accommodation fast, particularly for Thursday and Friday nights.
                  Book well ahead if you&apos;re planning to stay. Town centre hotels on Lord Street are the most convenient.
                  Birkdale B&Bs are good value and well located for both the show site and Birkdale&apos;s independent restaurants.
                </p>
                <Link href="/hotels" className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors">
                  Hotels in Southport <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cross-sell to Air Show ── */}
        <section>
          <div className="bg-[#0A1B3D] rounded-2xl p-8 md:p-10 text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Bank Holiday Weekend</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">And Then There&apos;s the Air Show</h2>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-6">
              The Southport Air Show is 29–30 August 2026, the Bank Holiday weekend, just one week after the Flower Show.
              Free event. 100,000+ people. The display line runs along the beach and the aircraft fly at close range.
              If you&apos;re in Southport in late August, you could honestly do both and make a proper trip of it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/southport-air-show"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-colors">
                Air Show Guide →
              </Link>
              <Link href="/hotels"
                className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Book a Hotel
              </Link>
            </div>
          </div>
        </section>

        {/* ── Sensory & Accessibility ── */}
        <SensoryInfoCard
          noiseLevel="moderate"
          noiseLevelNote="Live music stages, PA announcements, general show ambience. Avoidable by staying in the show gardens away from entertainment areas."
          crowdDensity="high"
          crowdDensityNote="Ticketed site but busy, particularly on Saturday. Thursday is the quietest day by a significant margin."
          quietSpace="The show gardens themselves — the designed gardens created for the event — are relatively calm and away from the main entertainment zones. Head there first before the crowds build."
          sensoryTriggers={["PA announcements across the site", "Celebrity stage noise", "Busy food market area", "Unexpected queues at busy exhibits", "Saturday afternoon crowd peaks"]}
          sunflowerNote="The Southport Flower Show is a large outdoor event. Contact the show organisers via southportflowershow.co.uk ahead of your visit if you have specific accessibility requirements."
          lowSensoryTip="Thursday (opening day) is consistently the quietest. Arrive at 10am, go to the show gardens first, avoid the celebrity stage and food market until after 2pm when they are better managed. Children under 16 are free, so this is one of the most accessible family events in the Southport calendar."
        />

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Flower Show. FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Other Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Other Southport Events in 2026</h2>
            <p className="text-gray-600 text-sm mb-6">The Flower Show is one of ten major events in Southport&apos;s 2026 calendar.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { event: "The Open Championship", month: "12–19 July 2026", desc: "Royal Birkdale. The 154th Open. Southport&apos;s biggest sporting event ever.", href: "/the-open-2026" },
                { event: "Southport Air Show", month: "29–30 August 2026", desc: "Free. 100,000+ spectators. Southport beach. One of the UK&apos;s best air shows.", href: "/guides/southport-air-show" },
                { event: "Full Events Calendar", month: "All of 2026", desc: "Lightport, Comedy Festival, Food Festival, Fireworks Championship and more.", href: "/events" },
              ].map((item) => (
                <Link key={item.event} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.event} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tickets CTA ── */}
        <section className="bg-[#1A4020] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport Flower Show 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Early. Saturday Sells Out</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Early bird adult tickets are £25 online. 4-day Patron Pass £90. Saturday sells out every year.
            Book through the official website for the best prices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.southportflowershow.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors"
            >
              Book Tickets, southportflowershow.co.uk
            </a>
            <Link href="/hotels" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              Find a Hotel →
            </Link>
            <a
              href={LATEROOMS.southport}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20"
            >
              Compare on LateRooms →
            </a>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
