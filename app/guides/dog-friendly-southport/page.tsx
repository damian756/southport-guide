import Link from "next/link";
import Image from "next/image";
import { MapPin, Car, ChevronRight, ArrowRight, PawPrint, Clock, AlertCircle } from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import { getBusinessLinks, bizHref } from "@/lib/guide-business-links";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("dog-friendly-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "dog friendly Southport, dogs on Southport beach, dog friendly pubs Southport, dog walks Southport, Ainsdale beach dogs, dog friendly cafes Southport",
  alternates: { canonical: `${BASE_URL}/guides/dog-friendly-southport` },
  openGraph: {
    title: "Dog-Friendly Southport | Beach, Walks, Pubs & Cafés | SouthportGuide",
    description:
      "Southport is genuinely dog-friendly, beach access, off-lead walks, dog-welcoming pubs and cafés. The complete guide for dogs and their people.",
    url: `${BASE_URL}/guides/dog-friendly-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-beach.webp` }],
  },
};

const FAQS = [
  {
    q: "Are dogs allowed on Southport Beach?",
    a: "Yes, but with seasonal restrictions. Dogs are welcome year-round on the northern section of Southport Beach (north of the funfair, toward Ainsdale). On the central section near the funfair and promenade, dogs are restricted between May 1 and September 30 during certain hours. The northern end is essentially always dog-friendly and has more space. Check signs on the day for the current restrictions.",
  },
  {
    q: "Can dogs be off-lead at Southport Beach?",
    a: "Dogs can be off-lead on the unrestricted sections of the beach, particularly the northern end and Ainsdale beach just south of Southport. The beach is wide and there's space to run. Be aware of other beach users and any specific byelaws posted on site.",
  },
  {
    q: "Is Ainsdale beach dog-friendly?",
    a: "Ainsdale beach, just south of Southport, is very dog-friendly and popular with dog owners precisely because it has fewer restrictions than the central Southport beach section. It's a National Nature Reserve, dogs must be kept under control near the dunes and nature reserve areas. Good parking at Ainsdale-on-Sea (PR8 2PZ).",
  },
  {
    q: "Are dogs allowed in Southport town centre?",
    a: "Dogs are welcome on Lord Street and in general outdoor areas. Many independent shops and cafés on Lord Street and in Birkdale Village are dog-friendly, look for the water bowl outside or ask at the door. Larger chain stores vary.",
  },
  {
    q: "Are there dog-friendly pubs in Southport?",
    a: "Yes, several Southport pubs welcome dogs, particularly those with outdoor seating areas or a more traditional pub character. The Hesketh Arms in Churchtown is a classic dog-welcoming village pub. Most pubs along the seafront are generally accommodating. Always worth phoning ahead for evening visits.",
  },
  {
    q: "Where can I walk my dog near Southport?",
    a: "Best options: Southport Beach (northern end, year-round), Ainsdale Beach and Dunes (great off-lead space), Hesketh Park in Churchtown (well-maintained park, popular with dog walkers), the Marine Drive Promenade (the full length is dog-friendly and gives excellent sea views), and the RSPB Marshside coastal saltmarsh path on Redshank Road, flat, exposed, tidal pools, dogs on leads, five minutes from Churchtown.",
  },
];

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Dog-Friendly Southport. Complete Guide",
  description:
    "Beach access, dog-welcoming pubs and cafés, and the best walks in Southport for dogs and their owners.",
  url: `${BASE_URL}/guides/dog-friendly-southport`,
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

export default async function DogFriendlySouthportGuidePage() {
  const bizLinks = await getBusinessLinks(["The Hesketh Arms", "The Bold Arms"]);
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[60vh] flex items-end bg-[#1B3A2B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-beach.webp"
            alt="Dog-friendly Southport Beach"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2B] via-[#1B3A2B]/55 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl pb-14 pt-20">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">
            <PawPrint className="w-4 h-4" />
            Practical Guide
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
            Dog-Friendly Southport
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Southport is genuinely good for dogs, most of the beach, the full Promenade,
            and a decent number of pubs and cafés that actually mean it when they say welcome.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-[#C9A84C]" />
              <span>Beach (north end): dogs welcome year-round</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <AlertCircle className="w-4 h-4 text-[#C9A84C]" />
              <span>Central beach: restrictions May–Sept</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick facts strip ── */}
      <div className="bg-[#1B3A2B] border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Beach (north end)", value: "Dogs welcome always" },
              { label: "Central beach", value: "Restricted May–Sept" },
              { label: "Promenade", value: "Fully dog-friendly" },
              { label: "Ainsdale beach", value: "Excellent off-lead" },
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
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Dogs on Southport Beach</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            Southport Beach is one of the widest in England, there&apos;s genuinely room for everyone, including dogs. The restrictions that do exist are limited to a specific central section and specific seasonal hours. For most visitors with dogs, the northern end of the beach is the practical answer.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-none mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm mb-1">Seasonal restrictions, central beach section</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Between May 1 and September 30, dogs are restricted on the central section of Southport Beach (the area near the funfair and main promenade) during certain hours. The northern section, past the funfair, toward Ainsdale, has no restrictions. Signs on site show the current boundaries.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            In practice, most dog owners head straight for the northern end regardless. It&apos;s less busy, the sand is better, and the access from Marine Drive is straightforward. Postcode for the northern parking area: <strong>PR8 1RL</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Promenade (Marine Drive) runs the full length of the seafront and is completely dog-friendly year-round. It&apos;s tarmacked and easily walkable, a good option on days when you don&apos;t want to deal with sand.
          </p>
        </section>

        {/* Ainsdale */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Ainsdale Beach and Dunes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ainsdale beach is a 5-minute drive south of Southport and is one of the best dog-walking destinations on the Sefton coast. It&apos;s a National Nature Reserve, so dogs must be kept under control near the dunes and designated areas, but the beach itself has excellent off-lead space.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Parking at Ainsdale-on-Sea: postcode <strong>PR8 2PZ</strong>. Paid car park. The beach is a short walk from the car park through the dunes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Quieter than Southport Beach in summer and very popular with local dog owners. Worth the short drive if the central Southport beach is restricted.
          </p>
        </section>

        {/* Best walks */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Best Dog Walks Near Southport</h2>

          {/* Marshside photo callout */}
          <div className="rounded-2xl overflow-hidden mb-6 relative">
            <Image
              src="/images/marshside/rspb-marshside-dogs.jpg"
              alt="Dog running through a tidal pool on the Marshside coastal path — Ribble Estuary saltmarsh and blue sky behind"
              width={900}
              height={450}
              className="w-full h-52 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white font-semibold text-sm">RSPB Marshside coastal saltmarsh walk, dogs on leads, Ribble Estuary Special Protection Area</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Southport Beach (north end)",
                postcode: "PR8 1RL",
                notes: "Year-round, no restrictions on the northern stretch. Wide and flat, good for any dog.",
              },
              {
                name: "Marine Drive Promenade",
                postcode: "PR8 1RQ",
                notes: "The full seafront promenade. Easy walking on tarmac. Sea views throughout.",
              },
              {
                name: "Ainsdale Beach and Dunes",
                postcode: "PR8 2PZ",
                notes: "NNR, dogs under control near dunes. Excellent open beach for off-lead running.",
              },
              {
                name: "RSPB Marshside, coastal saltmarsh walk",
                postcode: "SD 353204",
                notes: "The coastal path on the Redshank Road side of the sea wall. Flat, exposed, tidal pools and a big estuary sky. Dogs on leads throughout. Part of the Ribble Estuary Special Protection Area. Car park £1.50/£3, RSPB members free. Five minutes from Churchtown.",
              },
              {
                name: "Hesketh Park, Churchtown",
                postcode: "PR9 9NB",
                notes: "Victorian park with paths, open grass, and a lake. Popular with local dog walkers.",
              },
              {
                name: "Churchtown Botanic Gardens",
                postcode: "PR9 7NB",
                notes: "Well-maintained gardens with paths. Dogs welcome on leads.",
              },
            ].map((walk) => (
              <div key={walk.name} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4">
                <PawPrint className="w-5 h-5 text-[#C9A84C] flex-none mt-0.5" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-[#1B2E4B]">{walk.name}</h3>
                    <span className="text-xs font-mono text-gray-400">{walk.postcode}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{walk.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dog-friendly pubs */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Dog-Friendly Pubs</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            A number of Southport pubs are genuinely dog-friendly, water bowls outside, dogs allowed inside, no fuss. These are the most reliably welcoming:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                name: "The Hesketh Arms",
                location: "Churchtown village",
                notes: "Classic village pub. Dog-friendly throughout. Good for post-walk food. Traditional atmosphere.",
              },
              {
                name: "The Bold Arms",
                location: "Churchtown",
                notes: "Another solid Churchtown option. Local pub, no pretension. Dogs welcome.",
              },
              {
                name: "Seafront pubs (Marine Drive)",
                location: "Promenade",
                notes: "Several pubs along the seafront are accommodating, particularly those with outdoor seating areas. Worth checking before evening visits.",
              },
              {
                name: "Birkdale Village pubs",
                location: "Liverpool Road, Birkdale",
                notes: "The more independent pubs in Birkdale Village generally welcome dogs. The village has a more relaxed attitude than the town centre.",
              },
            ].map(({ name, location, notes }) => {
              const biz = bizLinks[name];
              return (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 p-5">
                {biz ? (
                  <Link href={bizHref(biz)} className="font-semibold text-[#1B2E4B] hover:text-[#C9A84C] underline underline-offset-2 decoration-[#C9A84C]/40 transition-colors block mb-0.5">{name}</Link>
                ) : (
                  <h3 className="font-semibold text-[#1B2E4B] mb-0.5">{name}</h3>
                )}
                <p className="text-[#C9A84C] text-xs font-semibold mb-2">{location}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{notes}</p>
              </div>
            );})}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Always phone ahead for evening visits, policies and capacity change. A quick call saves a difficult conversation on the doorstep.
          </p>
        </section>

        {/* Dog-friendly cafés */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Dog-Friendly Cafés</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The better independent cafés in Southport tend to be more dog-friendly than the chains. Look for a water bowl outside, that&apos;s usually the signal. Several on Lord Street and in Birkdale Village welcome dogs, particularly those with outdoor seating.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Botanic Gardens café in Churchtown is dog-friendly (the gardens themselves are dog-friendly on leads). Good for a post-walk coffee with the dog.
          </p>
          <div className="bg-[#FAF8F5] border-l-4 border-[#C9A84C] rounded-r-xl px-5 py-4 my-6">
            <p className="text-[#1B2E4B] font-medium leading-relaxed">
              <span className="mr-2">☕</span>
              For a full list of good cafés, see the <Link href="/guides/best-cafes-southport" className="text-[#C9A84C] hover:underline font-semibold">Best Cafés in Southport guide</Link>. Most independent cafés listed there are dog-friendly or have outdoor seating, worth checking the notes.
            </p>
          </div>
        </section>

        {/* Practical tips */}
        <section className="mb-14">
          <h2 className="font-display text-3xl font-bold text-[#1B2E4B] mb-5">Practical Tips</h2>
          <ul className="space-y-3">
            {[
              "Bag dispensers are available at the main beach access points, but bring your own to be safe.",
              "Fresh water on the beach is limited. Bring a travel bowl and water for longer outings.",
              "During the Air Show (August), Southport Beach gets very crowded, not ideal for anxious dogs.",
              "Parking at the northern beach end (PR8 1RL) is the quickest route to the unrestricted section.",
              "Nearest vet: several practices in Southport town centre, search 'vet Southport PR8' for current options.",
            ].map((tip) => (
              <li key={tip} className="flex gap-3 text-gray-700">
                <span className="text-[#C9A84C] font-bold flex-none mt-0.5">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
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
          <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-3">More Southport guides</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/guides/southport-beach", label: "Southport Beach Guide" },
              { href: "/guides/parking-southport", label: "Parking Guide" },
              { href: "/guides/churchtown", label: "Churchtown" },
              { href: "/guides/best-cafes-southport", label: "Best Cafés" },
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
