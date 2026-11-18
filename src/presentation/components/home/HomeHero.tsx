import { imageSlot } from "@/core/domain/entities/image";
import { LogoImage } from "../layout/Logo";
import { Photo } from "../ui/Photo";

const hero = imageSlot("Home hero: HAZ dining room (full-bleed)", "/images/haz-home-hero.webp");

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-haz-espresso">
      <Photo slot={hero} priority sizes="100vw" />
      <div className="absolute inset-0 bg-haz-espresso/60 sm:bg-transparent sm:bg-gradient-to-r sm:from-haz-espresso/85 sm:via-haz-espresso/45 sm:to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <h1>
          <LogoImage variant="lockup" priority className="h-auto w-[70vw] max-w-[34rem] sm:w-[52vw]" />
        </h1>
        <p className="mt-6 max-w-md font-heading text-xl text-white">
          Mediterranean dining in the heart of London.
        </p>
      </div>
      <div className="absolute bottom-6 left-5 flex items-center gap-3 sm:left-8 lg:left-12">
        <span className="h-10 w-px bg-haz-coral" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-white/70">
          The essence of Haz
        </span>
      </div>
    </section>
  );
}
