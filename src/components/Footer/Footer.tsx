import type React from "react";
import "./Footer.scss";
import { useLanguage } from "../../hooks/useLanguage";
import type { Section } from "../../utils/pathUtils";
import { getLocalizedPath } from "../../utils/pathUtils";

/*const sections: Section[] = [
  { name: "home", type: "page", path: "/" },
  { name: "about", type: "page", path: "/about" },
  { name: "contact", type: "page", path: "/contact" },
];*/

const sections: Section[] = [];

const Footer: React.FC = () => {
  const { language } = useLanguage();

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
              <li key={section.name}>
                <a href={getLocalizedPath(section.path || "", language)}>
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
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
