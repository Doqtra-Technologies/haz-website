export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

/**
 * The site reads from Sanity only when explicitly switched on, so it keeps
 * serving the bundled content until the dataset has been seeded.
 */
export const isSanityEnabled =
  process.env.CONTENT_SOURCE === "sanity" && projectId.length > 0;
