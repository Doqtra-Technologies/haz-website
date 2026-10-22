import type { BlogPost } from "./entities/blog";
import type { EventItem } from "./entities/event";
import type { Location } from "./entities/location";
import type { MenuCategory } from "./entities/menu";
import type { SiteContent } from "./entities/site-content";
import type { GroupEnquiry } from "./entities/submissions";

export interface LocationRepository {
  findAll(): Promise<Location[]>;
  findBySlug(slug: string): Promise<Location | null>;
}

export interface MenuRepository {
  findAll(): Promise<MenuCategory[]>;
}

export interface EventRepository {
  findAll(): Promise<EventItem[]>;
  findBySlug(slug: string): Promise<EventItem | null>;
}

export interface BlogRepository {
  findAll(): Promise<BlogPost[]>;
  findBySlug(slug: string): Promise<BlogPost | null>;
}

export interface ContentRepository {
  get(): Promise<SiteContent>;
}

/** Outbound ports: swap the implementations for email / CRM providers. */
export interface EnquiryGateway {
  send(enquiry: GroupEnquiry): Promise<void>;
}

export interface NewsletterGateway {
  subscribe(email: string): Promise<void>;
}
