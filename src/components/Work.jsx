import { useState } from "react";
import { FILTERS, INSTAGRAM, LUCKY_NIKKI, WORK } from "../data/work.js";
import Icon from "./Icon.jsx";
import SectionHead from "./SectionHead.jsx";
import WorkCard from "./WorkCard.jsx";

const canHover = window.matchMedia("(hover: hover)").matches;
const isVertical = (w) => w.ratio === "9:16";
const has = (tag) => (w) => w.tags.includes(tag);
const isAnimation = (w) => has("3d")(w) || has("2d")(w) || has("motion")(w);

// Within a row: UGC first, then real estate, then everything else (stable sort keeps data order).
const rank = (w) => (has("ugc")(w) ? 0 : has("realestate")(w) ? 1 : 2);
const byRank = (a, b) => rank(a) - rank(b);

// Each group splits into a vertical (9:16) row and a horizontal (16:9) row.
const GROUPS = [
  { id: "3d", title: "Pixar-style 3D animation", items: WORK.filter(has("3d")), brand: LUCKY_NIKKI },
  { id: "vertical", title: "UGC & Reels", items: WORK.filter((w) => !isAnimation(w) && isVertical(w)) },
  { id: "motion", title: "Motion design & kinetic typography", items: WORK.filter(has("motion")) },
  { id: "2d", title: "2D animation", items: WORK.filter(has("2d")) },
  { id: "horizontal", title: "Ads & Films", items: WORK.filter((w) => !isAnimation(w) && !isVertical(w)) },
];

const ROWS = [
  { id: "vertical", test: isVertical },
  { id: "horizontal", test: (w) => !isVertical(w) },
];

function BrandBanner({ brand }) {
  return (
    <div className="brand-banner glass">
      <img src={brand.logo} alt="" width="64" height="64" loading="lazy" />
      <div className="brand-banner-copy">
        <p className="brand-banner-name">{brand.name}</p>
        <p className="brand-banner-handle">
          <Icon name="instagram" size={14} /> {brand.handle}
        </p>
        <p className="brand-banner-blurb">{brand.blurb}</p>
      </div>
      <div className="brand-banner-side">
        <p className="brand-banner-stat grad">{brand.stat}</p>
        <p className="brand-banner-label">{brand.statLabel}</p>
        <a href={brand.href} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
          Visit profile <Icon name="arrow" size={14} />
        </a>
      </div>
    </div>
  );
}

export default function Work({ onPlay }) {
  const [filter, setFilter] = useState("all");
  const matches = (w) => filter === "all" || w.tags.includes(filter);

  return (
    <section id="work" className="wrap section">
      <SectionHead eyebrow="Portfolio" title="Every kind of" accent="video.">
        Animation, motion design, UGC, real estate, ads, VFX and films. {canHover ? "Hover to preview, click to watch." : "Swipe through, tap to watch."}
      </SectionHead>

      <div className="filters" role="group" aria-label="Filter work" data-reveal>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`chip${filter === f.id ? " is-active" : ""}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {GROUPS.map((group) => {
        const items = group.items.filter(matches).sort(byRank);
        if (!items.length) return null;
        const rows = ROWS.map((row) => ({ ...row, items: items.filter(row.test) })).filter((row) => row.items.length);

        return (
          <div key={group.id} id={`work-${group.id}`} className="work-group">
            <div className="group-head">
              <h3>{group.title}</h3>
            </div>
            {group.brand && <BrandBanner brand={group.brand} />}
            {rows.map((row) => (
              <div key={row.id} className="work-row">
                <div className={`grid grid-${row.id}`}>
                  {row.items.map((item) => (
                    <WorkCard key={item.id} item={item} onPlay={onPlay} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className="work-cta glass" data-reveal>
        <div>
          <p className="work-cta-title">
            Like what you see? <span className="grad">Let’s make yours.</span>
          </p>
          <p className="work-cta-sub">Tell us your idea. We reply with a concept and get a first cut to you in days.</p>
        </div>
        <div className="actions">
          <a href="#contact" className="btn btn-primary">
            Get your video made <Icon name="arrow" size={16} />
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="btn btn-ghost">
            <Icon name="instagram" size={16} /> More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
