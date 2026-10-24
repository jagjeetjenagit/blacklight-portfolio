import SectionHead from "./SectionHead.jsx";

const STEPS = [
  { title: "Share your brief", text: "Send your product, references and where the ad will run. We reply with ideas and a plan." },
  { title: "First cut in 24–72 hrs", text: "We script, generate and edit. You get a first cut fast, not in weeks." },
  { title: "Revise & launch", text: "We polish to your notes and deliver every format and variation you need." },
];

export default function Process() {
  return (
    <section className="wrap section">
      <SectionHead eyebrow="How it works" title="From brief to launch" accent="in days." />
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="step glass" data-reveal>
            <span className="step-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
