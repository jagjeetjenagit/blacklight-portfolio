import { useEffect, useState } from "react";
import { CONTACT, SERVICE_OPTIONS } from "../data/contact.js";
import Icon from "./Icon.jsx";

const PROMISES = [
  "Tell us your idea in two minutes",
  "We reply with a concept for your video",
  "First cut in 24–72 hours once we start",
];

const EMPTY = { name: "", brand: "", phone: "", message: "" };

function buildBrief(form, services) {
  return [
    "Hi Blacklight Motion! I'd like a video made.",
    `Name: ${form.name}`,
    form.brand && `Brand: ${form.brand}`,
    form.phone && `Phone / WhatsApp: ${form.phone}`,
    services.length > 0 && `Looking for: ${services.join(", ")}`,
    form.message && `Details: ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Contact({ interest }) {
  const [form, setForm] = useState(EMPTY);
  const [services, setServices] = useState([]);
  const [sent, setSent] = useState(null);

  // Pre-select the service matching the video the visitor just watched.
  useEffect(() => {
    if (interest) setServices((s) => (s.includes(interest) ? s : [...s, interest]));
  }, [interest]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (s) => setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]));

  const submit = (e) => {
    e.preventDefault();
    const brief = buildBrief(form, services);

    if (CONTACT.whatsapp) {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(brief)}`, "_blank", "noopener");
      setSent("whatsapp");
    } else if (CONTACT.email) {
      const subject = `New video project — ${form.brand || form.name}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
      setSent("email");
    } else {
      // Open the DM synchronously so popup blockers allow it; copying can finish after.
      // Clipboard can be blocked; the DM still opens.
      window.open(CONTACT.instagramDm, "_blank", "noopener");
      navigator.clipboard?.writeText(brief).catch(() => {});
      setSent("instagram");
    }
  };

  const submitLabel = CONTACT.whatsapp ? "Send on WhatsApp" : CONTACT.email ? "Send my brief" : "Send my brief on Instagram";

  return (
    <section id="contact" className="wrap section">
      <div className="contact glass" data-reveal>
        <div className="contact-pitch">
          <p className="eyebrow">Start your project</p>
          <h2>
            Let’s make a video
            <br />
            <span className="grad">people can’t skip.</span>
          </h2>
          <ul className="checks">
            {PROMISES.map((p) => (
              <li key={p}>
                <Icon name="check" size={15} /> {p}
              </li>
            ))}
          </ul>
          <a href={CONTACT.instagramDm} target="_blank" rel="noopener" className="contact-alt">
            <Icon name="instagram" size={16} /> Prefer to chat? DM @blacklightmotion
          </a>
        </div>

        <form className="brief" onSubmit={submit}>
          <div className="field-row">
            <label className="field">
              <span>Your name</span>
              <input required value={form.name} onChange={update("name")} placeholder="Riya Sharma" autoComplete="name" />
            </label>
            <label className="field">
              <span>Brand</span>
              <input value={form.brand} onChange={update("brand")} placeholder="Your brand or company" autoComplete="organization" />
            </label>
          </div>
          <label className="field">
            <span>WhatsApp / phone</span>
            <input value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" inputMode="tel" autoComplete="tel" />
          </label>
          <fieldset className="field">
            <span>What do you need?</span>
            <div className="pick">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip chip-sm${services.includes(s) ? " is-active" : ""}`}
                  aria-pressed={services.includes(s)}
                  onClick={() => toggle(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>Tell us about the video</span>
            <textarea
              rows="3"
              value={form.message}
              onChange={update("message")}
              placeholder="Product, where it will run, any reference you like…"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-lg brief-submit">
            {submitLabel} <Icon name="arrow" size={16} />
          </button>
          {sent === "instagram" && (
            <p className="brief-note" role="status">
              Your brief is copied. Paste it into the Instagram chat that just opened and we’ll get back to you.
            </p>
          )}
          {sent === "whatsapp" && <p className="brief-note" role="status">WhatsApp opened with your brief. Just hit send.</p>}
          {sent === "email" && <p className="brief-note" role="status">Your mail app opened with the brief. Just hit send.</p>}
        </form>
      </div>
    </section>
  );
}
