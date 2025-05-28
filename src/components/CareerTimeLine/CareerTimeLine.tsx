import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Animación para el título
        gsap.fromTo(
          `.${styles.title}`,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.${styles.title}`,
              start: "top 80%",
            },
          },
        );

        // Animación para cada tarjeta
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          // Ocultar inicialmente la tarjeta
          gsap.set(card, {
            opacity: 0,
            x: -100,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          // Animación del marcador de tiempo
          tl.to(card.querySelector(`.${styles.timelineMarker}`), {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          });

          // Animación del contenido
          tl.to(
            card.querySelector(`.${styles.timelineContent}`),
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4",
          );

          // Animación del logo de la empresa
          tl.fromTo(
            card.querySelector(`.${styles.companyLogo}`),
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.6",
          );

          // Animación de los logros y tecnologías
          tl.fromTo(
            card.querySelectorAll(
              `.${styles.achievements} li, .${styles.techTag}`,
            ),
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.4",
          );

          // Animar la tarjeta completa
          tl.to(
            card,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0,
          );
        });
      }, timelineRef);

      return () => ctx.revert();
    }
  }, [experiences]);

  return (
    <div className={styles.timelineContainer} ref={timelineRef}>
      <div className={styles.timelineWrapper}>
        <h2 className={styles.title}>Experiencia Laboral</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={styles.timelineItem}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            >
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
