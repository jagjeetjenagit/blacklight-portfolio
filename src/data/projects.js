const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

// URLs resolve against the videos/ folder (vite publicDir)
export const SHOWREEL = [
  assetUrl('hero/vfx_ad_1.mp4'),
  assetUrl('hero/vfx_ad_2.mp4'),
  assetUrl('hero/vfx_ad_3.mp4'),
]

export const PROJECTS = [
  { title: 'IRON ENERGY',     meta: 'ENERGY DRINK / 2026',  tag: 'COMMERCIAL',     src: assetUrl('ironenergy_ad.mp4') },
  { title: 'CHROME VELOCITY', meta: 'AUTOMOTIVE / 2026',    tag: 'CAR FILM',       src: assetUrl('commercial/car_ad.mp4') },
  { title: 'SILK & STEAM',    meta: 'HAIRCARE / 2026',      tag: 'BEAUTY SPOT',    src: assetUrl('commercial/shampoo_ad.compressed.mp4') },
  { title: 'STRIDE THEORY',   meta: 'FOOTWEAR / 2026',      tag: 'SNEAKER DROP',   src: assetUrl('commercial/shoes_Ad.mp4') },
  { title: 'SKYLINE ESTATES', meta: 'REAL ESTATE / 2026',   tag: 'PROPERTY FILM',  src: assetUrl('commercial/property_ad.mp4') },
  { title: 'ROUGE NOIR',      meta: 'COSMETICS / 2026',     tag: 'LIPSTICK',       src: assetUrl('products/lipstick_ad.mp4') },
  { title: 'AURUM',           meta: 'JEWELLERY / 2026',     tag: 'NECKLACE',       src: assetUrl('products/necklace_ad.mp4') },
  { title: 'BLACKOUT LENS',   meta: 'EYEWEAR / 2026',       tag: 'SUNGLASSES',     src: assetUrl('products/sunglasses_ad.mp4') },
  { title: 'TEMPO',           meta: 'HOROLOGY / 2026',      tag: 'WATCH FILM',     src: assetUrl('products/watch_ad.mp4') },
  { title: 'DREAM ENGINE',    meta: 'ANIMATION / 2026',     tag: 'ANIMATED SHORT', src: assetUrl('special/animation_ad.mp4') },
  { title: 'UNSAID LORES',    meta: 'MUSIC FILM / 2026',    tag: 'PERFORMANCE',    src: assetUrl('special/singing_ad.mp4') },
]

// Videos visible the moment the site opens (hero background + showreel).
// The loader downloads these before revealing the page.
export const CRITICAL_VIDEOS = SHOWREEL

// Everything else, warmed in the background after entry so the work grid
// is cached by the time the visitor scrolls to it.
export const SECONDARY_VIDEOS = PROJECTS.map((p) => p.src)

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
