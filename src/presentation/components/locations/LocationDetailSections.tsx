import type { Location } from "@/core/domain/entities/location";
import { SEVENROOMS_BOOKING_URL, siteConfig } from "@/config/site";
import { ButtonLink } from "../ui/ButtonLink";
import { Carousel } from "../ui/Carousel";
import { Container } from "../ui/Container";
import { Photo } from "../ui/Photo";

export function LocationHero({ location }: { location: Location }) {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-navy-950 pt-20 text-center">
      <Photo slot={location.heroImage} priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/40" />
      <div className="relative px-5">
        <h1 className="font-display text-5xl font-light text-white sm:text-6xl lg:text-7xl">
          {location.name.replace("Haz ", "HAZ ")}
        </h1>
        <address className="mt-6 space-y-1 text-sm not-italic text-white/90">
          <p>{location.address}</p>
          <p>
            <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="hover:text-ember">
              {location.phone}
            </a>
          </p>
        </address>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={SEVENROOMS_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-ember bg-ember px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-ember-dark"
          >
            Book now
          </a>
          <ButtonLink href={`/group-dining/${location.slug}`} variant="light">
            Group dining
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function LocationInfo({ location }: { location: Location }) {
  return (
    <section className="bg-sand-light py-16 text-ink sm:py-20">
      <Container>
        <h2 className="mx-auto max-w-3xl text-center font-display text-3xl leading-snug text-ember-dark sm:text-4xl">
          {location.headline}
        </h2>
        <div className="mx-auto mt-6 max-w-2xl space-y-4 text-center font-display text-lg leading-relaxed">
          {location.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <div className="relative aspect-[4/3] lg:col-span-5">
            <Photo slot={location.interiorImage} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-display text-2xl text-ember-dark">Opening times</h3>
            <dl className="mt-4 space-y-4 text-sm">
              {location.openingTimes.map((h) => (
                <div key={h.days}>
                  <dt className="font-semibold">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl text-ember-dark">Where to find us</h3>
            <address className="mt-4 text-sm not-italic leading-relaxed">
              {location.address}
              <br />
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="underline underline-offset-2 hover:text-ember"
              >
                {location.phone}
              </a>
            </address>
            <div className="mt-6 flex flex-col gap-3 sm:max-w-xs">
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ember px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-ember-dark"
              >
                Map &amp; directions
              </a>
              <a
                href={SEVENROOMS_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ember px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-ember hover:bg-ember hover:text-white"
              >
                Book now
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function MenuHighlights({ location }: { location: Location }) {
  return (
    <section className="bg-[#d9d4c9] py-14 text-ink">
      <Container>
        <h2 className="eyebrow font-semibold">Menu highlights</h2>
        <Carousel className="mt-6" label="Menu highlights">
          {location.highlights.map((h) => (
            <article key={h.name} className="w-[70%] shrink-0 snap-start sm:w-[38%] lg:w-[23%]">
              <div className="relative aspect-[3/4]">
                <Photo slot={h.image} sizes="(min-width: 1024px) 23vw, 70vw" />
              </div>
              <h3 className="mt-4 text-sm font-medium tracking-wide">{h.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/70">{h.description}</p>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export function SpotlightSection({ location }: { location: Location }) {
  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-light text-white sm:text-4xl">{location.headline}</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
              {location.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ButtonLink href={`/group-dining/${location.slug}`} className="mt-8">
              Group dining
            </ButtonLink>
          </div>
          <div className="relative aspect-[4/3] lg:col-span-7">
            <Photo slot={location.interiorImage} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function GallerySection({ location }: { location: Location }) {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-white/80">Gallery</h2>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block border border-ember px-3 py-1.5 text-xs text-white hover:bg-ember"
        >
          {siteConfig.instagramHandle}
        </a>
        <Carousel className="mt-8" label="Gallery">
          {location.gallery.map((g) => (
            <div key={g.label} className="relative aspect-[3/4] w-[62%] shrink-0 snap-start sm:w-[32%] lg:w-[19%]">
              <Photo slot={g} sizes="(min-width: 1024px) 19vw, 62vw" />
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
