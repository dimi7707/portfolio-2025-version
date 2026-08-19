import React, { useMemo } from "react";
import styles from "./TechConstellation.module.scss";
import { getIconForTech } from "./iconMap";
import { groupByCategory } from "./groupByCategory";
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

const CATEGORY_LABELS: Record<TechConstellationCategory, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  data: "Data",
  infra: "Infra / Cloud",
  testing: "QA & Testing",
};

// Single place node markup is built — both the desktop cluster layout and
// the mobile chain layout call this instead of duplicating node JSX.
const renderNode = (node: TechConstellationNode) => {
  const Icon = getIconForTech(node.name);
  return (
    <div key={node.name} className={styles.node} tabIndex={0}>
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

      {/* Desktop: nodes grouped into category clusters, connected within
          each cluster by dashed lines. */}
      <div className={styles.clusters}>
        {CATEGORY_ORDER.filter((category) => grouped[category].length > 0).map(
          (category) => (
            <div key={category} className={styles.cluster}>
              <span className={styles.clusterLabel}>
                {CATEGORY_LABELS[category]}
              </span>
              <div className={styles.clusterNodes}>
                {grouped[category].map(renderNode)}
              </div>
            </div>
          ),
        )}
      </div>

      {/* Mobile: single vertical chain, ordered by category. */}
      <div className={styles.mobileChain}>
        {CATEGORY_ORDER.flatMap((category) => grouped[category]).map(
          renderNode,
        )}
      </div>
    </section>
  );
};

export default TechConstellation;
