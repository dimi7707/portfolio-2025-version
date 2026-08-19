## 1. Schema relaxation

- [x] 1.1 In `src/schemas/components/careerTimeLineSchema.ts`, change `description: z.string()` to `description: z.string().optional()`.
- [x] 1.2 In the same schema, change `achievements: z.array(z.string())` to `achievements: z.array(z.string()).optional()`.

## 2. TDD: failing tests for compact-card behavior (RED)

- [x] 2.1 In `src/components/CareerTimeLine/CareerTimeLine.test.tsx`, update the `Experience` type usage / add fixtures for description-less experiences (no `description`, no `achievements`) to confirm the type accepts them once 1.1/1.2 land.
- [x] 2.2 Add a test: an experience with no `description` renders without a description `<p>` block.
- [x] 2.3 Add a test: an experience with no `description` and no `achievements` renders without an achievements heading/list.
- [x] 2.4 Add a test: an experience with no `description` still renders its `technologies` tags.
- [x] 2.5 Add a test: two consecutive description-less experiences render inside one shared grid-slot container (query for the paired-slot wrapper class and assert both companies render within it).
- [x] 2.6 Add a test: a description-less experience surrounded by full (described) experiences renders alone in its own compact slot (not paired).
- [x] 2.7 Add a test: three consecutive description-less experiences pair the first two and render the third alone.
- [x] 2.8 Add a test: a compact card keeps `role="article"` and `tabIndex={0}`, matching full-card accessibility semantics.
- [x] 2.9 Run `bun run test -- CareerTimeLine` (or project's Jest command) and confirm the new tests fail (RED) since implementation doesn't exist yet.

## 3. TDD: implement compact-card grouping (GREEN)

- [x] 3.1 In `CareerTimeLine.tsx`, update the `Experience` interface: `description?: string; achievements?: string[]`.
- [x] 3.2 Implement a pure helper `groupExperiencesIntoSlots(experiences: Experience[])` that returns an array of slots: `{ type: "full", experience }` for described experiences, `{ type: "compactPair", experiences: [Experience] | [Experience, Experience] }` for one or two consecutive description-less experiences (per design.md decision #2).
- [x] 3.3 Update the render loop to map over slots instead of `experiences` directly: render a `.card` for `full` slots (existing markup, guarding `exp.description` and `exp.achievements` as optional), and render a `.compactPairSlot` wrapper containing one or two `.card.compact` elements for `compactPair` slots.
- [x] 3.4 Compact card markup: badge, company, position, period, technology tags only — omit the description and achievements sections entirely (not just empty-render them).
- [x] 3.5 Preserve `role="article"`, `tabIndex={0}`, and the existing `getBadgeContent` logic (logo > initials > auto-generated) for both full and compact cards.
- [x] 3.6 Update the GSAP scroll-animation card refs collection so it still targets every rendered card element (full and compact) for the stagger animation.
- [x] 3.7 Run the test suite again and confirm all tests (existing + new) pass (GREEN).

## 4. Styling for compact cards

- [x] 4.1 In `CareerTimeLine.module.scss`, add `.compactPairSlot` (occupies one `.careerGrid` cell, `display: flex; flex-direction: column; gap: ...` to stack up to two compact cards vertically per design.md decision #3).
- [x] 4.2 Add a `.compact` modifier (or equivalent) on `.card` that reduces padding/vertical space appropriately for a card with no description/achievements content, keeping it visually consistent with full cards (same border, background, hover states).
- [x] 4.3 Verify responsive behavior at desktop (3-col), tablet (2-col), and mobile (1-col) breakpoints — compact pairs should degrade to stacked cards at every breakpoint without new media queries beyond what's needed for `.compactPairSlot` itself.

## 5. Content updates

- [x] 5.1 In `src/content/en/home/home.md`, add the CORPBID entry (position "Full Stack Developer", period "Jun 2018 - Sep 2019", technologies: PHP, CodeIgniter, Laravel, MySQL, jQuery, Vue.js, Polymer Library), no `description`/`achievements`, placed chronologically after KUBO SAS and before Coinimp.com / ABC Hosting.
- [x] 5.2 In `src/content/en/home/home.md`, add the "Coinimp.com / ABC Hosting" entry (position "Full Stack Developer", period "Apr 2017 - May 2018", technologies: Python, PHP, jQuery, Vue.js, Bootstrap), no `description`/`achievements`, placed as the last (earliest) entry.
- [x] 5.3 In `src/content/en/home/home.md`, correct the KUBO SAS `period` end date from "Sep 2020" to "Dec 2020".
- [x] 5.4 Repeat 5.1-5.3 in `src/content/es/home/home.md` with the Spanish position label ("Desarrollador Full Stack" or matching existing style) and period "Abr 2017 - May 2018" for Coinimp/ABC Hosting.
- [x] 5.5 Confirm both `home.md` files keep parallel structure (same entries, same order, same field names) between `en` and `es`.

## 6. Verification

- [x] 6.1 Run the full Jest suite and confirm no regressions outside `CareerTimeLine`.
- [x] 6.2 Run `bun run build` to confirm both `home.md` files validate against `careerTimeLineSchema` with no Zod errors.
- [x] 6.3 Visually spot-check the built/dev page (`bun dev`) for both `/en` and `/es` to confirm the CORPBID + Coinimp/ABC Hosting pair renders as two compact cards sharing one grid slot, and existing full cards are visually unchanged.

## 7. Additional content: Energía y Movilidad and PATROCINARTE.NET

- [x] 7.1 In `src/content/en/home/home.md`, add the "Energía y Movilidad" entry (position "Software Developer (Part-time)", period "Jun 2016 - Feb 2017", technologies: PHP, WordPress, JavaScript, jQuery), no `description`/`achievements`, placed chronologically after Coinimp.com / ABC Hosting and before PATROCINARTE.NET.
- [x] 7.2 In `src/content/en/home/home.md`, add the "PATROCINARTE.NET" entry (position "Software Developer", period "Jun 2015 - Aug 2016", technologies: PHP, JavaScript, jQuery), no `description`/`achievements`, placed as the last (earliest) entry.
- [x] 7.3 Repeat 7.1-7.2 in `src/content/es/home/home.md` with Spanish position labels ("Desarrollador de Software (Medio tiempo)" / "Desarrollador de Software") and period "Jun 2015 - Ago 2016" for PATROCINARTE.NET.
- [x] 7.4 Run `bun run build` to confirm both `home.md` files still validate against `careerTimeLineSchema` with the four now-consecutive compact entries (CORPBID, Coinimp/ABC Hosting, Energía y Movilidad, PATROCINARTE.NET) pairing correctly (CORPBID+Coinimp in one slot, Energía y Movilidad+PATROCINARTE.NET in another) with no component changes required, since `groupExperiencesIntoSlots` already generalizes to any number of consecutive compact entries.
