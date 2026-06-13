// Shared FX state, mutated per-frame — kept outside React to avoid re-renders.
// focusFX.active is true while the pointer is over any video surface;
// nx/ny hold that video's center in normalized device coords (-1..1),
// the point the particle field gets drawn into.
export const focusFX = { active: false, nx: 0, ny: 0, rw: 0.2, rh: 0.15 }

// Aim the particle drain at a DOM element (the video being focused).
// Desktop calls this on hover; mobile calls it for the centered video.
// Pass null to release the field.
export function setFocusTarget(el) {
  if (!el) { focusFX.active = false; return }
  const r = el.getBoundingClientRect()
  if (!r.width || !r.height) { focusFX.active = false; return }
  focusFX.nx = ((r.left + r.width / 2) / window.innerWidth) * 2 - 1
  focusFX.ny = -(((r.top + r.height / 2) / window.innerHeight) * 2 - 1)
  focusFX.rw = r.width / window.innerWidth
  focusFX.rh = r.height / window.innerHeight
  focusFX.active = true
}
