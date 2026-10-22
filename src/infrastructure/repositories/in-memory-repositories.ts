import type { BlogPost } from "@/core/domain/entities/blog";
import type { EventItem } from "@/core/domain/entities/event";
import type { Location } from "@/core/domain/entities/location";
import type { MenuCategory } from "@/core/domain/entities/menu";
import type { SiteContent } from "@/core/domain/entities/site-content";
import type {
  BlogRepository,
  ContentRepository,
  EventRepository,
  LocationRepository,
  MenuRepository,
} from "@/core/domain/repositories";
import { blogPosts } from "../data/blog";
import { siteContent } from "../data/content";
import { events } from "../data/events";
import { locations } from "../data/locations";
import { menus } from "../data/menus";

/**
 * Static, in-memory implementations of the repository ports.
 * To move to a CMS or database, add new classes that implement the same
 * interfaces and swap them in `container.ts`: nothing else changes.
 */
export class InMemoryLocationRepository implements LocationRepository {
  async findAll(): Promise<Location[]> {
    return locations;
  }
  async findBySlug(slug: string): Promise<Location | null> {
    return locations.find((l) => l.slug === slug) ?? null;
  }
}

export class InMemoryMenuRepository implements MenuRepository {
  async findAll(): Promise<MenuCategory[]> {
    return menus;
  }
}

export class InMemoryEventRepository implements EventRepository {
  async findAll(): Promise<EventItem[]> {
    return events;
  }
  async findBySlug(slug: string): Promise<EventItem | null> {
    return events.find((e) => e.slug === slug) ?? null;
  }
}

export class InMemoryBlogRepository implements BlogRepository {
  async findAll(): Promise<BlogPost[]> {
    return blogPosts;
  }
  async findBySlug(slug: string): Promise<BlogPost | null> {
    return blogPosts.find((p) => p.slug === slug) ?? null;
  }
}

export class InMemoryContentRepository implements ContentRepository {
  async get(): Promise<SiteContent> {
    return siteContent;
  }
}
