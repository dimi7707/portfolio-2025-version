import React from "react";
import "./Footer.scss";

const sections = ["home", "work", "contact"];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="scroll-to-top" onClick={scrollToTop}>
          <div className="arrow-up"></div>
        </div>
        <div className="footer-main">
          <div className="footer-info">
            <p>© {new Date().getFullYear()} Mi Portfolio</p>
            <p>Diseñado con ❤️</p>
          </div>
          <ul className="footer-nav">
            {sections.map((section) => (
              <li key={section}>
                <a href={`#${section}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
