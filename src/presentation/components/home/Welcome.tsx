import type { SiteContent } from "@/core/domain/entities/site-content";
import { Container } from "../ui/Container";

export function Welcome({ content }: { content: SiteContent["welcome"] }) {
  return (
    <section className="bg-navy-900 py-20 sm:py-28">
      <Container>
        <p className="max-w-5xl font-display text-3xl font-light leading-snug text-white sm:text-4xl lg:text-5xl">
          {content.lead.map((seg, i) => (
            <span key={i}>
              {i === 1 && <br />}
              {seg.accent ? <span className="text-ember">{seg.text}</span> : seg.text}
            </span>
          ))}
        </p>
        <p className="mt-10 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
          {content.body}
        </p>
        <div className="mt-10 h-px w-24 bg-ember" />
      </Container>
    </section>
  );
}
