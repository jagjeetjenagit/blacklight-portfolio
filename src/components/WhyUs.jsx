import Icon from "./Icon.jsx";
import SectionHead from "./SectionHead.jsx";

const ROWS = [
  { label: "First cut", old: "7–30 days", us: "24–72 hours" },
  { label: "Crew, location, actors", old: "Book, schedule, pay for all of it", us: "Not needed" },
  { label: "New variations to test", old: "Reshoot or re-edit from scratch", us: "Quick new versions of hooks and cuts" },
  { label: "Every platform", old: "Separate edits for each format", us: "9:16, 1:1 and 16:9 delivered together" },
  { label: "Impossible shots", old: "Huge VFX or animation budget", us: "Dragons, Pixar-style characters, any location" },
];

export default function WhyUs() {
  return (
    <section id="why" className="wrap section">
      <SectionHead eyebrow="Why Blacklight" title="Everything a shoot gives you," accent="minus the wait.">
        Brands need fresh creatives every week. A traditional shoot can’t keep up. We can.
      </SectionHead>

      <div className="compare glass" data-reveal>
        <div className="compare-head">
          <span />
          <span className="compare-old">Traditional shoot</span>
          <span className="compare-us">
            <img src="./logo.jpg" alt="" width="22" height="22" /> Blacklight Motion
          </span>
        </div>
        {ROWS.map((r) => (
          <div key={r.label} className="compare-row">
            <span className="compare-label">{r.label}</span>
            <span className="compare-old">{r.old}</span>
            <span className="compare-us">
              <Icon name="check" size={15} /> {r.us}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
