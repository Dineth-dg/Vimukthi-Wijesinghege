import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { about } from "../data/about";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function About() {
  return (
    <main className="about">
      <section className="about-hero">
        <motion.div
          className="about-photo"
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <img src={about.photo} alt={about.name} />
        </motion.div>

        <div className="about-text">
          <motion.span
            className="about-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✨ About me
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            I'm {about.name.split(" ")[0]},<br />
            <em>{about.role}</em>
          </motion.h1>

          <motion.p
            className="about-story"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {about.story}
          </motion.p>

          <motion.div
            className="about-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            <Link to="/#gallery" className="btn primary">View my gallery</Link>
            <a
              href={about.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn outline"
            >
              LinkedIn ↗
            </a>
          </motion.div>
        </div>
      </section>

      <motion.section className="about-stats" {...reveal}>
        {about.stats.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </motion.section>

      <motion.section className="about-block" {...reveal}>
        <h2>What I love to cook</h2>
        <div className="chips">
          {about.skills.map((s) => (
            <span className="skill-chip" key={s}>{s}</span>
          ))}
        </div>
      </motion.section>

      <motion.section className="about-block" {...reveal}>
        <h2>My journey</h2>
        <div className="timeline">
          {about.journey.map((j) => (
            <div className="tl-item" key={j.year + j.title}>
              <span className="tl-year">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}