import type { ImageSlot } from "./image";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  category: string;
  image: ImageSlot;
  body: string[];
}
