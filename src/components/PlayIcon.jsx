import Icon from "./Icon.jsx";

export default function PlayIcon({ className = "play" }) {
  return (
    <span className={className}>
      <Icon name="play" />
    </span>
  );
}
