export default function SectionHead({ eyebrow, title, accent, children }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>
        {title} <span className="grad">{accent}</span>
      </h2>
      {children && <p className="section-sub">{children}</p>}
    </div>
  );
}
