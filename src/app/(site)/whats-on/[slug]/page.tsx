import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { container } from "@/infrastructure/container";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { ButtonLink } from "@/presentation/components/ui/ButtonLink";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";

type Params = { slug: string };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const events = await container.getEvents.execute();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await container.getEventBySlug.execute(slug);
  return { title: event?.title ?? "Event" };
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const storedEvent = await container.getEventBySlug.execute(slug);
  if (!storedEvent) notFound();
  const isPast = storedEvent.endsAt
    ? Date.now() >= Date.parse(storedEvent.endsAt)
    : false;
  const event = { ...storedEvent, isPast };

  return (
    <>
      <PageHero
        eyebrow={event.isPast ? "Past event" : "Upcoming event"}
        title={event.title}
        uppercase
        backHref="/whats-on"
        backLabel="What's on"
        description={event.summary}
        image={event.bannerImage ?? event.image}
      />
      <section className="bg-navy-900 py-12 sm:py-16">
        <Container>
          <div className={`grid items-start gap-10 ${event.detailImage ? "lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] lg:gap-16" : ""}`}>
            <div className="flex flex-col items-start gap-8">
              <div className="max-w-2xl space-y-5 font-display text-lg leading-relaxed text-white/85">
                {event.body
                  .filter((paragraph) => !event.isPast || !paragraph.startsWith("Secure your spot"))
                  .map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                <ul className="space-y-1 pt-2">
                  {event.dates.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              {!event.isPast && (
                <ButtonLink href={event.ctaUrl ?? "/book"} variant="gold">
                  {event.ctaLabel ?? "Reserve now"}
                </ButtonLink>
              )}
            </div>
            {event.detailImage && (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden border border-white/15 bg-[#1a0b0b]">
                <Photo
                  slot={event.detailImage}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  fit={event.detailImageFit}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
