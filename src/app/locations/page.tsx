import type { Metadata } from "next";
import { imageSlot } from "@/core/domain/entities/image";
import { container } from "@/infrastructure/container";
import { LocationBrowser } from "@/presentation/components/locations/LocationBrowser";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";

export const metadata: Metadata = { title: "Locations" };

const hero = imageSlot("Locations hero: guests outside a Haz restaurant", "/images/plantation-place.jpg");

export default async function LocationsPage() {
  const locations = await container.getLocations.execute();

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy-950 pt-28">
        <Photo slot={hero} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <Container className="relative pb-12">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white sm:text-7xl">
            Locations
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white">
            Discover HAZ across the heart of London. Each location brings its own
            character, while sharing the same Mediterranean flavours, warm
            hospitality and unmistakable HAZ atmosphere.
          </p>
          <p className="mt-2 text-sm italic text-white/80">
            Please note that hours may vary during bank holidays.
          </p>
        </Container>
      </section>

      <section className="bg-cream py-12 text-ink">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-xl font-extrabold uppercase leading-snug tracking-tight text-navy-900 sm:text-2xl">
            EVERY HAZ HAS ITS OWN CHARACTER. FROM THE SETTING TO THE ATMOSPHERE,
            EACH RESTAURANT BRINGS A DISTINCT EXPERIENCE — UNITED BY MEDITERRANEAN
            FLAVOURS, WARM HOSPITALITY AND A LOVE OF BRINGING PEOPLE TOGETHER.
          </p>
        </Container>
      </section>

      <section className="bg-cream pb-20 text-ink">
        <Container>
          <LocationBrowser locations={locations} />
        </Container>
      </section>
    </>
  );
}
