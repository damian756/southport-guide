import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/southport-data";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog",
  description:
    "Local guides, tips and Southport stories, written by people who actually live here.",
  alternates: { canonical: "https://www.southportguide.co.uk/blog" },
  openGraph: {
    type: "website",
    siteName: "SouthportGuide.co.uk",
    locale: "en_GB",
    title: "Southport Guide Blog",
    description: "Local guides, tips and Southport stories — written by people who actually live here.",
    url: "https://www.southportguide.co.uk/blog",
    images: [{ url: "https://www.southportguide.co.uk/images/blog-hero-new.webp", width: 1200, height: 630, alt: "Southport Guide Blog — local guides and stories" }],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end bg-[#1B2E4B] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero-new.webp"
            alt="Southport town centre — local guides, tips and stories"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>

        <div className="relative w-full pb-16 pt-32 px-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.85)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-[#C9A84C] mb-4" style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.9))' }}>
              <Newspaper className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">Southport Guide Blog</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Local guides, tips &amp;<br className="hidden sm:block" />
              <span className="text-[#C9A84C]">Southport stories.</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-xl" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              Written by people who live here. Restaurants, events, local knowledge, and things worth knowing before you visit.
            </p>
          </div>
        </div>
      </section>

      {/* Server-rendered post index — invisible to users, crawlable by search engines */}
      <nav aria-hidden="true" className="sr-only">
        <ul>
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Interactive content (search + tabs + grid) ─────────────── */}
      <Suspense fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <BlogClient
          posts={BLOG_POSTS}
          categories={BLOG_CATEGORIES}
        />
      </Suspense>

      {/* ── Footer CTA ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-16 text-center border-t border-gray-100 pt-12">
        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-5">
          New guides added every week. Open 2026, local food, what&rsquo;s on, and everything in between.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/events"
            className="text-sm font-semibold text-[#1B2E4B] border border-[#1B2E4B]/20 px-5 py-2.5 rounded-full hover:bg-[#1B2E4B] hover:text-white transition-all"
          >
            Events calendar
          </a>
          <a
            href="/"
            className="text-sm font-semibold text-[#C9A84C] border border-[#C9A84C]/30 px-5 py-2.5 rounded-full hover:bg-[#C9A84C] hover:text-white transition-all"
          >
            Explore the guide
          </a>
        </div>
      </div>
    </div>
  );
}
