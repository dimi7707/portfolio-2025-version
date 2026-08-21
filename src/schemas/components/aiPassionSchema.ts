import { z } from "astro:content";

const aiPassionSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default aiPassionSchema;
