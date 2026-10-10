import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const text =
  "Every dish has a story. This is where I keep mine, from the first chop to the last bite, every plate cooked with love and shared with you.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="st-word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function ScrollText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ");

  return (
    <section className="scroll-text" ref={ref}>
      <p>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>
          );
        })}
      </p>
    </section>
  );
}