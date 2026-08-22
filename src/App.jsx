import IntroTitleCard from "./components/IntroTitleCard.jsx";
import CursorDot from "./components/CursorDot.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Gallery from "./components/Gallery.jsx";
import Reels from "./components/Reels.jsx";
import Process from "./components/Process.jsx";
import Pricing from "./components/Pricing.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import site from "./data/site.js";

export default function App() {
  return (
    <>
      <IntroTitleCard />
      <div className="grain" aria-hidden="true" />
      <CursorDot />
      <Nav />
      <main>
        <Hero />
        <Marquee tone="gold" />
        <Gallery />
        <Reels />
        <Process />
        <Pricing />
        <About />
        <Marquee
          tone="navy"
          items={["Follow along on Instagram", `@${site.instagramHandle}`, "Commissions open now"]}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
