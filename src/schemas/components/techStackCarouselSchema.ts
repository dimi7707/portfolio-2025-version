import { z } from "astro:content";

const techStackCarouselSchema = z.object({
  title: z.string(),
  technologies: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      category: z.string(),
    }),
  ),
});

export default techStackCarouselSchema;
