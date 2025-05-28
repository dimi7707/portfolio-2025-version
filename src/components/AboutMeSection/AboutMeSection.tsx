import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import styles from "./AboutMeSection.module.scss";

interface AboutMeSectionProps {
  title: string;
  description: string;
  codeSnippet: string;
  images: string[];
}

const AboutMeSection = ({
  title,
  description,
  codeSnippet,
  images,
}: AboutMeSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, Flip);
      
      const ctx = gsap.context(() => {
        // Animación del texto (título y descripción)
        const textElements = textRef.current?.children;
        if (textElements) {
          gsap.fromTo(
            Array.from(textElements),
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Animación de las imágenes con Flip
        imagesRef.current.forEach((imageContainer, index) => {
          if (!imageContainer) return;

          // Estado inicial aleatorio con rotación más extrema
          const randomRotation = (Math.random() * 360) - 180; // Entre -180 y 180 grados
          const randomScale = 0.5 + Math.random() * 0.5;
          
          // Rotación final aleatoria pero más sutil
          const finalRotation = (Math.random() * 20) - 10; // Entre -10 y 10 grados

          // Guardar el estado final
          const state = Flip.getState(imageContainer);

          // Aplicar estado inicial
          gsap.set(imageContainer, {
            rotation: randomRotation,
            scale: randomScale,
            opacity: 0,
            transformOrigin: "center center"
          });

          // Crear timeline para cada imagen
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: imageContainer,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });

          // Animación de flip y rotación
          tl.to(imageContainer, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in"
          })
          .to(imageContainer, {
            rotation: finalRotation, // Usar la rotación final aleatoria
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
              // Aplicar el estado final con Flip
              Flip.from(state, {
                duration: 0.5,
                ease: "power2.inOut"
              });
            }
          }, "-=0.3");

          // Añadir un pequeño retraso entre cada imagen
          tl.delay(index * 0.2);
        });

        // Animación del código
        gsap.fromTo(
          `.${styles.codeBackground}`,
          {
            opacity: 0,
            scale: 0.95
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.${styles.codeBackground}`,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

      }, sectionRef);

      return () => ctx.revert();
    }
  }, [images]);

  return (
    <section className={styles.aboutMeSection} ref={sectionRef}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn} ref={textRef}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {images.map((image, index) => (
                <div 
                  className={styles[`image${index + 1}`]} 
                  key={index}
                  ref={(el) => {
                    imagesRef.current[index] = el;
                  }}
                >
                  <img src={image} alt={`About me image ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.codeBackground}>
              <pre className={styles.code}>{codeSnippet}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
