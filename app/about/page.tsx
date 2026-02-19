import Link from "next/link";

export const metadata = {
  title: "About SouthportGuide | Your Guide to Southport",
  description: "SouthportGuide.co.uk is the definitive visitor guide to Southport. Built by Churchtown Media.",
  alternates: { canonical: "https://www.southportguide.co.uk/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About SouthportGuide</h1>
        <p className="text-lg text-gray-700 mb-6">
          SouthportGuide.co.uk is your definitive guide to eating, staying, and exploring Southport. 
          We list hundreds of restaurants, hotels, attractions, and local businesses so you can plan the perfect visit.
        </p>
        <p className="text-gray-700 mb-6">
          With The Open Championship coming to Royal Birkdale in July 2026 and the Marine Lake Events Centre opening in April 2027, 
          Southport is set for a huge boost in visitors. We built this guide to help them discover the best of the town — and to help local businesses get found.
        </p>
        <p className="text-gray-700 mb-8">
          SouthportGuide is run by{" "}
          <a href="https://churchtownmedia.co.uk" className="text-blue-600 hover:underline font-medium">
            Churchtown Media
          </a>
          , a Southport-based digital agency. We&apos;re independent and commercially funded: businesses can pay for featured placement, 
          which keeps the site running and free for visitors to use.
        </p>
        <Link href="/contact" className="text-blue-600 font-medium hover:underline">
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
