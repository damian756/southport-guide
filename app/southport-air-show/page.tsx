import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Users,
  Star,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Southport Air Show 2026 | Free Event, Dates, Best Viewing Spots & Guide",
  description:
    "Southport Air Show 2026 — free event on Southport Beach. Dates, best viewing spots, parking, and how to make the most of one of the UK's best air shows. Over 100,000 visitors.",
  keywords:
    "Southport Air Show 2026, Southport Air Show dates, Southport Air Show free, Southport Air Show viewing, Southport airshow parking",
  alternates: { canonical: `${BASE_URL}/southport-air-show` },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Southport Air Show 2026 | Free · 100,000 Visitors",
    description:
      "One of the UK's best free air shows. Southport Beach. Dates, viewing spots, parking, and everything you need to know.",
    url: `${BASE_URL}/southport-air-show`,
    images: [{ url: `${BASE_URL}/images/southport-air-show.webp`, width: 1200, height: 630, alt: "Southport Air Show" }],
  },
};

const FAQS = [
  {
    q: "When is the Southport Air Show 2026?",
    a: "The Southport Air Show 2026 is typically held over a weekend in late August or early September. Exact 2026 dates will be announced at visitsouthport.com — check there for the official confirmation. The show traditionally takes place on a Saturday and Sunday.",
  },
  {
    q: "Is the Southport Air Show free?",
    a: "Yes — the Southport Air Show is free to attend for general spectators. You watch from Southport Beach and the Promenade. There are paid grandstand packages and hospitality options for those who want a reserved viewing area, but the entire beach is free public viewing.",
  },
  {
    q: "Where is the best place to watch the Southport Air Show?",
    a: "The airshow display line runs along the coastline parallel to the beach. Any point along the Promenade and beach gives a good view — the aircraft fly relatively close to the shore. The grandstand area near the Pier is the premium spot. To the north of the Pier is often slightly less crowded while still having excellent views.",
  },
  {
    q: "How many people attend the Southport Air Show?",
    a: "The Southport Air Show draws over 100,000 visitors across the two days — sometimes significantly more for headline displays. It is one of the largest free air shows in the UK by attendance.",
  },
  {
    q: "What aircraft perform at the Southport Air Show?",
    a: "The line-up varies each year. Regular performers include the Red Arrows (when their schedule allows), Typhoon display teams, Spitfires and Hurricanes from the Battle of Britain Memorial Flight, Wildcats, and international display teams. The full programme is published on the official website ahead of the show.",
  },
  {
    q: "Where should I park for the Southport Air Show?",
    a: "Marine Drive fills very early on airshow weekend — expect it to be full by 9am. Town centre car parks are a better bet. Park-and-ride services usually operate specifically for the airshow. Come by train if you can — it's the most reliable option. Details published by the organisers each year.",
  },
  {
    q: "What time does the Southport Air Show start and finish?",
    a: "Flying typically starts around 10am–11am and runs until approximately 5pm each day. Exact timings for the 2026 show will be published on the official website. Arriving early gives you the best Promenade positioning and easier parking.",
  },
  {
    q: "Can I bring dogs to the Southport Air Show?",
    a: "The airshow is on the public beach and Promenade, which are normally dog-friendly. However, the noise of jet aircraft can distress dogs. If you're bringing a dog, consider the acoustic impact and have somewhere you can move to if needed. Keep dogs on leads in crowded areas.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Air Show 2026",
  description: "One of the UK's largest free air shows, held on Southport Beach and Promenade each summer.",
  url: `${BASE_URL}/southport-air-show`,
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: "Southport Beach and Promenade",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Marine Drive",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
      addressCountry: "GB",
    },
  },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Southport Air Show", item: `${BASE_URL}/southport-air-show` },
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

export default function SouthportAirShowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ── */}
        <div className="relative min-h-[75vh] flex items-end bg-[#0A1B3D] text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/southport-air-show.webp"
              alt="Dramatic contrails crossing a blue sky at the Southport Air Show"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D] via-[#0A1B3D]/50 to-[#0A1B3D]/10" />
          </div>
          <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Free Event
                </span>
                <span className="text-white/50 text-sm font-medium">Southport Beach · Late Summer 2026</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
                Southport
                <span className="block text-[#C9A84C]">Air Show</span>
              </h1>
              <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
                One of the UK&apos;s best free air shows. Over 100,000 visitors over the weekend. 
                The display line runs right along the coastline — the entire beach is your viewing platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#viewing" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                  Best Viewing Spots
                </a>
                <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                  Practical Info →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Facts ── */}
        <div className="bg-[#0A1B3D] text-white">
          <div className="container mx-auto px-4 max-w-7xl py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {[
                { icon: CalendarDays, value: "Late Summer", label: "When", sub: "Saturday & Sunday" },
                { icon: Users, value: "100,000+", label: "Attendance", sub: "Per year" },
                { icon: Star, value: "Free", label: "Entry", sub: "Public beach viewing" },
                { icon: Clock, value: "10am–5pm", label: "Flying times", sub: "Each day" },
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
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Air Show Is Properly Special</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
                <p>
                  I&apos;ve been going to the Southport Air Show since I was a kid. My kids have now been going 
                  since they were kids. It&apos;s that kind of event — it becomes a fixture. You don&apos;t miss it.
                </p>
                <p>
                  What makes it work, apart from the obvious fact that watching aircraft do extraordinary things at close range 
                  is inherently thrilling, is the setting. The display line runs parallel to the beach. 
                  The aircraft fly close to the shoreline. The sound hits you. On a clear Saturday in late summer, 
                  with a hundred thousand other people and a Typhoon breaking the sound barrier two hundred metres overhead, 
                  it is genuinely one of the better experiences you can have for free in the North of England.
                </p>
                <p>
                  Practical advice: do not try to drive there and park on Marine Drive. You will spend the morning in traffic 
                  and the afternoon furious. Come by train from Liverpool or Wigan. Walk to the Promenade. 
                  Get there by 9:30am if you want a good spot on the beach. Bring something to eat — the food stalls are good 
                  but the queues at lunchtime are substantial. And bring earplugs for children under about ten. 
                  The jets are loud.
                </p>
              </div>
            </div>
          </section>

          {/* ── What to Expect ── */}
          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Show</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  emoji: "✈️",
                  title: "The Flying Programme",
                  detail: "A full day of displays running from approximately 10am to 5pm. Mix of military jets, warbirds, aerobatic teams, helicopters, and civilian display aircraft. The headline acts vary each year — confirmed when the programme is published, typically 6–8 weeks before the show.",
                },
                {
                  emoji: "🎺",
                  title: "The Red Arrows",
                  detail: "The Red Arrows perform at Southport most years — subject to their annual schedule. When they appear, the atmosphere peaks. Nine Hawks, nine smoke trails, formation flying at extraordinary precision. The beach crowd reaction is something else entirely.",
                },
                {
                  emoji: "⚔️",
                  title: "Warbirds",
                  detail: "Spitfires and Hurricanes from the Battle of Britain Memorial Flight regularly appear at Southport. The sound of a Merlin engine over the beach is the kind of thing that stays with you. Older visitors often go very quiet when the warbirds appear.",
                },
                {
                  emoji: "🎪",
                  title: "Ground Events",
                  detail: "Static aircraft displays along the Promenade, food stalls and market traders, fairground rides, and entertainment stages. The ground events are good but secondary — the flying is the show. Plan your walking to ground-level activities between flying sets.",
                },
                {
                  emoji: "🎖️",
                  title: "Grandstand Packages",
                  detail: "Paid grandstand packages are available for reserved seating in the best central viewing position. These include catering options and are limited in number. Book early — sold through the official airshow website. Worth it if you want guaranteed position for the headline acts.",
                },
                {
                  emoji: "🏖️",
                  title: "The Beach Itself",
                  detail: "The entire beach is your viewing platform and it&apos;s enormous. Even at 100,000+ attendance, the beach absorbs the crowd. You can spread out, find your own space, and watch comfortably without being crushed. The wide flat beach is a genuine advantage of this show over city-based events.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.detail }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Viewing Spots ── */}
          <section id="viewing" className="scroll-mt-28">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Where to Stand</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Best Viewing Positions</h2>
              <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                The display line runs parallel to the beach. Every part of the seafront gives a view — but some spots are better than others.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  position: "Central (Grandstand Area)",
                  quality: "Best",
                  color: "bg-green-600",
                  detail: "The paid grandstand area, centred near the Pier, is the optimal viewing position — directly in front of the main display line. If you want the best view without paying for grandstand, the public beach immediately north and south of the paid area is still excellent.",
                  tip: "Book grandstand packages early at the official website.",
                },
                {
                  position: "North of the Pier",
                  quality: "Excellent",
                  color: "bg-blue-600",
                  detail: "The beach north of the Pier towards the Promenade hotels is consistently slightly less crowded than the area immediately in front of the grandstand. You&apos;re still central enough for good views of the display line. Good spot if you want to spread out.",
                  tip: "Good option for families who need space around them.",
                },
                {
                  position: "South (Ainsdale direction)",
                  quality: "Good",
                  color: "bg-amber-600",
                  detail: "Further south along the beach the crowds thin considerably. You&apos;re slightly off-centre to the display line, but still get excellent views. The advantage: space, quieter food queues, easier access from Ainsdale station.",
                  tip: "Train to Ainsdale station, walk north along the beach.",
                },
              ].map((item) => (
                <div key={item.position} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`${item.color} px-6 py-3 flex items-center justify-between`}>
                    <h3 className="font-display font-bold text-white text-base">{item.position}</h3>
                    <span className="text-white/80 text-xs font-semibold">{item.quality}</span>
                  </div>
                  <div className="p-6">
                    <p
                      className="text-gray-700 text-sm leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: item.detail }}
                    />
                    <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg px-3 py-2">
                      <p className="text-xs text-[#1B2E4B] font-semibold">{item.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Practical ── */}
          <section id="practical" className="scroll-mt-28">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Planning Your Day</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Practical Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Car,
                  title: "Getting There — Don&apos;t Drive",
                  items: [
                    "Train: Merseyrail Northern Line from Liverpool — direct to Southport, 15 min walk to the beach. Also to Birkdale or Ainsdale if you want to approach from north or south.",
                    "Marine Drive fills by 9am on airshow weekend — don&apos;t rely on it",
                    "Town centre car parks are your best car option (10–15 min walk to beach)",
                    "Park-and-ride may operate specifically for the airshow — check visitsouthport.com",
                  ],
                },
                {
                  icon: Clock,
                  title: "Timing",
                  items: [
                    "Arrive by 9–9:30am to secure a good viewing position on the beach",
                    "Flying typically begins 10am–11am each day",
                    "Eat before the main lunchtime rush (before 12pm or after 2pm)",
                    "Headline acts usually mid-afternoon — the show builds to them",
                    "Crowd disperses quickly after the last display — leaving around 5pm is busy",
                  ],
                },
                {
                  icon: MapPin,
                  title: "What to Bring",
                  items: [
                    "Earplugs — essential for young children, recommended for everyone",
                    "Folding chairs or blankets if you want to sit on the beach",
                    "Binoculars — useful for the higher-altitude manoeuvres",
                    "Sunscreen — you&apos;ll be on an exposed beach for hours",
                    "Packed food — reduces queuing time significantly",
                    "Waterproof layer — Lancashire in August, always prepared",
                  ],
                },
                {
                  icon: Star,
                  title: "Photography",
                  items: [
                    "A telephoto lens (200mm+) is ideal for aircraft photography",
                    "The low angle of the beach gives dramatic sky shots",
                    "At slower shutter speeds, propeller-driven aircraft give nice motion blur",
                    "Overcast days often produce better aircraft photos than bright sun (no harsh shadows)",
                    "Best shots: formation breaks, formation joins, and smoke-on passes",
                  ],
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                  <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3
                    className="font-display font-bold text-[#1B2E4B] text-lg mb-4"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
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

          {/* ── FAQ ── */}
          <section id="faq" className="scroll-mt-28">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Air Show — FAQs</h2>
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
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Other Major Southport Events</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: "The Open 2026", month: "July 2026", desc: "The 154th Open Championship at Royal Birkdale. Southport&apos;s biggest sporting event.", href: "/the-open-2026" },
                  { name: "Southport Flower Show", month: "August 2026", desc: "One of England&apos;s most prestigious horticultural shows. Victoria Park.", href: "/southport-flower-show" },
                  { name: "Full Events 2026", month: "All Year", desc: "10 major events from Lightport in February to the Comedy Festival in October.", href: "/events" },
                ].map((item) => (
                  <Link key={item.name} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                    <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                      {item.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[#0A1B3D] rounded-2xl p-8 md:p-12 text-center text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Planning Your Visit</p>
            <h2 className="font-display text-3xl font-bold mb-4">Make a Weekend of It</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              The Air Show is two days. Make a weekend of it — the beach, the Pier, Lord Street, and some of 
              Southport&apos;s restaurants are all right there.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/hotels" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
                Find a Hotel
              </Link>
              <Link href="/things-to-do" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
                Things to Do →
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
