import { z } from "astro:content";
import {
  heroSchema,
  careerTimeLineSchema,
  contactSectionSchema,
} from "../index";

const homeSchema = z.object({
  hero: heroSchema,
  careerTimeLine: careerTimeLineSchema,
  contactSection: contactSectionSchema,
});

export default homeSchema;
