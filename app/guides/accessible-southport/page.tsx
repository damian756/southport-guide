import Link from "next/link";
import Image from "next/image";
import { MapPin, Train, Heart, CheckCircle, Users, Flower2, ArrowRight, Clock, Volume2 } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("accessible-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "accessible Southport, disabled visitors Southport, Southport wheelchair access, Sunflower lanyard Southport, hidden disability Southport, sensory-friendly Southport, Southport disability guide",
  alternates: { canonical: `${BASE_URL}/guides/accessible-southport` },
  openGraph: {
    title: GUIDE.metaTitle ?? GUIDE.title,
    description: GUIDE.metaDescription ?? GUIDE.description,
    url: `${BASE_URL}/guides/accessible-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/sunflower/PROUD-To-SUPPORT-UK_2.webp` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Accessible Southport — Wheelchair Access, Hidden Disabilities & Sunflower-Friendly Venues",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/accessible-southport`,
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
};

const VENUES = [
  {
    name: "The Atkinson",
    postcode: "PR8 1DB",
    address: "Lord Street",
    category: "Gallery, café, theatre",
    sunflower: true,
    wheelchair: true,
    quietHour: false,
    notes: "Fully accessible with lift access throughout. Free gallery entry. The café is quiet and unhurried. Probably the best single venue in Southport for a calm, unhurried visit. Staff are well-trained and genuinely attentive.",
    bestFor: "Art, culture, quiet afternoon",
    noiseLevel: "Low",
  },
  {
    name: "Southport Market",
    postcode: "PR8 1JY",
    address: "Market Street",
    category: "Street food and independents",
    sunflower: false,
    wheelchair: true,
    quietHour: true,
    notes: "Saturday quiet hour runs 9–10am: reduced music, no PA announcements, lower sensory load. Level access throughout on the ground floor. Plenty of space between traders. A genuine quiet hour — not just turned down slightly.",
    bestFor: "Food, family visits, quiet hour Saturdays",
    noiseLevel: "Moderate (Low during quiet hour)",
  },
  {
    name: "Lord Street",
    postcode: "PR8 1QJ",
    address: "Lord Street boulevard",
    category: "Shopping, cafes",
    sunflower: false,
    wheelchair: true,
    quietHour: false,
    notes: "Flat, wide boulevard with glass canopies that provide shelter without feeling enclosed. Good accessibility for wheelchairs and pushchairs. Quietest on weekday mornings. Busiest on weekends, especially around the market end.",
    bestFor: "Shopping, browsing, outdoor walking",
    noiseLevel: "Low to moderate",
  },
  {
    name: "Southport Train Station",
    postcode: "PR8 1NL",
    address: "Chapel Street",
    category: "Transport",
    sunflower: true,
    wheelchair: true,
    quietHour: false,
    notes: "Southport station is a Sunflower-registered venue. Lanyards are available free at the station. Step-free access. Staff are familiar with the scheme. The station itself is relatively calm compared to larger city termini.",
    bestFor: "Arrival and departure",
    noiseLevel: "Moderate",
  },
  {
    name: "Southport Beach",
    postcode: "PR8 1RX",
    address: "Marine Drive",
    category: "Outdoor, nature",
    sunflower: false,
    wheelchair: true,
    quietHour: false,
    notes: "The beach itself is level sand, manageable for wheelchair users in dry conditions. The Promenade is fully paved and flat. Very early morning is the quietest time — before 9am in summer you can have the beach nearly to yourself. Wind and natural sound provides white noise that some find helpful.",
    bestFor: "Open space, early morning, dogs",
    noiseLevel: "Natural (varies with wind)",
  },
  {
    name: "Victoria Park",
    postcode: "PR8 2LG",
    address: "Rotten Row",
    category: "Park, outdoor",
    sunflower: false,
    wheelchair: true,
    quietHour: false,
    notes: "Flat park with paved paths. Accessible throughout outside of event periods. During the Flower Show and other events the park is significantly busier. Outside event dates it is genuinely quiet and good for a calm walk.",
    bestFor: "Walks, calm space between events",
    noiseLevel: "Low (outside events)",
  },
];

const PRACTICAL = [
  {
    icon: Flower2,
    title: "Sunflower lanyards in Southport",
    body: "Free Sunflower lanyards are available at Southport train station. No proof of disability required. You can also order online from hiddendisabilitiesstore.com and they will arrive within a few days. SouthportGuide is a Sunflower member and we are actively working to increase the number of registered venues in the town.",
  },
  {
    icon: Train,
    title: "Getting here by train",
    body: "Merseyrail from Liverpool Central to Southport is step-free and fully accessible. The journey is approximately 45 minutes. Southport station (PR8 1NL) is itself a Sunflower-registered venue. Trains run regularly throughout the day including evenings.",
  },
  {
    icon: MapPin,
    title: "Blue badge parking",
    body: "Blue badge parking is available at all main Southport car parks. Marine Drive and Princes Park both have designated spaces. Town centre on-street blue badge parking is available on most streets. The town is relatively flat which makes it manageable on foot from most car parks.",
  },
  {
    icon: Clock,
    title: "Best times to visit",
    body: "Weekday mornings before 11am are the quietest. Southport is a popular day-trip destination at weekends and in summer. If crowd density is a concern, aim for a weekday. During major events (Air Show, Open Championship, Flower Show) the town is significantly busier — plan around them or use them intentionally.",
  },
  {
    icon: Volume2,
    title: "Quiet spaces",
    body: "The Atkinson gallery is the most consistently quiet indoor space in the centre. Churchtown is quieter than the main town centre and worth knowing about: the Botanic Gardens are peaceful and free. The northern end of the beach is less visited than the Pier end.",
  },
  {
    icon: Users,
    title: "SAFE — Southport Access For Everyone",
    body: "SAFE (Southport Access For Everyone) is the local disability access charity. They maintain accessibility data for venues across Southport and are a valuable resource if you have specific access requirements beyond what this guide covers.",
  },
];

const FAQS = [
  {
    q: "Is Southport accessible for wheelchair users?",
    a: "The town centre — particularly Lord Street and the Promenade — is flat and largely accessible. The main car parks have designated blue badge spaces. The beach is accessible from the Promenade hardstanding, though sand is more challenging beyond the initial flat area. The Atkinson and Southport Market both have full wheelchair access.",
  },
  {
    q: "Does Southport recognise the Sunflower lanyard?",
    a: "Southport train station and The Atkinson are confirmed Sunflower-registered venues. SouthportGuide is a Sunflower member and we are actively encouraging more venues to register. Awareness is growing but is not universal — it is worth contacting specific venues ahead of important visits.",
  },
  {
    q: "Where can I get a Sunflower lanyard in Southport?",
    a: "Free Sunflower lanyards are available at Southport train station. No proof of disability required. You can also order from hiddendisabilitiesstore.com — they are free and delivered to your door.",
  },
  {
    q: "Is there anywhere in Southport with a quiet hour?",
    a: "Southport Market runs a quiet hour on Saturday mornings from 9am to 10am — reduced music and no PA announcements. This is currently the only confirmed regular quiet hour in the town. We are encouraging other venues and events to introduce similar provision.",
  },
  {
    q: "Is Southport a good option for visitors with autism?",
    a: "We have a dedicated guide to autism and sensory-friendly Southport which covers this in full. The short answer: yes, with the right planning. The beach, Churchtown, The Atkinson, and Southport Market on a quiet Saturday morning are all manageable. The town is busy during summer weekends and major events — plan accordingly.",
  },
];

export default function AccessibleSouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />

      {/* ── Hero ── */}
      <div className="bg-[#1C3A20] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[56vh]">
          {/* Badge panel */}
          <div className="relative min-h-[240px] sm:min-h-[320px] md:min-h-0 md:w-[38%] order-first md:order-last bg-white flex items-center justify-center p-10">
            <Image
              src="/images/sunflower/PROUD-To-SUPPORT-UK_2.webp"
              alt="Hidden Disabilities Sunflower — SouthportGuide is a proud member"
              width={280}
              height={280}
              className="object-contain w-full max-w-[220px]"
              priority
            />
          </div>
          {/* Text panel */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Sunflower member
              </span>
              <span className="text-white/50 text-sm font-medium">Southport · Merseyside</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Accessible
              <span className="block text-[#C9A84C]">Southport</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mb-8 leading-relaxed">
              Wheelchair access, Sunflower-friendly venues, quiet hours, transport, and practical guidance
              for visitors with visible and non-visible disabilities.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#venues" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Accessible venues
              </a>
              <a href="#practical" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                Practical information
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-[#1C3A20] border-t border-white/10 text-white">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: Flower2, value: "2", label: "Sunflower venues", sub: "Station + The Atkinson" },
              { icon: CheckCircle, value: "1", label: "Quiet hour", sub: "Southport Market, Sat 9–10am" },
              { icon: Train, value: "Step-free", label: "Train access", sub: "Merseyrail Liverpool–Southport" },
              { icon: Heart, value: "Free", label: "Lanyards", sub: "At the station" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-4">
                <s.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <div className="text-base font-extrabold text-[#C9A84C]">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                <div className="text-[11px] text-white/40 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">

        {/* ── Terry's Take ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Southport is More Accessible Than It Looks</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I have four kids and a 17-year-old who is autistic. I also have a bulldog called Frank who makes any
                outing its own kind of logistical exercise. So I know exactly what &quot;is this accessible?&quot; actually
                means in practice.
              </p>
              <p>
                Southport&apos;s main town centre is flat, which is a genuine advantage. Lord Street is wide, sheltered,
                and manageable in a wheelchair or with a pushchair. The beach is a flat Promenade for a long stretch.
                Train access from Liverpool is good. The Atkinson is the best building in the town for a calm, accessible
                visit and it is free.
              </p>
              <p>
                The gaps are real too. Sunflower awareness is not universal yet. Most events have no quiet provision.
                That is changing slowly. We joined the Sunflower scheme partly to help push it in the right direction.
                This guide is honest about what exists right now and where the gaps are.
              </p>
            </div>
          </div>
        </section>

        {/* ── Venue directory ── */}
        <section id="venues">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Venue Guide</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Accessible Venues in Southport</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Verified information. Where the data is our own, we say so. Where things may have changed, contact the venue.
            </p>
          </div>
          <div className="space-y-4">
            {VENUES.map((venue) => (
              <div key={venue.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-wrap items-start gap-2 justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#1B2E4B] text-lg">{venue.name}</h3>
                    <p className="text-gray-500 text-sm">{venue.address}, {venue.postcode} · {venue.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {venue.sunflower && (
                      <span className="inline-flex items-center gap-1 text-xs bg-[#1C3A20]/10 text-[#1C3A20] font-semibold px-2.5 py-1 rounded-full">
                        🌻 Sunflower
                      </span>
                    )}
                    {venue.wheelchair && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
                        ♿ Wheelchair
                      </span>
                    )}
                    {venue.quietHour && (
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 font-semibold px-2.5 py-1 rounded-full">
                        🔇 Quiet hour
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{venue.notes}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span><strong className="text-gray-700">Best for:</strong> {venue.bestFor}</span>
                  <span><strong className="text-gray-700">Noise:</strong> {venue.noiseLevel}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            Know of a venue that should be on this list? Contact us and we will verify and add it.
          </p>
        </section>

        {/* ── Practical ── */}
        <section id="practical">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Practical Guide</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Planning Your Visit</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PRACTICAL.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <item.icon className="w-5 h-5 text-[#C9A84C] mb-3" />
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">FAQs</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="grid sm:grid-cols-2 gap-5">
          <Link
            href="/guides/autism-friendly-southport"
            className="group bg-[#1B2E4B] text-white rounded-2xl p-6 hover:bg-[#243d63] transition-colors"
          >
            <Heart className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Autism and sensory-friendly guide</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              The eight calmest venues in Southport, honest events guidance, and practical advice for
              visitors with autism and sensory differences.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link
            href="/guides/southportguide-sunflower-member"
            className="group bg-[#1C3A20] text-white rounded-2xl p-6 hover:bg-[#243d2a] transition-colors"
          >
            <Flower2 className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Our Sunflower membership</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              Why we joined, what we are committed to, and how we are working to make
              Southport more inclusive for hidden disability visitors.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link
            href="/guides/the-open-2026-accessibility"
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#C9A84C]/50 hover:shadow-sm transition-all sm:col-span-2"
          >
            <h3 className="font-bold text-[#1B2E4B] text-base mb-1.5">The Open 2026 accessibility guide</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Sensory zone at Spectator Village 4, Sunflower lanyard recognition, accessible transport,
              and practical planning for visiting Royal Birkdale with a hidden disability.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Open 2026 accessibility guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </section>

      </div>
    </GuideLayout>
  );
}
