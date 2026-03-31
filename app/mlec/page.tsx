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
  Music,
  Building2,
  Users,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Coffee,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Marine Lake Events Centre (MLEC) Southport | Complete Visitor Guide 2027",
  description:
    "Everything you need to know about Southport's new £73m Marine Lake Events Centre, opening April 2027. Venue details, The Light Fantastic water show, where to stay, how to get there, and what's on.",
  keywords:
    "Marine Lake Events Centre, MLEC Southport, MLEC 2027, Light Fantastic Southport, Marine Lake, Southport events venue, Southport Town Deal",
  alternates: { canonical: "https://www.southportguide.co.uk/mlec" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Marine Lake Events Centre (MLEC) | Southport's New £73m Landmark",
    description:
      "Your complete guide to MLEC. 1,500-seat theatre, 2,400-capacity exhibition hall, The Light Fantastic water show, and more. Opening April 2027.",
    url: "https://www.southportguide.co.uk/mlec",
    images: [{ url: "/images/mlec.webp", width: 1200, height: 630, alt: "Marine Lake Events Centre Southport" }],
  },
};

const QUICK_LINKS = [
  { href: "#venue", label: "The Venue", icon: Building2 },
  { href: "#light-fantastic", label: "Light Fantastic", icon: Waves },
  { href: "#timeline", label: "Build Timeline", icon: Clock },
  { href: "#plan-visit", label: "Plan Your Visit", icon: MapPin },
  { href: "#impact", label: "Economic Impact", icon: TrendingUp },
  { href: "#faq", label: "FAQs", icon: Star },
];

const STATS = [
  { label: "Capacity (Theatre)", value: "1,500", sub: "flexible auditorium seats", icon: Music },
  { label: "Exhibition Hall", value: "2,400", sub: "capacity (3 subdivisions)", icon: Users },
  { label: "Additional Visitors", value: "515k", sub: "projected per year", icon: TrendingUp },
  { label: "Economic Boost", value: "£18m", sub: "annually to Southport", icon: TrendingUp },
  { label: "New Jobs Created", value: "300", sub: "permanent positions", icon: Users },
  { label: "Total Investment", value: "£73m", sub: "project value", icon: Building2 },
];

const TIMELINE = [
  {
    date: "March 2020",
    event: "Southport Theatre Closes",
    detail:
      "The former Southport Theatre and Convention Centre holds its last show after 50+ years. The site is assessed and deemed no longer fit for purpose.",
    status: "done",
  },
  {
    date: "Spring 2024",
    event: "Demolition Begins",
    detail:
      "DSM Group appointed to demolish the old theatre. Historical heritage items, including original projectors, carefully removed and preserved for display in the new MLEC.",
    status: "done",
  },
  {
    date: "April 2024",
    event: "Construction Starts",
    detail:
      "John Graham Construction begins work. Access road to the Promenade hotel formed (9 weeks). Substructure works begin (29 weeks).",
    status: "done",
  },
  {
    date: "September 2024",
    event: "Superstructure Rising",
    detail:
      "Permanent site establishment complete. Superstructure (the main frame of the building) begins. 44 weeks of work above ground level.",
    status: "done",
  },
  {
    date: "March–April 2026",
    event: "Interior & Specialist Fit-Out",
    detail:
      "High-level walkways and gantries installed (24 weeks). Fabric, finishes and specialist theatre installations begin, including the Liberty sprung dance floor and AV systems.",
    status: "active",
  },
  {
    date: "August 2026",
    event: "Completion Activities",
    detail:
      "Final completion works begin (29 weeks). The Light Fantastic water show components installed on Marine Lake.",
    status: "upcoming",
  },
  {
    date: "October 2026",
    event: "Handover & Staff Training",
    detail:
      "Building formally handed over to Sefton Council. ASM Global (appointed venue manager) begins 24-week staff training and familiarisation programme.",
    status: "upcoming",
  },
  {
    date: "April 2027",
    event: "Doors Open",
    detail:
      "MLEC opens to the public. Southport gets its landmark cultural venue back. Bigger, better, and built for the next 50 years.",
    status: "target",
  },
];

const FAQS = [
  {
    q: "When does the Marine Lake Events Centre open?",
    a: "Practical completion is expected in April 2027. Sefton Council and venue manager ASM Global will announce specific opening events and shows in the months leading up to opening.",
  },
  {
    q: "What kind of events will MLEC host?",
    a: "The MLEC is designed for everything: concerts, comedy nights, theatre productions, ballet, West End touring shows, conferences, exhibitions, award ceremonies, weddings, banquets, and sports events. With a 1,500-seat theatre and a separate 2,400-capacity exhibition hall, it can handle multiple events simultaneously.",
  },
  {
    q: "Where exactly is the Marine Lake Events Centre?",
    a: "MLEC is located on Marine Drive / the Promenade in Southport, on the site of the former Southport Theatre and Convention Centre. It sits directly on the shore of Marine Lake, which is why you'll also get The Light Fantastic water and light show just outside the front doors.",
  },
  {
    q: "What is The Light Fantastic?",
    a: "The Light Fantastic is a £3.3m water and light show on Marine Lake, the UK's first attraction of its kind. It features 106 jet fountains (including a 30m giant jet), six laser systems, three water projection screens, and 8-minute shows running seven days a week until 10:30pm. Themes include the History of Southport, Wildlife & Nature, Sport, Music, and Culture.",
  },
  {
    q: "Who is managing the MLEC?",
    a: "ASM Global has been appointed as venue operator. ASM Global manages over 350 venues worldwide, including Manchester's AO Arena and Liverpool's M&S Bank Arena, so Southport is in capable hands.",
  },
  {
    q: "How is MLEC being paid for?",
    a: "The £73m project is funded through: £33.3m from the Southport Town Deal, £20m from the Liverpool City Region Combined Authority, and £19.9m in Sefton Council prudential borrowing. It is the central project of the Southport Town Deal.",
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
  description: "Southport's new £73m Marine Lake Events Centre — 1,500-seat theatre, 2,400-capacity exhibition hall, and The Light Fantastic water show. Opening April 2027.",
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 pt-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Opening April 2027
              </span>
              <span className="text-slate-300 text-sm">Southport Town Deal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              Marine Lake<br />
              <span className="text-amber-400">Events Centre</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-6 max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              Southport's landmark £73m cultural venue. 1,500-seat theatre, 2,400-capacity exhibition hall,
              and the UK's first water and light show, right on Marine Lake.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                The Marine Lake Events Centre isn't just a new venue. It's a statement. A £73 million statement, funded by the
                Southport Town Deal, that says this town is serious about its future. A 1,500-seat theatre with a Liberty sprung
                dance floor. A 2,400-capacity exhibition hall that can be split three ways. A signature restaurant. A lakeside
                café with 180-degree views. And right outside the front doors, the UK's first water and light show:
                106 fountains, six lasers, projections on the lake itself, seven nights a week.
              </p>
              <p>
                Half a million additional visitors a year. Three hundred new jobs. Eighteen million pounds flowing into the
                local economy annually. If that doesn't get you excited about Southport's future, I don't know what will.
              </p>
            </div>
          </div>
        </section>

        {/* ── The Venue ── */}
        <section id="venue" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Inside the Building</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">The Venue in Detail</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
              103,000 sq ft designed for world-class performance, conferencing, and events. All with views across Marine Lake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: "Flexible Theatre & Auditorium",
                highlight: "Up to 1,500 seats",
                detail:
                  "The heart of MLEC. A state-of-the-art flexible auditorium capable of hosting West End touring productions, concerts, comedy, ballet, opera, and cinema-scale screenings. Leading digital AV technology throughout.",
              },
              {
                icon: Building2,
                title: "Exhibition Hall",
                highlight: "2,400 capacity",
                detail:
                  "A vast, column-free exhibition space that subdivides into three independent halls. Perfect for trade shows, banquets, sports events, wedding receptions, and corporate conferences. All three can be used simultaneously.",
              },
              {
                icon: Sparkles,
                title: "Liberty Sprung Dance Floor",
                highlight: "'Strictly Come Dancing' spec",
                detail:
                  "The same movable sprung dance floor used on the BBC's Strictly Come Dancing. One of only a handful installed in a UK venue. Ideal for galas, dance competitions, and ballroom events.",
              },
              {
                icon: Utensils,
                title: "Signature Restaurant",
                highlight: "Lake & coastline views",
                detail:
                  "A full-service restaurant built into the MLEC, offering 180-degree views across Marine Lake and the coast. Bookable independently of events. A destination dining experience in its own right.",
              },
              {
                icon: Coffee,
                title: "Lakeside Café & Bistro",
                highlight: "Open all year round",
                detail:
                  "Coffee and lunch by day, tapas and cocktails by night. The lakeside café space is open to the public year-round, independently of any events programme. A new social hub for Southport.",
              },
              {
                icon: Star,
                title: "VIP & Hospitality Suites",
                highlight: "Flexible event spaces",
                detail:
                  "Multiple VIP areas, breakout rooms, and dedicated hospitality suites. Whether you're hosting a product launch, private dining event, or awards ceremony, MLEC can be configured around you.",
              },
              {
                icon: Zap,
                title: "Professional AV & Production",
                highlight: "Leading digital technology",
                detail:
                  "Built to the technical spec demanded by touring productions and major concerts. Full fly tower, professional rigging infrastructure, broadcast-quality sound and lighting systems.",
              },
              {
                icon: Building2,
                title: "Production & Back-of-House",
                highlight: "Professional touring spec",
                detail:
                  "Dedicated loading bays, production offices, green rooms, dressing rooms, and technical support spaces. Everything a touring company or conference organiser needs, without compromises.",
              },
              {
                icon: Users,
                title: "Meeting Rooms & Offices",
                highlight: "Flexible configurations",
                detail:
                  "Smaller meeting rooms and office spaces for events that need quieter, separate breakout areas. Suitable for interviews, press junkets, sponsor activations, and ancillary event management.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <item.icon className="w-9 h-9 text-amber-500 mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-amber-600 text-sm font-semibold mb-2">{item.highlight}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Light Fantastic ── */}
        <section id="light-fantastic" className="scroll-mt-16">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl overflow-hidden text-white">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12">
                <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">
                  Included with MLEC
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                  The Light Fantastic
                  <span className="block text-blue-300 text-xl font-semibold mt-1">
                    The UK's First Water & Light Show
                  </span>
                </h2>
                <p className="text-slate-300 text-lg mb-6">
                  Directly in front of MLEC, Marine Lake becomes a performance space in its own right.
                  A £3.3m show running every night of the year, free to watch from the Promenade.
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    "Shows run 7 days a week, up to 10:30pm nightly",
                    "8-minute performances: daytime fountain shows and nighttime multimedia",
                    "106 jet fountains including a 30-metre giant centrepiece",
                    "Six laser systems and three 30m water projection screens",
                    "Themes: History of Southport, Wildlife, Sport, Music, Culture, Technology",
                    "Seasonal shows for holidays, custom shows for special events",
                    "Created by LCI Productions, world-leading entertainment specialists",
                    "All systems on floating barges. No impact on water sports on the lake.",
                  ].map((fact) => (
                    <div key={fact} className="flex items-start gap-2">
                      <Waves className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-6">Show System Specification</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { count: "94", label: "Straight Jet Fountains", sub: "15m height" },
                    { count: "11", label: "Swing Jet Fountains", sub: "15m height, choreographed" },
                    { count: "1", label: "Giant Jet Fountain", sub: "30m centrepiece" },
                    { count: "3", label: "Water Projection Screens", sub: "30m each" },
                    { count: "6", label: "Laser Systems", sub: "Night-time only" },
                    { count: "12", label: "Moving Lights", sub: "Choreographed" },
                    { count: "3", label: "Video Projection Systems", sub: "Synchronized" },
                    { count: "31", label: "Floating Barges", sub: "Anchored on Marine Lake" },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-700/60 rounded-lg p-3 text-center">
                      <div className="text-2xl font-extrabold text-amber-400">{item.count}</div>
                      <div className="text-xs font-semibold text-white mt-0.5">{item.label}</div>
                      <div className="text-xs text-slate-400">{item.sub}</div>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs mt-6">
                  All show equipment installed on 31 floating barges anchored on Marine Lake.
                  A 60m clear channel maintained at all times for water sports.
                  Laser operation approved by the Civil Aviation Authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Construction Timeline ── */}
        <section id="timeline" className="scroll-mt-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">From Demolition to Opening</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Construction Timeline</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Three years of work, one extraordinary result.
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
                            Target Open
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
                  "Hotels, B&Bs and self-catering near MLEC. From the Promenade to Lord Street, we've mapped the best options by distance and price.",
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
                  regeneration money coming to Southport, but it's the most visible. When those doors open in 2027,
                  they'll open onto a town that has also seen investment in Lord Street, the seafront, and the
                  wider cultural offer.
                </p>
                <p>
                  ASM Global, who also run Manchester's AO Arena and Liverpool's M&amp;S Bank Arena, have been appointed
                  to manage the venue. That's serious pedigree. It means touring shows, major conferences, and national
                  acts will be looking at Southport as a genuine stop on their circuit for the first time in years.
                </p>
                <p>
                  Half a million extra visitors a year don't just go to the venue. They stay in our hotels, eat in our
                  restaurants, drink in our bars, and shop on Lord Street. The ripple effect for local businesses is
                  enormous. The businesses that position themselves now will be the ones that benefit most.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Funding Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { source: "Southport Town Deal", amount: "£33.3m", pct: "45%" },
                    { source: "Liverpool City Region Combined Authority", amount: "£20m", pct: "27%" },
                    { source: "Sefton Council Prudential Borrowing", amount: "£19.9m", pct: "27%" },
                  ].map((row) => (
                    <div key={row.source}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{row.source}</span>
                        <span className="text-amber-400 font-bold">{row.amount}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full">
                        <div
                          className="h-2 bg-amber-400 rounded-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-slate-700 pt-3 mt-3 flex justify-between">
                    <span className="text-slate-300 font-semibold">Total Investment</span>
                    <span className="text-white font-extrabold text-lg">£73m+</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-base font-bold text-amber-800 mb-3">Key Project Partners</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li><span className="font-semibold">Lead Architect:</span> AFL Architects</li>
                  <li><span className="font-semibold">Project Manager:</span> Gardiner & Theobald</li>
                  <li><span className="font-semibold">Civil Engineers:</span> AECOM</li>
                  <li><span className="font-semibold">Venue Consultants:</span> IPW</li>
                  <li><span className="font-semibold">Main Contractor:</span> John Graham Construction</li>
                  <li><span className="font-semibold">Demolition:</span> DSM Group</li>
                  <li><span className="font-semibold">Venue Operator:</span> ASM Global</li>
                  <li><span className="font-semibold">Light Show:</span> LCI Productions</li>
                </ul>
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
                  all the same. But the building sitting on that plot in 2027 will be one of the finest venues in the
                  North of England.
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
              The Marine Lake Events Centre sits on the PR9 0 / PR8 1 boundary. 515,000 additional visitors per year is a material change to the local economy. If you&apos;re considering a town centre purchase, the full data on sold prices, schools, crime, and flood risk is on our postcode guides.
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
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3">Be Ready for 2027</p>
          <h2 className="text-3xl font-extrabold mb-4">Get Listed Before the Crowds Arrive</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
            MLEC is projected to bring 515,000 extra visitors to Southport every year. Is your accommodation,
            restaurant, or attraction in front of them? Get listed on SouthportGuide.co.uk now.
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
