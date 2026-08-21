## ADDED Requirements

### Requirement: Light surface tokens are centralized in `_variables.scss`
The site SHALL define its light surface scale (base white tier, subtle off-white elevation tier, and a tinted-wash tier derived from `$accent-color`/`$secondary-color`) and its light border tone as shared tokens in `src/styles/_variables.scss`, rather than as per-component local redeclarations.

#### Scenario: A light-themed component consumes the shared tokens
- **WHEN** a component's stylesheet (e.g. `AIPassionSection.module.scss`, `CareerTimeLine.module.scss`) needs a light surface color
- **THEN** it imports the token from `_variables.scss` rather than declaring its own local copy of the same value

### Requirement: Accent cyan is never used as text color on a light surface
Across every home page section rendered on a light surface (all sections except `TechConstellation`), `$primary`/`$accent-color` cyan SHALL NOT be used as the foreground color of any text element (headings, body copy, labels, tags). Cyan SHALL remain valid for non-text uses: backgrounds, borders, icon fills, button fills, and glow/shadow accents.

#### Scenario: Headline/emphasis text uses a contrast-safe anchor instead of pure cyan
- **WHEN** any light-surfaced home page section renders a headline or emphasis text element that uses the site's cyan/blue identity colors
- **THEN** the rendered text color (or the darkest stop of any gradient clipped to that text) provides WCAG AA contrast against its light background, and pure `$primary`/`$accent-color` is not used as that text's own color

#### Scenario: Cyan remains usable as a border, background, or icon color on light surfaces
- **WHEN** any light-surfaced home page section renders a border, background wash, button fill, or icon in `$primary`/`$accent-color`
- **THEN** that usage is unaffected by the text-contrast rule, since it is not text

### Requirement: TechConstellation's edges are a direct hard cut, not a blended transition
Where `TechConstellation` (which remains dark) borders a light-surfaced section above or below it, the boundary SHALL be a direct, unblended color change straight to `TechConstellation`'s dark surface — no gradient, glow, or other transitional treatment at the seam.

**History**: an earlier version of this requirement called for a short gradient/glow transition instead. Two implementation attempts (a plain 2-stop light-to-black `linear-gradient`, then a reworked version compressing the color change with a stronger cyan glow layered on top) were both rejected on visual review — the first read as a muddy gray smear, the second still read poorly ("espantosa"/hideous) despite the rework. Per explicit user direction, the transition concept is dropped entirely rather than attempting a third iteration.

#### Scenario: Top edge is an immediate cut
- **WHEN** a user scrolls from `AIPassionSection` into `TechConstellation`
- **THEN** the visual boundary is an immediate change from the light section's background straight to `TechConstellation`'s dark surface, with no gradient or glow band at the seam

#### Scenario: Bottom edge is an immediate cut
- **WHEN** a user scrolls from `TechConstellation` into `CareerTimeLine`
- **THEN** the visual boundary is an immediate change from `TechConstellation`'s dark surface straight to the light section's background, with no gradient or glow band at the seam
