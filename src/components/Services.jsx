import Icon from "./Icon.jsx";
import SectionHead from "./SectionHead.jsx";

const SERVICES = [
  {
    icon: "bag",
    title: "Product & brand ads",
    text: "Jewellery, watches, beauty, fashion and real estate with studio lighting and hero shots. No shoot, no studio hire.",
    points: ["Hero product shots", "Brand-matched look and colour", "15s, 30s and 45s cuts"],
  },
  {
    icon: "users",
    title: "UGC ads",
    text: "Creator-style reviews and testimonials that feel native to the feed, made in many versions so you can test what converts.",
    points: ["Multiple hooks and scripts", "Hindi, English, Hinglish", "Built for paid social"],
  },
  {
    icon: "zap",
    title: "VFX & cinematic spots",
    text: "Dragons, explosions, impossible locations. Scenes that would cost lakhs to shoot, made in days.",
    points: ["Hero shots and full sequences", "Live-action look", "Colour-graded, film-look finish"],
  },
  {
    icon: "film",
    title: "Films & music videos",
    text: "Pre-wedding films, love stories, music videos and short films with your faces kept true in every shot.",
    points: ["Edited to the music", "4K masters", "Full-length or teaser cuts"],
  },
  {
    icon: "sparkle",
    title: "3D & 2D animation",
    text: "Pixar-style characters and 2D vector reels for brands, explainers and storytelling channels.",
    points: ["Characters that stay consistent", "Voices and lip-sync", "Reels and long-form episodes"],
  },
  {
    icon: "repeat",
    title: "Monthly content",
    text: "A steady pipeline of ads and reels every month, with priority delivery, for brands that post often.",
    points: ["Fixed monthly plan", "Priority turnaround", "Fresh variations every week"],
  },
];

export default function Services() {
  return (
    <section id="services" className="wrap section">
      <SectionHead eyebrow="What we do" title="Everything your brand needs" accent="to stand out.">
        One studio for ads, UGC, VFX, films and animation, made with our AI pipeline and finished by editors.
      </SectionHead>

      <div className="services">
        {SERVICES.map((s) => (
          <article key={s.title} className="service glass" data-reveal>
            <span className="icon-tile">
              <Icon name={s.icon} size={20} />
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul className="checks">
              {s.points.map((p) => (
                <li key={p}>
                  <Icon name="check" size={14} /> {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
