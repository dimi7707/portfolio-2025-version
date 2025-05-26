import { z } from "astro:content";
import { heroSchema, careerTimeLineSchema, downloadCvSchema } from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  careerTimeLine: careerTimeLineSchema,
  downloadCv: downloadCvSchema,
});

export default homeSchema;
