import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MediaCard({ item, index, onOpen }) {
  const isVideo = item.type === "video";
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 900px)").matches;

  useEffect(() => {
    const v = videoRef.current;
    if (isVideo && isTouch && v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, [isVideo, isTouch]);

  // Phone: simple fade-in that always runs (scroll triggers can fail on iPhones)
  // PC: the original scroll animation and hover tilt
  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: (index % 4) * 0.06, ease: "easeOut" },
      }
    : {
        initial: { opacity: 0, y: 60, scale: 0.94 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" },
        whileHover: { y: -10, rotate: index % 2 === 0 ? 0.8 : -0.8 },
      };

  return (
    <motion.div
      className="item"
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onOpen}
      {...motionProps}
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