## Why

The current Career Timeline component uses a traditional vertical timeline design with sequential scroll animations. While functional, it doesn't effectively showcase professional experience in a modern, scannable format. A card-based grid layout with hover interactions provides better visual hierarchy, improved scannability, and a more contemporary portfolio aesthetic that aligns with current design trends.

## What Changes

- Replace vertical timeline layout with responsive card-based grid system
- Replace timeline markers with company logo/initial badges
- Add date range badges positioned in card headers
- Implement hover effects for card interactions (scale, glow, elevation)
- Redesign technology tags as pill-shaped badges
- Update color scheme to dark theme with cyan/teal accents
- Refactor GSAP animations from sequential timeline reveals to card-by-card stagger animations
- Add new props for company logos/initials
- Maintain i18n support for English and Spanish content

## Capabilities

### New Capabilities
- `career-card-grid`: Card-based grid layout system with responsive breakpoints and hover interactions
- `company-badge`: Company logo/initial badge component with customizable styling
- `date-range-badge`: Floating date range indicator with pill styling
- `hover-animations`: Interactive hover effects including scale, glow, and elevation changes

### Modified Capabilities
<!-- No existing specs to modify - this is a component redesign -->

## Impact

**Affected Components:**
- `src/components/CareerTimeLine/CareerTimeLine.tsx` - Complete redesign
- `src/components/CareerTimeLine/CareerTimeLine.module.scss` - New styles for grid, cards, badges

**Dependencies:**
- Install Jest and React Testing Library for TDD implementation
- GSAP/ScrollTrigger remains but animations will be refactored
- No changes to content collections or i18n structure

**Content Schema:**
- Add optional `companyInitials` field for badge display (fallback to logo)
- `companyLogo` becomes optional (can use initials instead)

**Breaking Changes:**
- **BREAKING**: SCSS module class names will change (grid-based instead of timeline-based)
- Animation timing and behavior will differ from current implementation
