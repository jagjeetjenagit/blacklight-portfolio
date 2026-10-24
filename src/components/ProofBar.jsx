const BRANDS = [
  { name: "Lucky & Nikki World", logo: "https://zigsmotion.com/brands/lucky-nikki.jpg" },
  { name: "IceHill Music", logo: "https://zigsmotion.com/brands/icehill-music.jpg" },
  { name: "IceHill Bhakti", logo: "https://zigsmotion.com/brands/icehill-bhakti.jpg" },
  { name: "EaseMyPrint" },
  { name: "Asli Soch TV" },
];

export default function ProofBar() {
  return (
    <section className="proof wrap" aria-label="Brands and channels we have made videos for">
      <p className="proof-label">Videos made for brands &amp; channels</p>
      <ul className="proof-list">
        {BRANDS.map((b) => (
          <li key={b.name}>
            {b.logo ? <img src={b.logo} alt="" width="34" height="34" loading="lazy" /> : <span className="proof-dot" />}
            {b.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
