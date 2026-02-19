import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Train, Car, Bus, MapPin, AlertTriangle, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting to Royal Birkdale | Transport Guide for The Open 2026 | Southport Guide",
  description:
    "How to get to Royal Birkdale for The Open Championship 2026. Merseyrail trains, park and ride, taxis, road closures and walking routes — everything you need for Open week in Southport.",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026/getting-there" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
    { "@type": "ListItem", position: 3, name: "Getting There", item: "https://www.southportguide.co.uk/the-open-2026/getting-there" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get to Royal Birkdale for The Open 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Do not drive to the course — road closures around Birkdale make it impractical and parking is reserved for officials only. Take Merseyrail to Birkdale station (10–15 minute walk from the course), or use the R&A park and ride service from sites across Southport." },
    },
    {
      "@type": "Question",
      name: "Which train station is closest to Royal Birkdale?",
      acceptedAnswer: { "@type": "Answer", text: "Birkdale station on the Merseyrail Southport line is the closest station, approximately 10–15 minutes walk from the course entrance. Trains run frequently from Liverpool Central and Southport station throughout the day." },
    },
    {
      "@type": "Question",
      name: "Is there parking at Royal Birkdale for The Open 2026?",
      acceptedAnswer: { "@type": "Answer", text: "No public parking is available at or near Royal Birkdale during The Open. All nearby parking is reserved for officials, media, and accredited partners. Use the park and ride sites operated by the R&A from across Southport, or take the train to Birkdale station." },
    },
  ],
};

export default function OpenGettingTherePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* Hero */}
      <section className="relative h-64 md:h-80 bg-[#1B2E4B] overflow-hidden">
        <Image
          src="/images/categories/transport.webp"
          alt="Getting to Royal Birkdale for The Open 2026"
          fill sizes="100vw" quality={75}
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/50 via-[#1B2E4B]/30 to-[#1B2E4B]/90" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> The Open 2026
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Getting to Royal Birkdale</h1>
          <p className="text-white/60 mt-2">Transport and parking for The Open Championship, July 12–19 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

        {/* Warning banner */}
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 text-sm">Do not drive to the course</p>
            <p className="text-amber-700 text-sm mt-1 leading-relaxed">
              Parking at or near Royal Birkdale is restricted to officials, accredited media, and hospitality partners only. Road closures around Waterloo Road and surrounding streets are in effect on all championship days. Anyone who attempts to park locally will find it impossible and will miss significant play as a result.
            </p>
          </div>
        </div>

        {/* Train */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
              <Train className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B]">By Train — The Recommended Option</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Merseyrail operates frequent services on the Southport line from Liverpool Central, with a stop at Birkdale station. The station is approximately a 10–15 minute walk from the Royal Birkdale course entrance on Waterloo Road — a pleasant walk through Birkdale village.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-2 text-xs font-bold text-[#1B2E4B] uppercase tracking-wider">From</th>
                  <th className="text-left py-2 text-xs font-bold text-[#1B2E4B] uppercase tracking-wider">To</th>
                  <th className="text-left py-2 text-xs font-bold text-[#1B2E4B] uppercase tracking-wider">Journey time</th>
                  <th className="text-left py-2 text-xs font-bold text-[#1B2E4B] uppercase tracking-wider">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr><td className="py-3 text-gray-700">Liverpool Central</td><td className="py-3 text-gray-700">Birkdale</td><td className="py-3 font-semibold text-[#1B2E4B]">~40 min</td><td className="py-3 text-gray-600">Every 15 min</td></tr>
                <tr><td className="py-3 text-gray-700">Southport (town)</td><td className="py-3 text-gray-700">Birkdale</td><td className="py-3 font-semibold text-[#1B2E4B]">~5 min</td><td className="py-3 text-gray-600">Every 15 min</td></tr>
                <tr><td className="py-3 text-gray-700">Formby</td><td className="py-3 text-gray-700">Birkdale</td><td className="py-3 font-semibold text-[#1B2E4B]">~15 min</td><td className="py-3 text-gray-600">Every 15 min</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Trains will be busier than normal during Open week. Allow extra time in the morning, particularly before the first tee times. Return journeys after play can have queues — consider staying in Birkdale village for dinner before catching the train back.
          </p>
        </div>

        {/* Park & Ride */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
              <Bus className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B]">Park &amp; Ride</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            The R&A operates a network of park and ride sites across Southport and the surrounding area during Open week. Shuttle buses run direct to the course entrance from early morning until after the last group finishes each day. Passes for park and ride are purchased in advance through theopen.com.
          </p>
          <ul className="space-y-3">
            {[
              ["Victoria Park, Southport", "Central site, well served, popular — book early"],
              ["Woodvale Airfield (Formby Road)", "Good if approaching from the south on the A565"],
              ["Meols Cop Road area", "Eastern approach, less traffic than coastal route"],
            ].map(([site, note]) => (
              <li key={site} className="flex gap-3 text-sm">
                <span className="text-[#C9A84C] font-bold flex-none">→</span>
                <span><span className="font-semibold text-[#1B2E4B]">{site}</span> — <span className="text-gray-500">{note}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-5 bg-[#FAF8F5] rounded-xl p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#1B2E4B]">Note:</span> Full park and ride details — including confirmed site locations, prices, and booking links — are published by The R&A at{" "}
              <a href="https://www.theopen.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline font-semibold">theopen.com</a>{" "}
              as the championship approaches. Check there for the definitive information.
            </p>
          </div>
        </div>

        {/* Driving & parking */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
              <Car className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B]">Driving to Southport</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Southport is well connected by road. If you&apos;re driving to the area — to reach your accommodation, park and ride site, or Southport town centre — the main routes are straightforward.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { from: "Manchester", via: "M61, M58, A570", time: "~1hr 15min" },
              { from: "Liverpool", via: "A565 coast road", time: "~45 min" },
              { from: "Preston / M6", via: "A59 into Southport", time: "~40 min" },
              { from: "Leeds / M62", via: "M58, A570", time: "~1hr 45min" },
            ].map(({ from, via, time }) => (
              <div key={from} className="flex gap-3 items-start text-sm bg-[#FAF8F5] rounded-xl p-4">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1B2E4B]">From {from}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{via}</p>
                  <p className="text-[#C9A84C] font-semibold text-xs mt-1">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taxis */}
        <div className="bg-white rounded-2xl border border-gray-100 p-7">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#1B2E4B]">Taxis &amp; Local Transport</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Taxis from Southport town centre to Royal Birkdale take approximately 10 minutes and cost around £8–12 each way. During championship days, expect queues for taxis after play. Pre-booking a return is strongly recommended if you plan to use taxis both ways.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              "Book return taxis in advance — demand massively outstrips supply on championship days",
              "Ride-hailing apps (Uber, etc.) operate in Southport and can be more reliable for returns",
              "Some local taxi firms offer pre-booked Open week packages — worth checking with your accommodation",
              "Walking from Southport town centre to Birkdale is feasible (around 30–40 minutes along the seafront)",
            ].map((tip) => (
              <li key={tip} className="flex gap-3">
                <span className="text-[#C9A84C] font-bold flex-none">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          <Link href="/the-open-2026" className="text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
            ← Back to The Open 2026
          </Link>
          <Link href="/the-open-2026/accommodation" className="text-sm font-semibold text-[#C9A84C] hover:underline">
            Find accommodation →
          </Link>
          <Link href="/transport" className="text-sm font-semibold text-[#C9A84C] hover:underline">
            Local transport directory →
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
