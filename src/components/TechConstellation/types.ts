export type TechConstellationCategory =
  | "languages"
  | "frameworks"
  | "data"
  | "infra"
  | "testing";

export interface TechConstellationNode {
  name: string;
  category: TechConstellationCategory;
  note?: string;
}
