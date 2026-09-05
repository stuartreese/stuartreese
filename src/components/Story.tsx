import { story } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Story() {
  return (
    <section id="story" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My story"
          title={
            <>
              Systems for people, <span className="display-italic text-forest">not the other way around.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-relaxed text-ink/85">
            <Reveal as="p" className="first-letter:display first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-forest">
              {story.lead}
            </Reveal>
            <Reveal delay={80}>
              <p className="font-medium text-ink">In this role I focus on:</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {story.focus.map((f) => (
                  <li key={f} className="flex gap-3 rounded-2xl border border-sand bg-parchment/50 px-4 py-3 text-base">
                    <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-clay" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="p" delay={120}>
              {story.background}
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={100} className="rounded-3xl bg-forest p-7 text-cream shadow-lift">
              <p className="display-italic text-2xl leading-snug sm:text-3xl">&ldquo;{story.quote}&rdquo;</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">At my best when</p>
              <ul className="mt-4 divide-y divide-sand">
                {story.bestWhen.map((b, i) => (
                  <li key={b.title} className="group py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="display text-xl text-moss">0{i + 1}</span>
                      <div>
                        <p className="font-medium">{b.title}</p>
                        <p className="mt-1 text-sm text-ink/65">{b.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
