const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

// URLs resolve against the videos/ folder (vite publicDir)
export const SHOWREEL = [
  assetUrl('hero/vfx_ad_1.mp4'),
  assetUrl('hero/vfx_ad_2.mp4'),
  assetUrl('hero/vfx_ad_3.mp4'),
]

export const PROJECTS = [
  { title: 'IRON ENERGY',     meta: 'ENERGY DRINK / 2026',  tag: 'COMMERCIAL',     src: assetUrl('ironenergy_ad.mp4'),                 poster: assetUrl('posters/ironenergy_ad.jpg') },
  { title: 'CHROME VELOCITY', meta: 'AUTOMOTIVE / 2026',    tag: 'CAR FILM',       src: assetUrl('commercial/car_ad.mp4'),             poster: assetUrl('posters/car_ad.jpg') },
  { title: 'SILK & STEAM',    meta: 'HAIRCARE / 2026',      tag: 'BEAUTY SPOT',    src: assetUrl('commercial/shampoo_ad.compressed.mp4'), poster: assetUrl('posters/shampoo_ad.jpg') },
  { title: 'STRIDE THEORY',   meta: 'FOOTWEAR / 2026',      tag: 'SNEAKER DROP',   src: assetUrl('commercial/shoes_Ad.mp4'),           poster: assetUrl('posters/shoes_ad.jpg') },
  { title: 'SKYLINE ESTATES', meta: 'REAL ESTATE / 2026',   tag: 'PROPERTY FILM',  src: assetUrl('commercial/property_ad.mp4'),        poster: assetUrl('posters/property_ad.jpg') },
  { title: 'ROUGE NOIR',      meta: 'COSMETICS / 2026',     tag: 'LIPSTICK',       src: assetUrl('products/lipstick_ad.mp4'),          poster: assetUrl('posters/lipstick_ad.jpg') },
  { title: 'AURUM',           meta: 'JEWELLERY / 2026',     tag: 'NECKLACE',       src: assetUrl('products/necklace_ad.mp4'),          poster: assetUrl('posters/necklace_ad.jpg') },
  { title: 'BLACKOUT LENS',   meta: 'EYEWEAR / 2026',       tag: 'SUNGLASSES',     src: assetUrl('products/sunglasses_ad.mp4'),        poster: assetUrl('posters/sunglasses_ad.jpg') },
  { title: 'TEMPO',           meta: 'HOROLOGY / 2026',      tag: 'WATCH FILM',     src: assetUrl('products/watch_ad.mp4'),             poster: assetUrl('posters/watch_ad.jpg') },
  { title: 'DREAM ENGINE',    meta: 'ANIMATION / 2026',     tag: 'ANIMATED SHORT', src: assetUrl('special/animation_ad.mp4'),          poster: assetUrl('posters/animation_ad.jpg') },
  { title: 'UNSAID LORES',    meta: 'MUSIC FILM / 2026',    tag: 'PERFORMANCE',    src: assetUrl('special/singing_ad.mp4'),            poster: assetUrl('posters/singing_ad.jpg') },
]

// Only the hero background video gates the loader — keep the wait short.
// (SHOWREEL[1] is what the hero plays.)
export const CRITICAL_VIDEOS = [SHOWREEL[1]]

// Poster stills for the work grid — tiny, downloaded by the loader so every
// card shows a thumbnail instantly (the video then streams on demand).
export const POSTERS = PROJECTS.map((p) => p.poster)

// Warmed in the background after entry: the rest of the showreel, then the
// work grid — cached by the time the visitor scrolls to them.
export const SECONDARY_VIDEOS = [
  SHOWREEL[0],
  SHOWREEL[2],
  ...PROJECTS.map((p) => p.src),
]

export const SERVICES = [
  { num: 'i',   title: 'AI FILMS',   desc: 'Cinematic AI-generated films — pre-wedding stories, short films and concept reels rendered in 4K.' },
  { num: 'ii',  title: 'VFX & POST', desc: 'Compositing, upscaling, grade and sound design that takes generated footage to broadcast finish.' },
  { num: 'iii', title: 'BRAND ADS',  desc: 'Scroll-stopping ad films and product visuals for brands that want impossible imagery on real budgets.' },
  { num: 'iv',  title: 'ANIMATION',  desc: 'Story-driven animated series and mythology worlds — built from script to final 4K delivery.' },
  { num: 'v',   title: 'SHORT-FORM', desc: 'High-retention Reels and Shorts engineered for hooks, watch time and millions of organic views.' },
]

export const STATS = [
  { end: 120, suffix: '+',  label: ['FILMS & REELS', 'DELIVERED'] },
  { end: 10,  suffix: 'M+', label: ['VIEWS ACROSS', 'PLATFORMS'] },
  { end: 37,  suffix: 'K',  label: ['COMMUNITY', 'FOLLOWERS'] },
  { end: 4,   suffix: 'K',  label: ['DELIVERY', 'RESOLUTION'] },
]
