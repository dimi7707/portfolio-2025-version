import { z } from "astro:content";
import { contactSectionSchema } from "../index";

const contactSchema = z.object({
  contactSection: contactSectionSchema,
});

export default contactSchema;
