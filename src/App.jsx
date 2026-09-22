import IntroTitleCard from "./components/IntroTitleCard.jsx";
import CursorDot from "./components/CursorDot.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import StatsBar from "./components/StatsBar.jsx";
import BeforeAfter from "./components/BeforeAfter.jsx";
import Marquee from "./components/Marquee.jsx";
import Gallery from "./components/Gallery.jsx";
import Reels from "./components/Reels.jsx";
import Process from "./components/Process.jsx";
import Pricing from "./components/Pricing.jsx";
import Testimonials from "./components/Testimonials.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import site from "./data/site.js";

export default function App() {
  return (
    <>
      <IntroTitleCard />
      <div className="grain" aria-hidden="true" />
      <CursorDot />
      <Nav />
      <WhatsAppButton />
      <main>
        <Hero />
        <StatsBar />
        <Marquee tone="gold" />
        <BeforeAfter />
        <Gallery />
        <Reels />
        <Process />
        <Pricing />
        <Testimonials />
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
