import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MediaCard({ item, index, onOpen }) {
  const isVideo = item.type === "video";
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  useEffect(() => {
    const v = videoRef.current;
    if (isVideo && isTouch && v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, [isVideo, isTouch]);

  return (
    <motion.div
      className="item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onClick={onOpen}
    >
      {failed ? (
        <div className="broken">
          <span>{item.title}</span>
          <small>Image not found</small>
        </div>
      ) : isVideo ? (
        <>
          <video
            ref={videoRef}
            src={`${item.src}#t=0.5`}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setFailed(true)}
            onMouseEnter={(e) => !isTouch && e.currentTarget.play()}
            onMouseLeave={(e) => {
              if (isTouch) return;
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0.5;
            }}
          />
          <div className="play-badge">▶</div>
        </>
      ) : (
        <img
          src={item.src}
          alt={item.title}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <div className="overlay">
        <span className="chip">{item.title}</span>
      </div>
    </motion.div>
  );
}