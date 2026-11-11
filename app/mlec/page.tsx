import Link from "next/link";
import Image from "next/image";
import {
  Hotel,
  Utensils,
  MapPin,
  Calendar,
  ArrowRight,
  ChevronRight,
  Waves,
  Building2,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Marine Lake Events Centre (MLEC) Southport | Visitor Guide",
  description:
    "Southport's £106m Marine Lake Events Centre, a multipurpose events centre due to be built by winter 2028. What it is for, the planned Light Fantastic water show, where to stay and how to get there.",
  keywords:
    "Marine Lake Events Centre, MLEC Southport, Light Fantastic Southport, Marine Lake, Southport events venue, Southport Town Deal",
  alternates: { canonical: "https://www.southportguide.co.uk/mlec" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Marine Lake Events Centre (MLEC) | Southport's New £106m Venue",
    description:
      "A £106m multipurpose events centre on Marine Lake. Vinci Construction is carrying out the main works to deliver the building by winter 2028.",
    url: "https://www.southportguide.co.uk/mlec",
    images: [{ url: "/images/mlec.webp", width: 1200, height: 630, alt: "Marine Lake Events Centre Southport" }],
  },
};

const QUICK_LINKS = [
  { href: "#venue", label: "The Venue", icon: Building2 },
  { href: "#light-fantastic", label: "Light Fantastic", icon: Waves },
  { href: "#timeline", label: "Build Progress", icon: Clock },
  { href: "#plan-visit", label: "Plan Your Visit", icon: MapPin },
  { href: "#impact", label: "The Bigger Picture", icon: TrendingUp },
  { href: "#faq", label: "FAQs", icon: Star },
];

const STATS = [
  { label: "Total Cost", value: "£106m", sub: "multipurpose events centre" },
  { label: "Main Works", value: "Under way", sub: "by Vinci Construction" },
  { label: "Building Due", value: "Winter 2028", sub: "operator fit-out to follow" },
];

// Sefton Council's MLEC page and its FAQs, checked 11 Nov 2026. Only what those pages say.
const TIMELINE = [
  {
    date: "Now",
    event: "Main Works Under Way",
    detail: "Vinci Construction is carrying out the main works on the site of the former Southport Theatre and Convention Centre.",
    status: "active",
  },
  {
    date: "Winter 2028",
    event: "Building Due",
    detail: "The main works are to deliver the building by winter 2028.",
    status: "target",
  },
  {
    date: "Spring 2029",
    event: "Intended Opening",
    detail: "A fit-out of several months by the operator follows. The council's FAQs give an intended opening in spring 2029, subject to construction progress and commissioning.",
    status: "pending",
  },
];

const FAQS = [
  {
    q: "When does the Marine Lake Events Centre open?",
    a: "Sefton Council says Vinci Construction is carrying out the main works to deliver the building by winter 2028, with a fit-out of several months by the operator to follow. The council's FAQs give an intended opening in spring 2029, subject to construction progress and commissioning.",
  },
  {
    q: "What kind of events will MLEC host?",
    a: "The council describes the MLEC as a multipurpose events centre for entertainment shows, touring theatre acts, conferences and exhibitions. Seating and room details have not been published yet.",
  },
  {
    q: "Where exactly is the Marine Lake Events Centre?",
    a: "MLEC is being built on the Promenade in Southport, on the site of the former Southport Theatre and Convention Centre and the former Floral Hall car park, on the shore of Marine Lake.",
  },
  {
    q: "What is The Light Fantastic?",
    a: "The Light Fantastic is a planned water, light and sound show on Marine Lake, the first of its kind in the UK. It has not been built yet, and no show times have been published.",
  },
  {
    q: "Who is managing the MLEC?",
    a: "Sefton Council's page says an operator will fit out the venue once the main works are finished. Check the council's MLEC page for the latest.",
  },
  {
    q: "How is MLEC being paid for?",
    a: "Sefton Council describes the MLEC as a £106m multipurpose events centre. It is part of the Southport Town Deal.",
  },
  {
    q: "What happened to the old Southport Theatre?",
    a: "The Southport Theatre and Convention Centre closed in March 2020 after more than 50 years hosting some of the biggest names in entertainment. The building was assessed and deemed no longer fit for purpose. Demolition began in spring 2024. Historic items from the theatre have been preserved and will be incorporated into the new MLEC for public display.",
  },
  {
    q: "How far is MLEC from Southport town centre?",
    a: "MLEC is approximately 10–15 minutes on foot from Southport town centre along the Promenade. The train station is around 15 minutes' walk. King's Gardens and the beach are right next door, making it ideal for a full day out.",
  },
];

const MLEC_EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Marine Lake Events Centre (MLEC)",
  description: "Southport's £106m Marine Lake Events Centre, a multipurpose events centre on Marine Lake. The building is due by winter 2028, with an operator fit-out to follow.",
  url: "https://www.southportguide.co.uk/mlec",
  image: "https://www.southportguide.co.uk/images/mlec.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marine Drive",
    addressLocality: "Southport",
    postalCode: "PR8 1RX",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.6435, longitude: -3.0089 },
};

const MLEC_BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "Marine Lake Events Centre", item: "https://www.southportguide.co.uk/mlec" },
  ],
};

const MLEC_FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function MLECPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(MLEC_EVENT_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(MLEC_BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(MLEC_FAQ_LD) }} />
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero ── */}
      <div className="relative min-h-[85vh] flex items-end bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/mlec.webp"
            alt="Marine Lake Events Centre Southport"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 pt-32" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Due by winter 2028
              </span>
              <span className="text-slate-300 text-sm">Southport Town Deal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              Marine Lake<br />
              <span className="text-amber-400">Events Centre</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6 max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              Southport&apos;s £106m multipurpose events centre on Marine Lake, with a water and light show
              planned on the lake, the first of its kind in the UK.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/mlec/accommodation"
                className="bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-amber-300 transition flex items-center gap-2"
              >
                <Hotel className="w-5 h-5" /> Where to Stay
              </Link>
              <Link
                href="#plan-visit"
                className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition flex items-center gap-2 backdrop-blur-sm"
              >
                <MapPin className="w-5 h-5" /> Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 whitespace-nowrap transition"
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Banner ── */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-white">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* ── Intro / Terry's Take ── */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 border-l-4 border-amber-400">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-3">Terry's Take</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why MLEC Is a Big Deal for Southport</h2>
            <div className="prose prose-lg text-gray-700 max-w-none space-y-4">
              <p>
                I've lived in Southport all my life. I remember the old Southport Theatre. Watching my kids perform there,
                catching the occasional touring show, standing in that foyer that hadn't had a lick of paint since about 1987.
                When it shut in March 2020, it felt like another blow to a town that had taken a few. But here's the thing:
                what's coming to replace it is genuinely extraordinary.
              </p>
              <p>
                The Marine Lake Events Centre isn't just a new venue. It's a statement. A £106 million statement, part of the
                Southport Town Deal, that says this town is serious about its future. A venue for shows, touring theatre,
                conferences and exhibitions. And out on the lake, a planned water and light show, the first of its kind in the UK.
              </p>
              <p>
                If that doesn't get you excited about Southport's future, I don't know what will.
              </p>
            </div>
          </div>
        </section>

        {/* ── The Venue ── */}
        <section id="venue" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Inside the Building</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">The Venue</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
              The council&apos;s MLEC page describes a multipurpose events centre for entertainment shows, touring
              theatre acts, conferences and exhibitions.
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-gray-700 leading-relaxed">
            <p>
              Seating, room and restaurant details have not been published on the council&apos;s pages yet. We will
              add them here when they are.
            </p>
          </div>
        </section>

        {/* ── The Light Fantastic ── */}
        <section id="light-fantastic" className="scroll-mt-16">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl overflow-hidden text-white">
            <div className="p-8 md:p-12 max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
                Planned on Marine Lake
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                The Light Fantastic
                <span className="block text-blue-300 text-xl font-semibold mt-1">
                  A Planned Water and Light Show
                </span>
              </h2>
              <p className="text-slate-300 text-lg">
                A water, light and sound show is planned on Marine Lake, beside the MLEC. The council&apos;s pages
                say it will be the first of its kind in the UK. It has not been built yet, and no show times have
                been published.
              </p>
            </div>
          </div>
        </section>

        {/* ── Construction Timeline ── */}
        <section id="timeline" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Where the Build Stands</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Build Progress</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              From the council&apos;s MLEC page and FAQs, November 2026.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {TIMELINE.map((item) => (
                  <div key={item.date} className="relative flex gap-6 pl-16">
                    <div
                      className={`absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10 ${
                        item.status === "done"
                          ? "bg-green-500 border-green-500"
                          : item.status === "active"
                          ? "bg-amber-400 border-amber-400 ring-4 ring-amber-100"
                          : item.status === "target"
                          ? "bg-slate-900 border-slate-900"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <div
                      className={`bg-white rounded-xl shadow-sm border p-5 flex-1 ${
                        item.status === "active"
                          ? "border-amber-300 ring-1 ring-amber-200"
                          : item.status === "target"
                          ? "border-slate-700"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">{item.date}</p>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">{item.event}</h3>
                        </div>
                        {item.status === "done" && (
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            Complete
                          </span>
                        )}
                        {item.status === "active" && (
                          <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                            In Progress
                          </span>
                        )}
                        {item.status === "target" && (
                          <span className="text-xs bg-slate-900 text-white font-semibold px-2 py-0.5 rounded-full">
                            Target
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Plan Your Visit Grid ── */}
        <section id="plan-visit" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Ready to Visit?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Plan Your MLEC Visit</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Accommodation, transport, dining, and things to do. All covered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                href: "/mlec/accommodation",
                icon: Hotel,
                title: "Where to Stay",
                description:
                  "Hotels, B&Bs and self-catering near MLEC, from the Promenade to Lord Street, listed by distance and price.",
                cta: "Find accommodation →",
                color: "blue",
              },
              {
                href: "/mlec/getting-there",
                icon: MapPin,
                title: "Getting There",
                description:
                  "MLEC is on the Promenade. Easy to reach by train, bus, or car. Full guide to parking, Merseyrail, taxis, and accessibility.",
                cta: "Transport guide →",
                color: "green",
              },
              {
                href: "/mlec/restaurants",
                icon: Utensils,
                title: "Eat & Drink",
                description:
                  "Pre-show dinner, post-show cocktails, or a full family lunch. Southport's restaurant scene is ready for the MLEC crowd.",
                cta: "See nearby restaurants →",
                color: "orange",
              },
              {
                href: "/attractions",
                icon: Calendar,
                title: "Make a Weekend",
                description:
                  "MLEC is best enjoyed as part of a wider Southport trip. Beaches, King's Gardens, golf, the Promenade. There's plenty to fill a weekend.",
                cta: "Attractions & things to do →",
                color: "purple",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <card.icon className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.description}</p>
                <span className="text-amber-600 text-sm font-semibold flex items-center gap-1">
                  {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Economic Impact ── */}
        <section id="impact" className="scroll-mt-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-3">The Bigger Picture</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                What MLEC Means for Southport
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  For a town that has spent a decade fighting for its share of the visitor economy, the MLEC isn't
                  just a building. It's the anchor of a wider transformation. The Town Deal isn't the only
                  regeneration money coming to Southport, but it's the most visible. When those doors open,
                  they'll open onto a town that has also seen investment in Lord Street, the seafront, and the
                  wider cultural offer.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Sefton Council's MLEC page, checked 11 Nov 2026 */}
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-3">From Sefton Council</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Sefton Council describes the MLEC as a £106m multipurpose events centre. Its page says Vinci
                  Construction is carrying out the main works to deliver the building by winter 2028, with a fit-out
                  of several months by the operator to follow.
                </p>
                <a href="https://www.sefton.gov.uk/around-sefton/southport-town-deal/marine-lake-events-centre-water-and-light-show/" target="_blank" rel="noopener noreferrer" className="text-amber-400 text-sm font-semibold hover:underline">
                  Sefton Council: the MLEC page
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── The History ── */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-3">Before MLEC</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Remembering the Southport Theatre &amp; Convention Centre
              </h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  The building that MLEC replaces hosted some of the biggest names in entertainment for over 50 years.
                  The Southport Theatre and Convention Centre was a genuine regional venue, the kind of place where
                  generations of Southport families made memories. It closed its doors for the last time in March 2020.
                </p>
                <p>
                  When demolition began in spring 2024, the team made a point of preserving the most historically
                  significant items from the old theatre, including original projectors and heritage artefacts, which
                  are being held in safe storage. They&apos;ll be incorporated into the new MLEC for public display.
                  It&apos;s a classy touch: the new building will carry a piece of what came before.
                </p>
                <p>
                  The MLEC isn&apos;t a replacement. It&apos;s a transformation. The site, the lake, the views, the Promenade:
                  all the same. But the building on that plot will be a new venue for the whole town.
                </p>
              </div>
            </div>
            <div className="relative min-h-[320px] md:min-h-0">
              <Image
                src="/images/southport-theatre-history.jpg"
                alt="The former Southport Theatre and Convention Centre on the Promenade"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-xs italic">
                  The Southport Theatre &amp; Convention Centre. Closed March 2020, demolished 2024.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faq" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Got Questions?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">MLEC FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Property callout ── */}
        <section className="bg-[#FAF8F5] rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Property Data</p>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Town Centre Property: What MLEC Means for PR9 0 &amp; PR8 1</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The Marine Lake Events Centre sits on the PR9 0 and PR8 1 boundary. If you&apos;re considering a town centre purchase, the full data on sold prices, schools, crime, and flood risk is on our postcode guides.
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Link
              href="/property/pr9-0"
              className="bg-slate-900 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap text-center"
            >
              PR9 0 house prices →
            </Link>
            <Link
              href="/property/pr8-1"
              className="bg-white border border-slate-200 hover:border-slate-400 text-slate-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors whitespace-nowrap text-center"
            >
              PR8 1 house prices →
            </Link>
          </div>
        </section>

        {/* ── Partner CTA ── */}
        <section className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl text-white p-8 md:p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">Be Ready</p>
          <h2 className="text-3xl font-extrabold mb-4">Get Listed Before the Crowds Arrive</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            Is your accommodation, restaurant or attraction near the Promenade? Get listed on
            SouthportGuide.co.uk, free.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/advertise?mlec=1"
              className="bg-amber-400 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-300 transition flex items-center gap-2"
            >
              <Star className="w-5 h-5" /> Become an MLEC Partner
            </Link>
            <Link
              href="/hotels"
              className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition flex items-center gap-2"
            >
              <Hotel className="w-5 h-5" /> Browse Hotels Nearby
            </Link>
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
