## ADDED Requirements

### Requirement: CareerTimeLine section headings are locale-driven
The CareerTimeLine component SHALL source the "Achievements" and "Technologies" card section headings from props/content rather than hardcoded literal strings, so each locale displays its own translated heading.

#### Scenario: English page shows English headings
- **WHEN** a user views the career timeline on `/en/*`
- **THEN** each experience card's achievements section is headed "Achievements" and the technologies section is headed "Technologies"

#### Scenario: Spanish page shows Spanish headings
- **WHEN** a user views the career timeline on `/es/*`
- **THEN** each experience card's achievements section is headed "Logros" and the technologies section is headed "Tecnologías"

#### Scenario: No hardcoded Spanish literal remains in the component
- **WHEN** the CareerTimeLine component's source is inspected
- **THEN** no literal Spanish string is hardcoded in JSX for these headings; both are read from props
