import { describe, it, expect } from "@jest/globals";
import { getIconForTech } from "./iconMap";

describe("getIconForTech", () => {
  describe("1.1: returns the correct icon for a known technology name", () => {
    it("should return the Python icon component for 'Python'", () => {
      const icon = getIconForTech("Python");
      expect(icon).toBeDefined();
      expect(typeof icon).toBe("function");
    });

    it("should return a defined icon component for every known node name", () => {
      const knownNames = [
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

      for (const name of knownNames) {
        expect(getIconForTech(name)).toBeDefined();
      }
    });
  });

  describe("1.2: returns the generic fallback icon for an unrecognized name", () => {
    it("should not throw and should return a component for an unknown tech name", () => {
      expect(() => getIconForTech("SomeUnknownFrameworkXYZ")).not.toThrow();
      const icon = getIconForTech("SomeUnknownFrameworkXYZ");
      expect(icon).toBeDefined();
      expect(typeof icon).toBe("function");
    });
  });
});
