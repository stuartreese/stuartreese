"use client";

import { certifications, education, learning } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Credentials() {
  return (
    <section id="credentials" className="scroll-mt-24 bg-paper-2/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Credentials"
          title={
            <>
              Always <span className="display-italic text-accent">learning something.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Reveal className="rounded-3xl border border-line bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Education</p>
            <h3 className="display mt-3 text-2xl">{education.school}</h3>
            <p className="mt-1 text-ink/80">{education.degree}</p>
            <p className="mt-1 text-sm text-ink/60">{education.years}</p>
          </Reveal>

          <Reveal delay={80} className="rounded-3xl border border-line bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Certifications</p>
            <ul className="mt-3 space-y-4">
              {certifications.map((c) => (
                <li key={c.name} className="flex gap-3">
                  <span
                    aria-hidden
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${
                      c.done ? "bg-block text-cream" : "border border-dashed border-moss text-moss"
                    }`}
                  >
                    {c.done ? "✓" : "…"}
                  </span>
                  <div>
                    <p className="font-medium leading-snug">{c.name}</p>
                    <p className="text-sm text-ink/60">{c.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="flex flex-col rounded-3xl bg-block p-6 text-cream shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ochre">Currently learning</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {learning.map((l) => (
                <li key={l} className="rounded-full border border-cream/30 px-3 py-1 font-mono text-sm">
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-cream/80">
              Fun fact: I am a big Formula 1 guy. If you are too,{" "}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("f1:start"))}
                className="display-italic text-lg text-ochre underline decoration-dotted underline-offset-4 hover:text-cream"
              >
                try the lights.
              </button>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
