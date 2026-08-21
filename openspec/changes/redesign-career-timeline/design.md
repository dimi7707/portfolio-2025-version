## Context

**Current State:**
The CareerTimeLine component uses a vertical timeline layout with:
- Timeline markers and connecting lines
- Sequential GSAP scroll animations
- Content revealed progressively as user scrolls
- Optimized for vertical reading flow

**Target State:**
Redesign to card-based grid layout inspired by modern portfolio designs:
- Responsive grid system (3 columns desktop, 2 tablet, 1 mobile)
- Individual cards with company badge, date range, and content
- Hover interactions for enhanced user engagement
- Staggered scroll animations for card appearance

**Constraints:**
- Must maintain existing TypeScript interfaces
- Must support i18n (English/Spanish)
- Must work with existing GSAP/ScrollTrigger setup
- Must be accessible (keyboard navigation, screen readers)
- SCSS modules for styling

## Goals / Non-Goals

**Goals:**
- Create visually modern card-based career timeline
- Implement smooth hover effects (scale, glow, elevation)
- Maintain performance with GSAP animations
- Support both company logos and initial badges
- Achieve 100% test coverage using TDD approach
- Responsive design across all breakpoints

**Non-Goals:**
- Not changing the Experience interface structure
- Not modifying content collection schemas (only adding optional fields)
- Not implementing drag-and-drop or reordering functionality
- Not adding filtering/sorting features (can be future enhancement)

## Decisions

### 1. Grid System Architecture
**Decision:** Use CSS Grid with responsive breakpoints

**Rationale:**
- CSS Grid provides clean, predictable layout
- Easy to adjust columns per breakpoint
- Better browser support than alternatives
- Aligns with existing SCSS module approach

**Alternatives Considered:**
- Flexbox: More complex for multi-column responsive layouts
- Third-party grid library: Adds unnecessary dependency

**Implementation:**
```scss
.careerGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
```

### 2. Company Badge Component
**Decision:** Inline badge component within card (not separate component)

**Rationale:**
- Tightly coupled to card layout
- No reuse needed elsewhere in portfolio
- Simpler prop drilling
- Reduces component overhead

**Alternatives Considered:**
- Separate CompanyBadge component: Over-engineering for single-use case
- Image-only: Doesn't handle missing logos gracefully

**Implementation:**
- If `companyLogo` exists: display image
- Else if `companyInitials` exists: display initials in styled badge
- Else: extract first 2 letters of company name

### 3. Animation Strategy
**Decision:** Card-by-card stagger with ScrollTrigger, CSS for hover effects

**Rationale:**
- GSAP for scroll-triggered animations (consistency with existing codebase)
- CSS transitions for hover (better performance, no JS overhead)
- Stagger creates visual rhythm without sequential dependency

**Alternatives Considered:**
- Framer Motion: Adds new dependency, different API
- Pure CSS animations: Limited scroll trigger capabilities
- GSAP for hover: Overkill for simple hover states

**Implementation:**
```typescript
gsap.fromTo(cards,
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    scrollTrigger: {
      trigger: containerRef,
      start: "top 80%"
    }
  }
);
```

### 4. Hover Effects
**Decision:** Multi-layered hover with scale, neutral shadow, and border color shift to cyan

**Rationale:**
- Scale provides tactile feedback
- A neutral drop shadow (not cyan-tinted) adds depth perception without the "glow spilling into darkness" look, which only reads correctly on a dark surface — see [[lighten-home-palette]]'s `career-timeline-visual-theme` capability, which moves this section to a light background
- Border color shift to cyan on hover reinforces brand color without relying on a glow/blur effect
- Combined effect feels premium and interactive on a light card surface

**Implementation:**
```scss
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(17, 17, 17, 0.12);
    border-color: $primary;
  }
}
```

### 5. Testing Strategy (TDD)
**Decision:** Jest + React Testing Library with TDD workflow

**Rationale:**
- Jest is standard in React ecosystem
- RTL promotes accessibility-focused testing
- TDD ensures behavior-driven design
- Catches regressions early

**Test Coverage Areas:**
- Component rendering with various prop combinations
- Responsive grid layout behavior
- Company badge fallback logic (logo → initials → name extraction)
- Accessibility (ARIA labels, keyboard navigation)
- Animation initialization and cleanup

**TDD Workflow:**
1. Write failing test
2. Implement minimum code to pass
3. Refactor
4. Repeat

### 6. Color Scheme
**Decision:** Light theme with cyan/teal (`$primary`) accent borders — superseded from the original dark-theme decision by [[lighten-home-palette]]

**Rationale:**
- The home page was found to read as dark-mode-heavy across three consecutive sections; this component's remaining (mostly unimplemented) styling tasks are redirected to a light theme before more dark-themed work lands, per `lighten-home-palette`'s `career-timeline-visual-theme` capability
- Cyan is repositioned from a text/glow color to a border/accent-only color, since cyan text fails contrast on a light background
- Aligns with the rest of the home page's light surfaces (`Hero`, `AIPassionSection`, `DownloadCv`) — `TechConstellation` remains the sole intentional dark exception
- Still consistent with the existing portfolio color palette — no primary brand colors change, only where they're applied

**Color Palette:**
- Section background: `$surface-light-0` (`#ffffff`)
- Card background: `$surface-light-1` (`#f8f9fa`)
- Border: `$surface-light-border` (`#e2e8f0`), shifting to `$primary` on hover/focus
- Accent: `$primary`/`#22d3ee`-family cyan (borders, tags, highlights only — never text)
- Text Primary: `$text-primary` (`#333333`)
- Text Secondary: `$text-secondary` (`#666666`)

## Risks / Trade-offs

### Risk: Performance with many experiences
**Impact:** Grid with 10+ cards might cause jank during scroll animations

**Mitigation:**
- Lazy load cards outside viewport using IntersectionObserver
- Use `will-change: transform` sparingly
- Debounce scroll events if needed
- Test with performance profiler

### Risk: SCSS module class name changes break styling
**Impact:** Existing pages using this component may lose styles

**Mitigation:**
- This component appears isolated to career/experience sections
- Review all usages before deployment
- Add console warnings if old class names detected
- Document migration in PR description

### Risk: Hover effects don't work on touch devices
**Impact:** Mobile users miss interactive feedback

**Mitigation:**
- Add `:active` state for touch feedback
- Consider touch event handlers for mobile-specific interactions
- Test on physical devices, not just browser emulation

### Risk: Test setup complexity with GSAP mocks
**Impact:** GSAP/ScrollTrigger mocks may be brittle

**Mitigation:**
- Mock GSAP globally in Jest setup
- Focus tests on component logic, not animation details
- Use `jest.fn()` to verify GSAP methods are called correctly
- Document mock patterns for future tests

### Trade-off: Grid vs. Masonry layout
**Decision:** Standard grid (equal row heights)

**Trade-off:**
- Masonry would better accommodate varying content lengths
- BUT: Grid is simpler, more predictable, easier to maintain
- Can revisit if content length variance becomes problematic

### Trade-off: Inline vs. separate badge component
**Decision:** Inline implementation

**Trade-off:**
- Separate component would be more "React-like"
- BUT: No reuse case exists, YAGNI principle applies
- Reduces prop drilling and component complexity

## Migration Plan

**Pre-deployment:**
1. Install Jest and React Testing Library dependencies
2. Create test setup with GSAP mocks
3. Identify all pages using CareerTimeLine component

**Deployment:**
1. Deploy behind feature flag if possible
2. Test on staging across devices
3. Monitor performance metrics
4. Collect user feedback

**Rollback Strategy:**
- Git revert if critical issues found
- Old component code preserved in git history
- No database migrations needed (pure frontend)

## Open Questions

1. **Content migration:** Do existing content files need `companyInitials` added, or rely on automatic extraction?
   - **Recommendation:** Add to new content, auto-extract for existing

2. **Animation timing:** Should stagger delay be configurable via props?
   - **Recommendation:** Start with hardcoded 0.15s, make configurable if requested

3. **Accessibility:** Should cards be focusable with keyboard navigation?
   - **Recommendation:** Yes, add `tabIndex={0}` and focus styles

4. **Logo image optimization:** Should we lazy-load company logos?
   - **Recommendation:** Not initially (small images), revisit if performance issue
