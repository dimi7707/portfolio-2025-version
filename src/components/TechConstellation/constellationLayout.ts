// Hand-placed scatter layout for the desktop constellation view. Deliberately
// NOT grouped by category (jittered grid, shuffled node order) so it reads as
// a star map rather than a spreadsheet — see design.md for why this replaced
// the category-cluster-box layout.
//
// Coordinates are percentages (0-100) of the canvas, matched 1:1 against an
// SVG viewBox="0 0 100 100" with preserveAspectRatio="none" so connector
// lines always land exactly on node centers regardless of canvas size.

export interface Point {
  x: number;
  y: number;
}

// Positions come from a 5-column x 3-row grid (columns at 8/28/50/72/92%,
// rows at 18/50/82%) with small jitter (≤ ±5 points) applied per node, and
// nodes assigned to slots out of category order so it doesn't read as a
// grid. The grid guarantees minimum real-pixel spacing against the canvas
// size in TechConstellation.module.scss ($scatter-canvas-width/-height) —
// jitter stays well inside each cell so no two nodes can collide.
export const NODE_POSITIONS: Record<string, Point> = {
  React: { x: 11, y: 15 },
  Python: { x: 25, y: 22 },
  Docker: { x: 54, y: 14 },
  "Vue.js": { x: 68, y: 23 },
  PostgreSQL: { x: 89, y: 17 },
  TypeScript: { x: 12, y: 47 },
  Testing: { x: 31, y: 54 },
  AWS: { x: 47, y: 46 },
  PHP: { x: 75, y: 53 },
  MongoDB: { x: 88, y: 45 },
  Astro: { x: 11, y: 85 },
  "C#": { x: 25, y: 78 },
  Redis: { x: 53, y: 86 },
  JavaScript: { x: 69, y: 77 },
  MySQL: { x: 91, y: 84 },
};

// Center fallback for a node name with no curated position — keeps it
// visible instead of silently missing from the canvas.
export const DEFAULT_POSITION: Point = { x: 50, y: 50 };

// Deliberately sparse — a few well-placed lines read as a constellation;
// connecting every possible pair reads as clutter. Every node still touches
// at least one line (see constellationLayout.test.ts), but most have just one.
export const CONNECTIONS: [string, string][] = [
  ["React", "TypeScript"],
  ["Python", "AWS"],
  ["Docker", "Vue.js"],
  ["Vue.js", "PostgreSQL"],
  ["AWS", "PHP"],
  ["PHP", "MongoDB"],
  ["Testing", "C#"],
  ["Redis", "MySQL"],
  ["C#", "Astro"],
  ["JavaScript", "MySQL"],
];
