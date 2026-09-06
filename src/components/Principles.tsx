import { principles } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Principles() {
  return (
    <section id="principles" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Working with me"
          title={
            <>
              A few things <span className="display-italic text-accent">you can count on.</span>
            </>
          }
          blurb="If you are sizing me up for a board, a team, or a project, this is how I operate."
        />
        <ol className="mt-12 grid gap-x-10 gap-y-2 lg:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70} className="group flex gap-5 border-t border-line py-6">
              <span className="display mt-1 w-8 shrink-0 text-2xl text-moss transition-colors group-hover:text-terracotta">
                0{i + 1}
              </span>
              <div>
                <h3 className="display text-2xl leading-snug">{p.title}</h3>
                <p className="mt-2 text-ink/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
