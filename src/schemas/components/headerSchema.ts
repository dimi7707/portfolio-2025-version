import { z } from "astro:content";

const headerSchema = z.object({
  menuElements: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      path: z.string(),
    }),
  ),
  logo: z.string(),
  socialMedia: z.array(
    z.object({
      name: z.string(),
      path: z.string(),
    }),
  ),
});

export default headerSchema;
