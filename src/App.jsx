import { useState } from "react";
import { useReveal } from "./hooks.js";
import { serviceFor } from "./data/contact.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ProofBar from "./components/ProofBar.jsx";
import Work from "./components/Work.jsx";
import Featured from "./components/Featured.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Lightbox from "./components/Lightbox.jsx";
import StickyCta from "./components/StickyCta.jsx";

export default function App() {
  const [playing, setPlaying] = useState(null);
  const [interest, setInterest] = useState(null);
  useReveal();

  // "Want a video like this?" from the player: close it, pre-select the service, jump to the form.
  const startFrom = (item) => {
    setPlaying(null);
    setInterest(serviceFor(item));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <main id="top">
        <Hero onPlay={setPlaying} />
        <ProofBar />
        <Work onPlay={setPlaying} />
        <Featured onPlay={setPlaying} />
        <WhyUs />
        <Faq />
        <Contact interest={interest} />
      </main>
      <Footer />
      <StickyCta />
      <Lightbox item={playing} onClose={() => setPlaying(null)} onStart={startFrom} />
    </>
  );
}
