import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  items: BreadcrumbItem[];
  light?: boolean;
};

export default function PropertyBreadcrumb({ items, light = false }: Props) {
  const baseText = light ? "text-white/60" : "text-gray-500";
  const chevron = light ? "text-white/30" : "text-gray-400";
  const hoverText = light ? "hover:text-white" : "hover:text-gray-900";
  const currentText = light ? "text-white/90" : "text-gray-900";

  return (
    <>
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${baseText}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className={`h-4 w-4 ${chevron}`} />}
            {item.href ? (
              <Link href={item.href} className={hoverText}>
                {item.label}
              </Link>
            ) : (
              <span className={currentText}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
