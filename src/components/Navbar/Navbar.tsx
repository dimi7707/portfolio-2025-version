import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

const sections = ["home", "work", "contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });

      const current = offsets.findIndex((offset, i) => {
        const nextOffset = offsets[i + 1] || Infinity;
        return scrollY >= offset - 100 && scrollY < nextOffset - 100;
      });

      setActiveSection(sections[current] || "home");
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
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ""}`}>
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={activeSection === section ? styles.active : ""}
                onClick={() => setMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
