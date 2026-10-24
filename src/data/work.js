// All video files are served from zigsmotion.com. To self-host, copy the
// showcase/ folder into public/showcase and set MEDIA = "./showcase/".
export const MEDIA = "https://zigsmotion.com/showcase/";

export const INSTAGRAM = "https://www.instagram.com/blacklightmotion/";
export const INSTAGRAM_DM = "https://ig.me/m/blacklightmotion";

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "3d", label: "Pixar-style 3D" },
  { id: "2d", label: "2D animation" },
  { id: "ugc", label: "UGC" },
  { id: "realestate", label: "Real estate" },
  { id: "ads", label: "Ads" },
  { id: "vfx", label: "VFX" },
  { id: "films", label: "Films & music" },
];

export const SHOWREEL = { id: "sizzle", title: "Showreel", kind: "Blacklight Motion", ratio: "16:9", full: "sizzle.mp4" };

// Blacklight Motion reels on Instagram (play in Instagram's embedded player).
// contain: poster is letterboxed, show it whole instead of cropping.
const reel = (id, title, kind, tags, contain = false, account = "bl") => ({
  id: `ig-${id}`,
  instagram: id,
  title,
  kind,
  tags,
  ratio: "9:16",
  poster: `https://zigsmotion.com/brands/${account}/${id}.jpg`,
  noPreview: true,
  contain,
});

const REELS = [
  reel("DYZBgNKszfB", "Versace Bright Crystal", "AI UGC ad", ["ugc", "ads"]),
  reel("DYV9uDzI0c8", "Hyper-realistic AI reels", "AI influencer", ["ugc"]),
  reel("DcS-Vb8SV1l", "Empty plot to furnished flat", "Real estate", ["realestate", "ads"]),
  reel("DcS9QkLy7h9", "A full walkthrough from a layout", "Real estate", ["realestate", "ads"]),
  reel("DYZ-k4fMjWN", "AI ads on a tight budget", "Brand ads", ["ads"]),
  reel("DYbbTWZMbX-", "A red saree, 22 carats of gold", "Bridal ad", ["ads"]),
  reel("Db7enN9S1jY", "EaseMyPrint · product film", "Client", ["ads"]),
  reel("Db_MAjhyCsB", "EaseMyPrint · personalised gifts", "Client", ["ads"]),
  reel("DYVwktKIdOu", "Your love story, like a film", "Couple film", ["films"]),
  reel("DYTg3Z2o3JG", "From lifeless visuals to cinema", "Showreel", ["vfx"], true),
  reel("Dbc6P22SPyP", "AI film moments", "Showreel", ["films"], true),
  reel("Db-Xv61yTGO", "Hanuman ji · strength and faith", "Devotional", ["films"], true),
];

export const LUCKY_NIKKI = {
  name: "Lucky & Nikki World",
  handle: "@luckyandnikkiworld",
  href: "https://www.instagram.com/luckyandnikkiworld",
  logo: "https://zigsmotion.com/brands/lucky-nikki.jpg",
  stat: "40M+",
  statLabel: "views",
  blurb: "Our own Pixar-style family universe on Instagram: Lucky, Nikki, Chotu and Mumma. A new episode every week, written, voiced and animated by us.",
};

const ln = (id, title, stat) => reel(id, title, stat, ["3d", "animation"], false, "ln");

const LUCKY_NIKKI_EPISODES = [
  ln("Dd2M8lazkln", "EP-19 · Papa was late for office", "10M+ views"),
  ln("Dc0tdlAzScO", "EP-00 · Meet the boss", "8M+ views"),
  ln("DeixF6fzLnd", "EP-29 · Papa just wanted to go to office", "5.6M views"),
  ln("DerHBADzlbN", "EP-30 · You're a good driver, Mumma!", "3M views"),
  ln("DefNx9xzaex", "EP-28 · He woke up everyone", "1.4M views"),
  ln("DcteQoxzfL2", "EP-03 · Papa got sick", "98K likes"),
  ln("DduWf6cTMef", "EP-17 · Papa came home tired", "73K likes"),
  ln("Dd4wmshTcav", "EP-20 · She paid Papa to stay home", "44K likes"),
];

// full: mp4 file, hls: HLS stream, youtube: video id, instagram: reel id
export const WORK = [
  { id: "necklace", title: "Diamond necklace", kind: "Product ad", tags: ["ads"], ratio: "16:9", duration: 44, full: "necklace.mp4" },
  { id: "perfume-ugc", title: "Perfume review", kind: "UGC ad", tags: ["ugc"], ratio: "9:16", duration: 8, full: "perfume-ugc.mp4" },
  { id: "vfx-rider", title: "Dragon chase", kind: "VFX", tags: ["vfx"], ratio: "16:9", duration: 15, full: "vfx-rider.mp4" },
  { id: "watch", title: "Skeleton watch", kind: "Luxury ad", tags: ["ads"], ratio: "16:9", duration: 30, full: "watch.mp4" },
  {
    id: "oh-mere-ranjhana",
    title: "Oh Mere Ranjhana",
    kind: "Music video",
    tags: ["films"],
    ratio: "16:9",
    duration: 526,
    hls: "oh-mere-ranjhana/index.m3u8",
    badge: "100% AI-generated",
    blurb:
      "A complete 8½-minute music video made entirely with AI. No cameras, no actors, no set: snowbound mountain roads, an army camp and a love story, cut to the song and graded like a feature film.",
    points: ["Photoreal faces, skin and light", "Every shot generated, nothing filmed", "Full-length, edited to the song and colour-graded"],
  },
  { id: "lipstick", title: "Velvet red", kind: "Beauty ad", tags: ["ads"], ratio: "16:9", duration: 37, full: "lipstick.mp4" },
  { id: "production-ugc", title: "Creator testimonial", kind: "UGC ad", tags: ["ugc"], ratio: "9:16", duration: 34, full: "production-ugc.mp4" },
  { id: "iron-energy", title: "Iron Energy", kind: "VFX ad", tags: ["ads", "vfx"], ratio: "16:9", duration: 21, full: "iron-energy.mp4" },
  { id: "animation-ad", title: "The Missing Smile", kind: "3D animation ad", tags: ["ads", "3d", "animation"], ratio: "16:9", duration: 42, full: "animation-ad.mp4" },
  { id: "pre-wedding", title: "Sunset to forever", kind: "Pre-wedding film", tags: ["films"], ratio: "16:9", duration: 40, full: "pre-wedding.mp4" },
  { id: "cricket", title: "Match night", kind: "Sports ad", tags: ["ads"], ratio: "16:9", duration: 80, full: "cricket.mp4" },
  { id: "pahadi-girl", title: "Little Pahadi", kind: "Pixar-style short", tags: ["3d", "animation"], ratio: "9:16", duration: 20, full: "pahadi-girl.mp4" },
  { id: "sample-sequence", title: "The Drowned Temple", kind: "Cinematic", tags: ["vfx", "films"], ratio: "16:9", duration: 26, full: "sample-sequence.mp4" },
  {
    id: "couple-love",
    title: "A Love Story",
    kind: "Couple film",
    tags: ["films"],
    ratio: "16:9",
    duration: 225,
    hls: "couple-love/index.m3u8",
    badge: "AI love story",
    blurb:
      "A couple's love story, told like a film: city nights, a first close-up and a dance under the stage lights. Every shot generated with AI and cut to music.",
    points: ["Their faces, true in every shot", "Cinematic sets and stage lights, no shoot", "4K source, edited to music"],
  },
  { id: "sunglasses", title: "City shades", kind: "Product ad", tags: ["ads"], ratio: "16:9", duration: 40, full: "sunglasses.mp4" },
  { id: "khana-kha-liya", title: "Khana Kha Liya?", kind: "2D vector reel", tags: ["2d", "animation"], ratio: "9:16", duration: 26, full: "khana-kha-liya.mp4" },
  { id: "desi-transformers", title: "Desi Transformers", kind: "Short film", tags: ["films", "vfx"], ratio: "16:9", duration: 418, full: "desi-transformers.mp4" },
  { id: "property", title: "The residence", kind: "Real-estate ad", tags: ["realestate", "ads"], ratio: "16:9", duration: 31, full: "property.mp4" },
  { id: "bairan", title: "Bairan — her reply", kind: "Music video", tags: ["films"], ratio: "16:9", duration: 133, youtube: "HJ4ryCovIBk" },
  { id: "shampoo", title: "Shampoo", kind: "Product ad", tags: ["ads"], ratio: "16:9", duration: 41, full: "shampoo.mp4" },
  { id: "jai-vijay", title: "Jai Vijay — Ravan Asal Mein Kaun Tha?", kind: "2D animated episode", tags: ["2d", "animation"], ratio: "16:9", duration: 332, youtube: "16m6IBNdtZg", poster: "https://i.ytimg.com/vi/16m6IBNdtZg/maxresdefault.jpg" },
  { id: "vfx-rider-2", title: "Rider of the falls", kind: "VFX", tags: ["vfx"], ratio: "16:9", duration: 15, full: "vfx-rider-2.mp4" },
  { id: "builder", title: "White villas", kind: "Real-estate ad", tags: ["realestate", "ads"], ratio: "16:9", duration: 42, full: "builder.mp4" },
  { id: "ajgar", title: "Yeh Pyaar Nahi, Jaal Tha", kind: "2D vector reel", tags: ["2d", "animation"], ratio: "9:16", duration: 63, full: "ajgar.mp4" },
  { id: "shoes", title: "Shoes", kind: "Product ad", tags: ["ads"], ratio: "16:9", duration: 25, full: "shoes.mp4" },
  { id: "narsimha", title: "Narsimha", kind: "Short film", tags: ["films"], ratio: "16:9", duration: 70, youtube: "9YObYlArIXM", poster: "https://i.ytimg.com/vi/9YObYlArIXM/maxresdefault.jpg", noPreview: true },
  { id: "singing", title: "Midnight song", kind: "Music", tags: ["films"], ratio: "16:9", duration: 13, full: "singing.mp4" },
  ...REELS,
  ...LUCKY_NIKKI_EPISODES,
];

const byId = (id) => WORK.find((w) => w.id === id);

export const HERO_BG = byId("necklace");
export const HERO_PHONE = byId("pahadi-girl");
export const FEATURED = [byId("oh-mere-ranjhana"), byId("couple-love")];

export const posterOf = (item) => item.poster || `${MEDIA}${item.id}.jpg`;
export const previewOf = (item) => `${MEDIA}${item.id}-preview.mp4`;
export const formatDuration = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
