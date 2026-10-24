import { INSTAGRAM } from "../data/work.js";
import Icon from "./Icon.jsx";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <a href="#top" className="brand">
          <img src="./logo.svg" alt="" width="28" height="28" />
          <span>
            BLACKLIGHT<b>MOTION</b>
          </span>
        </a>
        <span className="foot-copy">© {new Date().getFullYear()} Blacklight Motion · AI ad &amp; film studio</span>
        <a href={INSTAGRAM} target="_blank" rel="noopener" className="foot-link" aria-label="Instagram">
          <Icon name="instagram" size={18} /> @blacklightmotion
        </a>
      </div>
    </footer>
  );
}
