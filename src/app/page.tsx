import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { Story } from "@/components/Story";
import { Now } from "@/components/Now";
import { Principles } from "@/components/Principles";
import { Timeline } from "@/components/Timeline";
import { Interests } from "@/components/Interests";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { F1Lights } from "@/components/F1Lights";
import { RevealObserver } from "@/components/Reveal";
import { site, education } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/headshot.jpg`,
  jobTitle: site.title,
  worksFor: { "@type": "Organization", name: site.org },
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Jackson", addressRegion: "MS", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  sameAs: [site.links.linkedin, site.links.instagram, site.links.strava, site.links.github],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <RevealObserver />
      <Nav />
      <main id="top" className="flex-1">
        <Hero />
        <StatStrip />
        <Story />
        <Now />
        <Timeline />
        <Principles />
        <Interests />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <F1Lights />
    </>
  );
}
