import { describe, it, expect } from "@jest/globals";
import { NODE_POSITIONS, CONNECTIONS } from "./constellationLayout";

const ALL_NODE_NAMES = [
  "Python",
  "PHP",
  "JavaScript",
  "TypeScript",
  "C#",
  "Docker",
  "AWS",
  "React",
  "Vue.js",
  "Astro",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "MongoDB",
  "Testing",
];

describe("constellationLayout", () => {
  describe("1.1: every real content node has a curated position", () => {
    it("should have a NODE_POSITIONS entry for all 15 node names", () => {
      ALL_NODE_NAMES.forEach((name) => {
        expect(NODE_POSITIONS[name]).toBeDefined();
      });
    });
  });

  describe("1.2: every connection references two positioned nodes", () => {
    it("should not reference a name missing from NODE_POSITIONS", () => {
      CONNECTIONS.forEach(([from, to]) => {
        expect(NODE_POSITIONS[from]).toBeDefined();
        expect(NODE_POSITIONS[to]).toBeDefined();
      });
    });
  });

  describe("1.3: every node appears in at least one connection", () => {
    it("should not leave any node visually isolated", () => {
      const connectedNames = new Set(CONNECTIONS.flat());
      ALL_NODE_NAMES.forEach((name) => {
        expect(connectedNames.has(name)).toBe(true);
      });
    });
  });
});
