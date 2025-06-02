import { z } from "astro:content";

const careerTimeLineSchema = z.object({
  experiences: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
      achievements: z.array(z.string()),
      companyLogo: z.string().optional(),
    }),
  ),
});

export default careerTimeLineSchema;
