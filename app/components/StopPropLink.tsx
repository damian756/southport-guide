"use client";

interface Props {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

export default function StopPropLink({ href, target, rel, className, children }: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}
