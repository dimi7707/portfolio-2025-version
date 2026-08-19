## Why

A pass over the home page surfaced three concrete gaps: the AI section's copy and color treatment predate the 2026 "AI-native" positioning the site wants to project, the tech stack carousel is a dated/underwhelming pattern that no longer represents the current stack cleanly, and the career timeline leaks hardcoded Spanish labels ("Logros", "Tecnologías") into the English locale. None of these require new infrastructure — they are targeted content, visual, and i18n fixes to existing home page sections.

## What Changes

- **AIPassionSection copy refresh**: Replace the `aiPassion.title`/`aiPassion.description` content in both `src/content/en/home/home.md` and `src/content/es/home/home.md` with new "AI-Native Development" copy (English text supplied by the user; Spanish translated to match tone).
- **BREAKING**: Remove the unused `aiPassion.tools` field from content and from `aiPassionSchema` — the pill list it fed was already dead code (JSX commented out), and the new copy names tools inline in prose instead.
- **AIPassionSection palette refresh**: Replace the current blue/purple/red gradient treatment in `AIPassionSection.module.scss` with the site's Cyber-Terminal Executive palette (neon-cyan `#00E5FF`/`#00daf3`, neon-blue `#2979FF`, near-black surfaces), aligning it with `$primary` in `_variables.scss` and the design tokens documented in the user's Tech Constellation mockups.
- **New Tech Constellation component**: Replace `TechStackCarousel` with a new `TechConstellation` component styled as a terminal-like node graph. Nodes show an icon + tech name for: Python, PHP, JavaScript, TypeScript, C#, Docker, AWS, React, Vue.js, Astro, PostgreSQL, MySQL, Redis, MongoDB, and a combined "Testing" node (Jest/Cypress/PHPUnit) — 15 nodes total.
  - **BREAKING**: Removes `TechStackCarousel.tsx`, its module SCSS, and its hardcoded `techIcons` SVG-filename array. Also drops the static SVGs in `/public/tech-icons/` in favor of `react-icons` for every node, so icon rendering is standardized on one library.
  - Icons render in fixed cyan (site primary color), with a stronger cyan glow on hover (no color shift, no motion/scale).
  - Desktop layout groups nodes into category clusters (languages, frameworks, infra/cloud, data, testing) connected by dashed lines within and between clusters. Mobile layout is a single vertical connected chain.
  - Content becomes data-driven: `techStackCarousel.title` is replaced by a `techConstellation` content block (title, subtitle, node list) in both locale `home.md` files, backed by a new schema.
- **CareerTimeLine label localization**: Replace the hardcoded `<h5>Logros</h5>` and `<h5>Tecnologías</h5>` strings in `CareerTimeLine.tsx` with props sourced from content (`achievementsLabel`, `technologiesLabel`), added to `careerTimeLineSchema` and both locale `home.md` files, so the English page no longer shows Spanish labels.

## Capabilities

### New Capabilities
- `ai-passion-section`: Governs the AIPassionSection's copy content and visual palette (colors sourced from the site's identity/design tokens, not a generic AI gradient).
- `tech-constellation`: Governs the new node-graph tech showcase component that replaces the carousel — node list, icon source/styling, hover behavior, and responsive layout.
- `career-timeline-labels`: Governs localization of the static UI labels ("Achievements"/"Technologies") rendered inside each CareerTimeLine card.

### Modified Capabilities
- None. `portfolio-content-update` (existing spec) governs hero/experience *content facts*; this change does not alter those requirements, only UI labels, an unrelated section's copy, and a component replacement.

## Impact

- **Content**: `src/content/en/home/home.md`, `src/content/es/home/home.md` (aiPassion block, techStackCarousel → techConstellation block, careerTimeLine labels).
- **Schemas**: `src/schemas/components/aiPassionSchema.ts` (drop `tools`), new `src/schemas/components/techConstellationSchema.ts` added and wired into `homeSchema.ts` in place of `techStackCarouselSchema.ts`. `techStackCarouselSchema.ts` itself is **kept** (not deleted) because `aboutSchema.ts` independently uses it for the About page's own tech list — out of scope here. `src/schemas/components/careerTimeLineSchema.ts` (add label fields).
- **Components**: `src/components/AIPassionSection/*` (copy + styles), `src/components/TechStackCarousel/*` removed, new `src/components/TechConstellation/*` added, `src/components/CareerTimeLine/CareerTimeLine.tsx` (label props).
- **Pages**: `src/components/pages/HomePage.astro` swaps `TechStackCarousel` for `TechConstellation` and passes new props. `src/components/pages/AboutPage.astro` has a dead (commented-out) `TechStackCarousel` import that must be removed so the deleted component doesn't break the build.
- **Assets**: `/public/tech-icons/*.svg` and its consuming code become unused and can be deleted.
- **Dependencies**: No new packages — `react-icons` is already a project dependency and already used elsewhere (`AIPassionSection.tsx`).
