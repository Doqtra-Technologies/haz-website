import Image from "next/image";
import Link from "next/link";

// Master artwork from the brand pack. Oat ("light") is for dark, coral and terracotta
// backgrounds; Espresso for oat and porcelain.
const artwork = {
  logotype: { light: "/brand/haz-logo-light.svg", dark: "/brand/haz-logo.svg", width: 1897, height: 634 },
  lockup: { light: "/brand/haz-lockup-light.svg", dark: "/brand/haz-lockup.svg", width: 1897, height: 883 },
} as const;

interface LogoProps {
  /** The "bar&restaurant" lock-up must render at least 90px tall (guidelines p.24). */
  variant?: keyof typeof artwork;
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export function LogoImage({ variant = "logotype", tone = "light", className = "", priority = false }: LogoProps) {
  const art = artwork[variant];
  return (
    <Image
      src={art[tone]}
      alt="HAZ"
      width={art.width}
      height={art.height}
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Haz home" className={`block ${className}`}>
      <LogoImage priority className="h-8 sm:h-9" />
    </Link>
  );
}
