## ADDED Requirements

### Requirement: Hover Transform Effects
Cards SHALL respond to hover interactions with visual transform effects.

#### Scenario: Hover scale effect
- **WHEN** user hovers over card
- **THEN** card scales to 1.02 (2% larger)

#### Scenario: Hover lift effect
- **WHEN** user hovers over card
- **THEN** card translates upward by 8px (translateY(-8px))

#### Scenario: Combined transform
- **WHEN** user hovers over card
- **THEN** both scale and translateY effects apply simultaneously

#### Scenario: Hover exit
- **WHEN** user stops hovering over card
- **THEN** card returns to original scale and position

### Requirement: Hover Shadow Effects
Cards SHALL display enhanced shadows on hover to create depth perception.

#### Scenario: Default shadow
- **WHEN** card is not hovered
- **THEN** card has subtle default shadow

#### Scenario: Hover shadow enhancement
- **WHEN** user hovers over card
- **THEN** card displays larger shadow with cyan tint (rgba(34, 211, 238, 0.2))

#### Scenario: Shadow blur and spread
- **WHEN** hover shadow activates
- **THEN** shadow has 20px vertical offset and 40px blur radius

### Requirement: Hover Border Glow
Cards SHALL display border glow effect on hover using brand accent color.

#### Scenario: Default border
- **WHEN** card is not hovered
- **THEN** card has subtle gray border (#1f2630)

#### Scenario: Hover border color
- **WHEN** user hovers over card
- **THEN** border color transitions to cyan with 60% opacity (rgba(34, 211, 238, 0.6))

#### Scenario: Border transition
- **WHEN** hover state changes
- **THEN** border color transitions smoothly over 0.3s

### Requirement: Animation Timing
All hover effects SHALL use consistent timing and easing.

#### Scenario: Transition duration
- **WHEN** hover state changes (enter or exit)
- **THEN** all transitions complete in 0.3s

#### Scenario: Easing function
- **WHEN** hover transitions run
- **THEN** transitions use cubic-bezier(0.4, 0, 0.2, 1) easing

#### Scenario: Simultaneous effects
- **WHEN** user hovers over card
- **THEN** transform, shadow, and border all transition together

### Requirement: Touch Device Support
Hover effects SHALL have touch-friendly alternatives for mobile devices.

#### Scenario: Active state on touch
- **WHEN** user taps card on touch device
- **THEN** card shows :active state with similar visual feedback

#### Scenario: Touch state persistence
- **WHEN** card is tapped on touch device
- **THEN** active state clears when touch ends

#### Scenario: No hover on touch
- **WHEN** device supports touch
- **THEN** hover effects do not interfere with scrolling or tapping

### Requirement: Performance Optimization
Hover animations SHALL perform smoothly without janking.

#### Scenario: GPU acceleration
- **WHEN** hover transition runs
- **THEN** transform properties trigger GPU acceleration

#### Scenario: Reflow prevention
- **WHEN** card hovers
- **THEN** layout does not reflow (only transform/shadow/border change)

#### Scenario: Will-change optimization
- **WHEN** card is interactive
- **THEN** CSS will-change hint is applied only when needed
