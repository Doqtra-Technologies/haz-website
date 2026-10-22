"use client";

import { useMemo, useState } from "react";
import type { Location } from "@/core/domain/entities/location";
import { LocationCard } from "./LocationCard";

export function LocationBrowser({ locations }: { locations: Location[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((l) => {
      const matchesFilter = filter === "all" || l.slug === filter;
      const matchesQuery =
        !q || `${l.name} ${l.address} ${l.region}`.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [locations, filter, query]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors ${
      active
        ? "border-navy-900 bg-navy-900 text-white"
        : "border-ink/25 text-ink/70 hover:border-ink"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[10px] uppercase tracking-[0.25em] text-ink/50">
            Browse by location
          </span>
          <button type="button" className={chip(filter === "all")} onClick={() => setFilter("all")}>
            All locations
          </button>
          {locations.map((l) => (
            <button
              key={l.slug}
              type="button"
              className={chip(filter === l.slug)}
              onClick={() => setFilter(l.slug)}
            >
              {l.shortName}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search locations..."
          aria-label="Search locations"
          className="w-full rounded-full border border-ink/40 bg-transparent px-5 py-2 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-ink md:w-64"
        />
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((l) => (
            <LocationCard key={l.slug} location={l} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-sm text-ink/60">No locations match your search.</p>
      )}
    </div>
  );
}
