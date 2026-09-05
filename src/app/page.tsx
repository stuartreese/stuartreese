import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { Story } from "@/components/Story";
import { Timeline } from "@/components/Timeline";
import { Interests } from "@/components/Interests";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { F1Lights } from "@/components/F1Lights";
import { RevealObserver } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main id="top" className="flex-1">
        <Hero />
        <StatStrip />
        <Story />
        <Timeline />
        <Interests />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <F1Lights />
    </>
  );
}
