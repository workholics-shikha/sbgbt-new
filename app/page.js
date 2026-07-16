const initiatives = [
  {
    title: "Shiksha aur Margdarshan",
    description:
      "Students ke liye mentorship, awareness sessions aur community-driven learning support.",
    image: "/images/aboutUsCard1-img.png",
    accentClassName: "sb-home-card-pink"
  },
  {
    title: "Gram Vikas Abhiyan",
    description:
      "Village outreach, social campaigns aur sustainable development par focused field work.",
    image: "/images/greenCardImg.png",
    accentClassName: "sb-home-card-green"
  },
  {
    title: "Samajik Sahyog",
    description:
      "Health, relief aur social support ke initiatives jahan volunteers direct impact create karte hain.",
    image: "/images/updatesCardImg.png",
    accentClassName: "sb-home-card-blue"
  }
];

export default function HomePage() {
  return (
    <main className="sb-homepage">
      <section className="sb-home-hero">
        <div className="container py-5 py-lg-6">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <span className="sb-home-eyebrow">SBGBT Community Initiative</span>
              <h1 className="sb-home-title mt-3">
                Samajik badlav ko ground level par action me badalne ki koshish.
              </h1>
              <p className="sb-home-copy mt-3">
                Yeh homepage ab direct Next.js component se render ho rahi hai, isliye
                deploy ke time kisi `legacy-html` folder ya filesystem HTML dependency ki
                zarurat nahi hai.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a className="btn btn-danger rounded-pill px-4 py-2" href="#initiatives">
                  Hamare initiatives
                </a>
                <a
                  className="btn btn-outline-dark rounded-pill px-4 py-2"
                  href="https://www.sbgbteam.com/contact-us"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact page
                </a>
              </div>
              <div className="sb-home-stat-grid mt-4">
                <div className="sb-home-stat-card">
                  <strong>Community</strong>
                  <span>Grassroots engagement aur volunteer participation</span>
                </div>
                <div className="sb-home-stat-card">
                  <strong>Education</strong>
                  <span>Learning, awareness aur youth motivation programs</span>
                </div>
                <div className="sb-home-stat-card">
                  <strong>Outreach</strong>
                  <span>Campaigns, events aur social impact activities</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sb-home-hero-stack">
                <div className="sb-home-hero-card sb-home-hero-card-primary">
                  <img src="/images/banner1.png" alt="SBGBT banner" />
                </div>
                <div className="sb-home-hero-card sb-home-hero-card-secondary">
                  <img src="/images/banner2.png" alt="SBGBT initiative" />
                </div>
                <div className="sb-home-hero-card sb-home-hero-card-accent">
                  <img src="/images/banner3.png" alt="SBGBT community work" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="initiatives" className="container py-5">
        <div className="sb-home-section-heading">
          <span className="sb-home-section-label">Focus Areas</span>
          <h2>Community work ko clear, modern homepage structure me present kiya gaya hai.</h2>
        </div>
        <div className="row g-4 mt-1">
          {initiatives.map((initiative) => (
            <div className="col-md-6 col-xl-4" key={initiative.title}>
              <article className={`sb-home-initiative-card ${initiative.accentClassName}`}>
                <div className="sb-home-initiative-image">
                  <img src={initiative.image} alt={initiative.title} />
                </div>
                <div className="p-4">
                  <h3>{initiative.title}</h3>
                  <p>{initiative.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="sb-home-highlight">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <img
                className="sb-home-highlight-image"
                src="/images/csrPartnershipImg.png"
                alt="CSR partnership"
              />
            </div>
            <div className="col-lg-7">
              <span className="sb-home-section-label">Why this fix matters</span>
              <h2 className="mt-3">Homepage ab build-time missing files ki wajah se blank nahi hogi.</h2>
              <p className="mt-3">
                Pehle homepage `legacy-html/index.html` ya `Home.html` se body markup read
                karti thi. Ab page direct React JSX se render ho raha hai, isliye static
                export ke baad `out/index.html` me real homepage content generate hota hai.
              </p>
              <div className="sb-home-checklist mt-4">
                <div><i className="fa-solid fa-check"></i> No filesystem HTML dependency</div>
                <div><i className="fa-solid fa-check"></i> Static export compatible</div>
                <div><i className="fa-solid fa-check"></i> Render Static Site friendly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="sb-home-section-heading">
          <span className="sb-home-section-label">Media Snapshot</span>
          <h2>Visual highlights jo public assets se direct serve hote hain.</h2>
        </div>
        <div className="row g-4 mt-1">
          {["gallery1.png", "gallery2.png", "gallery3.png"].map((imageName, index) => (
            <div className="col-md-4" key={imageName}>
              <figure className="sb-home-gallery-card">
                <img src={`/images/${imageName}`} alt={`Gallery highlight ${index + 1}`} />
              </figure>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
