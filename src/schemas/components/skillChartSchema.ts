import { z } from "astro:content";

const skillsChartSchema = z.object({
  title: z.string(),
  description: z.string(),
  skills: z.array(z.string()),
});

export default skillsChartSchema;
