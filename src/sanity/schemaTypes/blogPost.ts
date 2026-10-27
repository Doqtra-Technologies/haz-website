import { defineField, defineType } from "sanity";
import { imageField, paragraphsField, slugField } from "./fields";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slugField("title"),
    defineField({ name: "excerpt", title: "Short excerpt", type: "text", rows: 2 }),
    defineField({ name: "date", title: "Publish date", type: "date", validation: (r) => r.required(), initialValue: () => new Date().toISOString().slice(0, 10) }),
    defineField({ name: "category", title: "Category", type: "string", description: "e.g. Christmas" }),
    imageField("image", "Cover photo"),
    paragraphsField("body", "Article text"),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
});
