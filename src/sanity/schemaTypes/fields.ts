import { defineField } from "sanity";

export const imageField = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    group,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Photo description",
        type: "string",
        description: "A short description of the photo (used for accessibility and search engines).",
      }),
    ],
  });

export const paragraphsField = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    group,
    type: "array",
    description: description ??  "Each entry is one paragraph. Use the + button to add more.",
    of: [{ type: "text", rows: 4 }],
  });

export const orderField = (description: string) =>
  defineField({
    name: "order",
    title: "Display order",
    type: "number",
    description,
  });

export const slugField = (source: string) =>
  defineField({
    name: "slug",
    title: "Page address (slug)",
    type: "slug",
    description:
      "Part of the page's web address. Click Generate. Changing it later changes the link to this page.",
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required(),
  });
