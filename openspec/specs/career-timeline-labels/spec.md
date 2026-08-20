# Capability: Career Timeline Labels

## Purpose

This capability ensures the CareerTimeLine component's card section headings ("Achievements"/"Technologies") are sourced from locale-aware content rather than hardcoded strings, so the English and Spanish versions of the home page each display correctly translated headings without any literal-string leakage from one locale into the other.

## Requirements

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
