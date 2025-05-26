import { spawn } from "child_process";
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
  return (
    <section className={styles.aboutMeSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              {images.map((image, index) => (
                <div className={styles[`image${index + 1}`]} key={index}>
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
