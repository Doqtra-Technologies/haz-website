"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EventItem } from "@/core/domain/entities/event";
import { Container } from "../ui/Container";
import { Photo } from "../ui/Photo";

export function EventBrowser({ events }: { events: EventItem[] }) {
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    events.forEach((e) => seen.set(e.category, e.categoryLabel));
    return [...seen.entries()];
  }, [events]);

  const visible = events.filter((e) => filter === "all" || e.category === filter);

  const chip = (active: boolean) =>
    `border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors ${
      active
        ? "border-haz-espresso bg-haz-espresso text-white"
        : "border-haz-espresso/30 text-haz-espresso/80 hover:border-haz-espresso"
    }`;

  return (
    <section className="bg-haz-oat py-12 text-haz-espresso sm:py-16">
      <Container>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={chip(filter === "all")} onClick={() => setFilter("all")}>
            All
          </button>
          {categories.map(([value, text]) => (
            <button key={value} type="button" className={chip(filter === value)} onClick={() => setFilter(value)}>
              {text}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((ev) => (
            <Link
              key={ev.slug}
              href={`/whats-on/${ev.slug}`}
              className="group block border border-haz-espresso/15 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden">
                <Photo
                  slot={ev.image}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  fit={ev.imageFit}
                />
              </div>
              <div className="min-h-32 p-5">
                <div className="flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-haz-terracotta">
                  {ev.isPast && <span className="border border-haz-espresso/30 px-1.5 py-0.5">Past event</span>}
                  {ev.schedule && <span>{ev.schedule}</span>}
                  {ev.recurring && <span className="border border-haz-coral/60 px-1.5 py-0.5">Recurring</span>}
                  <span className="border border-haz-coral/60 px-1.5 py-0.5">{ev.categoryLabel}</span>
                </div>
                <h3 className="mt-3 text-lg font-medium">{ev.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haz-espresso/70">{ev.summary}</p>
                {ev.venue && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-haz-espresso/50">{ev.venue}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
