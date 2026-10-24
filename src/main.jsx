import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Fade out the preloader from index.html once the app is rendered and the fonts are in
// (so the headline doesn't jump). Shown long enough for the logo to finish drawing,
// never longer than MAX_MS. Images and videos keep loading behind the page.
const MIN_MS = 1500;
const MAX_MS = 2500;
const preload = document.getElementById("preload");

if (preload) {
  let hidden = false;
  const hide = () => {
    if (hidden) return;
    hidden = true;
    preload.classList.add("done");
    preload.addEventListener("transitionend", () => preload.remove(), { once: true });
  };
  const elapsed = () => performance.now();
  const fontsReady = document.fonts?.ready ?? Promise.resolve();

  fontsReady.then(() => setTimeout(hide, Math.max(0, MIN_MS - elapsed())));
  setTimeout(hide, Math.max(0, MAX_MS - elapsed()));
}
