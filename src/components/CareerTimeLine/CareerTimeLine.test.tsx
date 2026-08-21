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

// Shared default labels so every render call below satisfies the now-required
// achievementsLabel/technologiesLabel props without repeating the two
// literal strings at each of the ~17 call sites.
const defaultLabels = {
  achievementsLabel: "Achievements",
  technologiesLabel: "Technologies",
};

describe("CareerTimeLine Component Interface", () => {
  describe("2.1: Component renders without crashing with minimal props", () => {
    it("should render without crashing", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[]}
        />,
      );
      expect(screen.getByText("Career")).toBeInTheDocument();
    });
  });

  describe("2.2: Component renders title from titleSection prop", () => {
    it("should display the title from titleSection prop", () => {
      render(
        <CareerTimeLine
          titleSection="My Career Journey"
          {...defaultLabels}
          experiences={[]}
        />,
      );
      expect(screen.getByText("My Career Journey")).toBeInTheDocument();
    });
  });

  describe("2.3: Component renders correct number of cards from experiences array", () => {
    it("should render one card for one experience", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={mockExperiences}
        />,
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
          {...defaultLabels}
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
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[]}
        />,
      );
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
          {...defaultLabels}
          experiences={[validExperience]}
        />,
      );
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });
});

describe("Locale-driven Section Labels", () => {
  describe("5.1: Achievements heading uses the achievementsLabel prop", () => {
    it("should render the achievementsLabel text as the achievements heading", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          achievementsLabel="Achievements"
          technologiesLabel="Technologies"
          experiences={mockExperiences}
        />,
      );
      expect(screen.getByText("Achievements")).toBeInTheDocument();
    });
  });

  describe("5.2: Technologies heading uses the technologiesLabel prop", () => {
    it("should render the technologiesLabel text as the technologies heading", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          achievementsLabel="Achievements"
          technologiesLabel="Technologies"
          experiences={mockExperiences}
        />,
      );
      expect(screen.getByText("Technologies")).toBeInTheDocument();
    });
  });

  describe("5.3: English labels never render the hardcoded Spanish strings", () => {
    it("should not render 'Logros' or 'Tecnologías' when English labels are passed", () => {
      const { container } = render(
        <CareerTimeLine
          titleSection="Career"
          achievementsLabel="Achievements"
          technologiesLabel="Technologies"
          experiences={mockExperiences}
        />,
      );
      expect(container.textContent).not.toMatch(/Logros|Tecnologías/);
    });
  });

  describe("5.4: Spanish labels render Spanish headings", () => {
    it("should render 'Logros' and 'Tecnologías' when Spanish labels are passed", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          achievementsLabel="Logros"
          technologiesLabel="Tecnologías"
          experiences={mockExperiences}
        />,
      );
      expect(screen.getByText("Logros")).toBeInTheDocument();
      expect(screen.getByText("Tecnologías")).toBeInTheDocument();
    });
  });
});

describe("Compact Card Rendering (description-less experiences)", () => {
  const fullExperience = (company: string): Experience => ({
    company,
    position: "Senior Developer",
    period: "Mar 2023 - Jun 2025",
    description: "Led development team",
    technologies: ["React", "TypeScript"],
    achievements: ["Shipped major feature"],
    companyLogo: "/logo.png",
  });

  const compactExperience = (
    company: string,
    technologies: string[] = ["PHP", "MySQL"],
  ): Experience => ({
    company,
    position: "Full Stack Developer",
    period: "Jun 2018 - Sep 2019",
    technologies,
  });

  describe("4.1: Description-less experience omits description block", () => {
    it("should not render a description paragraph for a compact experience", () => {
      const { container } = render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[compactExperience("CompactCo")]}
        />,
      );
      expect(screen.getByText("CompactCo")).toBeInTheDocument();
      const descriptionBlock = container.querySelector(
        '[class*="description"]',
      );
      expect(descriptionBlock).not.toBeInTheDocument();
    });
  });

  describe("4.2: Description-less experience omits achievements block", () => {
    it("should not render achievements heading or list for a compact experience", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[compactExperience("CompactCo")]}
        />,
      );
      expect(screen.queryByText("Achievements")).not.toBeInTheDocument();
    });
  });

  describe("4.3: Description-less experience still renders technologies", () => {
    it("should render technology tags for a compact experience", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[
            compactExperience("CompactCo", ["Python", "Bootstrap"]),
          ]}
        />,
      );
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("Bootstrap")).toBeInTheDocument();
    });
  });

  describe("4.4: Two consecutive compact experiences share one grid slot", () => {
    it("should render both compact experiences inside one shared paired-slot container", () => {
      const { container } = render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[
            compactExperience("CorpBid"),
            compactExperience("Coinimp"),
          ]}
        />,
      );
      expect(screen.getByText("CorpBid")).toBeInTheDocument();
      expect(screen.getByText("Coinimp")).toBeInTheDocument();

      const pairedSlot = container.querySelector('[class*="compactPairSlot"]');
      expect(pairedSlot).toBeInTheDocument();
      expect(pairedSlot).toHaveTextContent("CorpBid");
      expect(pairedSlot).toHaveTextContent("Coinimp");
    });
  });

  describe("4.5: Unpaired compact experience surrounded by full experiences renders alone", () => {
    it("should not place a lone compact experience inside a paired-slot container", () => {
      const { container } = render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[
            fullExperience("FullBefore"),
            compactExperience("LonelyCompact"),
            fullExperience("FullAfter"),
          ]}
        />,
      );
      expect(screen.getByText("LonelyCompact")).toBeInTheDocument();
      const pairedSlot = container.querySelector('[class*="compactPairSlot"]');
      expect(pairedSlot).not.toBeInTheDocument();
    });
  });

  describe("4.6: Three consecutive compact experiences pair the first two, leaving the third alone", () => {
    it("should group first two into one paired slot and render the third separately", () => {
      const { container } = render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[
            compactExperience("First"),
            compactExperience("Second"),
            compactExperience("Third"),
          ]}
        />,
      );

      const pairedSlots = container.querySelectorAll(
        '[class*="compactPairSlot"]',
      );
      expect(pairedSlots).toHaveLength(1);
      expect(pairedSlots[0]).toHaveTextContent("First");
      expect(pairedSlots[0]).toHaveTextContent("Second");
      expect(pairedSlots[0]).not.toHaveTextContent("Third");
      expect(screen.getByText("Third")).toBeInTheDocument();
    });
  });

  describe("4.7: Compact card preserves accessibility semantics", () => {
    it("should render compact cards with role=article and tabIndex 0", () => {
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={[compactExperience("CompactCo")]}
        />,
      );
      const article = screen.getByRole("article");
      expect(article).toBeInTheDocument();
      expect(article).toHaveAttribute("tabIndex", "0");
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
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={expWithLogo}
        />,
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
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={expWithInitials}
        />,
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
          {...defaultLabels}
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
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={exp}
        />,
      );
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
      render(
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={exp}
        />,
      );
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
        <CareerTimeLine
          titleSection="Career"
          {...defaultLabels}
          experiences={exp}
        />,
      );
      const badge = container.querySelector('[class*="companyBadge"]');
      expect(badge).toBeInTheDocument();
    });
  });
});
