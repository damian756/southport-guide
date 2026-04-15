import Link from "next/link";
import Image from "next/image";
import { MapPin, Train, Car, Heart, CheckCircle, AlertTriangle, Users, Flower2, ArrowRight, Clock, Phone } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("the-open-2026-accessibility");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "The Open 2026 accessibility, Royal Birkdale disabled access, The Open hidden disability, sunflower lanyard Open Championship, Open 2026 sensory zone, wheelchair access Royal Birkdale, The Open 2026 accessibility guide",
  alternates: { canonical: `${BASE_URL}/guides/the-open-2026-accessibility` },
  openGraph: {
    title: GUIDE.metaTitle ?? GUIDE.title,
    description: GUIDE.metaDescription ?? GUIDE.description,
    url: `${BASE_URL}/guides/the-open-2026-accessibility`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/open-2026.webp` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Open 2026 Accessibility Guide — Hidden Disabilities, Wheelchair Access & Sensory Zones",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/the-open-2026-accessibility`,
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
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
      name: "Is the Sunflower lanyard recognised at The Open 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The R&A's official 2026 accessibility guide explicitly recommends the Hidden Disabilities Sunflower scheme. Staff at Royal Birkdale will be trained to recognise the lanyard and offer additional support where needed. Lanyards are available free at Southport train station and from hiddendisabilitiesstore.com — no proof of disability required.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a sensory zone at The Open 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A dedicated sensory zone is located at Spectator Village 4, specifically designed for visitors with autism or sensory processing disorders. It provides a calm, quieter space away from the main crowd areas. Contact the R&A at accessibility@randa.org if you need detailed information about the zone ahead of your visit.",
      },
    },
    {
      "@type": "Question",
      name: "What wheelchair access is available at The Open 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Royal Birkdale has designated accessible viewing areas across the course. Shuttle buses operate with accessible vehicles. Designated disabled parking is available. The R&A accessibility team can be contacted at accessibility@randa.org for specific requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get accessible accommodation near Royal Birkdale for The Open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accommodation is extremely limited for The Open 2026 — most central Southport hotels are already at capacity. For accessible accommodation, contact hotels directly to discuss specific requirements. The Vincent Hotel (PR9 0AU) and The Bold Hotel (PR9 0AU) on Lord Street are both within a short accessible journey of Royal Birkdale. Birkdale village itself has accommodation within walking distance of the course.",
      },
    },
    {
      "@type": "Question",
      name: "What transport is available for disabled visitors to The Open 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Merseyrail trains to Southport are accessible and run frequent services from Liverpool. Accessible shuttle buses operate from designated park-and-ride sites and Southport town centre to Royal Birkdale. Designated disabled parking is available on-site. Contact the R&A at accessibility@randa.org for pre-arranged accessible transport details.",
      },
    },
  ],
};

const SENSORY_TIPS = [
  {
    icon: MapPin,
    title: "Sensory Zone at Spectator Village 4",
    body: "The R&A has designated a sensory zone at Spectator Village 4 specifically for visitors with autism or sensory processing disorders. This is a quieter, calmer area away from the main crowd concentrations. Make a note of where it is on arrival — it is your base if things get overwhelming.",
  },
  {
    icon: Flower2,
    title: "Sunflower lanyard is recognised",
    body: "Wear your Sunflower lanyard. The R&A's own accessibility guide recommends the scheme and staff will have been briefed. It means you can get additional support, extra time, or a quieter route without having to explain yourself. Lanyards are free at Southport station or from hiddendisabilitiesstore.com.",
  },
  {
    icon: Clock,
    title: "Go on a practice day if possible",
    body: "Practice days (Mon–Wed, 13–15 July) are significantly quieter than championship rounds. Crowds are smaller, queues are shorter, the atmosphere is more relaxed. If you have flexibility on dates, this is the right call for a low-sensory visit. You still get to see the world's best golfers at close range.",
  },
  {
    icon: Users,
    title: "Early morning is the quietest window",
    body: "On competition days, the course is most manageable in the first two hours after gates open. Crowds build through the day and peak in the afternoon. If noise and density are concerns, plan to arrive at gate opening and leave by midday.",
  },
  {
    icon: AlertTriangle,
    title: "Know the triggers",
    body: "The Open is a large outdoor event. Triggers include: crowd surges when big names tee off, PA announcements across the course, unexpected cheering and applause, slow-moving dense crowds in corridors between holes. Identifying which holes the crowd follows most will help you plan a quieter route.",
  },
  {
    icon: Heart,
    title: "You can self-pace around the course",
    body: "Unlike the grandstands, the course itself gives you freedom to move at your own pace. You are not locked into a seat. If you need to step back from a crowd, you can. The outer parts of the course, further from the scoreboard and main leaderboard areas, are consistently quieter.",
  },
];

const ACCESSIBLE_SOUTHPORT = [
  {
    name: "The Vincent Hotel",
    detail: "Lord Street, PR9 0AU. Southport's most central hotel — accessible rooms available, modern lift, close to town-centre transport links for shuttle buses.",
  },
  {
    name: "The Bold Hotel",
    detail: "Lord Street, PR9 0UA. Victorian hotel on the main boulevard. Accessible rooms. Within shuttle bus distance to Royal Birkdale.",
  },
  {
    name: "Southport Market (quiet hour)",
    detail: "Market Street. Runs a quiet hour on Saturday mornings, 9–10am. Lower music, no PA announcements. A practical stop for accessible dining if you are in town before or after the course.",
  },
  {
    name: "The Atkinson",
    detail: "Lord Street, PR8 1DB. Gallery, café, and theatre complex. Fully accessible with lift access. Quiet environment. Recognises the Sunflower lanyard. A good base for anyone who needs calm time mid-visit.",
  },
];

export default function OpenAccessibilityGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="bg-[#1B2E4B] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[60vh]">
          {/* Image panel */}
          <div className="relative min-h-[260px] sm:min-h-[340px] md:min-h-0 md:w-[45%] order-first md:order-last">
            <Image
              src="/images/open-2026.webp"
              alt="Royal Birkdale Golf Club — host of The Open Championship 2026"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            {/* Sunflower badge overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 flex items-center gap-2 shadow-lg">
              <Image
                src="/images/sunflower/PROUD-To-SUPPORT-UK_2.webp"
                alt="Hidden Disabilities Sunflower — Proud to Support"
                width={36}
                height={36}
                className="object-contain"
              />
              <div>
                <p className="text-[#1B2E4B] text-[10px] font-black uppercase tracking-wider leading-none">Sunflower</p>
                <p className="text-[#1B2E4B]/60 text-[9px] leading-none mt-0.5">Member</p>
              </div>
            </div>
          </div>

          {/* Text panel */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                12–19 July 2026
              </span>
              <span className="text-white/50 text-sm font-medium">Royal Birkdale · Southport</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              The Open 2026
              <span className="block text-[#C9A84C] text-3xl md:text-4xl mt-2">Accessibility Guide</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mb-8 leading-relaxed">
              Hidden disabilities, wheelchair access, the sensory zone at Spectator Village 4, accessible accommodation,
              and practical advice for visiting Royal Birkdale with a non-visible disability.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#sensory"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Sensory zone and tips
              </a>
              <a
                href="#transport"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Transport & parking
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Facts Bar ── */}
      <div className="bg-[#1B2E4B] border-t border-white/10 text-white">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: Flower2, value: "Sunflower", label: "Lanyard recognised", sub: "R&A confirmed" },
              { icon: MapPin, value: "SV4", label: "Sensory zone", sub: "Spectator Village 4" },
              { icon: Heart, value: "Free", label: "Carers ticket", sub: "With paying guest" },
              { icon: Phone, value: "accessibility", label: "R&A contact", sub: "@randa.org" },
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
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Nobody Else Has Written This Yet</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>
                I have a 17-year-old autistic son. He attends Southport College. I have been thinking about The Open
                since the fixture was confirmed, not just as a sporting event, but as something that is going to bring
                hundreds of thousands of people to this town, some of whom will have hidden disabilities, and will want
                to know whether they can manage it.
              </p>
              <p>
                The R&A has published an official accessibility guide. It is useful. It covers wheelchair access,
                accessible viewing areas, and it explicitly recommends the Sunflower lanyard. There is a sensory zone
                at Spectator Village 4. That is more than most major events offer, and it is genuinely encouraging.
              </p>
              <p>
                What the official guide does not cover is everything outside the course gates. Accessible accommodation
                in a town where most hotels are already booked. Sensory-friendly places to eat when you need a break.
                What to do if you are overwhelmed. Which parts of the course are quieter. Which days are less intense.
                That is what this guide is for.
              </p>
              <p>
                SouthportGuide is a member of the Hidden Disabilities Sunflower scheme. This guide exists because it
                should exist. If it helps one family plan a visit they would otherwise have written off, that is the point.
              </p>
            </div>
          </div>
        </section>

        {/* ── The Official Accessibility Provision ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Official Provision</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What the R&amp;A Provides</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Based on the R&amp;A&apos;s published accessibility guide for The Open 2026 at Royal Birkdale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                emoji: "♿",
                title: "Designated wheelchair viewing",
                detail: "Accessible viewing areas are located across the course at key holes, with hard-standing surfaces and clear sightlines. Companion space is included.",
              },
              {
                emoji: "🌻",
                title: "Sunflower lanyard recognised",
                detail: "The R&A's guide explicitly recommends the Hidden Disabilities Sunflower scheme. Staff at Royal Birkdale are briefed to recognise the lanyard and offer support.",
              },
              {
                emoji: "🧠",
                title: "Sensory zone at Spectator Village 4",
                detail: "A dedicated quiet space for visitors with autism or sensory processing disorders. Designed as a calmer area away from the main crowd and PA noise.",
              },
              {
                emoji: "🎫",
                title: "Carer ticket provision",
                detail: "Carers accompanying a disabled guest can access a complimentary ticket. Contact the R&A ticketing team directly — this is not available through the standard booking flow.",
              },
              {
                emoji: "🚌",
                title: "Accessible shuttle buses",
                detail: "Shuttle services from park-and-ride sites and Southport town centre include accessible vehicles. Designated accessible boarding points at Birkdale.",
              },
              {
                emoji: "🅿️",
                title: "Designated disabled parking",
                detail: "On-site disabled parking is available with a valid blue badge. Pre-registration is required. Contact accessibility@randa.org for the application process.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="text-2xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-4">
            <div className="text-xl flex-none">📧</div>
            <div>
              <p className="font-bold text-blue-900 text-sm mb-1">R&A Accessibility Contact</p>
              <p className="text-blue-800 text-sm leading-relaxed">
                For specific accessibility requirements, pre-arranged support, carer tickets, or disabled parking
                applications: <a href="mailto:accessibility@randa.org" className="font-semibold underline">accessibility@randa.org</a>.
                Contact them as early as possible. Do not leave this until July.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sensory Tips ── */}
        <section id="sensory">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Practical Advice</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Planning a Low-Sensory Visit</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              The Open is one of the biggest sporting events in the UK. It is manageable with the right preparation.
              These are the things that actually help.
            </p>
          </div>

          <div className="space-y-4">
            {SENSORY_TIPS.map((tip) => (
              <div key={tip.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
                <div className="flex-none">
                  <tip.icon className="w-5 h-5 text-[#C9A84C] mt-0.5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2E4B] text-base mb-1.5">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What the official guide doesn't cover ── */}
        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Beyond the Course</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Accessible Southport During Open Week</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Southport will be at its busiest during Open week: 12–19 July. Here are the most accessible options
              for accommodation, food, and quiet time outside the course.
            </p>
          </div>

          <div className="space-y-4">
            {ACCESSIBLE_SOUTHPORT.map((item) => (
              <div key={item.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-[#1B2E4B] text-base mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Transport ── */}
        <section id="transport">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Accessible Transport to Royal Birkdale</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex gap-4">
              <Train className="w-5 h-5 text-green-700 flex-none mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 text-base mb-1.5">Train (recommended)</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  Merseyrail from Liverpool Central to Southport is step-free and fully accessible. Birkdale station
                  is the nearest stop to Royal Birkdale, approximately a 12-minute walk from the course entrance.
                  Southport station is served by more frequent services and shuttle buses operate to the course.
                  Trains run frequently throughout the day during Open week.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
              <Car className="w-5 h-5 text-[#1B2E4B] flex-none mt-0.5" />
              <div>
                <h3 className="font-bold text-[#1B2E4B] text-base mb-1.5">Driving and disabled parking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  General parking around Royal Birkdale is extremely limited during Open week. Designated disabled
                  parking with a blue badge requires pre-registration with the R&A. Contact{" "}
                  <a href="mailto:accessibility@randa.org" className="font-semibold text-[#1B2E4B] underline">
                    accessibility@randa.org
                  </a>{" "}
                  as early as possible. Do not assume you can turn up with a blue badge and park on-site.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4">
              <MapPin className="w-5 h-5 text-[#1B2E4B] flex-none mt-0.5" />
              <div>
                <h3 className="font-bold text-[#1B2E4B] text-base mb-1.5">Shuttle buses from Southport</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Accessible shuttle buses operate from Southport town centre and park-and-ride sites to Royal Birkdale
                  throughout Open week. Routes, pick-up points, and frequency will be confirmed by Sefton Council
                  ahead of the event. Check the official Open website closer to the date for confirmed shuttle details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What to do if overwhelmed ── */}
        <section>
          <div className="bg-[#1C3A20] text-white rounded-2xl p-8 md:p-10">
            <Flower2 className="w-8 h-8 text-[#C9A84C] mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              If things get too much
            </h2>
            <div className="space-y-3 text-white/80 text-sm leading-relaxed">
              <p>
                The sensory zone at Spectator Village 4 is your first option on the course. Know where it is
                before you need it.
              </p>
              <p>
                St John Ambulance are on-site throughout the event and are trained to support visitors who are
                overwhelmed or in distress. Any marshal can direct you to first aid if needed.
              </p>
              <p>
                If you need to exit the course entirely, Birkdale village (a short walk from the course exits) is
                quieter than Southport town centre during peak Open week. There are cafes and green space nearby.
              </p>
              <p>
                Your Sunflower lanyard means any member of staff can discreetly direct you to quieter areas or
                accessible exits without you needing to explain your situation.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:accessibility@randa.org"
                className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1B2E4B] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#E8C87A] transition-colors"
              >
                accessibility@randa.org
              </a>
              <Link
                href="/guides/autism-friendly-southport"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors"
              >
                Autism-friendly Southport guide
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faq">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">FAQs</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ_LD.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Cross-links ── */}
        <section className="grid sm:grid-cols-2 gap-5">
          <Link
            href="/guides/southportguide-sunflower-member"
            className="group bg-[#1C3A20] text-white rounded-2xl p-6 hover:bg-[#243d2a] transition-colors"
          >
            <Flower2 className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Sunflower membership</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              SouthportGuide is a Sunflower member. Our accessibility commitments and how we are working
              to make Southport more inclusive.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link
            href="/guides/autism-friendly-southport"
            className="group bg-[#1B2E4B] text-white rounded-2xl p-6 hover:bg-[#243d63] transition-colors"
          >
            <Heart className="w-6 h-6 text-[#C9A84C] mb-3" />
            <h3 className="font-bold text-white text-base mb-1.5">Autism and sensory-friendly Southport</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-3">
              The eight calmest venues in Southport, honest event guidance, and practical advice for visitors
              with autism and sensory processing differences.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
          <Link
            href="/the-open-2026"
            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#C9A84C]/50 hover:shadow-sm transition-all sm:col-span-2"
          >
            <h3 className="font-bold text-[#1B2E4B] text-base mb-1.5">Full Open 2026 guide</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The complete guide to The Open Championship 2026 at Royal Birkdale — tickets, accommodation,
              restaurants, transport, and everything else.
            </p>
            <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              The Open 2026 guide <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </section>

      </div>
    </GuideLayout>
  );
}
