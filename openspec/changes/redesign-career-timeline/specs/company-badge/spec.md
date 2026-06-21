## ADDED Requirements

### Requirement: Badge Display Logic
Component SHALL display company badge using logo, initials, or auto-generated initials in priority order.

#### Scenario: Logo provided
- **WHEN** experience data includes companyLogo URL
- **THEN** badge displays company logo image

#### Scenario: Initials provided without logo
- **WHEN** experience data includes companyInitials but no companyLogo
- **THEN** badge displays companyInitials text

#### Scenario: Auto-generate initials
- **WHEN** experience data has neither companyLogo nor companyInitials
- **THEN** badge displays first 2 uppercase letters of company name

#### Scenario: Single word company name
- **WHEN** company name is "KUBO" and no initials/logo provided
- **THEN** badge displays "KU"

#### Scenario: Multi-word company name
- **WHEN** company name is "Sophos Solutions" and no initials/logo provided
- **THEN** badge displays "SO"

### Requirement: Badge Styling
Badge SHALL have consistent visual styling with proper dimensions and colors.

#### Scenario: Badge dimensions
- **WHEN** badge is rendered
- **THEN** badge has fixed square dimensions with rounded corners

#### Scenario: Badge background
- **WHEN** badge contains initials (no logo)
- **THEN** badge has dark background (#0f141c) with border (#1f2630)

#### Scenario: Initials typography
- **WHEN** badge displays initials
- **THEN** text is uppercase, centered, and uses monospace font

#### Scenario: Logo sizing
- **WHEN** badge displays company logo
- **THEN** image is contained within badge bounds without distortion

### Requirement: Badge Animation
Badge SHALL animate with scale and opacity when card enters viewport.

#### Scenario: Initial badge state
- **WHEN** card is rendered but not in viewport
- **THEN** badge has scale 0 and opacity 0

#### Scenario: Badge entrance animation
- **WHEN** card scroll animation triggers
- **THEN** badge animates to scale 1 and opacity 1 with back.out(1.7) easing

#### Scenario: Animation duration
- **WHEN** badge animates
- **THEN** animation completes in 0.6s
