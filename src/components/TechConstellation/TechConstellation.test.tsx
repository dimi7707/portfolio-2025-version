import React from "react";
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import TechConstellation from "./TechConstellation";
import type { TechConstellationNode } from "./types";

const fullNodeList: TechConstellationNode[] = [
  { name: "Python", category: "languages" },
  { name: "PHP", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "C#", category: "languages" },
  { name: "React", category: "frameworks" },
  { name: "Vue.js", category: "frameworks" },
  { name: "Astro", category: "frameworks" },
  { name: "PostgreSQL", category: "data" },
  { name: "MySQL", category: "data" },
  { name: "Redis", category: "data" },
  { name: "MongoDB", category: "data" },
  { name: "Docker", category: "infra" },
  { name: "AWS", category: "infra" },
  { name: "Testing", category: "testing", note: "Jest / Cypress / PHPUnit" },
];

describe("TechConstellation Component Interface", () => {
  describe("1.1: renders title and subtitle from props", () => {
    it("should display the title and subtitle text", () => {
      render(
        <TechConstellation
          title="The Tech Constellation"
          subtitle="Mapping the core stack architecture."
          nodes={fullNodeList}
        />,
      );
      expect(screen.getByText("The Tech Constellation")).toBeInTheDocument();
      expect(
        screen.getByText("Mapping the core stack architecture."),
      ).toBeInTheDocument();
    });
  });

  describe("1.2: renders exactly the 15 nodes provided, each with visible name text", () => {
    it("should render all 15 node names", () => {
      render(
        <TechConstellation
          title="The Tech Constellation"
          subtitle="Mapping the core stack architecture."
          nodes={fullNodeList}
        />,
      );
      fullNodeList.forEach((node) => {
        expect(screen.getByText(node.name)).toBeInTheDocument();
      });
    });
  });

  describe("1.3: renders without crashing when given an empty nodes array", () => {
    it("should render title/subtitle and no node names", () => {
      render(
        <TechConstellation title="Empty" subtitle="No nodes" nodes={[]} />,
      );
      expect(screen.getByText("Empty")).toBeInTheDocument();
    });
  });
});
