import { imageSlot } from "@/core/domain/entities/image";
import { Photo } from "../ui/Photo";

const hero = imageSlot("Home hero: HAZ dining room (full-bleed)", "/images/haz-home-hero.jpg");

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy-950">
      <Photo slot={hero} priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <h1 className="font-display text-[22vw] font-light leading-none tracking-[0.12em] text-white/95 sm:text-[16vw] lg:text-[12rem]">
          HAZ
        </h1>
        <p className="mt-2 max-w-md font-display text-xl text-white/80">
          Mediterranean dining in the heart of London.
        </p>
      </div>
      <div className="absolute bottom-6 left-5 flex items-center gap-3 sm:left-8 lg:left-12">
        <span className="h-10 w-px bg-ember" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-white/70">
          The essence of Haz
        </span>
      </div>
    </section>
  );
}
