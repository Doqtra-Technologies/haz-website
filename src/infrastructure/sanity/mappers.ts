import type { BlogPost } from "@/core/domain/entities/blog";
import type { EventItem } from "@/core/domain/entities/event";
import type { Location, OpeningHours } from "@/core/domain/entities/location";
import type { MenuCategory } from "@/core/domain/entities/menu";
import type { SiteContent } from "@/core/domain/entities/site-content";
import { toImageSlot, type SanityImageValue } from "@/sanity/image";

type Img = SanityImageValue | null | undefined;
type Fit = "cover" | "contain" | undefined;

const text = (value: string | null | undefined) => value ?? "";
const list = <T>(value: T[] | null | undefined): T[] => value ?? [];
const fit = (value: string | null | undefined): Fit =>
  value === "contain" || value === "cover" ? value : undefined;
const hours = (value: OpeningHours[] | null | undefined) =>
  list(value).map((h) => ({ days: text(h.days), time: text(h.time) }));

export interface LocationDoc {
  slug: { current: string };
  name?: string;
  shortName?: string;
  region?: string;
  phone?: string;
  email?: string;
  address?: string;
  mapUrl?: string;
  cardImage?: Img;
  heroImage?: Img;
  interiorImage?: Img;
  headline?: string;
  description?: string[];
  hours?: OpeningHours[];
  openingTimes?: OpeningHours[];
  highlights?: { name?: string; description?: string; image?: Img }[];
  gallery?: Img[];
  groupDining?: { description?: string; brochureUrl?: string; gallery?: Img[] };
}

export function mapLocation(doc: LocationDoc): Location {
  const name = text(doc.name) || text(doc.shortName);
  return {
    slug: doc.slug.current,
    name,
    shortName: text(doc.shortName) || name,
    region: text(doc.region),
    phone: text(doc.phone),
    email: text(doc.email),
    address: text(doc.address),
    mapUrl: text(doc.mapUrl),
    cardImage: toImageSlot(doc.cardImage, `${name} restaurant`),
    heroImage: toImageSlot(doc.heroImage?.asset ? doc.heroImage : doc.cardImage, `${name} restaurant`),
    interiorImage: toImageSlot(doc.interiorImage, `${name} interior`),
    headline: text(doc.headline) || name,
    description: list(doc.description),
    hours: hours(doc.hours),
    openingTimes: hours(doc.openingTimes),
    highlights: list(doc.highlights).map((h) => ({
      name: text(h.name),
      description: text(h.description),
      image: toImageSlot(h.image, text(h.name)),
    })),
    gallery: list(doc.gallery).map((img, i) => toImageSlot(img, `${name} gallery photo ${i + 1}`)),
    groupDining: {
      description: text(doc.groupDining?.description),
      brochureUrl: doc.groupDining?.brochureUrl || undefined,
      gallery: list(doc.groupDining?.gallery).map((img, i) =>
        toImageSlot(img, `${name} group dining photo ${i + 1}`),
      ),
    },
  };
}

export interface MenuDoc {
  slug: { current: string };
  label?: string;
  intro?: string;
  items?: { name?: string; description?: string; price?: string }[];
}

export function mapMenu(doc: MenuDoc): MenuCategory {
  return {
    slug: doc.slug.current,
    label: text(doc.label),
    intro: text(doc.intro),
    items: list(doc.items).map((i) => ({
      name: text(i.name),
      description: text(i.description),
      price: text(i.price),
    })),
  };
}

export interface EventDoc {
  slug: { current: string };
  title?: string;
  categoryLabel?: string;
  schedule?: string;
  recurring?: boolean;
  venue?: string;
  image?: Img;
  imageFit?: string;
  bannerImage?: Img;
  detailImage?: Img;
  detailImageFit?: string;
  summary?: string;
  body?: string[];
  dates?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  endsAt?: string;
}

const categorySlug = (label: string) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "events";

export function mapEvent(doc: EventDoc): EventItem {
  const title = text(doc.title);
  const categoryLabel = text(doc.categoryLabel) || "Events";
  const cardSource = [doc.image, doc.bannerImage, doc.detailImage].find((i) => i?.asset);
  return {
    slug: doc.slug.current,
    title,
    category: categorySlug(categoryLabel),
    categoryLabel,
    schedule: doc.schedule || undefined,
    recurring: Boolean(doc.recurring),
    venue: doc.venue || undefined,
    image: toImageSlot(cardSource ?? doc.image, title),
    imageFit: fit(doc.imageFit),
    bannerImage: doc.bannerImage?.asset ? toImageSlot(doc.bannerImage, title) : undefined,
    detailImage: doc.detailImage?.asset ? toImageSlot(doc.detailImage, title) : undefined,
    detailImageFit: fit(doc.detailImageFit),
    summary: text(doc.summary),
    body: list(doc.body),
    dates: list(doc.dates),
    ctaLabel: doc.ctaLabel || undefined,
    ctaUrl: doc.ctaUrl || undefined,
    endsAt: doc.endsAt || undefined,
  };
}

export interface BlogDoc {
  slug: { current: string };
  title?: string;
  excerpt?: string;
  date?: string;
  category?: string;
  image?: Img;
  body?: string[];
}

export function mapBlogPost(doc: BlogDoc): BlogPost {
  const title = text(doc.title);
  return {
    slug: doc.slug.current,
    title,
    excerpt: text(doc.excerpt),
    date: text(doc.date),
    category: text(doc.category),
    image: toImageSlot(doc.image, title),
    body: list(doc.body),
  };
}

export interface SiteContentDoc {
  welcomeLead?: { text?: string; accent?: boolean }[];
  welcomeBody?: string;
  promos?: {
    eyebrow?: string;
    title?: string;
    body?: string;
    ctaLabel?: string;
    href?: string;
    image?: Img;
  }[];
  storyHeading?: string;
  storyParagraphs?: string[];
  storyPrinciples?: string[];
  storyImage?: Img;
  journey?: { year?: string; title?: string; text?: string; image?: Img }[];
  spotlightTitle?: string;
  spotlightParagraphs?: string[];
  spotlightCtaLabel?: string;
  spotlightHref?: string;
  spotlightImage?: Img;
}

export function mapSiteContent(doc: SiteContentDoc): SiteContent {
  return {
    welcome: {
      lead: list(doc.welcomeLead).map((s) => ({
        text: text(s.text),
        ...(s.accent ? { accent: true } : {}),
      })),
      body: text(doc.welcomeBody),
    },
    promos: list(doc.promos).map((p) => ({
      eyebrow: text(p.eyebrow),
      title: text(p.title),
      body: text(p.body),
      ctaLabel: text(p.ctaLabel),
      href: text(p.href) || "/book",
      image: toImageSlot(p.image, text(p.title)),
    })),
    story: {
      heading: text(doc.storyHeading),
      paragraphs: list(doc.storyParagraphs),
      principles: list(doc.storyPrinciples),
      image: toImageSlot(doc.storyImage, text(doc.storyHeading) || "Our story"),
    },
    journey: list(doc.journey).map((s) => ({
      year: text(s.year),
      title: text(s.title),
      text: text(s.text),
      image: toImageSlot(s.image, `${text(s.title)} ${text(s.year)}`.trim()),
    })),
    spotlight: {
      title: text(doc.spotlightTitle),
      paragraphs: list(doc.spotlightParagraphs),
      ctaLabel: text(doc.spotlightCtaLabel),
      href: text(doc.spotlightHref) || "/locations",
      image: toImageSlot(doc.spotlightImage, text(doc.spotlightTitle)),
    },
  };
}
