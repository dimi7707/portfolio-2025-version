import { z } from "astro:content";

const aiPassionSchema = z.object({
  title: z.string(),
  description: z.string(),
  tools: z.array(z.string()),
});

export default aiPassionSchema;
