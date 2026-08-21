import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiOpenai, SiGithubcopilot, SiAnthropic } from "react-icons/si";
import {
  TbTerminal2,
  TbBrain,
  TbRobot,
  TbSparkles,
  TbCpu,
  TbBulb,
  TbBrandVscode,
  TbMessageChatbot,
  TbNetwork,
  TbAtom,
} from "react-icons/tb";
import styles from "./AIPassionSection.module.scss";

interface AIPassionSectionProps {
  title: string;
  description: string;
}

// Small "orchestration" graphic: a central hub (the developer) connected to
// the AI tools/agents named in the copy — visually echoes TechConstellation's
// node/connector language at a smaller, featured scale, standing in for a
// literal AI photo without resorting to stock-photo robot/brain imagery.
const orchestrationNodes = [
  { Icon: SiAnthropic, top: 16, left: 18, label: "Claude" },
  { Icon: TbBrandVscode, top: 16, left: 82, label: "Cursor" },
  { Icon: TbTerminal2, top: 84, left: 16, label: "Warp" },
  { Icon: TbNetwork, top: 84, left: 84, label: "MCP" },
];

const AIPassionSection = ({ title, description }: AIPassionSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Animate title
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        // Animate description
        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });

        // Animate floating particles
        if (particlesRef.current) {
          const particles = particlesRef.current.children;
          Array.from(particles).forEach((particle, index) => {
            gsap.to(particle, {
              y: "random(-20, 20)",
              x: "random(-15, 15)",
              rotation: "random(-5, 5)",
              duration: "random(3, 6)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.2,
            });
          });
        }

        // Animate background icons
        if (iconsRef.current) {
          const icons = iconsRef.current.children;
          Array.from(icons).forEach((icon, index) => {
            gsap.to(icon, {
              rotation: "random(-360, 360)",
              duration: "random(20, 40)",
              repeat: -1,
              ease: "none",
              delay: index * 0.5,
            });

            gsap.to(icon, {
              y: "random(-10, 10)",
              x: "random(-10, 10)",
              duration: "random(8, 15)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.3,
            });
          });
        }

        // Gradient animation
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          "--gradient-rotation": "360deg",
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className={styles.aiPassionSection} ref={sectionRef}>
      <div className={styles.backgroundGradient}></div>

      {/* Background AI Tools Icons */}
      <div className={styles.backgroundIcons} ref={iconsRef}>
        <SiAnthropic className={`${styles.backgroundIcon} ${styles.icon1}`} />
        <SiOpenai className={`${styles.backgroundIcon} ${styles.icon2}`} />
        <SiGithubcopilot
          className={`${styles.backgroundIcon} ${styles.icon3}`}
        />
        <TbBrandVscode className={`${styles.backgroundIcon} ${styles.icon4}`} />
        <TbTerminal2 className={`${styles.backgroundIcon} ${styles.icon5}`} />
        <TbBrain className={`${styles.backgroundIcon} ${styles.icon6}`} />
        <TbRobot className={`${styles.backgroundIcon} ${styles.icon7}`} />
        <TbSparkles className={`${styles.backgroundIcon} ${styles.icon8}`} />
        <TbCpu className={`${styles.backgroundIcon} ${styles.icon9}`} />
        <TbBulb className={`${styles.backgroundIcon} ${styles.icon10}`} />
        <TbMessageChatbot
          className={`${styles.backgroundIcon} ${styles.icon11}`}
        />
        <TbNetwork className={`${styles.backgroundIcon} ${styles.icon12}`} />
      </div>

      {/* Floating particles */}
      <div className={styles.particles} ref={particlesRef}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.particle}></div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.visual}>
            <div className={styles.orchestrationFrame}>
              <svg
                className={styles.orchestrationSvg}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {orchestrationNodes.map(({ top, left, label }) => (
                  <line
                    key={label}
                    x1="50"
                    y1="50"
                    x2={left}
                    y2={top}
                    className={styles.orchestrationLine}
                  />
                ))}
              </svg>

              <div className={`${styles.orchestrationNode} ${styles.hub}`}>
                <TbCpu />
              </div>

              {orchestrationNodes.map(({ Icon, top, left, label }) => (
                <div
                  key={label}
                  className={styles.orchestrationNode}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  title={label}
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.textCol}>
            <h2 className={styles.title} ref={titleRef}>
              {title}
            </h2>

            <p className={styles.description} ref={descriptionRef}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPassionSection;
