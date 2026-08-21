## MODIFIED Requirements

### Requirement: AIPassionSection visual palette matches the site's identity colors
The AIPassionSection component SHALL use the site's cyan/blue identity palette (anchored on `$primary`/neon-cyan and neon-blue accents) for its background wash, particle, and network-node styling against the site's light surface scale, instead of the near-black surfaces introduced by the archived `refresh-home-sections` change and instead of the original generic blue/purple/red AI gradient. Cyan/blue accent colors SHALL NOT be used as the color of any text element within the section.

#### Scenario: Section background uses the light surface scale
- **WHEN** AIPassionSection is rendered
- **THEN** its background is composed from the site's light surface tokens (white/off-white/tinted wash), not the near-black surface tokens (`$surface-base`/`$surface-elevation-1`/`$surface-elevation-2`)

#### Scenario: Title gradient uses identity cyan/blue tones with adequate contrast
- **WHEN** AIPassionSection is rendered
- **THEN** the title's gradient and accent colors are drawn from the site's cyan/blue identity tokens, anchored on a contrast-safe variant so the rendered title text meets WCAG AA contrast against the light background, with no purple or red tones present

#### Scenario: Description and body text never render in cyan
- **WHEN** AIPassionSection is rendered
- **THEN** the description and any other body/label text render in the site's standard text colors (`$text-primary`/`$text-secondary`), not in `$primary`/`$accent-color` cyan

## ADDED Requirements

### Requirement: AIPassionSection renders as a two-column layout with a visual on the left and copy on the right
The AIPassionSection component SHALL render its title and description in a right-hand column, paired with a visual graphic in a left-hand column, mirroring `Hero`'s two-column pattern in reverse (`Hero` places copy on the left and the profile image on the right).

**History**: the section originally rendered as a single centered card with center-aligned text. When re-themed to a light background, the text was first left-aligned within that same centered card, which visual review found left a large, awkward empty area to the right of the text at desktop widths. Restructuring into an explicit two-column layout (visual left, copy right) resolved this and gave the section a deliberate relationship to `Hero`'s layout instead of an accidental one.

#### Scenario: Desktop renders visual and copy side by side
- **WHEN** AIPassionSection is viewed on a desktop-width viewport
- **THEN** a visual graphic renders in a left column and the title/description render in a right column, both columns vertically centered against each other

#### Scenario: Title and description are left-aligned within their column
- **WHEN** AIPassionSection is viewed
- **THEN** the title and description text is left-aligned, not centered, within the right-hand column

#### Scenario: Mobile stacks the visual above the copy
- **WHEN** AIPassionSection is viewed on a mobile-width viewport
- **THEN** the layout stacks vertically with the visual graphic above the title/description, consistent with how `Hero` stacks its image above its copy on mobile

### Requirement: The visual graphic represents AI orchestration without a stock photo
AIPassionSection's left-column visual SHALL be an on-brand graphic depicting the "orchestration" concept from the section's copy (a central node connected to the AI tools/agents named in the text), rendered with the site's own cyan/blue identity tokens, rather than a generic stock photo or an off-brand illustration.

#### Scenario: Visual uses site identity colors, not stock imagery
- **WHEN** AIPassionSection's visual graphic is rendered
- **THEN** its nodes, connectors, and hub use the site's `$primary`/`$secondary-color`/`$accent-color-text` tokens, and no external stock photograph is used
