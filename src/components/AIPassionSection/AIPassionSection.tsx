import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AIPassionSection.module.scss";

interface AIPassionSectionProps {
  title: string;
  description: string;
  tools: string[];
}

const AIPassionSection = ({ title, description, tools }: AIPassionSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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

        // Animate tools
        gsap.from(toolsRef.current?.children || [], {
          scrollTrigger: {
            trigger: toolsRef.current,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.6,
          ease: "power2.out",
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
      
      {/* Floating particles */}
      <div className={styles.particles} ref={particlesRef}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.particle}></div>
        ))}
      </div>

      {/* Neural network lines */}
      <div className={styles.neuralNetwork}>
        <svg className={styles.networkSvg} viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(79, 172, 254, 0.3)" />
              <stop offset="50%" stopColor="rgba(139, 69, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 71, 87, 0.3)" />
            </linearGradient>
          </defs>
          
          {/* Animated lines connecting nodes */}
          <path 
            d="M100,200 Q300,100 500,200 T900,200" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className={styles.networkPath}
          />
          <path 
            d="M150,150 Q400,250 700,150 T1000,150" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className={styles.networkPath}
          />
          <path 
            d="M200,250 Q500,50 800,250" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className={styles.networkPath}
          />
          
          {/* Nodes */}
          <circle cx="100" cy="200" r="6" className={styles.networkNode} />
          <circle cx="300" cy="150" r="4" className={styles.networkNode} />
          <circle cx="500" cy="200" r="5" className={styles.networkNode} />
          <circle cx="700" cy="180" r="4" className={styles.networkNode} />
          <circle cx="900" cy="200" r="6" className={styles.networkNode} />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title} ref={titleRef}>
            {title}
          </h2>
          
          <p className={styles.description} ref={descriptionRef}>
            {description}
          </p>
          
          <div className={styles.tools} ref={toolsRef}>
            {/*tools.map((tool, index) => (
              <span key={index} className={styles.tool}>
                {tool}
              </span>
            ))*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPassionSection;