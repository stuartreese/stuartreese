"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Topo } from "@/components/Topo";

const words = ["Relational", "Strategic", "Leader"];

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);

  // Gentle mouse parallax on the contour lines and the portrait.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={wrap} className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        className="pointer-events-none absolute -inset-x-10 -top-20 bottom-0 -z-10 text-moss/30 animate-drift"
        style={{ transform: "translate3d(calc(var(--mx, 0) * -14px), calc(var(--my, 0) * -10px), 0)" }}
      >
        <Topo className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-ochre/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-sage/30 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-moss animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.location}
          </p>

          <h1 className="display mt-6 text-5xl leading-[0.95] sm:text-7xl lg:text-[5.6rem]">
            Hi, I&rsquo;m{" "}
            <span className="display-italic text-accent">{site.firstName}</span>.
          </h1>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Three words that describe me">
            {words.map((w, i) => (
              <li
                key={w}
                className="reveal rounded-full bg-block px-4 py-1.5 text-sm font-medium text-cream shadow-soft"
                style={{ "--reveal-delay": `${120 + i * 90}ms` } as React.CSSProperties}
              >
                {w}
              </li>
            ))}
          </ul>

          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl" style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
            {site.intro} Currently {site.title} at{" "}
            <span className="font-semibold text-ink">{site.org}</span>.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ "--reveal-delay": "420ms" } as React.CSSProperties}>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              See the work
              <span aria-hidden className="transition group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-card/60 px-5 py-3 text-sm font-medium transition hover:border-ink/50 hover:-translate-y-0.5"
            >
              Say hello
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            className="relative"
            style={{ transform: "translate3d(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 8px), 0)" }}
          >
            <div className="absolute -inset-4 -z-10 rounded-[46%_54%_52%_48%/48%_44%_56%_52%] bg-ochre/50 animate-float" />
            <div className="absolute -inset-1 -z-10 rounded-[52%_48%_46%_54%/44%_52%_48%_56%] bg-block" />
            <div className="overflow-hidden rounded-[50%_50%_48%_52%/46%_50%_50%_54%] shadow-lift">
              <Image
                src="/images/headshot.jpg"
                alt={`${site.name} smiling outdoors`}
                width={900}
                height={900}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <span className="display-italic absolute -bottom-3 -left-3 rotate-[-6deg] rounded-full border border-line bg-card px-3 py-1 text-sm text-accent shadow-soft sm:-left-6">
              nice to meet you
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
