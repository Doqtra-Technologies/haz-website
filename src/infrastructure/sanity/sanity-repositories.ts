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
import { sanityFetch } from "@/sanity/client";
import {
  InMemoryBlogRepository,
  InMemoryContentRepository,
  InMemoryEventRepository,
  InMemoryLocationRepository,
  InMemoryMenuRepository,
} from "../repositories/in-memory-repositories";
import {
  mapBlogPost,
  mapEvent,
  mapLocation,
  mapMenu,
  mapSiteContent,
  type BlogDoc,
  type EventDoc,
  type LocationDoc,
  type MenuDoc,
  type SiteContentDoc,
} from "./mappers";

/** If Sanity is unreachable the site keeps working with the bundled content. */
async function withFallback<T>(label: string, load: () => Promise<T>, fallback: () => Promise<T>) {
  try {
    return await load();
  } catch (error) {
    console.error(`[sanity] Failed to load ${label}; using bundled content instead.`, error);
    return fallback();
  }
}

export class SanityLocationRepository implements LocationRepository {
  private readonly fallback = new InMemoryLocationRepository();

  findAll(): Promise<Location[]> {
    return withFallback(
      "locations",
      async () =>
        (
          await sanityFetch<LocationDoc[]>(
            `*[_type == "location" && defined(slug.current)] | order(coalesce(order, 999) asc, name asc)`,
            {},
            ["location"],
          )
        ).map(mapLocation),
      () => this.fallback.findAll(),
    );
  }

  findBySlug(slug: string): Promise<Location | null> {
    return withFallback(
      `location ${slug}`,
      async () => {
        const doc = await sanityFetch<LocationDoc | null>(
          `*[_type == "location" && slug.current == $slug][0]`,
          { slug },
          ["location"],
        );
        return doc ? mapLocation(doc) : null;
      },
      () => this.fallback.findBySlug(slug),
    );
  }
}

export class SanityMenuRepository implements MenuRepository {
  private readonly fallback = new InMemoryMenuRepository();

  findAll(): Promise<MenuCategory[]> {
    return withFallback(
      "menus",
      async () =>
        (
          await sanityFetch<MenuDoc[]>(
            `*[_type == "menuCategory" && defined(slug.current)] | order(coalesce(order, 999) asc, label asc)`,
            {},
            ["menuCategory"],
          )
        ).map(mapMenu),
      () => this.fallback.findAll(),
    );
  }
}

export class SanityEventRepository implements EventRepository {
  private readonly fallback = new InMemoryEventRepository();

  findAll(): Promise<EventItem[]> {
    return withFallback(
      "events",
      async () =>
        (
          await sanityFetch<EventDoc[]>(
            `*[_type == "event" && defined(slug.current)] | order(coalesce(order, 0) asc, _createdAt desc)`,
            {},
            ["event"],
          )
        ).map(mapEvent),
      () => this.fallback.findAll(),
    );
  }

  findBySlug(slug: string): Promise<EventItem | null> {
    return withFallback(
      `event ${slug}`,
      async () => {
        const doc = await sanityFetch<EventDoc | null>(
          `*[_type == "event" && slug.current == $slug][0]`,
          { slug },
          ["event"],
        );
        return doc ? mapEvent(doc) : null;
      },
      () => this.fallback.findBySlug(slug),
    );
  }
}

export class SanityBlogRepository implements BlogRepository {
  private readonly fallback = new InMemoryBlogRepository();

  findAll(): Promise<BlogPost[]> {
    return withFallback(
      "blog posts",
      async () =>
        (
          await sanityFetch<BlogDoc[]>(
            `*[_type == "blogPost" && defined(slug.current)] | order(date desc)`,
            {},
            ["blogPost"],
          )
        ).map(mapBlogPost),
      () => this.fallback.findAll(),
    );
  }

  findBySlug(slug: string): Promise<BlogPost | null> {
    return withFallback(
      `blog post ${slug}`,
      async () => {
        const doc = await sanityFetch<BlogDoc | null>(
          `*[_type == "blogPost" && slug.current == $slug][0]`,
          { slug },
          ["blogPost"],
        );
        return doc ? mapBlogPost(doc) : null;
      },
      () => this.fallback.findBySlug(slug),
    );
  }
}

export class SanityContentRepository implements ContentRepository {
  private readonly fallback = new InMemoryContentRepository();

  get(): Promise<SiteContent> {
    return withFallback(
      "site content",
      async () => {
        const doc = await sanityFetch<SiteContentDoc | null>(
          `*[_type == "siteContent" && _id == "siteContent"][0]`,
          {},
          ["siteContent"],
        );
        if (!doc) throw new Error("the siteContent document has not been created yet");
        return mapSiteContent(doc);
      },
      () => this.fallback.get(),
    );
  }
}
