import type { TechConstellationCategory, TechConstellationNode } from "./types";

const KNOWN_CATEGORIES: TechConstellationCategory[] = [
  "languages",
  "frameworks",
  "data",
  "infra",
  "testing",
];

export type GroupedTechNodes = Record<TechConstellationCategory | "other", TechConstellationNode[]>;

const isKnownCategory = (
  category: string,
): category is TechConstellationCategory =>
  (KNOWN_CATEGORIES as string[]).includes(category);

// Single source of truth for clustering nodes by category — both the desktop
// cluster layout and the mobile chain read from this instead of re-deriving
// groups independently.
export const groupByCategory = (
  nodes: TechConstellationNode[],
): GroupedTechNodes => {
  const grouped: GroupedTechNodes = {
    languages: [],
    frameworks: [],
    data: [],
    infra: [],
    testing: [],
    other: [],
  };

  for (const node of nodes) {
    const bucket = isKnownCategory(node.category) ? node.category : "other";
    grouped[bucket].push(node);
  }

  return grouped;
};
