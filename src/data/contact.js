import { INSTAGRAM_DM } from "./work.js";

// Where the project-brief form sends leads. Fill in whichever you use:
// - whatsapp: number with country code, digits only (e.g. "919876543210") — opens WhatsApp with the brief typed out
// - email: opens the visitor's mail app with the brief
// If both are empty, the brief is copied and Instagram DMs open.
export const CONTACT = {
  whatsapp: "",
  email: "",
  instagramDm: INSTAGRAM_DM,
};

export const SERVICE_OPTIONS = [
  "Pixar-style animation",
  "2D animation",
  "UGC ad",
  "Product ad",
  "Real estate video",
  "VFX",
  "Film / music video",
];

// Maps a portfolio item to the service a visitor most likely wants after watching it.
export function serviceFor(item) {
  const t = item?.tags || [];
  if (t.includes("3d")) return "Pixar-style animation";
  if (t.includes("2d")) return "2D animation";
  if (t.includes("ugc")) return "UGC ad";
  if (t.includes("realestate")) return "Real estate video";
  if (t.includes("vfx")) return "VFX";
  if (t.includes("films")) return "Film / music video";
  if (t.includes("ads")) return "Product ad";
  return null;
}
