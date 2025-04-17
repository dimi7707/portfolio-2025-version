import styles from "./CareerTimeLine.module.scss";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    company: "Tech Solutions Inc.",
    position: "Senior Frontend Developer",
    period: "2022 - Presente",
    description:
      "Desarrollo de aplicaciones web modernas utilizando React y TypeScript.",
    technologies: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"],
    achievements: [
      "Lideré la migración de la aplicación principal a Next.js",
      "Implementé un sistema de diseño reutilizable",
      "Optimicé el rendimiento de la aplicación en un 40%",
    ],
  },
  {
    company: "Digital Innovations",
    position: "Frontend Developer",
    period: "2020 - 2022",
    description:
      "Desarrollo de interfaces de usuario y componentes reutilizables.",
    technologies: ["React", "JavaScript", "SASS", "Redux"],
    achievements: [
      "Desarrollé un sistema de autenticación robusto",
      "Implementé pruebas unitarias con Jest",
      "Colaboré en el diseño de la arquitectura frontend",
    ],
  },
  {
    company: "Web Masters",
    position: "Junior Developer",
    period: "2018 - 2020",
    description: "Desarrollo de sitios web y aplicaciones web básicas.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
    achievements: [
      "Desarrollé 10+ sitios web para clientes",
      "Implementé diseños responsivos",
      "Optimicé el SEO de los sitios web",
    ],
  },
];

const CareerTimeLine = () => {
  return (
    <div className={styles.timelineContainer}>
      <h2 className={styles.title}>Experiencia Laboral</h2>
      <div className={styles.timeline}>
        {experiences.map((exp, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3 className={styles.company}>{exp.company}</h3>
              <h4 className={styles.position}>{exp.position}</h4>
              <span className={styles.period}>{exp.period}</span>
              <p className={styles.description}>{exp.description}</p>

              <div className={styles.technologies}>
                <h5>Tecnologías:</h5>
                <div className={styles.techTags}>
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.achievements}>
                <h5>Logros:</h5>
                <ul>
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTimeLine;
