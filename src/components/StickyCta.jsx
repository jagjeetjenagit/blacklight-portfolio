import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

// Mobile-only bar that appears after the hero and hides once the contact form is on screen.
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atContact = contact && contact.getBoundingClientRect().top < window.innerHeight;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <a href="#contact" className="btn btn-primary" tabIndex={show ? 0 : -1}>
        Get your video made <Icon name="arrow" size={16} />
      </a>
    </div>
  );
}
