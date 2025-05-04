import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane } from "react-icons/fa";
import styles from "./ContactSection.module.scss";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
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
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className={styles.contactSection}>
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
              href={socialLinks.twitter}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={40} />
            </a>
          </div>
        </div>

        <div className={styles.emailSection}>
          <button onClick={handleEmailClick} className={styles.emailButton}>
            <FaPaperPlane className={styles.buttonIcon} />
            {emailButtonText}
          </button>
        </div>
      </div>
    </section>
  );
}
