// Shared FX state, mutated per-frame — kept outside React to avoid re-renders.
// focusFX.active is true while the pointer is over any video surface;
// nx/ny hold that video's center in normalized device coords (-1..1),
// the point the particle field gets drawn into.
export const focusFX = { active: false, nx: 0, ny: 0, rw: 0.2, rh: 0.15 }
