## ADDED Requirements

### Requirement: Experience type allows description and achievements to be omitted
The `Experience` type and `careerTimeLineSchema` SHALL treat `description` and `achievements` as optional fields, so an experience entry can be defined with only `company`, `position`, `period`, and `technologies`.

#### Scenario: Schema accepts an experience without description or achievements
- **WHEN** a `careerTimeLine.experiences` entry in content omits `description` and `achievements`
- **THEN** content validation succeeds and the entry is accepted by `careerTimeLineSchema`

#### Scenario: Component accepts an Experience prop without description or achievements
- **WHEN** `CareerTimeLine` receives an `Experience` object with no `description` and no `achievements`
- **THEN** the component renders without runtime errors

### Requirement: Compact card detection
The `CareerTimeLine` component SHALL treat an experience as "compact" when its `description` is absent or empty, independent of any explicit content flag.

#### Scenario: Experience with description renders as a full card
- **WHEN** an experience has a non-empty `description`
- **THEN** it renders as a full card showing description and achievements sections (when achievements are present)

#### Scenario: Experience without description renders as a compact card
- **WHEN** an experience has no `description` (undefined or empty string)
- **THEN** it renders as a compact card without a description section

### Requirement: Compact card content
A compact card SHALL display the company badge, company name, position, period, and technology tags. It SHALL NOT render a description section or an achievements section.

#### Scenario: Compact card omits description block
- **WHEN** a compact card is rendered
- **THEN** no description `<p>` elements are present for that card

#### Scenario: Compact card omits achievements block
- **WHEN** a compact card is rendered
- **THEN** no achievements heading or list is present for that card

#### Scenario: Compact card still shows technologies
- **WHEN** a compact card is rendered and the experience has a non-empty `technologies` array
- **THEN** the technology tags are displayed exactly as in a full card

### Requirement: Pairing of consecutive compact experiences into one grid slot
When two consecutive experiences in the `experiences` array are both compact, the `CareerTimeLine` component SHALL render them together inside a single grid slot (occupying the space of one regular card), instead of each occupying its own grid slot.

#### Scenario: Two consecutive compact experiences share one slot
- **WHEN** `experiences` contains two adjacent entries that both lack a `description`
- **THEN** both entries render as compact cards nested inside one shared grid-slot container, and that container occupies one cell of `.careerGrid`

#### Scenario: Pairing does not alter full-card entries
- **WHEN** `experiences` contains a mix of full (described) and compact entries
- **THEN** every full entry continues to render as its own full card in its own grid slot, unaffected by any compact pairing elsewhere in the list

#### Scenario: Grouping is order-preserving
- **WHEN** `experiences` is grouped into render slots
- **THEN** the overall visual order of companies matches the original array order (no reordering across slots)

### Requirement: Standalone rendering of an unpaired compact experience
When a compact experience has no adjacent compact experience to pair with (previous and next entries are either full, absent, or already consumed by a prior pairing), the `CareerTimeLine` component SHALL render it alone as a single compact card occupying its own grid slot.

#### Scenario: Compact experience surrounded by full experiences renders alone
- **WHEN** a compact experience is preceded and followed by full (described) experiences
- **THEN** it renders as a single compact card in its own grid slot, not paired with any other card

#### Scenario: Odd number of consecutive compact experiences leaves one unpaired
- **WHEN** three consecutive experiences are all compact
- **THEN** the first two are paired into one slot and the third renders alone in its own compact-card slot

### Requirement: Accessibility parity between full and compact cards
Compact cards SHALL preserve the same accessibility semantics as full cards.

#### Scenario: Compact card is keyboard-focusable
- **WHEN** a compact card is rendered
- **THEN** it has `role="article"` and is reachable via `tabIndex={0}` keyboard navigation, identical to a full card

#### Scenario: Compact card badge has matching alt text
- **WHEN** a compact card displays a company logo
- **THEN** the image `alt` text follows the same "Logo de {companyName}" pattern used by full cards
