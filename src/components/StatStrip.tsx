import { headlineStats } from "@/content/site";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

export function StatStrip() {
  return (
    <section aria-label="By the numbers" className="border-y border-line/80 bg-paper-2/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        {headlineStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="flex flex-col gap-1">
            <Counter
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              className="display text-4xl text-accent sm:text-5xl"
            />
            <span className="text-sm leading-snug text-ink/70">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
