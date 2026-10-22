import type { Metadata } from "next";
import { container } from "@/infrastructure/container";
import { JourneyCarousel } from "@/presentation/components/about/JourneyCarousel";
import { StoryIntro } from "@/presentation/components/about/StoryIntro";

export const metadata: Metadata = { title: "Our Story" };

export default async function AboutPage() {
  const content = await container.getSiteContent.execute();
  return (
    <>
      <StoryIntro story={content.story} />
      <JourneyCarousel steps={content.journey} />
    </>
  );
}
