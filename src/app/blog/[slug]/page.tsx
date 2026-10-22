import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { container } from "@/infrastructure/container";
import { Container } from "@/presentation/components/ui/Container";
import { Photo } from "@/presentation/components/ui/Photo";
import { formatDate } from "@/presentation/utils/format";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await container.getBlogPosts.execute();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await container.getBlogPostBySlug.execute(slug);
  return { title: post?.title ?? "Blog", description: post?.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await container.getBlogPostBySlug.execute(slug);
  if (!post) notFound();

  return (
    <article className="bg-navy-900 pb-20 pt-32">
      <Container className="max-w-3xl">
        <Link href="/blog" className="text-[11px] uppercase tracking-[0.25em] text-gold hover:text-white">
          ← Blog
        </Link>
        <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-ember">
          {post.category} · {formatDate(post.date)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-light text-white sm:text-5xl">
          {post.title}
        </h1>
        <div className="relative mt-8 aspect-[16/10]">
          <Photo slot={post.image} priority sizes="(min-width: 768px) 768px, 100vw" />
        </div>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-white/80">
          {post.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
