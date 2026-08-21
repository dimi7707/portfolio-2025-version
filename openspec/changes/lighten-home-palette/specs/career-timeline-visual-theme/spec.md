## ADDED Requirements

### Requirement: CareerTimeLine section renders on a light background
The CareerTimeLine section SHALL render on the site's base light surface, replacing the dark navy background (`#0a0e15`/`$bg-dark`) it currently uses.

#### Scenario: Section background is light
- **WHEN** a user views the CareerTimeLine section
- **THEN** the section's background is the site's light base surface token, not a dark navy tone

### Requirement: CareerTimeLine cards use an elevated light surface distinct from the section background
Each experience card within CareerTimeLine SHALL render on a subtly distinct light surface tone from the section background it sits on, and SHALL signal hover/focus interaction through elevation (shadow depth and border color change) rather than a glow effect.

#### Scenario: Cards are visually distinct from the section background
- **WHEN** a user views a CareerTimeLine card
- **THEN** the card's background tone is a distinguishable, subtly different light tone from the section background behind it

#### Scenario: Hover/focus deepens shadow and shifts border color instead of glowing
- **WHEN** a user hovers or focuses a CareerTimeLine card
- **THEN** the card's shadow deepens and its border shifts toward the site's cyan accent, with no `box-shadow`-based glow/blur effect applied

### Requirement: Tech-tag chips use cyan as a border/accent only, never as text color
Technology tag chips rendered within CareerTimeLine cards SHALL use the site's cyan accent color for their border, and SHALL render their label text in the site's standard dark text color, never in cyan.

#### Scenario: Tag border is cyan, tag text is not
- **WHEN** a tech-tag chip is rendered inside a CareerTimeLine card
- **THEN** the chip's border renders in `$primary`/`$accent-color` cyan and the chip's label text renders in `$text-primary`, not in cyan
