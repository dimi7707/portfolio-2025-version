## ADDED Requirements

### Requirement: Grid Layout System
The component SHALL render career experiences in a responsive grid layout that adapts to different screen sizes.

#### Scenario: Desktop layout
- **WHEN** viewport width is >= 1024px
- **THEN** grid displays 3 columns with equal width cards

#### Scenario: Tablet layout
- **WHEN** viewport width is >= 640px and < 1024px
- **THEN** grid displays 2 columns with equal width cards

#### Scenario: Mobile layout
- **WHEN** viewport width is < 640px
- **THEN** grid displays 1 column with full-width cards

#### Scenario: Grid gap spacing
- **WHEN** grid is rendered at any breakpoint
- **THEN** cards have 2rem (32px) gap between them

### Requirement: Card Structure
Each career experience card SHALL display all required information in a structured format.

#### Scenario: Card with all content
- **WHEN** experience data includes company, position, period, description, achievements, and technologies
- **THEN** card renders all sections in correct hierarchy: badge, date range, company info, description, achievements list, technology tags

#### Scenario: Card without achievements
- **WHEN** experience data has empty achievements array
- **THEN** achievements section is not rendered

#### Scenario: Card with multiline description
- **WHEN** experience description contains newline characters
- **THEN** each paragraph is rendered as separate <p> element

### Requirement: Scroll Animation
Cards SHALL animate into view with staggered timing as user scrolls.

#### Scenario: Initial card state
- **WHEN** component mounts
- **THEN** all cards start with opacity 0 and translateY 50px

#### Scenario: Scroll trigger activation
- **WHEN** grid container enters viewport (top at 80%)
- **THEN** GSAP animation begins for all cards

#### Scenario: Stagger timing
- **WHEN** scroll animation triggers
- **THEN** each card animates with 0.15s delay after previous card

#### Scenario: Animation values
- **WHEN** card animation runs
- **THEN** card transitions to opacity 1 and translateY 0 over 0.8s duration

### Requirement: Accessibility
Grid and cards SHALL be accessible to keyboard and screen reader users.

#### Scenario: Keyboard navigation
- **WHEN** user presses Tab key
- **THEN** focus moves to next card in grid order

#### Scenario: Semantic HTML
- **WHEN** card is rendered
- **THEN** company name uses <h3>, position uses <h4>, section headings use <h5>

#### Scenario: Alt text for logos
- **WHEN** company logo is displayed
- **THEN** img element has alt text "Logo de {companyName}"
