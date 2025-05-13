import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import homeSchema from "../schemas/pages/homeSchema";

const esHomeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/" }),
  schema: homeSchema,
});

const enHomeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/" }),
  schema: homeSchema,
});

export const collections = {
  esHomeCollection,
  enHomeCollection,
};
