## ADDED Requirements

### Requirement: Date Range Display
Component SHALL display employment period in a formatted badge at the top right of each card.

#### Scenario: Date range rendering
- **WHEN** experience includes period field (e.g., "Mar 2023 - Jun 2025")
- **THEN** date range badge displays period text

#### Scenario: Badge positioning
- **WHEN** card is rendered
- **THEN** date badge is positioned at top right of card header

#### Scenario: Current employment indicator
- **WHEN** period text includes "Present", "Actualidad", or current date pattern
- **THEN** badge may use accent color to indicate current employment (optional enhancement)

### Requirement: Badge Styling
Date range badge SHALL have pill-shaped styling consistent with design system.

#### Scenario: Pill shape
- **WHEN** date badge is rendered
- **THEN** badge has rounded pill shape with border radius equal to half its height

#### Scenario: Badge colors
- **WHEN** date badge displays
- **THEN** badge has dark background with subtle border and cyan/teal text color

#### Scenario: Typography
- **WHEN** date text is displayed
- **THEN** text uses monospace or condensed font, small size (12-14px)

#### Scenario: Padding
- **WHEN** date badge is rendered
- **THEN** badge has horizontal padding (12-16px) and vertical padding (4-8px)

### Requirement: Responsive Behavior
Date badge SHALL remain visible and readable across all screen sizes.

#### Scenario: Desktop display
- **WHEN** viewport is >= 1024px
- **THEN** date badge displays at full size in top right corner

#### Scenario: Mobile display
- **WHEN** viewport is < 640px
- **THEN** date badge remains visible, may stack below company badge if needed

#### Scenario: Text truncation
- **WHEN** date range text is very long
- **THEN** text wraps or truncates gracefully without breaking layout
