/**
 * A slot for a photo. While `src` is undefined the UI renders a labelled
 * placeholder. To use a real image, drop the file in /public/images and set
 * `src` to e.g. "/images/premier-place-hero.jpg".
 */
export interface ImageSlot {
  label: string;
  src?: string;
}

export const imageSlot = (label: string, src?: string): ImageSlot => ({
  label,
  src,
});
