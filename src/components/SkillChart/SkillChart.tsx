import styles from "./SkillChart.module.scss";
import { useState } from "react";

interface SkillData {
  name: string;
  percentage: number;
  description: string;
  position: "left" | "right" | "top" | "bottom";
  color: string;
}

const skills: SkillData[] = [
  {
    name: "Frontend",
    percentage: 40,
    description:
      "Desarrollo de interfaces de usuario con React, TypeScript y CSS moderno",
    position: "left",
    color: "#808080",
  },
  {
    name: "Backend",
    percentage: 20,
    description: "Desarrollo de APIs y servicios con Node.js y bases de datos",
    position: "right",
    color: "#606060",
  },
  {
    name: "DevOps",
    percentage: 20,
    description: "Gestión de infraestructura y despliegue continuo",
    position: "top",
    color: "#404040",
  },
  {
    name: "Testing",
    percentage: 20,
    description: "Desarrollo de pruebas unitarias y de integración",
    position: "bottom",
    color: "#202020",
  },
];

const SkillChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const radius = 150;
  const center = { x: radius, y: radius };
  const gap = 8;
  let currentAngle = 0;

  const calculatePath = (percentage: number, index: number) => {
    const totalGap = gap * (skills.length - 1);
    const availableAngle = 360 - totalGap;
    const angle = (percentage / 100) * availableAngle;

    const startAngle = currentAngle + (index > 0 ? gap : 0);
    const endAngle = startAngle + angle;
    currentAngle = endAngle;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = center.x + radius * Math.cos(startRadians);
    const y1 = center.y + radius * Math.sin(startRadians);
    const x2 = center.x + radius * Math.cos(endRadians);
    const y2 = center.y + radius * Math.sin(endRadians);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${center.x} ${center.y} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const calculateTextPosition = (index: number) => {
    const angle =
      (currentAngle - skills[index].percentage / 2) * (Math.PI / 180);
    const distance = radius * 0.5;
    return {
      x: center.x + distance * Math.cos(angle),
      y: center.y + distance * Math.sin(angle),
    };
  };

  return (
    <div className={styles.skillChart}>
      <div className={styles.chartContainer}>
        <svg width={radius * 2} height={radius * 2} className={styles.pieChart}>
          {skills.map((skill, index) => {
            const textPos = calculateTextPosition(index);
            return (
              <g
                key={skill.name}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`${styles.segment} ${hoveredSegment === index ? styles.hovered : ""}`}
              >
                <path
                  d={calculatePath(skill.percentage, index)}
                  fill={skill.color}
                  className={styles.pieSegment}
                />
                {hoveredSegment === index && (
                  <g className={styles.percentageContainer}>
                    <rect
                      x={textPos.x - 30}
                      y={textPos.y - 15}
                      width={60}
                      height={30}
                      rx={15}
                      fill="white"
                      className={styles.percentageBackground}
                    />
                    <text
                      x={textPos.x}
                      y={textPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={styles.percentageText}
                    >
                      {skill.percentage}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
          {skills.map((_, index) => {
            if (index === 0) return null;
            const angle = (currentAngle - gap) * (Math.PI / 180);
            const x1 = center.x;
            const y1 = center.y;
            const x2 = center.x + radius * Math.cos(angle);
            const y2 = center.y + radius * Math.sin(angle);
            return (
              <line
                key={`separator-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="2"
                className={styles.separator}
              />
            );
          })}
        </svg>
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`${styles.description} ${styles[skill.position]} ${
              hoveredSegment === skills.indexOf(skill)
                ? styles.hoveredDescription
                : ""
            }`}
          >
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillChart;
