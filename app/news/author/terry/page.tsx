import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Terry | Southport Live",
  description:
    "Terry is a 41-year-old Southport local who has lived in Churchtown his whole life. He writes the Southport Live news section. He tells it straight.",
  alternates: { canonical: "https://www.southportguide.co.uk/news/author/terry" },
  openGraph: {
    type: "profile",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Terry | Southport Live",
    description:
      "41-year-old Southport local. Lived in Churchtown his whole life. He writes the Southport Live news section.",
    url: "https://www.southportguide.co.uk/news/author/terry",
  },
  twitter: {
    card: "summary",
    site: "@SouthportGuide",
    title: "Terry | Southport Live",
    description: "41-year-old Southport local. Writes the Southport Live news section. He tells it straight.",
  },
};

async function getRecentArticles() {
  return prisma.newsItem.findMany({
    where: { status: { in: ["published", "auto_published"] } },
    orderBy: { publishedAt: "desc" },
    take: 12,
    select: {
      id: true,
      title: true,
      summary: true,
      slug: true,
      imageUrl: true,
      category: true,
      publishedAt: true,
      featured: true,
    },
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  planning: "Planning",
  crime: "Crime",
  "local-government": "Council",
  "emergency-services": "Emergency",
  transport: "Transport",
  sport: "Sport",
  community: "Community",
  food: "Food & Drink",
  events: "Events",
  flooding: "Flooding",
  housing: "Housing",
  business: "Business",
};

function formatDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function TerryAuthorPage() {
  const articles = await getRecentArticles();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Terry",
    jobTitle: "Local News Writer",
    description:
      "41-year-old Southport local. Lived in Churchtown his whole life. Married with four kids. Has a bulldog called Frank. Writes the Southport Live news section on SouthportGuide.co.uk.",
    url: "https://www.southportguide.co.uk/news/author/terry",
    image: "https://www.southportguide.co.uk/terry.jpg",
    sameAs: [
      "https://www.facebook.com/southportguide/",
      "https://x.com/SouthportGuide",
    ],
    worksFor: {
      "@type": "NewsMediaOrganization",
      name: "SouthportGuide.co.uk",
      url: "https://www.southportguide.co.uk",
      parentOrganization: {
        "@type": "Organization",
        name: "Churchtown Media",
        url: "https://www.churchtownmedia.co.uk",
      },
    },
    knowsAbout: ["Southport", "Merseyside", "Sefton Council", "Southport FC", "Merseyside Police", "Churchtown"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.southportguide.co.uk" },
      { "@type": "ListItem", position: 2, name: "Southport Live", item: "https://www.southportguide.co.uk/news" },
      { "@type": "ListItem", position: 3, name: "Terry", item: "https://www.southportguide.co.uk/news/author/terry" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, breadcrumbSchema]) }}
      />

      <div className="min-h-screen bg-[#F7F5F2]">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1B2E4B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-[#1B2E4B] transition-colors">Southport Live</Link>
            <span>/</span>
            <span className="text-gray-600">Terry</span>
          </nav>

          {/* Author card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10 shadow-sm">
            <div className="flex items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-[#1B2E4B]/10">
                  <Image
                    src="/terry.jpg"
                    alt="Terry, local news writer for SouthportGuide.co.uk"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#C9A84C] rounded-full border-2 border-white" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-xl font-bold text-[#1B2E4B] font-display">Terry</h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#C9A84C]/15 text-[#8a6820] rounded-full uppercase tracking-wide">
                    Southport Live
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-4">Local news writer, SouthportGuide.co.uk</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  41-year-old Southport local. Lived in Churchtown his whole life. Married with four kids. Has a bulldog called Frank. Knows the town the way only someone who has eaten in most of its restaurants, walked every stretch of the seafront, and watched it change over four decades can know it.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  He writes the Southport Live news section. He is not a promotional voice. He tells it straight.
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <a
                    href="https://x.com/SouthportGuide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1B2E4B] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @SouthportGuide
                  </a>
                  <a
                    href="https://www.facebook.com/southportguide/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#1B2E4B] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Recent articles */}
          <div>
            <h2 className="text-base font-bold text-[#1B2E4B] mb-5 font-display">
              Latest from Terry ({articles.length} articles)
            </h2>
            <div className="space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug ?? article.id}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-sm transition-all group"
                >
                  {article.imageUrl && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {article.featured && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#C9A84C]/15 text-[#8a6820] rounded-full uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">
                        {CATEGORY_LABELS[article.category] ?? article.category}
                      </span>
                      {article.publishedAt && (
                        <span className="text-[10px] text-gray-300">{formatDate(article.publishedAt)}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#1B2E4B] leading-snug group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                      {article.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2E4B] text-white text-sm font-semibold rounded-xl hover:bg-[#2a4a72] transition-colors"
              >
                All Southport Live stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
