type Props = {
  priceDate?: string;
  crimeDate?: string;
  schoolsDate?: string;
};

export default function DataFreshness({ priceDate, crimeDate, schoolsDate }: Props) {
  const items: { label: string; date: string }[] = [];
  if (priceDate) items.push({ label: "Price data (Land Registry)", date: priceDate });
  if (crimeDate) items.push({ label: "Crime data (police.uk)", date: crimeDate });
  if (schoolsDate) items.push({ label: "Schools (DfE/Ofsted)", date: schoolsDate });

  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2">
      <p className="text-xs text-gray-500">
        {items.map((i) => `${i.label}: ${i.date}`).join(" · ")}
      </p>
    </div>
  );
}
