import { useState, useEffect } from "react";
// IntroTitleCard can be re-enabled later when ready:
// import IntroTitleCard from "./components/IntroTitleCard.jsx";
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
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import TornDivider from "./components/TornDivider.jsx";
import PhotoGuideModal from "./components/PhotoGuideModal.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import BookingModal from "./components/booking/BookingModal.jsx";
import site from "./data/site.js";

export default function App() {
  const [isPhotoGuideOpen, setIsPhotoGuideOpen] = useState(false);

  useEffect(() => {
    function handleOpenGuide() {
      setIsPhotoGuideOpen(true);
    }
    window.addEventListener("dkarts:open_photo_guide", handleOpenGuide);
    return () => window.removeEventListener("dkarts:open_photo_guide", handleOpenGuide);
  }, []);

  return (
    <BookingProvider>
      {/* Intro video overlay temporarily removed; can be re-enabled later: <IntroTitleCard /> */}
      <div className="grain" aria-hidden="true" />
      <CursorDot />
      <Nav />
      <WhatsAppButton />
      <main>
        <Hero />
        <StatsBar />
        <Marquee tone="gold" />

        {/* Torn Deckled Paper transition: Dark Studio -> Warm Drawing Paper */}
        <TornDivider from="dark" to="light" darkColor="#100d0a" paperColor="#f5efe4" />

        <BeforeAfter />
        <Gallery />

        {/* Torn Deckled Paper transition: Warm Drawing Paper -> Dark Reels Cinema */}
        <TornDivider from="light" to="dark" paperColor="#f5efe4" darkColor="#100c09" />

        <Reels />

        {/* Torn Deckled Paper transition: Dark Reels Cinema -> Warm Process Studio */}
        <TornDivider from="dark" to="light" darkColor="#100c09" paperColor="#F8F0E5" />

        <Process />
        <Pricing onOpenPhotoGuide={() => setIsPhotoGuideOpen(true)} />
        <Testimonials />
        <About />
        <Faq onOpenPhotoGuide={() => setIsPhotoGuideOpen(true)} />

        <Marquee
          tone="navy"
          items={["Follow along on Instagram", `@${site.instagramHandle}`, "Commissions open now"]}
        />
        <Contact />
      </main>
      <Footer />
      <BookingModal />
      <PhotoGuideModal
        isOpen={isPhotoGuideOpen}
        onClose={() => setIsPhotoGuideOpen(false)}
      />
    </BookingProvider>
  );
}
