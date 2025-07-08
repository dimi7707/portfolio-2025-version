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
import { useLanguage } from "../../hooks/useLanguage";

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

const messages = {
  es: {
    title: "¡En construcción!",
    description:
      "Esta sección de la página estará disponible muy pronto.<br />¡Gracias por tu paciencia!",
    signature: "— Dimitri Avila",
  },
  en: {
    title: "Under construction!",
    description:
      "This section of the page will be available very soon.<br />Thank you for your patience!",
    signature: "— Dimitri Avila",
  },
};

const SkillChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [chartHeight, setChartHeight] = useState(350);
  const { language } = useLanguage();

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
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)",
        fontFamily:
          "'Space Grotesk', 'Meedori Sans', 'Segoe UI', Arial, sans-serif",
        color: "#1e293b",
        borderRadius: "2rem",
        margin: "2rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "1.5rem" }}
      >
        <circle cx="60" cy="60" r="60" fill="#60a5fa" fillOpacity="0.15" />
        <path d="M40 80 L60 40 L80 80 Z" fill="#3b82f6" opacity="0.7" />
        <rect x="55" y="85" width="10" height="10" rx="2" fill="#3b82f6" />
      </svg>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          letterSpacing: "-1px",
          marginBottom: "0.5rem",
        }}
      >
        {messages[language].title}
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          color: "#64748b",
          maxWidth: "420px",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
        dangerouslySetInnerHTML={{ __html: messages[language].description }}
      />
      <span
        style={{
          fontSize: "0.95rem",
          color: "#3b82f6",
          fontWeight: 500,
          letterSpacing: "0.5px",
        }}
      >
        {messages[language].signature}
      </span>
    </section>
  );
};

export default SkillChart;
