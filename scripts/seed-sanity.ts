/**
 * Loads the existing HAZ website content (and photos) into Sanity.
 *
 *   pnpm seed:sanity            create documents that do not exist yet (never overwrites edits)
 *   pnpm seed:sanity --force    overwrite every document with the bundled content
 *   pnpm seed:sanity --dry      validate the content and photo files without contacting Sanity
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN
 * (see .env.example). Run through `pnpm seed:sanity` so .env.local is loaded.
 */
import { createReadStream, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { createClient } from "next-sanity";
import type { ImageSlot } from "../src/core/domain/entities/image";
import { blogPosts } from "../src/infrastructure/data/blog";
import { siteContent } from "../src/infrastructure/data/content";
import { events } from "../src/infrastructure/data/events";
import { locations } from "../src/infrastructure/data/locations";
import { menus } from "../src/infrastructure/data/menus";

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");
const force = args.has("--force");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!dry && (!projectId || !token)) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. See .env.example.");
  process.exit(1);
}

const client = dry
  ? null
  : createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

const publicDir = path.resolve(process.cwd(), "public");
const assetCache = new Map<string, string>();
const missingFiles = new Set<string>();
let key = 0;
const nextKey = () => `k${(++key).toString(36)}`;

async function uploadAsset(src: string): Promise<string | undefined> {
  const cached = assetCache.get(src);
  if (cached) return cached;
  const file = path.join(publicDir, src.replace(/^\//, ""));
  if (!existsSync(file)) {
    missingFiles.add(src);
    return undefined;
  }
  const id = dry
    ? `image-${createHash("sha1").update(src).digest("hex")}-1000x1000-webp`
    : (await client!.assets.upload("image", createReadStream(file), { filename: path.basename(file) }))._id;
  assetCache.set(src, id);
  console.log(`  ${dry ? "checked" : "uploaded"} ${src}`);
  return id;
}

async function image(slot: ImageSlot | undefined, withKey = false) {
  if (!slot?.src) return undefined;
  const ref = await uploadAsset(slot.src);
  if (!ref) return undefined;
  return {
    _type: "image",
    ...(withKey ? { _key: nextKey() } : {}),
    asset: { _type: "reference", _ref: ref },
    alt: slot.label,
  };
}

const images = async (slots: ImageSlot[]) =>
  (await Promise.all(slots.map((s) => image(s, true)))).filter(Boolean);

const slug = (current: string) => ({ _type: "slug", current });
const rows = <T extends object>(type: string, values: T[]) =>
  values.map((value) => ({ _type: type, _key: nextKey(), ...value }));

async function buildDocuments() {
  const docs: Record<string, unknown>[] = [];

  for (const [index, l] of locations.entries()) {
    docs.push({
      _id: `location-${l.slug}`,
      _type: "location",
      name: l.name,
      shortName: l.shortName,
      slug: slug(l.slug),
      region: l.region,
      phone: l.phone,
      email: l.email,
      address: l.address,
      mapUrl: l.mapUrl,
      cardImage: await image(l.cardImage),
      heroImage: await image(l.heroImage),
      interiorImage: await image(l.interiorImage),
      headline: l.headline,
      description: l.description,
      hours: rows("hours", l.hours),
      openingTimes: rows("hours", l.openingTimes),
      highlights: await Promise.all(
        l.highlights.map(async (h) => ({
          _type: "highlight",
          _key: nextKey(),
          name: h.name,
          description: h.description,
          image: await image(h.image),
        })),
      ),
      gallery: await images(l.gallery),
      groupDining: {
        description: l.groupDining.description,
        brochureUrl: l.groupDining.brochureUrl,
        gallery: await images(l.groupDining.gallery),
      },
      order: index + 1,
    });
  }

  for (const [index, m] of menus.entries()) {
    docs.push({
      _id: `menu-${m.slug}`,
      _type: "menuCategory",
      label: m.label,
      slug: slug(m.slug),
      intro: m.intro,
      items: rows("menuItem", m.items),
      order: index + 1,
    });
  }

  for (const [index, e] of events.entries()) {
    docs.push({
      _id: `event-${e.slug}`,
      _type: "event",
      title: e.title,
      slug: slug(e.slug),
      categoryLabel: e.categoryLabel,
      summary: e.summary,
      image: await image(e.image),
      imageFit: e.imageFit ?? "cover",
      bannerImage: await image(e.bannerImage),
      detailImage: await image(e.detailImage),
      detailImageFit: e.detailImageFit ?? "cover",
      body: e.body,
      dates: e.dates,
      venue: e.venue,
      schedule: e.schedule,
      recurring: e.recurring,
      ctaLabel: e.ctaLabel,
      ctaUrl: e.ctaUrl,
      endsAt: e.endsAt,
      order: index + 1,
    });
  }

  for (const p of blogPosts) {
    docs.push({
      _id: `blog-${p.slug}`,
      _type: "blogPost",
      title: p.title,
      slug: slug(p.slug),
      excerpt: p.excerpt,
      date: p.date,
      category: p.category,
      image: await image(p.image),
      body: p.body,
    });
  }

  const c = siteContent;
  docs.push({
    _id: "siteContent",
    _type: "siteContent",
    welcomeLead: rows("segment", c.welcome.lead.map((s) => ({ text: s.text, accent: Boolean(s.accent) }))),
    welcomeBody: c.welcome.body,
    promos: await Promise.all(
      c.promos.map(async (p) => ({
        _type: "promo",
        _key: nextKey(),
        eyebrow: p.eyebrow,
        title: p.title,
        body: p.body,
        ctaLabel: p.ctaLabel,
        href: p.href,
        image: await image(p.image),
      })),
    ),
    storyHeading: c.story.heading,
    storyParagraphs: c.story.paragraphs,
    storyPrinciples: c.story.principles,
    storyImage: await image(c.story.image),
    journey: await Promise.all(
      c.journey.map(async (s) => ({
        _type: "journeyStep",
        _key: nextKey(),
        year: s.year,
        title: s.title,
        text: s.text,
        image: await image(s.image),
      })),
    ),
    spotlightTitle: c.spotlight.title,
    spotlightParagraphs: c.spotlight.paragraphs,
    spotlightCtaLabel: c.spotlight.ctaLabel,
    spotlightHref: c.spotlight.href,
    spotlightImage: await image(c.spotlight.image),
  });

  return docs;
}

async function main() {
  console.log(dry ? "Dry run: nothing will be sent to Sanity." : `Seeding ${projectId}/${dataset}…`);
  const docs = await buildDocuments();

  if (missingFiles.size > 0) {
    console.error("Missing photo files in /public:\n  " + [...missingFiles].join("\n  "));
    process.exit(1);
  }

  if (dry) {
    const dumpArg = process.argv.find((a) => a.startsWith("--dump="));
    if (dumpArg) {
      const { writeFileSync } = await import("node:fs");
      writeFileSync(dumpArg.slice("--dump=".length), JSON.stringify(docs, null, 2));
    }
    console.log(`OK: ${docs.length} documents and ${assetCache.size} photos are ready to import.`);
    return;
  }

  const tx = client!.transaction();
  for (const doc of docs) {
    // Strip undefined values: Sanity rejects them.
    const clean = JSON.parse(JSON.stringify(doc));
    if (force) tx.createOrReplace(clean);
    else tx.createIfNotExists(clean);
  }
  await tx.commit();
  console.log(
    `Done: ${docs.length} documents ${force ? "written (overwritten)" : "created if missing"}. Publish state: all published.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
