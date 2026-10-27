import { GetBlogPostBySlug, GetBlogPosts } from "@/core/application/use-cases/blog";
import { GetEventBySlug, GetEvents } from "@/core/application/use-cases/events";
import {
  GetLocationBySlug,
  GetLocations,
} from "@/core/application/use-cases/locations";
import { GetMenus } from "@/core/application/use-cases/menus";
import { GetSiteContent } from "@/core/application/use-cases/site-content";
import { SubmitGroupEnquiry } from "@/core/application/use-cases/submit-group-enquiry";
import { SubscribeNewsletter } from "@/core/application/use-cases/subscribe-newsletter";
import {
  ConsoleEnquiryGateway,
  ConsoleNewsletterGateway,
} from "./gateways/console-gateways";
import {
  InMemoryBlogRepository,
  InMemoryContentRepository,
  InMemoryEventRepository,
  InMemoryLocationRepository,
  InMemoryMenuRepository,
} from "./repositories/in-memory-repositories";
import {
  SanityBlogRepository,
  SanityContentRepository,
  SanityEventRepository,
  SanityLocationRepository,
  SanityMenuRepository,
} from "./sanity/sanity-repositories";
import { isSanityEnabled } from "@/sanity/env";

// Composition root: the only place that knows concrete implementations.
// Content comes from Sanity when CONTENT_SOURCE=sanity, otherwise from the bundled data.
const locationRepository = isSanityEnabled ? new SanityLocationRepository() : new InMemoryLocationRepository();
const menuRepository = isSanityEnabled ? new SanityMenuRepository() : new InMemoryMenuRepository();
const eventRepository = isSanityEnabled ? new SanityEventRepository() : new InMemoryEventRepository();
const blogRepository = isSanityEnabled ? new SanityBlogRepository() : new InMemoryBlogRepository();
const contentRepository = isSanityEnabled ? new SanityContentRepository() : new InMemoryContentRepository();

const enquiryGateway = new ConsoleEnquiryGateway();
const newsletterGateway = new ConsoleNewsletterGateway();

export const container = {
  getLocations: new GetLocations(locationRepository),
  getLocationBySlug: new GetLocationBySlug(locationRepository),
  getMenus: new GetMenus(menuRepository),
  getEvents: new GetEvents(eventRepository),
  getEventBySlug: new GetEventBySlug(eventRepository),
  getBlogPosts: new GetBlogPosts(blogRepository),
  getBlogPostBySlug: new GetBlogPostBySlug(blogRepository),
  getSiteContent: new GetSiteContent(contentRepository),
  submitGroupEnquiry: new SubmitGroupEnquiry(enquiryGateway),
  subscribeNewsletter: new SubscribeNewsletter(newsletterGateway),
};
