import Link from "next/link";
import type { Location } from "@/core/domain/entities/location";
import { Photo } from "../ui/Photo";

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white text-ink shadow-md transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo
          slot={location.cardImage}
          className="transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brick">
          {location.region}
        </p>
        <h3 className="mt-2 text-lg font-semibold uppercase tracking-wide">
          {location.name}
        </h3>
        <div className="mt-2 h-0.5 w-5 bg-ink/70" />
        <ul className="mt-4 space-y-2 text-xs text-ink/75">
          <li className="flex items-center gap-2">
            <span className="text-brick" aria-hidden>☎</span>
            {location.phone}
          </li>
          {location.email && (
            <li className="flex items-center gap-2">
              <span className="text-brick" aria-hidden>✉</span>
              <a href={`mailto:${location.email}`} className="break-all underline-offset-2 hover:underline">
                {location.email}
              </a>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-brick" aria-hidden>⌖</span>
            {location.address}
          </li>
        </ul>
        <div className="mt-4 border-t border-ink/10 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brick">
            Opening hours
          </p>
          <dl className="mt-2 space-y-1 text-xs text-ink/80">
            {location.hours.map((h) => (
              <div key={h.days} className="flex justify-between">
                <dt>{h.days}</dt>
                <dd className="font-medium">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-5 h-0.5 w-16 bg-brick/70 transition-all group-hover:w-24" />
      </div>
    </Link>
  );
}
