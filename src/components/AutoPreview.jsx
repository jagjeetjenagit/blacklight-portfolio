import { useInView, useRichMedia } from "../hooks.js";
import { posterOf, previewOf } from "../data/work.js";

// Poster image that becomes a silent looping preview once it scrolls into view (desktop only).
export default function AutoPreview({ item, eager = false }) {
  const rich = useRichMedia();
  const [ref, inView] = useInView();

  return (
    <span ref={ref} className="auto-preview">
      <img src={posterOf(item)} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
      {rich && inView && <video src={previewOf(item)} muted loop playsInline autoPlay />}
    </span>
  );
}
