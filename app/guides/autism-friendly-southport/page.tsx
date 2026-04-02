import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Sun,
  Flower2,
  Waves,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Heart,
  Car,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("autism-friendly-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "autism friendly Southport, sensory friendly Southport, autism friendly days out Southport, sensory friendly days out near me, quiet places Southport, autism friendly beach, hidden disability Southport",
  alternates: { canonical: `${BASE_URL}/guides/autism-friendly-southport` },
  openGraph: {
    title: "Autism Friendly Southport | Sensory-Friendly Visitor Guide",
    description:
      "Quiet beaches, calm venues, and honest advice for autistic visitors and their families planning a trip to Southport.",
    url: `${BASE_URL}/guides/autism-friendly-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-beach.webp` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Autism Friendly Southport: A Practical Guide for Visitors",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/autism-friendly-southport`,
  datePublished: "2026-03-31",
  dateModified: "2026-03-31",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: {
    "@type": "Organization",
    name: "SouthportGuide.co.uk",
    url: BASE_URL,
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Southport autism friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Southport has a good number of genuinely calm venues and open spaces that work well for autistic visitors. Botanic Gardens, The Atkinson gallery, Marine Lake, King's Gardens, and Hesketh Park are all low-stimulus environments. The beach at low tide on a quiet weekday morning is one of the most open, unpredictable-noise-free spaces in the North West.",
      },
    },
    {
      "@type": "Question",
      name: "What are the best sensory-friendly places to visit in Southport?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Botanic Gardens in Churchtown (free, open, calm), The Atkinson on Lord Street (gallery and museum, quiet, accessible), Marine Lake and King's Gardens on the seafront (open outdoor space, free, predictable), Hesketh Park (large Victorian park, quiet), and Southport Library (calm, free, accessible).",
      },
    },
  ],
};

const QUICK_LINKS = [
  { href: "#venues", label: "Calm Venues", icon: Flower2 },
  { href: "#events", label: "Events Guide", icon: AlertTriangle },
  { href: "#tips", label: "Practical Tips", icon: Clock },
  { href: "#faq", label: "FAQs", icon: ChevronRight },
  { href: "#listings", label: "Listings", icon: MapPin },
];

const VENUES = [
  {
    name: "Botanic Gardens, Churchtown",
    icon: "🌿",
    distance: "2 miles north",
    entry: "Free",
    why: "Open outdoor space, free, calm, no background noise. Victorian walled garden with a sensory-friendly layout. Weekday mornings are usually very quiet. The formal garden area has clear paths and predictable sightlines. Dog-friendly on leads.",
    practical: "Parking on Bankfield Lane or the surrounding Churchtown streets. Cafe on site. Toilets available. Postcode: PR9 7NB.",
    tags: ["Free", "Outdoor", "Quiet"],
    tagColor: "bg-green-100 text-green-800",
  },
  {
    name: "The Atkinson, Lord Street",
    icon: "🖼️",
    distance: "Town centre",
    entry: "Free gallery",
    why: "Gallery and museum in a historic building on Lord Street. Generally quiet, well-lit, and calm. The gallery has no background music. Clear layout with defined rooms. The cafe is separate from the gallery space, so you can avoid it if noise is an issue.",
    practical: "Free gallery entry. Accessible building. Toilets on site. Quietest weekday mornings. Check atkinson.co.uk for quiet session times.",
    tags: ["Free gallery", "Indoor", "Calm"],
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    name: "King's Gardens and Marine Lake",
    icon: "⛵",
    distance: "Seafront",
    entry: "Free",
    why: "17 acres of free outdoor space directly on the seafront. Open, predictable layout. The Marine Lake perimeter walk is flat and clear. The adventure playground has a separate fenced area for under-5s. Boat hire on the lake adds a low-stimulus activity option. No loud background noise outside summer weekends.",
    practical: "Free entry. Marine Drive free parking directly adjacent. Toilets at several points. Postcode: PR8 1QU.",
    tags: ["Free", "Outdoor", "Seafront"],
    tagColor: "bg-sky-100 text-sky-800",
  },
  {
    name: "Hesketh Park",
    icon: "🌳",
    distance: "South of town",
    entry: "Free",
    why: "A large Victorian park in the quieter south of the town. Less known to visitors, so rarely crowded even on summer weekends. Formal gardens, boating lake, open grass areas. Calm and predictable. Away from the main tourist areas and the noise that comes with them.",
    practical: "Free entry. Street parking on Hesketh Drive. No cafe on site. Toilets in the park. Good for longer walks. Postcode: PR9 9NW.",
    tags: ["Free", "Outdoor", "Rarely crowded"],
    tagColor: "bg-green-100 text-green-800",
  },
  {
    name: "Southport Beach (weekday mornings)",
    icon: "🏖️",
    distance: "Seafront",
    entry: "Free",
    why: "At low tide on a quiet weekday morning, Southport Beach is one of the most open, uncrowded natural spaces in the North West. The sea retreats over a kilometre. Flat, reflective, vast. Very few people before 10am outside summer weekends. Excellent for children who need space to move freely with no unexpected obstacles.",
    practical: "Free parking along Marine Drive. Check tide times before you go. Mid-tide gives more visual interest than full low tide. Avoid summer weekend afternoons. Dogs welcome all year. Postcode: PR8 1RX.",
    tags: ["Free", "Outdoor", "Space to move"],
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    name: "Wayfarers Arcade, Lord Street",
    icon: "🏛️",
    distance: "Town centre",
    entry: "Free to enter",
    why: "Victorian covered arcade off Lord Street. Quieter than the main boulevard, particularly on weekday mornings. Clear linear layout with a defined entrance and exit point. Independent shops, lower footfall than the main shopping streets. Good as a short, structured walk-through with clear escape routes.",
    practical: "Free to walk through. Short and linear — easy to manage and easy to exit. Busier on Saturdays. Off Lord Street, PR8 1NT.",
    tags: ["Indoor", "Clear layout", "Short visit"],
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    name: "Southport Library",
    icon: "📚",
    distance: "Town centre",
    entry: "Free",
    why: "Public library, inherently calm, free to visit, accessible building with clear layout. Quiet by design. A reliable fallback if unexpected weather changes your plan. Children's section is well-resourced.",
    practical: "Princes Street, Southport PR8 1ST. Free entry. Accessible. Parking in nearby town centre car parks.",
    tags: ["Free", "Indoor", "Quiet by design"],
    tagColor: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "RSPB Marshside",
    icon: "🦢",
    distance: "2 miles north",
    entry: "Free",
    why: "Open nature reserve north of the town. Flat paths, wide skies, very few people outside weekend wildlife events. No loud background noise. Hides available for watching birds from a sheltered, contained position. The predictable layout and low visitor numbers make it one of the calmest options near Southport.",
    practical: "Free entry to the reserve. Small car park on Marshside Road. Walk from the hides is flat and predictable. Best weekday mornings. Postcode: PR9 9PJ.",
    tags: ["Free", "Outdoor", "Nature"],
    tagColor: "bg-teal-100 text-teal-800",
  },
];

const EVENTS_CAUTION = [
  {
    name: "Southport Air Show",
    when: "Late August",
    issue: "100,000+ visitors. Very loud aircraft directly overhead. Enormous crowds on the beach and Promenade. One of the loudest events on the Sefton calendar.",
    verdict: "Avoid for most sensory-sensitive visitors.",
    severity: "high",
  },
  {
    name: "British Musical Fireworks Championship",
    when: "September",
    issue: "Three nights of very loud fireworks. Victoria Park fills with large crowds. Sudden loud bangs are the defining feature of the event.",
    verdict: "Avoid. Earplugs would help but the crowds add additional challenge.",
    severity: "high",
  },
  {
    name: "Armed Forces Festival",
    when: "Late June",
    issue: "Parade along the Promenade with marching bands. Ceremonial gun salutes. Large crowds across the town and seafront.",
    verdict: "Approach carefully. The Drumhead Service is quieter. Avoid the parade route.",
    severity: "medium",
  },
  {
    name: "The Open Championship",
    when: "12–19 July 2026",
    issue: "40,000+ visitors per day in a small area. Traffic, queues, noise throughout the town. The whole of Southport operates at maximum capacity for a week.",
    verdict: "Not suitable for most sensory-sensitive visitors during championship days.",
    severity: "high",
  },
  {
    name: "Cristal Palace on Lord Street",
    when: "3–4 April 2026",
    issue: "Thousands gathered on Lord Street. Aerial performance with live music directly overhead. A very narrow boulevard becomes very full.",
    verdict: "Approach carefully. Watching from the fringes at a distance is possible.",
    severity: "medium",
  },
  {
    name: "Southport Flower Show",
    when: "August",
    issue: "Large show across Victoria Park. Can be busy. Music stages operate on certain days.",
    verdict: "Thursday session is typically the quietest. Check the programme for music-free areas.",
    severity: "low",
  },
];

const EVENTS_GOOD = [
  {
    name: "Sefton Open Art Exhibition",
    when: "April to June",
    why: "Gallery exhibition at The Atkinson. Calm, quiet, free entry to the gallery. No crowds, no loud performances. One of the most relaxed events in Southport's calendar.",
  },
  {
    name: "Books Alive! Literature Festival",
    when: "October half-term",
    why: "Storytelling and author events at venues across town. Individual sessions are small and contained. Good for children who engage well with structured storytelling.",
  },
  {
    name: "Make It! Craft Workshops, The Atkinson",
    when: "Monthly",
    why: "Small-group workshops in a calm venue. Structured, predictable, clear start and end times. Check The Atkinson website for dates.",
  },
  {
    name: "Southport Artisan Market",
    when: "Monthly, Southport Market",
    why: "Indoor market at Southport Market on Market Street. Manageable scale, clear layout, easy exits. Much quieter than outdoor street events.",
  },
];

const PRACTICAL_TIPS = [
  {
    icon: Car,
    title: "Parking close to every venue",
    body: "All the venues in this guide have parking within a short walk. Botanic Gardens: Bankfield Lane street parking. Marine Lake and King's Gardens: free bays on Marine Drive, directly adjacent. The Atkinson: London Street NCP, a short covered walk. None require long walks through busy areas.",
  },
  {
    icon: Clock,
    title: "Best times to visit",
    body: "Weekday mornings before 11am are consistently the quietest across all venues. Summer weekends from midday onwards are the most challenging. The seafront is quietest October to April outside school holidays. If you can go on a Tuesday or Wednesday morning, most venues will be near-empty.",
  },
  {
    icon: Heart,
    title: "Hidden Disabilities Sunflower",
    body: "The Sunflower Lanyard scheme is accepted at Southport station, The Atkinson, and a growing number of businesses in the town. It is worth phoning specific venues in advance if this matters to your visit, as awareness varies.",
  },
  {
    icon: Users,
    title: "Accessible toilets",
    body: "The Atkinson has accessible toilets. King's Gardens and the Promenade have toilets at multiple points. Botanic Gardens cafe has toilets. Always check the specific venue in advance if this is a key planning factor.",
  },
  {
    icon: MapPin,
    title: "Plan your route in advance",
    body: "All the venues in this guide have clear postcodes and predictable layouts. Knowing the route from the car park to the entrance before you leave reduces uncertainty on the day. Google Street View is useful for previewing car park entrances and venue approaches.",
  },
  {
    icon: Sun,
    title: "Bringing a dog",
    body: "Dogs welcome at Botanic Gardens (on leads), Hesketh Park, Marine Lake and King's Gardens (on leads), Southport Beach (year-round), and RSPB Marshside. The Atkinson does not allow dogs inside. Most outdoor venues are dog-friendly.",
  },
];

const FAQS = [
  {
    q: "Is Southport autism friendly?",
    a: "Southport has a good number of genuinely calm venues and open spaces that work well for autistic visitors. Botanic Gardens, The Atkinson gallery, Marine Lake, King's Gardens, and Hesketh Park are all low-stimulus environments. The beach at low tide on a quiet weekday morning is one of the most open, unpredictable-noise-free spaces in the North West. The town centre and seafront on a busy summer weekend are a different matter. This guide is honest about both.",
  },
  {
    q: "What are the best sensory-friendly places to visit in Southport?",
    a: "Botanic Gardens in Churchtown (free, open, calm, postcode PR9 7NB), The Atkinson on Lord Street (gallery and museum, quiet, accessible, free entry), Marine Lake and King's Gardens on the seafront (open outdoor space, free, predictable layout), Hesketh Park in the south of town (large Victorian park, rarely crowded), and Southport Library on Princes Street (calm, free, accessible). Southport Beach on a quiet weekday morning is also excellent — enormous, flat, and virtually empty before 10am.",
  },
  {
    q: "Which Southport events should be avoided for sensory reasons?",
    a: "The Southport Air Show (late August, 100,000+ people, loud aircraft overhead), the British Musical Fireworks Championship (September, very loud, sudden bangs), the Armed Forces Festival (June, parade with gunfire sounds), and Cristal Palace on Lord Street (April, large outdoor crowds on a narrow boulevard). The Open Championship in July brings 40,000+ people to a small area daily. The Flower Show in August is large but more manageable if you visit on a Thursday (the quietest session).",
  },
  {
    q: "Is Southport Beach good for autistic children?",
    a: "It can be excellent. At low tide on a quiet weekday morning it is one of the most open, uncrowded beaches in England. The sea retreats over a kilometre, leaving flat wet sand with very few people. Space to run, nothing unexpected, dogs on leads. The key is timing: avoid summer weekends, arrive before 10am, and check the tide times so the sea is not fully out (mid-tide is the sweet spot). Busy summer Saturdays are a completely different experience.",
  },
  {
    q: "Does The Atkinson have quiet sessions?",
    a: "The Atkinson on Lord Street runs quiet opening sessions at certain times. The gallery is generally calm throughout the week regardless. Check atkinson.co.uk for current quiet session times and any specific sensory-friendly events, as these vary by season and programme.",
  },
  {
    q: "Is there parking close to autism-friendly venues in Southport?",
    a: "Yes. For Botanic Gardens in Churchtown: street parking on Bankfield Lane and surrounding Churchtown streets. For The Atkinson: London Street NCP is the closest car park, a short covered walk. For Marine Lake and King's Gardens: Marine Drive free bays are directly adjacent. For Hesketh Park: street parking on Hesketh Drive. None require long walks through busy areas.",
  },
  {
    q: "Are there hidden disability lanyards available in Southport?",
    a: "The Hidden Disabilities Sunflower Lanyard scheme is accepted at an increasing number of Southport businesses and venues. The Atkinson, Southport station, and larger retail chains in the town centre are among those that recognise it. It is worth contacting specific venues in advance to confirm, as awareness varies.",
  },
];

export default function AutismFriendlySouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-beach.webp"
            alt="Southport Beach at low tide — wide open calm space"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B] via-[#1B2E4B]/60 to-[#1B2E4B]/20" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/autism-logo.png"
                alt="Autism friendly"
                width={40}
                height={40}
                className="rounded-lg flex-shrink-0"
              />
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Practical Guide
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Autism Friendly
              <span className="block text-[#C9A84C]">Southport</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mb-8 leading-relaxed">
              An honest guide for autistic visitors, families with sensory sensitivities, and carers planning a day out in Southport.
              Eight calm venues, an events guide, and the practical information that actually matters.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#venues"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Calm Venues
              </a>
              <a
                href="#events"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Events Guide →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Quick Nav ── */}
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

      {/* ── At a Glance stats ── */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-10">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">At a glance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Flower2,  label: "Calm venues",         value: "8 listed",         sub: "all verified in person" },
              { icon: Clock,    label: "Best time",            value: "Weekday mornings", sub: "before 11am" },
              { icon: Heart,    label: "Hidden Disabilities",  value: "Sunflower lanyard",sub: "accepted at key venues" },
              { icon: Waves,    label: "Free entry",           value: "Most venues",      sub: "beach, parks, gallery" },
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

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-7xl py-14 space-y-20">

        {/* Terry's Take */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">The honest picture</h2>
            <div className="grid md:grid-cols-2 gap-6 text-white/75 leading-relaxed text-[15px]">
              <div className="space-y-4">
                <p>
                  Southport is a mixed picture. It has some genuinely excellent calm and open spaces, places that work well
                  for autistic visitors and families who need predictable environments. It also has events and areas that
                  are challenging, and I want to be straight about both.
                </p>
                <p>
                  Botanic Gardens in Churchtown is one of the quietest free public spaces in the North West. The Atkinson
                  gallery on Lord Street is calm, clear, and free. Southport Beach on a weekday morning before the crowds
                  arrive is vast, flat, and almost silent.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  The Air Show in August, the fireworks in September, and Open Championship week in July are different:
                  big crowds, loud noise, unpredictable movement. This guide tells you which events to plan around and
                  which to avoid.
                </p>
                <p>
                  I have four kids. This is field-tested. I have taken them to every venue in this guide and I know
                  exactly what works and what does not. The advice is honest because it needs to be.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calm venues */}
        <section id="venues" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Where to go</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Calm and Sensory-Friendly Venues</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              These venues are calm by nature, free in most cases, and suitable for autistic visitors and those with
              sensory sensitivities. All are verified by someone who has actually visited them.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {VENUES.map(({ name, icon, distance, entry, why, practical, tags, tagColor }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#C9A84C]/30 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${tagColor}`}>{entry}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-xs text-gray-400 font-medium">{distance}</span>
                      {tags.map((t) => (
                        <span key={t} className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{why}</p>
                    <div className="bg-[#FAF8F5] rounded-xl px-4 py-3 border border-gray-100">
                      <p className="text-gray-500 text-xs leading-relaxed">
                        <span className="font-semibold text-[#1B2E4B]">Practical: </span>
                        {practical}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events section */}
        <section id="events" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before you book</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Events: The Honest Guide</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Southport has a busy events calendar. Some events are manageable for sensory-sensitive visitors. Others
              are not. This section is blunt about which is which.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-[#1B2E4B] text-base uppercase tracking-wide text-sm">Approach with care or avoid</h3>
              </div>
              <div className="space-y-3">
                {EVENTS_CAUTION.map(({ name, when, issue, verdict, severity }) => (
                  <div key={name} className={`rounded-xl p-4 border ${
                    severity === "high"
                      ? "bg-red-50 border-red-100"
                      : severity === "medium"
                      ? "bg-amber-50 border-amber-100"
                      : "bg-yellow-50 border-yellow-100"
                  }`}>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-bold text-[#1B2E4B] text-sm">{name}</p>
                      <span className="text-gray-400 text-xs">{when}</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-2">{issue}</p>
                    <p className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                      severity === "high"
                        ? "bg-red-100 text-red-700"
                        : severity === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>{verdict}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <h3 className="font-bold text-[#1B2E4B] text-sm uppercase tracking-wide">Events that tend to work well</h3>
              </div>
              <div className="space-y-3">
                {EVENTS_GOOD.map(({ name, when, why }) => (
                  <div key={name} className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-bold text-[#1B2E4B] text-sm">{name}</p>
                      <span className="text-gray-400 text-xs">{when}</span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{why}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[#1B2E4B] rounded-xl p-4 space-y-2">
                <p className="text-white/60 text-xs leading-relaxed">
                  For a full calendar of what is on when, see the{" "}
                  <Link href="/events" className="text-[#C9A84C] hover:underline font-semibold">
                    2026 events page
                  </Link>
                  . Individual event guides include crowd estimates and logistics.
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Southport Market runs Quiet Hours and has a sensory-friendly layout. See our{" "}
                  <Link href="/guides/southport-market" className="text-[#C9A84C] hover:underline font-semibold">
                    full Southport Market guide
                  </Link>{" "}
                  for accessibility detail, trader listings, and what to expect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical tips */}
        <section id="tips" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Planning your visit</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Practical Tips</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The logistics that make the difference between a good day and a difficult one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICAL_TIPS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#1B2E4B]/5 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#1B2E4B]" />
                </div>
                <h3 className="font-display font-bold text-[#1B2E4B] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Collection CTA */}
        <section>
          <div className="bg-gradient-to-r from-[#1B2E4B] to-[#2A4A73] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/images/autism-logo.png"
              alt="Sensory-friendly"
              width={64}
              height={64}
              className="rounded-xl flex-shrink-0"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">Directory</p>
              <h3 className="font-display text-xl font-bold text-white mb-2">Sensory-Friendly Businesses in Southport</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Browse the full directory of sensory-friendly venues across Southport. Galleries, nature reserves, calm
                cafes, and outdoor spaces. 24 listings and growing.
              </p>
            </div>
            <Link
              href="/collections/sensory-friendly-southport"
              className="flex-none bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] font-bold text-sm px-6 py-3.5 rounded-full transition-colors whitespace-nowrap"
            >
              Browse Listings →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex gap-3 items-start">
                  <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1B2E4B] mb-2 text-sm">{q}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Anchor for listings ── */}
      <div id="listings" className="scroll-mt-28" />
    </GuideLayout>
  );
}
