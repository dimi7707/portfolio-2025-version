import React from "react";
import styles from "./TechConstellation.module.scss";
import { getIconForTech } from "./iconMap";
import type { TechConstellationNode } from "./types";

interface TechConstellationProps {
  title: string;
  subtitle: string;
  nodes: TechConstellationNode[];
}

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

const TechConstellation = ({ title, subtitle, nodes }: TechConstellationProps) => {
  return (
    <section className={styles.techConstellation}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.nodes}>{nodes.map(renderNode)}</div>
    </section>
  );
};

export default TechConstellation;
