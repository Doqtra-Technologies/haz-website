import { defineArrayMember, defineField, defineType } from "sanity";
import { orderField, slugField } from "./fields";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Menu name", type: "string", description: "e.g. A La Carte, Set Lunch", validation: (r) => r.required() }),
    slugField("label"),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Dishes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuItem",
          fields: [
            defineField({ name: "name", title: "Dish name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "price", title: "Price", type: "string", description: "Include the symbol, e.g. £9.50" }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        }),
      ],
    }),
    orderField("Lower numbers appear first (1, 2, 3…)."),
  ],
  preview: { select: { title: "label", subtitle: "intro" } },
});
