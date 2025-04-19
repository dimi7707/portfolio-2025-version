import styles from "./AboutMeSection.module.scss";

const AboutMeSection = () => {
  return (
    <section className={styles.aboutMeSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>About</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <div className={styles.image1}></div>
              <div className={styles.image2}></div>
              <div className={styles.image3}></div>
            </div>
            <div className={styles.codeBackground}>
              <pre className={styles.code}>
                {`function helloWorld() {
  console.log("Hello, World!");
  return "Success";
}

const myFunction = () => {
  const result = helloWorld();
  return result;
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
