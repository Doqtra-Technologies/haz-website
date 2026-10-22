import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "gold" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-white hover:bg-ember-dark border border-ember",
  outline: "border border-ember text-ember hover:bg-ember hover:text-white",
  gold: "bg-gold text-ink hover:bg-gold-dark border border-gold",
  light: "border border-white/60 text-white hover:bg-white hover:text-navy-900",
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
