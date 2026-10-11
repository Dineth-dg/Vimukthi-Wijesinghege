import { Link, NavLink } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Link to="/" className="logo">
          <span className="logo-full">Vimukthi Wijesinghege</span>
          <span className="logo-short">Vimukthi</span>
        </Link>
        <Link to="/#gallery" className="nav-btn">View Gallery</Link>
        <NavLink
          to="/about"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          About
        </NavLink>
      </motion.nav>
    </>
  );
}