import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let client: SanityClient | undefined;

function getClient(): SanityClient {
  client ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
  });
  return client;
}

/** Content is cached for a minute and refreshed instantly by the revalidate webhook. */
export function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  tags: string[],
): Promise<T> {
  return getClient().fetch<T>(query, params, { next: { revalidate: 60, tags } });
}
