import Link from "next/link";
import Image from "next/image";
import { MapPin, Train, Car, Clock, AlertTriangle, CheckCircle, ChevronRight, Navigation } from "lucide-react";

export const metadata = {
  title: "Getting to Marine Lake Events Centre Southport | Transport & Parking Guide",
  description:
    "How to get to MLEC Southport by train, bus, car, and taxi. Parking guide, Merseyrail directions, and accessibility information for Marine Lake Events Centre.",
  keywords:
    "getting to MLEC, Marine Lake Events Centre parking, Southport train MLEC, transport to Marine Lake Events Centre, how to get to MLEC",
  alternates: { canonical: "https://www.southportguide.co.uk/mlec/getting-there" },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "Marine Lake Events Centre", item: "https://www.southportguide.co.uk/mlec" },
    { "@type": "ListItem", position: 3, name: "Getting to MLEC", item: "https://www.southportguide.co.uk/mlec/getting-there" },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get to the Marine Lake Events Centre by train?",
      acceptedAnswer: { "@type": "Answer", text: "Take the Merseyrail Southport Line to Southport Station — the northern terminus. From the station, turn right onto Lord Street, walk toward the seafront (10 minutes), then turn right onto the Promenade. MLEC is on your left after 5 minutes. Total walking time from the station is approximately 15 minutes. Trains run from Liverpool Central (50 min), Formby (20 min), and other stops on the Southport Line." },
    },
    {
      "@type": "Question",
      name: "Is there parking at the Marine Lake Events Centre?",
      acceptedAnswer: { "@type": "Answer", text: "MLEC does not have its own dedicated multi-storey car park. The closest parking is the Promenade surface car parks (1–3 min walk, pay and display), King's Gardens car park (5–8 min walk), and town centre multi-storey options on Chapel Street and Mornington Road (12–15 min walk). For major events, parking fills quickly — arrive at least 60 minutes early or use the train." },
    },
    {
      "@type": "Question",
      name: "What is the best way to get to MLEC?",
      acceptedAnswer: { "@type": "Answer", text: "The train is the recommended option. Southport is the end of the Merseyrail Southport Line so you cannot miss your stop, the walk from the station to MLEC is flat and straightforward, and you avoid all parking and traffic issues. If driving, park in the town centre car parks and walk down — the Promenade route is pleasant and only 10–15 minutes." },
    },
    {
      "@type": "Question",
      name: "How far is MLEC from Southport town centre?",
      acceptedAnswer: { "@type": "Answer", text: "MLEC is approximately 10–15 minutes on foot from Southport town centre and Lord Street. The walk is flat and follows the Promenade past King's Gardens. The route is well-lit and pleasant, making it a comfortable walk even after an evening event." },
    },
    {
      "@type": "Question",
      name: "Can I get a taxi to and from MLEC?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — taxis and ride-share apps (Uber, Bolt) operate in Southport. For major events, pre-booking your return taxi is strongly advised as demand rises sharply after shows finish. Taxi ranks on Lord Street and Cambridge Road serve the town. For disabled-adapted vehicles, pre-book directly with a local specialist firm." },
    },
  ],
};

const TRANSPORT_OPTIONS = [
  {
    icon: Train,
    method: "By Train (Merseyrail)",
    badge: "Recommended",
    badgeColor: "bg-green-100 text-green-800",
    walkTime: "15 min walk from station",
    description:
      "Southport is the northern terminus of the Merseyrail Southport Line, with direct trains from Liverpool Central (about 50 minutes), Formby (20 minutes), and Ormskirk (change at Meols Cop). Trains run frequently and the station is well-lit and accessible.",
    steps: [
      "Alight at Southport Station on Lord Street",
      "Turn right out of the station onto Lord Street",
      "Walk down Lord Street towards the seafront (10 minutes)",
      "Turn right onto the Promenade / Marine Drive",
      "MLEC is on your left, directly on Marine Lake (5 minutes)",
    ],
    tips: [
      "Check the last train time before you go, services reduce in the evening",
      "The walk from the station is well-lit and straightforward",
      "Accessible route: no significant gradients, smooth pavements throughout",
      "On event nights, trains from Southport may be busier, allow extra time",
    ],
  },
  {
    icon: Car,
    method: "By Car",
    badge: "Parking Available",
    badgeColor: "bg-blue-100 text-blue-800",
    walkTime: "Various, see car parks below",
    description:
      "Southport is easily accessible by road. Junction 3 of the M58 provides the main motorway link. The Promenade itself has some surface parking, and Southport's town centre car parks are within a 10–20 minute walk of MLEC. For major events, expect road congestion on the Promenade, arrive early or consider parking further out and walking in.",
    steps: [
      "From M58: Exit at Junction 3, follow signs for Southport town centre",
      "Follow signs to the Promenade / Seafront",
      "Promenade surface parking is closest to MLEC (pay & display)",
      "Town centre multi-storey car parks: Chapel Street, Mornington Road (10–15 min walk)",
      "King's Gardens car park also close to the Promenade route",
    ],
    tips: [
      "Promenade car parks will fill quickly on event nights, arrive at least 60 minutes early",
      "Town centre NCP car parks offer overnight parking, useful if you're staying nearby",
      "Do NOT drive if attending an evening event and planning to drink. Southport taxis are plentiful",
      "For accessibility parking, drop-off points will be clearly signed at MLEC",
    ],
  },
  {
    icon: Navigation,
    method: "By Taxi or Ride Share",
    badge: "Easy After-Show",
    badgeColor: "bg-purple-100 text-purple-800",
    walkTime: "Door to door",
    description:
      "Southport has a good taxi network, both traditional cabs and Uber/ride-share operate in the town. After major events, there will be higher demand, so pre-booking for the return journey is strongly advised. Several taxi ranks operate in the town centre.",
    steps: [
      "Pre-book a taxi for the return journey before attending the event",
      "Taxi ranks are on Lord Street (near the station) and Cambridge Road",
      "Uber and Bolt both operate in Southport, download the app before travelling",
      "Hotel taxis can be arranged through reception if you're staying locally",
    ],
    tips: [
      "Don't rely on hailing a cab after a major show, they will all be booked",
      "Share a taxi with other event-goers if possible, reduces cost and demand",
      "Taxis from Southport to Formby/Ormskirk: approximately £15–25",
      "For disability-adapted vehicles, pre-book directly with a local firm",
    ],
  },
  {
    icon: MapPin,
    method: "By Bus",
    badge: "Budget Option",
    badgeColor: "bg-orange-100 text-orange-800",
    walkTime: "Varies by service",
    description:
      "Several Arriva bus services connect Southport with surrounding areas including Ormskirk, Crosby, and Formby. Bus stops on Lord Street and the Promenade area are closest to MLEC. For most visitors travelling from outside Southport, the train is faster and more reliable, but bus is a valid option for local travel.",
    steps: [
      "Check Traveline (traveline.info) for live bus timetables to Southport",
      "Services 47, 105, X2 serve Southport from surrounding areas",
      "Alight in Southport town centre, then walk to the Promenade (10 min)",
      "Check return times before you travel, evening services reduce significantly",
    ],
    tips: [
      "Download the Arriva Bus UK app for live bus times",
      "Contactless payment accepted on most Merseyside buses",
      "Last buses from Southport town centre: check Traveline, typically before midnight",
      "Not ideal for arriving at a set time, allow plenty of extra time",
    ],
  },
];

const PARKING_OPTIONS = [
  {
    name: "Promenade Surface Car Parks",
    distance: "1–3 min walk",
    type: "Pay & Display",
    notes: "Closest to MLEC. Fills fast on event nights. Arrive 60+ minutes early.",
  },
  {
    name: "King's Gardens Car Park",
    distance: "5–8 min walk",
    type: "Pay & Display",
    notes: "Good option if Promenade is full. Scenic walk through King's Gardens to MLEC.",
  },
  {
    name: "Chapel Street Multi-Storey (NCP)",
    distance: "12–15 min walk",
    type: "Multi-Storey / Overnight",
    notes: "Overnight parking available. Good for stays. Walk via Lord Street and the Promenade.",
  },
  {
    name: "Mornington Road Car Park",
    distance: "12–15 min walk",
    type: "Surface / Town Centre",
    notes: "One of the larger town centre options. Walk via the gardens or Lord Street.",
  },
  {
    name: "Marine Drive (on-street)",
    distance: "2–5 min walk",
    type: "On-Street (limited)",
    notes: "Very limited. Do not rely on this, aim for pay & display car parks instead.",
  },
];

export default function MLECGettingTherePage() {
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
            alt="Marine Lake Events Centre — Getting There"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 pb-12 pt-20" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <Link
            href="/mlec"
            className="text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 inline-flex items-center gap-1"
          >
            ← Back to MLEC Guide
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Getting to MLEC
          </h1>
          <p className="text-slate-200 text-lg max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Transport, parking, and access guide for the Marine Lake Events Centre, Southport.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-14">

        {/* Quick Orientation */}
        <section>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">Address</p>
              <p className="text-slate-900 font-semibold">Marine Drive, Southport, PR8</p>
              <p className="text-slate-600 text-sm mt-1">
                On the Promenade, site of the former Southport Theatre and Convention Centre
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-green-600 font-bold mb-1">By Train</p>
              <p className="text-slate-900 font-semibold">15 min from Southport Station</p>
              <p className="text-slate-600 text-sm mt-1">Merseyrail Southport Line, terminus station on Lord Street</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-1">By Car</p>
              <p className="text-slate-900 font-semibold">Junction 3 off M58</p>
              <p className="text-slate-600 text-sm mt-1">Follow signs for Southport Promenade / Seafront on arrival</p>
            </div>
          </div>
        </section>

        {/* Terry's advice */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 border-l-4 border-l-amber-400 p-6">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1">Terry's Advice</p>
            <p className="text-gray-700 leading-relaxed">
              Honestly? Take the train. Southport Station is the end of the line, you cannot accidentally miss your
              stop. The walk from the station to MLEC is flat, straightforward, and takes you right through the town
              centre past Lord Street. If you're coming by car, the biggest mistake is arriving too close to showtime
              and spending the first 20 minutes of your evening trying to find a space. Get there early, grab a coffee
              on Lord Street, and walk down. Much better night.
            </p>
          </div>
        </section>

        {/* Transport options */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Transport Options</h2>
          <div className="space-y-6">
            {TRANSPORT_OPTIONS.map((opt) => (
              <div key={opt.method} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2.5 rounded-lg">
                        <opt.icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{opt.method}</h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{opt.walkTime}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${opt.badgeColor}`}>
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-5">{opt.description}</p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Route / Steps</p>
                      <ol className="space-y-1.5">
                        {opt.steps.map((step, i) => (
                          <li key={step} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="bg-amber-400 text-slate-900 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Tips</p>
                      <ul className="space-y-1.5">
                        {opt.tips.map((tip) => (
                          <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Parking Guide */}
        <section>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Car Parking Near MLEC</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="text-left px-5 py-3 font-semibold">Car Park</th>
                    <th className="text-left px-5 py-3 font-semibold">Walk to MLEC</th>
                    <th className="text-left px-5 py-3 font-semibold">Type</th>
                    <th className="text-left px-5 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PARKING_OPTIONS.map((park, i) => (
                    <tr
                      key={park.name}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-5 py-3 font-medium text-slate-800">{park.name}</td>
                      <td className="px-5 py-3 text-green-700 font-semibold">{park.distance}</td>
                      <td className="px-5 py-3 text-gray-600">{park.type}</td>
                      <td className="px-5 py-3 text-gray-600">{park.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-50 border-t border-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Event nights:</strong> Parking availability will be significantly reduced for major concerts
                and sell-out events. Always have a backup parking option in mind, and consider the train if possible.
              </p>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Accessibility</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              MLEC is being built to modern accessibility standards. Specific accessibility provisions, including
              accessible seating, hearing loops, accessible car parking, and drop-off points, will be confirmed
              ahead of opening. The route from Southport train station is flat with good pavements throughout.
            </p>
            <ul className="space-y-2">
              {[
                "Southport Station is step-free accessible (lifts available)",
                "The walk from station to MLEC is entirely flat with smooth pavements",
                "Accessible parking bays will be designated at or near MLEC, details TBC",
                "For disabled-adapted taxis, pre-book with local specialist firms",
                "Full accessibility guide to be published by Sefton Council ahead of 2027 opening",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cross-links */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Also Useful</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/mlec/accommodation", label: "Where to Stay Near MLEC" },
              { href: "/mlec/restaurants", label: "Pre-Show Dining" },
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
