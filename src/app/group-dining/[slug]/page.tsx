import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { container } from "@/infrastructure/container";
import { EnquiryForm } from "@/presentation/components/group-dining/EnquiryForm";
import { ButtonLink } from "@/presentation/components/ui/ButtonLink";
import { Carousel } from "@/presentation/components/ui/Carousel";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";

type Params = { slug: string };

export async function generateStaticParams() {
  const locations = await container.getLocations.execute();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const location = await container.getLocationBySlug.execute(slug);
  return { title: location ? `Group Dining at ${location.shortName}` : "Group Dining" };
}

export default async function GroupDiningVenuePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = await container.getLocationBySlug.execute(slug);
  if (!location) notFound();

  const { groupDining } = location;

  return (
    <>
      <section className="bg-navy-950">
        <div className="relative flex min-h-[65vh] items-end overflow-hidden pt-28">
          <Photo slot={location.heroImage} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <Container className="relative pb-10">
            <h1 className="font-display text-6xl font-light text-white sm:text-7xl">
              {location.shortName}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white">
              {location.region}
            </p>
          </Container>
        </div>
        <div className="bg-navy-800">
          <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-white/80">
              {groupDining.description}
            </p>
            {groupDining.brochureUrl && (
              <ButtonLink href={groupDining.brochureUrl} className="whitespace-nowrap">
                Download Brochure
              </ButtonLink>
            )}
          </Container>
        </div>
      </section>

      <section className="bg-navy-950 py-12">
        <Container>
          <Carousel label={`${location.shortName} photos`}>
            {groupDining.gallery.map((g) => (
              <div key={g.label} className="relative aspect-[16/10] w-[88%] shrink-0 snap-center sm:w-[70%]">
                <Photo slot={g} sizes="(min-width: 640px) 70vw, 88vw" />
              </div>
            ))}
          </Carousel>
        </Container>
      </section>

      <section id="enquiry" className="bg-navy-800 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                Make an enquiry
              </p>
              <h2 className="mt-6 text-3xl font-light leading-snug text-white sm:text-4xl">
                Send us a message today to make your group booking
              </h2>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm locationSlug={location.slug} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
