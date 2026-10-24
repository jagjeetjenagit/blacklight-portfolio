import { useRef, useState } from "react";
import { formatDuration, previewOf, thumbOf } from "../data/work.js";
import Icon from "./Icon.jsx";
import PlayIcon from "./PlayIcon.jsx";

const canHover = window.matchMedia("(hover: hover)").matches;

export default function WorkCard({ item, onPlay }) {
  const videoRef = useRef(null);
  const insideRef = useRef(false);
  // The preview clip is only mounted (and downloaded) after the first hover.
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasPreview = canHover && !item.noPreview;

  const start = () => {
    if (!hasPreview) return;
    insideRef.current = true;
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    insideRef.current = false;
    setPlaying(false);
    videoRef.current?.pause();
  };

  const onPreviewPlaying = () => {
    if (insideRef.current) setPlaying(true);
    else videoRef.current?.pause();
  };

  return (
    <button
      type="button"
      className={`card${playing ? " is-playing" : ""}${item.contain ? " is-contain" : ""}`}
      style={{ aspectRatio: item.ratio.replace(":", "/") }}
      onClick={() => onPlay(item)}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <img src={thumbOf(item)} alt={item.title} loading="lazy" decoding="async" />
      {hovered && <video ref={videoRef} src={previewOf(item)} muted loop playsInline autoPlay onPlaying={onPreviewPlaying} />}
      <span className="card-shade" />
      <PlayIcon className="card-play" />
      <span className="card-info">
        <span className="card-kind">{item.kind}</span>
        <span className="card-title">{item.title}</span>
      </span>
      <span className="card-dur">
        {item.instagram ? <Icon name="instagram" size={14} /> : formatDuration(item.duration)}
      </span>
    </button>
  );
}
