"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/** Uses the supplied HAZ mark, with a text fallback if the asset is unavailable. */
export function Logo({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link href="/" aria-label="Haz home" className={`block ${className}`}>
      {failed ? (
        <span className="font-display text-3xl font-light tracking-[0.2em] text-white">HAZ</span>
      ) : (
        <Image
          src="/logo.png"
          alt="HAZ"
          width={155}
          height={135}
          priority
          onError={() => setFailed(true)}
          className="h-12 w-auto brightness-0 invert"
        />
      )}
    </Link>
  );
}
