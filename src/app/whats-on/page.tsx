import type { Metadata } from "next";
import { imageSlot } from "@/core/domain/entities/image";
import { container } from "@/infrastructure/container";
import { FloatingReserve } from "@/presentation/components/layout/FloatingReserve";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { EventBrowser } from "@/presentation/components/whats-on/EventBrowser";

export const metadata: Metadata = { title: "What's On" };
export const dynamic = "force-dynamic";

export default async function WhatsOnPage() {
  const now = Date.now();
  const events = (await container.getEvents.execute()).map((event) => ({
    ...event,
    isPast: event.endsAt ? now >= Date.parse(event.endsAt) : false,
  }));

  return (
    <>
      <PageHero
        eyebrow="Events & updates"
        title="What's on at Haz"
        uppercase
        backHref="/"
        description="From seasonal celebrations and new menus to special events and more, discover what’s on at HAZ."
        image={imageSlot("What's On at HAZ", "/images/haz-whats-on-hero.webp")}
      />
      <EventBrowser events={events} />
      <FloatingReserve tone="gold" />
    </>
  );
}
