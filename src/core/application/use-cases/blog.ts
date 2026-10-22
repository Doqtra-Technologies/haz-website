import type { BlogPost } from "@/core/domain/entities/blog";
import type { BlogRepository } from "@/core/domain/repositories";

export class GetBlogPosts {
  constructor(private readonly posts: BlogRepository) {}
  async execute(): Promise<BlogPost[]> {
    const all = await this.posts.findAll();
    return [...all].sort((a, b) => b.date.localeCompare(a.date));
  }
}

export class GetBlogPostBySlug {
  constructor(private readonly posts: BlogRepository) {}
  execute(slug: string): Promise<BlogPost | null> {
    return this.posts.findBySlug(slug);
  }
}
