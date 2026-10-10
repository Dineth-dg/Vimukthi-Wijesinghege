import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import ScrollText from "../components/ScrollText";
import Marquee from "../components/Marquee";
import Gallery from "../components/Gallery";

export default function Home() {
  const { hash, key } = useLocation();

  // Scroll to #gallery when coming from the navbar or another page
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [hash, key]);

  return (
    <>
      <Hero />
      <ScrollText />
      <Marquee />
      <Gallery />
    </>
  );
}