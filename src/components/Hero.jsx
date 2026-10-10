import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["Welcome", "to", "My", "Page,", "Enjoy"];

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section className="hero-full" ref={ref}>
      <motion.div className="hero-media" style={{ y: mediaY, scale, opacity: 1 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/photos/hero.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-shade" />

      <motion.div className="hero-content" style={{ y: textY, opacity: fade }}>
        <h1>
          {words.map((w, i) => (
            <span className="mask" key={i}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              >
             {w === "Cooked," || w === "Loved" ? <em>{w}</em> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <b>Photos and videos of the dishes I cook, made with love and shared with you.</b>
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.a
            href="#gallery"
            className="btn primary"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Gallery
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="scroll-hint">
        Scroll <i />
      </div>
    </section>
  );
}