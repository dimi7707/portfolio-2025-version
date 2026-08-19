Implementation follows Red → Green → Refactor per unit of behavior: write the failing test first (asserting a spec scenario), implement the minimal code to pass it, then refactor with tests green. Quality-checkpoint tasks (marked 🔎) apply the relevant principles from `implementation-quality` only where this change creates real risk — not a generic checklist.

## 1. Content & Schemas (no tests — these are data/typing changes verified by Zod at build time)

- [x] 1.1 Update `aiPassionSchema.ts`: remove the `tools` field.
- [x] 1.2 Update `aiPassion` block in `src/content/en/home/home.md`: set `title` to "AI-Native Development" and `description` to the user-supplied 2026 copy; remove `tools`.
- [x] 1.3 Update `aiPassion` block in `src/content/es/home/home.md`: add a natural (non-literal) Spanish translation of the same title/description; remove `tools`.
- [x] 1.4 Create `src/schemas/components/techConstellationSchema.ts` defining `title`, `subtitle`, and `nodes: { name: string; category: "languages" | "frameworks" | "data" | "infra" | "testing"; note?: string }[]`. 🔎 *Docs*: add a one-line comment on `category` explaining it drives cluster grouping/connector rendering, since that's not obvious from the field name alone.
- [x] 1.5 Replace the `techStackCarousel` block with a `techConstellation` block in `src/content/en/home/home.md` (title "The Tech Constellation", subtitle "Mapping the core stack architecture.", and the 15 nodes with categories per design.md's cluster table, including the combined "Testing" node with `note: "Jest / Cypress / PHPUnit"`).
- [x] 1.6 Replace the `techStackCarousel` block with a `techConstellation` block in `src/content/es/home/home.md` (translated title/subtitle, same 15 nodes/categories).
- [x] 1.7 ~~Delete `src/schemas/components/techStackCarouselSchema.ts`~~ — **kept**: discovered `aboutSchema.ts` also imports it for the About page's own (separate, currently-unrendered) `techStackCarousel` content field, unrelated to the home page. Deleting it would break the About collection's schema, which is out of scope for this change (see design.md Non-Goals). `home`'s schema/index wiring now exports both `techStackCarouselSchema` (for About) and `techConstellationSchema` (for Home) side by side.
- [x] 1.8 Update `careerTimeLineSchema.ts`: add `achievementsLabel: string` and `technologiesLabel: string` to the schema (top-level, alongside `titleSection`).
- [x] 1.9 Add `achievementsLabel: "Achievements"` and `technologiesLabel: "Technologies"` to the `careerTimeLine` block in `src/content/en/home/home.md`.
- [x] 1.10 Add `achievementsLabel: "Logros"` and `technologiesLabel: "Tecnologías"` to the `careerTimeLine` block in `src/content/es/home/home.md`.

## 2. AIPassionSection Refresh

- [x] 2.1 🔴 RED — Create `AIPassionSection.test.tsx`. Write failing tests for: renders `title`/`description` from props (happy path); renders with an empty `description` string without crashing (edge case); component does not throw or warn about an unexpected `tools` prop being passed (regression guard for the removed field, per the `ai-passion-section` spec's "no tools prop" requirement).
- [x] 2.2 🟢 GREEN — Update `AIPassionSectionProps` in `AIPassionSection.tsx` to drop `tools`; remove the (already-commented-out) tools rendering block entirely. Confirm the new tests pass.
- [x] 2.3 🔵 REFACTOR — Update `AIPassionSection.module.scss`: replace the `#4facfe`/`#8b45ff`/`#ff4757` gradient trio (title gradient, `backgroundGradient`, `content::before`, particles, `networkNode`) with the site's cyan/blue identity tokens (`$primary`/neon-cyan `#00daf3`, neon-blue `#2979FF`) via new `$neon-cyan`/`$neon-cyan-alt`/`$neon-blue` SCSS variables. Also removed the now-dead `.tools`/`.tool` styles (JSX for them no longer exists after 2.2). Confirmed tests still pass.
- [x] 2.4 Update background surface tones in `AIPassionSection.module.scss` toward the near-black scale (`#050505`/`#141416`/`#1C1C1F`) for consistency with the new Tech Constellation section. 🔎 *Hardcoding*: defined as `$surface-base`/`$surface-elevation-1`/`$surface-elevation-2` SCSS variables rather than raw hex.
- [x] 2.5 Visually verify AIPassionSection on both `/en/` and `/es/` in the dev server: new copy renders correctly, no leftover purple/red tones, no console errors from the removed `tools` prop. **Deferred to 4.3**: `HomePage.astro` still destructures the now-removed `techStackCarousel` field (renamed to `techConstellation` in 1.5/1.6), so the page won't build/render until Group 4 rewires it — per design.md's own migration plan (schema/content first, page wiring later). Component-level correctness confirmed via the 2.1–2.4 unit tests instead; full in-browser check happens once the page compiles again.

## 3. TechConstellation Component

- [x] 3.1 🔴 RED — Create `src/components/TechConstellation/iconMap.test.ts`. Write failing tests for a pure `getIconForTech(name: string)` function: returns the correct icon component for a known name (happy path, e.g. "Python"); returns the defined generic fallback icon for an unrecognized name instead of throwing (error path — this is the concrete risk of a hand-maintained name→icon map). 🔎 *SRP*: this function must be implementation-agnostic pure logic, not something requiring a rendered component to test.
- [ ] 3.2 🟢 GREEN — Implement `src/components/TechConstellation/iconMap.ts` with the `name → IconComponent` lookup, using `react-icons/si` as the default source, falling back to `react-icons/di` or `react-icons/tb` for technologies without a Simple Icons entry (e.g. C#), and a generic test/check icon for the combined "Testing" node and for the fallback case. Confirm tests pass.
- [ ] 3.3 🔴 RED — Create `src/components/TechConstellation/groupByCategory.test.ts`. Write failing tests for a pure `groupByCategory(nodes)` function: groups nodes into the 5 known categories preserving input order within each group (happy path); returns an empty result for an empty `nodes` array without throwing (edge case); ignores/collects under an "other" bucket rather than crashing if a node has an unexpected category value (error path — guards against future content typos, since `category` is free-typed YAML even though the schema constrains it).
- [ ] 3.4 🟢 GREEN — Implement `groupByCategory.ts`. Confirm tests pass. 🔎 *DRY*: this single function is the only place clustering logic lives — both the desktop cluster layout and any future layout variant read from it, instead of each layout re-deriving groups from `nodes` independently.
- [ ] 3.5 🔴 RED — Create `TechConstellation.test.tsx`. Write failing tests for: renders `title` and `subtitle` from props; renders exactly 15 nodes with visible name text when given the full node list (happy path, matches the `tech-constellation` spec's "exactly 15 nodes" requirement); renders zero nodes without crashing when given an empty `nodes` array (edge case).
- [ ] 3.6 🟢 GREEN — Create `src/components/TechConstellation/TechConstellation.tsx` accepting `title`, `subtitle`, and `nodes` props (typed from the new schema), rendering each node via a single shared `renderNode(node)` helper. Confirm tests pass. 🔎 *DRY*: `renderNode` must be the one place node markup is built — the desktop cluster view and the mobile chain view both call it rather than duplicating node JSX per layout.
- [ ] 3.7 Create `src/components/TechConstellation/TechConstellation.module.scss`: terminal-styled dark background, fixed-cyan icon color, node card styling per the mockups (rounded corners, subtle border, monospace label). 🔎 *Hardcoding*: pull the cyan value from `_variables.scss`/design tokens rather than a new inline hex.
- [ ] 3.8 Implement the hover state: increase glow intensity (box-shadow/filter blur or opacity) on `:hover`/`:focus-visible`, with no color, scale, or position change. 🔎 *Hardcoding*: name the resting vs. hover glow values (e.g. `$glow-blur-rest`, `$glow-blur-hover`) instead of two unlabeled magic numbers.
- [ ] 3.9 Implement desktop layout: consume `groupByCategory` to render clusters (languages, frameworks, data, infra, testing) with dashed connector lines within each cluster.
- [ ] 3.10 Implement cross-cluster connector lines for at least languages↔frameworks and data↔infra, per design.md.
- [ ] 3.11 Implement mobile layout: single vertical chain of all 15 nodes (via the same `renderNode` helper from 3.6) connected by a continuous line, ordered by category.
- [ ] 3.12 🔎 *Performance*: memoize the `groupByCategory(nodes)` call (e.g. `useMemo`) in `TechConstellation.tsx` since `nodes` is static per page render — avoid recomputing the grouping on every re-render.
- [ ] 3.13 Visually verify TechConstellation in isolation (e.g. temporarily rendered on a scratch route or via component preview) against both mockups at desktop and mobile widths, in both locales.

## 4. Wire TechConstellation Into Pages

- [ ] 4.1 In `src/components/pages/HomePage.astro`, replace the `TechStackCarousel` import and usage with `TechConstellation`, passing `title`, `subtitle`, and `nodes` from `techConstellation` content.
- [ ] 4.2 In `src/components/pages/AboutPage.astro`, remove the dead (commented-out) `TechStackCarousel` import and usage.
- [ ] 4.3 Run the dev server and confirm the home page renders `TechConstellation` (not the carousel) on both `/en/` and `/es/`, and that `AboutPage.astro` still builds without the removed import.

## 5. Remove TechStackCarousel

- [ ] 5.1 Re-search the codebase (`src/`, `public/`) for any remaining reference to `TechStackCarousel`, `techStackCarouselSchema`, or `tech-icons/` before deleting anything.
- [ ] 5.2 Delete `src/components/TechStackCarousel/` (component + module SCSS).
- [ ] 5.3 Delete `/public/tech-icons/*.svg` and the now-empty `tech-icons/` directory.
- [ ] 5.4 Confirm the production build (`bun build`) succeeds with no missing-module or missing-asset errors.

## 6. CareerTimeLine Label Fix

- [ ] 6.1 🔴 RED — In `CareerTimeLine.test.tsx`, add failing tests (following the file's existing `describe("<ref>: <behavior>", ...)` convention): renders `achievementsLabel` text as the achievements heading when an experience has achievements (happy path); renders `technologiesLabel` text as the technologies heading (happy path); passing an English label set never renders the hardcoded Spanish strings "Logros"/"Tecnologías" (regression guard — this is the actual bug being fixed).
- [ ] 6.2 🟢 GREEN — Update the `Experiences` props interface in `CareerTimeLine.tsx` to accept `achievementsLabel` and `technologiesLabel`. Replace the hardcoded `<h5>Logros</h5>` (line 161) with `<h5>{achievementsLabel}</h5>` and `<h5>Tecnologías</h5>` (line 171) with `<h5>{technologiesLabel}</h5>`. Confirm new and existing tests pass.
- [ ] 6.3 🔵 REFACTOR — Update the remaining existing test render calls in `CareerTimeLine.test.tsx` that predate this change to pass `achievementsLabel`/`technologiesLabel` explicitly (now-required props), keeping all tests green.
- [ ] 6.4 Update `HomePage.astro`'s `CareerTimeLine` usage if needed to ensure the new label props flow through from `careerTimeLine` content (likely automatic via existing `{...careerTimeLine}` spread).
- [ ] 6.5 Visually verify `/en/` shows "Achievements"/"Technologies" and `/es/` shows "Logros"/"Tecnologías" on career timeline cards.

## 7. Final Verification

- [ ] 7.1 Run the full test suite (`iconMap`, `groupByCategory`, `AIPassionSection`, `TechConstellation`, `CareerTimeLine`) and confirm all pass, with each new test file covering at least one happy path, one edge case, and one error/regression path per the TDD minimum.
- [ ] 7.2 Run `bunx biome lint --write` and `bunx biome format --write` across changed files.
- [ ] 7.3 Full manual pass on `/en/` and `/es/` home pages: AIPassionSection copy/colors, TechConstellation (desktop + mobile widths, hover glow), CareerTimeLine labels — no console errors, no leftover references to removed code.
