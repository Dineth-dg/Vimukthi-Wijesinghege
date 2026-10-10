import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { media } from "../data/media";
import MediaCard from "./MediaCard";
import Lightbox from "./Lightbox";

const filters = ["All", "Photos", "Videos"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const items = media.filter(
    (m) =>
      filter === "All" ||
      (filter === "Photos" && m.type === "image") ||
      (filter === "Videos" && m.type === "video")
  );

  return (
    <section id="gallery">
      <div className="gallery-head">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Food Gallery
        </motion.h2>
        <p>{media.length} dishes cooked and counting</p>
      </div>

      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {filter === f && (
              <motion.div
                layoutId="pill"
                className="pill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span>{f}</span>
          </button>
        ))}
      </div>

      <div className="gallery">
        <AnimatePresence>
          {items.map((item, i) => (
            <MediaCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setSelected(i)}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            items={items}
            index={selected}
            onClose={() => setSelected(null)}
            onChange={setSelected}
          />
        )}
      </AnimatePresence>
    </section>
  );
}