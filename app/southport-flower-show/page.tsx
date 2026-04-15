import Link from "next/link";
import Image from "next/image";
import { LATEROOMS } from "@/lib/affiliate-links";
import {
  MapPin,
  Car,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Ticket,
  Clock,
  Utensils,
  Star,
} from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Southport Flower Show 2026 | Tickets, Dates, Parking & What to Expect",
  description:
    "Southport Flower Show 2026. Victoria Park, August 2026. Tickets, what to see, parking, getting there, and advice from someone who&apos;s been more times than he&apos;d like to admit.",
  keywords:
    "Southport Flower Show 2026, Southport Flower Show tickets, Southport Flower Show dates, Southport Flower Show parking, Victoria Park Southport",
  alternates: { canonical: `${BASE_URL}/southport-flower-show` },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Southport Flower Show 2026 | Complete Guide",
    description:
      "One of England's most prestigious flower shows. Tickets, parking, what to wear, what to see, everything you need before you go.",
    url: `${BASE_URL}/southport-flower-show`,
    images: [{ url: `${BASE_URL}/images/southport-flower-show-hero.webp`, width: 1200, height: 630, alt: "The SFS flower letters at Southport Flower Show, decorated with sunflowers and blue hydrangeas" }],
  },
};

const FAQS = [
  {
    q: "When is the Southport Flower Show 2026?",
    a: "The Southport Flower Show 2026 is typically held in the third week of August. Exact dates for 2026 will be confirmed at southportflowershow.co.uk, check there for the official announcement. The show traditionally runs Thursday to Sunday over four days.",
  },
  {
    q: "Where is the Southport Flower Show?",
    a: "Victoria Park, Southport. The postcode is PR8 1RX. Victoria Park is a large public park on the eastern edge of Southport town centre, about 10 minutes' walk from Lord Street.",
  },
  {
    q: "How much are Southport Flower Show tickets?",
    a: "Early bird adult day tickets are £25 online. Children under 16 are free with a paying adult. The 4-day Patron Pass is £90 online. Afternoon Tea packages from £55 (includes entry). Book via Ticket Quarter at southportflowershow.co.uk.",
  },
  {
    q: "Is there parking at the Southport Flower Show?",
    a: "Victoria Park itself has limited parking. Most visitors use park-and-ride services that operate during the show, or park in town centre car parks and walk (approximately 10–15 minutes). The show organisers publish a full parking and transport guide each year, check southportflowershow.co.uk nearer the date.",
  },
  {
    q: "What is the best day to go to the Southport Flower Show?",
    a: "Thursday (opening day) is typically the least crowded. Sunday is often quieter in the afternoon when early visitors leave. Saturday is the busiest day, arrive early if attending on Saturday. Weekday tickets are usually cheaper and less crowded than the weekend.",
  },
  {
    q: "What should I wear to the Southport Flower Show?",
    a: "The show is outdoors and covers a large site, comfortable walking shoes are essential. August in Lancashire can be warm and sunny or cool and rainy (often both on the same day). Bring layers and a light waterproof. Sun cream in warm weather. Avoid heels on the grass.",
  },
  {
    q: "How do I get to the Southport Flower Show without a car?",
    a: "Train to Southport (Merseyrail Northern Line from Liverpool) then walk or take a short bus ride to Victoria Park, approximately 15–20 minutes on foot. Shuttle buses usually operate from the town centre. The show also publishes cycling routes from Southport station.",
  },
  {
    q: "What's at the Southport Flower Show?",
    a: "The show combines horticultural displays, show gardens, floral art competitions, a large food and drink market, shopping exhibitors (garden tools, accessories, gifts), demonstrations, and live entertainment. The champion flower and vegetable competitions are the heart of the event, the standard is extremely high.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "Southport Flower Show 2026",
  description: "One of England's most prestigious horticultural shows, held at Victoria Park, Southport, in August 2026.",
  url: `${BASE_URL}/southport-flower-show`,
  location: {
    "@type": "Place",
    name: "Victoria Park, Southport",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Victoria Park",
      addressLocality: "Southport",
      postalCode: "PR8 1RX",
      addressCountry: "GB",
    },
  },
  organizer: { "@type": "Organization", name: "Southport Flower Show" },
  offers: [
    { "@type": "Offer", name: "Adult Day Ticket (Early Bird)", price: "25.00", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://ticketquarter.co.uk/southportflowershow/Online/default.asp" },
    { "@type": "Offer", name: "Child (under 16)", price: "0.00", priceCurrency: "GBP", availability: "https://schema.org/InStock" },
    { "@type": "Offer", name: "4-Day Patron Pass", price: "90.00", priceCurrency: "GBP", availability: "https://schema.org/InStock", url: "https://ticketquarter.co.uk/southportflowershow/Online/default.asp" },
  ],
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Southport Flower Show", item: `${BASE_URL}/southport-flower-show` },
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

export default function SouthportFlowerShowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* ── Hero ── */}
        <div className="relative min-h-[75vh] flex items-end bg-[#1A4020] text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/southport-flower-show-hero.webp"
              alt="The SFS flower letters at Southport Flower Show, decorated with sunflowers and blue hydrangeas at Victoria Park"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
              style={{ objectPosition: '50% 12%' }}
              style={{ objectPosition: "center 60%" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A4020] via-[#1A4020]/55 to-[#1A4020]/15" />
          </div>
          <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  August 2026
                </span>
                <span className="text-white/50 text-sm font-medium">Victoria Park · Southport</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
                Southport
                <span className="block text-[#C9A84C]">Flower Show</span>
              </h1>
              <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
                One of England&apos;s most prestigious horticultural shows. Four days every August in Victoria Park.
                Show gardens, champion flowers, food market, and the kind of horticultural competition 
                that takes year-round preparation.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://ticketquarter.co.uk/southportflowershow/Online/default.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
                >
                  Buy Tickets from £25 →
                </a>
                <a href="#what-to-see" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">
                  What to Expect
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Facts ── */}
        <div className="bg-[#1A4020] text-white">
          <div className="container mx-auto px-4 max-w-7xl py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {[
                { icon: CalendarDays, value: "August 2026", label: "When", sub: "4 days, third week" },
                { icon: MapPin, value: "PR8 1RX", label: "Where", sub: "Victoria Park" },
                { icon: Ticket, value: "From £25", label: "Tickets", sub: "Book online" },
                { icon: Star, value: "Since 1924", label: "Heritage", sub: "100+ years of shows" },
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
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Flower Show, Honestly</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
                <p>
                  I&apos;ll be honest: I went to the Southport Flower Show for the first time under duress. My wife wanted to go, 
                  I went along, and within about twenty minutes I was completely absorbed by the competitive horticulture section 
                  and had completely forgotten that I&apos;d been reluctant. That&apos;s the show&apos;s trick. 
                  It looks like it&apos;s for gardeners, and then it turns out to be for everyone.
                </p>
                <p>
                  The show gardens are genuinely impressive, the same level of craft you&apos;d expect from Chelsea, 
                  in a park that Southport locals walk through every week without thinking about it. The competitive flower and 
                  vegetable classes are a revelation: the standard is extraordinary, the exhibitors have been preparing all year, 
                  and the judging takes it all completely seriously. A prize-winning onion here is taken as seriously as a prize-winning 
                  garden. Rightly.
                </p>
                <p>
                  The food market is also excellent, regional producers, proper food, not the usual show fare. 
                  And there&apos;s shopping for garden tools, accessories, plants, and gifts that tends to be better quality 
                  than you&apos;d find in a garden centre.
                </p>
                <p>
                  Go on a Thursday if you can, quieter, easier to move around, same show. Saturday is busy. 
                  Wear comfortable shoes. Bring something waterproof just in case.
                </p>
              </div>
            </div>
          </section>

          {/* ── What to See ── */}
          <section id="what-to-see" className="scroll-mt-28">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">At the Show</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What&apos;s There</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  emoji: "🌹",
                  title: "Show Gardens",
                  detail: "The centrepiece of the show. Full-scale designed gardens created specifically for the event, the same calibre of craft you&apos;d see at Chelsea or Hampton Court, in Victoria Park. The brief each year changes; some years are formal, some naturalistic, some contemporary.",
                },
                {
                  emoji: "🏆",
                  title: "Competitive Classes",
                  detail: "The heart of the show. Classes for flowers (roses, dahlias, sweet peas, chrysanthemums), vegetables (leeks, onions, potatoes, runner beans), floral art, and more. Exhibitors compete nationally. The standard is exceptional. The judging is serious. This is where the show&apos;s century of heritage lives.",
                },
                {
                  emoji: "🛍️",
                  title: "Show Shopping",
                  detail: "An enormous range of exhibitors selling tools, plants, garden accessories, gifts, and specialist items you won&apos;t find elsewhere. Much better quality than a garden centre sale. Allow a proper hour for browsing.",
                },
                {
                  emoji: "🍽️",
                  title: "Food Market",
                  detail: "Regional food and drink producers, street food, and specialist suppliers. Quality is consistently high. The food market has become one of the show&apos;s highlights in recent years, plan to eat lunch here rather than bringing a packed lunch.",
                },
                {
                  emoji: "🎭",
                  title: "Demonstrations",
                  detail: "Live demonstrations from horticultural experts, chefs, and craftspeople. Cooking on the show&apos;s outdoor stage, planting and growing workshops, and specialist talks throughout the day. Check the programme when you arrive.",
                },
                {
                  emoji: "🎵",
                  title: "Live Entertainment",
                  detail: "Music and performance throughout the site. The main entertainment stage runs from mid-morning to early evening. Family-oriented entertainment in a dedicated area. The atmosphere in the afternoon on a warm day is genuinely lovely.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.detail }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Day Breakdown ── */}
          <section>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Which Day?</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Choosing Your Day</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  day: "Thursday",
                  label: "Opening Day",
                  emoji: "⭐",
                  highlight: "Best for quiet browsing",
                  detail: "Opening day is almost always the least crowded. Everything is fresh, exhibitors are enthusiastic, and you can take your time in the competitive classes without a crowd in the way. First-timers: go on a Thursday.",
                  badge: "Recommended",
                  badgeColor: "bg-green-100 text-green-800",
                },
                {
                  day: "Friday",
                  label: "Mid-Show",
                  emoji: "🌸",
                  highlight: "Good balance",
                  detail: "Friday is busier than Thursday but not as hectic as the weekend. Good day for a relaxed visit. The food market is usually at its best Friday through Sunday.",
                  badge: "Good choice",
                  badgeColor: "bg-blue-100 text-blue-800",
                },
                {
                  day: "Saturday",
                  label: "Peak Day",
                  emoji: "🎉",
                  highlight: "Busiest, arrive early",
                  detail: "The most popular day by some margin. Atmosphere is excellent, entertainment is at its best, but the site is very busy. If Saturday is your only option: arrive at opening, head to the show gardens first (crowds build from mid-morning).",
                  badge: "Book early",
                  badgeColor: "bg-amber-100 text-amber-800",
                },
                {
                  day: "Sunday",
                  label: "Final Day",
                  emoji: "🌻",
                  highlight: "Quieter in afternoon",
                  detail: "Sunday morning can be busy, but the afternoon quietens as people drift away. Some exhibitors sell off plants and produce at reduced prices toward the end of the day. A good option if you can&apos;t make it Thursday or Friday.",
                  badge: "Bargains later",
                  badgeColor: "bg-purple-100 text-purple-800",
                },
              ].map((item) => (
                <div key={item.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mt-3 mb-1">{item.day}</h3>
                  <p className="text-[#C9A84C] text-xs font-semibold mb-3">{item.highlight}</p>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.detail }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Practical ── */}
          <section id="practical" className="scroll-mt-28">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Go</p>
              <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Practical Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: MapPin,
                  title: "Venue",
                  items: [
                    "Victoria Park, Southport, PR8 2LG",
                    "10–15 minute walk from Southport town centre",
                    "15 minute walk from Southport railway station",
                    "Follow show signage from town centre, well posted",
                  ],
                },
                {
                  icon: Car,
                  title: "Parking & Transport",
                  items: [
                    "Park-and-ride services operate during the show (check southportflowershow.co.uk for locations)",
                    "Town centre car parks: 10–15 min walk to Victoria Park",
                    "Train to Southport station (Merseyrail from Liverpool): 15 min walk",
                    "Cycling: cycle parking at the show. Southport is flat",
                  ],
                },
                {
                  icon: Ticket,
                  title: "Tickets",
                  items: [
                    "Adult day ticket: £25 early bird online. Children under 16 free.",
                    "4-day Patron Pass: £90 online only",
                    "Afternoon Tea + entry: from £55",
                    "VIP Experience: £120",
                    "Book via Ticket Quarter at southportflowershow.co.uk",
                  ],
                },
                {
                  icon: Clock,
                  title: "What to Bring",
                  items: [
                    "Comfortable walking shoes, the site is large and mostly grass",
                    "Light waterproof. August in Lancashire, always prepared",
                    "Sun cream for warm days",
                    "Cash and/or card, most exhibitors accept both",
                    "Bags for purchases, exhibitors often don&apos;t provide them",
                  ],
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
                  <item.icon className="w-6 h-6 text-[#C9A84C] mb-4" />
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">{item.title}</h3>
                  <div className="space-y-2">
                    {item.items.map((line) => (
                      <div key={line} className="flex gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                        <span dangerouslySetInnerHTML={{ __html: line }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Where to Eat & Stay ── */}
          <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Staying in Southport for the Flower Show</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <Utensils className="w-6 h-6 text-[#C9A84C] mb-3" />
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">Eating Out</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Show week in August is busy across Southport. If you&apos;re eating out in the evening, 
                    book in advance, particularly for Thursday and Saturday nights when the show is at full attendance. 
                    Lord Street has the widest restaurant choice (10 minutes from Victoria Park). 
                    Birkdale village is excellent for dinner and tends to be slightly less hectic than the town centre.
                  </p>
                  <Link
                    href="/restaurants"
                    className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
                  >
                    Restaurant Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <Star className="w-6 h-6 text-[#C9A84C] mb-3" />
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-3">Hotels &amp; Accommodation</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Flower Show week fills Southport&apos;s accommodation fast, particularly for Thursday and Friday nights. 
                    Book well ahead if you&apos;re planning to stay. Town centre hotels on Lord Street are the most convenient. 
                    Birkdale B&Bs are good value and well located.
                  </p>
                  <Link
                    href="/hotels"
                    className="inline-flex items-center gap-1.5 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
                  >
                    Hotels in Southport <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="scroll-mt-28">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Southport Flower Show. FAQs</h2>
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

          {/* ── Other Events ── */}
          <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Other Southport Events in 2026</h2>
              <p className="text-gray-600 text-sm mb-6">The Flower Show is one of ten major events in Southport&apos;s 2026 calendar.</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { event: "The Open Championship", month: "July 2026", desc: "Royal Birkdale. The 154th Open. Southport&apos;s biggest sporting event ever.", href: "/the-open-2026" },
                  { event: "Southport Air Show", month: "September 2026", desc: "Free. 100,000+ spectators. Southport beach. One of the UK&apos;s best air shows.", href: "/southport-air-show" },
                  { event: "Full Events Calendar", month: "All of 2026", desc: "Lightport, Comedy Festival, Food Festival, Fireworks Championship and more.", href: "/events" },
                ].map((item) => (
                  <Link key={item.event} href={item.href} className="group bg-[#FAF8F5] rounded-xl p-5 hover:bg-white hover:shadow-sm transition-all">
                    <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">{item.month}</p>
                    <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
                      {item.event} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[#1A4020] rounded-2xl p-8 md:p-12 text-center text-white">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Southport Flower Show 2026</p>
            <h2 className="font-display text-3xl font-bold mb-4">Book Your Tickets</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Tickets sell out for peak days, particularly Saturday. Book early through the official website 
              for the best prices and to avoid disappointment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.southportflowershow.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors"
              >
                Official Tickets, southportflowershow.co.uk
              </a>
              <Link href="/hotels" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">
                Find a Hotel →
              </Link>
              <a
                href={LATEROOMS.southport}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20"
              >
                Compare on LateRooms →
              </a>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
