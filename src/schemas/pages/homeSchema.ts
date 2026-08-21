import { z } from "astro:content";
import {
  heroSchema,
  careerTimeLineSchema,
  downloadCvSchema,
  techConstellationSchema,
  aiPassionSchema,
} from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  aiPassion: aiPassionSchema,
  techConstellation: techConstellationSchema,
  careerTimeLine: careerTimeLineSchema,
  downloadCv: downloadCvSchema,
});

export default homeSchema;
