import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/southport-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Southport Guide`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header image */}
      <div className="relative h-72 md:h-96 bg-[#1B2E4B]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2E4B]/50 via-transparent to-[#1B2E4B]/80" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <span
            className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full mb-3"
            style={{ backgroundColor: post.categoryColor }}
          >
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Post meta */}
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 -mt-6 relative z-10 p-6 mb-8 flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {post.date}
          </div>
          <span className="text-gray-200">|</span>
          <span className="text-sm text-gray-500">Southport Guide Team</span>
        </div>

        {/* Placeholder content */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{post.excerpt}</p>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="font-display text-xl font-bold text-[#1B2E4B] mb-2">Full article coming soon</h3>
              <p className="text-gray-500 text-sm mb-4">
                We&apos;re working on this guide. Check back shortly or explore the rest of the site while you wait.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-[#1B2E4B] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#243d62] transition-colors"
                >
                  ← All blog posts
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#1B2E4B] font-semibold px-5 py-2.5 rounded-full text-sm hover:border-[#C9A84C]/50 transition-colors"
                >
                  What&apos;s on in Southport →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* More posts */}
        <h3 className="font-display text-xl font-bold text-[#1B2E4B] mb-5">More from the blog</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {BLOG_POSTS.filter((p) => p.slug !== slug).map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-md transition-all flex"
            >
              <div className="relative w-24 flex-none overflow-hidden">
                <Image
                  src={related.image}
                  alt={related.title}
                  fill
                  sizes="96px"
                  quality={60}
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{related.category}</span>
                <h4 className="font-bold text-[#1B2E4B] text-sm leading-snug group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                  {related.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
