import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

interface Section {
  name: string;
  type: "section" | "page";
  path?: string;
}

const sections: Section[] = [
  { name: "home", type: "section" },
  { name: "work", type: "section" },
  { name: "about", type: "page", path: "/about" },
  { name: "contact", type: "section" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
            <li key={section.name}>
              {section.type === "section" ? (
                <a
                  href={`#${section.name}`}
                  className={
                    activeSection === section.name ? styles.active : ""
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                </a>
              ) : (
                <a href={section.path} onClick={() => setMenuOpen(false)}>
                  {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
