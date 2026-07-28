import React from "react";
import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import CareerTimeLine from "./CareerTimeLine";
import type { Experience } from "./CareerTimeLine";

const mockExperiences: Experience[] = [
  {
    company: "Test Company",
    position: "Senior Developer",
    period: "Mar 2023 - Jun 2025",
    description: "Led development team",
    technologies: ["React", "TypeScript"],
    achievements: ["Shipped major feature"],
    companyLogo: "/logo.png",
  },
];

describe("CareerTimeLine Component Interface", () => {
  describe("2.1: Component renders without crashing with minimal props", () => {
    it("should render without crashing", () => {
      render(<CareerTimeLine titleSection="Career" experiences={[]} />);
      expect(screen.getByText("Career")).toBeInTheDocument();
    });
  });

  describe("2.2: Component renders title from titleSection prop", () => {
    it("should display the title from titleSection prop", () => {
      render(
        <CareerTimeLine titleSection="My Career Journey" experiences={[]} />,
      );
      expect(screen.getByText("My Career Journey")).toBeInTheDocument();
    });
  });

  describe("2.3: Component renders correct number of cards from experiences array", () => {
    it("should render one card for one experience", () => {
      render(
        <CareerTimeLine titleSection="Career" experiences={mockExperiences} />,
      );
      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });

    it("should render multiple cards for multiple experiences", () => {
      const multipleExperiences: Experience[] = [
        { ...mockExperiences[0], company: "Company A" },
        { ...mockExperiences[0], company: "Company B" },
        { ...mockExperiences[0], company: "Company C" },
      ];
      render(
        <CareerTimeLine
          titleSection="Career"
          experiences={multipleExperiences}
        />,
      );
      expect(screen.getByText("Company A")).toBeInTheDocument();
      expect(screen.getByText("Company B")).toBeInTheDocument();
      expect(screen.getByText("Company C")).toBeInTheDocument();
    });
  });

  describe("2.4: Component handles empty experiences array gracefully", () => {
    it("should render without errors when experiences array is empty", () => {
      render(<CareerTimeLine titleSection="Career" experiences={[]} />);
      expect(screen.getByText("Career")).toBeInTheDocument();
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });
  });

  describe("2.5: TypeScript interfaces match existing Experience type", () => {
    it("should accept Experience objects with all required fields", () => {
      const validExperience: Experience = {
        company: "Test",
        position: "Developer",
        period: "2020-2021",
        description: "Description",
        technologies: ["Tech"],
        achievements: ["Achievement"],
        companyLogo: "/logo.png",
      };

      render(
        <CareerTimeLine
          titleSection="Career"
          experiences={[validExperience]}
        />,
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });
});

describe("Company Badge Display Logic", () => {
  describe("3.1: Badge displays company logo when companyLogo prop exists", () => {
    it("should display company logo image when companyLogo is provided", () => {
      const expWithLogo: Experience[] = [
        {
          ...mockExperiences[0],
          company: "LogoCo",
          companyLogo: "/path/to/logo.png",
        },
      ];
      render(
        <CareerTimeLine titleSection="Career" experiences={expWithLogo} />,
      );
      const logoImg = screen.getByAltText(/Logo de LogoCo/i);
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute("src", "/path/to/logo.png");
    });
  });

  describe("3.2: Badge displays companyInitials when provided (no logo)", () => {
    it("should display initials when companyInitials provided but no logo", () => {
      const expWithInitials: Experience[] = [
        {
          ...mockExperiences[0],
          company: "InitialsCo",
          companyLogo: undefined,
          companyInitials: "IC",
        },
      ];
      render(
        <CareerTimeLine titleSection="Career" experiences={expWithInitials} />,
      );
      expect(screen.getByText("IC")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });
  });

  describe("3.3: Badge auto-generates initials from company name when neither logo nor initials provided", () => {
    it("should auto-generate initials when no logo or initials provided", () => {
      const expNoLogoOrInitials: Experience[] = [
        {
          ...mockExperiences[0],
          company: "AutoGenCo",
          companyLogo: undefined,
          companyInitials: undefined,
        },
      ];
      render(
        <CareerTimeLine
          titleSection="Career"
          experiences={expNoLogoOrInitials}
        />,
      );
      expect(screen.getByText("AU")).toBeInTheDocument();
    });
  });

  describe("3.4: Auto-generated initials extract first 2 uppercase letters from single-word company", () => {
    it('should extract first 2 letters from single-word company name "KUBO"', () => {
      const exp: Experience[] = [
        {
          ...mockExperiences[0],
          company: "KUBO",
          companyLogo: undefined,
          companyInitials: undefined,
        },
      ];
      render(<CareerTimeLine titleSection="Career" experiences={exp} />);
      expect(screen.getByText("KU")).toBeInTheDocument();
    });
  });

  describe("3.5: Auto-generated initials extract first letter of each word for multi-word company", () => {
    it('should extract first letter of each word from "Sophos Solutions"', () => {
      const exp: Experience[] = [
        {
          ...mockExperiences[0],
          company: "Sophos Solutions",
          companyLogo: undefined,
          companyInitials: undefined,
        },
      ];
      render(<CareerTimeLine titleSection="Career" experiences={exp} />);
      expect(screen.getByText("SO")).toBeInTheDocument();
    });
  });

  describe("3.6: Badge has correct CSS classes and structure", () => {
    it("should have badge container with correct class names", () => {
      const exp: Experience[] = [
        {
          ...mockExperiences[0],
          companyInitials: "TC",
        },
      ];
      const { container } = render(
        <CareerTimeLine titleSection="Career" experiences={exp} />,
      );
      const badge = container.querySelector('[class*="companyBadge"]');
      expect(badge).toBeInTheDocument();
    });
  });
});
