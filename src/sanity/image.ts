import imageUrlBuilder from "@sanity/image-url";
import type { ImageSlot } from "@/core/domain/entities/image";
import { dataset, projectId } from "./env";

export interface SanityImageValue {
  alt?: string;
  asset?: { _ref?: string; _id?: string };
  crop?: unknown;
  hotspot?: unknown;
}

let builder: ReturnType<typeof imageUrlBuilder> | undefined;
const getBuilder = () => (builder ??= imageUrlBuilder({ projectId, dataset }));

/** Converts a Sanity image into the site's ImageSlot (placeholder when no image is set). */
export function toImageSlot(
  image: SanityImageValue | null | undefined,
  fallbackLabel: string,
): ImageSlot {
  const label = image?.alt?.trim() || fallbackLabel;
  if (!image?.asset) return { label };
  return {
    label,
    src: getBuilder()
      .image(image as Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0])
      .width(2400)
      .fit("max")
      .auto("format")
      .url(),
  };
}
