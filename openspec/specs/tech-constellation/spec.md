# Capability: Tech Constellation

## Purpose

This capability replaces the auto-scrolling TechStackCarousel on the home page with a TechConstellation component: a data-driven, content-collection-backed display of 15 technology nodes rendered with react-icons in the site's fixed cyan identity color. It defines the node set, content-driven sourcing, icon and hover behavior, and the distinct desktop (scattered star-map with sparse connectors) and mobile (two-column grid) layouts.

## Requirements

### Requirement: TechConstellation replaces TechStackCarousel on the home page
The home page SHALL render a `TechConstellation` component in place of `TechStackCarousel`, and the carousel component SHALL be removed from the codebase.

#### Scenario: Home page renders the constellation, not the carousel
- **WHEN** a user visits `/en/` or `/es/`
- **THEN** the tech showcase section renders `TechConstellation` and no auto-scrolling carousel is present

#### Scenario: Carousel component no longer exists
- **WHEN** the codebase is searched for `TechStackCarousel`
- **THEN** no component file, style file, schema, or import remains anywhere in `src/` or `public/`

### Requirement: TechConstellation displays exactly 15 technology nodes
The TechConstellation component SHALL render 15 nodes, each showing an icon and a name, covering: Python, PHP, JavaScript, TypeScript, C#, Docker, AWS, React, Vue.js, Astro, PostgreSQL, MySQL, Redis, MongoDB, and one combined "Testing" node representing Jest, Cypress, and PHPUnit.

#### Scenario: All 15 nodes render with name and icon
- **WHEN** TechConstellation is rendered
- **THEN** 15 distinct nodes are present, each displaying a technology name and an icon, including one "Testing" node covering Jest, Cypress, and PHPUnit

### Requirement: TechConstellation content is data-driven
The TechConstellation component SHALL source its title, subtitle, and node list (name + category) from the Astro content collection, validated by a Zod schema, rather than hardcoding the node list in the component.

#### Scenario: Node list comes from content collection
- **WHEN** the `techConstellation` content block in `home.md` is edited to add, remove, or reorder a node
- **THEN** the rendered component reflects that change without any code change to the component itself

### Requirement: TechConstellation icons are sourced exclusively from react-icons
All 15 node icons SHALL be rendered using `react-icons` components. No static SVG image assets SHALL be used for node icons.

#### Scenario: No static SVG icon files are referenced
- **WHEN** the TechConstellation component's source is inspected
- **THEN** no `<img>` tag or SVG file path is used for any node icon; every icon is a `react-icons` component

### Requirement: TechConstellation node icons render in a fixed cyan color
Every node icon SHALL render in the site's primary cyan color at all times, with no alternate resting color.

#### Scenario: Icon color is cyan in the default state
- **WHEN** a TechConstellation node is rendered without interaction
- **THEN** its icon is displayed in the site's primary cyan color

### Requirement: Hovering a node intensifies its glow without changing color or position
On hover, a TechConstellation node SHALL show a stronger cyan glow effect. Hover SHALL NOT change the icon's color/hue, scale, or position.

#### Scenario: Hover increases glow intensity only
- **WHEN** a user hovers over a TechConstellation node
- **THEN** the node's glow effect becomes more intense/prominent, while the icon's color remains the same fixed cyan and the node's size and position remain unchanged

### Requirement: Desktop layout scatters nodes in a star-map pattern with sparse connectors
On desktop viewports, TechConstellation SHALL position nodes at hand-placed, non-aligned coordinates (not grouped or visually boxed by category) and SHALL render a sparse set of dashed SVG connector lines between selected node pairs, evoking a constellation/star-map aesthetic. Node positions SHALL maintain enough spacing that no two nodes visually overlap.

#### Scenario: Nodes are scattered, not grouped by category
- **WHEN** TechConstellation is viewed on a desktop viewport
- **THEN** nodes are positioned at varied, non-row-aligned coordinates with no visible grouping by category, and none of the node cards overlap

#### Scenario: Connector lines are sparse, not fully connected
- **WHEN** TechConstellation is viewed on a desktop viewport
- **THEN** dashed connector lines join a curated subset of node pairs rather than connecting every node to every other node in its category

### Requirement: Mobile layout renders nodes as a two-column grid
On mobile viewports, TechConstellation SHALL render all nodes in a two-column grid of smaller cards, ordered by category, to reduce scroll length compared to a single-column layout.

#### Scenario: Nodes render two per row on narrow viewports
- **WHEN** TechConstellation is viewed on a mobile-width viewport
- **THEN** nodes are displayed two per row in a grid, each showing a smaller icon and name than the desktop view
