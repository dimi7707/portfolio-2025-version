import { z } from "astro:content";

const careerTimeLineSchema = z.object({
  titleSection: z.string().optional(),
  achievementsLabel: z.string(),
  technologiesLabel: z.string(),
  experiences: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.string().optional(),
      technologies: z.array(z.string()),
      achievements: z.array(z.string()).optional(),
      companyLogo: z.string().optional(),
    }),
  ),
});

export default careerTimeLineSchema;
