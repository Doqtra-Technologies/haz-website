import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-haz-coral text-haz-espresso hover:bg-haz-oat border border-haz-coral",
  outline: "border border-haz-coral text-haz-coral hover:bg-haz-coral hover:text-haz-espresso",
  light: "border border-white/60 text-white hover:bg-white hover:text-haz-terracotta",
};

interface Props {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
