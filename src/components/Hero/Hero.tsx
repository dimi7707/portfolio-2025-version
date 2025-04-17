import { useTypewriter, Cursor } from "react-simple-typewriter";
import styles from "./Hero.module.scss";

const Hero = () => {
  const [text] = useTypewriter({
    words: ["Dimitri Avila", "Software Developer", "Full Stack Developer"],
    loop: 0,
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 2000,
  });

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          <span>{text}</span>
          <Cursor cursorColor="#1a202c" />
        </h1>
        <h2 className={styles.subtitle}>Desarrollador Web Full Stack</h2>
        <p className={styles.description}>
          Apasionado por crear experiencias digitales únicas y funcionales.
          Especializado en desarrollo frontend y backend con las últimas
          tecnologías.
        </p>
      </div>
      <div className={styles.heroImage}>
        <img
          src="https://placehold.co/600x400"
          alt="Profile"
          className={styles.image}
        />
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
