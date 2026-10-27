import type { Metadata } from "next";
import Link from "next/link";
import { container } from "@/infrastructure/container";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";
import { formatDate } from "@/presentation/utils/format";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await container.getBlogPosts.execute();

  return (
    <section className="bg-navy-900 pb-20 pt-32">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">The Haz journal</p>
        <h1 className="mt-4 font-display text-5xl font-light uppercase text-sand-light sm:text-6xl">
          Blog
        </h1>
        <div className="mt-5 h-px w-14 bg-gold" />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo
                  slot={post.image}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-ember">
                {post.category} · {formatDate(post.date)}
              </p>
              <h2 className="mt-2 font-display text-2xl text-white group-hover:text-ember">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
