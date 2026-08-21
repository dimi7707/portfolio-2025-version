## Context

The home page (`src/components/pages/HomePage.astro`) renders `Hero` → `AIPassionSection` → `TechConstellation` → `CareerTimeLine` → `DownloadCv`. `Hero` is white; `DownloadCv` is near-white with a subtle cyan/blue tinted wash (`rgba($accent-color, 0.1)` → `rgba($secondary-color, 0.1)`); `AIPassionSection` and `TechConstellation` are near-black (`#050505`→`#1c1c1f`, shipped today via the archived `refresh-home-sections` change as a deliberate "Cyber-Terminal Executive" identity); `CareerTimeLine` is dark navy (`#0a0e15`/`#0f141c`), from the in-progress `redesign-career-timeline` change (23/115 tasks done).

Decision, already made with the user: keep `TechConstellation` dark (its node-glow effect depends on a near-black canvas for contrast) and move everything else — `AIPassionSection`, `CareerTimeLine`, and a contrast fix in `DownloadCv` — to a light palette, formalizing the token pattern `DownloadCv` already proves works.

Two dark-token scales already exist, each duplicated locally rather than shared: `AIPassionSection.module.scss` and `TechConstellation.module.scss` each redeclare `$surface-base`/`$surface-elevation-1`/`$surface-elevation-2`. The new light scale will not repeat that duplication — it lives once in `_variables.scss`.

## Goals / Non-Goals

**Goals:**
- One centralized light surface/token scale in `_variables.scss`, consumed (not redeclared) by every component that needs it.
- A text-contrast rule applied uniformly: cyan (`$primary`/`$accent-color`) is never a text color on a light surface, including in `DownloadCv`'s pre-existing title, which predates this rule.
- ~~A visually deliberate (not accidental) transition where light sections meet `TechConstellation`'s dark boundary.~~ Superseded (see Decision 6): after two rejected attempts, the goal became a deliberate *hard cut* instead — deliberate in that it's a decision, not that it's blended.
- `redesign-career-timeline`'s remaining tasks describe a light theme, not a dark one, before more of them get implemented.

**Non-Goals:**
- No change to `$primary`, `$accent-color`, `$secondary-color` values themselves — only where/how they're applied.
- No change to `TechConstellation`'s own background, node styling, layout, or behavior — only its outer top/bottom edge gains a transition treatment.
- No redesign of `Hero` (already the reference) or of `CareerTimeLine`'s grid/card layout mechanics (owned by `redesign-career-timeline`; this change only touches color).

## Decisions

### 1. Centralize new tokens in `_variables.scss`, break from the existing per-component duplication convention
`_variables.scss` already holds `$accent-color`, `$secondary-color`, `$text-primary`/`$text-secondary` — it's the natural home for shared tokens. The dark scale duplicated itself because `AIPassionSection` and `TechConstellation` were built as two separate, narrowly-scoped deltas in the same change and nobody needed a third consumer yet. The light scale has three consumers from day one (`AIPassionSection`, `CareerTimeLine`, `DownloadCv`), so centralizing avoids the drift risk immediately rather than after a third copy already exists.

New tokens (values chosen from existing precedent already in the codebase, not invented):
```
$surface-light-0:  #ffffff   // = Hero's background, the base tier
$surface-light-1:  #f8f9fa   // subtle elevation; matches the orphaned
                              // CareerTimeLine.module 2.scss's old light bg
$surface-light-border: #e2e8f0  // = Hero.module.scss's existing image border
$accent-wash: linear-gradient(45deg, rgba($accent-color, 0.1), rgba($secondary-color, 0.1))
                              // = DownloadCv's existing gradient, formalized as a token
```

### 2. Text-on-light anchor color: `$secondary-color`, not a new brand color
`$primary`/`$accent-color` (`#00fff7`) fails contrast as text on light surfaces. Rather than invent a new brand hue, headline/emphasis text and gradient-clipped titles anchor on `$secondary-color` (`#0066ff`, already in `_variables.scss`, already proven on white in `DownloadCv`'s CTA button). Where a gradient effect is wanted (title treatments), it runs from `$secondary-color` toward a darkened/saturated cyan derived via `color.scale($accent-color, $lightness: -45%..-55%)` — a `$accent-color-text` token, so the cyan identity is still visually present in the gradient, just not at a lightness that fails contrast. Plain body/description text uses the existing `$text-primary`/`$text-secondary` — untouched.

Cyan at full brightness stays legitimate for non-text uses on light surfaces: low-opacity background washes, borders, icon fills, button backgrounds, glow/shadow accents. Only text is restricted.

**Alternative considered**: keep the cyan-to-blue gradient direction as-is (cyan → blue) but rely on the gradient's blue end to "average out" contrast. Rejected — the letters rendered in the cyan portion of the gradient are still individually low-contrast; averaging doesn't fix per-pixel legibility, and this is the exact failure mode already present in `DownloadCv`'s current title.

### 3. `DownloadCv` title fix applies the same rule retroactively
`DownloadCv.scss`'s `&__title` (`linear-gradient(45deg, $accent-color, $secondary-color)` clipped to text) predates this change's rule but is the same failure mode. Per explicit user direction, it's corrected in this change rather than left as a grandfathered exception, using the `$accent-color-text`/`$secondary-color` gradient from Decision 2. The button (`&__button`, solid gradient background with white text on top) is unaffected — cyan-as-background with light text on top is exactly the sanctioned pattern.

### 4. Hover/emphasis language shifts from "glow" to "elevation" on light surfaces
Dark sections signal interactivity with a glow (`box-shadow: 0 0 Npx rgba($neon-cyan, opacity)`), which reads as brightness spilling into surrounding darkness. That doesn't work on a white canvas — a cyan glow on white looks like a stray colored blur, not an intentional lighting effect. On light surfaces (`CareerTimeLine` cards, any future light hover states), the equivalent is a conventional elevation shift: a soft neutral drop shadow that deepens on hover, combined with a border that shifts from `$surface-light-border` (neutral) to `$primary` (cyan) on hover/focus. This keeps hover feedback consistent in *intent* (something intensifies) without copying a visual language that only works on dark.

### 5. `AIPassionSection`: re-map the existing gradient direction, not just swap colors
The section's background is `linear-gradient(135deg, $surface-base 0%, $surface-elevation-1 50%, $surface-elevation-2 100%)`. This becomes `linear-gradient(135deg, $surface-light-0 0%, $surface-light-1 50%, <tinted-wash-end> 100%)` — same diagonal motion, same three-stop structure, mapped onto the light scale, so the section keeps its existing sense of depth/movement rather than flattening to a single flat color. The conic-gradient overlay and radial `.backgroundGradient` (both already low-opacity cyan/blue washes, 10-15%) are left as-is — they're not text, they already read fine as soft color haze over either a dark or light base. The one thing that must flip is `.backgroundIcon`'s `color: rgba(255, 255, 255, 0.08)` (near-invisible white icons, designed for a black backdrop) — inverted to a faint dark tone (e.g. `rgba($text-primary, 0.06)`) so the decorative background icons remain visible-but-subtle on light instead of disappearing or, worse, becoming a visible white smear.

### 6. `TechConstellation` boundary: a hard cut, not a transition — reversed after two rejected attempts
**Original decision** (superseded): add a top and bottom pseudo-element (`::before`/`::after`) to `.techConstellation`, blending the adjacent light section's surface tone into `$surface-base` with a radial cyan glow layered on top, so the seam reads as an intentional "horizon glow." **Rejected on visual review** — a plain 2-stop `linear-gradient` between a near-white and a near-black color inevitably produces a flat, muddy gray band at the midpoint (interpolating opposite-lightness neutrals always passes through gray; this isn't a tuning bug, it's what that gradient shape *is*). A second attempt compressed the color change into the middle 30% of a taller band and substantially boosted the cyan/blue glow's opacity and size to mask the gray with color — still rejected on visual review as "espantosa" (hideous).

**Final decision**: drop the transition concept entirely. `TechConstellation`'s boundaries are a direct, unblended cut straight to `$surface-base` — the same simple behavior as before this change touched the file at all. Per explicit user direction, a third iteration was not attempted; two rejected passes at essentially the same idea (a blended seam) is treated as evidence the idea itself doesn't fit here, not that the execution needs more tuning.

### 7. `CareerTimeLine` cards and tags
Section background: `$surface-light-0`. Cards: `$surface-light-1`, with the elevation/hover pattern from Decision 4. Tech-tag chips: background `$surface-light-0` or transparent, `1px solid $primary` border, text in `$text-primary` — cyan is the border/accent, never the tag's own text color, matching Decision 2's rule.

### 8. Coordinate with `redesign-career-timeline` by editing its docs in place, done first
`redesign-career-timeline`'s `tasks.md` (e.g. task 6.2: "dark background, cyan text" for the date badge) and any matching passages in its `design.md` are edited in place to describe the light theme from Decisions 4 and 7, rather than left stale. This edit is sequenced **first** in the migration plan (not last) specifically to close the window where someone could pick up one of that change's pending tasks and implement it against the old, now-incorrect wording before this change lands.

### 9. `AIPassionSection` restructured into a two-column layout, mirroring `Hero` in reverse
Left-aligning the title/description within the section's single centered card (per Decision 5's background, applied to the pre-existing `.content` card) looked wrong on visual review: it left a large, empty, unbalanced area to the right of the text at desktop widths, since the card was sized/centered for center-aligned content. Re-centering the card was one option; instead, the section is restructured into an explicit two-column layout — a visual graphic in a left column, title/description in a right column — deliberately mirroring `Hero`'s own two-column pattern (`Hero` puts copy on the left, the profile image on the right; this section does the reverse), per direct user request to "play with the pattern" established at the top of the page.

The left column's visual is a small custom "orchestration" graphic (a central hub node connected via dashed lines to four satellite nodes representing the tools named in the copy — Claude, Cursor, Warp, MCP), built from `react-icons` already imported in the component and the site's own `$primary`/`$secondary-color`/`$accent-color-text` tokens. This was chosen over sourcing a stock AI photo (robot/brain imagery) because it stays visually consistent with `TechConstellation`'s node/connector language elsewhere on the page and directly illustrates the copy's own "I orchestrate them" framing, rather than an generic, unrelated stock image.

The section's old ambient full-width decorative SVG (`.neuralNetwork`, a background wash of animated paths/nodes using the *pre-`refresh-home-sections`* purple/red/blue gradient that was never fully migrated to the site's identity palette) is removed as part of this restructure — its role as "AI-themed decoration" is now filled by the featured orchestration graphic, and removing it also incidentally cleans up that stale off-brand gradient rather than requiring a separate fix.

On mobile (`max-width: 900px`), the layout stacks vertically with the visual first (`order: -1`), matching how `Hero` also stacks its image above its copy on mobile.

## Risks / Trade-offs

- **[Risk] The `TechConstellation` boundary pseudo-elements could visually obscure or interfere with hand-placed scatter nodes that land near a section edge** → **Mitigation**: `pointer-events: none` and a `z-index` below all node/connector layers means the transition only ever affects the backdrop, never sits above content; kept low-opacity so even a node passing behind it stays fully legible.
- **[Risk] Editing `redesign-career-timeline`'s `tasks.md`/`design.md` — a change owned by separate, ongoing work — could collide with someone actively mid-task on it** → **Mitigation**: the edit is a targeted find-and-replace of color-language in not-yet-completed task descriptions, not a restructuring of the task list itself, and is sequenced first in this change's own migration plan to minimize the window of staleness.
- **[Risk] A darkened `$accent-color-text` derived via `color.scale()` could read as "just blue," diluting the cyan identity in text-bearing headlines** → **Mitigation**: pure `$accent-color` stays visible elsewhere on the same surfaces (borders, icon fills, button backgrounds, the tinted wash), so the cyan identity remains clearly present even where headline text itself uses the darker, readable variant.
- **[Risk] Removing the orphaned `CareerTimeLine.module 2.scss` / `.module 3.scss` files could delete someone's forgotten in-progress work** → **Mitigation**: confirmed via grep that `CareerTimeLine.tsx` only imports `CareerTimeLine.module.scss`; the "2"/"3" files are already committed to git history (recoverable), not uncommitted local edits, so removal is safe cleanup.

## Migration Plan

1. Edit `redesign-career-timeline`'s `tasks.md`/`design.md` dark-theme wording first, to close the coordination window described in Decision 8 and the risk above.
2. Add the new tokens to `_variables.scss` (Decisions 1–2). Purely additive, nothing consumes them yet — no visual change at this step.
3. Fix `DownloadCv.scss`'s title gradient (Decision 3). Smallest, most isolated change; validates the new text-anchor tokens in production before reusing them elsewhere.
4. Re-theme `AIPassionSection.module.scss` (Decisions 4–5): background gradient, background icon color, title/description text colors.
5. Re-theme `CareerTimeLine.module.scss` (Decisions 4, 7): section/card backgrounds, tag border/text; delete the orphaned `CareerTimeLine.module 2.scss` / `.module 3.scss` files.
6. Add the `TechConstellation` boundary transition (Decision 6) — sequenced last since it's the only step touching the component this change otherwise leaves alone, and benefits from having the real, final light colors of its now-updated neighbors to blend against.

Each step is an isolated CSS/token change with no data migration — rollback is a per-file `git revert` at any point. Steps 4–6 depend on step 2's tokens existing; step 1 has no dependency and is safe to land independently/immediately.

## Open Questions

- Exact pixel height (4rem vs. 6rem vs. 8rem) and peak glow opacity for the `TechConstellation` boundary transition are left to visual QA against the real rendered page rather than pinned here.
- Whether `$accent-color-text` is a manually chosen hex or a `color.scale()`-derived value is left to implementation, provided the resulting contrast ratio against `$surface-light-0` is confirmed ≥ 4.5:1 (WCAG AA for normal text) during implementation/QA.
