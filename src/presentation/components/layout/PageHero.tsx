import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageSlot } from "@/core/domain/entities/image";
import { Photo } from "../ui/Photo";

interface Props {
  title: string;
  image: ImageSlot;
  eyebrow?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  uppercase?: boolean;
  children?: ReactNode;
}

export function PageHero({
  title,
  image,
  eyebrow,
  description,
  backHref,
  backLabel = "Home",
  uppercase = false,
  children,
}: Props) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-navy-950 pt-28">
      <Photo slot={image} priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
        {backHref && (
          <Link
            href={backHref}
            className="mb-8 inline-block text-[11px] uppercase tracking-[0.25em] text-gold hover:text-white"
          >
            ← {backLabel}
          </Link>
        )}
        {eyebrow && (
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        )}
        <h1
          className={`font-display text-5xl font-light leading-[1.05] text-sand-light sm:text-6xl lg:text-7xl ${
            uppercase ? "uppercase" : ""
          }`}
        >
          {title}
        </h1>
        <div className="mt-6 h-px w-14 bg-gold" />
        {description && (
          <p className="mt-6 max-w-lg font-display text-lg leading-relaxed text-white/85">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
