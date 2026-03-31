import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("the-atkinson-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "The Atkinson Southport, Atkinson gallery Southport, things to do Southport rainy day, Lord Street Southport arts",
  alternates: { canonical: `${BASE_URL}/guides/the-atkinson-southport` },
  openGraph: {
    title: "The Atkinson Southport | Gallery, Theatre & Café on Lord Street",
    description: "The Atkinson on Lord Street is Southport's main arts and cultural centre — gallery, theatre, café, and library. Free gallery entry. The complete guide.",
    url: `${BASE_URL}/guides/the-atkinson-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/the-atkinson-southport.jpg` }],
  },
};

const FAQS = [
  { q: "What is The Atkinson in Southport?", a: "The Atkinson is Southport's main arts, culture, and heritage centre on Lord Street (PR8 1DB). It contains an art gallery with permanent and temporary exhibitions, a theatre that hosts professional touring productions and local companies, a café, and the Southport Library. Entry to the gallery is free." },
  { q: "Where is The Atkinson and what is the postcode?", a: "The Atkinson is at Lord Street, Southport, PR8 1DB. It is on the main boulevard of Lord Street, approximately 10 minutes' walk from Southport railway station. Parking is available at Tulketh Street multi-storey (PR8 1EW, 5 min walk) and Eastbank Street car park." },
  { q: "Is The Atkinson free to visit?", a: "The gallery is free to visit — no admission charge for the gallery floors and permanent collection. Some temporary exhibitions may have an entry charge but the majority are free. The café is open to all visitors. Theatre tickets must be purchased." },
  { q: "What is on at The Atkinson gallery?", a: "The Atkinson hosts rotating exhibitions including the annual Sefton Open (April–June), touring exhibitions, and its own permanent collection. The gallery covers fine art, ceramics, decorative arts, and local history collections. Check the Atkinson website for the current programme." },
  { q: "What theatre productions are at The Atkinson?", a: "The Atkinson hosts a regular programme of theatre including professional touring productions, local companies (SONG Productions, Southport Dramatic Club), comedy, music, and spoken word events. The main theatre and studio theatre have different capacities and produce different types of events. Book through the Atkinson box office." },
  { q: "Is The Atkinson dog friendly?", a: "Guide dogs and assistance dogs are welcome in The Atkinson. Pet dogs are generally not permitted inside the building, but the area around the building on Lord Street is accessible. The café does not admit dogs." },
  { q: "What are The Atkinson's opening times?", a: "The Atkinson is typically open Tuesday to Saturday, 10am to 5pm. The café and library have their own hours which may differ. Check the Atkinson website for current opening times as they change seasonally and around events." },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "CulturalOrganization",
  name: "The Atkinson",
  description: "Southport's main arts and cultural centre — gallery, theatre, café, and library on Lord Street.",
  url: `${BASE_URL}/guides/the-atkinson-southport`,
  image: `${BASE_URL}/images/guides/the-atkinson-southport.jpg`,
  address: { "@type": "PostalAddress", streetAddress: "Lord Street", addressLocality: "Southport", postalCode: "PR8 1DB", addressCountry: "GB" },
  telephone: "01704 533333",
  sameAs: ["https://www.theatkinson.co.uk"],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function TheAtkinsonPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="relative min-h-[75vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/guides/the-atkinson-southport.jpg" alt="The Atkinson Southport — gallery, theatre and café on Lord Street PR8 1DB" fill sizes="100vw" quality={90} className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B] via-[#1B2E4B]/50 to-[#1B2E4B]/10" />
        </div>
        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Southport Arts Centre</span>
              <span className="text-white/50 text-sm font-medium">Lord Street · PR8 1DB · Free Gallery Entry</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              The Atkinson
              <span className="block text-[#C9A84C]">Southport</span>
            </h1>
            <p className="text-white/75 text-xl max-w-2xl mb-8 leading-relaxed">Gallery, theatre, café, and library in a Victorian building on Lord Street. Free gallery entry. The cultural heart of Southport, and one of the best reasons to visit the town.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#whats-there" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors">What&apos;s Inside</a>
              <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20">Atkinson Website</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: MapPin, value: "PR8 1DB", label: "Where", sub: "Lord Street, Southport" },
              { icon: CalendarDays, value: "Tue–Sat", label: "Open", sub: "10am–5pm typically" },
              { icon: Clock, value: "Free", label: "Gallery Entry", sub: "No charge for gallery" },
              { icon: MapPin, value: "All Ages", label: "Who For", sub: "Family friendly" },
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
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 border-l-4 border-l-[#C9A84C]">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">The Atkinson Makes You Proud of Southport</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
              <p>I have been saying to visitors for years: if it is raining, go to The Atkinson. I have taken my kids there more times than I can count. But it deserves better than being on the rainy day list — it is genuinely good all the time. The gallery holds its own against much bigger institutions. The programme they put on is consistently interesting.</p>
              <p>The building itself is worth noting. It is a proper Victorian building that was refurbished properly — not cheaply, not half-heartedly. The gallery spaces work. The café is decent. The Southport Library is in there too if that is what you need. It is doing a lot of things under one roof and doing most of them well.</p>
              <p>The Sefton Open runs April to June — the annual open exhibition from local and regional artists. Make It! workshops run in the school holidays. Story and Rhyme Time for under-5s runs regularly. It is not just an art gallery: it is a working cultural venue that the town uses.</p>
            </div>
          </div>
        </section>

        <section id="whats-there" className="scroll-mt-28">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What&apos;s Inside</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">What to Find at The Atkinson</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🖼️", title: "The Gallery", detail: "Rotating exhibitions across multiple gallery floors plus a permanent collection. Covers fine art, ceramics, decorative arts, and local history. Free entry. Currently featuring the Sefton Open 2026 (2 Apr–13 Jun)." },
              { emoji: "🎭", title: "The Theatre", detail: "Main theatre and intimate studio theatre. Professional touring productions, local companies (SONG Productions, Southport Dramatic Club), comedy, and music. Book through the Atkinson box office." },
              { emoji: "☕", title: "The Café", detail: "Ground floor café serving coffee, light lunches, and cakes. Open to all visitors — you do not need to be visiting the gallery or theatre. Good for a break from Lord Street shopping." },
              { emoji: "📚", title: "Southport Library", detail: "The main Southport Library is housed within the Atkinson building. Free to use, good facilities. Worth knowing if you need reference resources or internet access." },
              { emoji: "🎨", title: "Make It! Workshops", detail: "Hands-on art and craft workshops for children and families, running regularly including in school holidays. Book through the Atkinson website — they fill up during peak periods." },
              { emoji: "🗓️", title: "Regular Events", detail: "Story and Rhyme Time (under-5s), drawing classes, evening talks, film screenings, and more. The full programme is on the Atkinson website and worth checking each month." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What&apos;s On Now</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Current Programme</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Link href="/guides/sefton-open-2026" className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">2 April – 13 June 2026</p>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-2">Sefton Open 2026 <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
              <p className="text-gray-600 text-sm leading-relaxed">Annual open art exhibition — painting, sculpture, print, and mixed media from local and regional artists. Free entry.</p>
            </Link>
            <Link href="/guides/whistle-down-the-wind-southport-2026" className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-2">9–11 April 2026</p>
              <h3 className="font-display font-bold text-[#1B2E4B] text-xl mb-2 group-hover:text-[#C9A84C] transition-colors flex items-center gap-2">Whistle Down the Wind <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
              <p className="text-gray-600 text-sm leading-relaxed">Andrew Lloyd Webber&apos;s musical by SONG Productions. Three nights in the theatre. Book in advance.</p>
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Before You Visit</p>
            <h2 className="font-display text-3xl font-bold text-[#1B2E4B]">Practical Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <MapPin className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Getting There &amp; Parking</h3>
              <div className="space-y-2">
                {["Lord Street, Southport, PR8 1DB", "10 min walk from Southport railway station", "Tulketh Street multi-storey, PR8 1EW — 5 min walk", "Eastbank Street car park, PR8 1DQ — 5 min walk", "Lord Street on-street parking — limited"].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <Clock className="w-6 h-6 text-[#C9A84C] mb-4" />
              <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-4">Opening Times</h3>
              <div className="space-y-2">
                {["Gallery: typically Tue–Sat, 10am–5pm", "Café: opens from 9:30am most days", "Library: check the Atkinson website for hours", "Theatre: evening and matinee performances vary", "Always check the Atkinson website before visiting"].map((l) => (
                  <div key={l} className="flex gap-2 text-sm text-gray-600"><ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" /><span>{l}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common Questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">The Atkinson Southport — FAQs</h2>
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

        <section className="bg-[#1B2E4B] rounded-2xl p-8 md:p-12 text-center text-white">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">The Atkinson · Lord Street · PR8 1DB</p>
          <h2 className="font-display text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Gallery entry is free. Check what is on before you visit — the programme changes monthly.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.theatkinson.co.uk" target="_blank" rel="noopener noreferrer" className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-8 py-3.5 rounded-full font-bold transition-colors">theatkinson.co.uk</a>
            <Link href="/guides/sefton-open-2026" className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors hover:bg-white/20">Sefton Open 2026 →</Link>
          </div>
        </section>
      </div>
    </GuideLayout>
  );
}
