import SectionHead from "./SectionHead.jsx";

const FAQS = [
  {
    q: "Will it look fake or “AI”?",
    a: "Every shot is generated, picked and edited by hand, then colour-graded like a film. Everything in the portfolio above was made this way, including Lucky & Nikki episodes with 10M+ views.",
  },
  {
    q: "How fast can I get my video?",
    a: "Most ads get a first cut in 24–72 hours. Longer films and animated episodes take a little more, and we’ll tell you the timeline upfront.",
  },
  {
    q: "What do I need to send?",
    a: "Your product photos or links, your logo and brand colours, any reference videos you like, and where the ad will run. That’s it. No shoot to plan.",
  },
  {
    q: "Can you use our real product, model or faces?",
    a: "Yes. We work from your photos so your product, packaging and faces stay true in every shot.",
  },
  {
    q: "Do I get revisions?",
    a: "Yes. You review the first cut, send notes, and we polish it before final delivery.",
  },
  {
    q: "Which languages and formats?",
    a: "Hindi, English and Hinglish voiceovers and captions. Delivered for Reels, Shorts, YouTube and paid ads in 9:16, 1:1 and 16:9.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="wrap section">
      <SectionHead eyebrow="FAQ" title="Questions before you" accent="start?" />
      <div className="faq">
        {FAQS.map((f) => (
          <details key={f.q} className="faq-item glass" data-reveal>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
