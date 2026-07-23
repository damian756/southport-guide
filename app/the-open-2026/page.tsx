import Link from "next/link";
import Image from "next/image";
import { Hotel, Utensils, Car, MapPin, CalendarDays, ArrowRight, ExternalLink, Trophy, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/southport-data";
import { SYKES } from "@/lib/affiliate-links";

export const metadata = {
  title: "The Open 2026 Southport | Ryan Fox Wins at Royal Birkdale: Results and Review",
  description:
    "The 154th Open Championship at Royal Birkdale is over. Ryan Fox of New Zealand won the Claret Jug with a birdie on the 72nd hole. Full results, review, and your guide to Southport and the Sefton Coast.",
  keywords: "The Open 2026 result, Ryan Fox winner, Royal Birkdale 2026, Open Championship Southport, The Open 2026 winner, Ryan Fox Claret Jug, Southport Open 2026",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "The Open 2026 Southport | Ryan Fox Wins at Royal Birkdale",
    description: "Ryan Fox wins The 154th Open Championship at Royal Birkdale. Full results, review and Southport visitor guide for the Sefton Coast's greatest sporting week.",
    url: "https://www.southportguide.co.uk/the-open-2026",
    images: [{ url: "/images/open-2026.webp", width: 1200, height: 630, alt: "The Open 2026 at Royal Birkdale" }],
  },
};

const CHAMPIONS = [
  { year: 2017, name: "Jordan Spieth", country: "USA", flag: "🇺🇸" },
  { year: 2008, name: "Padraig Harrington", country: "Ireland", flag: "🇮🇪" },
  { year: 1998, name: "Mark O'Meara", country: "USA", flag: "🇺🇸" },
  { year: 1991, name: "Ian Baker-Finch", country: "Australia", flag: "🇦🇺" },
  { year: 1983, name: "Tom Watson", country: "USA", flag: "🇺🇸" },
  { year: 1976, name: "Johnny Miller", country: "USA", flag: "🇺🇸" },
  { year: 1971, name: "Lee Trevino", country: "USA", flag: "🇺🇸" },
  { year: 1965, name: "Peter Thomson", country: "Australia", flag: "🇦🇺" },
  { year: 1961, name: "Arnold Palmer", country: "USA", flag: "🇺🇸" },
  { year: 1954, name: "Peter Thomson", country: "Australia", flag: "🇦🇺" },
];

const KEY_DATES = [
  { date: "Mon 13 Jul", label: "Practice Day 1", desc: "Open to spectators. Best day to walk the course and get close to players.", badge: "Practice" },
  { date: "Tue 14 Jul", label: "Practice Day 2", desc: "Celebrity Pro-Am in the afternoon. Relaxed atmosphere, shorter queues.", badge: "Practice" },
  { date: "Wed 15 Jul", label: "Practice Day 3", desc: "Final practice. Players finalise game plans. Worth attending for access.", badge: "Practice" },
  { date: "Thu 16 Jul", label: "Round 1", desc: "Championship begins. Get in early. The crowd builds fast after midday.", badge: "Championship" },
  { date: "Fri 17 Jul", label: "Round 2", desc: "Cut day. Drama on every hole. Afternoon is peak atmosphere.", badge: "Championship" },
  { date: "Sat 18 Jul", label: "Round 3: Moving Day", desc: "The leaderboard reshapes. One of the best days in all of sport.", badge: "Championship" },
  { date: "Sun 19 Jul", label: "Final Round", desc: "Champion crowned. Arrive early and don't plan anything for the evening.", badge: "Championship" },
];

const FAQS = [
  {
    q: "How do I get to Royal Birkdale for The Open 2026?",
    a: "Do not drive to the course. Road closures around Birkdale make it impractical and parking near the club is reserved for accredited officials only. The best option is Merseyrail from Southport or Liverpool to Hillside station, which is approximately 5 minutes walk from the Royal Birkdale entrance on Waterloo Road. Hillside is the second stop from Southport. Park and ride buses also operate from designated sites across Southport. Full transport details are published by The R&A at theopen.com.",
  },
  {
    q: "Where should I stay for The Open Championship 2026?",
    a: "Accommodation in and around Southport is almost fully booked for Open week. If you haven't booked yet, check Birkdale village first (walking distance to the course), then Southport town centre (shuttle bus access). Formby and Ormskirk are viable fallback options, 20–30 minutes away. See our full accommodation guide.",
  },
  {
    q: "Can I buy tickets for The Open 2026 on the gate?",
    a: "No. The Open Championship is a ticketed event. You cannot purchase on the gate on championship round days (Thursday–Sunday). Practice round tickets (Monday–Wednesday) are sold in advance through theopen.com and are more widely available. Championship round tickets frequently sell out months in advance. Buy as early as possible.",
  },
  {
    q: "What is the difference between practice round and championship round tickets?",
    a: "Practice round tickets (Mon–Wed, 13–15 July) are significantly cheaper, typically £30–50 per day, and offer excellent player access. You can walk close to the fairways and watch players up close without the championship-day crowds. Championship tickets (Thu–Sun) are more expensive, starting from around £60–100 per day, but deliver the full competitive atmosphere.",
  },
  {
    q: "What can I bring to The Open Championship?",
    a: "Binoculars, waterproofs (essential, it is Lancashire in July), comfortable walking shoes, a small soft-sided bag or backpack, sunscreen, and cash. Banned items include selfie sticks, tripods, large umbrellas (small clear ones are permitted), drones, commercial signage, and glass containers. Check the full restricted items list at theopen.com.",
  },
  {
    q: "How far is Royal Birkdale from Southport town centre?",
    a: "Approximately 2 miles, or a 5–10 minute drive/taxi. Birkdale village, which sits right next to the club, is about 1.5 miles from the Lord Street shopping area. Birkdale train station is a 10–15 minute walk from the course entrance.",
  },
  {
    q: "What is the best day to attend The Open if I can only go once?",
    a: "Saturday (Round 3, Moving Day) is widely regarded as the best single day at any Open. The leaderboard changes shape, the pressure builds, and the atmosphere is electric. If Saturday is sold out, Friday afternoon offers similar drama as players fight to make the cut.",
  },
  {
    q: "Will restaurants and pubs in Southport be busy during Open week?",
    a: "Yes. Extremely busy. Book restaurants in advance, particularly in Birkdale village and along Lord Street. Evening bookings from Thursday onwards are the hardest to secure. See our restaurants guide for the best options, and book now.",
  },
];

const golfPosts = BLOG_POSTS.filter((p) => p.categorySlug === "golf").slice(0, 2);

const EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The 154th Open Championship",
  startDate: "2026-07-12",
  endDate: "2026-07-19",
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Royal Birkdale Golf Club",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Waterloo Road",
      addressLocality: "Birkdale, Southport",
      postalCode: "PR8 2LX",
      addressCountry: "GB",
    },
    geo: { "@type": "GeoCoordinates", latitude: 53.6267, longitude: -3.0450 },
  },
  organizer: { "@type": "Organization", name: "The R&A", url: "https://www.theopen.com" },
  description: "The 154th Open Championship at Royal Birkdale, Southport, 12-19 July 2026. Ryan Fox of New Zealand won the Claret Jug with a birdie on the 72nd hole, finishing 10-under par.",
  image: "https://www.southportguide.co.uk/images/open-2026.webp",
  url: "https://www.southportguide.co.uk/the-open-2026",
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open Championship 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
  ],
};

function buildFaqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export default function TheOpen2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqLd(FAQS)) }} />
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex items-end bg-[#1B2E4B] overflow-hidden" style={{ minHeight: "calc(100vh - 4rem)" }}>
        <Image
          src="/images/open-2026.webp"
          alt="Royal Birkdale Golf Club, Southport, host of The 154th Open Championship 2026"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        {/* Layered overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1E30]/60 to-transparent" />

        <div className="relative container mx-auto px-4 max-w-6xl pb-20 pt-40" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          {/* Championship badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Completed 19 July 2026
            </span>
            <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Royal Birkdale, Southport</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            The 154th<br />
            <span className="text-[#C9A84C]">Open Championship</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mb-8 leading-relaxed">
            Ryan Fox of New Zealand wins the Claret Jug at Royal Birkdale. A 12-foot birdie on the 72nd hole sealed a one-shot victory over Cameron Young.
          </p>

          {/* Result flag */}
          <div className="flex items-center gap-2 mb-8 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-xl px-4 py-3 max-w-lg">
            <Trophy className="w-4 h-4 text-[#C9A84C] flex-none" />
            <p className="text-[#C9A84C] text-sm font-medium">Ryan Fox, New Zealand. 10-under par. Champion Golfer of the Year 2026.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog/open-2026-ryan-fox-wins-southport"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-4 h-4" /> Read the Southport Review
            </Link>
            <a
              href="https://www.theopen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors flex items-center gap-2 border border-white/20"
            >
              <ExternalLink className="w-4 h-4" /> Official Results (R&A)
            </a>
          </div>
        </div>
      </section>

      {/* ── Quick nav cards ───────────────────────────────────────── */}
      <section className="bg-[#1B2E4B] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/10">
            {[
              { href: "/the-open-2026/accommodation", icon: Hotel, label: "Where to Stay", sub: "Hotels & cottages" },
              { href: "/the-open-2026/restaurants", icon: Utensils, label: "Eat & Drink", sub: "Restaurants and pubs" },
              { href: "/the-open-2026/pubs", icon: MapPin, label: "Pubs", sub: "Near the course" },
              { href: "/the-open-2026/getting-there", icon: Car, label: "Getting There", sub: "Transport and parking" },
              { href: "/the-open-2026/things-to-do", icon: Trophy, label: "Things to Do", sub: "Explore Southport" },
            ].map(({ href, icon: Icon, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center text-center px-4 py-6 hover:bg-white/5 transition-colors"
              >
                <Icon className="w-6 h-6 text-[#C9A84C] mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-white text-sm">{label}</p>
                <p className="text-white/40 text-xs mt-0.5 hidden sm:block">{sub}</p>
              </Link>
            ))}
            <a
              href="https://www.theopen.com/latest/ryan-fox-wins-the-open-day-four-report"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center px-4 py-6 hover:bg-white/5 transition-colors"
            >
              <Trophy className="w-6 h-6 text-[#C9A84C] mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-white text-sm">Results</p>
              <p className="text-white/40 text-xs mt-0.5 hidden sm:block">Final leaderboard</p>
            </a>
          </div>
        </div>
      </section>

      {/* Dark-to-cream fade */}
      <div className="h-12 bg-gradient-to-b from-[#1B2E4B] to-[#FAF8F5]" />

      <div className="container mx-auto px-4 max-w-6xl pb-24 pt-8 space-y-20">

        {/* ── Result ───────────────────────────────────────────────── */}
        <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-5 h-5 text-[#C9A84C] flex-none" />
            <p className="text-[#C9A84C] font-bold text-sm uppercase tracking-wider">The 154th Open Championship: Final Result</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Ryan Fox wins the Claret Jug at Royal Birkdale</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-4">
                Ryan Fox of New Zealand sank a 12-foot birdie on the 72nd hole on Sunday 19 July to win The 154th Open Championship by one stroke. He finished 10-under par, edging Cameron Young who had posted a superb 64 earlier in the day and waited on the practice range.
              </p>
              <p className="text-white/65 text-sm leading-relaxed mb-4">
                Fox, 39, had never finished in the top 10 at a major before this week. He came from T52 after Friday to lift the Claret Jug. It is the largest 36-hole comeback by position in men&apos;s major history. Tommy Fleetwood, the home crowd favourite, finished tied fourth and received a tremendous reception from the Southport galleries.
              </p>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Final leaderboard: Fox -10, Cameron Young -9, Sam Burns -8, Scottie Scheffler -7, Tommy Fleetwood -7.
              </p>
              <a
                href="https://www.theopen.com/latest/ryan-fox-wins-the-open-day-four-report"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Full report at theopen.com
              </a>
            </div>
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">Final Leaderboard</p>
              <div className="space-y-3">
                {[
                  { pos: "1st", name: "Ryan Fox", country: "New Zealand", score: "-10" },
                  { pos: "2nd", name: "Cameron Young", country: "USA", score: "-9" },
                  { pos: "3rd", name: "Sam Burns", country: "USA", score: "-8" },
                  { pos: "T4th", name: "Scottie Scheffler", country: "USA", score: "-7" },
                  { pos: "T4th", name: "Tommy Fleetwood", country: "England", score: "-7" },
                ].map(({ pos, name, country, score }) => (
                  <div key={name} className="flex items-center gap-4 border-l-2 border-[#C9A84C]/40 pl-4">
                    <span className="text-white/40 text-xs w-8 flex-none">{pos}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm">{name}</p>
                      <p className="text-white/50 text-xs mt-0.5">{country}</p>
                    </div>
                    <span className="font-bold text-[#C9A84C] text-sm">{score}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/blog/open-2026-ryan-fox-wins-southport"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C9A84C] hover:text-[#E8C87A] transition-colors"
              >
                Read the Southport review <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── About Royal Birkdale ─────────────────────────────────── */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">About the Course</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-5 leading-tight">
                Royal Birkdale: One of the World&apos;s Great Links Courses
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Royal Birkdale Golf Club sits in the sand dunes of Southport, Merseyside, less than two miles from the town centre. Founded in 1889 and awarded its Royal charter in 1951, it is consistently ranked among the finest links courses on the planet, and has hosted The Open Championship more times than almost any other venue.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What makes Birkdale distinctive is its layout. Unlike many links courses, the fairways run through the valleys between the dunes rather than over the tops of them. The result is a course where the wind matters enormously, natural hollows shape every shot, and the rough (thick, punishing willow scrub) demands precision from the first tee to the 72nd hole.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In 2026, 250,000 spectators are expected across the week. The world&apos;s best players will be here. And for those of us who live nearby, it is genuinely extraordinary to have this on our doorstep.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                If you&apos;re planning to play Royal Birkdale before or after Open week,{" "}
                <a
                  href="https://www.seftonlinks.com/courses/royal-birkdale"
                  className="font-medium text-[#C9A84C] underline underline-offset-2 hover:text-[#1B2E4B] transition-colors"
                >
                  SeftonLinks has the full course guide
                </a>{" "}
                . Green fees, visitor policy, handicap requirements, and what to expect on the day.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10th", label: "Time hosting The Open" },
                { value: "1889", label: "Year founded" },
                { value: "250,000+", label: "Spectators expected" },
                { value: "18", label: "Championship holes" },
                { value: "6,992", label: "Yards (par 70)" },
                { value: "2 miles", label: "From Southport centre" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                  <p className="font-display text-3xl font-bold text-[#C9A84C]">{value}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Dates ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CalendarDays className="w-6 h-6 text-[#C9A84C]" />
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Key Dates: July 2026</h2>
          </div>
          <div className="space-y-3">
            {KEY_DATES.map(({ date, label, desc, badge }) => (
              <div
                key={date}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-white rounded-2xl border px-6 py-4 ${
                  badge === "Championship" ? "border-[#C9A84C]/30" : "border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 sm:w-36 flex-none">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    badge === "Championship"
                      ? "bg-[#C9A84C] text-[#1B2E4B]"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {badge}
                  </span>
                </div>
                <div className="sm:w-32 flex-none">
                  <p className="font-bold text-[#1B2E4B] text-sm">{date}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1B2E4B] text-sm">{label}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-[#FAF8F5] border border-gray-200 rounded-2xl p-5">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#1B2E4B]">Terry&apos;s tip:</span> If you can only go once and budget allows, go Saturday. Round 3 (Moving Day) is when the Open truly comes alive. The leaderboard reshapes, pressure builds, and you get atmosphere that doesn&apos;t exist anywhere else in sport.
              If championship tickets are gone, a practice round (Monday–Wednesday) is genuinely excellent value. You can walk the entire course, watch players up close, and experience Royal Birkdale without the championship-day scrum.
            </p>
          </div>
        </section>

        {/* ── Getting There & Park and Ride ───────────────────────── */}
        <section>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Transport</p>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Getting There: Park &amp; Ride and Public Transport</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Do not drive to Royal Birkdale on championship days. Road closures cover the streets around the club and residential parking near the course is enforcement-controlled. The R&amp;A operates designated park and ride sites around Southport. These are the sensible option if you&apos;re travelling by car.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: "🚌",
                title: "Park & Ride",
                body: "Official park and ride buses run from designated sites across Southport to the course on all championship days. Specific sites are confirmed by The R&A closer to the event at theopen.com. Book in advance. Spaces sell out.",
              },
              {
                icon: "🚆",
                title: "Train",
                body: "Hillside station (Merseyrail Southport line) is the closest station to Royal Birkdale, approximately 5 minutes walk from the course entrance on Waterloo Road. It is the second stop from Southport (Southport → Birkdale → Hillside). Trains run from Liverpool Central and Southport. Do not get off at Birkdale station: it is one stop too early and leaves you an extra 10-15 minutes walk.",
              },
              {
                icon: "🚖",
                title: "Taxi",
                body: "From Southport town centre to the course is about £8–12. During championship days taxis are busy. Book ahead or allow extra time. Uber operates in Southport.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-[#1B2E4B]">Terry&apos;s tip:</span> The train is genuinely the easiest option. Get off at Hillside station, not Birkdale. Hillside puts you 5 minutes from the gate. Birkdale is one stop too early and costs you 15 minutes of walking in the heat. Merseyrail runs frequently and if you&apos;re driving from outside Southport, use the park and ride. The R&amp;A publishes confirmed sites and booking at{" "}
              <a href="https://www.theopen.com" target="_blank" rel="noopener noreferrer" className="font-medium text-[#C9A84C] hover:underline">theopen.com</a>.
            </p>
          </div>
          <div className="mt-4">
            <Link href="/the-open-2026/getting-there" className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold hover:underline text-sm">
              Full transport and parking guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Spectator Guide ──────────────────────────────────────── */}
        <section>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Know Before You Go</p>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-8">Spectator Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* What to bring */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7">
              <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">✅ What to Bring</h3>
              <ul className="space-y-3">
                {[
                  ["Waterproofs", "It is Lancashire in July. It will rain. Bring a proper jacket, not an umbrella (large ones are restricted)."],
                  ["Comfortable walking shoes", "You will walk several miles. Wellies if wet, trainers if dry. Nothing that will blister."],
                  ["Binoculars", "The course is large. Binoculars transform your experience, particularly on the par-5 holes."],
                  ["Cash", "Some hospitality areas and outside vendors are cash-only."],
                  ["Small soft bag", "Clear or soft-sided bags are permitted. Hard-sided cases are not."],
                  ["Sunscreen", "July can be warm. Southport is more exposed than you expect."],
                  ["Snacks", "Food on site is expensive. A sealed water bottle and some food is allowed."],
                ].map(([item, tip]) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span className="text-[#C9A84C] font-bold flex-none">→</span>
                    <span><span className="font-semibold text-[#1B2E4B]">{item}:</span> {tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's not allowed */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7">
              <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">❌ What&apos;s Not Allowed</h3>
              <ul className="space-y-3">
                {[
                  "Selfie sticks or tripods of any kind",
                  "Drones or remote-controlled devices",
                  "Large or golf umbrellas (small clear ones may be permitted)",
                  "Glass containers of any kind",
                  "Commercial signage, flags, or banners",
                  "Buggies, scooters, or wheeled vehicles (without accessibility exemption)",
                  "Pets (assistance dogs only)",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-600">
                    <span className="text-red-400 font-bold flex-none">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                Always verify the current restricted items list at{" "}
                <a href="https://www.theopen.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
                  theopen.com
                </a>{" "}
                before attending, rules can change between championships.
              </p>
            </div>

            {/* Tickets */}
            <div className="bg-white rounded-2xl border border-gray-100 p-7">
              <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">🎟️ Tickets</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 font-semibold text-[#1B2E4B] text-xs uppercase tracking-wider">Day type</th>
                      <th className="text-left py-2 font-semibold text-[#1B2E4B] text-xs uppercase tracking-wider">Approx. price</th>
                      <th className="text-left py-2 font-semibold text-[#1B2E4B] text-xs uppercase tracking-wider">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr><td className="py-2.5 text-gray-700">Practice rounds (Mon–Wed)</td><td className="py-2.5 font-medium">£30–50</td><td className="py-2.5 text-green-600 font-semibold text-xs">More available</td></tr>
                    <tr><td className="py-2.5 text-gray-700">Round 1–2 (Thu–Fri)</td><td className="py-2.5 font-medium">£60–100</td><td className="py-2.5 text-amber-600 font-semibold text-xs">Limited</td></tr>
                    <tr><td className="py-2.5 text-gray-700">Round 3–4 (Sat–Sun)</td><td className="py-2.5 font-medium">£80–120+</td><td className="py-2.5 text-red-500 font-semibold text-xs">Selling fast</td></tr>
                  </tbody>
                </table>
              </div>
              <a
                href="https://www.theopen.com/tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm font-bold text-[#C9A84C] hover:underline"
              >
                Buy tickets at theopen.com <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Getting there summary */}
            <div className="bg-[#1B2E4B] rounded-2xl p-7 text-white">
              <h3 className="font-display text-lg font-bold text-white mb-4">🚆 Getting There</h3>
              <ul className="space-y-3 text-sm">
                {[
                  ["Don&apos;t drive to the course", "Road closures and no public parking near the club. This is non-negotiable."],
                  ["Merseyrail to Hillside", "Trains from Liverpool Central via Southport line. Alight at Hillside station (NOT Birkdale). Hillside is approx 5 min walk from the course entrance."],
                  ["Park &amp; Ride", "Operating from multiple Southport sites. Shuttle buses run directly to the course entrance."],
                  ["Taxi from town", "Southport town centre to Royal Birkdale: approximately 10 minutes, £8–12."],
                ].map(([title, detail]) => (
                  <li key={title} className="flex gap-3">
                    <span className="text-[#C9A84C] flex-none font-bold">→</span>
                    <span>
                      <span className="font-semibold text-[#C9A84C]" dangerouslySetInnerHTML={{ __html: title }} />{" "}
                      <span className="text-white/70" dangerouslySetInnerHTML={{ __html: detail }} />
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/the-open-2026/getting-there"
                className="mt-5 flex items-center gap-2 text-sm font-bold text-[#C9A84C] hover:text-[#E8C87A] transition-colors"
              >
                Full transport guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Champions at Birkdale ────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-[#C9A84C]" />
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Past Champions at Royal Birkdale</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#FAF8F5] border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-[#1B2E4B] text-xs uppercase tracking-wider">Year</th>
                    <th className="text-left px-6 py-4 font-bold text-[#1B2E4B] text-xs uppercase tracking-wider">Champion</th>
                    <th className="text-left px-6 py-4 font-bold text-[#1B2E4B] text-xs uppercase tracking-wider">Country</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {CHAMPIONS.map(({ year, name, country, flag }) => (
                    <tr key={year} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-6 py-3.5 font-bold text-[#C9A84C]">{year}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#1B2E4B]">{name}</td>
                      <td className="px-6 py-3.5 text-gray-500">{flag} {country}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#C9A84C]/10 border-t-2 border-[#C9A84C]/50">
                    <td className="px-6 py-3.5 font-bold text-[#C9A84C]">2026</td>
                    <td className="px-6 py-3.5 font-bold text-[#1B2E4B]">Ryan Fox</td>
                    <td className="px-6 py-3.5 text-gray-600">🇳🇿 New Zealand</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            Royal Birkdale has now hosted eleven Open Championships since 1954. Arnold Palmer&apos;s raw power in 1961, Lee Trevino&apos;s brilliance in 1971, Tom Watson&apos;s artistry in 1983, Jordan Spieth&apos;s wire-to-wire win in 2017. And now Ryan Fox&apos;s birdie on the 72nd hole. Southport witnessed another chapter of major championship history.
          </p>
        </section>

        {/* ── Post-event Southport visit ────────────────────────────── */}
        <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full translate-x-16 -translate-y-16 blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Planning a Sefton Coast Visit</p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">The Open is over. Southport is still here.</h2>
            <p className="text-white/70 leading-relaxed mb-4 max-w-2xl">
              The week is done. But if The Open brought you to Southport for the first time, the town is worth coming back to. Royal Birkdale takes visitor tee times outside championship setup weeks. Hillside, right next door, is one of England&apos;s finest links courses and significantly easier to book.
            </p>
            <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
              Summer availability in Southport and Formby is much better outside Open week.{" "}
              <a href={SYKES.southport} target="_blank" rel="noopener noreferrer sponsored" className="text-[#C9A84C] font-semibold underline hover:text-[#E8C87A]">
                Sykes Cottages has self-catering options near Southport and Formby
              </a>{" "}
              from a weekend break to a full week on the Sefton Coast.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Southport hotels <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SYKES.southport}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Self-catering via Sykes Cottages →
              </a>
              <a
                href="https://www.seftonlinks.com/courses/royal-birkdale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Play Royal Birkdale →
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Common Questions</p>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-8">
            Everything You Need to Know About The Open 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Blog posts ───────────────────────────────────────────── */}
        {golfPosts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Golf Guides from the Blog</h2>
              <Link href="/blog?category=golf" className="text-sm font-semibold text-[#C9A84C] hover:underline">
                View all golf posts →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {golfPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all flex gap-0"
                >
                  <div className="relative w-32 flex-none overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="128px"
                      quality={65}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider mb-1.5">Golf</p>
                    <h3 className="font-bold text-[#1B2E4B] text-sm leading-snug group-hover:text-[#C9A84C] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Property callout ── */}
        <section className="bg-[#FAF8F5] rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Property Data</p>
            <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">Living Near Royal Birkdale: PR8 4 House Prices</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Birkdale (PR8 4) is Southport&apos;s highest-priced postcode sector, and Royal Birkdale Golf Club is part of the reason why. If you&apos;re thinking of buying in the area, the full picture (sold prices, schools, crime, flood risk, broadband) is on our postcode guide.
            </p>
          </div>
          <Link
            href="/property/pr8-4"
            className="bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-5 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap flex-shrink-0"
          >
            PR8 4 house prices →
          </Link>
        </section>

        {/* ── Accessibility callout ── */}
        <section className="bg-[#1C3A20] text-white rounded-2xl p-7 md:p-9 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Image
            src="/images/sunflower/PROUD-To-SUPPORT-UK_2.webp"
            alt="Hidden Disabilities Sunflower"
            width={72}
            height={72}
            className="object-contain rounded-xl bg-white p-2 flex-none"
          />
          <div className="flex-1">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1.5">Hidden Disabilities</p>
            <h3 className="font-display text-xl font-bold text-white mb-2">Visiting The Open with a hidden disability?</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              The R&A recognises the Sunflower lanyard. There is a dedicated sensory zone at Spectator Village 4.
              Our full accessibility guide covers disabled parking, carer tickets, accessible transport, and practical
              tips for a low-sensory visit.
            </p>
            <Link
              href="/guides/the-open-2026-accessibility"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              Open 2026 accessibility guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Partner / advertise CTA ──────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-[#C9A84C]/20 p-8 md:p-12 text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">For Businesses</p>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-4">
            Feature Your Business on SouthportGuide
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            The Open is over but the Sefton Coast remains open for business year-round. Feature your restaurant, hotel, or attraction on SouthportGuide and reach visitors planning a return trip.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact?enquiry=open2026"
              className="bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors"
            >
              Enquire about Open packages
            </Link>
            <Link
              href="/pricing"
              className="border border-[#1B2E4B]/20 text-[#1B2E4B] hover:bg-[#1B2E4B] hover:text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors"
            >
              View pricing
            </Link>
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
