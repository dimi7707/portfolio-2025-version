import React from "react";
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import AIPassionSection from "./AIPassionSection";

describe("AIPassionSection Component Interface", () => {
  describe("1.1: Component renders title and description from props", () => {
    it("should display the title and description passed as props", () => {
      render(
        <AIPassionSection
          title="AI-Native Development"
          description="I don't just use AI tools — I orchestrate them."
        />,
      );
      expect(screen.getByText("AI-Native Development")).toBeInTheDocument();
      expect(
        screen.getByText("I don't just use AI tools — I orchestrate them."),
      ).toBeInTheDocument();
    });
  });

  describe("1.2: Component renders without crashing with an empty description", () => {
    it("should render the title even when description is an empty string", () => {
      render(<AIPassionSection title="AI-Native Development" description="" />);
      expect(screen.getByText("AI-Native Development")).toBeInTheDocument();
    });
  });

  describe("1.3: Component ignores a legacy tools prop without crashing or rendering it", () => {
    it("should render normally and not render any tool pill when an unexpected tools array is passed", () => {
      const legacyProps = {
        title: "AI-Native Development",
        description: "Copy",
        tools: ["Claude Code", "Cursor AI", "MCP Integrations"],
      } as unknown as React.ComponentProps<typeof AIPassionSection>;

      const { container } = render(<AIPassionSection {...legacyProps} />);
      expect(screen.getByText("AI-Native Development")).toBeInTheDocument();
      expect(container.textContent).not.toMatch(
        /Claude Code|Cursor AI|MCP Integrations/,
      );
    });
  });
});
