"use client";

import { useRef } from "react";
import { interests } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StravaStrip } from "@/components/StravaStrip";

export function Interests() {
  return (
    <section id="life" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Life outside work"
          title={
            <>
              What keeps me <span className="display-italic text-accent">grounded.</span>
            </>
          }
          blurb="Hover or tap a card. This is the part of the site that is not on the resume."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((it, i) => (
            <Reveal as="li" key={it.id} delay={i * 70}>
              <TiltCard>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-card p-6 shadow-soft">
                  <span aria-hidden className="text-4xl">{it.icon}</span>
                  <h3 className="display mt-4 text-2xl">{it.title}</h3>
                  <p className="mt-2 text-ink/80">{it.blurb}</p>
                  <p className="mt-3 text-sm text-ink/60">{it.detail}</p>
                  {it.href && (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-terracotta hover:text-ember"
                    >
                      {it.cta} <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
        <StravaStrip />
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} className="tilt h-full" onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  );
}
