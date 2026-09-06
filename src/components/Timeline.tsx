"use client";

import { useId, useState } from "react";
import { roles, type Role } from "@/content/site";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Timeline() {
  const [openId, setOpenId] = useState<string>(roles[0].id);

  return (
    <section id="work" className="scroll-mt-24 bg-paper-2/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Work"
          title={
            <>
              A trail of <span className="display-italic text-accent">roles and results.</span>
            </>
          }
          blurb="Click any stop on the trail to see what the role involved and the numbers behind it."
        />

        <ol className="relative mt-14">
          <span aria-hidden className="trail-line absolute left-[1.05rem] top-2 bottom-2 w-0.5 sm:left-[1.3rem]" />
          {roles.map((role, i) => (
            <TimelineItem
              key={role.id}
              role={role}
              index={i}
              open={openId === role.id}
              onToggle={() => setOpenId((cur) => (cur === role.id ? "" : role.id))}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ role, index, open, onToggle }: { role: Role; index: number; open: boolean; onToggle: () => void }) {
  const panelId = useId();
  const current = role.end === "Present";

  return (
    <Reveal as="li" delay={index * 60} className="relative pl-12 pb-8 sm:pl-16 last:pb-0">
      <span
        aria-hidden
        className={`absolute left-0 top-2 grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-semibold transition sm:h-11 sm:w-11 sm:text-sm ${
          open ? "border-accent bg-block text-cream scale-110" : "border-moss bg-card text-accent"
        }`}
      >
        {current ? "now" : role.start.slice(-2)}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`group w-full rounded-3xl border p-5 text-left transition sm:p-6 ${
          open
            ? "border-accent/30 bg-card shadow-lift"
            : "border-line bg-card/60 hover:border-moss hover:bg-card hover:-translate-y-0.5 hover:shadow-soft"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <h3 className="display text-2xl leading-tight sm:text-3xl">{role.title}</h3>
            <p className="mt-1 text-base font-medium text-accent">{role.company}</p>
          </div>
          <div className="text-sm text-ink/60 sm:text-right">
            <p className="font-medium text-ink/80">
              {role.start} <span aria-hidden>→</span> {role.end}
            </p>
            <p>{role.location}</p>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-ink/75">{role.summary}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-terracotta">
          {open ? "Hide details" : "Description & metrics"}
          <span aria-hidden className={`inline-block transition-transform ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`}>↓</span>
        </span>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-line bg-card p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">What I did</p>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-ink/85">
                {role.description.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {role.metrics.length > 0 ? (
              <div className="rounded-3xl bg-block p-5 text-cream sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ochre">By the numbers</p>
                <ul className="mt-3 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                  {role.metrics.map((m) => (
                    <li key={m.label} className="flex flex-col">
                      <Counter
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        active={open}
                        className="display text-3xl leading-none text-cream"
                      />
                      <span className="mt-1 text-sm leading-snug text-cream/75">{m.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-moss/60 bg-card/40 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">By the numbers</p>
                <p className="display-italic mt-3 text-xl text-accent">Still writing this chapter.</p>
                <p className="mt-2 text-sm text-ink/70">Check back soon for the metrics, or ask me about it directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
