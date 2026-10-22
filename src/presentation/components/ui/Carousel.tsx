"use client";

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  label?: string;
}

/** Horizontal scroll-snap carousel with prev / next arrows. */
export function Carousel({ children, className = "", label = "Carousel" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white drop-shadow md:flex hover:scale-110 transition-transform";

  return (
    <div className={`relative ${className}`}>
      <div
        ref={ref}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className={`${arrow} left-2`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M15 4l-8 8 8 8" /></svg>
      </button>
      <button type="button" aria-label="Next" onClick={() => scroll(1)} className={`${arrow} right-2`}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 4l8 8-8 8" /></svg>
      </button>
    </div>
  );
}
