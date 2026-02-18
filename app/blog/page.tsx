import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Newspaper, ArrowRight } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPostCategory } from "@/lib/southport-data";

export const metadata = {
  title: "Blog | Southport Guide",
  description:
    "Local guides, tips, and stories about Southport. Restaurants, events, hidden gems and more — written by people who live here.",
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return <BlogPageContent searchParams={searchParams} />;
}

async function BlogPageContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategorySlug } = await searchParams;

  const displayedPosts = activeCategorySlug
    ? BLOG_POSTS.filter((p) => p.categorySlug === activeCategorySlug)
    : BLOG_POSTS;

  const activeCategory = activeCategorySlug
    ? BLOG_CATEGORIES.find((c) => c.slug === activeCategorySlug)
    : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="bg-[#1B2E4B] relative overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        <div className="container mx-auto px-4 py-14 md:py-20 max-w-5xl relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to guide
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#C9A84C]" />
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Southport Guide Blog</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {activeCategory ? activeCategory.label : "Local guides, tips &"}
            {!activeCategory && (
              <>
                <br />
                <span className="text-[#C9A84C]">Southport stories.</span>
              </>
            )}
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            {activeCategory
              ? activeCategory.description
              : "Written by people who live here. From the best restaurants to hidden gems, events, and local knowledge."}
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex gap-2 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            <Link
              href="/blog"
              className={`flex-none text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                !activeCategorySlug
                  ? "bg-[#1B2E4B] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All posts
            </Link>
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              const count = BLOG_POSTS.filter((p) => p.categorySlug === cat.slug).length;
              if (count === 0) return null;
              return (
                <Link
                  key={cat.slug}
                  href={`/blog?category=${cat.slug}`}
                  className={`flex-none text-xs font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={isActive ? { backgroundColor: cat.color } : {}}
                >
                  {cat.label} <span className="opacity-60 ml-1">({count})</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {displayedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {displayedPosts.map((post) => {
              const cat = getBlogPostCategory(post);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {cat && (
                      <span
                        className="absolute bottom-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      >
                        {cat.label}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-display font-bold text-[#1B2E4B] text-lg leading-snug mb-2 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.date}</span>
                      <span className="text-[#C9A84C] font-semibold group-hover:translate-x-0.5 transition-transform inline-block">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold text-[#1B2E4B] mb-2">No posts in this category yet</h3>
            <p className="text-gray-400 mb-6">More posts are being added regularly.</p>
            <Link href="/blog" className="text-[#C9A84C] font-semibold hover:underline">
              ← View all posts
            </Link>
          </div>
        )}

        {/* Category cards */}
        {!activeCategorySlug && (
          <div className="mb-16">
            <h3 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">Browse by category</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {BLOG_CATEGORIES.map((cat) => {
                const count = BLOG_POSTS.filter((p) => p.categorySlug === cat.slug).length;
                if (count === 0) return null;
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog?category=${cat.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex-none"
                      style={{ backgroundColor: cat.color + "20" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1B2E4B] text-sm group-hover:text-[#C9A84C] transition-colors">{cat.label}</p>
                      <p className="text-gray-400 text-xs">{count} {count === 1 ? "post" : "posts"}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#C9A84C] transition-colors flex-none" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Coming soon */}
        <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">More posts coming soon</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            We&apos;re adding new local guides every week. From the best spots for families to seasonal guides and full Open 2026 coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-[#1B2E4B] hover:bg-[#243d62] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> View events calendar
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-[#C9A84C]/50 text-[#1B2E4B] font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Explore the guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
