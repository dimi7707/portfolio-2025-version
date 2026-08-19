## Context

The home page (`src/components/pages/HomePage.astro`) renders four content-driven sections sourced from `src/content/{en,es}/home/home.md`: `AIPassionSection`, `TechStackCarousel`, `CareerTimeLine`, `DownloadCv`. Three problems were identified during exploration:

1. `AIPassionSection`'s copy is generic ("I have a true passion for AI...") and its `.module.scss` uses an ungrounded blue/purple/red gradient that doesn't match the site's identity color (`$primary: #00fff7` in `_variables.scss`) or the darker, cyan-accented "Cyber-Terminal Executive" look established in the user's own Tech Constellation mockups (`DESIGN.md`: `neon-cyan #00E5FF`/`#00daf3`, `neon-blue #2979FF`, near-black surfaces `#050505`/`#141416`/`#1C1C1F`).
2. `TechStackCarousel` is a hardcoded, non-content-driven auto-scrolling strip (`techIcons: string[]` literal array in the component, pointing at static SVGs in `/public/tech-icons/`). It's also imported (dead, commented out) in `AboutPage.astro`.
3. `CareerTimeLine.tsx` hardcodes the Spanish strings `"Logros"` and `"Tecnologías"` as JSX literals (lines 161, 171), so they render even on `/en/*` pages instead of respecting the active locale.

This design covers the three fixes decided during exploration, including the new `TechConstellation` component that replaces the carousel.

## Goals / Non-Goals

**Goals:**
- Update `AIPassionSection` copy (EN authored by user, ES translated) and restyle it using the site's real identity palette.
- Replace `TechStackCarousel` with `TechConstellation`, a terminal-styled node graph of 15 technologies, fully data-driven from content, using `react-icons` exclusively (no static SVGs).
- Fix the CareerTimeLine label leak so achievement/technology headings are locale-correct.
- Keep all three sections content-driven through the existing Astro content collections + Zod schema pattern already used across the codebase.

**Non-Goals:**
- No redesign of `Hero`, `DownloadCv`, or the overall page layout/order.
- No change to the in-progress `redesign-career-timeline` OpenSpec change's card-grid/badge/hover-animation work — this change only touches the two hardcoded label strings, which that change's tasks never mention.
- No introduction of a physics-based/force-directed graph library for the constellation; positions are CSS-driven, not simulated.
- No visual redesign of `AboutPage.astro` beyond removing the now-dead `TechStackCarousel` import (it is not actively rendered there today).

## Decisions

### 1. Drop `aiPassion.tools` entirely (schema + content + component)
The `tools` array is rendered nowhere today (the mapping in `AIPassionSection.tsx` is commented out). The new copy already names the tools in prose. Rather than keep an unused field "just in case," remove it from `aiPassionSchema`, both `home.md` files, and the component's props/interface. Simpler than reactivating a pill UI nobody asked for.

### 2. AIPassionSection palette sourced from existing design tokens, not invented
Reuse the cyan/blue values already established: `$primary` (`#00fff7`) from `_variables.scss` as the anchor, supplemented by the neon-cyan/neon-blue values from the user's own `DESIGN.md` (`#00E5FF`, `#2979FF`) for gradient variety, replacing the current `#4facfe`/`#8b45ff`/`#ff4757` trio throughout `AIPassionSection.module.scss` (title gradient, particles, network nodes, gradient overlays, tool-pill styling if ever reactivated). Background near-black tones (`#0a0a0a` → `#050505`/`#141416`) move closer to `DESIGN.md`'s surface scale for consistency with the new Tech Constellation section directly below it.

### 3. New `TechConstellation` component, not a `TechStackCarousel` refactor
The carousel's core mechanic (auto-scroll `setInterval` + `translateX`) has nothing to reuse for a static node-graph layout. Building `src/components/TechConstellation/` fresh (component + module SCSS) is cleaner than repurposing the carousel's internals, and matches how `CareerTimeLine`'s card-grid redesign was previously done as a rewrite rather than an incremental patch.

**Content shape** (`techConstellation` block in `home.md`, replacing `techStackCarousel`):
```yaml
techConstellation:
  title: "The Tech Constellation"
  subtitle: "Mapping the core stack architecture."
  nodes:
    - name: "Python"
      category: "languages"
    - name: "Testing"
      category: "testing"
      note: "Jest / Cypress / PHPUnit"
    # ...remaining 13 nodes
```
`category` drives cluster grouping and connector-line rendering; it is content data (not styling), so it belongs in the schema, not hardcoded in the component.

**Icon resolution stays in code, not content.** Markdown/YAML can't hold a React component reference cleanly, so the component keeps an internal `name → IconComponent` lookup map (mirroring the pattern `AIPassionSection.tsx` already uses for its background icons). `react-icons/si` (Simple Icons) is the default source for brand-accurate logos; where a technology has no Simple Icons entry, fall back to another already-vendored react-icons set (`react-icons/di` or `react-icons/tb`) rather than adding a new icon package.

**Combined "Testing" node** uses one generic icon (e.g. a check/test-tube glyph) rather than crowding three brand logos into one node — simpler to render cleanly at node scale, and the `note` field surfaces "Jest / Cypress / PHPUnit" as a caption for clarity.

**Icon color is fixed cyan, always** (`$primary`/neon-cyan) — no neutral resting state. Hover only intensifies the existing glow (larger blur/opacity), it does not change hue, scale, or position, per explicit user direction ("siempre en cian... pequeñísimo o muy leve efecto").

**Layout — category clusters over hand-placed coordinates or radial simulation:**
| Category | Nodes | Count |
|---|---|---|
| Languages | Python, PHP, JavaScript, TypeScript, C# | 5 |
| Frameworks | React, Vue.js, Astro | 3 |
| Data | PostgreSQL, MySQL, Redis, MongoDB | 4 |
| Infra/Cloud | Docker, AWS | 2 |
| Testing | Testing (combined) | 1 |

Desktop groups each category into a visual cluster (CSS grid/flex per cluster, clusters positioned across the section) with dashed SVG/CSS connector lines drawn within a cluster and a few cross-cluster lines (e.g. languages↔frameworks, data↔infra) to preserve the "constellation" read from the mockups without needing per-node manual coordinates for 15 items. Mobile collapses to the single vertical connected chain shown in the second mockup, ordered by category. This avoids both the fragility of hand-tuned absolute positions at 15-node scale and the added complexity/non-determinism of a radial or force-directed layout.

### 4. `TechStackCarousel.tsx` and `/public/tech-icons/*.svg` are deleted; `techStackCarouselSchema.ts` is not
Nothing renders the carousel component (`AboutPage.astro`'s usage is already commented out) or the icon SVGs once `TechConstellation` ships, so those are deleted. **Correction discovered during implementation**: `techStackCarouselSchema.ts` itself is *not* deleted — `aboutSchema.ts` independently imports it for the About page's own `techStackCarousel` content field (title + technologies list), which is unrelated to the home page's carousel and out of scope for this change (see Non-Goals). `src/schemas/index.ts` now exports both `techStackCarouselSchema` (consumed by `aboutSchema`) and the new `techConstellationSchema` (consumed by `homeSchema`) side by side. `AboutPage.astro`'s dead *component* import is still removed in the same change so the build doesn't reference the deleted `.tsx` module.

### 5. CareerTimeLine labels become content-driven props, following the existing pattern
Add `achievementsLabel` and `technologiesLabel` (strings) to `careerTimeLineSchema` and to the `careerTimeLine` block in both `home.md` files ("Achievements"/"Technologies" for EN, "Logros"/"Tecnologías" for ES). `CareerTimeLine.tsx` reads them from its existing `titleSection`/`experiences`-style top-level props instead of the literal JSX strings at lines 161 and 171. This mirrors how `titleSection` is already localized, rather than introducing a new i18n mechanism.

### 6. Implementation follows TDD (Red → Green → Refactor), reusing the project's existing test conventions
`CareerTimeLine.test.tsx` is the only existing test file in the repo, using Jest + React Testing Library with `describe("<requirement-ref>: <behavior>", ...)` blocks that mirror spec requirements 1:1. `tasks.md` extends this same convention to `AIPassionSection` and `TechConstellation` (both currently untested) rather than introducing a different testing style. For each unit of behavior: write a failing test asserting the corresponding spec scenario first, implement the minimal code to pass it, then refactor with tests green. Pure logic that doesn't need a DOM (the icon lookup map, the category-clustering grouping function) is extracted into plain functions specifically so it's unit-testable without rendering — the same separation `CareerTimeLine.tsx` already applies with `groupExperiencesIntoSlots`/`generateInitials`.

## Risks / Trade-offs

- **[Risk] Category-cluster layout still needs real CSS authoring per breakpoint** (cluster positions, connector-line paths) → **Mitigation**: tasks.md scopes this as its own step with the two mockups as the visual reference; connector lines can start as a small fixed set (within-cluster only) and cross-cluster lines added once the base layout is confirmed visually, rather than blocking on a perfect first pass.
- **[Risk] Not every technology has a polished Simple Icons brand glyph (e.g. C#, generic "Testing")** → **Mitigation**: fallback order (Simple Icons → DevIcons/Tabler → generic glyph) is defined in this doc so task execution doesn't stall on a missing icon; since all icons render in fixed cyan, mismatched brand-color fidelity isn't a visual concern.
- **[Risk] Removing `aiPassion.tools` and replacing `techStackCarousel` are schema-breaking for existing content** → **Mitigation**: both locale `home.md` files are updated in the same change as the schema, so there's no intermediate broken state; this is a single-repo content collection, not a public API, so no external consumers are affected.
- **[Risk] Deleting `/public/tech-icons/*.svg` could be a wider blast radius if something outside grep's reach references them** → **Mitigation**: tasks.md includes an explicit re-grep for `tech-icons/` across `src/` and `public/` right before deletion, not just at design time.

## Migration Plan

1. Update content + schemas first (`aiPassionSchema`, new `techConstellationSchema`, `careerTimeLineSchema`, both `home.md` files) so Astro's content collection validation catches shape mismatches early.
2. Update `AIPassionSection.tsx`/`.module.scss` (copy props + palette) — isolated, no cross-component dependency.
3. Build `TechConstellation` component + styles alongside the still-existing `TechStackCarousel` (not wired into `HomePage.astro` yet), so it can be visually checked in isolation first.
4. Swap `TechStackCarousel` → `TechConstellation` in `HomePage.astro`; remove the dead import in `AboutPage.astro`.
5. Delete `TechStackCarousel.tsx`, its module SCSS, `techStackCarouselSchema.ts`, and `/public/tech-icons/*.svg`.
6. Fix `CareerTimeLine.tsx` label props last, since it's independent of the other two and lowest risk.

Rollback is trivial at any point before step 5 (revert the relevant file); after step 5, rollback means restoring the deleted files from git history, which is fine since this is a local content/component change with no data migration.

## Open Questions

- Exact Spanish translation phrasing for the new AI-Native Development copy will be finalized during task execution (tasks.md will call for a natural translation, not a literal one, consistent with how the existing `es/home.md` content reads).
- Precise per-breakpoint pixel positions for the cluster layout are left to implementation/visual QA against the two mockups rather than specified here.
