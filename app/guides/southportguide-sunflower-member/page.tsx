import Link from "next/link";
import Image from "next/image";
import { Heart, Users, CheckCircle, ArrowRight, Building2, Flower2 } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southportguide-sunflower-member");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "hidden disabilities Southport, sunflower scheme Southport, sunflower lanyard Southport, accessibility Southport, hidden disability lanyard",
  alternates: { canonical: `${BASE_URL}/guides/southportguide-sunflower-member` },
  openGraph: {
    title: GUIDE.metaTitle ?? GUIDE.title,
    description: GUIDE.metaDescription ?? GUIDE.description,
    url: `${BASE_URL}/guides/southportguide-sunflower-member`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/sunflower/PROUD-To-SUPPORT-UK_2.webp` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: GUIDE.title,
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/southportguide-sunflower-member`,
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: {
    "@type": "Organization",
    name: "SouthportGuide.co.uk",
    url: BASE_URL,
  },
};

const COMMITMENTS = [
  {
    icon: Flower2,
    title: "Sensory-friendly event coverage",
    body: "Every event guide we write will now flag quiet hours, sensory zones, and the least-crowded access routes where they exist. Southport Market already runs a quiet hour on Saturday mornings. We're pushing for more venues and events to follow.",
  },
  {
    icon: CheckCircle,
    title: "Accessibility woven into every guide",
    body: "Our venue and area guides will carry sensory and accessibility information as standard — not buried in a footnote. Parking close to entrances, indoor vs outdoor noise levels, predictable layouts. The stuff that actually helps families plan.",
  },
  {
    icon: Building2,
    title: "Encouraging Southport businesses to register",
    body: "We'll be featuring Sunflower-registered businesses in our listings and making the case directly to venues and event organisers. Registration is free. The training is available online. There is no good reason not to.",
  },
];

const FAQS = [
  {
    q: "What is the Hidden Disabilities Sunflower scheme?",
    a: "The Hidden Disabilities Sunflower is a globally recognised scheme that allows people with non-visible disabilities to discreetly indicate to staff that they may need additional support, understanding, or more time. Wearing a sunflower lanyard, badge, or wristband signals this without the wearer having to explain or justify their disability.",
  },
  {
    q: "Where can I get a Sunflower lanyard in Southport?",
    a: "Sunflower lanyards are available free at Southport train station and a number of registered venues in the town centre. You can also order them directly from the Hidden Disabilities Sunflower website — they are free and no proof of disability is required.",
  },
  {
    q: "Which Southport venues recognise the Sunflower lanyard?",
    a: "Southport train station, The Atkinson on Lord Street, and a growing number of town centre businesses recognise the Sunflower lanyard. Awareness is still growing — it is worth contacting specific venues in advance for important visits. We are working to increase and document registered venues across the town.",
  },
  {
    q: "Does SouthportGuide have an autism-friendly visitor guide?",
    a: "Yes. Our autism and sensory-friendly Southport guide covers the eight calmest venues in the town, an honest events guide (including which events to avoid and which work well), practical tips on best visiting times, parking close to entrances, and the Sunflower scheme in Southport.",
  },
];

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function SunflowerMemberPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Split hero ── */}
      <div className="bg-[#1C3A20] text-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="flex flex-col md:flex-row md:min-h-[72vh]">

          {/* Badge */}
          <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-0 md:w-[42%] flex items-center justify-center bg-white order-first md:order-last p-10 md:p-16">
            <Image
              src="/images/sunflower/PROUD-To-SUPPORT-UK_2.webp"
              alt="Hidden Disabilities Sunflower — Proud to Support UK member badge"
              width={400}
              height={400}
              sizes="(max-width: 768px) 80vw, 42vw"
              className="object-contain w-full max-w-[320px] md:max-w-none"
              priority
            />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:pl-16 md:pr-12 order-last md:order-first">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Official Member
              </span>
              <span className="text-white/50 text-sm font-medium">Hidden Disabilities Sunflower</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              We&apos;ve joined
              <span className="block text-[#C9A84C]">the Sunflower</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">
              SouthportGuide is now a proud member of the Hidden Disabilities Sunflower scheme.
              Here&apos;s what that means, why it matters to us personally, and what we&apos;re committing to next.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#commitment"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                Our Commitment
              </a>
              <Link
                href="/guides/autism-friendly-southport"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Autism Friendly Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-[#1C3A20] text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Scheme founded", value: "2016" },
              { label: "UK member venues", value: "350,000+" },
              { label: "Lanyards issued", value: "Free" },
              { label: "Proof required", value: "None" },
            ].map(({ label, value }) => (
              <div key={label} className="px-6 py-4 text-center">
                <p className="text-white/50 text-[11px] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-4xl py-14 space-y-16">

        {/* Terry's Take */}
        <section>
          <div className="bg-[#1C3A20] rounded-2xl p-8 md:p-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">Why this one is personal</h2>
            <div className="space-y-4 text-white/75 leading-relaxed text-[15px]">
              <p>
                My eldest is 17. He&apos;s autistic, he&apos;s at Southport College, and he&apos;s one of the reasons this guide exists in the form it does.
                Not because I&apos;ve turned SouthportGuide into a personal project, but because having a kid with autism in this town
                makes you pay attention to things that most visitor guides completely ignore.
              </p>
              <p>
                Which events are genuinely manageable and which ones are a write-off. Which venues understand hidden disabilities
                and which ones look blank when you mention the Sunflower lanyard. Where you can park without a ten-minute walk
                through crowds. What &quot;sensory-friendly&quot; actually means in practice versus what venues put on a poster
                and never follow through on.
              </p>
              <p>
                The Hidden Disabilities Sunflower scheme is simple and it works. A green lanyard with a sunflower pattern,
                freely available, no paperwork, no proof required. Staff who recognise it know to offer a bit more time,
                patience, or help. That&apos;s it. The scheme has grown from one airport in 2016 to over 350,000 member
                venues and organisations across the UK. We should be part of it. So we joined.
              </p>
              <p>
                And we&apos;re not stopping at joining. There are three specific things we&apos;re committing to below.
              </p>
            </div>
          </div>
        </section>

        {/* What is the Sunflower scheme */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">What the Sunflower scheme is</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            The Hidden Disabilities Sunflower started at Gatwick Airport in 2016. The idea is deliberate in its simplicity:
            a green sunflower lanyard worn by a customer tells staff that the person may have a non-visible disability and may
            need a little extra time, understanding, or support.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            No explanation required. No proof. No paperwork. The lanyard does the communicating, quietly and on the wearer&apos;s terms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            Hidden disabilities include autism, ADHD, anxiety and panic disorders, chronic pain, Crohn&apos;s disease, hearing loss,
            visual impairments, epilepsy, and many others. Around one in five people in the UK has a disability. The large
            majority of those disabilities are invisible to someone watching from across the room.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            In Southport, the lanyard is currently recognised at the train station, The Atkinson on Lord Street, and a number
            of town-centre retailers. Awareness is growing. We are working to increase it.
          </p>
        </section>

        {/* Our commitment */}
        <section id="commitment">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-2">What we&apos;re committing to</h2>
          <p className="text-gray-500 mb-8">Three specific things, not vague intentions.</p>
          <div className="space-y-5">
            {COMMITMENTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-5">
                <div className="flex-none w-11 h-11 rounded-full bg-[#1C3A20] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2E4B] text-base mb-1">{title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Southport Market callout */}
        <section className="bg-[#1B2E4B] rounded-2xl p-7 md:p-9">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Already happening</p>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Southport Market quiet hour</h3>
              <p className="text-white/70 leading-relaxed text-[15px] mb-4">
                Southport Market on King Street runs a sensory-friendly hour on Saturday mornings — reduced music and lighting,
                staff briefed, a calm start to the day before the weekend crowds arrive. It is one of the better examples
                of what accessible retail looks like in practice. Our full guide covers the details.
              </p>
              <Link
                href="/guides/southport-market"
                className="inline-flex items-center gap-2 text-[#C9A84C] font-bold text-sm hover:text-[#e0ba66] transition-colors"
              >
                Southport Market guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Call to businesses */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">A note to Southport businesses</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            Registering with the Sunflower scheme is free. The training is available online and takes under an hour.
            The benefit to your customers is real, particularly families with autistic children, people with anxiety disorders,
            and anyone managing a condition they&apos;d rather not explain at a counter.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            We will be featuring Sunflower-registered businesses in our listings going forward. If your business or venue
            is registered or is in the process of registering, get in touch and we will make sure you are listed.
          </p>
          <div className="bg-[#FAF8F5] border border-[#C9A84C]/30 rounded-xl p-5 mt-6">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#C9A84C] flex-none mt-0.5" />
              <p className="text-[#1B2E4B] text-[15px] leading-relaxed font-medium">
                Register at{" "}
                <a
                  href="https://hiddendisabilitiesstore.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-[#C9A84C]/60 hover:decoration-[#C9A84C] transition-colors"
                >
                  hiddendisabilitiesstore.com
                </a>
                {" "}— free, no minimum commitment, training included.
              </p>
            </div>
          </div>
        </section>

        {/* How to get a lanyard */}
        <section>
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">How to get a Sunflower lanyard</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-[1.05rem]">
            Lanyards are available free of charge at Southport train station and a number of registered venues in the town centre.
            You can also order them directly from the Hidden Disabilities Sunflower website — delivery is free and you do not
            need to explain or prove your disability.
          </p>
          <p className="text-gray-700 leading-relaxed text-[1.05rem]">
            Wearing one is completely optional. The scheme works on trust: staff are trained to recognise the sunflower
            and respond accordingly. Nothing else is required from the wearer.
          </p>
        </section>

        {/* FAQs */}
        <section id="faq">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-7">Questions</h2>
          <div className="space-y-5">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#1B2E4B] text-base mb-2">{q}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA to autism guide */}
        <section className="bg-[#1C3A20] rounded-2xl p-7 md:p-9 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className="flex-1">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Keep exploring</p>
            <h3 className="font-display text-2xl font-bold text-white mb-2">Autism and sensory-friendly Southport</h3>
            <p className="text-white/70 text-[15px] leading-relaxed">
              Eight calm venues, an honest events guide, practical tips for visiting with hidden disabilities,
              and the straight picture of what works in this town.
            </p>
          </div>
          <Link
            href="/guides/autism-friendly-southport"
            className="flex-none bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
          >
            Read the guide →
          </Link>
        </section>

      </div>
    </GuideLayout>
  );
}
