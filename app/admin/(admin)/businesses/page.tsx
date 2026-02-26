import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Businesses | Admin",
  description: "Manage businesses.",
  robots: { index: false, follow: false },
};

export default async function AdminBusinessesPage() {
  const businesses = await prisma.business.findMany({
    take: 100,
    orderBy: { name: "asc" },
    include: {
      category: { select: { name: true } },
    },
  });

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-bold text-[#1B2E4B] mb-6">
        Businesses
      </h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="text-left py-3 px-6 font-semibold text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-6 font-semibold text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-6 font-semibold text-gray-600">
                Claimed
              </th>
              <th className="text-left py-3 px-6 font-semibold text-gray-600">
                Hub Tier
              </th>
              <th className="text-right py-3 px-6 font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr
                key={b.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30"
              >
                <td className="py-4 px-6 font-medium text-[#1B2E4B]">
                  {b.name}
                </td>
                <td className="py-4 px-6 text-gray-600">{b.category.name}</td>
                <td className="py-4 px-6">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      b.claimed ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {b.claimed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-semibold text-[#1B2E4B]">
                    {b.hubTier}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/admin/businesses/${b.id}`}
                    className="text-[#C9A84C] font-semibold hover:text-[#B8972A] text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {businesses.length === 0 && (
          <p className="px-6 py-8 text-gray-500 text-sm">No businesses.</p>
        )}
      </div>
    </div>
  );
}
