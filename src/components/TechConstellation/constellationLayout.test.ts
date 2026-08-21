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
      for (const name of ALL_NODE_NAMES) {
        expect(NODE_POSITIONS[name]).toBeDefined();
      }
    });
  });

  describe("1.2: every connection references two positioned nodes", () => {
    it("should not reference a name missing from NODE_POSITIONS", () => {
      for (const [from, to] of CONNECTIONS) {
        expect(NODE_POSITIONS[from]).toBeDefined();
        expect(NODE_POSITIONS[to]).toBeDefined();
      }
    });
  });

  describe("1.3: every node appears in at least one connection", () => {
    it("should not leave any node visually isolated", () => {
      const connectedNames = new Set(CONNECTIONS.flat());
      for (const name of ALL_NODE_NAMES) {
        expect(connectedNames.has(name)).toBe(true);
      }
    });
  });
});
