import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane } from "react-icons/fa";
import styles from "./ContactSection.module.scss";

export default function ContactSection() {
  const handleEmailClick = () => {
    window.location.href = "mailto:tuemail@ejemplo.com";
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.title}>Contact Me</h2>

      <div className={styles.content}>
        <div className={styles.socialSection}>
          <h3 className={styles.subtitle}>
            Conectemos a través de redes sociales o envíame un mail
          </h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink}>
              <FaGithub size={40} />
            </a>
            <a href="#" className={styles.socialLink}>
              <FaLinkedin size={40} />
            </a>
            <a href="#" className={styles.socialLink}>
              <FaTwitter size={40} />
            </a>
          </div>
        </div>

        <div className={styles.emailSection}>
          <button onClick={handleEmailClick} className={styles.emailButton}>
            <FaPaperPlane className={styles.buttonIcon} />
            Send an Email
          </button>
        </div>
      </div>
    </section>
  );
}
