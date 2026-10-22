import type { ImageSlot } from "./image";

export interface EventItem {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  /** e.g. "Every Friday" */
  schedule?: string;
  recurring: boolean;
  venue?: string;
  image: ImageSlot;
  imageFit?: "cover" | "contain";
  bannerImage?: ImageSlot;
  detailImage?: ImageSlot;
  detailImageFit?: "cover" | "contain";
  summary: string;
  body: string[];
  dates: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  endsAt?: string;
  isPast?: boolean;
}
