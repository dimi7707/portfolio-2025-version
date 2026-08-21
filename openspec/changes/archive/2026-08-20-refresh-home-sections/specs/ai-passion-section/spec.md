## ADDED Requirements

### Requirement: AIPassionSection presents 2026 AI-native positioning copy
The AIPassionSection component SHALL display a title and description reflecting an "AI-native development" positioning — orchestrating AI tools/agents with engineering judgment — rather than generic "passion for AI" messaging.

#### Scenario: English content reflects AI-native orchestration
- **WHEN** a user views AIPassionSection on `/en/*`
- **THEN** the title reads "AI-Native Development" and the description communicates orchestrating AI tools/agents (naming Claude Code, Cursor AI, MCP integrations, Warp Terminal) with the same rigor and ownership as any other engineering decision

#### Scenario: Spanish content is a natural translation, not literal
- **WHEN** a user views AIPassionSection on `/es/*`
- **THEN** the title and description convey the same AI-native orchestration positioning as the English version, phrased naturally in Spanish rather than word-for-word translated

### Requirement: AIPassionSection no longer exposes a tools list
The AIPassionSection component SHALL NOT accept or render a `tools` list prop.

#### Scenario: Component renders without a tools prop
- **WHEN** AIPassionSection is rendered with only `title` and `description`
- **THEN** the component renders successfully with no reference to a `tools` prop or array

### Requirement: AIPassionSection visual palette matches the site's identity colors
The AIPassionSection component SHALL use the site's cyan/blue identity palette (anchored on `$primary`/neon-cyan and neon-blue accents) for its title gradient, particle, and network-node styling, instead of the previous generic blue/purple/red AI gradient.

#### Scenario: Title gradient uses identity cyan/blue tones
- **WHEN** AIPassionSection is rendered
- **THEN** the title's gradient and accent colors are drawn from the site's cyan/blue identity tokens, with no purple or red tones present
