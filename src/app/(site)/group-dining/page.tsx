import type { Metadata } from "next";
import Link from "next/link";
import { imageSlot } from "@/core/domain/entities/image";
import { container } from "@/infrastructure/container";
import { ArrowRight } from "@/presentation/components/ui/ArrowRight";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";

export const metadata: Metadata = { title: "Group Dining" };

const hero = imageSlot("HAZ group dining spaces", "/images/haz-group-dining.webp");

export default async function GroupDiningPage() {
  const locations = await container.getLocations.execute();

  return (
    <>
      <section className="bg-navy-950">
        <div className="relative flex min-h-[70vh] items-end overflow-hidden pt-28">
          <Photo slot={hero} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <Container className="relative pb-8">
            <h1 className="font-display text-6xl font-light text-white sm:text-8xl">
              Group dining
            </h1>
          </Container>
        </div>
        <div className="bg-navy-900">
          <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-sm leading-relaxed text-white/80">
              Discover our inviting and versatile spaces, perfect for bringing
              people together. From business lunches and team dinners to family
              celebrations and special occasions, HAZ offers the ideal setting for
              memorable group dining in the heart of London.
            </p>
            <a
              href="#restaurants"
              className="flex items-center gap-3 whitespace-nowrap border-white/20 text-[11px] uppercase tracking-[0.2em] text-white hover:text-ember md:border-l md:pl-8"
            >
              Our restaurants <ArrowRight />
            </a>
          </Container>
        </div>
      </section>

      <section id="restaurants" className="scroll-mt-20 bg-navy-900 py-14 sm:py-20">
        <Container>
          <h2 className="eyebrow font-semibold text-white">Our restaurants</h2>
          <div className="mt-2 h-px w-8 bg-ember" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/group-dining/${loc.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <Photo
                  slot={loc.cardImage}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                <div className="absolute left-5 top-5">
                  <p className="font-display text-3xl text-white">{loc.shortName}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/80">
                    {loc.region}
                  </p>
                </div>
                <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-white group-hover:bg-white group-hover:text-navy-900">
                  <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
