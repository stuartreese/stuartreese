import { Reveal } from "@/components/Reveal";

type Props = { eyebrow: string; title: React.ReactNode; blurb?: string };

export function SectionHeading({ eyebrow, title, blurb }: Props) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">{eyebrow}</p>
      <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">{title}</h2>
      {blurb && <p className="mt-4 text-lg text-ink/70">{blurb}</p>}
    </Reveal>
  );
}
