import Image from "next/image";
import Link from "next/link";
import { Train, Car, Bus, Bike, MapPin, Clock, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("getting-to-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "getting to Southport, Southport train, Merseyrail Southport, Southport from Liverpool, drive to Southport, Southport station, Southport parking, bus to Southport, Southport directions",
  alternates: { canonical: `${BASE_URL}/guides/getting-to-southport` },
  openGraph: {
    title: "Getting to Southport | Train, Car, Bus & Bike Routes",
    description: "Merseyrail from Liverpool takes 35 minutes. Full guide to every way to reach Southport — train, car, coach, and bike.",
    url: `${BASE_URL}/guides/getting-to-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/getting-to-southport.jpg` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Getting to Southport. Train, Car, Bus and Bike",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/getting-to-southport`,
  datePublished: "2026-04-04",
  dateModified: "2026-04-04",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
  image: `${BASE_URL}/images/guides/getting-to-southport.jpg`,
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get to Southport by train?",
      acceptedAnswer: { "@type": "Answer", text: "Take Merseyrail from Liverpool Central to Southport. The journey takes approximately 50 minutes and trains run every 15 to 30 minutes throughout the day. The station is in the town centre, five minutes from Lord Street." },
    },
    {
      "@type": "Question",
      name: "How far is Southport from Liverpool?",
      acceptedAnswer: { "@type": "Answer", text: "Southport is approximately 18 miles north of Liverpool city centre. By train (Merseyrail Northern line) the journey takes around 50 minutes. By car via the A565 or M57/M58 it takes 45 to 60 minutes depending on traffic." },
    },
    {
      "@type": "Question",
      name: "How do I get to Southport from Manchester?",
      acceptedAnswer: { "@type": "Answer", text: "From Manchester, the easiest route by car is via the M60 and M58, approximately 50 to 60 miles and around 60 to 80 minutes depending on traffic. By train, change at Liverpool Central or Wigan for Merseyrail services to Southport — allow around 90 minutes total." },
    },
    {
      "@type": "Question",
      name: "What is the postcode for Southport town centre?",
      acceptedAnswer: { "@type": "Answer", text: "The postcode for Southport train station is PR8 1QW. Lord Street (the main shopping boulevard) is PR8 1PX. The seafront and Marine Drive is PR8 1RQ. For the Atkinson arts centre: PR8 1DB." },
    },
    {
      "@type": "Question",
      name: "Is there parking in Southport town centre?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. There are several car parks in and around Southport town centre including the NCP on Nevill Street (PR8 1LB), the Tulketh Street multi-storey (PR8 1EL), and surface car parks along Marine Drive (PR8 1RQ) near the seafront. On-street parking is also available on many side streets." },
    },
    {
      "@type": "Question",
      name: "Can I cycle to Southport?",
      acceptedAnswer: { "@type": "Answer", text: "Southport is well connected by the Trans Pennine Trail and the Sefton Coastal Path, both of which run through the town. Arriving from Liverpool, the coastal cycle route via Crosby and Formby is around 20 miles and mostly flat and traffic-free." },
    },
  ],
};

const ROUTES = [
  {
    from: "Liverpool Central",
    time: "50 min",
    method: "Train",
    notes: "Merseyrail Northern Line. Direct, no changes. Trains every 15-30 min.",
  },
  {
    from: "Wigan Wallgate",
    time: "55 min",
    method: "Train",
    notes: "Direct Merseyrail service. Hourly.",
  },
  {
    from: "Manchester Victoria",
    time: "90 min",
    method: "Train + change",
    notes: "Change at Wigan Wallgate or Liverpool Central.",
  },
  {
    from: "Preston",
    time: "60 min",
    method: "Train",
    notes: "Change at Wigan or direct on some services. Check timetables.",
  },
];

export default function GettingToSouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* Hero */}
      <div className="bg-[#1B2E4B] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[60vh]">
          <div className="relative min-h-[220px] sm:min-h-[300px] md:min-h-0 md:w-[50%] order-first md:order-last">
            <Image
              src="/images/guides/getting-to-southport.jpg"
              alt="Southport railway station with Merseyrail train"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-16 md:pl-16 md:pr-10 order-last md:order-first">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Transport</span>
              <span className="text-white/50 text-sm">Southport · PR8 1QW</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Getting to
              <span className="block text-[#C9A84C]">Southport</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mb-7 leading-relaxed">
              Train from Liverpool in 50 minutes. Car from Manchester in 90. Here is every way to get here — with postcodes, timings, and no filler.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#by-train" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-6 py-3 rounded-full font-bold text-sm transition-colors">By Train</a>
              <a href="#by-car" className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors">By Car</a>
              <a href="#by-bus" className="bg-white/10 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors">By Bus</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* Train times table */}
        <div className="bg-[#1B2E4B]/5 rounded-2xl p-6 border border-[#1B2E4B]/10">
          <div className="flex items-center gap-3 mb-5">
            <Train className="w-5 h-5 text-[#C9A84C]" />
            <h2 className="font-display text-xl font-bold text-[#1B2E4B]">Key journey times</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1B2E4B]/10">
                  <th className="text-left py-2 px-3 text-gray-500 font-semibold">From</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-semibold">Time</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-semibold">How</th>
                  <th className="text-left py-2 px-3 text-gray-500 font-semibold hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r) => (
                  <tr key={r.from} className="border-b border-gray-100">
                    <td className="py-3 px-3 font-semibold text-[#1B2E4B]">{r.from}</td>
                    <td className="py-3 px-3">
                      <span className="bg-[#C9A84C]/15 text-[#1B2E4B] font-bold px-2 py-0.5 rounded-lg text-xs">{r.time}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{r.method}</td>
                    <td className="py-3 px-3 text-gray-500 hidden sm:table-cell">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* By Train */}
        <section id="by-train" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0">
              <Train className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">By Train</h2>
          </div>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>
              Southport is on the <strong>Merseyrail Northern Line</strong>, which runs directly from Liverpool Central. The journey takes approximately <strong>50 minutes</strong> and trains run every 15 to 30 minutes throughout the day, seven days a week.
            </p>
            <p>
              Southport station is the terminus of the line. You cannot miss your stop. The station sits in the town centre, a five-minute walk from Lord Street, the beach, and most of the main attractions.
            </p>
            <p>
              <strong>From Manchester:</strong> You have two options. Via Wigan Wallgate (change to Merseyrail, total around 90 minutes) or via Liverpool Central (change at Liverpool, total around 100 minutes). Check National Rail for the best connection on your travel date.
            </p>
            <p>
              <strong>From Preston:</strong> Change at Wigan Wallgate for Merseyrail to Southport. Some direct services exist — check the timetable.
            </p>
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-xl p-4 not-prose">
              <p className="text-sm text-[#1B2E4B] font-medium">
                Southport station postcode: <strong>PR8 1QW</strong>. For timetables and tickets:{" "}
                <a href="https://www.merseyrail.org" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-bold">merseyrail.org</a>
              </p>
            </div>
          </div>
        </section>

        {/* By Car */}
        <section id="by-car" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0">
              <Car className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">By Car</h2>
          </div>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>From Liverpool:</strong> Take the A565 (Formby Bypass) north through Crosby, Formby, and Ainsdale into Southport. Around 18 miles, 45 to 60 minutes depending on traffic.
            </p>
            <p>
              <strong>From Manchester:</strong> M60 to M58, then A570 or A565 north into Southport. Around 50 to 60 miles, 60 to 90 minutes.
            </p>
            <p>
              <strong>From Preston:</strong> M6 south to M58 or A59 via Ormskirk. Around 25 miles, 35 to 50 minutes.
            </p>
            <p>
              Once in Southport, the main car parks are:
            </p>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              { name: "Marine Drive Seafront Car Park", postcode: "PR8 1RQ", notes: "Closest to the beach. Fills quickly on sunny days." },
              { name: "NCP Nevill Street", postcode: "PR8 1LB", notes: "Multi-storey near Lord Street. Covered. Open daily." },
              { name: "Tulketh Street", postcode: "PR8 1EL", notes: "Town centre multi-storey. Good for shopping." },
              { name: "Kew Street", postcode: "PR8 1HB", notes: "Surface car park, central, often available." },
            ].map((cp) => (
              <div key={cp.name} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{cp.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 font-mono">{cp.postcode}</p>
                    <p className="text-xs text-gray-600 mt-1">{cp.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/guides/parking-southport" className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-sm hover:underline">
              Full parking guide for Southport <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* By Bus */}
        <section id="by-bus" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0">
              <Bus className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">By Bus and Coach</h2>
          </div>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>
              Local bus services connect Southport to Ormskirk, Skelmersdale, and surrounding towns. The main bus station is on Lord Street / Eastbank Street in the town centre. Arriva and Stagecoach operate the main routes.
            </p>
            <p>
              <strong>National Express</strong> and other coach operators do not serve Southport directly. The nearest National Express hub is Liverpool (Liverpool ONE bus station), from which you would need to take the train or a local bus.
            </p>
            <p>
              For local bus timetables and Merseytravel network maps:{" "}
              <a href="https://www.merseytravel.gov.uk" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] font-bold hover:underline">merseytravel.gov.uk</a>
            </p>
          </div>
        </section>

        {/* By Bike */}
        <section id="by-bike" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0">
              <Bike className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">By Bike</h2>
          </div>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>
              The <strong>Trans Pennine Trail</strong> and the <strong>Sefton Coastal Path</strong> both pass through Southport, providing largely traffic-free cycling routes along the coast.
            </p>
            <p>
              From Liverpool, the coastal cycle route via Crosby Beach, Formby, and Ainsdale is approximately <strong>20 miles</strong> and almost entirely flat. It is one of the better urban-to-coastal cycling routes in the north-west.
            </p>
            <p>
              Bike parking is available at the train station and in the town centre. The seafront promenade has cycle paths running its full length.
            </p>
          </div>
        </section>

        {/* Quick links */}
        <section className="bg-[#1B2E4B] rounded-2xl p-7 text-white">
          <h2 className="font-display text-xl font-bold mb-4">Once you&apos;re here</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Southport Beach guide", href: "/guides/southport-beach" },
              { label: "Parking in Southport", href: "/guides/parking-southport" },
              { label: "Lord Street guide", href: "/guides/lord-street" },
              { label: "Things to do", href: "/things-to-do" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-white/80 hover:text-[#C9A84C] text-sm font-medium transition-colors group">
                <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long does it take to get to Southport by train from Liverpool?", a: "Approximately 50 minutes on the Merseyrail Northern Line from Liverpool Central, direct, no changes. Trains run every 15 to 30 minutes." },
              { q: "What is the postcode for Southport town centre?", a: "Southport station is PR8 1QW. Lord Street is PR8 1PX. The seafront and Marine Drive is PR8 1RQ. The Atkinson arts centre is PR8 1DB." },
              { q: "Is there parking at Southport station?", a: "There is limited short-stay parking immediately outside the station. For longer stays, the NCP car park on Nevill Street (PR8 1LB) is a short walk and covered. See the full parking guide for all options." },
              { q: "How do I get to Southport from Manchester?", a: "By car via the M60 and M58, around 60 to 90 minutes depending on traffic. By train, change at Wigan Wallgate or Liverpool Central for Merseyrail to Southport, total journey around 90 minutes." },
              { q: "Can I get to Southport without a car?", a: "Yes, easily. Merseyrail runs frequent services from Liverpool Central directly to Southport. Once in Southport, the beach, Lord Street, and main attractions are all walkable from the station." },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-[#1B2E4B] text-sm gap-3">
                  {q}
                  <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
