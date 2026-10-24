import { useEffect, useRef, useState } from "react";
import { WORK, previewOf, thumbOf } from "../data/work.js";
import { useMedia } from "../hooks.js";
import Icon from "./Icon.jsx";

const SLIDE_IDS = ["pahadi-girl", "perfume-ugc", "khana-kha-liya", "production-ugc", "ajgar"];
const SLIDES = SLIDE_IDS.map((id) => WORK.find((w) => w.id === id)).filter(Boolean);
const SLIDE_MS = 5000;

// Auto-advancing, swipeable carousel of vertical clips in a phone frame.
// Only the active slide's preview video is mounted, so just one clip downloads at a time.
export default function HeroReel({ onPlay }) {
  const [index, setIndex] = useState(0);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const touchX = useRef(null);
  const item = SLIDES[index];

  const go = (step) => setIndex((i) => (i + step + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, reduced]);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="phone">
      <button
        type="button"
        className="phone-screen"
        onClick={() => onPlay(item)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label={`Play ${item.title}`}
      >
        {SLIDES.map((s, i) => (
          <span key={s.id} className={`slide${i === index ? " is-active" : ""}`} aria-hidden={i !== index}>
            <img src={thumbOf(s)} alt="" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "low"} />
            {i === index && !reduced && <video src={previewOf(s)} poster={thumbOf(s)} muted loop playsInline autoPlay />}
          </span>
        ))}
        <span className="phone-pill">
          <Icon name="play" size={11} /> Tap to watch
        </span>
      </button>
      <div className="phone-meta">
        <span className="phone-caption">
          {item.title} · {item.kind}
        </span>
        <div className="dots" role="group" aria-label="Choose video">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={s.title}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
