import type { ImageSlot } from "./image";

export interface OpeningHours {
  days: string;
  time: string;
}

export interface MenuHighlight {
  name: string;
  description: string;
  image: ImageSlot;
}

export interface GroupDiningInfo {
  description: string;
  brochureUrl?: string;
  gallery: ImageSlot[];
}

export interface Location {
  slug: string;
  name: string;
  shortName: string;
  region: string;
  phone: string;
  address: string;
  mapUrl: string;
  cardImage: ImageSlot;
  heroImage: ImageSlot;
  interiorImage: ImageSlot;
  headline: string;
  description: string[];
  /** Compact hours shown on location cards. */
  hours: OpeningHours[];
  /** Hours shown on the location detail page. */
  openingTimes: OpeningHours[];
  highlights: MenuHighlight[];
  gallery: ImageSlot[];
  groupDining: GroupDiningInfo;
}
