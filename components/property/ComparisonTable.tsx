export type ComparisonRow = {
  metric: string;
  postcode: string | number;
  southport: string | number;
};

type Props = {
  rows: ComparisonRow[];
};

export default function ComparisonTable({ rows }: Props) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Metric</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">This area</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">Southport avg</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-700">{row.metric}</td>
              <td className="px-4 py-3 text-right font-medium text-gray-900">
                {row.postcode}
              </td>
              <td className="px-4 py-3 text-right text-gray-600">{row.southport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
