## ADDED Requirements

### Requirement: Hero section emphasizes 11 years experience and AI integration
The hero description SHALL highlight 11 years of Full Stack development experience, active AI tool integration in workflow, and AWS expertise.

#### Scenario: Hero content includes key differentiators
- **WHEN** user views the hero section
- **THEN** description mentions 11 years of experience, AI integration (Spec-Driven Development with AI agents), team leadership background, and AWS interest

#### Scenario: Hero maintains professional and concise tone
- **WHEN** hero description is displayed
- **THEN** content is 3-4 sentences maximum, keyword-dense, and market-aligned

### Requirement: Current position at Cafeto Software - Apptega is listed first
The professional experience timeline SHALL include Cafeto Software - Apptega as the most recent entry with Full Stack Developer role starting August 2025, clarifying that Cafeto Software is the contracting company providing services to Apptega.

#### Scenario: Cafeto Software entry includes reporting module focus
- **WHEN** user views professional experience
- **THEN** Cafeto Software entry shows responsibility for reporting module development and project leadership at Apptega

#### Scenario: Cafeto Software entry highlights AI and AWS usage
- **WHEN** user views Cafeto Software description
- **THEN** entry mentions heavy AI integration in workflow (Claude, Cursor), Spec-Driven Development approach, and AWS services usage (SQS, S3, Bedrock, IAM, ECS, EC2)

#### Scenario: Cafeto Software technology stack is accurate
- **WHEN** user views Cafeto Software technologies array
- **THEN** technologies list includes Python, Node.js, PHP, React, TypeScript, AWS, Docker

#### Scenario: Cafeto Software appears before Inchcape chronologically
- **WHEN** user views career timeline
- **THEN** Cafeto Software - Apptega is listed first (most recent) followed by Inchcape and earlier positions

### Requirement: Cafeto Software has a generic company logo
The Cafeto Software - Apptega entry SHALL include a placeholder/generic company logo path in the `companyLogo` field for visual consistency with other entries.

#### Scenario: Generic logo is used as placeholder
- **WHEN** Cafeto Software entry is created
- **THEN** companyLogo field contains a path to a generic placeholder image (e.g., "/images/generic-company-logo.png")

#### Scenario: Logo maintains consistency with existing entries
- **WHEN** comparing logo implementation across all companies
- **THEN** Cafeto Software logo format matches the pattern used by other entries

### Requirement: Professional experience descriptions are concise
Each professional experience entry SHALL have a description of 2-3 sentences focusing on role and main responsibility.

#### Scenario: Description follows condensed format
- **WHEN** user reads a professional experience entry
- **THEN** description is 2-3 sentences stating position, primary responsibility, and context

#### Scenario: Verbose implementation details are removed
- **WHEN** comparing new descriptions to old
- **THEN** implementation details are moved to achievement bullets, leaving only role summary in description

### Requirement: Achievement bullets focus on value delivered
Each professional experience entry SHALL have exactly 3 achievement bullets highlighting concrete impact and value delivered.

#### Scenario: Achievements are concise and value-focused
- **WHEN** user reads achievement bullets
- **THEN** each bullet is 1-2 sentences maximum emphasizing measurable impact or capability delivered

#### Scenario: Achievements avoid redundant phrasing
- **WHEN** achievement bullets are displayed
- **THEN** bullets are direct and avoid filler phrases, focusing on "what was achieved" over "what was done"

### Requirement: Technology lists are preserved for existing roles
Professional experience entries for Inchcape, Sophos Solutions, Aplyca, and KUBO SHALL maintain the existing array of technologies, unchanged from current content. Cafeto Software SHALL use the new technology stack.

#### Scenario: Existing technology arrays remain intact
- **WHEN** professional experience is updated for Inchcape, Sophos, Aplyca, and KUBO
- **THEN** the `technologies` field for each entry remains identical to current values

#### Scenario: Cafeto Software uses new technology stack
- **WHEN** Cafeto Software entry is created
- **THEN** technologies array includes: Python, Node.js, PHP, React, TypeScript, AWS, Docker

### Requirement: Content exists in both English and Spanish
All hero and professional experience updates SHALL be reflected in both `src/content/en/home/home.md` and `src/content/es/home/home.md` with equivalent quality.

#### Scenario: English and Spanish versions have parallel structure
- **WHEN** comparing English and Spanish markdown files
- **THEN** both have identical frontmatter structure with localized content of equivalent professional quality

#### Scenario: Spanish translation maintains professional tone
- **WHEN** Spanish content is reviewed
- **THEN** language is professional, market-aligned, and naturally written (not machine-translated verbatim)

### Requirement: Frontmatter structure is preserved
The markdown files SHALL maintain exact frontmatter structure including all existing sections (hero, aiPassion, techStackCarousel, careerTimeLine, downloadCv) with no schema changes.

#### Scenario: All existing sections remain present
- **WHEN** updated markdown is parsed by Astro
- **THEN** all original sections (hero, aiPassion, techStackCarousel, careerTimeLine, downloadCv) exist with unchanged field names

#### Scenario: Components consume content without modification
- **WHEN** React components fetch content from updated markdown
- **THEN** no component code changes are required for compatibility
