import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, ChevronRight, ArrowRight, Coffee, Star } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://www.southportguide.co.uk";

export const metadata: Metadata = {
  title: "Roxy's Cafe Southport | Italian Coffee, Croissants and Cakes on London Street",
  description: "Roxy's Cafe on London Street, Southport. Authentic Italian coffee with Julius Meinl beans, freshly baked croissants, pistachio coffee, artisan paninis and homemade cakes. Right next to Southport train station. Open from 8am Monday to Friday.",
  keywords: "Roxy's Cafe Southport, Italian cafe Southport, coffee near Southport train station, London Street cafe Southport, pistachio coffee Southport, Julius Meinl Southport, Italian coffee shop Southport",
  alternates: { canonical: `${BASE_URL}/guides/roxy-cafe-southport` },
  openGraph: {
    title: "Roxy's Cafe Southport | Italian Coffee, Croissants and Cakes",
    description: "Authentic Italian coffee, freshly baked croissants and homemade cakes on London Street, right next to Southport train station. The full guide.",
    url: `${BASE_URL}/guides/roxy-cafe-southport`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/guides/roxy-cafe-southport/hero.jpg` }],
  },
};

const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Roxy's Cafe",
  alternateName: "Roxy's Italian Coffee Shop",
  description: "Authentic Italian-inspired cafe on London Street, Southport. Julius Meinl coffee, freshly baked croissants, artisan paninis and traditional Italian cakes. Founded by Roxana Budoi in February 2025.",
  url: "https://www.instagram.com/roxycaffe2024",
  image: `${BASE_URL}/images/guides/roxy-cafe-southport/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "42 London Street",
    addressLocality: "Southport",
    postalCode: "PR9 0TJ",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.6453,
    longitude: -3.0075,
  },
  telephone: "0330 912 7361",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:30", closes: "15:30" },
  ],
  servesCuisine: ["Italian", "Coffee", "Breakfast", "Pastries"],
  priceRange: "£",
  hasMenu: "https://www.just-eat.co.uk/restaurants-roxys-cafe-crossens/menu",
  founder: {
    "@type": "Person",
    name: "Roxana Budoi",
  },
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Where is Roxy's Cafe in Southport?", acceptedAnswer: { "@type": "Answer", text: "Roxy's Cafe is at 42 London Street, Southport, PR9 0TJ. It is right next to Southport train station: less than a minute's walk from the main entrance." } },
    { "@type": "Question", name: "What are Roxy's Cafe opening hours?", acceptedAnswer: { "@type": "Answer", text: "Monday to Friday: 8am to 4pm. Saturday: 9am to 5pm. Sunday: 10:30am to 3:30pm." } },
    { "@type": "Question", name: "What coffee does Roxy's Cafe serve?", acceptedAnswer: { "@type": "Answer", text: "Roxy's uses Julius Meinl coffee, an Austrian roaster with a long tradition of Italian-style espresso. Drinks include espresso, cappuccino, flat white, and the popular pistachio coffee at £3.95." } },
    { "@type": "Question", name: "What is the pistachio coffee at Roxy's?", acceptedAnswer: { "@type": "Answer", text: "The pistachio coffee at £3.95 is the standout drink at Roxy's Cafe in Southport. It is an espresso-based drink with pistachio flavouring, consistently the most recommended item in customer reviews." } },
    { "@type": "Question", name: "Does Roxy's Cafe do a coffee and cake deal?", acceptedAnswer: { "@type": "Answer", text: "Yes. Coffee and cake for £7.50, available all day Monday to Friday. The homemade Italian cakes rotate and are frequently highlighted in reviews." } },
    { "@type": "Question", name: "Who owns Roxy's Cafe Southport?", acceptedAnswer: { "@type": "Answer", text: "Roxy's Cafe is owned by Roxana Budoi, known as Roxy. She is Romanian-born, a former Italian resident, and spent nearly eight years at Volare restaurant in Southport before opening her own place in February 2025." } },
  ],
};

const COFFEE = [
  { name: "Espresso", price: "£2.50", desc: "Single shot, Julius Meinl beans." },
  { name: "Macchiato", price: "£2.75", desc: "" },
  { name: "Double Espresso", price: "£3.25", desc: "" },
  { name: "Cortado", price: "£3.50", desc: "" },
  { name: "Americano", price: "£3.25", desc: "" },
  { name: "White Americano", price: "£3.45", desc: "" },
  { name: "Cappuccino", price: "£3.75", desc: "Julius Meinl espresso with steamed and foamed milk." },
  { name: "Flat White", price: "£3.95", desc: "" },
  { name: "Latte", price: "£4.10", desc: "" },
  { name: "Flavoured Latte", price: "£4.65", desc: "" },
  { name: "Pistachio Coffee", price: "£3.95", desc: "The one people make a specific trip for. Order it." },
  { name: "Mocha", price: "£4.45", desc: "" },
  { name: "Iced Latte", price: "£4.25", desc: "" },
  { name: "Hot Chocolate", price: "£4.25", desc: "" },
  { name: "Luxury Hot Chocolate", price: "£4.95", desc: "" },
  { name: "Decaffeinated", price: "£3.25", desc: "" },
  { name: "Tea", price: "£2.45", desc: "" },
  { name: "Flavoured Tea", price: "£2.75", desc: "" },
];

const COFFEE_EXTRAS = [
  { name: "Go Large", price: "+£0.70" },
  { name: "Extra Shot", price: "+£0.70" },
  { name: "Alternative Milk", price: "+£0.50" },
];

const MORNING = [
  { name: "Flavoured Croissant", price: "£2.75", desc: "Nutella, custard, pistachio or apricot. Freshly baked." },
  { name: "Krapfen", price: "£2.35", desc: "Italian doughnut. Nutella, custard or pistachio filled." },
  { name: "Toasted Tea Cake", price: "£2.75", desc: "Served with butter." },
  { name: "Panettone Toasted", price: "£3.50", desc: "Served with butter." },
  { name: "Ham & Cheese Croissant", price: "£4.95", desc: "Freshly baked." },
  { name: "Ham & Cheese Toast", price: "£5.95", desc: "" },
  { name: "Parma Ham Croissant", price: "£5.95", desc: "Lettuce, parma ham, mozzarella and tomatoes." },
];

const PANINI = [
  { name: "Caprese (VE)", price: "£7.95", desc: "Ciabatta, tomato, mozzarella, sunblush tomatoes and fresh basil." },
  { name: "Alpine", price: "£7.95", desc: "Focaccia genovese, ham and emmental." },
  { name: "Orticella (VE)", price: "£7.95", desc: "Ciabatta, grilled vegetables and mascarpone." },
  { name: "Tonno", price: "£8.95", desc: "Ciabatta, lettuce, cucumber, tuna, red onions and mayonnaise." },
  { name: "Ham & Mozzarella", price: "£8.95", desc: "Focaccia, lettuce, ham, mozzarella, tomato, mayonnaise and oregano." },
  { name: "Piadina Romagna", price: "£8.95", desc: "Flatbread, lettuce, ham, scamorza and tomato." },
  { name: "Fattorino", price: "£9.95", desc: "Pugliese bread, speck and brie." },
  { name: "Spianata Calabrese", price: "£9.95", desc: "Filone rustico, spianata calabrese, provolone cheese and bomba pugliese." },
  { name: "Panino alla Bolognese", price: "£9.95", desc: "Schiacciata romana, mortadella, stracchino and pistachio." },
  { name: "Schiacciata Romana", price: "£9.95", desc: "Schiacciata romana, cured beef, rocket and parmesan shavings." },
  { name: "Bufalo", price: "£9.95", desc: "Schiacciata romana, parma ham, mozzarella di bufala and rocket." },
  { name: "Apollo", price: "£10.50", desc: "Ciabatta, lettuce, breadcrumbed chicken, tomato and mayonnaise." },
];

const PINSA = [
  { name: "Parma", price: "£11.95", desc: "Mozzarella, cherry tomatoes, rocket, parma ham and parmesan shavings." },
  { name: "Calabrese", price: "£11.95", desc: "Tomato, mozzarella, olives, spianata calabrese and bomba pugliese." },
  { name: "Stracchino", price: "£11.95", desc: "Mortadella, stracchino, pistachio and pesto." },
  { name: "Speck & Scamorza", price: "£11.95", desc: "Tomato, mozzarella, scamorza and speck." },
  { name: "Vegetarian", price: "£11.95", desc: "Tomato, mozzarella and grilled vegetables." },
  { name: "Four Salumi", price: "£12.95", desc: "Tomato, mozzarella and four different salumi." },
  { name: "Smoked Salmon", price: "£12.95", desc: "Smoked salmon, stracchino, rocket and balsamic." },
];

const PLATTERS = [
  { name: "Meat & Cheese for One", price: "£12.95", desc: "Selection of Italian cured meats and cheeses." },
  { name: "Meat & Cheese for Two", price: "£22.95", desc: "Selection of Italian cured meats and cheeses. Available to take away." },
  { name: "Cheeseboard", price: "£9.95", desc: "Selection of Italian cheese." },
];

const DESSERTS = [
  { name: "Homemade Cake", price: "£5.95", desc: "Changes daily. Ask staff for what is available." },
  { name: "Italian Gelato — 1 scoop", price: "£3.45", desc: "" },
  { name: "Italian Gelato — 2 scoops", price: "£4.95", desc: "" },
  { name: "Italian Gelato — 3 scoops", price: "£6.45", desc: "" },
  { name: "Coffee & Cake Deal", price: "£7.50", desc: "Any coffee plus a homemade cake. Monday to Friday, all day." },
];

const GALLERY = [
  { src: "/images/guides/roxy-cafe-southport/gallery-gelato.jpg", alt: "Italian pistachio gelato with wafer at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-tiramisu.jpg", alt: "Homemade tiramisu and pistachio cake at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-bufalo.jpg", alt: "Bufalo panino: schiacciata romana, parma ham and mozzarella di bufala at Roxy's" },
  { src: "/images/guides/roxy-cafe-southport/gallery-spianata.jpg", alt: "Spianata Calabrese panino with provolone at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-bolognese.jpg", alt: "Panino alla Bolognese with mortadella and pistachio at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-romana.jpg", alt: "Schiacciata Romana with cured beef and parmesan at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-ham-mozz.jpg", alt: "Ham and mozzarella focaccia panino at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-piadina.jpg", alt: "Piadina Romagna flatbread wrap at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-tonno.jpg", alt: "Tonno ciabatta with tuna and salad at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-caprese.jpg", alt: "Caprese ciabatta with mozzarella and sunblush tomatoes at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-alpine.jpg", alt: "Alpine focaccia with ham and emmental at Roxy's Cafe Southport" },
  { src: "/images/guides/roxy-cafe-southport/gallery-fattorino.jpg", alt: "Fattorino on pugliese bread with speck and brie at Roxy's Cafe Southport" },
];

const HOURS = [
  { day: "Monday", hours: "8:00am – 4:00pm" },
  { day: "Tuesday", hours: "8:00am – 4:00pm" },
  { day: "Wednesday", hours: "8:00am – 4:00pm" },
  { day: "Thursday", hours: "8:00am – 4:00pm" },
  { day: "Friday", hours: "8:00am – 4:00pm" },
  { day: "Saturday", hours: "9:00am – 5:00pm" },
  { day: "Sunday", hours: "10:30am – 3:30pm" },
];

const FAQS = [
  { q: "Where exactly is it?", a: "42 London Street, PR9 0TJ. Right next to Southport train station. If you are arriving by train from Liverpool or Manchester, you walk out of the station and it is in front of you. Useful to know." },
  { q: "What is the pistachio coffee?", a: "The pistachio coffee at £3.95 is the most recommended drink at Roxy's. It is espresso-based with pistachio flavouring. More than one person has specifically made the trip after seeing it posted online. Order it." },
  { q: "What coffee brand does Roxy's use?", a: "Julius Meinl. A Viennese roaster with a 160-year history and a strong Italian-style espresso tradition. The red cardinal logo is on the cups. It is a step up from the standard high-street roasters and a deliberate choice by Roxy." },
  { q: "Is it good for a quick stop before a train?", a: "It is right next to the station. That is the point. Takeaway is available. In the time it takes to walk from the platform to the street, you can have a coffee in your hand. Several reviewers mention using it exactly this way." },
  { q: "Are the cakes actually homemade?", a: "Yes. The Italian cakes are made by Roxy. They rotate. The cheesecake versions are the ones most mentioned in reviews. Multiple reviewers use the phrase 'to die for' which, for Southport, is high praise." },
  { q: "Is there a deal?", a: "Coffee and any cake for £7.50, Monday to Friday, all day. Probably the best value sit-down treat in this part of town." },
];

export default function RoxyCafeGuide() {
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
              <Link href="/cafes" className="hover:text-[#1B2E4B] transition">Cafes</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1B2E4B] font-medium">Roxy&apos;s Cafe</span>
            </nav>
          </div>
        </div>

        {/* Hero — mobile: full bleed, desktop: split */}
        <section className="bg-[#1B2E4B]">
          {/* Mobile: full-bleed image with gradient overlay */}
          <div className="relative md:hidden overflow-hidden min-h-[480px] flex items-end">
            <Image
              src="/images/guides/roxy-cafe-southport/hero.jpg"
              alt="Roxy Budoi, owner of Roxy's Cafe Southport, holding a Julius Meinl espresso and freshly baked croissant"
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative px-4 pb-10 w-full">
              <span className="inline-flex items-center gap-1.5 bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                <Coffee className="w-3 h-3" /> Cafe Guide · London Street
              </span>
              <h1 className="font-display text-4xl font-bold text-white leading-tight mb-3">Roxy&apos;s Cafe</h1>
              <p className="text-white/75 text-lg mb-5">Italian coffee, freshly baked croissants, and homemade cakes right next to Southport train station.</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full"><MapPin className="w-3.5 h-3.5" /> 42 London Street, PR9 0TJ</span>
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full"><Clock className="w-3.5 h-3.5" /> Open from 8am Mon–Fri</span>
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full"><Phone className="w-3.5 h-3.5" /> 0330 912 7361</span>
              </div>
            </div>
          </div>

          {/* Desktop: split — text left, image right */}
          <div className="hidden md:grid md:grid-cols-2 min-h-[520px]">
            {/* Left: text panel */}
            <div className="flex flex-col justify-center px-10 lg:px-16 py-12">
              <span className="inline-flex items-center gap-1.5 bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider self-start mb-6">
                <Coffee className="w-3 h-3" /> Cafe Guide · London Street
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Roxy&apos;s Cafe
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                Italian coffee, freshly baked croissants, and homemade cakes right next to Southport train station. The full guide.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" /> 42 London Street, PR9 0TJ
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> Open from 8am Mon–Fri
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full">
                  <Phone className="w-3.5 h-3.5" /> 0330 912 7361
                </span>
              </div>
            </div>
            {/* Right: image panel */}
            <div className="relative overflow-hidden">
              <Image
                src="/images/guides/roxy-cafe-southport/hero.jpg"
                alt="Roxy Budoi, owner of Roxy's Cafe Southport, holding a Julius Meinl espresso and freshly baked croissant"
                fill
                priority
                sizes="50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl py-10 md:py-14">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Main content */}
            <div className="space-y-10">

              {/* Terry's intro */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-4">The honest take</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <p>
                    Roxy opened this place in February 2025, a few steps from Southport station, and it was exactly what that end of town needed. It is Italian in the proper sense: Julius Meinl coffee, a Viennese roaster with a 160-year history of Italian-style espresso, the cups with the red cardinal, freshly baked croissants, paninis with real cured meats and Italian cheese, and homemade cakes that rotate daily.
                  </p>
                  <p>
                    Roxy spent nearly eight years at Volare before doing this herself. Volare is one of the most respected Italian restaurants in Southport and has been for years. That background matters: this is not someone who decided to open a coffee shop and bought a machine. This is someone who knows Italian food from the inside and built a place around it.
                  </p>
                  <p>
                    The pistachio coffee is the thing people make a specific trip for. The panini are proper Italian: named breads, proper fillings, nothing generic about them. The Pinsa Romana is something most people in Southport have not tried before. The coffee and cake deal is £7.50, Monday to Friday, all day, and is one of the better value things in this part of town. And the cakes are genuinely excellent.
                  </p>
                  <p>
                    If you are catching a train, it is right there. If you want a proper Italian coffee and something freshly baked with it, it is the place to go in Southport. I have lived here 41 years. This is the kind of independent that makes a town worth living in.
                  </p>
                </div>
              </section>

              {/* The story */}
              <section className="bg-[#1B2E4B] rounded-2xl p-7 md:p-9 text-white">
                <h2 className="font-display text-2xl font-bold mb-4">Who is Roxy?</h2>
                <p className="text-white/75 leading-relaxed mb-3">
                  Roxana Budoi, known as Roxy, was born in Romania and spent years living in Italy before coming to Southport. She brought eight years of experience at Volare, one of Southport&apos;s most respected Italian restaurants, to her own venture. Roxy&apos;s Cafe, named as a tribute to her two daughters, opened on 24 February 2025 on London Street.
                </p>
                <p className="text-white/75 leading-relaxed">
                  She describes it as her dream: a welcoming space where people feel the same warmth they get at Volare, but for a coffee and a croissant rather than a full evening meal. Based on the reviews, she has delivered it.
                </p>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-5">The Food</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GALLERY.map((img) => (
                    <div key={img.src} className="relative aspect-[3/4] rounded-xl overflow-hidden">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Coffee */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <Coffee className="w-6 h-6 text-[#C9A84C]" />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B]">Hot Drinks</h2>
                </div>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Roxy uses <strong>Julius Meinl</strong>, a Viennese roaster founded in 1862 with a long Italian-style espresso tradition. The signature red cardinal on the cups is one of the most recognised marks in European coffee.
                </p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  {COFFEE.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{item.name}</p>
                        {item.desc && <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                  {COFFEE_EXTRAS.map((item) => (
                    <div key={item.name} className="flex items-center justify-between px-5 py-2.5 bg-gray-50 text-xs text-gray-500">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
                  <Star className="w-4 h-4 text-amber-500 shrink-0" />
                  <p><strong>Order the pistachio coffee.</strong> At £3.95 it is the most recommended item. Multiple people have walked in having seen it online specifically to try it.</p>
                </div>
              </section>

              {/* Morning Treats */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-5">Morning Treats</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Freshly baked every morning. The flavoured croissants rotate: Nutella, custard, pistachio and apricot. The Krapfen (Italian doughnut) is worth trying if you have not had one before.
                </p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-5">
                  {MORNING.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{item.name}</p>
                        {item.desc && <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
                <Image
                  src="/images/guides/roxy-cafe-southport/menu-morning-treats.jpg"
                  alt="Roxy's Cafe Southport morning treats menu"
                  width={700}
                  height={700}
                  className="w-full rounded-2xl"
                />
              </section>

              {/* Panini */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-3">Panini & Sandwiches</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  All served with a side salad. These are proper Italian sandwiches with named breads: schiacciata romana, pugliese, focaccia genovese, ciabatta. Not the generic deli counter kind.
                </p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  {PANINI.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{item.name}</p>
                        {item.desc && <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pinsa Romana */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-3">Pinsa Romana</h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Pinsa is a Roman-style flatbread: lighter and crispier than conventional pizza, with a high hydration dough that makes it more digestible. This is proper pinsa, not pizza pretending to be something else. Worth ordering if you have not tried it.
                </p>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-5">
                  {PINSA.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{item.name}</p>
                        {item.desc && <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
                <Image
                  src="/images/guides/roxy-cafe-southport/menu-pinsa.jpg"
                  alt="Roxy's Cafe Southport Pinsa Romana menu"
                  width={700}
                  height={700}
                  className="w-full rounded-2xl"
                />
              </section>

              {/* Platters & Desserts */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-5">Platters, Desserts & Gelato</h2>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-5">
                  {[...PLATTERS, ...DESSERTS].map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 px-5 py-3.5 bg-white hover:bg-[#FAF8F5] transition-colors">
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{item.name}</p>
                        {item.desc && <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="text-[#C9A84C] font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/guides/roxy-cafe-southport/deal.jpg"
                    alt="Roxy's Cafe Southport coffee and cake deal, £7.50 Monday to Friday"
                    width={700}
                    height={700}
                    className="w-full object-cover rounded-2xl"
                  />
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-6">Common questions</h2>
                <div className="space-y-3">
                  {FAQS.map(({ q, a }) => (
                    <div key={q} className="bg-white border border-gray-100 rounded-2xl px-6 py-5">
                      <p className="font-semibold text-[#1B2E4B] mb-2">{q}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-20">

              {/* Quick info */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4">Quick info</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Address</dt>
                    <dd className="text-[#1B2E4B] font-medium">42 London Street, Southport, PR9 0TJ</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Phone</dt>
                    <dd><a href="tel:03309127361" className="text-[#1B2E4B] font-medium hover:text-[#C9A84C] transition">0330 912 7361</a></dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Instagram</dt>
                    <dd><a href="https://www.instagram.com/roxycaffe2024" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] font-medium hover:underline">@roxycaffe2024</a></dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Coffee</dt>
                    <dd className="text-[#1B2E4B] font-medium">Julius Meinl</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Price range</dt>
                    <dd className="text-[#1B2E4B] font-medium">£1 – £10 most items</dd>
                  </div>
                </dl>
              </div>

              {/* Opening hours */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <h3 className="font-display text-lg font-bold text-[#1B2E4B] mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C9A84C]" /> Opening Hours
                </h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-50">
                    {HOURS.map(({ day, hours }) => (
                      <tr key={day}>
                        <td className="py-1.5 text-gray-500 font-medium pr-4">{day}</td>
                        <td className="py-1.5 text-[#1B2E4B] font-semibold text-right">{hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Map */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#1B2E4B] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A84C]" /> Find Roxy&apos;s Cafe
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Next to Southport train station</p>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.9!2d-3.0075!3d53.6453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b03bac21a9a37%3A0x1!2s42+London+Street%2C+Southport+PR9+0TJ!5e0!3m2!1sen!2sgb!4v1699999999999!5m2!1sen!2sgb"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Roxy's Cafe location on Google Maps"
                />
              </div>

              {/* Related guides */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <h3 className="font-semibold text-[#1B2E4B] text-sm mb-3">More from Southport Guide</h3>
                <nav className="space-y-2">
                  {[
                    { href: "/cafes", label: "All Cafes in Southport" },
                    { href: "/guides/best-cafes-southport", label: "Best Cafes Guide" },
                    { href: "/things-to-do", label: "Things to Do in Southport" },
                    { href: "/restaurants", label: "Restaurants in Southport" },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-[#1B2E4B] transition py-1.5 border-b border-gray-50 last:border-0"
                    >
                      {label}
                      <ArrowRight className="w-3 h-3 text-gray-300" />
                    </Link>
                  ))}
                </nav>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
