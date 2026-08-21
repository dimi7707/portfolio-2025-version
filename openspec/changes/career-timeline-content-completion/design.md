## Context

`CareerTimeLine.tsx` renders `experiences` as a flat CSS grid (`.careerGrid`, `repeat(3, 1fr)` on desktop, 2 columns on tablet, 1 on mobile). Every experience currently maps 1:1 to one `.card` occupying one grid cell, and `description` is a required, always-populated string.

Two real work-history entries (CORPBID, Coinimp.com / ABC Hosting) exist only as company/period/technologies in the source CV — no narrative description or achievements were ever written for them, and none should be invented, since fabricating filler prose would misrepresent the actual role. Rendering either as a normal full card would produce a mostly-empty card next to fully-detailed ones (visually inconsistent, wastes grid space). These two entries are also chronologically adjacent (Apr 2017 - May 2018, then Jun 2018 - Sep 2019), so they naturally read as a pair.

## Goals / Non-Goals

**Goals:**
- Add the two missing experiences and the KUBO SAS date correction to both locales without changing any existing full-card entry's rendering.
- Let `CareerTimeLine` render two consecutive description-less experiences as a compact pair sharing a single grid slot, so the grid keeps its visual density.
- Keep the "compact" behavior data-driven (inferred from absence of `description`), not an extra authoring flag content editors must remember to set.
- Follow TDD for the component change: extend `CareerTimeLine.test.tsx` with failing tests first, then implement.

**Non-Goals:**
- Not inventing descriptions/achievements for CORPBID or Coinimp/ABC Hosting.
- Not redesigning the overall grid breakpoints, animation timing, or badge logic (already covered by the existing `career-card-grid` behavior from the prior redesign).
- Not building a generic "N-up" compact system for arbitrary group sizes — only pairs (max 2) as explicitly requested.
- Not adding a CMS/content-authoring flag (e.g. `compact: true`) to the schema.

## Decisions

### 1. "Compact" is derived from `!description`, not a new schema field
**Decision**: A card is compact when `experience.description` is falsy/empty. No new boolean field.
**Rationale**: The two new entries simply have no description in the CV; that absence is exactly the signal we want to key off. Adding a separate `compact`/`isCompact` flag would duplicate information an editor could forget to set or set inconsistently with the actual description field.
**Alternative considered**: Explicit `layout: "compact"` field in frontmatter — rejected as redundant and an extra thing to keep in sync.

### 2. Pairing is computed at render time via a grouping helper, not pre-grouped content
**Decision**: `CareerTimeLine.tsx` will derive render "slots" from the flat `experiences` array with a pure helper (e.g. `groupExperiencesIntoSlots(experiences): Slot[]`), where a `Slot` is either `{ type: "full", experience }` or `{ type: "compactPair", experiences: [Experience] | [Experience, Experience] }`. Grouping rule: walk the array in order; if the current experience is compact and the next one is also compact, group them into one `compactPair` slot and advance by 2; otherwise emit a `compactPair` slot with just that one experience (still styled compact, just not sharing space) or a `full` slot for non-compact experiences.
**Rationale**: Keeps `home.md` content flat and chronological (no manual grouping/nesting authors would need to maintain); the component owns the presentation decision, which is exactly the concern the user raised ("el componente permita tener hasta 2 cards en el espacio").
**Alternative considered**: Restructure content schema so `experiences` is an array of "slots" (some slots holding 2 sub-entries) — rejected because it complicates `home.md` authoring and couples content structure to a purely visual concern.

### 3. Compact cards render fewer sections, not a smaller version of the full card
**Decision**: A compact card shows badge, company, position, period, and technology tags only — no description block, no achievements block (both absent by construction). Two compact cards in a `compactPair` slot stack vertically inside one grid cell (`.compactPairSlot { display: flex; flex-direction: column; gap: ... }`), each taking roughly half the vertical space a full card would use.
**Rationale**: Matches the actual data (no description/achievements to show) and directly delivers the "better use of space" goal — two short cards fit where one form empty-feeling card would have sat.
**Alternative considered**: Side-by-side (2 columns) compact cards within the slot — rejected for this iteration because at the mobile breakpoint (1 column grid) a nested 2-column layout would fight the existing responsive rules; vertical stacking degrades gracefully at all breakpoints without extra media queries.

### 4. Schema relaxation: `description` and `achievements` become optional
**Decision**: In `careerTimeLineSchema.ts`, change `description: z.string()` → `description: z.string().optional()` and `achievements: z.array(z.string())` → `achievements: z.array(z.string()).optional()`. In `CareerTimeLine.tsx`, the `Experience` TypeScript interface mirrors this (`description?: string; achievements?: string[]`), and rendering code guards both (`exp.description?.split(...)`, `(exp.achievements ?? []).length > 0`).
**Rationale**: Required fields with no real content force fabricated placeholder text; making them optional is the honest representation of the CV data and is what unlocks the compact-card path.
**Alternative considered**: Keep fields required and set them to empty string `""` / `[]` in content — rejected because `z.string()` already accepts `""` today (no validation error), meaning "required" isn't actually enforcing meaningful content anyway; making the type honestly optional is clearer for future authors and for the component logic that decides compactness.

## Risks / Trade-offs

- **[Risk]** Existing snapshot/behavioral expectations in `CareerTimeLine.test.tsx` assume every rendered experience is `role="article"` inside `.card` directly under `.careerGrid`. → **Mitigation**: keep `role="article"` on both full and compact cards so existing accessibility-oriented tests (`3.x` describe blocks) keep passing unchanged; only the DOM nesting for compact pairs gains one extra wrapper `div` (`.compactPairSlot`), which doesn't affect any current test's queries (they use `getByText`/`getByAltText`, not structural selectors, except test `3.6` which does `container.querySelector('[class*="companyBadge"]')` — unaffected since badge markup is unchanged).
- **[Risk]** Content authors could later insert a non-compact experience between the two new compact ones, accidentally breaking the pairing (e.g. inserting a full entry between CORPBID and Coinimp). → **Mitigation**: pairing is computed dynamically from array adjacency at render time, so this is self-correcting — if a full entry is inserted between them, each compact entry simply renders alone in its own compact slot instead of paired. No broken state is possible, only a layout that's slightly less space-efficient.
- **[Trade-off]** Only consecutive compact experiences pair up; a compact experience separated from another compact one by a full entry renders alone (still compact-styled, one card in a full grid cell). This matches the current actual data (CORPBID and Coinimp/ABC Hosting are adjacent) and avoids over-engineering a global "collect all compact cards and pack them" layout.

## Migration Plan

1. Update `careerTimeLineSchema.ts` (widen `description`/`achievements` to optional) — non-breaking, purely relaxes validation.
2. TDD the component: add failing tests to `CareerTimeLine.test.tsx` for the grouping helper and compact-pair rendering, then implement `groupExperiencesIntoSlots` + updated JSX/SCSS in `CareerTimeLine.tsx` / `CareerTimeLine.module.scss` until tests pass.
3. Update `src/content/en/home/home.md` and `src/content/es/home/home.md`: insert CORPBID and Coinimp/ABC Hosting entries in chronological position, correct KUBO SAS end date.
4. Run `bun run build` and the Jest suite to confirm content validates against the schema and the component renders without errors.
No rollback beyond reverting the commit is needed — this is a content/UI-only change with no data migration or external side effects.

## Open Questions

None outstanding — CORPBID and KUBO SAS date ambiguities were resolved with the user before writing this design (CORPBID: Jun 2018 - Sep 2019; KUBO SAS end date corrected to Dec 2020).
