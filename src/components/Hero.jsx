import { HERO_BG, previewOf, thumbOf } from "../data/work.js";
import { useRichMedia } from "../hooks.js";
import HeroReel from "./HeroReel.jsx";
import Icon from "./Icon.jsx";

const STATS = [
  { value: "40M+", label: "views on our animation" },
  { value: "10M+", label: "views on one episode" },
  { value: "24–72 hrs", label: "typical delivery" },
];

export default function Hero({ onPlay }) {
  const rich = useRichMedia();

  return (
    <section className="hero">
      {rich && (
        <div className="hero-bg" aria-hidden="true">
          <video src={previewOf(HERO_BG)} poster={thumbOf(HERO_BG)} muted loop playsInline autoPlay />
        </div>
      )}

      <div className="wrap hero-inner">
        <HeroReel onPlay={onPlay} />

        <div className="hero-copy">
          <span className="badge">
            <i /> AI video studio · 40M+ views
          </span>
          <h1>
            Videos that
            <br />
            stop the scroll,
            <br />
            <span className="grad">made in 72 hours.</span>
          </h1>
          <p className="lede">Pixar-style animation, UGC and product ads made with AI. No shoot, no crew, no waiting.</p>
          <div className="actions">
            <a href="#contact" className="btn btn-primary btn-lg">
              Get your video made <Icon name="arrow" size={16} />
            </a>
            <a href="#work" className="btn btn-ghost btn-lg">
              <Icon name="play" size={14} /> See our work
            </a>
          </div>
          <ul className="stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
