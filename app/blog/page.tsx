import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Newspaper, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/southport-data";

export const metadata = {
  title: "Blog | Southport Guide",
  description:
    "Local guides, tips, and stories about Southport. Restaurants, events, hidden gems and more — written by people who live here.",
};

export default function BlogPage() {
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
            Local guides, tips &amp;<br />
            <span className="text-[#C9A84C]">Southport stories.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Written by people who live here. Everything from the best restaurants to where to stay for The Open — and the hidden gems visitors rarely find.
          </p>
        </div>
      </section>

      {/* Blog posts grid */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {BLOG_POSTS.map((post) => (
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
                <span
                  className="absolute bottom-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: post.categoryColor }}
                >
                  {post.category}
                </span>
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
          ))}
        </div>

        {/* Coming soon banner */}
        <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="font-display text-2xl font-bold text-[#1B2E4B] mb-2">More posts coming soon</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            We&apos;re adding new local guides every week — from the best spots for families to hidden gems, seasonal guides, and The Open 2026 coverage.
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
