import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("live-music-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "live music Southport, live music venues Southport, bands Southport pubs, open mic Southport",
  alternates: { canonical: `${BASE_URL}/guides/live-music-southport` },
  openGraph: {
    title: "Live Music in Southport | Every Venue & Night Guide",
    description: "Where to find live music in Southport, every venue doing regular live music. Jazz, rock, acoustic, open mic. Which nights, which venues, what to expect.",
    url: `${BASE_URL}/guides/live-music-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/live-music-southport.jpg` }],
  },
};

const FAQS = [
  { q: "Where is there live music in Southport?", a: "Southport has regular live music at Coopers Bar (Lord Street), The Auld Dubliner (Lord Street), The Chop House (Lord Street), and several other town centre venues. Most live music happens on Friday and Saturday evenings, with some Sunday afternoon sessions and weeknight open mic nights." },
  { q: "Which pubs have live music every weekend in Southport?", a: "Coopers Bar on Lord Street has consistent live music on Friday and Saturday nights, a mix of jazz, soul, and rock acts. The Auld Dubliner runs acoustic sessions at weekends. The Chop House hosts bands on Fridays and Saturdays. The Marine pub on the Promenade also has regular live music." },
  { q: "Is there an open mic night in Southport?", a: "Yes. Several Southport pubs run open mic nights, typically mid-week. Venues change their schedules seasonally, so check social media for the current weekly open mic night in town. The Hesketh Arms in Churchtown has had open mic sessions historically." },
  { q: "Where is the best live music in Southport?", a: "Coopers Bar on Lord Street is consistently rated the best live music venue in Southport for quality and regularity of acts. It is a proper music bar rather than a pub that occasionally has a band on. For acoustic and singer-songwriter acts, The Auld Dubliner is the go-to." },
  { q: "Does Southport have any music festivals?", a: "Southport Beer Week (May) includes live music across 18 town-centre pubs. The Big Top Festival (May) features circus and street arts. The Comedy Festival (October) sometimes includes music acts. The Bijou Cinema on Post Office Avenue runs regular live gig nights throughout the year." },
  { q: "What type of music can I see live in Southport?", a: "The main genres covered by Southport's live music venues are classic rock, soul, jazz, acoustic/singer-songwriter, and covers bands. There is less of a scene for electronic, hip-hop, or indie music compared to a major city. Southport's live music is pub-and-bar focused and tends toward accessible crowd-pleasers." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Guide",
  name: "Live Music in Southport",
  description: "Complete guide to live music venues in Southport, every venue, every night, what to expect.",
  url: `${BASE_URL}/guides/live-music-southport`,
  image: `${BASE_URL}/images/guides/live-music-southport.jpg`,
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const VENUES = [
  {
    name: "Coopers Bar",
    area: "Lord Street",
    music: "Jazz, soul, rock, regular weekend live acts",
    nights: "Fri & Sat evenings",
    vibe: "Proper music bar. The best consistent live music offer in Southport.",
    dogFriendly: false,
  },
  {
    name: "The Auld Dubliner",
    area: "Lord Street",
    music: "Acoustic, singer-songwriter, folk",
    nights: "Fri & Sat, some midweek",
    vibe: "Irish pub atmosphere. More relaxed than Coopers. Good for acoustic acts.",
    dogFriendly: false,
  },
  {
    name: "The Chop House",
    area: "Lord Street area",
    music: "Rock, covers bands",
    nights: "Fri & Sat evenings",
    vibe: "Lively. Covers bands and rock acts. Gets busy on weekend nights.",
    dogFriendly: false,
  },
  {
    name: "The Marine",
    area: "Promenade / Seafront",
    music: "Mixed, local acts and covers",
    nights: "Weekend evenings",
    vibe: "Seafront pub with decent music nights. Good summer option.",
    dogFriendly: true,
  },
  {
    name: "Southport Bijou Cinema",
    area: "Post Office Avenue",
    music: "Live gig nights, mixed genres",
    nights: "Check schedule",
    vibe: "Intimate venue. Not a standard pub gig, more of an event.",
    dogFriendly: false,
  },
  {
    name: "The Hesketh Arms",
    area: "Churchtown",
    music: "Open mic, acoustic sessions",
    nights: "Midweek, check schedule",
    vibe: "Traditional village pub in Churchtown. Good for open mic evenings.",
    dogFriendly: true,
  },
];

export default function LiveMusicPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="bg-[#1A0A3D] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">
          {/* Poster */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[44%] order-first md:order-last">
            <Image src="/images/guides/live-music-southport.jpg" alt="Live music in Southport — guide to venues and nights" fill sizes="(max-width: 768px) 100vw, 44vw" className="object-contain" priority />
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Every Week</span>
              <span className="text-white/50 text-sm font-medium">Pubs · Bars · Venues Across Southport</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Live Music
              <span className="block text-[#C9A84C]">in Southport</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Where to find live music in Southport every week, venue by venue, night by night. Jazz, rock, acoustic, open mic, and gig nights across the town.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#venues" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">Venue Guide</a>
              <a href="#by-night" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">By Night of Week</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-20">
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Southport Has a Proper Live Music Scene</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>Southport is not Manchester. It does not have a sweaty indie venue with three bands on a Tuesday. What it does have is a consistent pub-based live music scene that punches above its weight for a town this size. Coopers Bar on Lord Street in particular has been putting on good acts for years.</p>
              <p>If you are visiting for a weekend and want an evening out with live music, Friday or Saturday on Lord Street covers you. Coopers for the best acts, Auld Dubliner for something more low-key, Chop House if you want it louder. They are within walking distance of each other.</p>
              <p>The Bijou Cinema gig nights are worth knowing about for something different. The Hesketh Arms in Churchtown is the local option if you are staying that end of town. And during Beer Week in May, live music breaks out across 18 pubs simultaneously, that week is worth planning a visit around specifically.</p>
            </div>
          </div>
        </section>

        <section id="venues" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Venue Guide</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Live Music Venues in Southport</h2>
          </div>
          <div className="space-y-4">
            {VENUES.map((v) => (
              <div key={v.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-bold text-[#1B2E4B] text-xl">{v.name}</h3>
                      {v.dogFriendly && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Dog Friendly</span>}
                    </div>
                    <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{v.area} · {v.nights}</p>
                    <p className="text-gray-700 text-sm font-semibold mb-1">{v.music}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.vibe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="by-night" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Quick Reference</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Live Music by Night of Week</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { day: "Thursday", venues: ["Some venues, check schedules"] },
              { day: "Friday", venues: ["Coopers Bar, bands/jazz", "The Chop House, rock/covers", "The Auld Dubliner, acoustic"] },
              { day: "Saturday", venues: ["Coopers Bar, bands/soul", "The Chop House, rock/covers", "The Auld Dubliner, acoustic", "The Marine, seafront option"] },
              { day: "Sunday", venues: ["Some venues, afternoon sessions", "Check Hesketh Arms (Churchtown)", "Bijou Cinema gig nights (occasional)"] },
            ].map((d) => (
              <div key={d.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">{d.day}</h3>
                <div className="space-y-1.5">
                  {d.venues.map((v) => (
                    <div key={v} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{v}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Live Music in Southport. FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />{faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1A0A3D] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Live Music in Southport</p>
          <h2 className="font-display text-3xl font-bold mb-4">Find What&apos;s On This Weekend</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Schedules change. Check venues directly on social media for this week&apos;s live music nights.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">Events Calendar</Link>
            <Link href="/guides/southport-bijou-cinema" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Bijou Cinema →</Link>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Nightlife &amp; Events</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Southport Beer Week 2026", month: "20–25 May 2026", desc: "Live music across 18 town-centre pubs. The week to plan a visit around.", href: "/guides/southport-beer-week-2026" },
                { name: "Southport Comedy Festival", month: "2–18 October 2026", desc: "15 years of comedy at Victoria Park. 17 nights, proper headliners.", href: "/guides/southport-comedy-festival" },
                { name: "Southport Bijou Cinema", month: "Year-round", desc: "Gig nights at Southport's independent cinema. Different to a pub night.", href: "/guides/southport-bijou-cinema" },
              ].map((item) => (
                <Link key={item.name} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                  <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                    {item.name} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
