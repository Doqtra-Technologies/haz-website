import type { SiteContent } from "@/core/domain/entities/site-content";
import { Container } from "../ui/Container";

export function Welcome({ content }: { content: SiteContent["welcome"] }) {
  return (
    <section className="bg-haz-terracotta py-20 sm:py-28">
      <Container>
        <p className="max-w-5xl font-heading text-3xl font-light leading-snug text-white sm:text-4xl lg:text-5xl">
          {content.lead.map((seg, i) => (
            <span key={i}>
              {i === 1 && <br />}
              {seg.accent ? <span className="text-haz-espresso">{seg.text}</span> : seg.text}
            </span>
          ))}
        </p>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-white sm:text-lg">
          {content.body}
        </p>
        <div className="mt-10 h-px w-24 bg-haz-oat" />
      </Container>
    </section>
  );
}
