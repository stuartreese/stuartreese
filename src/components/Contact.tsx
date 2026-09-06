"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useTheme } from "@/components/ThemeToggle";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const theme = useTheme();
  const calendlyColors =
    theme === "dark"
      ? "background_color=1f4a3a&text_color=f1ebdd&primary_color=d9a441"
      : "background_color=f6f1e6&text_color=1f2a24&primary_color=1f4a3a";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setError("Network hiccup. Please try again.");
      setStatus("error");
    }
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Hello from your website")}`;

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Would love to tell you more <span className="display-italic text-accent">if you have time.</span>
            </>
          }
          blurb="Send a note, or grab thirty minutes on my calendar. Either way I will respond."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-card p-6 shadow-soft sm:p-8">
            <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <Field label="Message" name="message" as="textarea" required />
              {/* Honeypot: real people never see or fill this. */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label>
                  Leave this empty <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-medium text-cream shadow-soft transition hover:bg-clay-deep hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Send it"}
                  {status !== "sent" && <span aria-hidden>→</span>}
                </button>
                <a href={mailto} className="link-ink text-sm text-ink/70">
                  or email me directly
                </a>
              </div>

              <p aria-live="polite" className="min-h-6 text-sm">
                {status === "sent" && <span className="text-accent">Thanks! Your note is on its way. I will get back to you soon.</span>}
                {status === "error" && <span className="text-ember">{error}</span>}
                {status === "unconfigured" && (
                  <span className="text-ember">
                    The form is not wired up yet. Please{" "}
                    <a className="underline" href={mailto}>
                      email me
                    </a>{" "}
                    instead.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-sm font-medium">Grab 30 minutes</p>
              <a href={site.links.calendly} target="_blank" rel="noreferrer" className="text-sm text-terracotta hover:text-ember">
                Open in Calendly ↗
              </a>
            </div>
            <iframe
              title="Book a 30 minute chat with Stuart"
              src={`${site.links.calendly}?hide_gdpr_banner=1&${calendlyColors}`}
              className="h-[640px] w-full"
              loading="lazy"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = "text", as = "input", required, autoComplete }: FieldProps) {
  const cls =
    "w-full rounded-2xl border border-line bg-paper-2/40 px-4 py-3 text-base outline-none transition placeholder:text-ink/40 focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/20";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={5} className={cls} placeholder="What is on your mind?" />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} className={cls} />
      )}
    </label>
  );
}
