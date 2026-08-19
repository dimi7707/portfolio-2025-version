import React, { useMemo } from "react";
import styles from "./TechConstellation.module.scss";
import { getIconForTech } from "./iconMap";
import { groupByCategory } from "./groupByCategory";
import {
  NODE_POSITIONS,
  DEFAULT_POSITION,
  CONNECTIONS,
} from "./constellationLayout";
import type { TechConstellationCategory, TechConstellationNode } from "./types";

interface TechConstellationProps {
  title: string;
  subtitle: string;
  nodes: TechConstellationNode[];
}

const CATEGORY_ORDER: TechConstellationCategory[] = [
  "languages",
  "frameworks",
  "data",
  "infra",
  "testing",
];

// Single place node markup is built — both the desktop scatter canvas and
// the mobile chain layout call this instead of duplicating node JSX.
const renderNode = (
  node: TechConstellationNode,
  style?: React.CSSProperties,
) => {
  const Icon = getIconForTech(node.name);
  return (
    <div key={node.name} className={styles.node} style={style} tabIndex={0}>
      <Icon className={styles.nodeIcon} aria-hidden="true" />
      <span className={styles.nodeName}>{node.name}</span>
      {node.note && <span className={styles.nodeNote}>{node.note}</span>}
    </div>
  );
};

const TechConstellation = ({
  title,
  subtitle,
  nodes,
}: TechConstellationProps) => {
  // `nodes` is static per page render (sourced from content collections),
  // so avoid recomputing the grouping on every re-render.
  const grouped = useMemo(() => groupByCategory(nodes), [nodes]);

  return (
    <section className={styles.techConstellation}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Desktop: nodes scattered across a hand-placed star-map layout,
          connected by dashed lines — deliberately not grouped by category. */}
      <div className={styles.scatterCanvas}>
        <svg
          className={styles.scatterSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {CONNECTIONS.map(([from, to]) => {
            const a = NODE_POSITIONS[from];
            const b = NODE_POSITIONS[to];
            if (!a || !b) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={styles.connectorLine}
              />
            );
          })}
        </svg>
        {nodes.map((node) => {
          const position = NODE_POSITIONS[node.name] ?? DEFAULT_POSITION;
          return renderNode(node, {
            left: `${position.x}%`,
            top: `${position.y}%`,
          });
        })}
      </div>

      {/* Mobile: two-column grid, ordered by category. */}
      <div className={styles.mobileChain}>
        {CATEGORY_ORDER.flatMap((category) => grouped[category]).map((node) =>
          renderNode(node),
        )}
      </div>
    </section>
  );
};

export default TechConstellation;
