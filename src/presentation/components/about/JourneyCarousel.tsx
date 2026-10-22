import type { JourneyStep } from "@/core/domain/entities/site-content";
import { Carousel } from "../ui/Carousel";
import { Container } from "../ui/Container";
import { Photo } from "../ui/Photo";

export function JourneyCarousel({ steps }: { steps: JourneyStep[] }) {
  return (
    <section className="bg-navy-900 py-16 sm:py-20">
      <Container>
        <h2 className="eyebrow font-semibold text-white">Our journey</h2>
        <Carousel className="mt-8" label="Our journey">
          {steps.map((s) => (
            <article
              key={s.title}
              className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
            >
              <div className="relative aspect-[4/5]">
                <Photo slot={s.image} sizes="(min-width: 1024px) 32vw, 82vw" />
              </div>
              <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] text-white/60">
                {s.year}
              </p>
              <h3 className="mt-3 text-xl font-light text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
