import React, { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.scss";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  emailButtonText: string;
}

export default function ContactSection({
  title,
  subtitle,
  email,
  socialLinks,
  emailButtonText,
}: ContactSectionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Animación del título y subtítulo
        gsap.fromTo(
          [`.${styles.title}`, `.${styles.subtitle}`],
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Animación de los iconos sociales
        gsap.fromTo(
          `.${styles.socialLink}`,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: `.${styles.socialIcons}`,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Animación del botón de email
        if (buttonRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          // Secuencia de animación del botón
          tl.to(buttonRef.current, {
            scaleX: 1.5, // Estirar horizontalmente
            duration: 0.4,
            ease: "power2.inOut",
          })
            .to(buttonRef.current, {
              scaleX: 0.8, // Comprimir
              duration: 0.3,
              ease: "power2.inOut",
            })
            .to(buttonRef.current, {
              scaleX: 1.2, // Estirar de nuevo
              duration: 0.3,
              ease: "power2.inOut",
            })
            .to(buttonRef.current, {
              scaleX: 1, // Volver al tamaño normal
              y: -20, // Saltar
              duration: 0.4,
              ease: "bounce.out",
            })
            .to(buttonRef.current, {
              y: 0, // Aterrizar
              duration: 0.3,
              ease: "power2.out",
            });

          // Añadir efecto hover
          buttonRef.current.addEventListener("mouseenter", () => {
            gsap.to(buttonRef.current, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          buttonRef.current.addEventListener("mouseleave", () => {
            gsap.to(buttonRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className={styles.contactSection} ref={sectionRef}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.content}>
        <div className={styles.socialSection}>
          <h3 className={styles.subtitle}>{subtitle}</h3>
          <div className={styles.socialIcons}>
            <a
              href={socialLinks.github}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={40} />
            </a>
            <a
              href={socialLinks.linkedin}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={40} />
            </a>
            <a
              href={socialLinks.instagram}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={40} />
            </a>
          </div>
        </div>

        <div className={styles.emailSection}>
          <button
            ref={buttonRef}
            onClick={handleEmailClick}
            className={styles.emailButton}
          >
            <FaPaperPlane className={styles.buttonIcon} />
            {emailButtonText}
          </button>
        </div>
      </div>
    </section>
  );
}
