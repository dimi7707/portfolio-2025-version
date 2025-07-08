import { z } from "astro:content";
import {
  heroSchema,
  careerTimeLineSchema,
  downloadCvSchema,
  techStackCarouselSchema,
} from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  techStackCarousel: techStackCarouselSchema,
  careerTimeLine: careerTimeLineSchema,
  downloadCv: downloadCvSchema,
});

export default homeSchema;
