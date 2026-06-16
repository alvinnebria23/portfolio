import { useEffect, useState } from "react";
import avatar from "./assets/avatar.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #0A0F1E;
    color: #F0EDE6;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  .pf-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10, 15, 30, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }

  .pf-nav-brand {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #00D4FF;
    letter-spacing: -0.5px;
  }

  .pf-nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .pf-nav-links button {
    background: none;
    border: none;
    color: #8892A4;
    font-size: 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0;
  }

  .pf-nav-links button:hover { color: #F0EDE6; }

  .pf-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .pf-hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .pf-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .pf-hero-content {
    max-width: 800px;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .pf-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #00D4FF;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  .pf-hero-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -3px;
    color: #F0EDE6;
    margin-bottom: 1rem;
  }

  .pf-cursor {
    display: inline-block;
    width: 4px;
    height: 0.85em;
    background: #00D4FF;
    margin-left: 4px;
    vertical-align: middle;
    animation: pf-blink 1s step-end infinite;
  }

  @keyframes pf-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .pf-hero-tagline {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    font-weight: 300;
    color: #8892A4;
    margin-bottom: 2.5rem;
    letter-spacing: 0.5px;
  }

  .pf-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .pf-chip {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    padding: 6px 16px;
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 100px;
    color: #8892A4;
    background: rgba(0, 212, 255, 0.04);
  }

  .pf-chip.pf-chip-active {
    color: #00D4FF;
    border-color: rgba(0, 212, 255, 0.5);
    background: rgba(0, 212, 255, 0.08);
  }

  .pf-btn {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 36px;
    background: #00D4FF;
    color: #0A0F1E;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: background 0.2s, transform 0.2s;
  }

  .pf-btn:hover {
    background: #33DDFF;
    transform: translateY(-1px);
  }

  .pf-section {
    padding: 6rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .pf-section-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #00D4FF;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .pf-section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #F0EDE6;
    letter-spacing: -1.5px;
    margin-bottom: 3rem;
    line-height: 1.1;
  }

  .pf-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .pf-card {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 1.75rem;
    transition: border-color 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
  }

  .pf-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00D4FF, transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .pf-card:hover {
    border-color: rgba(0, 212, 255, 0.2);
    transform: translateY(-2px);
  }

  .pf-card:hover::before { opacity: 1; }

  .pf-project-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #00D4FF;
    opacity: 0.7;
    margin-bottom: 0.75rem;
  }

  .pf-project-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #F0EDE6;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  .pf-project-desc {
    font-size: 14px;
    color: #8892A4;
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .pf-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pf-tech {
    font-size: 12px;
    font-family: 'Space Grotesk', sans-serif;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    color: #8892A4;
  }

  .pf-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .pf-skill-group {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 1.25rem;
  }

  .pf-skill-group-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #00D4FF;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .pf-skill-item {
    font-size: 14px;
    color: #8892A4;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    font-family: 'Space Grotesk', sans-serif;
  }

  .pf-skill-item:last-child { border-bottom: none; }

  .pf-contact-box {
    background: #111827;
    border: 1px solid rgba(0, 212, 255, 0.15);
    border-radius: 12px;
    padding: 2.5rem;
    text-align: center;
    max-width: 560px;
    margin: 0 auto;
  }

  .pf-contact-box p {
    color: #8892A4;
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  .pf-contact-email {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: #00D4FF;
    text-decoration: none;
    font-weight: 500;
  }

  .pf-contact-email:hover { text-decoration: underline; }

  .pf-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding: 2rem;
    text-align: center;
    color: #8892A4;
    font-size: 13px;
    font-family: 'Space Grotesk', sans-serif;
    max-width: 1000px;
    margin: 0 auto;
  }

  .pf-section-center { text-align: center; }

  @media (max-width: 600px) {
    .pf-nav-links { gap: 1rem; }
    .pf-hero-name { letter-spacing: -1px; }
    .pf-section { padding: 4rem 1.25rem; }
  }
`;

const projects = [
  {
    tag: "E-Commerce",
    title: "Shopify CMS Platform",
    desc: "Built a React frontend with an Express.js backend for a Shopify app with a drag-and-drop page builder, enabling store owners to fully customize their storefront with rich media such as product images and branded backgrounds. Utilized the Shopify GraphQL Admin API to retrieve, save, and publish checkout pages, and integrated an autofill system that populates returning customer details at checkout, reducing friction and improving conversion rates. Utilized Sequelize ORM for efficient and structured database management.",
    techs: ["React", "Express.js", "GraphQL","Sequelize ORM", "Shopify API"],
  },
  {
    tag: "CRM System",
    title: "Java JSP CRM Web App",
    desc: "Maintained and enhanced a Java JSP-based CRM web application, optimizing performance, scalability, and overall system reliability for long-running enterprise operations. Integrated Looker Studio dashboards sourced from BigQuery, featuring sales analytical charts, ROI analytical graphs, and survey form statistics to provide actionable business insights.",
    techs: ["Java", "JSP", "Seasar2", "Looker Studio", "BigQuery"],
  },
  {
    tag: "Cloud / Backend",
    title: "AWS Serverless API Platform",
    desc: "Migrated a Java Seasar2-based API to Python and deployed it on AWS Lambda, redesigning the core algorithm and optimizing database tables and indexing to achieve up to 5x improvement in processing speed. Leveraged serverless services — SQS, Lambda, and CloudWatch — with CodePipeline for CI/CD to ensure automated and reliable deployments.",
    techs: ["Python", "AWS Lambda", "SQS", "CodePipeline"],
  },
  {
    tag: "Messaging",
    title: "SMS Messaging Web App",
    desc: "Designed and developed a Spring Boot-based SMS messaging platform supporting bulk SMS sending via CSV file uploads, integrating multiple third-party aggregator APIs including Rakuten CPaaS, BytePlus API, and China Mobile API to enable reliable and automated message delivery at scale.",
    techs: ["Spring Boot", "Java", "Messaging API"],
  },
  {
    tag: "Personal Project · Mobile App",
    title: "Sapers — Shopee Affiliate Analytics App",
    desc: "Designed and developed Sapers, a cross-platform mobile app previously published on the App Store and Google Play, integrating the Shopee Affiliate Open API to consolidate and analyze affiliate link performance. Features include earnings filtering by date range, overall income summary, most-clicked link rankings, and peak click time insights — giving affiliates a clear view of their campaign performance in one place. The Express.js backend is deployed on an AWS EC2 instance for reliable and scalable hosting.",
    techs: ["React Native", "Express.js", "Shopee Affiliate API", "AWS EC2", "App Store", "Google Play"],
  },
];

const skillGroups = [
  { title: "Frontend", items: ["React", "JavaScript / TypeScript", "HTML / CSS"] },
  { title: "Backend", items: ["Node.js / Express.js", "Java / Spring Boot", "Python"] },
  { title: "Cloud & DevOps", items: ["AWS Lambda", "SQS / CloudWatch", "CodePipeline / CI-CD"] },
  { title: "Databases & Tools", items: ["SQL / Relational DBs", "REST APIs", "Git / Version Control"] },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function App() {
  const [, setTick] = useState(0);

  // Re-render every second to keep cursor blinking (handled by CSS, this is just insurance)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* Nav */}
      <nav className="pf-nav">
        <div className="pf-nav-brand">AN</div>
        <ul className="pf-nav-links">
          <li><button onClick={() => scrollTo("projects")}>Projects</button></li>
          <li><button onClick={() => scrollTo("skills")}>Skills</button></li>
          <li><button onClick={() => scrollTo("contact")}>Contact</button></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="pf-hero">
        <div className="pf-hero-bg" />
        <div className="pf-hero-grid" />
        <div className="pf-hero-content">
          <img
            src={avatar}
            alt="Alvin"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(0, 212, 255, 0.4)",
              marginBottom: "1.5rem",
            }}
          />

          <p className="pf-eyebrow">Full-Stack Developer</p>
          <h1 className="pf-hero-name">
            Alvin Nebria<span className="pf-cursor" />
          </h1>
          <p className="pf-hero-tagline">
            Building scalable web applications &amp; cloud infrastructure
          </p>
          <div className="pf-chips">
            {["React", "Node.js", "Java", "Python", "AWS", "Spring Boot"].map((s) => (
              <span
                key={s}
                className={`pf-chip${["React", "Node.js", "AWS"].includes(s) ? " pf-chip-active" : ""}`}
              >
                {s}
              </span>
            ))}
          </div>
          <button className="pf-btn" onClick={() => scrollTo("projects")}>
            View My Work
          </button>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="pf-section">
        <p className="pf-section-label">Selected Work</p>
        <h2 className="pf-section-title">Projects</h2>
        <div className="pf-projects-grid">
          {projects.map((p) => (
            <div key={p.title} className="pf-card">
              <span className="pf-project-tag">{p.tag}</span>
              <h3 className="pf-project-title">{p.title}</h3>
              <p className="pf-project-desc">{p.desc}</p>
              <div className="pf-techs">
                {p.techs.map((t) => (
                  <span key={t} className="pf-tech">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="pf-section">
        <p className="pf-section-label">Expertise</p>
        <h2 className="pf-section-title">Skills</h2>
        <div className="pf-skills-grid">
          {skillGroups.map((g) => (
            <div key={g.title} className="pf-skill-group">
              <p className="pf-skill-group-title">{g.title}</p>
              {g.items.map((item) => (
                <div key={item} className="pf-skill-item">{item}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="pf-section">
        <p className="pf-section-label pf-section-center">Get In Touch</p>
        <h2 className="pf-section-title pf-section-center">Let's work together</h2>
        <div className="pf-contact-box">
          <p>
            Open to new opportunities, collaborations, and interesting projects.
            Feel free to reach out — I'll get back to you promptly.
          </p>
          <a href="mailto:nebriaalvin23@gmail.com" className="pf-contact-email">
            nebriaalvin23@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="pf-footer">
        <p>Designed &amp; built by Alvin Nebria — 2025</p>
      </footer>
    </>
  );
}
