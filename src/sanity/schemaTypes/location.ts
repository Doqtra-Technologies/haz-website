import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, orderField, paragraphsField, slugField } from "./fields";

const hoursField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "object",
        name: "hours",
        fields: [
          defineField({ name: "days", title: "Days", type: "string", description: "e.g. Monday – Saturday" }),
          defineField({ name: "time", title: "Hours", type: "string", description: "e.g. 11.30am to 11.30pm" }),
        ],
        preview: { select: { title: "days", subtitle: "time" } },
      }),
    ],
  });

export const location = defineType({
  name: "location",
  title: "Restaurant location",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", description: "e.g. Haz Premier Place", validation: (r) => r.required() }),
    defineField({ name: "shortName", title: "Short name", type: "string", description: "e.g. Premier Place", validation: (r) => r.required() }),
    slugField("name"),
    defineField({ name: "region", title: "Region", type: "string", initialValue: "London" }),
    defineField({ name: "phone", title: "Phone number", type: "string" }),
    defineField({ name: "email", title: "Business email", type: "string", description: "Shown on the location card and page." }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "mapUrl", title: "Google Maps link", type: "url" }),
    imageField("cardImage", "Card photo", "Shown on the locations list and the home page."),
    imageField("heroImage", "Banner photo", "Large photo at the top of the location page."),
    imageField("interiorImage", "Interior photo", "Shown beside the description on the location page."),
    defineField({ name: "headline", title: "Headline", type: "string", description: "e.g. HAZ Premier Place" }),
    paragraphsField("description", "Description"),
    hoursField("hours", "Short opening hours", "Compact hours shown on location cards."),
    hoursField("openingTimes", "Opening times", "Full hours shown on the location page."),
    defineField({
      name: "highlights",
      title: "Menu highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlight",
          fields: [
            defineField({ name: "name", title: "Dish name", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            imageField("image", "Photo"),
          ],
          preview: { select: { title: "name", subtitle: "description", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Photo description", type: "string" })] })],
    }),
    defineField({
      name: "groupDining",
      title: "Group dining",
      type: "object",
      fields: [
        defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
        defineField({ name: "brochureUrl", title: "Brochure link (optional)", type: "url" }),
        defineField({
          name: "gallery",
          title: "Group dining photos",
          type: "array",
          of: [defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Photo description", type: "string" })] })],
        }),
      ],
    }),
    orderField("Lower numbers appear first (1, 2, 3…)."),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "address", media: "cardImage" } },
});
