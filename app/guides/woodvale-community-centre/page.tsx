import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Bus,
  Users,
  Heart,
  Accessibility,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Gift,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("woodvale-community-centre");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  alternates: { canonical: `${BASE_URL}/guides/woodvale-community-centre` },
  openGraph: {
    title: GUIDE.metaTitle,
    description: GUIDE.metaDescription,
    url: `${BASE_URL}/guides/woodvale-community-centre`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/woodvale-community-centre/woodvale-centre-front.webp` }],
  },
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Woodvale Community Centre (WACA) — Complete Guide",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/woodvale-community-centre`,
  datePublished: "2026-04-14",
  dateModified: "2026-04-14",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
  image: `${BASE_URL}/images/woodvale-community-centre/woodvale-centre-front.webp`,
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "CivicStructure",
  name: "Woodvale & Ainsdale Community Association (WACA)",
  alternateName: "Woodvale Community Centre",
  description:
    "A registered charity providing daytime, evening and school holiday activities for the Woodvale and Ainsdale communities of Southport.",
  url: "https://www.woodvalecommunitycentre.org",
  telephone: "01704 573084",
  email: "manager@woodvalecentre.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Meadow Lane",
    addressLocality: "Woodvale, Southport",
    addressRegion: "Merseyside",
    postalCode: "PR8 3RS",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/woodvalecommunitycentre",
    "https://twitter.com/woodvalecentre",
  ],
};

export default function WoodvaleCommunityPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
      />

      <div className="container mx-auto px-4 max-w-5xl py-10">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-lg" style={{ aspectRatio: "16/9" }}>
        <Image
          src="/images/woodvale-community-centre/woodvale-centre-front.webp"
          alt="Woodvale Community Centre on Meadow Lane, Woodvale, Southport"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 900px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-1">Registered Charity No. 1146522</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Woodvale Community Centre
          </h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">Meadow Lane, Woodvale, Southport · PR8 3RS</p>
        </div>
      </div>

      {/* ── Quick facts ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { icon: MapPin, label: "Two centres", sub: "Woodvale & Ainsdale" },
          { icon: Clock, label: "Mon–Thu", sub: "9am – 4pm office" },
          { icon: Phone, label: "01704 573084", sub: "Main office" },
          { icon: Accessibility, label: "DDA compliant", sub: "Both buildings" },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-[#F7F4EF] rounded-xl p-4 flex flex-col gap-1">
            <Icon className="w-5 h-5 text-[#1B2E4B] mb-1" />
            <p className="font-bold text-sm text-[#1B2E4B] leading-snug">{label}</p>
            <p className="text-xs text-gray-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Woodvale & Ainsdale Community Association — WACA — is one of those organisations that does genuinely important work without making much noise about it. They have been running community activities in this part of Southport since 1992. The community centre on Meadow Lane was purpose-built in 1999 after local residents persuaded the council to build it. The recreation centre on Orchard Lane came later. Between the two sites, they cover pretty much everything from chair-based fitness classes to youth sessions to school holiday programmes.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you live in Woodvale or Ainsdale and have not connected with WACA, it is worth knowing what they offer. If you are visiting and have family in the area, this is the kind of place that keeps a community working. Run as a registered charity, not commercially driven, staffed by people who care about the area. That comes through in everything they do.
        </p>
        <p className="text-xs text-gray-500 italic">
          Registered Charity No. 1146522 | Private Limited Company No. 7795806
        </p>
      </section>

      {/* ── The two centres ───────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Two Sites</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Two Centres</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main centre */}
          <div className="bg-[#1B2E4B] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center flex-none">
                <span className="text-[#1B2E4B] font-bold text-sm">1</span>
              </div>
              <h3 className="font-display text-xl font-bold">Woodvale Community Centre</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Meadow Lane, Woodvale</p>
                  <p className="text-white/70 text-xs">Southport, Merseyside, PR8 3RS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <p className="text-sm text-white/80">Main office, daytime classes, youth sessions, community hub</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <p className="text-sm text-white/80">Next door to Kings Meadow Primary School</p>
              </div>
              <a
                href="https://maps.google.com/?q=Meadow+Lane+Woodvale+Southport+PR8+3RS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold px-3 py-2 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5" />
                Get directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Rec centre */}
          <div className="bg-[#2d4a2e] rounded-2xl overflow-hidden text-white">
            <div className="relative w-full h-44">
              <Image
                src="/images/woodvale-community-centre/waca-recreation-centre.webp"
                alt="WACA Recreation Centre on Orchard Lane, Ainsdale, Southport"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center flex-none">
                <span className="text-[#1B2E4B] font-bold text-sm">2</span>
              </div>
              <h3 className="font-display text-xl font-bold">WACA Recreation Centre</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Off Orchard Lane, Ainsdale</p>
                  <p className="text-white/70 text-xs">Southport, Merseyside, PR8 3RG</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <p className="text-sm text-white/80">Activity and event spaces, recreation facilities, outdoor field access</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <p className="text-sm text-white/80">Adjacent to Sandbrook Park recreational grounds</p>
              </div>
              <a
                href="https://maps.google.com/?q=Orchard+Lane+Ainsdale+Southport+PR8+3RG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold px-3 py-2 rounded-full"
              >
                <MapPin className="w-3.5 h-3.5" />
                Get directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            </div>{/* /p-6 */}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 leading-relaxed">
          The two centres are within half a mile of each other. Both comply with DDA regulations. The main office for all enquiries is at Meadow Lane.
        </p>
      </section>

      {/* ── Activities ────────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What Goes On</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-4">Activities and Classes</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          WACA runs a full programme of daytime and evening activities. The timetable changes across the year — the activities below are those running currently, but contact the centre to confirm dates and book ahead where required.
        </p>

        <div className="space-y-4">
          {/* Chair Based Exercise */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-none">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-[#1B2E4B]">Chair Based Exercise</h3>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">Most popular</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  One of WACA's most popular classes. A bubbly, social session that improves mobility, balance and confidence. Booking is essential and must be made one week in advance. Teas and coffees after the class. Good for anyone looking to get moving in a friendly, no-pressure environment.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Booking essential — 01704 573084</p>
              </div>
            </div>
          </div>

          {/* Craft Group */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-none">
                <CalendarDays className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B2E4B] mb-1">Craft Group</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every Monday, 10:30am to 12:30pm. A sociable session — come for the crafting, stay for the chat and the cuppa. Booking essential; one week advance booking per session.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Every Monday · 10:30am–12:30pm · Booking required</p>
              </div>
            </div>
          </div>

          {/* Afternoon Lunch Club */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-none">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-[#1B2E4B]">Afternoon Lunch Club</h3>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A home-cooked meal, a chance to make new friends, and a relaxed social atmosphere. Run on the first Tuesday of each month. Booking is essential — call the centre in advance.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">1st Tuesday of the month · 12:30pm–1:30pm · Free · Booking required</p>
              </div>
            </div>
          </div>

          {/* Woodland Project */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-none">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-[#1B2E4B]">Woodland Project</h3>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hands-on volunteering in the local wooded area. Tasks include laying woodchip on paths, litter picks, and general maintenance. Good outdoor activity with a practical impact on the local environment.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">10am–12pm · Free</p>
              </div>
            </div>
          </div>

          {/* Community Café */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center flex-none">
                <CalendarDays className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-[#1B2E4B]">Community Café</h3>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Free</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A relaxed space for you, friends, and family. Hot drinks and mixed refreshments, no agenda, everyone welcome. A good one if you are new to the area or just want somewhere comfortable to come.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">12pm–1:30pm · Free · Everyone welcome</p>
              </div>
            </div>
          </div>

          {/* Course Sessions */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-none">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B2E4B] mb-1">Course Sessions</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Short courses and varied sessions for adults 18 and over. Subject to funding, so the programme changes — check WACA&apos;s Facebook page for the latest. Past courses have included Origami, Painting, Japanese Arts & Crafts, Cookery, and First Aid. Worth keeping an eye on.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Adults 18+ · 10am–12pm (times may vary) · See Facebook for current schedule</p>
              </div>
            </div>
          </div>

          {/* Youth Sessions */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-none">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B2E4B] mb-1">Youth Sessions</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Evening youth activities run on Mondays and Tuesdays from 5pm to 7pm. Activities, skills, and programmes for young people in the local area. For details of the current youth programme, contact the centre directly — the schedule changes across the year.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">Mon–Tue evenings · 5pm–7pm · Contact for current programme</p>
              </div>
            </div>
          </div>

          {/* Holiday Programmes */}
          <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center flex-none">
                <CalendarDays className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1B2E4B] mb-1">School Holiday Programmes</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  WACA runs activities during school holidays. Good for families in the Woodvale and Ainsdale area looking for structured, supervised activities during half terms and summer. Contact the centre ahead of each holiday period for the current programme.
                </p>
                <p className="text-xs text-gray-400 mt-2 font-medium">School holiday periods · Contact in advance for schedule</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-[#F7F4EF] rounded-xl p-4 flex items-start gap-3">
          <CalendarDays className="w-5 h-5 text-[#1B2E4B] flex-none mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            The full activity timetable is available on the WACA website. Sessions change across the year, so always confirm by phone or email before travelling.{" "}
            <a href="https://www.woodvalecommunitycentre.org/activities/" target="_blank" rel="noopener noreferrer" className="text-[#1B2E4B] font-semibold hover:underline inline-flex items-center gap-1">
              View timetable <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

      {/* ── Hire the space ────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Hire</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-4">Hire the Space</h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Both centres have flexible community spaces available for hire, subject to availability. If you are looking for a space for a community group, workshop, meeting, class, or event in the Woodvale or Ainsdale area, it is worth contacting WACA directly.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Meeting rooms and multi-use halls",
            "Activity and event spaces",
            "Space for classes and workshops",
            "Recreation facilities with outdoor field access",
            "Suitable for community groups of all sizes",
            "Flexible booking subject to availability",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Accessibility ─────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Access</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-4">Accessibility</h2>
        <p className="text-gray-700 leading-relaxed mb-5">
          Both WACA buildings comply with DDA (Disability Discrimination Act) regulations. If you have specific requirements, WACA are happy to discuss arrangements in advance.
        </p>
        <div className="bg-[#1B2E4B]/5 border border-[#1B2E4B]/15 rounded-2xl p-6 space-y-3">
          {[
            { icon: Accessibility, text: "Step-free access information available on request" },
            { icon: Users, text: "Assistance for visitors with additional needs" },
            { icon: Users, text: "Flexible use of spaces to accommodate access requirements" },
            { icon: Accessibility, text: "Disabled toilets at both centres" },
            { icon: Heart, text: "Baby changing facilities" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-[#1B2E4B] flex-none" />
              <span className="text-sm text-gray-700">{text}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          For detailed accessibility specifications (entrance layouts, toilet locations, disabled parking), contact WACA directly on 01704 573084 before your visit.
        </p>
      </section>

      {/* ── Getting there ─────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Getting There</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Parking and Transport</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-[#F7F4EF] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5 text-[#1B2E4B]" />
              <h3 className="font-bold text-[#1B2E4B]">By car</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Both sites have small car parks directly outside. Additional street parking is available in the surrounding residential roads.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1B2E4B] bg-white px-2 py-0.5 rounded border">PR8 3RS</span>
                <span className="text-xs text-gray-500">Woodvale Community Centre</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1B2E4B] bg-white px-2 py-0.5 rounded border">PR8 3RG</span>
                <span className="text-xs text-gray-500">WACA Recreation Centre</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F4EF] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Bus className="w-5 h-5 text-[#1B2E4B]" />
              <h3 className="font-bold text-[#1B2E4B]">By bus</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Both centres are accessible via local transport routes. Buses serving the area include:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Bus 44", "Bus 47", "Bus 49", "X2"].map((b) => (
                <span key={b} className="text-xs font-bold bg-[#1B2E4B] text-white px-3 py-1 rounded-full">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Contact</p>
        <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Get in Touch</h2>

        <div className="bg-[#1B2E4B] rounded-2xl p-6 md:p-8 text-white">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Telephone</p>
                  <a href="tel:01704573084" className="font-bold hover:text-[#C9A84C] transition-colors">
                    01704 573084
                  </a>
                  <p className="text-xs text-white/60 mt-0.5">Leave a message if no answer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:manager@woodvalecentre.co.uk" className="text-sm font-medium hover:text-[#C9A84C] transition-colors block">
                    manager@woodvalecentre.co.uk
                  </a>
                  <a href="mailto:admin@woodvalecentre.co.uk" className="text-sm font-medium hover:text-[#C9A84C] transition-colors block">
                    admin@woodvalecentre.co.uk
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Office Hours</p>
                  <p className="text-sm font-medium">Monday to Thursday, 9am – 4pm</p>
                  <p className="text-xs text-white/60 mt-1">Hours may vary. Mon–Tue also 5–7pm for youth sessions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">Main Office</p>
                  <p className="text-sm font-medium">Meadow Lane, Woodvale</p>
                  <p className="text-xs text-white/60">Southport, Merseyside, PR8 3RS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-6 pt-6 flex flex-wrap gap-3">
            <a
              href="https://www.woodvalecommunitycentre.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-4 py-2.5 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
              Website
            </a>
            <a
              href="https://www.facebook.com/woodvalecommunitycentre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-4 py-2.5 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
              Facebook
            </a>
            <a
              href="https://twitter.com/woodvalecentre"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold px-4 py-2.5 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
              X (Twitter)
            </a>
          </div>
        </div>
      </section>

      {/* ── Support the charity ───────────────────────────────────────────── */}
      <section className="mb-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-none">
              <Gift className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B2E4B] mb-2">Support WACA</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                WACA is a registered charity that relies on community support to keep its services running. One practical way to help is through their Amazon Wish List, which lists items the centres actually need. Any purchase goes directly to supporting the work they do in Woodvale and Ainsdale.
              </p>
              <a
                href="https://www.amazon.co.uk/hz/wishlist/ls/1N50BMHQRLYJH?ref_=wl_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full"
              >
                <Gift className="w-4 h-4" />
                View Amazon Wish List
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Terry's take ──────────────────────────────────────────────────── */}
      <section className="mb-10">
        <div className="border-l-4 border-[#C9A84C] pl-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
          <p className="text-gray-700 leading-relaxed mb-3">
            I have lived in Southport my whole life and places like WACA are easy to take for granted if you do not need them. But they matter more than most people realise. The Woodvale area has had real challenges over the years and WACA has been a constant presence. They opened in 1999 and they are still going, still running classes, still looking after young people on Monday and Tuesday evenings, still making sure there is somewhere for people to go.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Let&apos;s Get Digital sessions are worth flagging specifically. If you have an elderly relative in the area who is struggling with their phone or iPad, those Tuesday morning drop-ins are free, no-pressure, and run by people who actually want to help. That is harder to find than you might think.
          </p>
          <p className="mt-3 text-sm text-gray-500">Terry, Chief Editor — SouthportGuide</p>
        </div>
      </section>

      {/* ── Cross-links ───────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">More in Southport</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/guides/autism-friendly-southport", label: "Autism Friendly Southport", desc: "Sensory-friendly venues, quiet spaces and honest advice" },
            { href: "/guides/accessible-southport", label: "Accessible Southport", desc: "Wheelchair access, Sunflower venues and disability guide" },
            { href: "/blog/southport-with-kids-full-guide", label: "Southport with Kids", desc: "Family-tested guide to days out with children" },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group block bg-[#F7F4EF] hover:bg-[#1B2E4B] transition-colors rounded-2xl p-5"
            >
              <p className="font-bold text-[#1B2E4B] group-hover:text-white text-sm mb-1 transition-colors">{label}</p>
              <p className="text-xs text-gray-500 group-hover:text-white/70 transition-colors">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      </div>{/* /container */}
    </GuideLayout>
  );
}
