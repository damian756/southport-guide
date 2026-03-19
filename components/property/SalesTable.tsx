import { PROPERTY_TYPE_LABELS } from "@/lib/property-config";
import { format } from "date-fns";

export type SaleRow = {
  dateOfTransfer: Date;
  price: number;
  propertyType: string;
  tenure: string;
  newBuild: boolean;
};

type Props = {
  sales: SaleRow[];
};

const TENURE_LABELS: Record<string, string> = {
  F: "Freehold",
  L: "Leasehold",
};

export default function SalesTable({ sales }: Props) {
  const sorted = [...sales].sort(
    (a, b) => new Date(b.dateOfTransfer).getTime() - new Date(a.dateOfTransfer).getTime()
  );

  if (sorted.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Price</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Tenure</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((sale, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-700">
                {format(new Date(sale.dateOfTransfer), "dd MMM yyyy")}
              </td>
              <td className="px-4 py-3 text-right font-medium text-gray-900">
                £{sale.price.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {PROPERTY_TYPE_LABELS[sale.propertyType] ?? sale.propertyType}
                {sale.newBuild && (
                  <span className="ml-1 rounded bg-blue-100 px-1 text-xs text-blue-800">
                    New
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {TENURE_LABELS[sale.tenure] ?? sale.tenure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
