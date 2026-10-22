import type { SiteContent } from "@/core/domain/entities/site-content";
import type { ContentRepository } from "@/core/domain/repositories";

export class GetSiteContent {
  constructor(private readonly content: ContentRepository) {}
  execute(): Promise<SiteContent> {
    return this.content.get();
  }
}
