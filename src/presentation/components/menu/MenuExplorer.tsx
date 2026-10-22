"use client";

import { useState } from "react";
import { imageSlot } from "@/core/domain/entities/image";
import type { MenuCategory } from "@/core/domain/entities/menu";
import { Photo } from "../ui/Photo";

const heroImage = imageSlot("Menu hero: table of Mediterranean dishes", "/images/photo-28.jpg");

interface Props {
  menus: MenuCategory[];
  restaurants: { slug: string; name: string }[];
}

export function MenuExplorer({ menus, restaurants }: Props) {
  const [active, setActive] = useState(menus[0].slug);
  const [restaurant, setRestaurant] = useState("");
  const menu = menus.find((m) => m.slug === active) ?? menus[0];

  return (
    <>
      <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-navy-950 pt-28">
        <Photo slot={heroImage} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ember">Food &amp; Drink</p>
          <h1 className="mt-4 font-display text-5xl font-light uppercase text-white sm:text-6xl lg:text-7xl">
            {menu.label}
          </h1>
          <div className="mt-5 h-px w-14 bg-ember" />
          <p className="mt-6 max-w-md font-display text-lg leading-relaxed text-white/90">
            {menu.intro}
          </p>
          <p className="mt-4 max-w-md text-sm text-white/80">
            Menus vary by location.{" "}
            <a href="#menu-select" className="text-ember underline underline-offset-2">
              Select your location
            </a>{" "}
            to see the full, up to date menu.
          </p>
        </div>
      </section>

      <section id="menu-select" className="scroll-mt-24 bg-navy-900 py-10">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="mx-auto flex max-w-lg items-center gap-3 bg-navy-700/70 px-4 py-3 text-left text-sm">
            <label htmlFor="restaurant" className="whitespace-nowrap text-xs text-white/70">
              Viewing menus for:
            </label>
            <select
              id="restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
            >
              <option value="" className="text-ink">Select a restaurant</option>
              {restaurants.map((r) => (
                <option key={r.slug} value={r.slug} className="text-ink">
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-[11px] text-white/60">
            Select a restaurant to see all menus available at that location.
          </p>

          <div role="tablist" aria-label="Menus" className="mt-8 flex flex-wrap justify-center gap-3">
            {menus.map((m) => (
              <button
                key={m.slug}
                role="tab"
                type="button"
                aria-selected={m.slug === active}
                onClick={() => setActive(m.slug)}
                className={`border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  m.slug === active
                    ? "border-ember text-ember"
                    : "border-white/30 text-white/80 hover:border-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="allergens" className="bg-navy-950 py-16">
        <div className="mx-auto max-w-3xl px-5">
          {restaurant ? (
            <ul className="divide-y divide-white/10">
              {menu.items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <h3 className="font-display text-2xl text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-white/60">{item.description}</p>
                  </div>
                  <span className="whitespace-nowrap text-sm text-ember">{item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm text-white/60">
              Choose a restaurant above to view the {menu.label.toLowerCase()} menu.
            </p>
          )}
          <p className="mt-10 text-center text-xs text-white/40">
            For information relating to allergens, please speak to a member of our team.
          </p>
        </div>
      </section>
    </>
  );
}
