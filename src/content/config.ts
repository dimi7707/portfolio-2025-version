import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import homeSchema from "../schemas/pages/homeSchema";
import aboutSchema from "../schemas/pages/aboutSchema";
import contactSchema from "../schemas/pages/contactSchema";

const esHomeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/home/" }),
  schema: homeSchema,
});

const enHomeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/home/" }),
  schema: homeSchema,
});

const esAboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/about/" }),
  schema: aboutSchema,
});

const enAboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/about/" }),
  schema: aboutSchema,
});

const enContactCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/contact/" }),
  schema: contactSchema,
});

const esContactCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/contact/" }),
  schema: contactSchema,
});

export const collections = {
  esHomeCollection,
  enHomeCollection,
  esAboutCollection,
  enAboutCollection,
  esContactCollection,
  enContactCollection,
};
