import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Car,
  Dog,
  Waves,
  Sun,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Clock,
  Utensils,
  Camera,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

// WMO weather code → label + emoji
function weatherLabel(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: "Clear sky", emoji: "☀️" };
  if (code <= 2) return { label: "Partly cloudy", emoji: "⛅" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code <= 49) return { label: "Foggy", emoji: "🌫️" };
  if (code <= 57) return { label: "Drizzle", emoji: "🌦️" };
  if (code <= 67) return { label: "Rain", emoji: "🌧️" };
  if (code <= 77) return { label: "Snow", emoji: "❄️" };
  if (code <= 82) return { label: "Rain showers", emoji: "🌦️" };
  if (code <= 86) return { label: "Snow showers", emoji: "🌨️" };
  if (code <= 99) return { label: "Thunderstorm", emoji: "⛈️" };
  return { label: "Unknown", emoji: "🌡️" };
}

async function getSouthportWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=53.6476&longitude=-3.00418&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&wind_speed_unit=mph&timezone=Europe%2FLondon",
      { next: { revalidate: 1800 } } // cache 30 mins
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      temp: Math.round(data.current.temperature_2m),
      wind: Math.round(data.current.wind_speed_10m),
      humidity: data.current.relative_humidity_2m,
      code: data.current.weather_code as number,
    };
  } catch {
    return null;
  }
}

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-beach");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport beach, Southport beach postcode, parking Southport beach, Southport beach dogs, Southport beach tide times, Marine Drive Southport, Southport seafront",
  alternates: { canonical: `${BASE_URL}/guides/southport-beach` },
  openGraph: {
    title: "Southport Beach | The Honest Local Guide",
    description:
      "Postcode, parking, dogs, tides, and what to actually expect. Southport Beach is one of the widest in England, here's how to make the most of it.",
    url: `${BASE_URL}/guides/southport-beach`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-beach-hero.webp`, width: 1200, height: 630, alt: "Southport Beach — wide flat sand at low tide" }],
  },
};

const QUICK_LINKS = [
  { href: "#practical", label: "Practical Info", icon: MapPin },
  { href: "#what-to-expect", label: "What to Expect", icon: Waves },
  { href: "#parking", label: "Parking", icon: Car },
  { href: "#dogs", label: "Dogs", icon: Dog },
  { href: "#facilities", label: "Facilities", icon: Clock },
  { href: "#nearby", label: "Nearby", icon: Utensils },
  { href: "#tips", label: "Best Times", icon: Sun },
  { href: "#faq", label: "FAQs", icon: ChevronRight },
];

const FAQS = [
  {
    q: "What is the postcode for Southport Beach?",
    a: "The main parking postcode for Southport Beach is PR8 1RQ — this is Marine Drive, the pay-and-display car park running along the seafront promenade. The Esplanade car park (PR8 1RX) is a smaller alternative 50m from the sand near Adventure Coast. For satnav, use PR8 1RQ.",
  },
  {
    q: "Is there parking at Southport Beach?",
    a: "Yes. Marine Drive (PR8 1RQ) is the main beach car park — pay-and-display bays running along the promenade. The Esplanade car park (PR8 1RX) is a smaller pay-and-display option near Adventure Coast. Ocean Plaza (PR8 1SQ) is free for shoppers. On summer weekends, Marine Drive fills by mid-morning — arrive before 10am or use town centre parking and walk (12 minutes).",
  },
  {
    q: "Are dogs allowed on Southport Beach?",
    a: "Yes, dogs are welcome year-round on the main sections of Southport Beach and along the Promenade. Seasonal restrictions may apply to certain sections during peak summer months (typically June–September). Follow the signage on-site. Dogs must be kept on leads in King's Gardens.",
  },
  {
    q: "How far out does the tide go at Southport Beach?",
    a: "At low tide, the sea can be over a kilometre away, one of the widest beaches in England. This is the beach's most distinctive feature. The flat wet sand stretches almost to the horizon. Check tide times before you visit: at high tide the beach is narrower but the sea is much closer. bbc.co.uk/weather/coast-and-sea has live tide data.",
  },
  {
    q: "Is Southport Beach good for swimming?",
    a: "Southport Beach is better for walking than swimming. The tidal range is huge, at low tide the sea is very far out, and at high tide the water can be shallow and murky. If you want to swim, Ainsdale Beach (2 miles south, Blue Flag) is a better option, or Marine Lake for flat water. Never swim near the outlet channel.",
  },
  {
    q: "What facilities are there at Southport Beach?",
    a: "Public toilets at several points along the Promenade. A café at Marine Lake and others near Adventure Coast Southport. The Marine Lake café and King's Gardens are adjacent to the beach and both have toilet facilities. Lifeguard cover operates on sections of the beach during summer months, check the red and yellow flags.",
  },
  {
    q: "When is the best time to visit Southport Beach?",
    a: "Sunset on a clear evening is exceptional, the light across the flats towards the Irish Sea is genuinely beautiful. For walking, mid-tide is ideal (more sand exposed, sea closer). For peace and quiet, early morning on any day, or weekdays outside July and August. Summer weekends are busy from 11am onwards.",
  },
  {
    q: "What is near Southport Beach?",
    a: "Marine Lake (140 acres of flat water with boat hire), King's Gardens (17 acres of free gardens with adventure playground), Adventure Coast Southport (30+ rides, free entry), Splash World (indoor water park), and Southport Pier (England's second longest). All are within a 10-minute walk of the main beach access point on Marine Drive.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Beach",
  name: "Southport Beach",
  description:
    "Southport Beach, one of the widest beaches in England, on the Lancashire coast. Adjacent to Marine Lake and King's Gardens. Dogs welcome year-round.",
  url: `${BASE_URL}/guides/southport-beach`,
  geo: { "@type": "GeoCoordinates", latitude: 53.6435, longitude: -3.009 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marine Drive",
    addressLocality: "Southport",
    postalCode: "PR8 1RQ",
    addressCountry: "GB",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Dogs allowed", value: true },
    { "@type": "LocationFeatureSpecification", name: "Paid parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Toilets", value: true },
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

export default async function SouthportBeachGuidePage() {
  const weather = await getSouthportWeather();
  const wx = weather ? weatherLabel(weather.code) : null;

  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[80vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-beach-hero.webp"
            alt="Southport Beach — wide flat sand stretching to the sea at low tide"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Southport Guide
              </span>
              <span className="text-white/50 text-sm font-medium">PR8 1RQ · Marine Drive</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Beach</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              One of the widest beaches in England. At low tide the sea can be over a kilometre away,
              this is a coastal landscape to walk through, not just sit by. Stunning at sunset. Free to visit.
              Dogs welcome all year.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#practical"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Practical Info
              </a>
              <a
                href="#what-to-expect"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                What to Expect →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div className="sticky top-16 z-20 bg-[#1B2E4B]/97 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-0.5 overflow-x-auto py-2.5 scrollbar-hide">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-white/60 hover:text-[#C9A84C] text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap transition"
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Answer Block ── */}
      <div id="practical" className="scroll-mt-28 bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-10">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">The quick answers</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: MapPin, label: "Postcode", value: "PR8 1RQ", sub: "Marine Drive" },
              { icon: Car, label: "Parking", value: "Pay & display", sub: "Marine Drive" },
              { icon: Dog, label: "Dogs", value: "Welcome", sub: "Year-round" },
              { icon: Waves, label: "Swimming", value: "Caution", sub: "Check tides first" },
              { icon: Clock, label: "Open", value: "Always", sub: "No entry fee" },
              { icon: Sun, label: "Best time", value: "Sunset", sub: "Any season" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center">
                <item.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{item.label}</p>
                <p className="text-white font-bold text-sm mt-0.5">{item.value}</p>
                <p className="text-white/50 text-[11px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Weather Widget ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Planning a visit?</p>
              <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-1">Southport Weather</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Southport is on the exposed Sefton Coast, it can feel colder and windier than the inland forecast suggests.
                A 16°C sunny day in a stiff westerly off the Irish Sea is a jumper day. Check before you leave.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1">Best months: May, June, September</span>
                <span className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1">Wettest: October to January</span>
                <span className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1">Windiest: October to March</span>
              </div>
            </div>
            <div className="flex-none">
              {weather && wx ? (
                <div className="bg-[#1B2E4B] rounded-2xl px-6 py-5 min-w-[220px]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl leading-none">{wx.emoji}</span>
                    <div>
                      <p className="text-white font-bold text-2xl leading-none">{weather.temp}°C</p>
                      <p className="text-white/60 text-xs mt-0.5">{wx.label}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <Wind className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" />
                      <span>{weather.wind} mph wind</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <Droplets className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" />
                      <span>{weather.humidity}% humidity</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/30 mt-3">
                    Southport · Updated every 30 min ·{" "}
                    <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">open-meteo.com</a>
                  </p>
                </div>
              ) : (
                <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl px-6 py-5 min-w-[220px] text-center">
                  <Thermometer className="w-8 h-8 text-[#C9A84C] mx-auto mb-2" />
                  <p className="text-[#1B2E4B] font-semibold text-sm mb-1">Check the forecast</p>
                  <a
                    href="https://www.bbc.co.uk/weather/2637433"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A84C] text-xs font-semibold hover:underline"
                  >
                    BBC Weather for Southport →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-20">

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">What Southport Beach Is Actually Like</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                People visit Southport expecting a typical English seaside beach, strip of sand, sea right there, maybe an ice cream.
                What they find is something stranger and more impressive. At low tide, Southport Beach is vast.
                The sea retreats so far that you could walk for twenty minutes and still not reach the water.
                What&apos;s left behind is a flat, reflective landscape, wet sand stretching to the horizon, sky filling everything above it.
                On a clear evening with the sun going down over the Irish Sea, it&apos;s one of the better views in the North West.
                I&apos;ve lived here forty-one years and it still gets me.
              </p>
              <p>
                Go with realistic expectations and you&apos;ll love it. Go expecting Brighton and you&apos;ll be confused.
                This is a beach for walking, for watching, for flying a kite on a windy Tuesday when the town is quiet.
                The kids can run without hitting anyone. The dog can belt around to her heart&apos;s content.
                It is genuinely free and genuinely enormous and that&apos;s a combination you don&apos;t find often.
              </p>
              <p>
                The smart move is to combine it with the rest of the seafront: Marine Lake (140 acres of flat water right next door),
                King&apos;s Gardens (17 acres free, adventure playground, crazy golf), and the Promenade itself.
                If you&apos;re visiting in summer, start at the beach and work your way along. You can fill a full day without spending much at all.
              </p>
            </div>
          </div>
        </section>

        {/* ── What to Expect ── */}
        <section id="what-to-expect" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Beach Itself</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Expect</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Southport Beach is unlike most English beaches. Understanding the tidal range, the scale, and the seasonal character
              will make the difference between a great visit and a confusing one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "The Tidal Range",
                emoji: "🌊",
                color: "from-[#1A5C7A] to-[#1E8AB0]",
                content: "Southport has one of the most dramatic tidal ranges of any beach in England. At low tide the sea withdraws over a kilometre, you're left with flat wet sand that reflects the sky like a mirror. At high tide the water comes right up to the sea wall. Check tide times before you go: at low tide there's more sand to walk on, but the sea is very distant. Mid-tide is often the sweet spot.",
                tip: "BBC Weather (bbc.co.uk/weather/coast-and-sea) has live Southport tide times.",
              },
              {
                title: "The Scale",
                emoji: "📏",
                color: "from-[#1B2E4B] to-[#2A4A73]",
                content: "Southport Beach is enormous, literally one of the widest beaches in England. On a clear day you can see Blackpool Tower to the north and the Welsh hills to the south. This is a beach where the sense of space is the main attraction. Kids can run without supervision worries. Dogs can run free. Wind is generally available for kite-flying.",
                tip: "Walk south along the beach towards Ainsdale for the most dramatic dune scenery.",
              },
              {
                title: "Swimming",
                emoji: "🏊",
                color: "from-[#7A4A1A] to-[#B06A20]",
                content: "Be honest about this: Southport Beach is not a great swimming beach. The tidal range means the water is often either very far away or very shallow. The sea here is not known for clear water. If you want to swim, Ainsdale Beach (2 miles south, Blue Flag award) is the better option, or hire a pedalo on Marine Lake for flat-water fun with zero risk.",
                tip: "Never swim near the outlet channel at the southern end of Marine Lake, currents can be strong.",
              },
              {
                title: "Sunset Views",
                emoji: "🌅",
                color: "from-[#4A1A7A] to-[#6A2AB0]",
                content: "Southport Beach faces west, out across the Irish Sea. The sunsets here are genuinely exceptional, especially in autumn and winter when the light is lower and the colours run across the flat wet sand. Late afternoon on a clear day, walk out onto the beach and face west. It's one of those views that surprises people who weren't expecting it.",
                tip: "October and November often produce the best sunsets, lower sun angle, dramatic clouds over Wales.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${item.color} px-6 py-5 flex items-center gap-3`}>
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.content}</p>
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg px-3 py-2">
                    <p className="text-xs text-[#1B2E4B] font-semibold">{item.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Parking ── */}
        <section id="parking" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Parking at Southport Beach</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B2E4B] text-white">
                    <th className="text-left px-5 py-3 font-semibold">Location</th>
                    <th className="text-left px-5 py-3 font-semibold">Cost</th>
                    <th className="text-left px-5 py-3 font-semibold">Distance</th>
                    <th className="text-left px-5 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { location: "Marine Drive (PR8 1RQ)", cost: "Pay & display", distance: "On the seafront", notes: "Main beach car park. Pay-and-display bays along the promenade. Fills fast on summer weekends", href: "/parking/parking-southport-marine-drive-car-park" },
                    { location: "Esplanade car park", cost: "Pay & display", distance: "50m from beach", notes: "Pay-and-display, near Adventure Coast and Splash World", href: "/parking/parking-esplanade-parking" },
                    { location: "Ocean Plaza", cost: "Free (shoppers)", distance: "5 min walk", notes: "Free with retail. Asda, cinema, and other stores nearby" },
                    { location: "Town centre NCP", cost: "Pay & display", distance: "10–12 min walk", notes: "Multiple town centre car parks available, well-signed", href: "/parking/parking-ncp-southport-london-street" },
                  ].map((row) => (
                    <tr key={row.location} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[#1B2E4B]">
                        {"href" in row && row.href ? (
                          <Link href={row.href} className="hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors">
                            {row.location}
                          </Link>
                        ) : row.location}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{row.cost}</td>
                      <td className="px-5 py-3.5 text-gray-600">{row.distance}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-xs leading-relaxed">
                <span className="font-semibold">Summer weekends:</span> Marine Drive fills by mid-morning. Arrive before 10am or use the town centre car parks and walk. The Promenade walk takes about 12 minutes from the town centre, it&apos;s a pleasant one.
              </p>
            </div>
          </div>

          <div className="mt-5 bg-[#1B2E4B] rounded-2xl p-6 md:p-8 text-white">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">By Train</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Southport train station is on the Merseyrail Northern Line, direct trains from Liverpool Central every 15–20 minutes.
                  From the station it&apos;s about a 12-minute walk to the seafront, following signs to the beach and Marine Drive.
                </p>
              </div>
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Satnav Postcode</p>
                <p className="text-white font-mono text-2xl font-bold mb-1">PR8 1RQ</p>
                <p className="text-white/60 text-sm">Marine Drive, Southport — the main pay-and-display car park running alongside the beach and Marine Lake.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Dogs ── */}
        <section id="dogs" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Four-Legged Friends</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Dogs on Southport Beach</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Dog className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg">Year-Round Access</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Dogs are welcome on Southport Beach all year. The main beach, the wide expanse you access from Marine Drive,
                  has no permanent dog restrictions. Seasonal restrictions may apply to certain sections during peak summer
                  months: follow the signs on-site, which are clearly posted.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The sheer size of the beach means there&apos;s always plenty of room, even on a busy Saturday in August,
                  you can walk ten minutes from the main access point and have the beach to yourself.
                  Frank, my bulldog, has been coming here for three years and has registered no complaints.
                </p>
              </div>
              <div>
                <h4 className="font-display font-bold text-[#1B2E4B] mb-4">Dog-owner checklist</h4>
                <div className="space-y-3">
                  {[
                    "Fresh water, the beach has none; bring your own",
                    "Lead near the Marine Lake outlet, the current can surprise dogs",
                    "Check seasonal signs at the access points",
                    "Dogs must be on leads in King&apos;s Gardens adjacent to the beach",
                    "Bags (obviously), bins are at regular intervals along the Promenade",
                    "Towel, wet sand + dog = you know what's coming",
                  ].map((tip) => (
                    <div key={tip} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span dangerouslySetInnerHTML={{ __html: tip }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Facilities ── */}
        <section id="facilities" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">On-Site</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Facilities</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: "🚻",
                title: "Toilets",
                detail: "Public toilets at several points along the Promenade, near Adventure Coast, and in King&apos;s Gardens. Marine Lake café area has facilities. More limited away from the main access points.",
              },
              {
                emoji: "☕",
                title: "Café & Food",
                detail: "Marine Lake has a café. Further along, Splash World and Adventure Coast both have food options. For a proper meal, the Promenade has several places and Lord Street (10 min walk) has full restaurant options.",
              },
              {
                emoji: "🏥",
                title: "Lifeguards",
                detail: "RNLI lifeguard cover operates on sections of Southport Beach during the summer season. Swim between the red and yellow flags. Outside these hours and in winter, swim with caution, the beach is not patrolled.",
              },
              {
                emoji: "♿",
                title: "Accessibility",
                detail: "The Promenade is fully accessible. The beach itself is flat and firm at low to mid-tide, making it one of the more accessible beaches in the area for wheelchair users, though some sections of loose dry sand above the tide line are harder going.",
              },
              {
                emoji: "🅿️",
                title: "Parking",
                detail: "Free Marine Drive bays plus pay-and-display car parks near the seafront. Town centre parking is a 12-minute walk away. See the full parking guide above.",
              },
              {
                emoji: "🚂",
                title: "Public Transport",
                detail: "Southport is on the Merseyrail Northern Line. Direct from Liverpool Central every 15–20 minutes. 12-minute walk from Southport station to the seafront.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Safety ── */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 md:p-10">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl font-bold text-amber-900 mb-4">Safety on Southport Beach</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Never swim near the outlet channel at the southern end of Marine Lake, currents are unpredictable.",
                  "The tide comes in quickly across the flat beach, don&apos;t get cut off. Always watch the tide direction.",
                  "Soft sand areas near the waterline can be boggy, stick to firmer wet sand.",
                  "In winter, the beach is exposed and wind chill is significant, layers are not optional.",
                  "In fog, the flat landscape can be disorienting, always walk parallel to the Promenade so you know the direction back.",
                  "The RNLI has a station in Southport. Lifeguards patrol in summer. Outside lifeguard hours, take extra care.",
                ].map((tip) => (
                  <div key={tip} className="flex gap-2 text-sm text-amber-900">
                    <ChevronRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: tip }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Best Times ── */}
        <section id="tips" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">When to Go</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Best Times to Visit</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                season: "Spring",
                months: "Mar–May",
                emoji: "🌱",
                highlight: "Quiet, fresh, beautiful light",
                detail: "March to May is genuinely underrated. Quiet midweek days, the beach to yourself, long low light in the evenings. Dog walkers and serious walkers know this is the sweet spot. Cold but often clear.",
              },
              {
                season: "Summer",
                months: "Jun–Aug",
                emoji: "☀️",
                highlight: "Busy, warm, families",
                detail: "July and August are peak season. Marine Drive fills early, the beach gets busy by midday, and the seafront hums. Arrive before 10am for easy parking. The Air Show in late August is the peak event: enormous crowds, book parking the night before.",
              },
              {
                season: "Autumn",
                months: "Sep–Nov",
                emoji: "🍂",
                highlight: "Best sunsets of the year",
                detail: "October and November produce the most spectacular sunsets on the beach. Lower sun angle, dramatic clouds, the colours running across the flat wet sand. The town is quiet, parking is easy, and the beach is almost always to yourself.",
              },
              {
                season: "Winter",
                months: "Dec–Feb",
                emoji: "❄️",
                highlight: "Wild, empty, worth it",
                detail: "Southport Beach in winter is an acquired taste but a genuine one. Gale-force wind off the Irish Sea, crashing waves (if the tide is in), a sky the colour of pewter. Take the dog, wrap up, walk. It&apos;s a completely different beach and just as worthwhile.",
              },
            ].map((item) => (
              <div key={item.season} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-0.5">{item.months}</p>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-1">{item.season}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold mb-3">{item.highlight}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Nearby ── */}
        <section id="nearby" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Right Next Door</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s Nearby</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The beach is the start of a much bigger day out. Everything below is within a 10-minute walk.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: "⛵",
                name: "Marine Lake",
                sub: "140 acres · Boat hire · Free to walk",
                detail: "Right next to the beach. 140 acres of flat water with pedalo and motorboat hire, swan boats, and a seasonal café. The perimeter path is one of the nicest easy walks in Southport.",
                href: "/activities",
              },
              {
                emoji: "🏡",
                name: "King&apos;s Gardens",
                sub: "17 acres · Completely free",
                detail: "Southport&apos;s best free afternoon. Adventure playground with separate fenced area for under-5s, fountains, crazy golf, the Victorian Venetian Bridge. Right on the seafront.",
                href: "/attractions",
              },
              {
                emoji: "🎢",
                name: "Adventure Coast",
                sub: "30+ rides · Free entry · Pay per ride",
                detail: "30+ rides across themed lands. Free to enter. Pay per ride or buy a wristband. Open weekends and selected weekdays from late March to end of September.",
                href: "/attractions",
              },
              {
                emoji: "🌊",
                name: "Splash World",
                sub: "Indoor water park · All weather",
                detail: "The indoor option for when the beach weather turns. Water slides, pools, and activities under cover. The back-up plan that turns out to be a highlight.",
                href: "/activities",
              },
              {
                emoji: "🎡",
                name: "Southport Pier",
                sub: "1,108m · England&apos;s 2nd longest",
                detail: "A 20-minute walk from the main beach access. Walk the full length for views across the estuary and the Irish Sea. Free to walk, worth the detour.",
                href: "/guides/southport-pier",
              },
              {
                emoji: "🛍️",
                name: "Lord Street",
                sub: "10 min walk · Victorian boulevard",
                detail: "Southport&apos;s famous Victorian shopping boulevard, independent boutiques, restaurants, and the particular grandeur of 1850s civic architecture. Worth walking at any time of day.",
                href: "/shopping",
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#C9A84C]/30 transition-all group"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="text-[#C9A84C] text-[11px] font-bold uppercase tracking-wider mb-1">{item.sub}</p>
                <h3
                  className="font-display font-bold text-[#1B2E4B] text-lg mb-2 group-hover:text-[#C9A84C] transition-colors"
                  dangerouslySetInnerHTML={{ __html: item.name }}
                />
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-start gap-4 mb-6">
              <Utensils className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-1">Where to Eat After the Beach</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Promenade has several places for a post-beach meal. For proper food, Lord Street (10 minutes&apos; walk)
                  is the better option, a wider choice of restaurants, café options, and the general pleasure of walking
                  one of England&apos;s finest Victorian boulevards.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/restaurants" className="bg-[#C9A84C] text-[#1B2E4B] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#E8C87A] transition-colors">
                Restaurant Guide →
              </Link>
              <Link href="/cafes" className="bg-[#1B2E4B] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors">
                Cafés in Southport →
              </Link>
            </div>
          </div>

          <div className="mt-5 bg-[#1B2E4B] rounded-2xl p-6 md:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Staying Overnight?</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Southport has hotels on the seafront, on Lord Street, and in Birkdale village. If you&apos;re making a weekend of it,
                The Bold Hotel and The Scarisbrick are both walking distance from the beach. Book ahead in summer and during Open week (July 2026).
              </p>
            </div>
            <Link
              href="/hotels"
              className="flex-none bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-5 py-2.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
            >
              Hotels in Southport →
            </Link>
          </div>
        </section>

        {/* ── Photography ── */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10 text-white">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-[#C9A84C] flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">Photography at Southport Beach</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  Southport Beach is one of the best photography locations in the North West. The combination of flat wet sand,
                  wide sky, and the Irish Sea light makes for conditions that photographers travel for.
                  The golden hour before sunset, roughly an hour before the sun hits the horizon, is when the light is best.
                  Mid-tide means more reflections in the wet sand. Low tide means more distance and drama.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Best light", value: "Hour before sunset" },
                    { label: "Best tide", value: "Mid-tide, incoming" },
                    { label: "Best season", value: "Autumn (Oct–Nov)" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Beach. FAQs</h2>
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

        {/* ── Other Beaches ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The Wider Coast</p>
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Other Beaches Near Southport</h2>
              <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm">
                Southport Beach is the starting point. These are the other beaches within easy reach, each one very different.
              </p>
            </div>
            {/* Ainsdale — full-width featured card */}
            <Link
              href="/blog/beachcombing-ainsdale-winter"
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden block mb-5"
            >
              <Image
                src="/images/blog/ainsdale/ainsdale-beach-dunes-sea-view.webp"
                alt="Ainsdale Beach — dune grass in the foreground, Irish Sea behind"
                fill
                className="object-cover object-[center_55%] transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="text-xs font-bold bg-[#C9A84C] text-[#1B2E4B] px-2 py-0.5 rounded-full">Best for swimming · Blue Flag</span>
                <h3 className="font-display font-bold text-white text-2xl mt-3 mb-1">Ainsdale Beach</h3>
                <p className="text-white/75 text-sm leading-relaxed max-w-lg">
                  2 miles south. Backed by SSSI dunes, natterjack toads, sand lizards, mermaid&apos;s purses on the tideline. Better for swimming than Southport Beach.
                </p>
                <p className="text-[#C9A84C] text-xs font-bold mt-3 group-hover:underline">
                  A winter beachcombing guide to Ainsdale →
                </p>
              </div>
            </Link>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  name: "Formby Beach",
                  detail: "7 miles south. National Trust. Native red squirrels in the pinewoods above the beach. One of the extraordinary days out in the region.",
                  tag: "Red squirrels · NT",
                  href: "https://www.formbyguide.co.uk/formby-beach",
                },
                {
                  name: "Crosby Beach",
                  detail: "14 miles south. Antony Gormley&apos;s Another Place. 100 iron figures facing out to sea. One of England&apos;s most powerful pieces of public art.",
                  tag: "Antony Gormley",
                  href: "/attractions/another-place-crosby",
                },
              ].map((beach) => (
                <Link
                  key={beach.name}
                  href={beach.href}
                  className="bg-[#FAF8F5] rounded-xl p-5 hover:shadow-sm hover:bg-white transition-all group"
                >
                  <span className="text-xs font-bold bg-[#C9A84C]/20 text-[#1B2E4B] px-2 py-0.5 rounded-full">{beach.tag}</span>
                  <h3
                    className="font-display font-bold text-[#1B2E4B] text-lg mt-3 mb-2 group-hover:text-[#C9A84C] transition-colors"
                    dangerouslySetInnerHTML={{ __html: beach.name }}
                  />
                  <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: beach.detail }} />
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/beaches-parks"
                className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-[#2A4A73] transition-colors"
              >
                All Beaches & Coastal Walks <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Coastal property callout ── */}
        <section>
          <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-1">Property Data</p>
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">Living Near the Beach. Coastal Postcode Prices</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                PR8 2 (Ainsdale-on-Sea) and PR9 0 (Marine Drive promenade) offer some of the best coastal proximity value in the North West. Sold prices, flood zone data, school ratings, and broadband speeds for every coastal postcode in Southport.
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link
                href="/property/pr8-2"
                className="bg-[#1B2E4B] hover:bg-[#2A4A73] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap text-center"
              >
                PR8 2. Ainsdale →
              </Link>
              <Link
                href="/property/pr9-0"
                className="bg-white border border-gray-200 hover:border-[#1B2E4B] text-[#1B2E4B] px-5 py-2.5 rounded-full font-semibold text-sm transition-colors whitespace-nowrap text-center"
              >
                PR9 0. Promenade →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
