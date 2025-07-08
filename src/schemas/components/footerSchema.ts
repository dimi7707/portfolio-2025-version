import { z } from "astro:content";

const footerSchema = z.object({
  menuElements: z.array(
    z.object({
      name: z.string(),
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

export default footerSchema;
