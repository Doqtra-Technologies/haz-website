"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImageSlot } from "@/core/domain/entities/image";

const tones = [
  "from-haz-terracotta to-haz-espresso",
  "from-haz-espresso to-haz-terracotta",
  "from-haz-coral/70 to-haz-espresso",
];

function toneFor(label: string) {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return tones[h % tones.length];
}

interface PhotoProps {
  slot: ImageSlot;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
}

/**
 * Fills its (relatively positioned) parent. Renders the real image when
 * `slot.src` is set, otherwise a labelled placeholder.
 */
export function Photo({
  slot,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fit = "cover",
}: PhotoProps) {
  const [failed, setFailed] = useState(false);
  if (slot.src && !failed) {
    return (
      <Image
        src={slot.src}
        alt={slot.label}
        fill
        sizes={sizes}
        quality={92}
        priority={priority}
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
        style={{ objectFit: fit, objectPosition: slot.position }}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={slot.label}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${toneFor(slot.label)} ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-white/30"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M21 16l-5-5-8 8" />
      </svg>
      <span className="max-w-[85%] text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
        {slot.label}
      </span>
    </div>
  );
}
