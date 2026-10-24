import { FEATURED, formatDuration } from "../data/work.js";
import AutoPreview from "./AutoPreview.jsx";
import Icon from "./Icon.jsx";
import PlayIcon from "./PlayIcon.jsx";
import SectionHead from "./SectionHead.jsx";

// These films stream as HLS; start fetching the player as soon as someone reaches for one.
const prefetchPlayer = () => import("hls.js");

export default function Featured({ onPlay }) {
  return (
    <section id="films" className="wrap section">
      <SectionHead eyebrow="Featured films" title="Long-form, made" accent="entirely with AI.">
        Full-length music videos and love stories. No cameras, no set, every frame generated and edited like a feature.
      </SectionHead>

      <div className="features">
        {FEATURED.map((item, i) => (
          <article key={item.id} className={`feature glass${i % 2 ? " is-flipped" : ""}`} data-reveal>
            <div className="feature-copy">
              <span className="badge">
                <i /> {item.badge}
              </span>
              <p className="line-eyebrow">
                {item.kind} · {formatDuration(item.duration)}
              </p>
              <h3>{item.title}</h3>
              <p className="feature-blurb">{item.blurb}</p>
              <ul className="checks">
                {item.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={15} /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="feature-media"
              onClick={() => onPlay(item)}
              onPointerEnter={prefetchPlayer}
              onTouchStart={prefetchPlayer}
              aria-label={`Play ${item.title}`}
            >
              <AutoPreview item={item} />
              <PlayIcon className="play-lg" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
