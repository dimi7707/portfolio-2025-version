import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import homeSchema from "../schemas/pages/homeSchema";

const homeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/" }),
  schema: homeSchema,
});

export const collections = {
  homeCollection,
};
