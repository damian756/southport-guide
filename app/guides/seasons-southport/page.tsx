import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, ChevronRight, ArrowRight, Coffee, UtensilsCrossed, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { getGuide } from "@/lib/guides-config";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("seasons-southport");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords: "Season Coffee Southport, Season Bar Kitchen Southport, coffee shop King Street Southport, specialty coffee Southport, brunch Southport, Season Southport menu",
  alternates: { canonical: `${BASE_URL}/guides/seasons-southport` },
  openGraph: {
    title: GUIDE.metaTitle!,
    description: GUIDE.metaDescription!,
    url: `${BASE_URL}/guides/seasons-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/seasons-southport/hero.webp` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Season Coffee, Bar & Kitchen",
  description: "Independent coffee shop, bar and kitchen on King Street, Southport. Micro-lot single-origin beans, local suppliers, brunch and lunch menu.",
  url: "https://www.seasonsouthport.com",
  image: `${BASE_URL}/images/guides/seasons-southport/hero.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "14-16 King Street",
    addressLocality: "Southport",
    postalCode: "PR8 1JZ",
    addressCountry: "GB",
  },
  telephone: "01704 535372",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "00:00", closes: "00:00" },
  ],
  servesCuisine: ["Coffee", "Breakfast", "Brunch", "Lunch"],
  priceRange: "££",
  sameAs: ["https://www.seasonsouthport.com"],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Where is Season Coffee in Southport?", acceptedAnswer: { "@type": "Answer", text: "Season Coffee, Bar & Kitchen is at 14-16 King Street, Southport, PR8 1JZ, directly opposite Southport Market." } },
    { "@type": "Question", name: "What are Season Coffee's opening hours?", acceptedAnswer: { "@type": "Answer", text: "Season is open Tuesday to Sunday, 10am to 4pm. Closed on Mondays. Breakfast is served until 1pm and the kitchen closes at 3pm." } },
    { "@type": "Question", name: "What coffee does Season Southport serve?", acceptedAnswer: { "@type": "Answer", text: "Season uses micro-lot single-origin beans from two local roasters: Django Coffee Co. and Heart & Graft. Beans rotate seasonally and are ground to order. Current options include Ethiopian, Colombian, and Guatemalan varieties." } },
    { "@type": "Question", name: "What food does Season Coffee Southport serve?", acceptedAnswer: { "@type": "Answer", text: "Season serves a full breakfast and lunch menu. Breakfast includes The Season Special, Veggie Special, Smashed Avo, French Toast, and the Season Stack. Lunch includes sandwiches, burgers, loaded fries, and ciabattas. Kitchen closes at 3pm, breakfast served until 1pm." } },
    { "@type": "Question", name: "Does Season Southport do venue hire?", acceptedAnswer: { "@type": "Answer", text: "Yes. Season hires out the venue for private events including birthday parties, baby showers, wine and cheese evenings, and motivational talks. Call 01704 535372 to enquire." } },
  ],
};

const BREAKFAST = [
  { name: "The Season Special", price: "£9.95", desc: "Traditional sausages, bacon, a free range egg, beans, mushrooms, tomato and toast." },
  { name: "The Veggie Special", price: "£9.95", desc: "Veggie sausages, veggie bacon, one free range egg, beans, mushrooms, tomato and toast." },
  { name: "Smashed Avo", price: "£6.95", desc: "Smashed avocado with chilli flakes and a poached egg on toasted sourdough. Add an extra egg for 75p." },
  { name: "French Toast", price: "£6.25", desc: "Cinnamon eggy bread with stewed apples or pear." },
  { name: "Season Stack", price: "£7.95", desc: "Homemade sausage patty, bacon, a free range egg and a crispy hash brown on a brioche bun. Veggie version: smashed avocado, a mini egg omelette and two crispy hash browns on a brioche bun. Add vegan bacon for 75p." },
  { name: "Build Your Own", price: "£4.95 / £6.25 / £6.95", desc: "Pick up to three items from the menu on a fresh tortilla wrap, brioche bun or toast." },
];

const LOADED_FRIES = [
  { name: "Salt & Pepper", price: "£5.95", desc: "" },
  { name: "Bacon n' Cheese", price: "£6.25", desc: "" },
  { name: "Loaded Nacho", price: "£7.25", desc: "" },
];

const LUNCH = [
  { name: "Club Sandwich", price: "£7.75", desc: "Served on toasted bloomer with fresh salad and coleslaw." },
  { name: "BLT", price: "£6.25", desc: "Served on toasted bloomer with fresh salad and coleslaw." },
  { name: "Season Beef Burger", price: "£10.95", desc: "Hand-crafted burger, served with fresh salad, coleslaw and a side of fries. Go vegan with the homemade \"no beef\" burger. Add cheese for 50p." },
  { name: "New York Deli", price: "£8.95", desc: "Homemade pickled beef brisket on ciabatta with mustard, dill pickle and rocket." },
  { name: "Tomato, Mozzarella & Pesto", price: "£6.95", desc: "Classic sandwich on ciabatta with fresh basil, mozzarella, pesto and vine tomato." },
  { name: "Slow Roasted Ham, Cheese & Chilli Jam", price: "£7.95", desc: "Classic slow roasted ham on ciabatta with fresh rocket, chilli jam and cheese." },
  { name: "Hummus, Roasted Pepper & Rocket", price: "£6.95", desc: "Ciabatta with fresh rocket, oven roasted pepper and homemade hummus." },
];

const FAQS = [
  { q: "Where is Season Coffee in Southport?", a: "14-16 King Street, PR8 1JZ, directly opposite Southport Market. It's an easy five-minute walk from Lord Street." },
  { q: "What are the opening hours?", a: "Tuesday to Sunday, 10am to 4pm. Closed Monday. Breakfast is served until 1pm. The kitchen closes at 3pm, so if you want food, don't arrive at 2:45." },
  { q: "What makes Season's coffee different?", a: "They use micro-lot single-origin beans from two local independent roasters: Django Coffee Co. and Heart & Graft. The beans change with the seasons and are ground to order. It's genuinely better than most places in town." },
  { q: "Is there a veggie or vegan option?", a: "Yes. The Veggie Special is a full cooked breakfast. The Season Stack has a veggie version. The Build Your Own lets you mix and match. The beef burger has a vegan 'no beef' alternative." },
  { q: "Does Season do venue hire?", a: "Yes. Private events: birthdays, baby showers, wine and cheese evenings, corporate. Call 01704 535372." },
  { q: "Is Season dog-friendly?", a: "Based on the relaxed atmosphere and size, it's worth ringing ahead to confirm. It's an independent run by a team who know their regulars, so they're usually practical about it." },
];

export default function SeasonsGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      <div className="min-h-screen bg-[#FAF8F5]">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl py-3">
            <nav className="text-sm text-gray-400 flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-[#1B2E4B] transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/guides" className="hover:text-[#1B2E4B] transition">Guides</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/cafes" className="hover:text-[#1B2E4B] transition">Cafés</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1B2E4B] font-medium">Season Coffee</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden min-h-[480px] md:min-h-[560px] flex items-end">
          <Image
            src="/images/guides/seasons-southport/hero.webp"
            alt="Season Coffee Bar and Kitchen interior, King Street, Southport"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4B]/90 via-[#1B2E4B]/40 to-transparent" />
          <div className="relative container mx-auto px-4 max-w-6xl py-14 md:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider mb-5">
                <Coffee className="w-3.5 h-3.5" /> Terry&apos;s Pick · Café Guide
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Season Coffee,<br />
                <span className="text-[#C9A84C]">Bar & Kitchen</span>
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
                King Street&apos;s independent coffee shop doing single-origin beans, a proper brunch menu, and everything sourced from local independents.
                Open since 2021. One of the genuinely good ones.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C9A84C]" /> 14-16 King Street, PR8 1JZ</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C9A84C]" /> Tue–Sun, 10am–4pm</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#C9A84C]" /> 01704 535372</div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical strip */}
        <div className="bg-[#1B2E4B] border-b border-white/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { label: "Address", value: "14-16 King Street" },
                { label: "Postcode", value: "PR8 1JZ" },
                { label: "Open", value: "Tue–Sun, 10am–4pm" },
                { label: "Closed", value: "Monday" },
              ].map(({ label, value }) => (
                <div key={label} className="px-5 py-4 text-center">
                  <div className="text-[#C9A84C] font-bold text-sm md:text-base">{value}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl py-14">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">

              {/* About */}
              <section className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-[#C9A84C] pl-5">
                  Season opened on King Street in August 2021 and has spent the time since quietly building one of the most loyal customer bases of any independent café in Southport. Michelle runs it. She prepares everything fresh each morning and the team know their regulars by name. That tells you more about a café than any review.
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  It&apos;s on King Street, directly opposite Southport Market, which makes it an obvious stop if you&apos;re spending time around that end of town. The interior is relaxed and unhurried: industrial-meets-rustic, the kind of space where you can actually sit and talk without feeling like you&apos;re being moved on.
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  Everything food-related comes from local independent suppliers. The meat is from Blackhurst Butchers. The coffee is from two independent North West roasters: Django Coffee Co. (based in Manchester, inspired by Melbourne&apos;s specialty scene) and Heart & Graft (from Salford). Micro-lot single-origin beans, rotated seasonally, ground to order. It&apos;s the kind of coffee setup most Southport visitors don&apos;t expect to find in a town this size.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Kitchen closes at 3pm.</strong> Breakfast is served until 1pm. If you arrive at half past three hoping for a burger, you&apos;re getting a coffee and not much else. Plan accordingly.
                  </p>
                </div>
              </section>

              {/* Coffee section */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-6 flex items-center gap-3">
                  <Coffee className="w-6 h-6 text-[#C9A84C]" /> The Coffee
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      roaster: "Django Coffee Co.",
                      origin: "Kiaro, Rwenzori Mountains, Uganda",
                      notes: "Melbourne-inspired roasting philosophy. 100% traceable from farm to cup. Low environmental impact focus.",
                      href: "https://www.djangocoffeeco.com/",
                    },
                    {
                      roaster: "Heart & Graft",
                      origin: "Barnraiser + Serendipia blends",
                      notes: "Started in a Salford co-op space for artists. Now a serious independent roaster. Distinctive character.",
                      href: "https://heartandgraft.co.uk/",
                    },
                  ].map((r) => (
                    <div key={r.roaster} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Current Roaster</div>
                      <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-1">{r.roaster}</h3>
                      <p className="text-sm font-semibold text-gray-500 mb-3">{r.origin}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.notes}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-[#FAF8F5] rounded-2xl border border-gray-100 p-5">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#1B2E4B]">Current flavour notes:</strong> Blackberry, Cherry, Raspberry, Plum, Caramel, Hazelnut, Pineapple. Beans vary with the season. Ask Michelle&apos;s team what&apos;s in right now. They know.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Single-origin means the flavour profile is more defined and sometimes more unexpected than a house blend. Worth trying black first if you&apos;re curious.
                  </p>
                </div>
              </section>

              {/* Image gallery */}
              <section>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="relative h-48 rounded-2xl overflow-hidden col-span-2">
                    <Image src="/images/guides/seasons-southport/seating.webp" alt="Seating area at Season Coffee, King Street Southport" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image src="/images/guides/seasons-southport/counter.webp" alt="Coffee counter at Season, Southport" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <Image src="/images/guides/seasons-southport/tables.webp" alt="Tables at Season Coffee, King Street" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden col-span-2">
                    <Image src="/images/guides/seasons-southport/menu.webp" alt="Season Coffee full menu, Southport" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </div>
              </section>

              {/* Full Menu */}
              <section id="menu">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] flex items-center gap-3">
                    <UtensilsCrossed className="w-6 h-6 text-[#C9A84C]" /> The Menu
                  </h2>
                </div>
                <p className="text-gray-500 text-sm mb-6">Meat sourced from Blackhurst Butchers. GF options available. Please notify staff of allergies.</p>

                <div className="rounded-3xl overflow-hidden border border-[#1B2E4B]/10">

                  {/* Breakfast */}
                  <div className="bg-[#1B2E4B] px-6 py-4 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Breakfast</h3>
                    <span className="text-white/40 text-xs">Served until 1pm</span>
                  </div>
                  <div className="bg-[#FAF8F5] px-5 py-3 border-b border-[#1B2E4B]/10">
                    <p className="text-xs text-gray-500">Add mushrooms, tomato, beans, hash browns or avocado +75p each. Extra bacon, sausage or black pudding +£1.50 each.</p>
                  </div>
                  <div className="bg-white divide-y divide-gray-100">
                    {BREAKFAST.map((item) => (
                      <div key={item.name} className="px-6 py-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-bold text-[#1B2E4B] text-sm">{item.name}</div>
                          {item.desc && <div className="text-gray-500 text-xs mt-1 leading-relaxed max-w-lg">{item.desc}</div>}
                        </div>
                        <div className="text-[#C9A84C] font-black text-sm shrink-0 tabular-nums">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  {/* Loaded Fries */}
                  <div className="bg-[#1B2E4B] px-6 py-4">
                    <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Loaded Fries</h3>
                  </div>
                  <div className="bg-white divide-y divide-gray-100">
                    {LOADED_FRIES.map((item) => (
                      <div key={item.name} className="px-6 py-4 flex items-center justify-between gap-4">
                        <span className="font-bold text-[#1B2E4B] text-sm">{item.name}</span>
                        <span className="text-[#C9A84C] font-black text-sm tabular-nums">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lunch */}
                  <div className="bg-[#1B2E4B] px-6 py-4 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">Lunch</h3>
                    <span className="text-white/40 text-xs">Kitchen closes 3pm</span>
                  </div>
                  <div className="bg-white divide-y divide-gray-100">
                    {LUNCH.map((item) => (
                      <div key={item.name} className="px-6 py-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-bold text-[#1B2E4B] text-sm">{item.name}</div>
                          {item.desc && <div className="text-gray-500 text-xs mt-1 leading-relaxed max-w-lg">{item.desc}</div>}
                        </div>
                        <div className="text-[#C9A84C] font-black text-sm shrink-0 tabular-nums">{item.price}</div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Venue Hire */}
              <section className="bg-[#1B2E4B] rounded-3xl p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-[#C9A84C] shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-xl font-bold text-white mb-3">Venue Hire & Private Events</h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      Season hires out the space for private events: birthdays, baby showers, wine and cheese evenings, motivational talks, and other occasions. Michelle&apos;s background is in teaching, which shows in how the space is run. It&apos;s inclusive, well-organised, and the team go the extra mile.
                    </p>
                    <a href="tel:01704535372" className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1B2E4B] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#E8C87A] transition-colors">
                      <Phone className="w-3.5 h-3.5" /> 01704 535372
                    </a>
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Questions About Season</h2>
                <div className="space-y-4">
                  {FAQS.map(({ q, a }) => (
                    <div key={q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                      <h3 className="font-bold text-[#1B2E4B] mb-2">{q}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-5">The Essentials</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm text-[#1B2E4B] font-semibold">14-16 King Street</p>
                      <p className="text-sm text-gray-500">Southport, PR8 1JZ</p>
                      <p className="text-xs text-gray-400 mt-1">Opposite Southport Market</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 pt-4 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Opening Hours</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-[#1B2E4B] font-medium">Mon</span><span className="text-red-500 font-semibold">Closed</span></div>
                        <div className="flex justify-between"><span className="text-[#1B2E4B] font-medium">Tue–Sun</span><span className="text-gray-600">10am–4pm</span></div>
                      </div>
                      <p className="text-xs text-amber-600 mt-2 font-medium">Kitchen closes 3pm. Breakfast until 1pm.</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 pt-4 flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                      <a href="tel:01704535372" className="text-sm text-[#1B2E4B] font-semibold hover:text-[#C9A84C] transition-colors">01704 535372</a>
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.seasonsouthport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-[#1B2E4B] hover:bg-[#C9A84C] text-white hover:text-[#1B2E4B] font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                >
                  Visit their website <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-display font-bold text-[#1B2E4B] text-base mb-4">Nearby</h3>
                <div className="space-y-2">
                  {[
                    { label: "Southport Market", href: "/guides/southport-market", note: "Directly opposite" },
                    { label: "Lord Street", href: "/guides/lord-street", note: "5 min walk" },
                    { label: "The Atkinson", href: "/guides/the-atkinson-southport", note: "10 min walk" },
                    { label: "Best Cafés in Southport", href: "/guides/best-cafes-southport", note: "Full guide" },
                  ].map(({ label, href, note }) => (
                    <Link key={href} href={href} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group">
                      <div>
                        <span className="text-sm text-[#1B2E4B] font-medium group-hover:text-[#C9A84C] transition-colors">{label}</span>
                        <span className="block text-xs text-gray-400">{note}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="bg-white border-t border-gray-100 py-12">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <p className="text-gray-400 text-sm mb-3">More independent businesses in Southport</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/cafes" className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#1B2E4B] text-[#1B2E4B] hover:text-white border border-gray-200 hover:border-[#1B2E4B] font-semibold text-sm px-5 py-2.5 rounded-full transition-all">All Cafés <ArrowRight className="w-3.5 h-3.5" /></Link>
              <Link href="/guides/best-cafes-southport" className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#1B2E4B] text-[#1B2E4B] hover:text-white border border-gray-200 hover:border-[#1B2E4B] font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Best Cafés Guide <ArrowRight className="w-3.5 h-3.5" /></Link>
              <Link href="/restaurants" className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#1B2E4B] text-[#1B2E4B] hover:text-white border border-gray-200 hover:border-[#1B2E4B] font-semibold text-sm px-5 py-2.5 rounded-full transition-all">Restaurants <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
