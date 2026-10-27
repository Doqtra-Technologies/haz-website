import type { StructureResolver } from "sanity/structure";

export const SITE_CONTENT_ID = "siteContent";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("HAZ website")
    .items([
      S.listItem()
        .title("Home & About page content")
        .id(SITE_CONTENT_ID)
        .child(S.document().schemaType("siteContent").documentId(SITE_CONTENT_ID).title("Home & About page content")),
      S.divider(),
      S.documentTypeListItem("event").title("What's On events"),
      S.documentTypeListItem("menuCategory").title("Menus"),
      S.documentTypeListItem("location").title("Restaurant locations"),
      S.documentTypeListItem("blogPost").title("Blog posts"),
    ]);
