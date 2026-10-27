import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "haz",
  title: "HAZ Website",
  basePath: "/studio",
  // Placeholder keeps builds working before the project id has been configured.
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // The home/about content is a single page: it can be edited but not created, duplicated or deleted.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global" ? prev.filter((item) => item.templateId !== "siteContent") : prev,
    actions: (prev, { schemaType }) =>
      schemaType === "siteContent"
        ? prev.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action ?? ""))
        : prev,
  },
});
