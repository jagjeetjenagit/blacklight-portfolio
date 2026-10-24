import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Fade out the preloader from index.html once the page has loaded:
// shown for at least MIN_MS so it doesn't flash, never longer than MAX_MS.
const MIN_MS = 900;
const MAX_MS = 3000;
const preload = document.getElementById("preload");

if (preload) {
  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    preload.classList.add("done");
    preload.addEventListener("transitionend", () => preload.remove(), { once: true });
  };
  const started = performance.now();
  const onReady = () => setTimeout(hide, Math.max(0, MIN_MS - (performance.now() - started)));

  if (document.readyState === "complete") onReady();
  else window.addEventListener("load", onReady, { once: true });
  setTimeout(hide, MAX_MS);
}
