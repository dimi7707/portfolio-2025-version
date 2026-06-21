## 1. Test Environment Setup

- [x] 1.1 Install Jest and React Testing Library dependencies (`jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`)
- [x] 1.2 Create Jest configuration file (jest.config.js) with TypeScript and SCSS module support
- [x] 1.3 Create test setup file with GSAP and ScrollTrigger mocks
- [x] 1.4 Add jest-environment-jsdom for DOM testing
- [x] 1.5 Add test script to package.json (`"test": "jest"`, `"test:watch": "jest --watch"`)
- [x] 1.6 Verify test environment with a simple smoke test

## 2. Component Interface Tests (TDD - Red Phase)

- [x] 2.1 Write test: Component renders without crashing with minimal props
- [x] 2.2 Write test: Component renders title from titleSection prop
- [x] 2.3 Write test: Component renders correct number of cards from experiences array
- [x] 2.4 Write test: Component handles empty experiences array gracefully
- [x] 2.5 Write test: TypeScript interfaces match existing Experience type

## 3. Company Badge Tests (TDD - Red Phase)

- [x] 3.1 Write test: Badge displays company logo when companyLogo prop exists
- [x] 3.2 Write test: Badge displays companyInitials when provided (no logo)
- [x] 3.3 Write test: Badge auto-generates initials from company name when neither logo nor initials provided
- [x] 3.4 Write test: Auto-generated initials extract first 2 uppercase letters from single-word company
- [x] 3.5 Write test: Auto-generated initials extract first letter of each word for multi-word company
- [x] 3.6 Write test: Badge has correct CSS classes and structure

## 4. Company Badge Implementation (TDD - Green Phase)

- [x] 4.1 Implement badge container structure in TSX
- [x] 4.2 Implement logo/initials priority logic
- [x] 4.3 Implement auto-generate initials utility function
- [x] 4.4 Add badge styles to SCSS module (square, rounded, dark theme)
- [x] 4.5 Verify all badge tests pass
- [x] 4.6 Refactor badge logic for clarity and maintainability

## 5. Date Range Badge Tests (TDD - Red Phase)

- [ ] 5.1 Write test: Date badge displays period text from experience data
- [ ] 5.2 Write test: Date badge is positioned at top right of card
- [ ] 5.3 Write test: Date badge has pill-shaped styling
- [ ] 5.4 Write test: Date badge uses correct CSS classes

## 6. Date Range Badge Implementation (TDD - Green Phase)

- [ ] 6.1 Implement date badge container in card header
- [ ] 6.2 Add date badge SCSS styles (pill shape, cyan text, dark background)
- [ ] 6.3 Position date badge with CSS (absolute/flexbox)
- [ ] 6.4 Verify all date badge tests pass
- [ ] 6.5 Refactor date badge styles for reusability

## 7. Card Grid Layout Tests (TDD - Red Phase)

- [ ] 7.1 Write test: Grid uses CSS Grid display
- [ ] 7.2 Write test: Grid has correct gap spacing (2rem)
- [ ] 7.3 Write test: Grid renders all card content sections (company, position, description, achievements, technologies)
- [ ] 7.4 Write test: Achievements section hidden when array is empty
- [ ] 7.5 Write test: Description with newlines renders multiple <p> elements
- [ ] 7.6 Write test: Technology tags render as individual elements

## 8. Card Grid Layout Implementation (TDD - Green Phase)

- [ ] 8.1 Create new SCSS module with grid layout classes
- [ ] 8.2 Implement responsive grid (3 col desktop, 2 col tablet, 1 col mobile)
- [ ] 8.3 Implement card structure with all content sections
- [ ] 8.4 Implement conditional rendering for achievements
- [ ] 8.5 Implement description paragraph splitting logic
- [ ] 8.6 Verify all grid layout tests pass
- [ ] 8.7 Refactor grid CSS for maintainability

## 9. Card Styling Tests (TDD - Red Phase)

- [ ] 9.1 Write test: Card has dark background and border colors
- [ ] 9.2 Write test: Card has rounded corners
- [ ] 9.3 Write test: Technology tags have pill styling
- [ ] 9.4 Write test: Typography hierarchy (h3 for company, h4 for position, h5 for sections)

## 10. Card Styling Implementation (TDD - Green Phase)

- [ ] 10.1 Add card base styles (background #0f141c, border #1f2630, border-radius)
- [ ] 10.2 Add company header styles with flexbox layout
- [ ] 10.3 Add technology tag pill styles
- [ ] 10.4 Add typography styles with correct hierarchy
- [ ] 10.5 Add description and achievements list styles
- [ ] 10.6 Verify all card styling tests pass
- [ ] 10.7 Refactor SCSS using variables for colors and spacing

## 11. Hover Animation Tests (TDD - Red Phase)

- [ ] 11.1 Write test: Hover CSS class applies transform scale(1.02) and translateY(-8px)
- [ ] 11.2 Write test: Hover CSS class applies enhanced shadow with cyan tint
- [ ] 11.3 Write test: Hover CSS class applies border color change to cyan
- [ ] 11.4 Write test: Transition duration is 0.3s with correct easing
- [ ] 11.5 Write test: Active state exists for touch devices

## 12. Hover Animation Implementation (TDD - Green Phase)

- [ ] 12.1 Add hover transform styles to card
- [ ] 12.2 Add hover shadow styles with cyan rgba(34, 211, 238, 0.2)
- [ ] 12.3 Add hover border glow styles
- [ ] 12.4 Add transition with cubic-bezier(0.4, 0, 0.2, 1) easing
- [ ] 12.5 Add :active state for touch devices
- [ ] 12.6 Add will-change optimization hint
- [ ] 12.7 Verify all hover tests pass

## 13. GSAP Scroll Animation Tests (TDD - Red Phase)

- [ ] 13.1 Write test: GSAP registerPlugin called with ScrollTrigger on mount
- [ ] 13.2 Write test: gsap.context created with timeline ref
- [ ] 13.3 Write test: Cards initialized with opacity 0 and y: 50
- [ ] 13.4 Write test: ScrollTrigger configured with correct start position (top 80%)
- [ ] 13.5 Write test: Stagger value is 0.15s
- [ ] 13.6 Write test: Cleanup function calls ctx.revert()

## 14. GSAP Scroll Animation Implementation (TDD - Green Phase)

- [ ] 14.1 Add gsap.registerPlugin(ScrollTrigger) in useEffect
- [ ] 14.2 Create gsap.context with timeline ref
- [ ] 14.3 Implement card array ref with useRef<(HTMLDivElement | null)[]>
- [ ] 14.4 Add gsap.fromTo for cards with stagger animation
- [ ] 14.5 Configure ScrollTrigger with container trigger and start position
- [ ] 14.6 Add cleanup return () => ctx.revert()
- [ ] 14.7 Verify all GSAP tests pass
- [ ] 14.8 Refactor animation code for readability

## 15. Accessibility Tests (TDD - Red Phase)

- [ ] 15.1 Write test: Cards have tabIndex={0} for keyboard navigation
- [ ] 15.2 Write test: Company logo img has alt attribute with company name
- [ ] 15.3 Write test: Semantic heading structure (h2 > h3 > h4 > h5)
- [ ] 15.4 Write test: Focus visible styles exist for keyboard users

## 16. Accessibility Implementation (TDD - Green Phase)

- [ ] 16.1 Add tabIndex={0} to card container
- [ ] 16.2 Add alt text to company logo img
- [ ] 16.3 Verify heading hierarchy in JSX
- [ ] 16.4 Add focus-visible styles to SCSS
- [ ] 16.5 Verify all accessibility tests pass

## 17. Responsive Design Tests

- [ ] 17.1 Write test: Desktop breakpoint (>=1024px) shows 3 columns
- [ ] 17.2 Write test: Tablet breakpoint (640-1023px) shows 2 columns
- [ ] 17.3 Write test: Mobile breakpoint (<640px) shows 1 column
- [ ] 17.4 Write test: Date badge remains visible on mobile
- [ ] 17.5 Write test: Card content stacks properly on mobile

## 18. Responsive Design Implementation

- [ ] 18.1 Add media queries for tablet breakpoint (max-width: 1024px)
- [ ] 18.2 Add media queries for mobile breakpoint (max-width: 640px)
- [ ] 18.3 Adjust date badge positioning for mobile if needed
- [ ] 18.4 Test on different screen sizes
- [ ] 18.5 Verify all responsive tests pass

## 19. Integration and Polish

- [ ] 19.1 Run full test suite and achieve 100% coverage
- [ ] 19.2 Test with real content data from English and Spanish collections
- [ ] 19.3 Remove old timeline SCSS classes no longer used
- [ ] 19.4 Update any pages importing CareerTimeLine component
- [ ] 19.5 Test scroll animations on actual page (not just unit tests)
- [ ] 19.6 Verify performance with browser DevTools (no jank)
- [ ] 19.7 Test on physical mobile device for touch interactions

## 20. Documentation and Cleanup

- [ ] 20.1 Add JSDoc comments to component and helper functions
- [ ] 20.2 Update component prop types documentation
- [ ] 20.3 Remove commented-out old code
- [ ] 20.4 Run Biome formatter on all changed files
- [ ] 20.5 Run Biome linter and fix any issues
- [ ] 20.6 Create test coverage report
- [ ] 20.7 Update CLAUDE.md if component usage patterns changed
