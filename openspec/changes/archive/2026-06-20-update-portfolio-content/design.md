## Context

The portfolio uses Astro content collections for i18n, with separate markdown files for English (`src/content/en/home/home.md`) and Spanish (`src/content/es/home/home.md`). These files use YAML frontmatter with a defined structure consumed by multiple React components (Hero, CareerTimeLine, AIPassion, etc.). The content must be updated to better reflect current market positioning while maintaining exact frontmatter structure compatibility.

## Goals / Non-Goals

**Goals:**
- Rewrite hero description to emphasize 11 years experience, AI-driven workflow, and AWS expertise
- Add Cafeto Software - Apptega as current role with focus on reporting module ownership
- Condense each professional experience entry to 2-3 line descriptions + 3 concise achievement bullets
- Maintain parallel quality between English and Spanish versions
- Preserve exact frontmatter structure for component compatibility

**Non-Goals:**
- Modifying component logic or schemas in `src/schemas/`
- Changing frontmatter structure or field names
- Updating AI Passion section or tech stack content
- Creating new sections beyond what exists

## Decisions

**Decision 1: Direct content replacement vs migration**
- **Chosen**: Direct replacement of markdown files
- **Rationale**: No schema changes needed, zero component modifications, immediate deployment
- **Alternative**: Create new schema version - rejected due to unnecessary complexity

**Decision 2: Experience description format**
- **Chosen**: 2-3 sentence role summary + 3 bullet achievements + technology list
- **Rationale**: Scannable by recruiters, highlights impact over responsibilities, maintains existing tech field
- **Alternative**: Paragraph format - rejected due to poor scannability

**Decision 3: New role positioning**
- **Chosen**: Add Cafeto Software - Apptega as first entry (most recent)
- **Rationale**: Standard chronological reverse order, highlights current cutting-edge work
- **Context**: Cafeto Software is the contracting company providing services to Apptega
- **Focus areas**: Reporting module ownership and project leadership, heavy AI workflow integration (Claude/Cursor), Spec-Driven Development approach, AWS services (SQS, S3, Bedrock, IAM, ECS, EC2)
- **Technology stack**: Python, Node.js, PHP, React, TypeScript, AWS, Docker
- **Company logo**: Use generic placeholder ("/images/generic-company-logo.png") as logos will be redesigned in future iteration

**Decision 4: Hero description length**
- **Chosen**: 3-4 sentences maximum, keyword-dense
- **Rationale**: Above-the-fold real estate is premium, must hook immediately with market-relevant skills
- **Keywords to emphasize**: Full Stack, 11 years, AI integration, Spec-Driven Development, team leadership, AWS

## Risks / Trade-offs

**Risk**: Over-condensing experience descriptions may lose context
→ **Mitigation**: Achievement bullets provide concrete impact evidence, tech lists show breadth

**Risk**: English/Spanish versions may drift in quality or emphasis
→ **Mitigation**: Create both versions in same pass, ensure parallel structure and tone

**Trade-off**: Removing detailed project context for brevity
→ **Accepted**: Market scans portfolios quickly; detailed stories better suited for interviews
