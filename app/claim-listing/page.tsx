import Link from "next/link";

export const metadata = {
  title: "Claim Your Business Listing | SouthportGuide",
  description: "Claim your free business listing on SouthportGuide.co.uk. Update your details and add photos.",
};

export default function ClaimListingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Claim your listing</h1>
        <p className="text-gray-600 mb-8">
          Is your business already on SouthportGuide? Claim it to update your details, add photos and opening hours — or upgrade to a paid tier for more visibility.
        </p>
        <div className="bg-white rounded-xl shadow-md p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business name</label>
              <input
                type="text"
                placeholder="e.g. The Grand Hotel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your email</label>
              <input
                type="email"
                placeholder="you@business.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
              <textarea
                rows={3}
                placeholder="Tell us which listing is yours or what you'd like to update..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Request to claim listing
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            We&apos;ll email you a link to verify ownership and access your dashboard.
          </p>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t see your business? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> to get listed.
        </p>
      </div>
    </div>
  );
}
