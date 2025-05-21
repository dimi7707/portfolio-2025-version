import styles from "./CareerTimeLine.module.scss";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
}

interface Experiences {
  experiences: Experience[];
}

const CareerTimeLine = ({ experiences }: Experiences) => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineWrapper}>
        <h2 className={styles.title}>Experiencia Laboral</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineMarker}>
                <span className={styles.timelineDate}>{exp.period}</span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.companyHeader}>
                  <div className={styles.companyLogo}>
                    <img
                      src={
                        exp.companyLogo ||
                        "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                      }
                      alt={`Logo de ${exp.company}`}
                    />
                  </div>
                  <div className={styles.companyInfo}>
                    <h3 className={styles.company}>{exp.company}</h3>
                    <h4 className={styles.position}>{exp.position}</h4>
                  </div>
                </div>

                <p className={styles.description}>{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <div className={styles.achievements}>
                    <h5>Logros</h5>
                    <ul>
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.technologies}>
                  <h5>Tecnologías</h5>
                  <div className={styles.techTags}>
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTimeLine;
