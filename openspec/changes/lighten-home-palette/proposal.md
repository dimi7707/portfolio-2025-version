## Why

The home page reads as dark-mode-heavy: of its five sections, three in a row (`AIPassionSection`, `TechConstellation`, `CareerTimeLine`) render on near-black or dark-navy surfaces, sandwiched between the light `Hero` and `DownloadCv`. That middle stretch — exactly where a visitor decides whether to keep reading — works against the goal of a light, inviting page that encourages people to stay and read. `TechConstellation`'s dark "constellation" effect is a deliberate exception worth keeping (its node glow depends on a near-black canvas to read), but the surrounding sections should shift to a light palette that still carries the site's cyan/blue identity, following the pattern `DownloadCv` already uses successfully (a near-white surface with a subtle tinted wash).

## What Changes

- **Centralize color/surface tokens in `src/styles/_variables.scss`** as the single source of truth: a 3-tier light surface scale (`$surface-light-0` pure white, `$surface-light-1` subtle off-white, a tinted-wash token derived from `$accent-color`/`$secondary-color`), plus a shared light border token. This is a new convention — today's dark tokens are duplicated locally per component (`AIPassionSection.module.scss`, `TechConstellation.module.scss`); the light tokens will not repeat that duplication.
- **AIPassionSection re-themed to light**: replace its near-black gradient background (`#050505`→`#1c1c1f`) with the new light surface scale, keeping cyan/blue as accent-only (background tint, borders, particle/network-node color), never as body or heading text color.
- **`DownloadCv` title contrast fix**: its `&__title` gradient currently starts in pure cyan (`$accent-color`) clipped to text, which fails legibility on a light background. Re-anchor the gradient to start from `$secondary-color` (or another value with real contrast) so the "cyan never as text" rule applies evenly across the whole home page, including this section that predates the rule.
- **CareerTimeLine re-themed to light**: section background moves to `$surface-light-0` (white), cards to a subtle light variant (`$surface-light-1`) for a "card floating on a page" feel, and cyan is repositioned to borders/tech-tag accents only — never as tag or label text color.
- **BREAKING (process, not runtime)**: the in-progress `redesign-career-timeline` change (23/115 tasks complete) has pending tasks whose wording locks in a dark theme (e.g., task 6.2's "dark background, cyan text" date badge). This proposal updates that change's `tasks.md`/`design.md` wording in place so its remaining work builds toward the light theme instead of rebuilding the dark-mode problem this change fixes.
- **TechConstellation stays dark, unchanged** — explicit, intentional exception. Only its section boundaries (top/bottom edge) may gain a short gradient/glow transition so the cut to its neighbors' new light backgrounds doesn't look like a rendering error; the component's own surface tokens, node styling, and behavior are out of scope.
- Orphaned dead files `src/components/CareerTimeLine/CareerTimeLine.module 2.scss` and `CareerTimeLine.module 3.scss` (tracked in git, not imported anywhere) are removed as part of the CareerTimeLine cleanup, since one of them is superseded by this same light-surface direction and both are unused.

## Capabilities

### New Capabilities
- `home-light-surfaces`: Governs the centralized light surface token system (`_variables.scss` scale, border token, tinted-wash token) and the text-contrast rule (cyan/accent color never used as text on light surfaces), plus the short gradient/glow transition where light sections meet `TechConstellation`'s dark boundary.
- `career-timeline-visual-theme`: Governs the CareerTimeLine section's light background, card surface treatment, and the "cyan for borders/tags only, never text" rule for its tech-tag chips — distinct from the existing `career-timeline-labels` capability, which only covers locale label strings.
- `download-cv-visual-theme`: Governs the DownloadCv section's title treatment, specifically the gradient-text contrast fix.

### Modified Capabilities
- `ai-passion-section`: The existing "AIPassionSection visual palette matches the site's identity colors" requirement is amended — the cyan/blue identity palette now applies against a light surface background (per `home-light-surfaces`) instead of the near-black surfaces introduced by the archived `refresh-home-sections` change. The requirement that cyan/blue (not purple/red) anchors the palette is unchanged; only the surface it sits on changes.

## Impact

- **Styles**: `src/styles/_variables.scss` (new tokens), `src/components/AIPassionSection/AIPassionSection.module.scss`, `src/components/CareerTimeLine/CareerTimeLine.module.scss`, `src/components/DownloadCv/DownloadCv.scss`, `src/components/TechConstellation/TechConstellation.module.scss` (boundary transition only).
- **Dead code removal**: `src/components/CareerTimeLine/CareerTimeLine.module 2.scss`, `CareerTimeLine.module 3.scss`.
- **Cross-change coordination**: `openspec/changes/redesign-career-timeline/tasks.md` and `design.md` are edited in place to replace dark-theme wording in not-yet-completed tasks, so that change's remaining implementation work stays aligned with this one instead of reverting it. This is a real risk to flag: if `redesign-career-timeline` archives later and syncs its own spec for CareerTimeLine's visual design, it needs to agree with the `career-timeline-visual-theme` capability introduced here rather than re-introducing dark tokens.
- **No changes** to brand primary colors (`$primary`, `$accent-color`, `$secondary-color`), to `Hero` (already the reference model), or to `TechConstellation`'s own dark surface tokens, node rendering, or behavior.
