import { z } from "astro:content";
import {
  aboutMeSchema,
  skillChartSchema,
  techStackCarouselSchema,
} from "../index";

const aboutSchema = z.object({
  aboutMeSection: aboutMeSchema,
  skillChart: skillChartSchema,
  techStackCarousel: techStackCarouselSchema,
});

export default aboutSchema;
