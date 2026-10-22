import type { ImageSlot } from "./image";

export interface TextSegment {
  text: string;
  accent?: boolean;
}

export interface Promo {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
  image: ImageSlot;
}

export interface JourneyStep {
  year: string;
  title: string;
  text: string;
  image: ImageSlot;
}

export interface Spotlight {
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  href: string;
  image: ImageSlot;
}

export interface SiteContent {
  welcome: { lead: TextSegment[]; body: string };
  promos: Promo[];
  story: {
    heading: string;
    paragraphs: string[];
    principles: string[];
    image: ImageSlot;
  };
  journey: JourneyStep[];
  spotlight: Spotlight;
}
