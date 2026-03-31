import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("autism-friendly-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "autism friendly Southport, sensory friendly Southport, autism friendly days out Southport, sensory friendly days out near me, quiet places Southport, autism friendly beach",
  alternates: { canonical: `${BASE_URL}/guides/autism-friendly-southport` },
  openGraph: {
    title: "Autism Friendly Southport | Sensory-Friendly Visitor Guide",
    description:
      "Quiet beaches, calm venues, and honest advice for autistic visitors and their families planning a trip to Southport.",
    url: `${BASE_URL}/guides/autism-friendly-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/autism-logo.png` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Autism Friendly Southport: A Practical Guide for Visitors",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/autism-friendly-southport`,
  datePublished: "2026-03-31",
  dateModified: "2026-03-31",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: {
    "@type": "Organization",
    name: "SouthportGuide.co.uk",
    url: BASE_URL,
  },
};

const FAQS = [
  {
    q: "Is Southport autism friendly?",
    a: "Southport has a good number of genuinely calm venues and open spaces that work well for autistic visitors. Botanic Gardens, The Atkinson gallery, Marine Lake, King's Gardens, and Hesketh Park are all low-stimulus environments. The beach at low tide on a quiet weekday morning is one of the most open, unpredictable-noise-free spaces in the North West. The town centre and seafront on a busy summer weekend are a different matter.",
  },
  {
    q: "What are the best sensory-friendly places to visit in Southport?",
    a: "Botanic Gardens in Churchtown (free, open, calm), The Atkinson on Lord Street (gallery and museum, quiet, accessible), Marine Lake and King's Gardens on the seafront (open outdoor space, free, predictable), Hesketh Park in the south of town (large Victorian park, quiet), and Southport Library (calm, free, accessible). Southport Beach on a quiet morning is also an excellent choice — enormous, flat, and virtually empty before 10am on weekdays.",
  },
  {
    q: "Which events in Southport are best avoided for sensory reasons?",
    a: "The Southport Air Show (late August, 100,000+ people, loud aircraft overhead), the British Musical Fireworks Championship (September, very loud), the Armed Forces Festival (June, parade with gunfire sounds), and Cristal Palace on Lord Street (April, large outdoor crowds on a narrow boulevard). The Open Championship in July brings 40,000+ people to a small area — not suitable for most sensory-sensitive visitors. The Flower Show in August is large but more manageable if you visit on quieter session days (Thursday tends to be quietest).",
  },
  {
    q: "Is Southport Beach good for autistic children?",
    a: "It can be excellent. At low tide on a quiet weekday morning it is one of the most open, uncrowded beaches in England. The sea retreats over a kilometre, leaving flat wet sand with very few people. Dogs on leads, space to run, nothing unexpected. The key is timing: avoid summer weekends, arrive before 10am, and check the tide times so the sea is not fully out (mid-tide is the sweet spot, more visual interest for children). Busy summer Saturdays are a different experience entirely.",
  },
  {
    q: "Does The Atkinson have quiet sessions?",
    a: "The Atkinson on Lord Street has quiet opening sessions at certain times. The gallery is generally calm throughout the week. Check the Atkinson website for current quiet session times and any specific sensory-friendly events, as these vary by season and programme.",
  },
  {
    q: "Is there parking close to autism-friendly venues in Southport?",
    a: "Yes. For the Botanic Gardens in Churchtown, street parking on Bankfield Lane and the roads around Churchtown village. For The Atkinson on Lord Street, the London Street NCP is the closest car park (a short, covered walk). For Marine Lake and King's Gardens, Marine Drive free bays are directly adjacent. For Hesketh Park, street parking on Hesketh Drive is immediate. None of these require long walks through busy areas.",
  },
  {
    q: "Are there hidden disability lanyards available in Southport?",
    a: "The Hidden Disabilities Sunflower Lanyard scheme is accepted at an increasing number of Southport businesses and venues. The Atkinson, Southport station, and larger retail chains in the town centre are among the places that recognise it. It is worth contacting specific venues in advance to confirm.",
  },
];

const VENUES = [
  {
    name: "Botanic Gardens, Churchtown",
    icon: "🌿",
    why: "Open outdoor space, free, calm, no background noise. Victorian walled garden with a sensory-friendly layout. Weekday mornings are usually very quiet. The formal garden area has clear paths and predictable sightlines. Dog-friendly on leads.",
    tips: "Parking on Bankfield Lane or the surrounding Churchtown streets. Cafe on site. Toilets available. Free entry.",
    tags: ["Free", "Outdoor", "Quiet"],
  },
  {
    name: "The Atkinson, Lord Street",
    icon: "🖼️",
    why: "Gallery and museum in a historic building on Lord Street. Generally quiet, well-lit, and calm. The gallery has no background music. Clear layout with defined rooms. The cafe is separate from the gallery space.",
    tips: "Free gallery entry. Accessible building. Toilets on site. The gallery tends to be quietest weekday mornings. Check atkinson.co.uk for quiet session times.",
    tags: ["Free gallery", "Indoor", "Calm"],
  },
  {
    name: "King's Gardens and Marine Lake",
    icon: "⛵",
    why: "17 acres of free outdoor space directly on the seafront. Open, predictable layout. The Marine Lake perimeter walk is flat and clear. Adventure playground has a separate fenced area for under-5s. Boat hire on the lake adds a low-stimulus activity option.",
    tips: "Free entry. Marine Drive free parking directly adjacent. Toilets at several points. Busy summer weekends are louder — weekday mornings are calm.",
    tags: ["Free", "Outdoor", "Seafront"],
  },
  {
    name: "Hesketh Park",
    icon: "🌳",
    why: "A large Victorian park in the quieter south of the town. Less known to visitors, so rarely crowded. Formal gardens, boating lake, open grass areas. Calm and predictable. Away from the main tourist areas and the noise that comes with them.",
    tips: "Free entry. Street parking on Hesketh Drive. No cafe on site. Toilets in the park. Good for longer walks.",
    tags: ["Free", "Outdoor", "Quiet"],
  },
  {
    name: "Southport Beach (weekday mornings)",
    icon: "🏖️",
    why: "At low tide on a quiet weekday morning, Southport Beach is one of the most open, uncrowded natural spaces in the North West. The sea retreats over a kilometre. Flat, reflective, vast. Very few people before 10am outside summer weekends. Excellent for children who need space to move freely.",
    tips: "Free parking along Marine Drive. Check tide times before you go (mid-tide is better than full low tide for visual interest). Avoid summer weekend afternoons. Dogs welcome all year.",
    tags: ["Free", "Outdoor", "Space to move"],
  },
  {
    name: "Wayfarers Arcade, Lord Street",
    icon: "🏛️",
    why: "Victorian covered arcade off Lord Street. Quieter than the main boulevard, particularly on weekday mornings. Clear linear layout with a defined entrance and exit. Independent shops, lower footfall than the main shopping streets. Good as a short, structured walk-through.",
    tips: "Free to walk through. Short and linear — easy to manage and easy to exit. Busier on Saturdays.",
    tags: ["Indoor", "Clear layout", "Short visit"],
  },
  {
    name: "Southport Library",
    icon: "📚",
    why: "Public library, inherently calm, free to visit, accessible building with clear layout. Quiet by design. Good option if unexpected weather changes your plan.",
    tips: "Princes Street, Southport. Free entry. Accessible. Parking in nearby town centre car parks.",
    tags: ["Free", "Indoor", "Quiet by design"],
  },
  {
    name: "RSPB Marshside",
    icon: "🦢",
    why: "Open nature reserve north of the town. Flat paths, wide skies, very few people outside weekend wildlife events. No loud background noise. Hides available for watching birds from a sheltered position.",
    tips: "Free entry to the reserve. Small car park on Marshside Road. Walk from the hides is flat and predictable. Best weekday mornings.",
    tags: ["Free", "Outdoor", "Nature"],
  },
];

const EVENTS_TO_APPROACH_CAREFULLY = [
  {
    name: "Southport Air Show",
    when: "Late August",
    issue: "100,000+ visitors. Very loud aircraft directly overhead. Enormous crowds on the beach and Promenade.",
    verdict: "Avoid for most sensory-sensitive visitors.",
  },
  {
    name: "British Musical Fireworks Championship",
    when: "September",
    issue: "Three nights of very loud fireworks. Victoria Park fills with large crowds. Sudden loud bangs.",
    verdict: "Avoid. Earplugs would help but the crowds add additional challenge.",
  },
  {
    name: "Armed Forces Festival",
    when: "Late June",
    issue: "Parade along the Promenade with marching bands. Ceremonial gun salutes. Large crowds across the town.",
    verdict: "Approach carefully. The Drumhead Service is quieter. Avoid the parade route.",
  },
  {
    name: "The Open Championship",
    when: "12-19 July 2026",
    issue: "40,000+ visitors per day in a small area. Traffic, queues, noise. The town is at maximum capacity.",
    verdict: "Not suitable for most sensory-sensitive visitors during championship days.",
  },
  {
    name: "Cristal Palace on Lord Street",
    when: "3-4 April 2026",
    issue: "Thousands gathered on Lord Street. Aerial performance with live music directly overhead. Crowd noise.",
    verdict: "Approach carefully. Watching from the fringes of the crowd from a distance is possible.",
  },
  {
    name: "Southport Flower Show",
    when: "August",
    issue: "Large show across Victoria Park. Can be busy. Music stages on certain days.",
    verdict: "Thursday session is typically the quietest. Check the programme for music-free areas.",
  },
];

export default function AutismFriendlySouthportPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }}
      />

      {/* Quick-answer bar */}
      <div className="bg-[#FAF8F5] border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm">
            {[
              { label: "Best quiet venue", value: "Botanic Gardens, Churchtown" },
              { label: "Best beach time", value: "Weekday morning, low tide" },
              { label: "Hidden Disabilities", value: "Sunflower lanyard accepted" },
              { label: "Free quiet spaces", value: "8 listed in this guide" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
                <span className="font-semibold text-[#1B2E4B]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12 space-y-16">

        {/* Logo badge */}
        <div className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
          <Image
            src="/images/autism-logo.png"
            alt="Autism friendly"
            width={64}
            height={64}
            className="rounded-xl flex-shrink-0"
          />
          <div>
            <p className="font-bold text-[#1B2E4B] text-sm mb-0.5">Autism Friendly Guide</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              This guide is written for autistic visitors, their families, and anyone with sensory sensitivities planning a trip to Southport. It is honest about what works and what does not.
            </p>
          </div>
        </div>

        {/* Terry's Take */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-2xl font-bold text-white mb-4">The honest picture</h2>
            <div className="space-y-4 text-white/75 leading-relaxed">
              <p>
                Southport is a mixed picture. It has some genuinely excellent calm and open spaces, places that work well for autistic visitors and families who need predictable environments. It also has events and areas that are challenging, and I want to be straight about both.
              </p>
              <p>
                Botanic Gardens in Churchtown is one of the quietest free public spaces in the North West. The Atkinson gallery on Lord Street is calm, clear, and free. Southport Beach on a weekday morning before the crowds arrive is vast, flat, and almost silent. These are genuinely good options.
              </p>
              <p>
                The Air Show in August, the fireworks in September, and Open Championship week in July are different — big crowds, loud noise, unpredictable movement. This guide will tell you which events to plan around and which are worth avoiding. Four kids means I have done the research the hard way.
              </p>
            </div>
          </div>
        </section>

        {/* Calm venues */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Calm and sensory-friendly venues</h2>
          <p className="text-gray-500 mb-8">
            These venues are calm by nature, free in most cases, and suitable for autistic visitors and those with sensory sensitivities. All are verified by someone who has actually visited them with a family.
          </p>
          <div className="space-y-5">
            {VENUES.map(({ name, icon, why, tips, tags }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-display font-bold text-[#1B2E4B] text-lg">{name}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span key={t} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">{why}</p>
                    <div className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-gray-500 text-sm leading-relaxed">
                        <span className="font-semibold text-[#1B2E4B]">Practical: </span>
                        {tips}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events section */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">Events: what to know before you book</h2>
          <p className="text-gray-500 mb-8">
            Southport has a busy events calendar. Some events are manageable. Others are not. Here is the honest assessment.
          </p>

          <h3 className="font-bold text-[#1B2E4B] mb-4">Approach with care</h3>
          <div className="space-y-4 mb-10">
            {EVENTS_TO_APPROACH_CAREFULLY.map(({ name, when, issue, verdict }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <p className="font-bold text-[#1B2E4B]">{name}</p>
                      <span className="text-gray-400 text-sm">{when}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-2">{issue}</p>
                    <p className="text-sm font-semibold text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full">{verdict}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-[#1B2E4B] mb-4">Events that tend to work well</h3>
          <div className="space-y-4">
            {[
              {
                name: "Sefton Open Art Exhibition",
                when: "April to June",
                why: "Gallery exhibition at The Atkinson. Calm, quiet, free entry to the gallery. No crowds, no loud performances.",
              },
              {
                name: "Books Alive! Literature Festival",
                when: "October half-term",
                why: "Storytelling and author events at venues across town. Individual sessions are small and contained. Good for children who engage well with structured storytelling.",
              },
              {
                name: "Make It! Craft Workshops, The Atkinson",
                when: "Monthly",
                why: "Small-group workshops in a calm venue. Structured, predictable, clear start and end times.",
              },
              {
                name: "Southport Artisan Market",
                when: "Monthly, Southport Market",
                why: "Indoor market at Southport Market on Market Street. Manageable scale, clear layout, easy exits. Quieter than outdoor events.",
              },
            ].map(({ name, when, why }) => (
              <div key={name} className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <p className="font-bold text-[#1B2E4B]">{name}</p>
                  <span className="text-gray-400 text-sm">{when}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical tips */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Practical tips for your visit</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🅿️",
                title: "Parking close to venues",
                body: "All the venues in this guide have parking within a short walk. Botanic Gardens has street parking directly on Bankfield Lane. Marine Lake and King's Gardens have free bays on Marine Drive. The Atkinson has London Street NCP a short covered walk away. None require long walks through busy areas.",
              },
              {
                icon: "🚻",
                title: "Accessible toilets",
                body: "The Atkinson has accessible toilets. King's Gardens and the Promenade have toilets at multiple points. Botanic Gardens cafe has toilets. Always check the specific venue in advance if this is a key planning factor.",
              },
              {
                icon: "🕐",
                title: "Best times to visit",
                body: "Weekday mornings before 11am are consistently the quietest across all venues. Summer weekends from midday onwards are the most challenging. The seafront is quietest October to April outside school holidays.",
              },
              {
                icon: "🌻",
                title: "Hidden Disabilities Sunflower",
                body: "The Sunflower Lanyard scheme is accepted at Southport station, The Atkinson, and a growing number of larger businesses in the town. It is worth phoning specific venues in advance if this is important to your visit.",
              },
              {
                icon: "📱",
                title: "Plan your route in advance",
                body: "All of the venues in this guide have clear postcodes and predictable layouts. Knowing the route from the car park to the entrance before you leave reduces uncertainty. Google Street View is useful for previewing car park entrances.",
              },
              {
                icon: "🐾",
                title: "Bringing a dog",
                body: "Dogs are welcome at Botanic Gardens (on leads), Hesketh Park, Marine Lake, King's Gardens (on leads), Southport Beach, and RSPB Marshside. The Atkinson does not allow dogs inside. Most outdoor venues are dog-friendly.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <p className="font-bold text-[#1B2E4B] mb-1">{title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collection CTA */}
        <section>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Image
              src="/images/autism-logo.png"
              alt="Sensory-friendly"
              width={56}
              height={56}
              className="rounded-xl flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1B2E4B] mb-1">Sensory-friendly businesses in Southport</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Browse the full directory of sensory-friendly and autism-friendly businesses in Southport, from cafes to attractions.
              </p>
            </div>
            <Link
              href="/collections/sensory-friendly-southport"
              className="flex-none inline-block bg-[#1B2E4B] hover:bg-[#C9A84C] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Browse listings →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-100 rounded-2xl p-6">
                <p className="font-bold text-[#1B2E4B] mb-2">{q}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </GuideLayout>
  );
}
