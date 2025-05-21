import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import { useLanguage } from "../../hooks/useLanguage";

interface Section {
  name: string;
  type: "section" | "page";
  path?: string;
}

const sections: Section[] = [
  { name: "home", type: "page", path: "/" },
  { name: "about", type: "page", path: "/about" },
  { name: "contact", type: "page", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { language, toggleLanguage, isEnglish, isSpanish } = useLanguage();

  const getLocalizedPath = (path: string) => {
    const basePath = path === "/" ? "" : path;
    return `/${language}${basePath}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = sections
        .filter((section) => section.type === "section")
        .map(({ name }) => {
          const el = document.getElementById(name);
          return el ? el.offsetTop : 0;
        });

      const current = offsets.findIndex((offset, i) => {
        const nextOffset = offsets[i + 1] || Number.POSITIVE_INFINITY;
        return scrollY >= offset - 100 && scrollY < nextOffset - 100;
      });

      const sectionNames = sections
        .filter((s) => s.type === "section")
        .map((s) => s.name);
      setActiveSection(sectionNames[current] || "home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>Software Developer</h1>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`${styles.navContent} ${menuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            {sections.map((section) => (
              <li key={section.name}>
                {section.type === "section" ? (
                  <a
                    href={`#${section.name}`}
                    className={
                      activeSection === section.name ? styles.active : ""
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {section.name.charAt(0).toUpperCase() +
                      section.name.slice(1)}
                  </a>
                ) : (
                  <a
                    href={getLocalizedPath(section.path || "")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {section.name.charAt(0).toUpperCase() +
                      section.name.slice(1)}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.languageSwitch}>
            <button
              className={`${styles.languageButton} ${isEnglish ? styles.active : ""}`}
              onClick={toggleLanguage}
            >
              EN
            </button>
            <button
              className={`${styles.languageButton} ${isSpanish ? styles.active : ""}`}
              onClick={toggleLanguage}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
