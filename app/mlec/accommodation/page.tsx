import Link from "next/link";
import Image from "next/image";
import { Hotel, MapPin, Clock, Star, ChevronRight, ArrowRight, Waves, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Accommodation near Marine Lake Events Centre | Hotels & B&Bs | SouthportGuide",
  description:
    "Find the best hotels, B&Bs and self-catering near MLEC Southport. Area-by-area guide with walking times, price ranges, and booking tips for events at the Marine Lake Events Centre.",
  keywords:
    "accommodation near MLEC, hotels near Marine Lake Events Centre, Southport hotels 2027, where to stay MLEC, Marine Lake accommodation",
};

const AREAS = [
  {
    name: "The Promenade & Marine Lake",
    walkTime: "2–5 minutes",
    badge: "Closest",
    badgeColor: "bg-green-100 text-green-800",
    description:
      "Right on the doorstep of MLEC. Staying on the Promenade means you can walk to the venue in minutes — ideal for shows that finish late, or if you want to catch The Light Fantastic water show before heading back to your room. A handful of hotels sit directly on the seafront with views across Marine Lake.",
    tips: [
      "Best choice for late-night events — no transport needed",
      "Walk home along the illuminated Promenade",
      "Watch The Light Fantastic from your hotel (select rooms)",
      "Book very early — limited stock at this proximity",
    ],
  },
  {
    name: "Southport Town Centre & Lord Street",
    walkTime: "10–20 minutes",
    badge: "Best Value",
    badgeColor: "bg-amber-100 text-amber-800",
    description:
      "Southport's town centre has the widest range of accommodation options — from boutique hotels on Lord Street to budget B&Bs tucked down the side streets. The walk to MLEC along the Promenade is a genuine pleasure: past King's Gardens, along the coast, with the lake on one side. Worth the extra ten minutes.",
    tips: [
      "Biggest choice of price points and styles",
      "Lord Street restaurants and bars on your doorstep",
      "20-minute stroll along the seafront to MLEC",
      "Town centre taxis run all night for post-show returns",
    ],
  },
  {
    name: "Birkdale & Ainsdale",
    walkTime: "Taxi / 30–40 min walk",
    badge: "Residential",
    badgeColor: "bg-blue-100 text-blue-800",
    description:
      "The leafy suburbs south of Southport offer a quieter, more residential feel — particularly good for families or those who prefer to be away from the town centre buzz. B&Bs and smaller guest houses dominate here. Getting to MLEC means a taxi or a longer walk, but Birkdale village has its own excellent restaurant and pub scene.",
    tips: [
      "Good for families — quieter environment",
      "Birkdale village has excellent restaurants pre-show",
      "Pre-book a taxi for the return journey — don't rely on hailing one late at night",
      "Merseyrail from Birkdale to Southport station (2 min), then walk/taxi",
    ],
  },
  {
    name: "Formby & Ormskirk",
    walkTime: "20–35 min by car/train",
    badge: "Budget Option",
    badgeColor: "bg-purple-100 text-purple-800",
    description:
      "If MLEC accommodation in Southport itself is fully booked (which will happen for big shows), Formby and Ormskirk are sensible fallbacks. Both are on the Merseyrail Northern Line into Southport, with direct trains taking around 20–30 minutes. Not ideal for a spontaneous last drink, but perfectly workable for planned events.",
    tips: [
      "Check Merseyrail timetables — last trains can be early",
      "Formby has a useful town centre with food options",
      "Ideal if you're attending a matinée rather than an evening show",
      "Useful backup when Southport hotels sell out for major events",
    ],
  },
];

const BOOKING_TIPS = [
  {
    icon: Clock,
    title: "Book Early for Big Shows",
    body: "For major concerts or sell-out events at MLEC, Southport hotels will fill up fast — just as they do for The Open or the Air Show. For anything remotely high-profile, book accommodation the day tickets go on sale, not after.",
  },
  {
    icon: MapPin,
    title: "Location Beats Price",
    body: "Paying a bit more to stay within walking distance of the venue is almost always worth it. Late-night taxis in Southport can be in demand after big shows, and having a 10-minute walk home beats standing outside in the cold waiting for an Uber.",
  },
  {
    icon: Star,
    title: "Check Cancellation Policies",
    body: "Shows occasionally change dates, support acts change, or you simply can't make it. Book with free cancellation where possible, especially for events booked far in advance. Flexible rates are usually worth the small premium.",
  },
  {
    icon: Waves,
    title: "Ask for Lake Views",
    body: "Promenade hotels with lake-facing rooms will have views of The Light Fantastic water show directly from the window. Worth asking when booking — it turns a good stay into a memorable one.",
  },
];

export default function MLECAccommodationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[50vh] flex items-end bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/mlec.webp"
            alt="Marine Lake Events Centre Southport"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        </div>
        <div className="relative container mx-auto px-4 pb-12 pt-24">
          <Link
            href="/mlec"
            className="text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Back to MLEC Guide
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Accommodation near MLEC
          </h1>
          <p className="text-slate-200 text-lg max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Where to stay for shows, events, and weekends at the Marine Lake Events Centre, Southport.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-14">

        {/* Intro */}
        <section className="max-w-3xl">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-800 font-semibold text-sm mb-1">Terry's Quick Take</p>
            <p className="text-amber-900 text-base leading-relaxed">
              Staying within walking distance of MLEC is the play. The Promenade walk from the town centre is
              genuinely lovely — King's Gardens on one side, the lake on the other — so even if you're 15 minutes away
              on foot, it's not a hardship. But for late shows, proximity matters. Book early.
              When MLEC opens and word spreads, Southport accommodation will fill faster than it ever has.
            </p>
          </div>
        </section>

        {/* Area guide */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            Where to Stay: Area by Area
          </h2>
          <div className="space-y-6">
            {AREAS.map((area) => (
              <div
                key={area.name}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900">{area.name}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${area.badgeColor}`}>
                        {area.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{area.walkTime} to MLEC</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{area.description}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {area.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Tips */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Booking Tips</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {BOOKING_TIPS.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4"
              >
                <tip.icon className="w-8 h-8 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Browse All Southport Hotels</h2>
              <p className="text-slate-300">
                All hotels, B&Bs and serviced apartments listed on SouthportGuide — from budget to luxury.
              </p>
            </div>
            <Link
              href="/hotels"
              className="bg-amber-400 text-slate-900 px-7 py-3 rounded-lg font-bold hover:bg-amber-300 transition whitespace-nowrap flex items-center gap-2"
            >
              <Hotel className="w-5 h-5" /> View All Hotels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Cross-links */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Also Useful</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/mlec/getting-there", label: "Getting to MLEC", icon: MapPin },
              { href: "/mlec/restaurants", label: "Restaurants near MLEC", icon: "🍽️", isEmoji: true },
              { href: "/mlec", label: "Full MLEC Guide", icon: "🎭", isEmoji: true },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition group"
              >
                {link.isEmoji ? (
                  <span className="text-2xl">{link.icon as string}</span>
                ) : (
                  <MapPin className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors text-sm">
                  {link.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
