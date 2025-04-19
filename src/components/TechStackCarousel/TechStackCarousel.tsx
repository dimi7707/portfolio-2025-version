import { useEffect, useState } from "react";
import styles from "./TechStackCarousel.module.scss";

const techIcons = [
  "mongodb.svg",
  "next.js.svg",
  "mysql.svg",
  "express.svg",
  "graphql.svg",
  "typescript.svg",
  "php.svg",
  "mui.svg",
  "angular.svg",
  "sql.svg",
  "tailwindcss.svg",
  "react.svg",
  "javascript.svg",
  "astro.svg",
  "vue.js.svg",
];

const formatTechName = (filename: string) => {
  return filename
    .replace(".svg", "")
    .replace(".js", "")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export default function TechStackCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const duplicatedIcons = [...techIcons, ...techIcons];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= techIcons.length) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mi Tech Stack</h2>
      <div className={styles.carouselContainer}>
        <div
          className={styles.carousel}
          style={{
            transform: `translateX(-${currentIndex * 100}px)`,
            transition:
              currentIndex === 0 ? "none" : "transform 0.5s ease-in-out",
          }}
        >
          {duplicatedIcons.map((icon, index) => (
            <div
              key={index}
              className={styles.slide}
              onMouseEnter={() => setHoveredTech(icon)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <img
                src={`/tech-icons/${icon}`}
                alt={icon.replace(".svg", "")}
                className={styles.techIcon}
              />
              {hoveredTech === icon && (
                <div className={styles.tooltip}>{formatTechName(icon)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
