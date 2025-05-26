import { z } from "astro:content";
import { heroSchema, careerTimeLineSchema } from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  careerTimeLine: careerTimeLineSchema,
});

export default homeSchema;
