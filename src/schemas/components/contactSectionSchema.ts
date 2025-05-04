import { z } from "astro:content";

const contactSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  email: z.string().email(),
  socialLinks: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url(),
  }),
  emailButtonText: z.string(),
});

export default contactSectionSchema;
