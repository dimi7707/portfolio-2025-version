import { z } from "astro:content";

const techStackCarouselSchema = z.object({
  title: z.string(),
});

export default techStackCarouselSchema;
