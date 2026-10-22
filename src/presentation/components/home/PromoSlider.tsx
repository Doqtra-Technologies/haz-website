"use client";

import Link from "next/link";
import { useState } from "react";
import type { Promo } from "@/core/domain/entities/site-content";
import { Photo } from "../ui/Photo";

export function PromoSlider({ promos }: { promos: Promo[] }) {
  const [index, setIndex] = useState(0);
  const promo = promos[index];
  const go = (i: number) => setIndex((i + promos.length) % promos.length);

  return (
    <section className="bg-sand pb-16 pt-14 sm:pb-20 sm:pt-20" aria-roledescription="carousel" aria-label="Promotions">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative grid lg:grid-cols-12 lg:items-center">
          <div className="relative aspect-[4/3] lg:col-start-2 lg:col-span-10 lg:row-start-1 lg:aspect-[16/10]">
            <Photo slot={promo.image} sizes="(min-width: 1024px) 66vw, 100vw" />
          </div>
          <div className="relative -mt-12 bg-[#c08e4e] p-8 text-center text-ink shadow-xl sm:mx-8 sm:p-12 lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:mt-16 lg:mx-0 lg:-translate-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em]">{promo.eyebrow}</p>
            <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.1em] sm:text-4xl">
              {promo.title}
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed">{promo.body}</p>
            <Link
              href={promo.href}
              className="mt-8 inline-block border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] hover:opacity-70"
            >
              {promo.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous promotion"
              onClick={() => go(index - 1)}
              className="flex h-9 w-9 items-center justify-center border border-ink/40 text-ink hover:bg-ink hover:text-sand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <div className="flex gap-2">
              {promos.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  aria-label={`Show ${p.title}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={`h-0.5 w-8 transition-colors ${i === index ? "bg-ink" : "bg-ink/25"}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next promotion"
              onClick={() => go(index + 1)}
              className="flex h-9 w-9 items-center justify-center border border-ink/40 text-ink hover:bg-ink hover:text-sand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <Link
            href="/book"
            className="bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink hover:bg-gold-dark"
          >
            Reserve now
          </Link>
        </div>
      </div>
    </section>
  );
}
