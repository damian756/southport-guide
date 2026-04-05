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
      sameAs: ["https://www.instagram.com/southportguide/", "https://www.facebook.com/southportguide/", "https://x.com/SouthportGuide"],
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

const NUMBERED_STATS = [
  { value: "1,103+", label: "Local businesses listed" },
  { value: "500+", label: "Southport postcode pages" },
  { value: "106", label: "Car parks verified and mapped" },
  { value: "68+", label: "Editorial guides and articles" },
  { value: "200k+", label: "Verified Google reviews indexed" },
  { value: "4,791", label: "Land Registry sales mapped" },
];

const DATA_FEATURES = [
  "Food hygiene ratings on every food business",
  "Crime data by postcode from police.uk",
  "Flood zone mapping from the Environment Agency",
  "Broadband speeds from Ofcom per postcode",
  "Ofsted ratings for every local school",
];

const DIFFERENTIATORS = [
  {
    icon: "🏗️",
    title: "Built to rank, not just exist",
    body: "Most local guides run on templates. SouthportGuide is built on Next.js 16 with structured schema, Core Web Vitals-optimised delivery, and technical SEO from the ground up. The same approach used by national publishers, applied to a town that deserved it.",
  },
  {
    icon: "🕸️",
    title: "Part of a four-site network",
    body: "SouthportGuide is one of four interconnected editorial sites on the Sefton Coast. FormbyGuide, SeftonLinks, and SeftonCoastWildlife cross-link and share domain authority. A business listed here gains exposure across the whole network.",
  },
  {
    icon: "📊",
    title: "Data nobody else has",
    body: "500+ postcode pages enriched with Land Registry sales, crime data, flood zones, Ofsted ratings and broadband speeds. No estate agent framing, no tourism board spin. Just the data, presented honestly.",
  },
];

const COVERS = [
  { label: "Restaurants and Cafes", desc: "Independent editorial and a full directory of places to eat and drink across Southport and Birkdale." },
  { label: "Hotels and Accommodation", desc: "Hotels, B&Bs, and self-catering from budget to boutique. Includes Open 2026 availability notes." },
  { label: "Things To Do", desc: "Attractions, activities, nature, beaches and everything else to fill a day in Southport." },
  { label: "Events", desc: "What's on calendar, from the Flower Show to the Air Show to The Open Championship." },
  { label: "The Open 2026", desc: "The complete visitor hub for The Open Championship at Royal Birkdale, July 2026." },
  { label: "MLEC Guide", desc: "The Marine Lake Events Centre. What it is, what's planned, and what it means for the town." },
  { label: "House Prices by Postcode", desc: "Land Registry sold prices enriched with schools, crime, flood risk and broadband. No estate agent spin." },
  { label: "Parking", desc: "106 car parks across Southport and the Sefton Coast, verified, mapped and described." },
];

const PARTNERS = [
  {
    icon: "🎪",
    title: "Event organisers",
    body: "If you are running an event in Southport, we cover it properly. Reach out before you publish your programme and we will build a guide around it.",
  },
  {
    icon: "📰",
    title: "Journalists and media",
    body: "Editorial partnership, data on request, quotes and local context. We know Southport's numbers well and are happy to share what we know.",
  },
  {
    icon: "🏛️",
    title: "Councils and public sector",
    body: "We are independent and that will not change. But we are aligned on wanting Southport to succeed and open to conversations about data, co-promotion and coverage.",
  },
  {
    icon: "🤝",
    title: "Commercial partnerships",
    body: "Sponsored content (clearly labelled), display advertising and bespoke arrangements. Particularly relevant around The Open 2026 and the MLEC launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#1B2E4B] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[75vh]">

            {/* Left: text */}
            <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-5">
                About SouthportGuide
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                Built by a local.<br />
                Powered by 20 years<br />
                of web expertise.
              </h1>
              <div className="space-y-5 text-white/70 text-lg leading-relaxed max-w-xl">
                <p>
                  SouthportGuide exists because Southport deserves a visitor guide that is actually useful. Not council copy. Not a tourism board template. Something honest, locally written, and built to last.
                </p>
                <p>
                  We help visitors make confident decisions about where to eat, stay, park, and what to see. And we help local businesses reach the tourism audience that, until now, had no proper digital home to find them.
                </p>
                <p>
                  The Open Championship returns to Royal Birkdale in July 2026. The Marine Lake Events Centre opens in 2027. Southport is entering its most significant period for visitor footfall in a generation. We are building the digital infrastructure to make the most of it.
                </p>
              </div>
            </div>

            {/* Right: photo */}
            <div className="relative hidden lg:block min-h-[500px]">
              <Image
                src="/southport-pier.webp"
                alt="Southport Pier at sunset"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2E4B]/50 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F1D30] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-12">
            What we have built
          </p>

          {/* Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-14">
            {NUMBERED_STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-3xl lg:text-4xl text-[#C9A84C] mb-2">{value}</p>
                <p className="text-white/50 text-xs leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Data features strip */}
          <div className="border-t border-white/10 pt-10">
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-6">
              Data no other Southport guide has
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {DATA_FEATURES.map((f) => (
                <span
                  key={f}
                  className="bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-2 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-6">Our mission</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2E4B] leading-tight mb-8">
            Building the digital infrastructure<br className="hidden sm:block" /> Southport deserves
          </h2>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
            <p>
              Southport has never had a visitor guide with real editorial depth. Tourism bodies produce brochure copy. TripAdvisor has no local knowledge. The council site answers different questions entirely.
            </p>
            <p>
              SouthportGuide is the answer to that gap. A guide with the data depth, editorial quality and technical foundation that a town hosting The Open Championship and opening a 4,000-capacity events venue actually needs. Not a site that exists for a single season. Something built to rank, built to last, and genuinely useful to the people who visit and the businesses who serve them.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-10 text-center">
            The people behind it
          </p>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* Terry */}
            <div className="bg-[#1B2E4B] rounded-3xl p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A84C] font-display font-bold text-2xl">T</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">Terry</p>
                  <p className="text-white/50 text-sm">Chief Editor · Southport local, 40+ years</p>
                </div>
              </div>
              <p className="text-white/75 leading-relaxed mb-4">
                SouthportGuide is written in the voice of Terry, a composite editorial persona built from genuine local knowledge, reader feedback, and decades of experience living in the town. Terry reflects the perspective of someone who has eaten in most of the restaurants, walked every part of the seafront, and knows which car parks fill up first on a summer Saturday.
              </p>
              <p className="text-white/75 leading-relaxed mb-6">
                The content is honest. If something is not worth the journey, we say so. If somewhere is overpriced, we mention it. No paid editorial placements. No sponsored content disguised as a review.
              </p>
              <div className="bg-white/10 rounded-2xl px-5 py-4 mt-auto">
                <p className="text-white/60 text-sm">
                  <span className="font-semibold text-white">A note on transparency:</span>{" "}
                  Terry is an editorial voice, not a named individual. The real person behind SouthportGuide is Damian Roche, founder of Churchtown Media.
                </p>
              </div>
            </div>

            {/* Damian */}
            <div className="bg-white rounded-3xl overflow-hidden flex flex-col">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src="/images/about/damian-marshside.png"
                  alt="Damian Roche, founder of Churchtown Media, at RSPB Marshside"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <div className="mb-5">
                  <p className="font-semibold text-[#1B2E4B] text-lg">Damian Roche</p>
                  <p className="text-gray-500 text-sm">
                    Founder,{" "}
                    <a href="https://churchtownmedia.co.uk" className="text-[#C9A84C] hover:underline font-medium">
                      Churchtown Media Ltd
                    </a>{" "}
                    (Co. No. 16960442)
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Damian is a 20-year web and SEO professional based in Churchtown, Southport. He built SouthportGuide because he could not find a genuinely useful, editorially independent visitor guide to his own town.
                </p>
                <p className="text-gray-600 leading-relaxed mb-3">
                  SouthportGuide is built on the same Next.js infrastructure Churchtown Media uses for commercial clients. Technically sound, fast-loading, and engineered to rank from day one. Not a template. A properly built publishing platform.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  SouthportGuide is part of the{" "}
                  <a href="https://seftoncoast.network" className="text-[#C9A84C] hover:underline font-medium">
                    Sefton Coast Network
                  </a>
                  . Four independent editorial guides covering Southport, Formby, links golf, and coastal wildlife.
                </p>
                <a
                  href="https://www.linkedin.com/in/damian-roche-7ba8293a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-6 text-sm font-bold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors"
                >
                  LinkedIn profile →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ──────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3 text-center">
            Why it works
          </p>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-12 text-center">
            What makes us different
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map(({ icon, title, body }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <span className="text-4xl block mb-5">{icon}</span>
                <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-12 text-center">
            What we cover
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COVERS.map(({ label, desc }) => (
              <div key={label} className="bg-white rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <p className="font-bold text-[#1B2E4B] mb-2">{label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR LOCAL BUSINESSES ─────────────────────────────────────────── */}
      <section className="bg-[#1B2E4B] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: pitch */}
            <div>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-5">
                For local businesses
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                Your business, in front of visitors who are already looking
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Most local businesses are well known to their regulars. The harder problem is reaching the tourism audience: day trippers from Liverpool and Manchester, visitors planning their first trip to Southport, Open Championship attendees, future MLEC audiences. These are people actively searching for where to eat, where to stay, what to do. SouthportGuide is where they land.
              </p>
              <p className="text-white/70 leading-relaxed mb-10">
                Every Southport business can claim a free listing with full analytics, a weekly performance email, and complete control over their details. With The Open in July 2026 and MLEC opening in 2027, there has never been a better time to be properly visible online.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link
                  href="/claim-listing"
                  className="inline-flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8C87A] text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
                >
                  Claim your free listing →
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
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

            {/* Right: benefit pillars */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: "📈", title: "Real analytics", body: "See who is viewing your listing, where they come from, and how they interact. Not vanity metrics. Numbers that matter." },
                { icon: "📬", title: "Weekly performance email", body: "Every week, a plain-English summary of your listing performance delivered to your inbox. No dashboard required." },
                { icon: "🏆", title: "Featured placement", body: "Upgrade to appear at the top of your category. Before your competitors. Before The Open brings 40,000 extra visitors to town." },
                { icon: "🕸️", title: "Network exposure", body: "Your listing is visible across the Sefton Coast Network, four sites with a combined local and tourism audience." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{title}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── WORK WITH US ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-3">Work with us</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We are independent, but we are not closed. If you are working on something that benefits Southport, we want to hear from you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {PARTNERS.map(({ icon, title, body }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <span className="text-3xl block mb-4">{icon}</span>
                <h3 className="font-bold text-[#1B2E4B] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="mailto:hello@seftoncoast.network"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#C9A84C] text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm"
            >
              Get in touch: hello@seftoncoast.network →
            </a>
          </div>
        </div>
      </section>

      {/* ── TRANSPARENCY + CONTACT ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

          {/* Independence and transparency */}
          <div className="bg-white rounded-3xl p-8 lg:p-10">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">
              Independence and transparency
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                SouthportGuide is free to use and fully independent. No official body funds it. No council budget. It is funded by featured placement in the business directory. Businesses can pay for premium positioning in listings and categories. This is clearly disclosed on the site.
              </p>
              <p>
                Featured placement does not influence editorial content. A restaurant that pays for a featured listing does not get a better review. It gets better visibility in the directory. If anything is sponsored, it is explicitly labelled.
              </p>
              <p>
                We may also earn affiliate commissions from some booking links. These are disclosed where they appear.
              </p>
            </div>
          </div>

          {/* Get in touch */}
          <div className="bg-[#1B2E4B] rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Get in touch</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                To list your business, enquire about featured placement, report anything that looks wrong, or discuss a partnership, use the contact form or email us directly.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                href="/contact"
                className="flex items-center justify-center bg-[#C9A84C] hover:bg-[#E8C87A] text-white font-bold px-6 py-3.5 rounded-xl transition-colors w-full"
              >
                Contact us →
              </Link>
              <Link
                href="/claim-listing"
                className="flex items-center justify-center border border-white/30 hover:border-white text-white font-semibold px-6 py-3.5 rounded-xl transition-colors w-full"
              >
                Claim your listing →
              </Link>
              <a
                href="mailto:hello@seftoncoast.network"
                className="flex items-center justify-center text-white/50 hover:text-white text-sm transition-colors py-2 w-full"
              >
                hello@seftoncoast.network
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
