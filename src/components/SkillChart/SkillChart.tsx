import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./SkillChart.module.scss";

interface SkillData {
  name: string;
  value: number;
  description: string;
  color: string;
}

const skills: SkillData[] = [
  {
    name: "Frontend",
    value: 40,
    description:
      "Desarrollo de interfaces de usuario con React, TypeScript y CSS moderno",
    color: "#4A90E2",
  },
  {
    name: "Backend",
    value: 20,
    description: "Desarrollo de APIs y servicios con Node.js y bases de datos",
    color: "#50E3C2",
  },
  {
    name: "DevOps",
    value: 20,
    description: "Gestión de infraestructura y despliegue continuo",
    color: "#F5A623",
  },
  {
    name: "Testing",
    value: 20,
    description: "Desarrollo de pruebas unitarias y de integración",
    color: "#D0021B",
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <span className={styles.percentage}>{data.value}%</span>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className={styles.legend}>
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: entry.color }}
          />
          <span className={styles.legendText}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const SkillChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [chartHeight, setChartHeight] = useState(350);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setChartHeight(mobile ? 280 : 350);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className={styles.skillChartContainer}>
      <h1 className={styles.title}>Mi perfil de habilidades</h1>
      <div className={styles.contentWrapper}>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart
              margin={{
                top: isMobile ? 45 : 30,
                right: 20,
                bottom: isMobile ? 35 : 30,
                left: 20,
              }}
            >
              <Pie
                data={skills}
                cx="50%"
                cy={isMobile ? "50%" : "45%"}
                innerRadius={isMobile ? 45 : 60}
                outerRadius={isMobile ? 75 : 100}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
                animationBegin={0}
              >
                {skills.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className={styles.pieSegment}
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ outline: "none" }}
              />
              <Legend
                content={<CustomLegend />}
                verticalAlign="top"
                align="center"
                layout="horizontal"
                wrapperStyle={
                  isMobile
                    ? { paddingTop: "0px" }
                    : { paddingBottom: "20px", paddingTop: "10px" }
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {/* Placeholder para futura imagen */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillChart;
