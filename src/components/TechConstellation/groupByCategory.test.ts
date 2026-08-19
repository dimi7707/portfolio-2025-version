import { describe, it, expect } from "@jest/globals";
import { groupByCategory } from "./groupByCategory";
import type { TechConstellationNode } from "./types";

describe("groupByCategory", () => {
  describe("1.1: groups nodes into their category, preserving input order", () => {
    it("should place each node under its category key in the order given", () => {
      const nodes: TechConstellationNode[] = [
        { name: "Python", category: "languages" },
        { name: "React", category: "frameworks" },
        { name: "PHP", category: "languages" },
      ];

      const grouped = groupByCategory(nodes);

      expect(grouped.languages.map((n) => n.name)).toEqual([
        "Python",
        "PHP",
      ]);
      expect(grouped.frameworks.map((n) => n.name)).toEqual(["React"]);
    });
  });

  describe("1.2: returns empty groups for an empty node list", () => {
    it("should not throw and every category should be an empty array", () => {
      expect(() => groupByCategory([])).not.toThrow();
      const grouped = groupByCategory([]);
      expect(grouped.languages).toEqual([]);
      expect(grouped.frameworks).toEqual([]);
      expect(grouped.data).toEqual([]);
      expect(grouped.infra).toEqual([]);
      expect(grouped.testing).toEqual([]);
    });
  });

  describe("1.3: collects nodes with an unexpected category under 'other' instead of crashing", () => {
    it("should bucket an unrecognized category value under 'other'", () => {
      const nodes = [
        { name: "Mystery", category: "unknown-category" },
      ] as unknown as TechConstellationNode[];

      expect(() => groupByCategory(nodes)).not.toThrow();
      const grouped = groupByCategory(nodes);
      expect(grouped.other.map((n) => n.name)).toEqual(["Mystery"]);
    });
  });
});
