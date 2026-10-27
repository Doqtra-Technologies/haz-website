import Link from "next/link";
import type { Location } from "@/core/domain/entities/location";
import { Container } from "../ui/Container";
import { Photo } from "../ui/Photo";

export function RestaurantsGrid({ locations }: { locations: Location[] }) {
  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <Container>
        <h2 className="eyebrow font-semibold text-white">Our restaurants</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <Photo
                slot={loc.cardImage}
                className="transition-transform duration-700 group-hover:scale-105"
                // Landscape photos are cropped into a 3:4 card, so they render ~2.75x the card width.
                sizes="(min-width: 768px) 92vw, 275vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30" />
              <div className="absolute left-5 right-5 top-5 flex items-start gap-3">
                <span className="border border-white/70 px-2 py-1 text-[9px] uppercase leading-tight tracking-[0.15em] text-white">
                  {loc.region}
                </span>
                <span className="font-display text-2xl leading-tight text-white">
                  {loc.name}
                </span>
              </div>
              <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-white transition-colors group-hover:bg-white group-hover:text-navy-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M4 12h16M14 6l6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
