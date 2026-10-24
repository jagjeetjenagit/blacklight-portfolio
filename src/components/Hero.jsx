import { HERO_BG, HERO_PHONE, posterOf, previewOf } from "../data/work.js";
import { useRichMedia } from "../hooks.js";
import Icon from "./Icon.jsx";

const STATS = [
  { value: "40M+", label: "views on our animation" },
  { value: "10M+", label: "views on a single episode" },
  { value: "24–72 hrs", label: "typical delivery" },
];

const ASSURANCES = ["No shoot, no crew", "Reels, Shorts & YouTube", "Revisions on your notes"];

export default function Hero({ onPlay }) {
  const rich = useRichMedia();

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        {rich ? (
          <video src={previewOf(HERO_BG)} poster={posterOf(HERO_BG)} muted loop playsInline autoPlay />
        ) : (
          <img src={posterOf(HERO_BG)} alt="" />
        )}
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="badge">
            <i /> AI video studio · 40M+ views and counting
          </span>
          <h1>
            Videos that
            <br />
            stop the scroll,
            <br />
            <span className="grad">made in 72 hours.</span>
          </h1>
          <p className="lede">
            Pixar-style animation, UGC ads, product and real-estate videos made with AI and finished by editors. Videos
            people actually watch till the end, without the cost and wait of a shoot.
          </p>
          <div className="actions">
            <a href="#contact" className="btn btn-primary btn-lg">
              Get your video made <Icon name="arrow" size={16} />
            </a>
            <a href="#work" className="btn btn-ghost btn-lg">
              <Icon name="play" size={14} /> See our work
            </a>
          </div>
          <ul className="assurances">
            {ASSURANCES.map((a) => (
              <li key={a}>
                <Icon name="check" size={14} /> {a}
              </li>
            ))}
          </ul>
          <ul className="stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="phone" onClick={() => onPlay(HERO_PHONE)} aria-label={`Play ${HERO_PHONE.title}`}>
          <span className="phone-screen">
            {rich ? (
              <video src={previewOf(HERO_PHONE)} poster={posterOf(HERO_PHONE)} muted loop playsInline autoPlay />
            ) : (
              <img src={posterOf(HERO_PHONE)} alt="" />
            )}
            <span className="phone-pill">
              <Icon name="play" size={11} /> Tap to watch
            </span>
          </span>
          <span className="phone-caption">
            {HERO_PHONE.title} — {HERO_PHONE.kind}
          </span>
        </button>
      </div>
    </section>
  );
}
