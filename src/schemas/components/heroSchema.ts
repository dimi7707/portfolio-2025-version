import { z } from "astro:content";

const heroSchema = z.object({
  titleFirstPart: z.string(),
  titleSecondPart: z.string(),
  subtitle: z.string(),
  description: z.string(),
  mainImage: z.string(),
  imageAlt: z.string(),
});

export default heroSchema;
