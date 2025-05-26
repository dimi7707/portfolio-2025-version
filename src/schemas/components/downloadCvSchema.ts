import { z } from "astro:content";

const downloadCvSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  link: z.string(),
});

export default downloadCvSchema;
