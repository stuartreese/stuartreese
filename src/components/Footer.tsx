import { site } from "@/content/site";

const socials = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Calendly", href: site.links.calendly },
  { label: "Instagram", href: site.links.instagram },
  { label: "Strava", href: site.links.strava },
  { label: "GitHub", href: site.links.github },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-pine text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-3xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-cream/70">{site.tagline} Based in {site.location}.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="link-ink text-cream/85 hover:text-cream"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-cream/50 sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}. Built with a lot of coffee and a little code.</p>
          <a href="#top" className="link-ink">
            Back to the top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
