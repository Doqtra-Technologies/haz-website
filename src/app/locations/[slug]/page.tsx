import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { container } from "@/infrastructure/container";
import {
  GallerySection,
  LocationHero,
  LocationInfo,
  MenuHighlights,
  SpotlightSection,
} from "@/presentation/components/locations/LocationDetailSections";

type Params = { slug: string };

export async function generateStaticParams() {
  const locations = await container.getLocations.execute();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const location = await container.getLocationBySlug.execute(slug);
  return { title: location?.name ?? "Location" };
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [location] = await Promise.all([
    container.getLocationBySlug.execute(slug),
  ]);
  if (!location) notFound();

  return (
    <>
      <LocationHero location={location} />
      <LocationInfo location={location} />
      <MenuHighlights location={location} />
      <SpotlightSection location={location} />
      <GallerySection location={location} />
    </>
  );
}
