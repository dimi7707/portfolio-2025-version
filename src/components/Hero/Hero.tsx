import { useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.scss";

interface HeroProps {
  titleFirstPart: string;
  titleSecondPart: string;
  subtitle: string;
  description: string;
  mainImage: string;
  imageAlt: string;
}

const Hero = ({
  titleFirstPart,
  titleSecondPart,
  subtitle,
  description,
  mainImage,
  imageAlt,
}: HeroProps) => {
  const [text] = useTypewriter({
    words: [titleFirstPart, titleSecondPart],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  const descriptionRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from(descriptionRef.current, {
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });

        gsap.from(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span>{text}</span>
          <Cursor cursorColor="#1a202c" />
        </h1>
        <h2 className={styles.subtitle} ref={subtitleRef}>
          {subtitle}
        </h2>
        <div className={styles.description} ref={descriptionRef}>
          {description.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.heroImage}>
        {mainImage.length > 0 && (
          <img
            src={mainImage}
            alt={imageAlt}
            className={styles.image}
            ref={imageRef}
          />
        )}
        {!mainImage && (
          <img
            src="https://placehold.co/600x400"
            alt="Profile"
            className={styles.image}
          />
        )}
      </div>
      {/* Elementos de código flotantes */}
      <div className={`${styles.codeElement} ${styles.react}`}>
        <pre>{`import React from 'react'`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.typescript}`}>
        <pre>{`type Props = {\n  name: string\n}`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.node}`}>
        <pre>{`const server = express()`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.next}`}>
        <pre>{`export default function Page() {\n  return <div>Hello</div>\n}`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.javascript}`}>
        <pre>{`const array = [1, 2, 3]\narray.map(n => n * 2)`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.css}`}>
        <pre>{`.container {\n  display: flex;\n  gap: 1rem;\n}`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.html}`}>
        <pre>{`<div class="card">\n  <h2>Title</h2>\n</div>`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.git}`}>
        <pre>{`git commit -m "feat: add new feature"`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.python}`}>
        <pre>{`def hello():\n    print("Hello World")`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.docker}`}>
        <pre>{`FROM node:18\nWORKDIR /app`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.mongodb}`}>
        <pre>{`db.users.find({\n  age: { $gt: 18 }\n})`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.reactLeft}`}>
        <pre>{`const [state, setState] = useState(0)`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.reactBottom}`}>
        <pre>{`useEffect(() => {\n  console.log('mounted')\n}, [])`}</pre>
      </div>
      <div className={`${styles.codeElement} ${styles.tsBottom}`}>
        <pre>{`type Action = {\n  type: string\n  payload?: any\n}`}</pre>
      </div>
    </section>
  );
};

export default Hero;
