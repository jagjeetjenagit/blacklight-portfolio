import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" aria-label="Blacklight Motion home">
          <img src="./logo.jpg" alt="" width="34" height="34" />
          <span>
            BLACKLIGHT<b>MOTION</b>
          </span>
        </a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#films">Films</a>
          <a href="#why">Why us</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#contact" className="btn btn-primary btn-sm">
          Get your video <Icon name="arrow" size={15} />
        </a>
      </div>
    </header>
  );
}
