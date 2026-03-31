import Link from "next/link";
import Image from "next/image";
import { Utensils, Clock, MapPin, Star, ChevronRight, Coffee, Wine, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Restaurants & Bars near MLEC Southport | Pre-Show Dining Guide",
  description:
    "Best restaurants, bars, and cafés near the Marine Lake Events Centre in Southport. Pre-show dining guide with options by area, price, and distance from MLEC.",
  keywords:
    "restaurants near MLEC, bars near Marine Lake Events Centre, pre-show dining Southport, eat near MLEC, Southport restaurants 2027",
  alternates: { canonical: "https://www.southportguide.co.uk/mlec/restaurants" },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "Marine Lake Events Centre", item: "https://www.southportguide.co.uk/mlec" },
    { "@type": "ListItem", position: 3, name: "Restaurants near MLEC", item: "https://www.southportguide.co.uk/mlec/restaurants" },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where should I eat before a show at MLEC?",
      acceptedAnswer: { "@type": "Answer", text: "Lord Street in Southport town centre is the best pre-show dining option — it has the widest range of restaurants from independent bistros to cocktail bars, and is a pleasant 10–15 minute walk along the Promenade to MLEC. Book in advance for any show night, especially weekends. The Promenade itself will have MLEC's own lakeside café and signature restaurant from 2027." },
    },
    {
      "@type": "Question",
      name: "Does MLEC have its own restaurant?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — MLEC will include a signature restaurant with 180-degree views across Marine Lake, plus a lakeside café operating year-round. Both are due to open with the venue in April 2027. The signature restaurant is expected to be a popular pre-show dining option — book ahead for event nights." },
    },
    {
      "@type": "Question",
      name: "How long should I allow for dinner before a show at MLEC?",
      acceptedAnswer: { "@type": "Answer", text: "Allow at least 90 minutes from sitting down to being in your seat at MLEC. This gives 60 minutes for dinner and 30 minutes to walk to the venue and find your seats. For restaurants on Lord Street, factor in the 10–15 minute Promenade walk to MLEC." },
    },
    {
      "@type": "Question",
      name: "Are restaurants near MLEC busy on event nights?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — when MLEC opens for major events, Lord Street restaurants will fill up quickly from around 5:30–6pm. Always book a table in advance for show nights, particularly for Saturday events or high-profile concerts. Walk-in dining on event evenings is not reliable." },
    },
    {
      "@type": "Question",
      name: "What types of restaurant are near MLEC Southport?",
      acceptedAnswer: { "@type": "Answer", text: "Within 15 minutes of MLEC you'll find modern British restaurants, Italian, Indian, Thai and Asian fusion, fish and chip shops, cocktail bars, traditional pubs, and independent cafés. Lord Street has the highest concentration. Birkdale village (accessible by taxi or Merseyrail) also has quality independent bistros and restaurants." },
    },
  ],
};

const DINING_AREAS = [
  {
    name: "The Promenade & Seafront",
    walkTime: "2–5 min from MLEC",
    vibe: "Casual, seafront",
    description:
      "The stretch of the Promenade around MLEC will have the MLEC's own signature restaurant and lakeside café as anchors. Existing seafront options include fish and chips, casual cafés, and ice cream, ideal for a relaxed pre-show snack or a quick post-show something sweet. Expect the dining offer on the Promenade to expand significantly once MLEC opens and footfall increases.",
    options: [
      { type: "MLEC Signature Restaurant", detail: "Lake views, full-service dining, inside MLEC itself. Opening 2027." },
      { type: "MLEC Lakeside Café", detail: "Coffee by day, bistro by night. Year-round, no event required." },
      { type: "Seafront fish & chip shops", detail: "Classic British seaside, grab and go, or sit down." },
      { type: "Promenade cafés & kiosks", detail: "Coffee, ice cream, light bites, good for pre-show casual." },
    ],
  },
  {
    name: "Lord Street & Town Centre",
    walkTime: "10–15 min from MLEC",
    vibe: "Buzzing, lots of choice",
    description:
      "Lord Street is Southport's main dining and drinking strip, and it's genuinely excellent. Independent restaurants, national chains, cocktail bars, traditional pubs, you'll find something for every taste and budget. The walk from Lord Street to MLEC takes about 10–15 minutes along the Promenade, which is easy to factor into your pre-show timing.",
    options: [
      { type: "Independent restaurants", detail: "Wide range of cuisines. Italian, Indian, Thai, modern British, and more." },
      { type: "Cocktail bars & wine bars", detail: "Several quality cocktail bars on and around Lord Street for post-show drinks." },
      { type: "Traditional pubs", detail: "Classic Southport pubs with good food menus and real ale." },
      { type: "Coffee shops", detail: "Multiple independents and chains for pre-show coffee." },
    ],
  },
  {
    name: "Birkdale Village",
    walkTime: "Taxi / 30+ min walk",
    vibe: "Relaxed, neighbourhood",
    description:
      "Birkdale village has quietly become one of the best dining destinations in Southport. A cluster of quality independent restaurants and bars on Liverpool Road, with a genuinely local, unhurried feel. If you're staying in Birkdale, have dinner here before getting a taxi to MLEC rather than trying to rush back into town.",
    options: [
      { type: "Independent bistros & restaurants", detail: "Several quality independents along Liverpool Road, Birkdale." },
      { type: "Local pubs with food", detail: "Village pub dining, relaxed, good portions." },
      { type: "Takeaway options", detail: "Pizza, Indian, and chippy all within the village." },
    ],
  },
];

const PRE_SHOW_TIPS = [
  {
    icon: Clock,
    title: "Allow 90 Minutes Pre-Show",
    body: "If you're eating out before a show at MLEC, allow at least 90 minutes from sitting down to getting to the venue. 60 minutes for dinner, 30 to walk to MLEC and find your seats. Don't try to rush it.",
  },
  {
    icon: AlertTriangle,
    title: "Book Ahead on Event Nights",
    body: "When MLEC opens, popular shows will mean the whole of Lord Street fills up. Don't assume you can walk into your favourite restaurant at 6pm on a Saturday show night. Book ahead, at least a week in advance for big events.",
  },
  {
    icon: MapPin,
    title: "Promenade Walk = No Stress",
    body: "Eating on Lord Street and walking to MLEC along the Promenade is genuinely enjoyable, flat, well-lit, and pleasant. Build the walk into your evening rather than rushing it.",
  },
  {
    icon: Wine,
    title: "Post-Show Drinks",
    body: "MLEC's lakeside café will likely be open for post-show drinks. Lord Street bars are a 10–15 minute walk. If the show finishes late, have a plan, taxi apps can have surge pricing after big shows.",
  },
  {
    icon: Coffee,
    title: "MLEC Has Its Own Restaurant",
    body: "From 2027, you'll be able to dine in the MLEC signature restaurant with 180-degree lake views. Book this for special occasions, it will be the most dramatic pre-show dining experience in the town.",
  },
  {
    icon: Star,
    title: "The Promenade Walk at Night",
    body: "Post-MLEC opening, the Promenade at night will have The Light Fantastic water show as a backdrop. Even if you're just grabbing a coffee on the way home, it's worth stopping. Factor this into your evening, it's free to watch.",
  },
];

const FOOD_TYPES = [
  { cuisine: "Modern British", desc: "Fine dining and gastropubs doing seasonal menus. Lord Street and town centre." },
  { cuisine: "Italian", desc: "Several solid Italian restaurants across town, from casual pizza to proper trattoria." },
  { cuisine: "Indian", desc: "Strong Indian restaurant scene. Southport has several long-standing quality spots." },
  { cuisine: "Fish & Chips", desc: "Mandatory at the seaside. Multiple award-winning chippies within a mile of MLEC." },
  { cuisine: "Thai & Asian Fusion", desc: "Growing selection of Thai, Japanese, and Asian fusion restaurants in the town centre." },
  { cuisine: "Bars & Cocktails", desc: "Lord Street has a strong cocktail bar scene for pre and post-show drinks." },
  { cuisine: "Brunch & Cafés", desc: "Southport's café culture is strong, ideal for matinée days starting with brunch." },
  { cuisine: "MLEC Dining", desc: "MLEC's own signature restaurant (lake views) and lakeside café from April 2027." },
];

export default function MLECRestaurantsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[45vh] flex items-end bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/mlec.webp"
            alt="Restaurants near Marine Lake Events Centre"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        </div>
        <div className="relative container mx-auto px-4 pb-12 pt-20">
          <Link
            href="/mlec"
            className="text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Back to MLEC Guide
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Eat & Drink near MLEC
          </h1>
          <p className="text-slate-200 text-lg max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Pre-show dining, post-show drinks, and everything in between. Southport&apos;s restaurant scene is ready.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-14">

        {/* Terry intro */}
        <section className="max-w-3xl">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-800 font-semibold text-sm mb-1">Terry&apos;s Take</p>
            <p className="text-amber-900 text-base leading-relaxed">
              People underestimate Southport&apos;s food scene. Lord Street has quietly built a genuinely good
              selection of independent restaurants over the past few years, nothing like it was a decade ago.
              My honest recommendation: book a table on Lord Street, take your time over dinner, then walk to
              MLEC along the Promenade. That&apos;s the perfect MLEC evening. And when the venue opens, The Light
              Fantastic water show on the way back? Bonus.
            </p>
          </div>
        </section>

        {/* Area by area */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Dining by Area</h2>
          <div className="space-y-6">
            {DINING_AREAS.map((area) => (
              <div key={area.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{area.name}</h3>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" /> {area.walkTime}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Utensils className="w-4 h-4" /> {area.vibe}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{area.description}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {area.options.map((opt) => (
                    <div key={opt.type} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{opt.type}</p>
                        <p className="text-xs text-gray-600">{opt.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cuisine types */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">What You&apos;ll Find in Southport</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FOOD_TYPES.map((item) => (
              <div key={item.cuisine} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-slate-900 mb-1">{item.cuisine}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pre-show tips */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Pre-Show Dining Tips</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRE_SHOW_TIPS.map((tip) => (
              <div key={tip.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
                <tip.icon className="w-7 h-7 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm">{tip.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Browse All Southport Restaurants</h2>
              <p className="text-slate-300">
                Full directory of restaurants, bars, cafés, and takeaways in Southport, all within reach of MLEC.
              </p>
            </div>
            <Link
              href="/restaurants"
              className="bg-amber-400 text-slate-900 px-7 py-3 rounded-lg font-bold hover:bg-amber-300 transition whitespace-nowrap flex items-center gap-2"
            >
              <Utensils className="w-5 h-5" /> See All Restaurants
            </Link>
          </div>
        </section>

        {/* Cross-links */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Also Useful</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/mlec/accommodation", label: "Where to Stay Near MLEC" },
              { href: "/mlec/getting-there", label: "Getting to MLEC" },
              { href: "/mlec", label: "Full MLEC Guide" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition group"
              >
                <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors text-sm">
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
