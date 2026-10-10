import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Lightbox({ items, index, onClose, onChange }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onChange]);

  const mediaStyle = {
    maxWidth: "100%",
    maxHeight: "58vh",
    borderRadius: 26,
    boxShadow: "0 30px 80px rgba(0,0,0,.15)",
    display: "block",
  };

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scrollable area (click empty space to close) */}
      <div
        data-lenis-prevent
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          display: "flex",
          padding: "70px 20px 50px",
        }}
      >
        <motion.div
          key={item.id}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(92vw, 760px)",
            maxWidth: "none",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {item.type === "video" ? (
            <video src={item.src} controls autoPlay style={mediaStyle} />
          ) : (
            <img src={item.src} alt={item.title} style={mediaStyle} />
          )}

          {/* Description card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            style={{
              position: "relative",
              width: "100%",
              marginTop: 18,
              padding: "22px 26px 22px 30px",
              background: "rgba(255,255,255,.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid #eeebe7",
              borderRadius: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,.1)",
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 6,
                background: "linear-gradient(180deg, #ffc2ae, #f29a80)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "1.5rem",
                  color: "#2b2826",
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              {/* <span
                style={{
                  flexShrink: 0,
                  padding: "5px 14px",
                  borderRadius: 30,
                  background: "#f8f6f4",
                  border: "1px solid #eeebe7",
                  fontSize: ".8rem",
                  color: "#8f8a85",
                }}
              >
                {index + 1} / {items.length}
              </span> */}
            </div>

            {item.description && (
              <p
                style={{
                  margin: "14px 0 0",
                  fontSize: ".98rem",
                  lineHeight: 1.7,
                  color: "#5d5753",
                  whiteSpace: "pre-line",
                }}
              >
                {item.description}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Buttons stay fixed on screen */}
      <button className="lb-btn lb-close" onClick={onClose}>✕</button>
      <button
        className="lb-btn lb-prev"
        onClick={() => onChange((index - 1 + items.length) % items.length)}
      >
        ‹
      </button>
      <button
        className="lb-btn lb-next"
        onClick={() => onChange((index + 1) % items.length)}
      >
        ›
      </button>
    </motion.div>
  );
}