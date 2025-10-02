import { z } from "astro:content";
import {
  heroSchema,
  careerTimeLineSchema,
  downloadCvSchema,
  techStackCarouselSchema,
  aiPassionSchema,
} from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  aiPassion: aiPassionSchema,
  techStackCarousel: techStackCarouselSchema,
  careerTimeLine: careerTimeLineSchema,
  downloadCv: downloadCvSchema,
});

export default homeSchema;
