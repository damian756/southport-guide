import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About SouthportGuide | Independent Local Guide to Southport",
  description:
    "SouthportGuide.co.uk is an independent visitor guide to Southport, published by Churchtown Media. Find out who we are, what we cover, and how we support local businesses.",
  alternates: { canonical: "https://www.southportguide.co.uk/about" },
  openGraph: {
    title: "About SouthportGuide.co.uk",
    description:
      "Independent visitor guide to Southport, published by Churchtown Media. Built by a local, powered by 20 years of web and SEO expertise.",
    url: "https://www.southportguide.co.uk/about",
    type: "website",
    siteName: "SouthportGuide.co.uk",
  },
};

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.southportguide.co.uk/#website",
    name: "SouthportGuide.co.uk",
    url: "https://www.southportguide.co.uk",
    description:
      "Independent visitor guide to Southport, restaurants, hotels, events, things to do, and everything visitors need.",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.southportguide.co.uk/#organization",
      name: "SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk",
      sameAs: ["https://www.instagram.com/southportguide/", "https://www.facebook.com/southportguide/"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.southportguide.co.uk/about#terry",
    name: "Terry",
    jobTitle: "Chief Editor, SouthportGuide.co.uk",
    description:
      "Editorial voice of SouthportGuide.co.uk, written from the perspective of a Southport local of over 40 years covering restaurants, hotels, events and everything visitors need to know.",
    worksFor: {
      "@type": "Organization",
      "@id": "https://www.southportguide.co.uk/#organization",
      name: "SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk",
    },
    url: "https://www.southportguide.co.uk/about",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.churchtownmedia.co.uk/about#founder",
    name: "Damian Roche",
    jobTitle: "Founder, Churchtown Media",
    url: "https://www.churchtownmedia.co.uk/about",
    sameAs: [
      "https://www.linkedin.com/in/damian-roche-7ba8293a5/",
      "https://find-and-update.company-information.service.gov.uk/company/16960442",
    ],
  },
];

const STATS = [
  { value: "1,103+", label: "Local businesses listed" },
  { value: "500+", label: "Southport postcode pages" },
  { value: "106", label: "Car parks verified and mapped" },
  { value: "68+", label: "Editorial guides and articles" },
  { value: "200k+", label: "Verified Google reviews indexed" },
  { value: "4,791", label: "Land Registry sales mapped" },
  { value: "Food hygiene ratings", label: "On every food business, from the FSA" },
  { value: "Crime, flood & broadband", label: "police.uk, Env Agency & Ofcom, by postcode" },
];

const DIFFERENTIATORS = [
  {
    icon: "🏗️",
    title: "Built to rank, not just exist",
    body: "Most local guides run on templates. SouthportGuide is built on Next.js 16 with structured schema, Core Web Vitals-optimised delivery, and technical SEO architecture from the ground up. The same approach used by national publishers, applied to a town that deserved it.",
  },
  {
    icon: "🕸️",
    title: "Part of a four-site network",
    body: "SouthportGuide is one of four interconnected editorial sites on the Sefton Coast. FormbyGuide, SeftonLinks, and SeftonCoastWildlife cross-link and share domain authority. A business listed here gains exposure across the whole network.",
  },
  {
    icon: "📊",
    title: "Data nobody else has",
    body: "500+ postcode pages. 106 car parks. Food hygiene ratings, crime data, flood zones, Ofsted ratings and broadband speeds, all integrated. No estate agent framing, no tourism board spin. Just the data, presented honestly.",
  },
];

const COVERS = [
  { label: "Restaurants and Cafes", desc: "Independent editorial and a full directory of places to eat and drink across Southport and Birkdale." },
  { label: "Hotels and Accommodation", desc: "Hotels, B&Bs, and self-catering, from budget to boutique. Includes Open 2026 availability notes." },
  { label: "Things To Do", desc: "Attractions, activities, nature, beaches and everything else to fill a day in Southport." },
  { label: "Events", desc: "What's on calendar, from the Flower Show to the Air Show to The Open Championship." },
  { label: "The Open 2026", desc: "The complete visitor hub for The Open Championship at Royal Birkdale, July 2026." },
  { label: "MLEC Guide", desc: "The Marine Lake Events Centre. What it is, what's planned, and what it means for the town." },
  { label: "House Prices by Postcode", desc: "Land Registry sold prices for every PR8 and PR9 postcode, enriched with schools, crime, flood risk and broadband. No estate agent spin." },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50">

        {/* Hero */}
        <div className="bg-[#1B2E4B] text-white py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">
              About SouthportGuide
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              An independent guide to Southport. Built by a local. Powered by 20 years of web expertise.
            </h1>
            <div className="space-y-4 text-white/75 text-lg leading-relaxed max-w-2xl">
              <p>
                SouthportGuide exists because Southport deserves a visitor guide that&apos;s actually useful. Not council copy. Not a tourism board template. Something honest, locally written, and built to last.
              </p>
              <p>
                We help visitors make confident decisions about where to eat, stay, park, and what to see. And we help local businesses reach the tourism audience that, until now, had no proper digital home to find them.
              </p>
              <p>
                The Open Championship returns to Royal Birkdale in July 2026. The Marine Lake Events Centre opens in 2027. Southport is entering its most significant period for visitor footfall in a generation. We&apos;re building the digital infrastructure to make the most of it.
              </p>
            </div>
          </div>
        </div>

        {/* Stat Bar */}
        <div className="bg-white border-b border-gray-100 py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
              What we&apos;ve built
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center px-2">
                  <p className="font-display font-bold text-2xl md:text-3xl text-[#C9A84C] leading-tight mb-1">
                    {value}
                  </p>
                  <p className="text-gray-500 text-xs leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-4 py-14 space-y-14">

          {/* Mission */}
          <section>
            <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#C9A84C] p-8">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">
                Building the digital infrastructure Southport deserves
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Southport has never had a visitor guide with real editorial depth. Tourism bodies produce brochure copy. TripAdvisor has no local knowledge. The council site answers different questions entirely. There was a gap, and it was a significant one for a town of Southport&apos;s size, history and potential.
              </p>
              <p className="text-gray-700 leading-relaxed">
                SouthportGuide is the answer to that gap. A guide with the data depth, editorial quality and technical foundation that a town hosting The Open Championship and opening a 4,000-capacity events venue actually needs. Not a site that exists for a single season. Something built to rank, built to last, and genuinely useful to the people who visit and the businesses who serve them.
              </p>
            </div>
          </section>

          {/* Who writes it — Terry */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Who writes it</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#1B2E4B] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A84C] font-display font-bold text-xl">T</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1B2E4B] text-lg">Terry, Chief Editor</p>
                  <p className="text-gray-500 text-sm">Southport local · 40+ years</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                SouthportGuide is written in the voice of Terry, a composite editorial persona built
                from genuine local knowledge, reader feedback, and decades of experience living in the
                town. Terry reflects the perspective of someone who has eaten in most of the
                restaurants, walked every part of the seafront, and knows which car parks fill up
                first on a summer Saturday.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The content is honest. If something isn&apos;t worth the journey, we say so. If
                somewhere is overpriced, we mention it. No paid editorial placements, no sponsored
                content disguised as a review. Businesses can pay for featured placement in
                listings (that&apos;s how the site stays free to use) but that has no influence on
                what gets written.
              </p>
              <div className="bg-[#FAF8F5] rounded-xl px-5 py-4 border border-[#E8E3D8]">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#1B2E4B]">A note on transparency:</span>{" "}
                  Terry is an editorial voice, not a named individual. The real person behind
                  SouthportGuide is Damian Roche, founder of Churchtown Media. See below.
                </p>
              </div>
            </div>
          </section>

          {/* Who publishes it — Damian */}
          <section id="damian">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Who publishes it</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/about/damian-marshside.png"
                    alt="Damian Roche, founder of Churchtown Media, at RSPB Marshside with his dog"
                    width={160}
                    height={160}
                    className="rounded-2xl object-cover w-36 h-36"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#1B2E4B] text-lg">Damian Roche</p>
                  <p className="text-gray-500 text-sm mb-3">
                    Founder,{" "}
                    <a
                      href="https://churchtownmedia.co.uk"
                      className="text-[#C9A84C] hover:underline font-medium"
                    >
                      Churchtown Media Ltd
                    </a>{" "}
                    (Company No. 16960442)
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Damian is a 20-year web and SEO professional based in Churchtown, Southport. He built SouthportGuide because he couldn&apos;t find a genuinely useful, editorially independent visitor guide to his own town. The Open Championship coming to Royal Birkdale in 2026 and the Marine Lake Events Centre opening in 2027 represent a once-in-a-generation opportunity for the town that deserved proper coverage.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    SouthportGuide is built on the same Next.js infrastructure Churchtown Media uses for commercial clients. Technically sound, fast-loading, and engineered to rank from day one. Not a template. Not a side project. A properly built publishing platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    SouthportGuide is part of the{" "}
                    <a
                      href="https://seftoncoast.network"
                      className="text-[#C9A84C] hover:underline font-medium"
                    >
                      Sefton Coast Network
                    </a>
                    . Four independent editorial guides covering Southport, Formby, links golf, and
                    coastal wildlife.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/damian-roche-7ba8293a5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors"
                  >
                    LinkedIn profile →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* What makes us different */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">What makes us different</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {DIFFERENTIATORS.map(({ icon, title, body }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <span className="text-3xl block mb-3">{icon}</span>
                  <p className="font-display font-bold text-[#1B2E4B] text-base mb-2">{title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What we cover */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">What we cover</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {COVERS.map(({ label, desc }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="font-semibold text-[#1B2E4B] mb-1">{label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* For local businesses */}
          <section>
            <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">
                For local businesses
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5 leading-snug">
                Your business, in front of visitors who are already looking
              </h2>
              <p className="text-white/75 leading-relaxed mb-4">
                Most local businesses are well known to their regulars. The harder problem is reaching the tourism audience: day trippers from Liverpool and Manchester, visitors planning their first trip to Southport, Open Championship attendees, future MLEC audiences. These are people actively searching for where to eat, where to stay, what to do. SouthportGuide is where they land.
              </p>
              <p className="text-white/75 leading-relaxed mb-8">
                Every Southport business can claim a free listing with full analytics, a weekly performance email, and complete control over their details. Upgrading to featured placement puts you at the top of your category. With The Open in July 2026 and MLEC opening in 2027, there has never been a better time to be properly visible online.
              </p>
              <div className="flex flex-wrap gap-4 mb-5">
                <Link
                  href="/claim-listing"
                  className="inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8C87A] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Claim your free listing →
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  See featured pricing →
                </Link>
              </div>
              <p className="text-white/40 text-sm">
                Already listed?{" "}
                <Link href="/dashboard" className="text-white/60 hover:text-white underline transition-colors">
                  Log in to your Business Hub →
                </Link>
              </p>
            </div>
          </section>

          {/* Collaborate and partner */}
          <section>
            <div className="bg-white rounded-2xl border border-gray-100 border-l-4 border-l-[#C9A84C] p-8">
              <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-3">Work with us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are independent, but we are not closed. If you are working on something that benefits Southport, we are open to the conversation.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">🎪</span>
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm mb-0.5">Event organisers</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      If you are running an event in Southport, we cover it properly. Reach out before you publish your programme and we will build a guide around it.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">📰</span>
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm mb-0.5">Journalists and media</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Editorial partnership, data on request, quotes and local context. We know Southport&apos;s numbers well and are happy to share what we know.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">🏛️</span>
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm mb-0.5">Councils, tourism bodies and public sector</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      We are independent and that will not change. But we are aligned on wanting Southport to succeed, and we are open to conversations about data sharing, co-promotion, and coverage.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">🤝</span>
                  <div>
                    <p className="font-semibold text-[#1B2E4B] text-sm mb-0.5">Advertising and commercial partnerships</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Sponsored content (clearly labelled), display advertising, and bespoke commercial arrangements. Particularly relevant around The Open 2026 and the MLEC launch.
                    </p>
                  </div>
                </li>
              </ul>
              <a
                href="mailto:hello@seftoncoast.network"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors"
              >
                Get in touch: hello@seftoncoast.network →
              </a>
            </div>
          </section>

          {/* Independence and transparency */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Independence and transparency</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                SouthportGuide is free to use and fully independent. No official body funds it. No council budget. It is funded by featured placement in the business directory. Businesses can pay for premium positioning in listings and categories. This is clearly disclosed on the site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Featured placement does not influence editorial content. A restaurant that pays for a featured listing does not get a better review. It gets better visibility in the directory. If anything is sponsored, it will be explicitly labelled as such.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may also earn affiliate commissions from some booking links. These are disclosed where they appear.
              </p>
            </div>
          </section>

          {/* Get in touch */}
          <section>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-5">Get in touch</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                To list your business, enquire about featured placement, or report anything that
                looks wrong, use the contact form or email us directly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#1B2E4B] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#C9A84C] transition-colors"
                >
                  Contact us
                </Link>
                <Link
                  href="/claim-listing"
                  className="inline-flex items-center justify-center border border-[#1B2E4B] text-[#1B2E4B] font-semibold px-6 py-3 rounded-xl hover:bg-[#1B2E4B] hover:text-white transition-colors"
                >
                  Claim your listing
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
