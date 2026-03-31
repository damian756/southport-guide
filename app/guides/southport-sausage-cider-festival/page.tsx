import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Ticket,
  Clock,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-sausage-cider-festival");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Southport Sausage Cider Festival 2026, Sausage and Cider Festival Southport, Victoria Park food festival Southport April 2026",
  alternates: { canonical: `${BASE_URL}/guides/southport-sausage-cider-festival` },
  openGraph: {
    title: "Sausage & Cider Festival Southport 2026 | Saturday 18 April",
    description: "Bavarian-style food and drink festival at Victoria Park, Southport. Saturday 18 April 2026. Afternoon and evening sessions. Bratwurst, artisan ciders, oompah bands.",
    url: `${BASE_URL}/guides/southport-sausage-cider-festival`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-sausage-cider-festival.webp` }],
  },
};

const FAQS = [
  { q: "When is the Sausage & Cider Festival in Southport 2026?", a: "The Sausage & Cider Festival Southport 2026 is on Saturday 18 April 2026 at Victoria Park (Rotten Row, PR8 2BZ). There are two sessions: afternoon (1pm–5pm) and evening (5pm–10pm)." },
  { q: "Do I need a ticket for the Sausage & Cider Festival?", a: "Yes, tickets are required and must be purchased in advance. The event runs as two separate sessions (afternoon 1–5pm and evening 5–10pm). Book online via the event ticketing pages, check feverup.com/m/99142 or skiddle.com for availability." },
  { q: "What is at the Sausage & Cider Festival?", a: "A Bavarian-inspired food and drink festival featuring: a traditional beer and cider tent with craft beers, seasonal brews, and artisan ciders; German-style food (bratwurst, schnitzel, oversized pretzels, cider-infused sausages); live oompah bands and Bavarian folk dancers; a live DJ; and on-stage challenges and giveaways." },
  { q: "Where is the Sausage & Cider Festival in Southport?", a: "Victoria Park, Rotten Row, Southport. Postcode PR8 2BZ. Victoria Park is on the eastern edge of Southport town centre, approximately 15 minutes' walk from Southport railway station." },
  { q: "Which session should I go to, afternoon or evening?", a: "The afternoon session (1–5pm) is generally better for families and those who want a more relaxed experience. The evening session (5–10pm) tends to have a livelier atmosphere. Both include the full food and drink offer, live music, and entertainment." },
  { q: "Is the Sausage & Cider Festival suitable for families?", a: "The afternoon session (1–5pm) is generally family-friendly. The evening session is more adult-oriented as the evening progresses. There is no specific age restriction but it's primarily an adult food and drink event. Check the event listing for the latest guidance." },
  { q: "How do I get to the Sausage & Cider Festival?", a: "Victoria Park is approximately 15 minutes' walk from Southport railway station (Merseyrail from Liverpool). Town centre car parks are a 10–15 minute walk from the park. Street parking is available on surrounding roads." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Sausage & Cider Festival Southport 2026",
  startDate: "2026-04-18",
  endDate: "2026-04-18",
  description: "Bavarian-style food and drink festival at Victoria Park, Southport. Saturday 18 April 2026.",
  url: `${BASE_URL}/guides/southport-sausage-cider-festival`,
  location: {
    "@type": "Place",
    name: "Victoria Park, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rotten Row",
      addressLocality: "Southport",
      postalCode: "PR8 2BZ",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Elite Events" },
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

export default function SausageCiderFestivalPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[75vh] flex items-end bg-[#2C1500] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-sausage-cider-festival.webp"
            alt="Sausage and Cider Festival at Victoria Park Southport — Bavarian food festival"
            fill sizes="100vw" quality={90} className="object-cover"
            style={{ objectPosition: "center 50%" }} priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1500] via-[#2C1500]/50 to-[#2C1500]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                18 April 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Victoria Park · PR8 2BZ · 1pm–10pm</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              Sausage &amp; Cider
              <span className="block text-[#C9A84C]">Festival Southport</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              Bavarian-style food and drink festival at Victoria Park. Bratwurst, artisan ciders,
              live oompah bands, and Bavarian folk dancers. Two sessions: afternoon and evening.
              Tickets required, no door sales.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://feverup.com/m/99142" target="_blank" rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">
                Buy Tickets →
              </a>
              <a href="#what" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                What&apos;s There
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts ── */}
      <div className="bg-[#2C1500] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: CalendarDays, value: "18 April", label: "When", sub: "Saturday 2026" },
              { icon: MapPin, value: "PR8 2BZ", label: "Where", sub: "Victoria Park, Southport" },
              { icon: Clock, value: "1pm–10pm", label: "Hours", sub: "Two sessions" },
              { icon: Ticket, value: "Ticketed", label: "Entry", sub: "Advance booking required" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Oktoberfest&apos;s Little Sister. In April</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                Victoria Park does food festivals well. The setting, the bandstand, the trees, the space,
                suits this kind of event better than a town square or a car park would. The Sausage &amp; Cider
                Festival is marketed as Oktoberfest in spring, which is an accurate description.
                Bratwurst, pretzels, steins, oompah music. It does exactly what it says.
              </p>
              <p>
                The food quality at these events varies, the honest answer is that you&apos;re getting festival food,
                not restaurant quality. But the cider selection tends to be better than average, there are usually
                a few good local producers in the mix, and the atmosphere on a warm April Saturday in the park
                is hard to beat. If it&apos;s raining, it&apos;s less fun. April in Lancashire, plan accordingly.
              </p>
              <p>
                Two sessions, afternoon and evening. The afternoon is better for families and for actually tasting
                things at a relaxed pace. The evening gets livelier. Book in advance; this does sell tickets.
              </p>
            </div>
          </div>
        </section>

        {/* ── What's There ── */}
        <section id="what" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">At the Festival</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s There</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🍺", title: "Beer & Cider Tent", detail: "A traditional beer and cider tent featuring craft beers, seasonal brews, lagers, and artisan ciders. Mix of German imports and local producers. The cider selection is usually the highlight, regional varieties you won't find in a supermarket." },
              { emoji: "🌭", title: "German Food", detail: "Bratwurst, schnitzel, oversized pretzels, and cider-infused sausages from artisan producers. Local sausage makers alongside the German staples. Festival food, honestly, but good festival food." },
              { emoji: "🎺", title: "Live Oompah Bands", detail: "Traditional Bavarian oompah bands throughout the day. Not just background noise, these are proper live performances with an eye on the crowd. Bavarian folk dancers are part of the entertainment programme too." },
              { emoji: "🎧", title: "Live DJ", detail: "A live DJ runs alongside the oompah entertainment, not at the same time, but across the day's programme. On-stage challenges and giveaways, crowd participation. The evening session skews toward this end of the programme." },
              { emoji: "🌳", title: "Victoria Park Setting", detail: "The festival takes place in Victoria Park. Southport's main public park near the town centre. The bandstand, mature trees, and open space make it a genuinely pleasant setting on a good day. Easy to walk around and explore." },
              { emoji: "📅", title: "Two Sessions", detail: "Afternoon: 1pm–5pm. Evening: 5pm–10pm. Each session is separately ticketed. You book the session you want. The afternoon is more family-oriented; the evening session tends to be livelier and more adult in atmosphere." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sessions ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Choosing Your Session</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Afternoon vs Evening</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-amber-500 px-6 py-4">
                <p className="text-white font-black text-lg">Afternoon Session</p>
                <p className="text-white/80 text-sm">1:00pm – 5:00pm</p>
              </div>
              <div className="p-6 space-y-3">
                {[
                  "More relaxed pace, time to browse and actually taste things",
                  "Better for families with children",
                  "Usually the better session for food quality and queuing",
                  "Oompah bands tend to dominate the programme",
                  "Ends at 5pm, easy to continue into the evening in town",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-amber-800 px-6 py-4">
                <p className="text-white font-black text-lg">Evening Session</p>
                <p className="text-white/80 text-sm">5:00pm – 10:00pm</p>
              </div>
              <div className="p-6 space-y-3">
                {[
                  "Livelier atmosphere as the evening progresses",
                  "DJ and on-stage challenges more prominent",
                  "More adult-oriented from 7pm onwards",
                  "Slightly less crowded at the food stalls in early evening",
                  "Runs until 10pm, good for a longer event night out",
                ].map((line) => (
                  <div key={line} className="flex gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Practical ── */}
        <section id="practical" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Getting There &amp; Tickets</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: MapPin, title: "Venue & Getting There", items: ["Victoria Park, Rotten Row, Southport. Postcode PR8 2BZ", "10–15 min walk from Southport town centre", "15 min walk from Southport railway station (Merseyrail from Liverpool)", "Town centre car parks: 10–15 min walk from the park entrance", "Street parking available on surrounding residential roads"] },
              { icon: Utensils, title: "Food & Drink Tips", items: ["Card payments accepted at most stalls", "Bring cash as backup, some traders prefer it", "April weather is unpredictable, bring a light jacket", "Eat before if you're not a fan of festival food prices", "The cider selection is usually the strongest part of the offering"] },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                <div className="space-y-2">
                  {item.items.map((line) => (
                    <div key={line} className="flex gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span>{line}</span>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Sausage &amp; Cider Festival. FAQs</h2>
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

        {/* ── CTA ── */}
        <section className="bg-[#2C1500] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Sausage &amp; Cider Festival · 18 April 2026</p>
          <h2 className="font-display text-3xl font-bold mb-4">Book Your Session</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
            Afternoon (1–5pm) or Evening (5–10pm). Both sessions ticketed. No door sales.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://feverup.com/m/99142" target="_blank" rel="noopener noreferrer"
              className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">
              Buy Tickets
            </a>
            <Link href="/guides/southport-year-of-culture-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
              More 2026 Events →
            </Link>
          </div>
        </section>

        {/* ── Other Events ── */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">More Southport Events in 2026</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Southport 2026: Elegantly Eccentric", month: "Year-round", desc: "Cristal Palace, Big Top Festival, Books Alive!. Southport's year of culture.", href: "/guides/southport-year-of-culture-2026" },
                { name: "Flower Show", month: "20–23 August 2026", desc: "One of England's most prestigious horticultural shows. Victoria Park.", href: "/guides/southport-flower-show" },
                { name: "Full Events Calendar", month: "All of 2026", desc: "10+ major Southport events across the year.", href: "/events" },
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
