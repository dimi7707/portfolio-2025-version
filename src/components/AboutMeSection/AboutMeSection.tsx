import styles from "./AboutMeSection.module.scss";

interface AboutMeSectionProps {
  title: string;
  description: string;
  codeSnippet: string;
}

const AboutMeSection = ({
  title,
  description,
  codeSnippet,
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
              <div className={styles.image1}></div>
              <div className={styles.image2}></div>
              <div className={styles.image3}></div>
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
