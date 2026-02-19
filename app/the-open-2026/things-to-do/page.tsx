import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Things to Do in Southport During The Open 2026 | Activities & Attractions | Southport Guide",
  description:
    "Not attending every day? Discover what to do in Southport during Open week 2026 — beaches, attractions, golf courses, and family activities near Royal Birkdale.",
  alternates: { canonical: "https://www.southportguide.co.uk/the-open-2026/things-to-do" },
};

const THINGS = [
  {
    category: "Beaches & Coast",
    emoji: "🏖️",
    items: [
      { name: "Southport Beach & Pier", desc: "One of England's longest piers and a wide, family-friendly beach. The pier stretches 1,108 metres into the sea — a proper Southport institution worth walking on a clear morning." },
      { name: "Ainsdale Beach & Sand Dunes", desc: "A short drive south, Ainsdale's extensive dunes and open beach are excellent for a morning walk. The dune system is a National Nature Reserve and the beach itself has more space than anywhere else in the area." },
      { name: "Formby Beach & Red Squirrel Reserve", desc: "Twenty minutes south of Southport, the National Trust's Formby reserve has red squirrels, ancient pine woodland, and one of the best stretches of beach in the North West. A perfect half-day if you're not at the course." },
    ],
  },
  {
    category: "Golf (Beyond Royal Birkdale)",
    emoji: "⛳",
    items: [
      { name: "Hillside Golf Club", desc: "Directly adjacent to Royal Birkdale and of similar quality — Hillside is one of England's finest links courses. If you're a golfer and want to play a course of genuine championship standard during Open week, Hillside is the answer. Book well ahead." },
      { name: "Southport & Ainsdale Golf Club", desc: "Another links course of real quality, minutes from Birkdale. Has hosted the Ryder Cup. Worth playing if Hillside is unavailable." },
      { name: "Hesketh Golf Club", desc: "A respected parkland course on the edge of Southport. More forgiving than the links courses but still an enjoyable round." },
    ],
  },
  {
    category: "Family & Indoor Attractions",
    emoji: "🎡",
    items: [
      { name: "Pleasureland Southport", desc: "A traditional seaside amusement park on the seafront — good for families with younger children who need a break from golf. Rides, attractions, and food all in one site." },
      { name: "Southport Model Railway Village", desc: "A quirky and genuinely impressive scale model railway exhibition that surprises most visitors. Good for a couple of hours on a rainy afternoon." },
      { name: "Botanic Gardens & Museum", desc: "Southport's botanic gardens in Churchtown are beautiful in July. The adjacent Atkinson arts centre runs exhibitions. A peaceful morning option if you want something away from the Open buzz." },
    ],
  },
  {
    category: "Shopping & Lord Street",
    emoji: "🛍️",
    items: [
      { name: "Lord Street", desc: "Southport's famous Victorian boulevard with a covered canopy running its length. Independent shops, cafes, and restaurants. One of the finest shopping streets in the North of England and worth exploring properly." },
      { name: "Wayfarers Arcade", desc: "A beautiful Victorian indoor arcade off Lord Street. Independent retailers, a good café, and one of Southport's best-preserved historic buildings." },
      { name: "Ocean Plaza Retail & Leisure", desc: "The seafront development has larger retail names, a cinema, and casual dining if you need a more relaxed shopping environment." },
    ],
  },
  {
    category: "Day Trips",
    emoji: "🚂",
    items: [
      { name: "Liverpool (40 min by Merseyrail)", desc: "The Albert Dock, Beatles Museum, Liverpool FC or Everton stadium tours, world-class museums — all free or cheap. A full day out that's easy on the Merseyrail Southern line. Ideal for non-golf partners or a rest day." },
      { name: "Chester (1hr by road)", desc: "One of England's most complete walled medieval cities. The Rows, the Roman amphitheatre, the cathedral — excellent for a day away from the Open. Easy to drive or take public transport." },
      { name: "The Lake District (1hr 45min by road)", desc: "If you have a full free day and a car, the southern Lake District is within range. Windermere and Coniston are doable and back by evening." },
    ],
  },
];

const FAQS = [
  {
    q: "What is there to do in Southport during Open week if I'm not attending?",
    a: "Southport has a good range of activities — beach and pier, Pleasureland, Botanic Gardens, Lord Street shopping, and excellent restaurants. The town also has a lively pub scene. For half-day trips, Formby beach and red squirrel reserve (20 minutes) and Liverpool city centre (40 minutes by train) are both excellent options.",
  },
  {
    q: "Can I play golf in Southport during Open week?",
    a: "Yes — Hillside Golf Club and Southport & Ainsdale Golf Club both offer public access and are among England's finest links courses. Book well in advance as Open week demand is high. Both courses sit adjacent to or near Royal Birkdale.",
  },
  {
    q: "What can families do in Southport during The Open Championship?",
    a: "Families are well served — Pleasureland amusement park on the seafront, Southport Pier and beach, Botanic Gardens in Churchtown, and Formby beach with the red squirrel reserve are all suitable for children. The Model Railway Village is a surprisingly good option for younger visitors.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
    { "@type": "ListItem", position: 2, name: "The Open 2026", item: "https://www.southportguide.co.uk/the-open-2026" },
    { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.southportguide.co.uk/the-open-2026/things-to-do" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default async function OpenThingsToDoPage() {
  let attractions: { slug: string; name: string; shortDescription: string | null; rating: number | null }[] = [];
  try {
    const cat = await prisma.category.findFirst({ where: { slug: "attractions" } });
    if (cat) {
      attractions = await prisma.business.findMany({
        where: { categoryId: cat.id },
        take: 6,
        orderBy: [{ rating: "desc" }],
        select: { slug: true, name: true, shortDescription: true, rating: true },
      });
    }
  } catch {
    attractions = [];
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* Hero */}
        <section className="relative h-64 md:h-80 bg-[#1B2E4B] overflow-hidden">
          <Image
            src="/images/categories/attractions.webp"
            alt="Things to do in Southport during The Open Championship 2026"
            fill sizes="100vw" quality={75}
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/40 via-[#1B2E4B]/20 to-[#1B2E4B]/90" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
            <Link href="/the-open-2026" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> The Open 2026
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Things to Do in Southport During The Open</h1>
            <p className="text-white/60 mt-2">Activities, attractions, golf, and day trips for Open week 2026</p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-12 space-y-10">

          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-4">More to Southport Than Golf</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Most visitors to The Open spend the majority of their time at Royal Birkdale — but not every day, and not every member of every group. Southport is a proper seaside town with a lot to offer beyond the course, and Open week is actually a great time to explore it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The town is buzzing, the restaurants are full of interesting people, the weather in July is usually the best it gets all year, and the beaches are at their finest. Whether you&apos;re looking for a morning off, a family day out, or something for a partner who doesn&apos;t follow golf, there&apos;s genuinely plenty to do.
            </p>
          </div>

          {/* Things by category */}
          <div className="space-y-6">
            {THINGS.map(({ category, emoji, items }) => (
              <div key={category} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-display text-xl font-bold text-[#1B2E4B] mb-5">
                  {emoji} {category}
                </h2>
                <div className="space-y-5">
                  {items.map(({ name, desc }) => (
                    <div key={name}>
                      <h3 className="font-semibold text-[#1B2E4B] text-sm mb-1">{name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terry's picks callout */}
          <div className="bg-[#FAF8F5] border border-[#C9A84C]/20 rounded-2xl p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-[#1B2E4B]">Terry&apos;s picks for a day off from golf:</span>{" "}
              Formby beach in the morning (arrive before 10am, the squirrels are more active), lunch at a Lord Street restaurant, afternoon at the Botanic Gardens in Churchtown. If the sun&apos;s out, it&apos;s hard to beat. If it rains — Liverpool on the train is 40 minutes and will keep you busy for a full day.
            </p>
          </div>

          {/* Attractions from DB */}
          {attractions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B]">Southport Attractions Directory</h2>
                <Link href="/attractions" className="text-sm font-semibold text-[#C9A84C] hover:underline">View all →</Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {attractions.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/attractions/${a.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all p-5"
                  >
                    <h3 className="font-bold text-[#1B2E4B] group-hover:text-[#C9A84C] transition-colors text-sm">{a.name}</h3>
                    {a.shortDescription && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{a.shortDescription}</p>}
                    {a.rating && <p className="text-amber-500 text-xs font-semibold mt-2">★ {a.rating.toFixed(1)}</p>}
                    <span className="text-[#C9A84C] text-sm font-semibold mt-3 inline-block">View →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Things to Do FAQ</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-display font-bold text-[#1B2E4B] mb-3">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <Link href="/the-open-2026" className="text-sm font-semibold text-[#1B2E4B] hover:text-[#C9A84C] transition-colors">
              ← Back to The Open 2026
            </Link>
            <Link href="/the-open-2026/accommodation" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Find accommodation →
            </Link>
            <Link href="/the-open-2026/restaurants" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              Where to eat →
            </Link>
            <Link href="/attractions" className="text-sm font-semibold text-[#C9A84C] hover:underline">
              All Southport attractions →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
