import Link from "next/link";
import { ChevronRight, ArrowRight, MapPin, Clock, Train, Car, Camera, Waves } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Another Place by Antony Gormley | Crosby Beach Guide",
  description:
    "One hundred cast-iron figures on Crosby Beach. Antony Gormley's Another Place is one of the most powerful works of public art in England. Everything you need to visit: tide times, parking, photography, and how to get there.",
  keywords:
    "Another Place Crosby, Antony Gormley Crosby Beach, Crosby Beach iron men, Another Place art installation, Antony Gormley iron men, Crosby Beach Southport",
  alternates: { canonical: `${BASE_URL}/attractions/another-place-crosby` },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Another Place by Antony Gormley | Crosby Beach",
    description:
      "100 cast-iron figures, each a cast of Gormley's own body, spread across 3km of tidal beach. One of England's most powerful works of public art, and completely free to visit.",
    url: `${BASE_URL}/attractions/another-place-crosby`,
    images: [{ url: `${BASE_URL}/southport-pier.webp`, width: 1200, height: 630, alt: "Another Place by Antony Gormley, Crosby Beach" }],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Attractions", item: `${BASE_URL}/attractions` },
    { "@type": "ListItem", position: 3, name: "Another Place — Crosby Beach", item: `${BASE_URL}/attractions/another-place-crosby` },
  ],
};

const touristLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Another Place by Antony Gormley",
  description:
    "One hundred cast-iron figures spread across three kilometres of tidal beach at Crosby, Merseyside. Each figure is a life-size cast of artist Antony Gormley's own body. The installation has been permanent since 2005.",
  url: `${BASE_URL}/attractions/another-place-crosby`,
  geo: { "@type": "GeoCoordinates", latitude: 53.4785, longitude: -3.0525 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hall Road West",
    addressLocality: "Crosby",
    addressRegion: "Merseyside",
    postalCode: "L23 8SY",
    addressCountry: "GB",
  },
  isAccessibleForFree: true,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  touristType: ["Art lovers", "Photography", "Beach"],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Another Place at Crosby Beach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Another Place is a public art installation by sculptor Antony Gormley, consisting of 100 cast-iron figures spread across three kilometres of tidal beach at Crosby, Merseyside. Each figure is a life-size cast of the artist's own body, standing on the beach and facing out to sea. The installation has been permanently sited at Crosby Beach since 2005.",
      },
    },
    {
      "@type": "Question",
      name: "Is Another Place at Crosby Beach free to visit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. The beach is a public beach and the figures are part of it. There is free parking at Hall Road car park and paid parking at nearby Crosby Leisure Centre. No tickets or booking required at any time.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to visit Another Place?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Low tide reveals the most figures, at high tide, many are submerged. Sunset is the most dramatic time visually: the figures are silhouetted against the sky and the light across the Irish Sea can be extraordinary. Check tide times before you visit, low tide around 90 minutes before sunset is the ideal combination.",
      },
    },
    {
      "@type": "Question",
      name: "How far is Crosby Beach from Southport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crosby Beach is approximately 14 miles south of Southport town centre, around 25-30 minutes by car. By Merseyrail, take any Southport line train toward Liverpool and change at Blundellsands & Crosby or Hall Road stations, both within a short walk of the beach.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to walk out to the figures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The figures closest to the promenade are safe to visit at all tide states. Do not walk out to figures at the far end of the installation, the tide at Crosby can come in quickly and the outer figures are submerged at high water. Stay within 100 metres of the promenade if in any doubt, and always check tide times before visiting.",
      },
    },
    {
      "@type": "Question",
      name: "Can I touch the figures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the figures are not behind barriers and visitors regularly touch, photograph, and interact with them. Many figures have accumulated barnacles, seaweed, and marine growth, which has become part of the artwork. Some visitors dress figures with hats, scarves, and other items.",
      },
    },
  ],
};

const GETTING_THERE = [
  {
    icon: Train,
    title: "By Train (recommended)",
    detail: "Merseyrail Southport line, alight at Hall Road or Blundellsands & Crosby stations. Both are a short walk from the beach. Trains run every 15 minutes from Liverpool Central and connect from Southport. From Southport, journey time is approximately 40 minutes.",
    tip: "Check Merseyrail.org for live departures. The stations are small, there's no ticket office, buy before you travel or use the Avanti/Merseyrail app.",
  },
  {
    icon: Car,
    title: "By Car",
    detail: "From Southport: A565 south through Formby and Crosby. 25-30 minutes. From Liverpool city centre: A565 north, approximately 25 minutes. Parking at Hall Road West car park (L23 8SY), usually free or low charge. Crosby Leisure Centre car park is a short walk further north.",
    tip: "The sat-nav postcode L23 8SY brings you to the Hall Road car park, which is the closest to the main cluster of figures.",
  },
];

const PHOTOGRAPHY_TIPS = [
  "Low tide gives you the most figures, aim to arrive 1-2 hours after high tide starts receding",
  "Golden hour (30-60 minutes before sunset) produces the best light, figures are backlit against the sky",
  "A wide-angle lens captures multiple figures and the scale of the installation",
  "Get low, shooting at figure-height rather than standing height changes the composition completely",
  "The figures face west: morning light is behind you (front-lit), evening light is dramatic side or backlight",
  "Overcast days produce even, dramatic skies, don't write off grey February mornings",
  "Include a person in frame occasionally to give scale, each figure is life-size but people underestimate them",
];

export default function AnotherPlacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ── */}
        <div className="relative min-h-[70vh] flex items-end bg-[#1B2E4B] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B2E4B] via-[#2A4A73] to-[#1A3A5C]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#C9A84C]/20 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/40 text-xs mb-6">
              <Link href="/" className="hover:text-white/70 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/attractions" className="hover:text-white/70 transition">Attractions</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/60">Another Place</span>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Free to Visit
              </span>
              <span className="text-white/50 text-sm">Crosby Beach, Merseyside</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Another Place
              <span className="block text-[#C9A84C] text-3xl md:text-4xl mt-2">Antony Gormley at Crosby Beach</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mb-8 leading-relaxed">
              One hundred cast-iron figures face out to sea across three kilometres of tidal beach. Each one a cast of Gormley&apos;s
              own body. One of the most quietly powerful works of public art in England, and completely free.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Figures", value: "100" },
                { label: "Beach length", value: "3km" },
                { label: "Weight each", value: "650kg" },
                { label: "Admission", value: "Free" },
              ].map((f) => (
                <div key={f.label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <div className="text-[#C9A84C] font-bold text-xl">{f.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-5xl space-y-16">

          {/* ── Editorial intro ── */}
          <section className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 border-l-4 border-l-[#C9A84C]">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Why This Stops People in Their Tracks</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I&apos;ve walked Crosby Beach hundreds of times. I&apos;ve watched the figures accumulate barnacles and seaweed and
                  the occasional traffic cone placed on a head by someone who thought they were being funny. And I still stop when
                  I see them. That&apos;s the thing about Another Place: it doesn&apos;t diminish with familiarity.
                </p>
                <p>
                  The figures have been here since 2005, when Sefton Council made the (at the time controversial) decision to keep
                  them permanently after their original tour ended. The decision was right. These figures belong here.
                  They belong to the wideness of this particular beach, to the flatness of the light over the Irish Sea,
                  to the long view toward the horizon. You couldn&apos;t put them indoors. You couldn&apos;t put them anywhere
                  except somewhere like this.
                </p>
                <p>
                  Technically, this is Crosby, about 14 miles south of Southport. But for anyone visiting Southport and the
                  surrounding area, Another Place is a non-negotiable addition to the itinerary. Go at low tide. Go at sunset
                  if you can manage it. The combination is as good as public art gets in England.
                </p>
              </div>
            </div>
          </section>

          {/* ── About the installation ── */}
          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Artwork</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">About Another Place</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-3">The Figures</h3>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Each of the 100 figures is a cast of Gormley&apos;s own body, made during the early 1990s using his actual
                    physical form as the mould. They weigh 650 kilos each. They stand between 1.5 and 1.85 metres tall, depending
                    on how deep the sand beneath them has shifted over the years. All of them face west, toward the horizon, toward
                    the sea.
                  </p>
                  <p>
                    The figures are spread across three kilometres of beach, from the promenade at Crosby down toward the
                    Waterloo shoreline. The nearest figures are clearly visible from the promenade at any tide state.
                    The furthest are submerged at high tide.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-3">The History</h3>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Another Place was first installed at Cuxhaven in Germany in 1997, before touring to Norway, Belgium, and the
                    United States. It arrived at Crosby in 2005, initially planned as a temporary installation.
                  </p>
                  <p>
                    Sefton Council voted to keep them permanently after a public campaign and considerable debate about safety,
                    shipping lane interference (the figures are technically in a shipping lane), and, inevitably, whether art
                    belongs on a functional beach. The permanent status was confirmed in 2007.
                    Twenty years later, they&apos;ve become as much a part of Crosby Beach as the sand.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-3">Gormley&apos;s Intent</h3>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Gormley has described Another Place as an exploration of the relationship between a person and the world,
                    each figure confronting the horizon, the future, the unknown. The figures don&apos;t move. They stand and look
                    outward. Unlike so much public sculpture, they don&apos;t perform or gesture. They simply are.
                  </p>
                  <p>
                    The tidal nature of the beach is central to the work. The figures disappear and reappear with the tides.
                    They accumulate marine growth. They change. &quot;The sea is working on them,&quot; Gormley said. &quot;They are 
                    becoming part of the beach.&quot;
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-3">What Visitors Find</h3>
                <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  <p>
                    At low tide, dozens of figures are visible simultaneously, stretching down the beach into the distance,
                    becoming smaller, becoming abstract. The effect is quietly overwhelming. People regularly stop and stand
                    still when they first see the full installation.
                  </p>
                  <p>
                    Many figures are dressed by visitors, hats, scarves, flags, hi-vis jackets during major football
                    tournaments. This unplanned participation has become part of the work. Gormley has expressed approval.
                    The figures accumulate the town&apos;s character over time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── When to visit ── */}
          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Planning Your Visit</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">When to Go</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-6">
              {[
                {
                  emoji: "🌊",
                  title: "Tide timing",
                  desc: "Visit at low tide to see the most figures. At high tide, the outer figures are submerged. Check BBC tide tables or the Merseyside tide app before you go. The best window is 1–3 hours after the tide starts to recede.",
                  tag: "Most important factor",
                  tagColor: "bg-blue-100 text-blue-700",
                },
                {
                  emoji: "🌅",
                  title: "Time of day",
                  desc: "Sunset is exceptional, the figures are silhouetted against the western sky and the light across the Irish Sea can be extraordinary. Combine low tide with the hour before sunset for the best possible visit.",
                  tag: "Best experience",
                  tagColor: "bg-amber-100 text-amber-700",
                },
                {
                  emoji: "📅",
                  title: "Season",
                  desc: "Year-round, but winter mornings offer solitude and dramatic skies. Summer weekends are busiest. Spring and autumn have the best balance of light, manageable crowds, and reasonable temperatures.",
                  tag: "All year valid",
                  tagColor: "bg-green-100 text-green-700",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>{item.tag}</span>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Safety notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
              <Waves className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
              <div>
                <p className="font-bold text-amber-800 text-sm mb-1">Tide safety, read before visiting</p>
                <div className="text-amber-700 text-sm space-y-1 leading-relaxed">
                  <p>The figures near the promenade are safe at all tide states. The outer figures are in the tidal zone and are submerged at high tide.</p>
                  <p><strong>Do not walk to the furthest figures without checking tide times.</strong> The tide at Crosby comes in faster than expected and can cut off return routes. Keep within 100 metres of the promenade if in any doubt, particularly with children.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Photography tips ── */}
          <section className="bg-[#1B2E4B] rounded-2xl p-7 md:p-10 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6 text-[#C9A84C]" />
              <h2 className="font-display text-2xl font-bold">Photography Guide</h2>
            </div>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Another Place is one of the most photographed locations on the Merseyside coast. These tips make the difference
              between a record shot and something genuinely worth keeping.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {PHOTOGRAPHY_TIPS.map((tip) => (
                <div key={tip} className="flex gap-3 text-sm">
                  <span className="text-[#C9A84C] font-bold flex-none">→</span>
                  <span className="text-white/75 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Getting there ── */}
          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Directions</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting There</h2>
              <p className="text-gray-500 mt-2 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                Hall Road West, Crosby, Merseyside, L23 8SY
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {GETTING_THERE.map(({ icon: Icon, title, detail, tip }) => (
                <div key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <h3 className="font-display font-bold text-[#1B2E4B]">{title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{detail}</p>
                  <div className="bg-[#FAF8F5] rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500"><span className="font-semibold text-[#1B2E4B]">Tip:</span> {tip}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical info strip */}
            <div className="mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-display font-bold text-[#1B2E4B] mb-4">Practical Information</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Address", value: "Hall Road West, Crosby, L23 8SY" },
                  { label: "Admission", value: "Free, open 24 hours, 365 days" },
                  { label: "Parking", value: "Free at Hall Road West car park" },
                  { label: "Nearest station", value: "Hall Road (Merseyrail)" },
                  { label: "From Southport", value: "14 miles. 25–30 min by car" },
                  { label: "Dogs", value: "Welcome on leads" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1B2E4B] text-xs uppercase tracking-wide">{label}</p>
                      <p className="text-gray-600 mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Another Place. FAQs</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqLd.mainEntity.map((faq) => (
                <div key={faq.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-none mt-0.5" />
                    {faq.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Nearby and cross-links ── */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">While You&apos;re in the Area</p>
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Nearby &amp; Worth Combining</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  emoji: "🚤",
                  title: "Crosby Lakeside Adventure Centre",
                  desc: "Sailing, kayaking, paddleboarding, and open-water swimming. 10 minutes from the Gormley installation.",
                  href: "/activities",
                },
                {
                  emoji: "🐿️",
                  title: "Formby Red Squirrel Reserve",
                  desc: "National Trust pine woodland where native red squirrels still live. 8 miles north, easy to combine for a full day.",
                  href: "/beaches-parks",
                },
                {
                  emoji: "🌊",
                  title: "Southport Beach & Pier",
                  desc: "30 minutes north, a completely different coastal experience. England's second-longest pier and 22 miles of beach.",
                  href: "/things-to-do",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex gap-4 p-5 rounded-xl hover:bg-[#FAF8F5] border border-gray-100 hover:border-[#C9A84C]/30 transition-all"
                >
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-sm group-hover:text-[#C9A84C] transition-colors mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── CTA to things-to-do ── */}
          <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10 text-center text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Complete Your Visit</p>
            <h2 className="font-display text-2xl font-bold mb-3">More to Do in and Around Southport</h2>
            <p className="text-white/60 max-w-xl mx-auto mb-7 text-sm leading-relaxed">
              Crosby Beach is 14 miles from Southport town centre. Our complete guide covers every beach, attraction, golf course,
              and neighbourhood, with the practical details that the official tourism sites leave out.
            </p>
            <Link
              href="/things-to-do"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
            >
              Things to Do in Southport <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}
