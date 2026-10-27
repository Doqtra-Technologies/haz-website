import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, paragraphsField } from "./fields";

export const siteContent = defineType({
  name: "siteContent",
  title: "Home & About page content",
  type: "document",
  groups: [
    { name: "welcome", title: "Home: welcome" },
    { name: "promos", title: "Home: promotions" },
    { name: "story", title: "About: our story" },
    { name: "journey", title: "About: timeline" },
    { name: "spotlight", title: "Home: restaurant spotlight" },
  ],
  fields: [
    defineField({
      name: "welcomeLead",
      title: "Welcome heading",
      type: "array",
      group: "welcome",
      description: "Text pieces joined together. Tick 'Highlight' to colour a piece with the accent colour.",
      of: [
        defineArrayMember({
          type: "object",
          name: "segment",
          fields: [
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({ name: "accent", title: "Highlight", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "text" } },
        }),
      ],
    }),
    defineField({ name: "welcomeBody", title: "Welcome text", type: "text", rows: 5, group: "welcome" }),
    defineField({
      name: "promos",
      title: "Promotions",
      type: "array",
      group: "promos",
      description: "The sliding promotion panels on the home page.",
      of: [
        defineArrayMember({
          type: "object",
          name: "promo",
          fields: [
            defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Text", type: "text", rows: 5 }),
            defineField({ name: "ctaLabel", title: "Button text", type: "string" }),
            defineField({ name: "href", title: "Button link", type: "string", description: "A page such as /book or a full web address." }),
            imageField("image", "Photo"),
          ],
          preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "storyHeading", title: "Heading", type: "string", group: "story" }),
    paragraphsField("storyParagraphs", "Story paragraphs", undefined, "story"),
    defineField({ name: "storyPrinciples", title: "Principles", type: "array", group: "story", of: [{ type: "string" }], description: "Short phrases listed in the story, e.g. 'warm hospitality'." }),
    imageField("storyImage", "Story photo", undefined, "story"),
    defineField({
      name: "journey",
      title: "Timeline",
      type: "array",
      group: "journey",
      of: [
        defineArrayMember({
          type: "object",
          name: "journeyStep",
          fields: [
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
            imageField("image", "Photo"),
          ],
          preview: { select: { title: "year", subtitle: "title", media: "image" } },
        }),
      ],
    }),
    defineField({ name: "spotlightTitle", title: "Title", type: "string", group: "spotlight" }),
    paragraphsField("spotlightParagraphs", "Text", undefined, "spotlight"),
    defineField({ name: "spotlightCtaLabel", title: "Button text", type: "string", group: "spotlight" }),
    defineField({ name: "spotlightHref", title: "Button link", type: "string", group: "spotlight" }),
    imageField("spotlightImage", "Photo", undefined, "spotlight"),
  ],
  preview: { prepare: () => ({ title: "Home & About page content" }) },
});
