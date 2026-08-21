import { z } from "astro:content";

const techConstellationNodeSchema = z.object({
  name: z.string(),
  // Drives which visual cluster a node belongs to and which nodes get
  // connector lines drawn between them.
  category: z.enum(["languages", "frameworks", "data", "infra", "testing"]),
  note: z.string().optional(),
});

const techConstellationSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  nodes: z.array(techConstellationNodeSchema),
});

export default techConstellationSchema;
