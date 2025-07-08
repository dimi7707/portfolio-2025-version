import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import homeSchema from "../schemas/pages/homeSchema";
import aboutSchema from "../schemas/pages/aboutSchema";
import contactSchema from "../schemas/pages/contactSchema";
import headerSchema from "../schemas/components/headerSchema";
import footerSchema from "../schemas/components/footerSchema";

const esHeaderCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/header/" }),
  schema: headerSchema,
});

const enHeaderCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/header/" }),
  schema: headerSchema,
});

const esFooterCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/es/footer/" }),
  schema: footerSchema,
});

const enFooterCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/en/footer/" }),
  schema: footerSchema,
});

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
  esHeaderCollection,
  enHeaderCollection,
  esHomeCollection,
  enHomeCollection,
  esAboutCollection,
  enAboutCollection,
  esContactCollection,
  enContactCollection,
};
