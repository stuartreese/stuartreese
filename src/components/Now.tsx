import { now } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Now() {
  return (
    <section id="now" aria-labelledby="now-heading" className="scroll-mt-24 border-y border-line/80 bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="now-heading" className="display text-2xl">
            Right <span className="display-italic text-accent">now</span>
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/50">Updated {now.updated}</p>
        </Reveal>
        <dl className="mt-6 grid gap-6 md:grid-cols-3">
          {now.items.map((it, i) => (
            <Reveal key={it.label} delay={i * 80} className="border-l-2 border-terracotta pl-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">{it.label}</dt>
              <dd className="mt-1.5 text-base leading-relaxed text-ink/85">{it.text}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
