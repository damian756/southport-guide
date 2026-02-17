export const metadata = {
  title: "Contact | SouthportGuide",
  description: "Contact SouthportGuide.co.uk. List your business, advertise, or get in touch.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h1>
        <p className="text-gray-600 mb-8">
          For listing claims, advertising, or general enquiries, get in touch.
        </p>
        <div className="bg-white rounded-xl shadow-md p-8">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Claim my listing</option>
                <option>Advertise / Premium listing</option>
                <option>The Open 2026 package</option>
                <option>MLEC Partner</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send message
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Run by <a href="https://churchtownmedia.co.uk" className="text-blue-600 hover:underline">Churchtown Media</a>, Southport.
        </p>
      </div>
    </div>
  );
}
