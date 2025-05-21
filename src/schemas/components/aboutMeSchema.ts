import { z } from "astro:content";

const aboutMeSchema = z.object({
  title: z.string(),
  description: z.string(),
  codeSnippet: z.string(),
});

export default aboutMeSchema;
