"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#story", label: "Story" },
  { href: "#work", label: "Work" },
  { href: "#life", label: "Life" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between rounded-full border px-4 py-2 transition-all duration-300 ${
            scrolled
              ? "border-line/80 bg-card/85 shadow-soft backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2" aria-label="Back to top">
            <span className="display grid h-9 w-9 place-items-center rounded-full bg-block text-cream text-sm font-semibold transition-transform group-hover:-rotate-6">
              SR
            </span>
            <span className="hidden sm:inline text-sm font-medium tracking-wide">{site.name}</span>
          </a>

          <ul className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a className="link-ink text-ink/80 hover:text-ink" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={site.links.calendly}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-sm font-medium text-cream shadow-soft transition hover:bg-clay-deep hover:-translate-y-0.5"
            >
              Book a chat
              <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-line bg-card"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[5px] h-0.5 w-4 bg-ink transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-[10px] h-0.5 w-4 bg-ink transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="md:hidden mt-2 rounded-3xl border border-line bg-card/95 p-4 shadow-lift backdrop-blur-md">
            <ul className="flex flex-col gap-3 text-base">
              {links.map((l) => (
                <li key={l.href}>
                  <a className="block py-1" href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.links.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-sm font-medium text-cream"
                >
                  Book a chat <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
