import Link from "next/link";
import Image from "next/image";
import { MapPin, Car, ChevronRight, ArrowRight, TreePine, Clock } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("churchtown");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "Churchtown Southport, Botanic Gardens Southport, Churchtown village, St Cuthbert's Church Southport, Hesketh Park Southport, things to do Churchtown",
  alternates: { canonical: `${BASE_URL}/guides/churchtown` },
  openGraph: {
    title: "Churchtown Southport | Botanic Gardens & Village Guide",
    description:
      "Churchtown is Southport's oldest district — Botanic Gardens, St Cuthbert's Church, Hesketh Park, and the independent shops most visitors never find.",
    url: `${BASE_URL}/guides/churchtown`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/categories/attractions.webp` }],
  },
};

const FAQS = [
  {
    q: "Where is Churchtown in Southport?",
    a: "Churchtown is a village district in the north of Southport, approximately 2 miles from the town centre. Postcode PR9 7NB is the centre of the village. It's easily reached by car or the 44 bus from Southport town centre.",
  },
  {
    q: "What is Churchtown known for?",
    a: "Churchtown is the oldest part of Southport — it was a settlement here long before modern Southport existed. It's known for the Botanic Gardens (free entry, café, beautiful Victorian glasshouses), St Cuthbert's Church (one of the oldest churches in Merseyside), Hesketh Park (Victorian park with boating lake), and a cluster of independent shops and pubs around the village centre.",
  },
  {
    q: "Are Churchtown Botanic Gardens free?",
    a: "Yes — entry to Churchtown Botanic Gardens is free. The gardens are open daily. There's a café inside the gardens and a small museum. The Victorian glasshouses are the highlight. Parking is available near the entrance.",
  },
  {
    q: "What is Hesketh Park like?",
    a: "Hesketh Park is a Victorian public park opened in 1868. It has a boating lake, formal gardens, a café, and a relaxed atmosphere. It's well-maintained and popular with families and dog walkers. Free to enter. Postcode: PR9 9NB.",
  },
  {
    q: "How do I get to Churchtown from Southport town centre?",
    a: "By bus: the 44 service runs from Southport town centre to Churchtown — about 15 minutes. By car: take the A570 northbound from the town centre and follow signs for Churchtown, approximately 10 minutes. There's on-street parking in the village and a car park near the Botanic Gardens.",
  },
  {
    q: "Is Churchtown worth visiting?",
    a: "Yes, particularly if you want to see a different side of Southport. Most visitors stay on Lord Street or the seafront. Churchtown is quieter, greener, and genuinely historic — the kind of place locals take pride in. Combine the Botanic Gardens with a walk around the village and lunch at one of the local pubs and you've got a very good half-day.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Churchtown Village, Southport",
  description:
    "Churchtown is the oldest part of Southport — a medieval village with Botanic Gardens, St Cuthbert's Church, Hesketh Park, and independent local shops.",
  url: `${BASE_URL}/guides/churchtown`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
  geo: { "@type": "GeoCoordinates", latitude: 53.6686, longitude: -2.9952 },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Churchtown, Southport",
    postalCode: "PR9 7NB",
    addressCountry: "GB",
  },
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

export default function ChurchtownGuidePage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[60vh] flex items-end bg-[#1A3020] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/categories/attractions.webp"
            alt="Churchtown, Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
            style={{ objectPosition: "center 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3020] via-[#1A3020]/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <TreePine className="w-4 h-4" />
            Areas Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Churchtown
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Southport&apos;s oldest village. Botanic Gardens with free entry, St Cuthbert&apos;s Church,
            Hesketh Park, and the parts of Southport most visitors never see.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Postcode: PR9 7NB</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-[#C9A84C]" />
              <span>Botanic Gardens: free entry, open daily</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick facts strip ── */}
      <div className="bg-[#1A3020] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Distance from town centre", value: "~2 miles" },
              { label: "Botanic Gardens entry", value: "Free" },
              { label: "Parking", value: "Free near gardens" },
              { label: "Bus from town", value: "No. 44 (~15 min)" },
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
      <div className="container mx-auto px-4 max-w-4xl py-14">

        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">What is Churchtown?</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Churchtown is the oldest part of Southport — a village that existed centuries before the rest of the town was built. While Southport developed as a Victorian seaside resort in the 18th and 19th centuries, Churchtown was already there, centred on St Cuthbert&apos;s Church, which dates back to the 13th century.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Today Churchtown feels like a genuine village — quieter than the town centre, with its own cluster of shops, pubs, and a community that&apos;s been here longer than most. The Botanic Gardens are the main draw for visitors. Hesketh Park is underrated. St Cuthbert&apos;s is worth a look if you&apos;re interested in local history.
          </p>
          <p className="text-gray-700 leading-relaxed">
            It&apos;s the kind of place where Southport residents take out-of-town guests when they want to show them the town properly, rather than just the seafront and Lord Street. Most day trippers never make it here.
          </p>
        </section>

        {/* Botanic Gardens */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Churchtown Botanic Gardens</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Botanic Gardens are the best reason to visit Churchtown. Founded in 1874, they&apos;re now over 150 years old — one of the oldest municipal botanic gardens in the north-west. Entry is free, they&apos;re open every day, and they&apos;re genuinely good.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">🌿</span>
              Botanic Gardens postcode: PR9 7NB. Parking available on site — free. Café inside the gardens. Open daily year-round. Victorian glasshouses are the centrepiece.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Victorian glasshouses are the visual highlight — well maintained and stocked with tropical and subtropical plants. There&apos;s also a formal rose garden, a lake, children&apos;s play area, and a small museum covering local history. The café does decent coffee and straightforward food.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Best visited on a weekday morning if you want to avoid families at weekends. In summer, the gardens are at their best. In winter, they&apos;re quieter but still worth the trip for the glasshouses alone.
          </p>
        </section>

        {/* Hesketh Park */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Hesketh Park</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hesketh Park is a Victorian public park opened in 1868, about 10 minutes&apos; walk from the Botanic Gardens. It has a boating lake, formal gardens, a bandstand, a café, and tennis courts. Free entry. Postcode: PR9 9NB.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            It&apos;s popular with dog walkers and families, well-maintained, and genuinely pleasant on a decent day. The boating lake is working — rowing boats available in summer. A good stop if you&apos;re combining a few things in Churchtown.
          </p>
        </section>

        {/* St Cuthbert's */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">St Cuthbert&apos;s Church</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            St Cuthbert&apos;s is one of the oldest churches in Merseyside. The current building has 13th-century origins, though much of what you see is later. It&apos;s the focal point of Churchtown village and surrounded by old gravestones that give some sense of how long people have been living here.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Worth a look if you&apos;re in the village — it&apos;s in the centre of things, not out of the way. The graveyard has interesting local history for those who look.
          </p>
        </section>

        {/* Where to eat and drink */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Where to Eat and Drink in Churchtown</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Churchtown has a handful of good local pubs and cafés centred on the village. The pace is slower than the town centre — these are places where locals come for a proper lunch, not tourist-facing operations.
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "The Hesketh Arms — traditional village pub, good for lunch, reliable food. On the main village road.",
              "The Bold Arms — another solid local option in the village.",
              "Botanic Gardens Café — good for coffee and a bite while you're in the gardens. Nothing fancy but fine.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <span className="text-[#C9A84C] font-bold flex-none mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed text-sm">
            For more options, Southport town centre is 10 minutes by car. Churchtown itself is a village — the dining offer reflects that.
          </p>
        </section>

        {/* Getting there */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Getting to Churchtown</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Car,
                title: "By car",
                body: "10 minutes from Southport town centre. Take the A570 northbound toward Churchtown. Free parking near the Botanic Gardens and on village streets.",
              },
              {
                icon: MapPin,
                title: "By bus",
                body: "The 44 bus runs from Southport town centre to Churchtown — approximately 15 minutes. Runs regularly during the day.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                  <h3 className="font-semibold text-[#1B2E4B]">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-[#1B2E4B] text-sm hover:text-[#C9A84C] transition-colors list-none">
                  {q}
                  <ChevronRight className="w-4 h-4 flex-none group-open:rotate-90 transition-transform text-[#C9A84C]" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#FAF8F5] rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">Also in Southport</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/lord-street", label: "Lord Street" },
              { href: "/guides/birkdale-village", label: "Birkdale Village" },
              { href: "/guides/dog-friendly-southport", label: "Dog-Friendly Guide" },
              { href: "/guides/rainy-day-southport", label: "Rainy Day Guide" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-[#1B2E4B] hover:text-[#C9A84C] text-sm font-semibold transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" /> {label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
