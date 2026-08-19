## MODIFIED Requirements

### Requirement: Professional experience descriptions are concise
Each professional experience entry SHOULD have a description of 2-3 sentences focusing on role and main responsibility, when narrative source content exists for that role. Entries for which the source CV provides only a period, company, and technology list (no narrative details) SHALL omit the `description` field entirely rather than including a fabricated or filler description.

#### Scenario: Description follows condensed format
- **WHEN** user reads a professional experience entry that has narrative source content
- **THEN** description is 2-3 sentences stating position, primary responsibility, and context

#### Scenario: Verbose implementation details are removed
- **WHEN** comparing new descriptions to old
- **THEN** implementation details are moved to achievement bullets, leaving only role summary in description

#### Scenario: Entries without narrative source content omit description
- **WHEN** an entry's only source information is company, period, and technologies (e.g., CORPBID, Coinimp.com / ABC Hosting)
- **THEN** the entry's `description` field is omitted rather than populated with invented or generic text

### Requirement: Achievement bullets focus on value delivered
Each professional experience entry with narrative source content SHALL have exactly 3 achievement bullets highlighting concrete impact and value delivered. Entries without narrative source content SHALL omit the `achievements` field.

#### Scenario: Achievements are concise and value-focused
- **WHEN** user reads achievement bullets for an entry with narrative source content
- **THEN** each bullet is 1-2 sentences maximum emphasizing measurable impact or capability delivered

#### Scenario: Achievements avoid redundant phrasing
- **WHEN** achievement bullets are displayed
- **THEN** bullets are direct and avoid filler phrases, focusing on "what was achieved" over "what was done"

#### Scenario: Entries without narrative source content omit achievements
- **WHEN** an entry's only source information is company, period, and technologies (e.g., CORPBID, Coinimp.com / ABC Hosting)
- **THEN** the entry's `achievements` field is omitted rather than populated with invented bullets

## ADDED Requirements

### Requirement: CORPBID entry is present in the professional experience timeline
The professional experience timeline SHALL include a CORPBID entry with position "Full Stack Developer" (or its Spanish equivalent), period "Jun 2018 - Sep 2019", and technologies PHP, CodeIgniter, Laravel, MySQL, jQuery, Vue.js, and Polymer Library. No `description` or `achievements` field SHALL be present for this entry.

#### Scenario: CORPBID entry has correct period and technologies
- **WHEN** user views the professional experience timeline
- **THEN** a CORPBID entry appears with period "Jun 2018 - Sep 2019" and the technologies PHP, CodeIgniter, Laravel, MySQL, jQuery, Vue.js, Polymer Library

#### Scenario: CORPBID entry is positioned chronologically
- **WHEN** user views the professional experience timeline in order
- **THEN** CORPBID appears immediately before Coinimp.com / ABC Hosting in reverse-chronological order (CORPBID is more recent)

### Requirement: Coinimp.com / ABC Hosting entry is present in the professional experience timeline
The professional experience timeline SHALL include a "Coinimp.com / ABC Hosting" entry with position "Full Stack Developer" (or its Spanish equivalent), period "Apr 2017 - May 2018" (English) / "Abr 2017 - May 2018" (Spanish), and technologies Python, PHP, jQuery, Vue.js, and Bootstrap. No `description` or `achievements` field SHALL be present for this entry.

#### Scenario: Coinimp.com / ABC Hosting entry has correct period and technologies
- **WHEN** user views the professional experience timeline
- **THEN** a "Coinimp.com / ABC Hosting" entry appears with the correct localized period and the technologies Python, PHP, jQuery, Vue.js, Bootstrap

#### Scenario: Coinimp.com / ABC Hosting is the earliest entry
- **WHEN** user views the professional experience timeline in order
- **THEN** "Coinimp.com / ABC Hosting" is the last (earliest / most historic) entry in the list

### Requirement: KUBO SAS end date is accurate
The KUBO SAS professional experience entry's period SHALL end in "Dec 2020", matching the source CV, replacing any prior "Sep 2020" end date.

#### Scenario: KUBO SAS period reflects corrected end date
- **WHEN** user views the KUBO SAS entry in either the English or Spanish professional experience timeline
- **THEN** the period field ends with "Dec 2020"

### Requirement: Energía y Movilidad entry is present in the professional experience timeline
The professional experience timeline SHALL include an "Energía y Movilidad" entry with position "Software Developer (Part-time)" (or its Spanish equivalent), period "Jun 2016 - Feb 2017", and technologies PHP, WordPress, JavaScript, and jQuery. No `description` or `achievements` field SHALL be present for this entry.

#### Scenario: Energía y Movilidad entry has correct period and technologies
- **WHEN** user views the professional experience timeline
- **THEN** an "Energía y Movilidad" entry appears with period "Jun 2016 - Feb 2017" and the technologies PHP, WordPress, JavaScript, jQuery

#### Scenario: Energía y Movilidad entry is positioned chronologically
- **WHEN** user views the professional experience timeline in order
- **THEN** "Energía y Movilidad" appears immediately after Coinimp.com / ABC Hosting and immediately before PATROCINARTE.NET in reverse-chronological order

### Requirement: PATROCINARTE.NET entry is present in the professional experience timeline
The professional experience timeline SHALL include a "PATROCINARTE.NET" entry with position "Software Developer" (or its Spanish equivalent), period "Jun 2015 - Aug 2016" (English) / "Jun 2015 - Ago 2016" (Spanish), and technologies PHP, JavaScript, and jQuery. No `description` or `achievements` field SHALL be present for this entry.

#### Scenario: PATROCINARTE.NET entry has correct period and technologies
- **WHEN** user views the professional experience timeline
- **THEN** a "PATROCINARTE.NET" entry appears with the correct localized period and the technologies PHP, JavaScript, jQuery

#### Scenario: PATROCINARTE.NET is the earliest entry
- **WHEN** user views the professional experience timeline in order
- **THEN** "PATROCINARTE.NET" is the last (earliest / most historic) entry in the list
