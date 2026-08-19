import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CareerTimeLine.module.scss";
import React from "react";
import { generateInitials } from "./utils";

export interface Experience {
  company: string;
  position: string;
  period: string;
  description?: string;
  technologies: string[];
  achievements?: string[];
  companyLogo?: string;
  companyInitials?: string;
}

interface Experiences {
  titleSection: string;
  experiences: Experience[];
}

type Slot =
  | { type: "full"; experience: Experience }
  | {
      type: "compactPair";
      experiences: [Experience] | [Experience, Experience];
    };

const isCompact = (exp: Experience) => !exp.description;

/**
 * Groups experiences into render slots: experiences with a description each get
 * their own full-card slot, while up to two consecutive description-less
 * experiences share a single compact-pair slot (one grid cell).
 */
const groupExperiencesIntoSlots = (experiences: Experience[]): Slot[] => {
  const slots: Slot[] = [];
  let i = 0;

  while (i < experiences.length) {
    const current = experiences[i];

    if (!isCompact(current)) {
      slots.push({ type: "full", experience: current });
      i += 1;
      continue;
    }

    const next = experiences[i + 1];
    if (next && isCompact(next)) {
      slots.push({ type: "compactPair", experiences: [current, next] });
      i += 2;
    } else {
      slots.push({ type: "compactPair", experiences: [current] });
      i += 1;
    }
  }

  return slots;
};

const CareerTimeLine = ({ titleSection, experiences }: Experiences) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && experiences.length > 0) {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(
          `.${styles.title}`,
          { y: 50, opacity: 0 },
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

        // Cards stagger animation
        const cards = cardsRef.current.filter(Boolean);
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            },
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, [experiences]);

  /**
   * Get badge content based on priority: logo > initials > auto-generated
   */
  const getBadgeContent = (exp: Experience) => {
    if (exp.companyLogo) {
      return (
        <img
          src={exp.companyLogo}
          alt={`Logo de ${exp.company}`}
          className={styles.badgeImg}
        />
      );
    }

    const initials = exp.companyInitials || generateInitials(exp.company);
    return <span className={styles.badgeInitials}>{initials}</span>;
  };

  const renderCard = (exp: Experience, refIndex: number, compact: boolean) => (
    <div
      key={refIndex}
      className={compact ? `${styles.card} ${styles.compact}` : styles.card}
      ref={(el) => {
        cardsRef.current[refIndex] = el;
      }}
      tabIndex={0}
      role="article"
    >
      <div className={styles.cardHeader}>
        <div className={styles.companyBadge}>{getBadgeContent(exp)}</div>
        <div className={styles.dateBadge}>{exp.period}</div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.company}>{exp.company}</h3>
        <h4 className={styles.position}>{exp.position}</h4>

        {exp.description && (
          <div className={styles.description}>
            {exp.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {exp.achievements && exp.achievements.length > 0 && (
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
  );

  const slots = groupExperiencesIntoSlots(experiences);
  let refIndex = 0;

  return (
    <div className={styles.careerContainer} ref={containerRef}>
      <h2 className={styles.title}>{titleSection}</h2>

      <div className={styles.careerGrid}>
        {slots.map((slot, slotIndex) => {
          if (slot.type === "full") {
            return renderCard(slot.experience, refIndex++, false);
          }

          if (slot.experiences.length === 1) {
            return renderCard(slot.experiences[0], refIndex++, true);
          }

          return (
            <div key={slotIndex} className={styles.compactPairSlot}>
              {slot.experiences.map((exp) => renderCard(exp, refIndex++, true))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerTimeLine;
