import Link from "next/link";

export const metadata = {
  title: "Business Dashboard | SouthportGuide",
  description: "Manage your business listing on SouthportGuide.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage your listing, view analytics, and upgrade your plan. Sign in to continue.
        </p>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 mb-6">Authentication will be connected here (NextAuth).</p>
          <Link href="/claim-listing" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Claim your listing first →
          </Link>
        </div>
      </div>
    </div>
  );
}
