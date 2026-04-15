import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  UtensilsCrossed,
  Dog,
  Music,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Car,
  Train,
  Accessibility,
  Leaf,
  Users,
  History,
  Heart,
  Star,
} from "lucide-react";
import type { Metadata } from "next";
import GuideLayout from "@/app/components/GuideLayout";
import { getGuide } from "@/lib/guides-config";
import ImageLightbox from "@/app/components/ImageLightbox";
import GalleryLightbox from "@/app/components/GalleryLightbox";
import StopPropLink from "@/app/components/StopPropLink";

const BASE_URL = "https://www.southportguide.co.uk";
const GUIDE = getGuide("southport-market");

export const metadata: Metadata = {
  title: GUIDE.metaTitle,
  description: GUIDE.metaDescription,
  keywords:
    "southport market, southport market food, southport market menu, southport market opening times, southport market parking, southport market traders, food hall southport, southport market dog friendly, southport market gluten free, southport market events, southport market king street",
  alternates: { canonical: `${BASE_URL}/guides/southport-market` },
  openGraph: {
    title: "Southport Market Guide | Every Trader, Menu, Parking & Tips (2026)",
    description:
      "Southport Market on King Street — every trader reviewed, what to order, opening times, parking, and the honest picture. Written by a Southport local.",
    url: `${BASE_URL}/guides/southport-market`,
    type: "website",
    siteName: "SouthportGuide.co.uk",
    images: [{ url: `${BASE_URL}/images/southport-market/exterior/entrance-main-signage.webp` }],
  },
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Southport Market: The Complete Guide — Every Trader, Menu and Honest Tip",
  description: GUIDE.metaDescription,
  url: `${BASE_URL}/guides/southport-market`,
  datePublished: "2026-04-02",
  dateModified: "2026-04-02",
  author: { "@type": "Person", name: "Terry", url: `${BASE_URL}/about` },
  publisher: { "@type": "Organization", name: "SouthportGuide.co.uk", url: BASE_URL },
  image: `${BASE_URL}/images/southport-market/exterior/entrance-main-signage.webp`,
};

const PLACE_LD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Southport Market",
  description:
    "A food and drink hall on King Street in Southport town centre. Nine independent traders, a central bar, live music, and regular events.",
  url: "https://southportmarket.com",
  image: `${BASE_URL}/images/southport-market/exterior/entrance-main-signage.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "King Street",
    addressLocality: "Southport",
    addressRegion: "Merseyside",
    postalCode: "PR8 1LA",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday"], opens: "10:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "23:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "20:30" },
  ],
  servesCuisine: ["Italian", "Greek", "Korean", "Indian", "American", "British"],
  priceRange: "£",
  acceptsReservations: "false",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dog Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Changing Places Toilet", value: true },
    { "@type": "LocationFeatureSpecification", name: "Large Print Menus", value: true },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What time does Southport Market open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wednesday and Thursday 10am to 10pm. Friday and Saturday 10am to 11pm. Sunday 10am to 8:30pm. Closed Monday and Tuesday. Brunch N' Bagel is the only trader open from 10am. Most other traders start serving from around noon.",
      },
    },
    {
      "@type": "Question",
      name: "Can you book a table at Southport Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Southport Market is walk-in only. No reservations are accepted. This is a deliberate policy that keeps the atmosphere informal and accessible.",
      },
    },
    {
      "@type": "Question",
      name: "Is Southport Market dog friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dogs are welcome throughout Southport Market. Dog water stations are provided. Guide dogs and assistance dogs are also welcome.",
      },
    },
    {
      "@type": "Question",
      name: "Is there gluten-free food at Southport Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pitamu has a dedicated gluten-free fryer and is the safest option for coeliac visitors. Brunch N' Bagel, Pasta 51 Express, and others also have gluten-free options. Talk to traders directly at the counter about allergens.",
      },
    },
    {
      "@type": "Question",
      name: "Is Southport Market wheelchair accessible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ramps on the main entrance, ample space throughout the hall for wheelchairs and mobility scooters, and a Changing Places toilet with hoist, adult changing bench, and carer space.",
      },
    },
    {
      "@type": "Question",
      name: "Where do I park for Southport Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Market Street car park is directly adjacent. Tulketh Street car park is a five-minute walk. The postcode is PR8 1LA.",
      },
    },
    {
      "@type": "Question",
      name: "How old is Southport Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The building has been a market on King Street since at least 1963, when Blackhurst Butchers opened. It was transformed into its current food and drink hall format in July 2021 with a £1.4 million investment funded by the Government Town Deal and the Liverpool City Region Combined Authority.",
      },
    },
    {
      "@type": "Question",
      name: "Can you hire the Extravaganza Room at Southport Market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Extravaganza Room is available for private hire and can accommodate weddings, parties, corporate events, and conferences. Contact Southport Market directly via southportmarket.com/information.",
      },
    },
    {
      "@type": "Question",
      name: "Is Southport Market good for autistic visitors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The open-plan layout, wide sightlines, and Changing Places toilet make it structurally accessible. Wednesday and Thursday lunchtimes are the quietest windows. All traders have large print menus. Food can be ordered as takeaway from every trader if the interior is too busy. The sensory-friendly section of this guide has detailed practical advice.",
      },
    },
  ],
};

const QUICK_LINKS = [
  { href: "#traders", label: "The Traders", icon: UtensilsCrossed },
  { href: "#bar", label: "Market Bar", icon: Star },
  { href: "#timing", label: "When to Visit", icon: Clock },
  { href: "#sensory", label: "Sensory-Friendly", icon: Accessibility },
  { href: "#getting-here", label: "Getting Here", icon: Car },
  { href: "#history", label: "The History", icon: History },
  { href: "#events", label: "Events", icon: CalendarDays },
  { href: "#faq", label: "FAQs", icon: ChevronRight },
];

const TRADERS = [
  {
    unit: "01",
    name: "Tikka Bros",
    cuisine: "Indian street food",
    image: "/images/southport-market/traders/tikka-bros-and-their-mouthwatering-chicken-tikka-rice-bowl.webp",
    imageAlt: "Chicken tikka rice bowl at Tikka Bros, Southport Market",
    owner: null,
    ownerStory: null,
    signatureDishes: ["Chicken tikka rice bowl"],
    terryPick:
      "The newest arrival in the building, and the one with the least online presence. Indian street food has been underrepresented at the casual end in Southport for years. If the chicken tikka rice bowl is anything to go by, they have got the right idea.",
    dietary: [] as string[],
    hoursNote: null as string | null,
    badge: "Newest trader",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    unit: "02",
    name: "600 Degrees",
    cuisine: "Neapolitan wood-fired pizza",
    image: "/images/southport-market/traders/600d-tile.jpg",
    imageAlt: "Neapolitan pizza at 600 Degrees, Southport Market",
    owner: "Dan Johnstone",
    ownerStory:
      "Dan visited Naples on his honeymoon. He spent time learning the authentic Neapolitan method and came home determined to do it properly. The oven was designed and built in Naples. The dough is made fresh daily using only Caputo flour, proved for 24 hours. The tomatoes are San Marzano, from Campania. He has since opened a standalone restaurant in Hillside.",
    signatureDishes: ["Margherita", "Italian Stallion", "Moroccan Lamb", "Vegan Special", "Capricciosa"],
    terryPick:
      "Margherita first, always. If a pizzeria cannot do a good Margherita, nothing else matters. This one can. The Moroccan Lamb is worth trying second.",
    dietary: ["Vegan option"],
    hoursNote: null,
    badge: "Original trader",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    unit: "03",
    name: "Brunch N' Bagel",
    cuisine: "New York-inspired brunch, bagels and jacket potatoes",
    image: "/images/southport-market/traders/Brunch4.webp",
    imageAlt: "Brunch dishes at Brunch N Bagel, Southport Market",
    owner: "Leanne Prescott (24)",
    ownerStory:
      "Leanne started Cake Corner from home at 17. By 24 she runs two units inside Southport Market, a shop in Hillside, and caters at Edge Hill University. Brunch N' Bagel opened in October 2025 — inspired by time spent in New York — and is the first trader in the market to open at 10am. All meat comes from Blackhurst Butchers, next door at Unit 11.",
    signatureDishes: [
      "The Big Brunch Bite (Cumberland sausages, bacon, eggs, tater tots, black pudding)",
      "The Buffalo One (crispy chicken tenders, Frank's buffalo sauce, coleslaw, pickles)",
      "The Caprese One (pesto, mozzarella, tomatoes, rocket, balsamic glaze)",
      "Kids Lunch Box (with a Cake Corner brownie inside)",
    ],
    terryPick:
      "The Big Brunch Bite is what it says it is. If you want something lighter, the Caprese bagel is genuinely good. The kids lunch box has a Cake Corner brownie in it, which is the detail that wins children over immediately.",
    dietary: ["Vegan", "Vegetarian", "Gluten-free options"],
    hoursNote: "Open 10am–4pm. The only trader serving from 10am.",
    badge: "Open from 10am",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    unit: "04",
    name: "Pitamu",
    cuisine: "Greek street food",
    image: "/images/southport-market/traders/pitamu-chicken-strip-skewer.webp",
    imageAlt: "Chicken skewer at Pitamu Greek street food, Southport Market",
    owner: "Dino Kottis and Banico Zeniou",
    ownerStory:
      "Dino and Banico have over 40 years combined experience in hospitality, having run restaurants and takeaways in Greece and the UK. Pitamu opened on day one of the new-look market in July 2021 and has been there ever since. Banico also co-owns Lennys Smashport (Unit 10) with his wife Jodie.",
    signatureDishes: [
      "Yeeros (classic gyros-style wrap)",
      "Souvlaki (grilled skewer)",
      "Halloumi fries (rotating toppings: Hoisin and Spring Onion, Salt and Pepper, Tzatziki, Chilli and Lime)",
      "Chips with feta",
      "Greek salad",
    ],
    terryPick:
      "The halloumi fries with Hoisin topping sound wrong and taste right. For a proper meal, the yeeros wrap. Nearly 20,000 gyros a year. There is a reason.",
    dietary: ["Gluten-free dedicated fryer", "Vegetarian options", "Vegan options"],
    hoursNote: null,
    badge: "Original trader",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    unit: "05",
    name: "Cake Corner",
    cuisine: "Artisan cakes, brownies, waffles and milkshakes",
    image: "/images/southport-market/traders/cake-corner.webp",
    imageAlt: "Cakes and desserts at Cake Corner, Southport Market",
    owner: "Leanne Prescott (24)",
    ownerStory:
      "The same Leanne who runs Brunch N' Bagel. She opened Cake Corner from home at 17, her first shop in Hillside at 21, and the Southport Market unit six months after that. The unit has since expanded into larger premises inside the market. 33,000 cakes sold in a single year. Food hygiene rating: 5.",
    signatureDishes: [
      "Fresh-made waffles (made to order)",
      "Brownies and blondies",
      "Cookie pies",
      "Milkshakes",
      "Seasonal occasion cakes",
    ],
    terryPick:
      "The brownies are what the kids ask for by name. The waffles are made fresh. If you are bringing children to the market, this is where you will end up whether you planned to or not.",
    dietary: [] as string[],
    hoursNote: "Wed–Thu 9am–9pm, Fri–Sat 9am–10pm, Sun 10am–6:30pm",
    badge: "33,000 cakes a year",
    badgeColor: "bg-pink-100 text-pink-800",
  },
  {
    unit: "08",
    name: "Pasta 51 Express",
    cuisine: "Fresh handmade Italian pasta",
    image: "/images/southport-market/traders/pasta51-tile.webp",
    imageAlt: "Fresh pasta dishes at Pasta 51 Express, Southport Market",
    owner: "Attilio Sergi",
    ownerStory:
      "Attilio was born in Santa Maria di Leuca, Puglia — the heel of Italy, where his family grew wheat for pasta. He has 45 years in the food business. He came to Southport twenty years ago and opened Trattoria 51 on the Promenade in 2003, which is still there. He also runs Trattoria 51 on Old Hall Street in Liverpool. Pasta 51 Express is the fast-casual market version of his craft.",
    signatureDishes: [
      "Orecchiette with cacio e pepe",
      "Pappardelle with slow-cooked bolognese",
      "Spaghetti bucatini with arrabiata",
      "Fresh ravioli",
      "Suppli (Roman rice balls, as a starter)",
      "Antipasti misto",
      "Panzerotti",
    ],
    terryPick:
      "Orecchiette with cacio e pepe. Simple, done properly. The suppli as a starter is underrated. Most people walk past it. Attilio has been making pasta by hand since childhood. It shows.",
    dietary: ["Vegan options", "Gluten-free options"],
    hoursNote: null,
    badge: "45 years of experience",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    unit: "09",
    name: "Little Korean Kitchen",
    cuisine: "Korean street food",
    image: "/images/southport-market/traders/korean-5-scaled.webp",
    imageAlt: "Korean fried chicken at Little Korean Kitchen, Southport Market",
    owner: "Taeyeop Kim (manager: Eddie Weights)",
    ownerStory:
      "Taeyeop built his reputation at Korean Kitchen in Hillside before opening the Korean Kitchen restaurant at 509 Lord Street in 2023. The Southport Market unit is a streamlined, fast-casual version of the Lord Street menu, designed for quicker service in a market setting. It had queues on opening weekend.",
    signatureDishes: [
      "Korean Fried Chicken (boneless breast, house-made sticky sauces)",
      "Korean Corndogs (pork sausage or mozzarella in Panko batter, with ketchup, honey mustard and sugar)",
      "Korean Katsu Cups",
      "Korean Cupbab (rice bowl)",
      "Chicken Salad Boxes",
    ],
    terryPick:
      "The Korean Fried Chicken is the main event. Boneless breast, sauces made here. If you have teenagers they will find the corndogs on TikTok before you finish reading this sentence. Worth the fuss.",
    dietary: [] as string[],
    hoursNote: null,
    badge: "Viral on TikTok",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    unit: "10",
    name: "Lennys Smashport",
    cuisine: "Smash burgers and seafood",
    image: "/images/southport-market/traders/burger-and-chips-classiv.webp",
    imageAlt: "Smash burger and chips at Lennys Smashport, Southport Market",
    owner: "Banico and Jodie Zeniou",
    ownerStory:
      "Named after Lenny Goldwater, grandfather of Banico and Jodie Zeniou. Banico also co-owns Pitamu (Unit 04) with Dino Kottis. The Zeniou family also own the Fylde Fish Bar fish and chip shops. All meat at Lennys is sourced from Blackhurst Butchers next door at Unit 11. That is not a marketing line. It is just how it works.",
    signatureDishes: [
      "Fresh beef smash burgers",
      "Chicken smash burgers",
      "Seafood options (setting it apart from standard burger stalls)",
    ],
    terryPick:
      "A smash burger done properly is better than most pub burgers at twice the price. The seafood element is what makes this one different. The meat is from Blackhurst ten feet away.",
    dietary: [] as string[],
    hoursNote: null,
    badge: "Meat from Blackhurst next door",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    unit: "11",
    name: "Blackhurst Butchers",
    cuisine: "Traditional butcher — dry-aged beef, handmade sausages, BBQ packs",
    image: "/images/southport-market/traders/blackhurst-butchers-tile.webp",
    imageAlt: "Blackhurst Butchers at Southport Market, established 1963",
    owner: "Tony Blackhurst",
    ownerStory:
      "Tony started here as a Saturday boy aged 12, following in his father John's footsteps. John opened the shop in 1963. There were five butchers in Southport Market alone in the 1980s. Tony is the last one in the whole town centre. Customers drive from Wigan, Liverpool, Chorley, St Helens. One drives from Wimbledon and fills up his car. Another takes sausages home to Scotland. BBC Radio Merseyside covered the 60th anniversary.",
    signatureDishes: [
      "28-day dry-aged beef on the bone (Cumbrian farms)",
      "Handmade sausages (Cumberland, Olde English, Garlic and Herb, Sausage of the Week)",
      "Homemade sausage rolls and burgers",
      "BBQ Pack A (£23): pork steaks, burgers, sausages, koftas, kebabs",
      "BBQ Pack B (£34): extends Pack A with Welsh lamb chops and rump steaks",
      "Ready meals: stuffed chicken breast, fillet steak Cantonese, bacon ribs",
      "Dry-cured bacon",
    ],
    terryPick:
      "Tony Blackhurst started here as a Saturday boy at twelve. His dad opened the shop in 1963. The reason people drive from Wigan and Wimbledon is the 28-day dry-aged beef. The sausages are what I would tell you to take home. And check the sausage of the week before you decide.",
    dietary: [] as string[],
    hoursNote: "Mon–Sat 9am–5pm (open when the rest of the market is closed on Mon and Tue)",
    badge: "Est. 1963",
    badgeColor: "bg-stone-100 text-stone-700",
  },
];

const TIMING = [
  {
    when: "Wednesday lunch (12–2pm)",
    crowd: "Quiet",
    crowdColor: "bg-green-100 text-green-700",
    description:
      "Most traders have just opened. You will find a seat immediately. No live music. The quietest full-service window of the week.",
    bestFor: "Anyone wanting a calm meal. Ideal for sensory-sensitive visitors and families with young children.",
  },
  {
    when: "Thursday evening",
    crowd: "Moderate",
    crowdColor: "bg-amber-100 text-amber-700",
    description: "Live music night. Busier than lunchtime but not yet at weekend capacity. Good atmosphere without being heaving.",
    bestFor: "Date night. Friends catching up. The best balance of buzz and space.",
  },
  {
    when: "Friday evening",
    crowd: "Busy",
    crowdColor: "bg-orange-100 text-orange-700",
    description:
      "Full. Louder. The weekend crowd arrives from early evening. Some traders will have a short queue at peak.",
    bestFor: "Groups, nights out, people who enjoy a lively atmosphere.",
  },
  {
    when: "Saturday afternoon",
    crowd: "Peak",
    crowdColor: "bg-red-100 text-red-700",
    description:
      "Every trader busy. Communal seating fills up. Worth it but plan for a wait at the busiest units.",
    bestFor: "Families doing a full town day. Come early (before noon) to avoid the peak.",
  },
  {
    when: "Saturday evening",
    crowd: "Peak",
    crowdColor: "bg-red-100 text-red-700",
    description: "The main event. Full dining hall, cocktails at the bar, events likely in the Extravaganza Room.",
    bestFor: "Nights out. Groups who want the full atmosphere.",
  },
  {
    when: "Sunday lunch",
    crowd: "Comfortable",
    crowdColor: "bg-sky-100 text-sky-700",
    description:
      "Family day. More relaxed than Saturday. A good balance of atmosphere and space. Popular with dog walkers post-beach.",
    bestFor: "Families, dog walkers, people wanting a relaxed midweek-feel on a weekend.",
  },
  {
    when: "Weekday morning (10am–noon)",
    crowd: "Quiet",
    crowdColor: "bg-green-100 text-green-700",
    description:
      "Only Brunch N' Bagel is open at 10am. Other traders start from noon. Coffee and a bagel before the market opens properly.",
    bestFor: "Early risers. People who want brunch before a day out in Southport.",
  },
];

const HISTORIC_IMAGES = [
  { src: "/images/southport-market/historic/market-historic-one.webp", alt: "Southport Market in its traditional market days" },
  { src: "/images/southport-market/historic/market-historic-two.webp", alt: "Southport Market historical photograph" },
  { src: "/images/southport-market/historic/market-historic-three.webp", alt: "Southport Market historical interior" },
  { src: "/images/southport-market/historic/market-historic-four.webp", alt: "Southport Market stalls in the original market" },
  { src: "/images/southport-market/historic/market-historic-five.webp", alt: "Southport Market traders in earlier years" },
];

const EVENTS_LIST = [
  { name: "Live Music", freq: "Every Thursday", image: "/images/southport-market/interior/live-band.webp", objectPosition: "object-center", desc: "Regular live music on Thursday evenings at the Market Bar.", href: "/guides/live-music-southport" },
  { name: "Comedy Bingo", freq: "Winter months", image: "/images/blog/blog-comedy-lineup.webp", objectPosition: "object-center", desc: "Winter events specifically designed to get people out of the house. Run with community isolation in mind.", href: null },
  { name: "Teddyfest", freq: "Annual", image: "/images/southport-market/events/teddyfest.webp", objectPosition: "object-top", desc: "Family-focused event. Kids bring their bears.", href: null },
  { name: "Easter Wonderland", freq: "Easter", image: "/images/southport-market/events/easter-wonderland-poster.webp", objectPosition: "object-top", desc: "Family Easter events including Bounce Mania and themed activities.", href: "/guides/easter-in-southport-2026" },
  { name: "The Big Night Out", freq: "Regular", image: "/images/southport-market/events/the-big-night-out-event-poster.webp", objectPosition: "object-top", desc: "Evening entertainment events in the Extravaganza Room.", href: null },
  { name: "Artisan Market", freq: "Monthly", image: "/images/guides/southport-artisan-market.jpg", objectPosition: "object-center", desc: "50+ independent makers and food producers on Market Street outside the main building. Free entry.", href: "/guides/southport-artisan-market" },
];

const FAQS = [
  {
    q: "What time does Southport Market open?",
    a: "Wednesday and Thursday 10am to 10pm. Friday and Saturday 10am to 11pm. Sunday 10am to 8:30pm. Closed Monday and Tuesday. Brunch N' Bagel is the only trader open from 10am. Most other traders start serving from around noon.",
  },
  {
    q: "Can you book a table at Southport Market?",
    a: "No. Walk-in only. No reservations are accepted at any trader or at the Market Bar. This is deliberate. Turn up, find a seat, order from whichever trader you want. The communal seating means you are not tied to one unit.",
  },
  {
    q: "Is Southport Market dog friendly?",
    a: "Yes. Dogs are welcome throughout the market. Water stations are provided. Guide dogs and assistance dogs are of course welcome. We have seen dogs in there on a regular basis.",
  },
  {
    q: "Is there gluten-free food at Southport Market?",
    a: "Yes. Pitamu has a dedicated gluten-free fryer and is the safest choice for coeliac visitors. Brunch N' Bagel, Pasta 51 Express, and other traders also offer GF options. Talk directly to the trader at the counter about allergens — the open-counter format makes this straightforward.",
  },
  {
    q: "Is Southport Market wheelchair accessible?",
    a: "Yes. Ramps on the main entrance, ample space around the bar area for wheelchairs and mobility scooters, accessible toilets throughout, and a Changing Places toilet with hoist, adult changing bench, curtains for privacy, and carer space. It is well equipped.",
  },
  {
    q: "Where do I park for Southport Market?",
    a: "Market Street car park is directly adjacent. Tulketh Street car park is a five-minute walk. Lord Street car parks are five to eight minutes on foot. Postcode: PR8 1LA. Note that Market Street was being pedestrianised in 2025 — check current road access before driving to the door.",
  },
  {
    q: "How old is Southport Market?",
    a: "The building has been a traditional indoor market on King Street since at least 1963, when Blackhurst Butchers opened. At its peak there were five butchers here plus poultry stalls and a specialist pork butcher. The food and drink hall you see today opened on 22 July 2021 after a £1.4 million transformation.",
  },
  {
    q: "Can you hire the Extravaganza Room for private events?",
    a: "Yes. The Extravaganza Room handles weddings, parties, corporate events, conferences, live bands, and performance shows. Smaller function rooms are also available for meetings. Use the enquiry button in the events section above, or visit southportmarket.com directly.",
  },
  {
    q: "What is the best thing to eat at Southport Market?",
    a: "Depends what you are after. For pizza: 600 Degrees Margherita. For something Greek: Pitamu halloumi fries or the yeeros. For pasta: Pasta 51 orecchiette with cacio e pepe. For brunch: Brunch N' Bagel Big Brunch Bite. For Korean: Little Korean Kitchen fried chicken. For a burger: Lennys Smashport. For something sweet: Cake Corner brownies or a fresh waffle.",
  },
  {
    q: "Is Southport Market good for autistic visitors or families with sensory sensitivities?",
    a: "The open-plan layout, wide sightlines, Changing Places toilet, and dietary flexibility make it structurally accessible. Wednesday and Thursday lunchtimes are the quietest windows. Every trader has large print menus. Food can be taken away from every unit if the interior is too busy. Full detail is in the sensory-friendly section of this guide.",
  },
];

export default function SouthportMarketPage() {
  return (
    <GuideLayout guide={GUIDE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* ── Hero ── */}
      <div className="relative min-h-[80vh] flex items-end bg-[#1B2E4B] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/southport-market/exterior/entrance-main-signage.webp"
            alt="Southport Market entrance on King Street, PR8 1LA"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 pb-16 pt-32 max-w-7xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Food &amp; Drink Guide
              </span>
              <span className="text-white/50 text-xs font-medium">King Street · PR8 1LA</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
              Southport
              <span className="block text-[#C9A84C]">Market</span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mb-8 leading-relaxed">
              Nine independent traders, one bar, live music, and the best lunch in town.
              The complete guide — every trader reviewed, what to order, and honest advice on when to go.
            </p>

            {/* Quick facts strip */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: MapPin, text: "PR8 1LA" },
                { icon: Clock, text: "Wed–Sun from 10am" },
                { icon: Dog, text: "Dog friendly" },
                { icon: Accessibility, text: "Fully accessible" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" />
                  <span className="text-white/80 text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#traders"
                className="bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] px-7 py-3.5 rounded-full font-bold text-sm transition-colors"
              >
                See the Traders
              </a>
              <a
                href="#sensory"
                className="bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-colors hover:bg-white/20"
              >
                Sensory-Friendly Info →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Quick Nav ── */}
      <div className="sticky top-16 z-20 bg-[#1B2E4B]/97 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-0.5 overflow-x-auto py-2.5 scrollbar-hide">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-white/60 hover:text-[#C9A84C] text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap transition"
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── At a Glance ── */}
      <div className="bg-[#1B2E4B] text-white">
        <div className="container mx-auto px-4 max-w-7xl py-10">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">At a glance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: UtensilsCrossed, label: "Traders", value: "9 independents", sub: "plus the Market Bar" },
              { icon: Star, label: "Bar of the Year", value: "Won it twice", sub: "public vote, two years running" },
              { icon: Users, label: "Meals per year", value: "Nearly 500,000", sub: "meals and drinks" },
              { icon: Heart, label: "No reservations", value: "Walk-in only", sub: "every day it is open" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center">
                <item.icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{item.label}</p>
                <p className="text-white font-bold text-sm mt-0.5">{item.value}</p>
                <p className="text-white/50 text-[11px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 max-w-7xl py-14 space-y-20">

        {/* Terry's Take */}
        <section>
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">Terry&apos;s Take</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-5">What Southport Market actually is</h2>
            <div className="grid md:grid-cols-2 gap-6 text-white/75 leading-relaxed text-[15px]">
              <div className="space-y-4">
                <p>
                  I have eaten in this building more times than I can count. The old market,
                  with its six butchers and fabric stalls, was a different place entirely. What it became in
                  2021 is something Southport needed and did not know it needed.
                </p>
                <p>
                  Nine independent food traders, a proper bar, live music on Thursdays, regular events,
                  and the kind of atmosphere that makes you stay longer than you planned. It is not fancy.
                  It is not trying to be. It is just very good at what it does.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  A group of ten people can walk in and every single one can eat something completely
                  different. Greek street food, Neapolitan pizza, handmade pasta, Korean fried chicken,
                  smash burgers, New York bagels. That range, at market prices, in one building, with no
                  booking required, is genuinely unusual.
                </p>
                <p>
                  The waiting list for trader units tells you everything about whether it is working.
                  There is one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Traders ── */}
        <section id="traders" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The food</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">The Traders</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              Every trader reviewed. What they do, who runs it, what to order, and the honest opinion.
            </p>
          </div>

          <div className="space-y-6">
            {TRADERS.map((trader) => (
              <div
                key={trader.unit}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#C9A84C]/30 transition-all"
              >
                <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                  {/* Image */}
                  <ImageLightbox
                    src={trader.image}
                    alt={trader.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    containerClassName="relative h-56 md:h-auto min-h-[200px] bg-[#1B2E4B]/5 flex-shrink-0"
                    imageClassName="object-cover"
                  >
                    {/* Unit badge */}
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="bg-[#1B2E4B] text-[#C9A84C] text-xs font-black px-2.5 py-1 rounded-full">
                        Unit {trader.unit}
                      </span>
                    </div>
                  </ImageLightbox>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-start gap-2 mb-3">
                      <h3 className="font-display font-bold text-[#1B2E4B] text-xl">{trader.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${trader.badgeColor}`}>
                        {trader.badge}
                      </span>
                    </div>

                    <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-wide mb-3">{trader.cuisine}</p>

                    {trader.hoursNote && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-500 text-xs font-medium">{trader.hoursNote}</p>
                      </div>
                    )}

                    {trader.ownerStory && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{trader.ownerStory}</p>
                    )}

                    {/* Signature dishes */}
                    <div className="mb-4">
                      <p className="text-xs font-bold text-[#1B2E4B] uppercase tracking-wide mb-2">On the menu</p>
                      <ul className="space-y-1">
                        {trader.signatureDishes.map((dish) => (
                          <li key={dish} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-[#C9A84C] mt-1 flex-shrink-0">·</span>
                            {dish}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dietary badges */}
                    {trader.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {trader.dietary.map((d) => (
                          <span key={d} className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Terry's pick */}
                    <div className="bg-[#FAF8F5] border border-[#C9A84C]/20 rounded-xl px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C] mb-1">Terry&apos;s take</p>
                      <p className="text-[#1B2E4B] text-sm leading-relaxed font-medium">{trader.terryPick}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Market Bar ── */}
        <section id="bar" className="scroll-mt-28">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <ImageLightbox
              src="/images/southport-market/interior/the-bar-tile.webp"
              alt="The Market Bar at Southport Market — carousel-inspired centrepiece"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              containerClassName="relative rounded-2xl overflow-hidden h-72 md:h-full min-h-[280px]"
              imageClassName="object-cover"
            >
              <div className="absolute bottom-4 left-5 pointer-events-none">
                <span className="bg-[#C9A84C] text-[#1B2E4B] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Bar of the Year — twice
                </span>
              </div>
            </ImageLightbox>

            <div className="bg-[#FAF8F5] border border-[#C9A84C]/25 rounded-2xl p-7 md:p-9">
              <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">At the centre of it all</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B] mb-5">The Market Bar</h2>
              <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed mb-6">
                <p>
                  The carousel-inspired bar in the middle of the building is the visual centrepiece and the
                  social anchor. It won the Southport BID Bar of the Year Award two years in a row. Voted by the
                  public, not a panel.
                </p>
                <p>
                  Cocktails, locally brewed cask ales, a serious gin selection, and flat whites made with
                  Crosby Coffee beans. The kind of coffee offer that suggests someone thought about it rather
                  than just ticking a box.
                </p>
                <p>
                  If you are here with a group and everyone wants something different to eat, the bar is where
                  you anchor. Order a drink, fan out to the traders, and reconvene. That is how it works.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Cocktails", detail: "Full cocktail menu" },
                  { label: "Cask ales", detail: "Locally brewed" },
                  { label: "Gin selection", detail: "Large selection" },
                  { label: "Coffee", detail: "Crosby Coffee flat whites" },
                ].map(({ label, detail }) => (
                  <div key={label} className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-3">
                    <p className="font-bold text-[#1B2E4B] text-sm">{label}</p>
                    <p className="text-gray-500 text-xs">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── When to Visit ── */}
        <section id="timing" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Plan your visit</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">When to Visit</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The honest timing guide. Wednesday lunch and Friday night are completely different experiences.
              Both are worth doing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIMING.map(({ when, crowd, crowdColor, description, bestFor }) => (
              <div key={when} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <p className="font-display font-bold text-[#1B2E4B] text-sm leading-snug">{when}</p>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${crowdColor}`}>
                    {crowd}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
                <div className="bg-[#FAF8F5] rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-semibold text-[#1B2E4B]">Best for: </span>
                    {bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1B2E4B] rounded-2xl p-6 md:p-8">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">The short version</p>
            <p className="text-white text-base leading-relaxed">
              If you want to hear yourself think, Wednesday or Thursday lunchtime. If you want the full atmosphere,
              Friday or Saturday evening. Both are worth doing for completely different reasons. There is no wrong answer
              as long as you know what you are walking into.
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Hours vary on bank holidays and during special events. Always confirm before travelling at{" "}
            <a
              href="https://southportmarket.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] font-semibold hover:underline"
            >
              southportmarket.com
            </a>
            .
          </p>
        </section>

        {/* ── Sensory-Friendly ── */}
        <section id="sensory" className="scroll-mt-28">
          <div className="bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] border border-blue-100 rounded-2xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Accessibility className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-1">Accessibility</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B]">
                      Sensory-Friendly Visiting
                    </h2>
                  </div>
                </div>
                <Image
                  src="/images/southport-market/southport-guide-autism-badge.png"
                  alt="Southport Guide Autism Friendly"
                  width={80}
                  height={80}
                  className="flex-shrink-0 rounded-lg"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    Southport Market is not a quiet venue by design. On a Friday evening it is loud, busy, and full
                    of energy. But if you know when to visit and what to expect, it is one of the more accessible food
                    halls in the region.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    The open-plan layout is important. There are no narrow corridors, no cramped entries, no
                    surprise rooms. You can see the whole space from the entrance. For visitors who find enclosed or
                    unpredictable environments difficult, this matters.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    The Changing Places toilet has been specifically praised for its facilities. It includes a hoist,
                    adult-sized changing bench, curtains for privacy, and dedicated carer space. This is not standard.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-[#1B2E4B] text-sm uppercase tracking-wide mb-3">What the market provides</p>
                  {[
                    { feature: "Ramps on main entrance", detail: "Full step-free access throughout" },
                    { feature: "Wheelchair and scooter access", detail: "Ample space around the bar area and all traders" },
                    { feature: "Changing Places toilet", detail: "Hoist, adult bench, carer space, privacy curtains" },
                    { feature: "Large print yellow menus", detail: "Available at every trader unit" },
                    { feature: "Highchairs", detail: "Available throughout" },
                    { feature: "Takeaway from every trader", detail: "Eat outside if the interior is too much" },
                    { feature: "Dog water stations", detail: "Assistance dogs and guide dogs welcome" },
                  ].map(({ feature, detail }) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-[10px] font-black">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B2E4B] text-sm">{feature}</p>
                        <p className="text-gray-500 text-xs">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing advice */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <p className="font-bold text-green-800 text-sm mb-2">Best windows for sensory-sensitive visits</p>
                  <ul className="space-y-1.5">
                    {[
                      "Wednesday or Thursday, 12pm–2pm (quietest full-service window, no live music)",
                      "Sunday lunch (calmer than Saturday, good atmosphere)",
                      "Weekday morning 10am–noon (Brunch N' Bagel only, very quiet)",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-green-700 text-xs leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">·</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="font-bold text-amber-800 text-sm mb-2">Higher-stimulus windows</p>
                  <ul className="space-y-1.5">
                    {[
                      "Thursday evening onward (live music at the bar)",
                      "Friday and Saturday evenings (full capacity, loud)",
                      "The carousel bar area is the loudest zone — seat away from it if noise is a concern",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-amber-700 text-xs leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">·</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Gluten-free note */}
              <div className="bg-white border border-blue-100 rounded-xl p-5 mb-6">
                <p className="font-bold text-[#1B2E4B] text-sm mb-2">Dietary and allergen support</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pitamu (Unit 04) has a dedicated gluten-free fryer and staff trained specifically on allergen
                  management — it is the safest choice for coeliac visitors. Brunch N' Bagel, Pasta 51 Express, and
                  Little Korean Kitchen all have vegan and vegetarian options clearly available. Because the format
                  is open-counter, you can have a direct conversation with the person making your food. That is
                  genuinely easier than managing allergens in a full restaurant.
                </p>
              </div>

              <div className="bg-blue-600 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">We want to hear from you</p>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  We are working with Sefton Council to improve sensory-friendly information for venues across
                  Southport. If you have visited Southport Market as an autistic person or with an autistic family
                  member, your experience would genuinely help improve this guide.
                </p>
                <a
                  href="mailto:hello@seftoncoast.network?subject=Southport Market sensory-friendly feedback"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-xs px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Share your experience <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="mt-5">
                <Link
                  href="/guides/autism-friendly-southport"
                  className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
                >
                  Full autism-friendly Southport guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Getting Here ── */}
        <section id="getting-here" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Finding it</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Getting Here</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {/* By car */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#1B2E4B]/5 flex items-center justify-center mb-4">
                <Car className="w-5 h-5 text-[#1B2E4B]" />
              </div>
              <h3 className="font-display font-bold text-[#1B2E4B] mb-3">By car</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-[#1B2E4B] text-sm">Postcode</p>
                  <p className="text-gray-600 text-sm font-mono bg-gray-50 rounded px-2 py-1 inline-block mt-1">PR8 1LA</p>
                </div>
                <div>
                  <p className="font-semibold text-[#1B2E4B] text-sm">Nearest car parks</p>
                  <ul className="text-gray-600 text-sm space-y-1 mt-1">
                    <li>· Market Street car park (adjacent, directly next door)</li>
                    <li>· Tulketh Street car park (5-min walk)</li>
                    <li>· Lord Street car parks (5–8 min walk)</li>
                  </ul>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Market Street was pedestrianised in 2025. Check current access before driving to the door.
                  See our{" "}
                  <Link href="/guides/parking-southport" className="text-[#C9A84C] hover:underline font-semibold">
                    full parking guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* By train */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#1B2E4B]/5 flex items-center justify-center mb-4">
                <Train className="w-5 h-5 text-[#1B2E4B]" />
              </div>
              <h3 className="font-display font-bold text-[#1B2E4B] mb-3">By train</h3>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>Northern Rail from Liverpool Lime Street to Southport station. Around 45 minutes.</p>
                <p>The market is a 12-minute walk from the station, or a short taxi ride.</p>
                <p>From Manchester, change at Liverpool Lime Street or Wigan.</p>
              </div>
            </div>

            {/* On foot */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#1B2E4B]/5 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5 text-[#1B2E4B]" />
              </div>
              <h3 className="font-display font-bold text-[#1B2E4B] mb-3">From Lord Street</h3>
              <div className="space-y-3 text-gray-600 text-sm">
                <p>Three minutes on foot. Walk to the bottom of Lord Street and turn onto King Street. The market entrance is on the corner of King Street and Market Street.</p>
                <p>Multiple bus routes serve Lord Street — it is Southport&apos;s main stop.</p>
              </div>
            </div>
          </div>

          {/* Philly cheese video — Brunch N' Bagel */}
          <div className="rounded-2xl overflow-hidden h-[380px] md:h-[480px] bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block"
            >
              <source src="/videos/southport-market/philly-cheese-brunch-bagel.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Exciting callout */}
          <div className="mt-6 bg-[#1B2E4B] rounded-2xl p-7 md:p-9">
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-3">New at Brunch N&apos; Bagel · Unit 03</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              The Philly Cheese Has Landed.
            </h3>
            <p className="text-white/70 text-[15px] leading-relaxed mb-4">
              Thin-cut ribeye, griddled onions and peppers, melted cheese, loaded into a proper hoagie roll.
              Brunch N&apos; Bagel have form for doing this — they take a classic and they nail it.
              This is the kind of thing that sells out before most people know it&apos;s on the menu.
            </p>
            <p className="text-white/50 text-sm">
              Unit 03 · Southport Market · King Street · PR8 1LA · Wednesday to Sunday
            </p>
          </div>
        </section>

        {/* ── The People Behind the Food ── */}
        <section>
          <div className="bg-[#FAF8F5] border border-gray-200 rounded-2xl p-8 md:p-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The community</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1B2E4B] mb-6">
              The People Behind the Food
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8 max-w-3xl">
              You hear &ldquo;food hall&rdquo; and you might think of chains sharing a roof. This is not that.
              These are local families who know each other, support each other, and in some cases supply each other.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Prescott operation",
                  body: "Leanne Prescott started Cake Corner from home at 17. She is now 24 and runs two units inside the market (Cake Corner and Brunch N' Bagel), a shop in Hillside, and caters at Edge Hill University. She sources her meat from Blackhurst Butchers next door. That is not a standard career trajectory for someone in their mid-twenties.",
                },
                {
                  title: "The Zeniou family",
                  body: "Banico and Jodie Zeniou run Lennys Smashport. Banico also co-owns Pitamu with Dino Kottis. One family, two cuisines, two units. The Zeniou family also own the Fylde Fish Bar fish and chip shops. Lennys is named after Lenny Goldwater, Banico's grandfather.",
                },
                {
                  title: "The supply chain",
                  body: "Blackhurst Butchers supplies fresh meat to Lennys Smashport and to Brunch N' Bagel. Three separate businesses, one supply chain, all inside the same building. Tony Blackhurst started here as a Saturday boy at twelve. His father opened the shop in 1963. The last butcher in Southport town centre, supplying two of the town's most talked-about new food traders.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-white rounded-xl p-6 border border-gray-100">
                  <h3 className="font-display font-bold text-[#1B2E4B] mb-3 text-base">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── History — dark section, full width ── */}
      <section id="history" className="scroll-mt-28 bg-[#1B2E4B] py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">The story</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              From traditional market to food hall
            </h2>
            <p className="text-white/60 mt-3 max-w-2xl text-lg leading-relaxed">
              The building on King Street has been a market since at least 1963. What happened between then and
              now is worth knowing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
              <p>
                At its peak, Southport Market had six butchers operating inside it. Plus poultry stalls, a
                specialist pork butcher, wool shops, fabric outlets, a sweet shop, card shops. A proper northern
                indoor market. Blackhurst Butchers opened in 1963, when John Blackhurst started the business.
                His son Tony started there as a Saturday boy aged twelve.
              </p>
              <p>
                Internet shopping and the big supermarkets gradually hollowed it out. By the late 2010s, the
                building was nearly empty. Anyone who grew up in Southport remembers walking through it and seeing
                more closed shutters than open ones.
              </p>
              <p>
                Sefton Council drew up a plan to transform it into a food and drink hall, inspired by what
                Altrincham Market had done in Greater Manchester. When Town Deal funding from the Government
                became available, they had a scheme ready to go.
              </p>
            </div>
            <div className="space-y-5 text-white/75 leading-relaxed text-[15px]">
              <p>
                The transformation cost £1.4 million: £900,000 from the Southport Town Deal, £500,000 from the
                Liverpool City Region Combined Authority. DV8 Design created the seaside fairground theme.
                The carousel bar became the visual centrepiece.
              </p>
              <p>
                The new-look Southport Market opened on 22 July 2021. Nearly 500,000 meals and drinks served in
                a single year. Named in the UK&apos;s top ten seaside markets. The Market Bar won Southport Bar
                of the Year two years running.
              </p>
              <p>
                The regeneration impact spread beyond the building. The McDonald&apos;s unit that had been empty
                for a decade was finally sold. Connolly&apos;s Irish pub opened. Quicksilver Music expanded.
                Season Coffee opened on Market Street. There is now a waiting list of food traders wanting a unit.
                That is the measure.
              </p>
            </div>
          </div>

          {/* Historic photo gallery */}
          <div>
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-4">Historic images</p>
            <GalleryLightbox
              images={HISTORIC_IMAGES}
              gridClassName="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"
              itemClassName="aspect-square rounded-xl bg-white/5"
              imageClassName="object-cover"
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
            />
            <p className="text-white/30 text-xs mt-3">
              Historic images courtesy of Southport Market. Used with permission.
            </p>
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section id="events" className="scroll-mt-28 bg-[#FAF8F5] border-t border-gray-100 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">What&apos;s on</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">Events and the Extravaganza Room</h2>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg leading-relaxed">
              The market runs a busy events calendar throughout the year. The Extravaganza Room is available for
              private hire. And something is almost always happening.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {EVENTS_LIST.map(({ name, freq, image, objectPosition, desc, href }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                {image && (
                  <ImageLightbox
                    src={image}
                    alt={`${name} at Southport Market`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    containerClassName="relative h-72 overflow-hidden"
                    imageClassName={`object-cover transition-transform duration-500 group-hover:scale-105 ${objectPosition ?? "object-center"}`}
                  >
                    <span className="absolute bottom-4 right-4 bg-white/90 text-[#1B2E4B] text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
                      {freq}
                    </span>
                  </ImageLightbox>
                )}
                <div className="p-6">
                  <h3 className="font-display font-bold text-[#1B2E4B] text-lg mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  {href && (
                    <Link href={href} className="inline-flex items-center gap-1 mt-3 text-[#C9A84C] text-xs font-bold hover:underline">
                      Full guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Extravaganza Room */}
          <div className="bg-[#1B2E4B] rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-[1fr_260px] gap-8 items-center">
              <div>
                <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">Private hire</p>
                <h3 className="font-display text-2xl font-bold text-white mb-4">The Extravaganza Room</h3>
                <p className="text-white/70 text-[15px] leading-relaxed mb-5">
                  The multi-purpose function room handles weddings, birthday parties, corporate events,
                  conferences, networking, buffets, live bands, and performance shows. Smaller function rooms
                  are also available for meetings. The room is better than it sounds.
                </p>
                <a
                  href="https://southportmarket.com/information"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E8C87A] text-[#1B2E4B] font-bold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  Enquire about hire <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <ImageLightbox
                src="/images/southport-market/events/poster-offering-to-rent-the-extravaganze-room.webp"
                alt="The Extravaganza Room at Southport Market — available for private hire"
                fill
                sizes="(max-width: 768px) 100vw, 260px"
                containerClassName="relative rounded-xl overflow-hidden bg-[#0f1f38] aspect-[3/4] md:aspect-auto md:h-[360px]"
                imageClassName="object-contain"
              />
            </div>
          </div>

          {/* Artisan market cross-link */}
          <div className="mt-5">
            <Link
              href="/guides/southport-artisan-market"
              className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm hover:text-[#1B2E4B] transition-colors"
            >
              Southport Artisan Market guide (monthly, 50+ makers) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <section id="faq" className="scroll-mt-28">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Common questions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1B2E4B]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex gap-3 items-start">
                  <ChevronRight className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1B2E4B] mb-2 text-sm">{q}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Anchor for listings ── */}
      <div id="listings" className="scroll-mt-28" />
    </GuideLayout>
  );
}
