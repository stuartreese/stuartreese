"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import type { StravaResult, StravaSummary } from "@/lib/strava";
import { Reveal } from "@/components/Reveal";

/**
 * Running log fed by Strava. Renders nothing until data arrives, and nothing
 * at all when the Strava keys are not configured.
 */
export function StravaStrip() {
  const [data, setData] = useState<StravaSummary | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/strava")
      .then((r) => (r.ok ? (r.json() as Promise<StravaResult>) : null))
      .then((json) => {
        if (alive && json && json.configured) setData(json);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!data) return null;

  const tiles = [
    { value: data.ytd.miles.toLocaleString("en-US"), label: "miles this year" },
    { value: data.ytd.runs.toLocaleString("en-US"), label: "runs this year" },
    { value: data.recent4w.miles.toLocaleString("en-US"), label: "miles, last 4 weeks" },
    { value: data.ytd.hours.toLocaleString("en-US"), label: "hours on feet this year" },
  ];

  return (
    <Reveal className="mt-6 overflow-hidden rounded-3xl border border-line bg-card shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className="text-2xl">🏃</span>
          <div>
            <p className="display text-xl leading-none">Running log</p>
            <p className="mt-1 text-xs text-ink/60">Live from Strava. Updated {relativeTime(data.fetchedAt)}.</p>
          </div>
        </div>
        <a href={site.links.strava} target="_blank" rel="noreferrer" className="text-sm font-medium text-terracotta hover:text-ember">
          Follow on Strava ↗
        </a>
      </div>

      <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1fr_1.2fr]">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {tiles.map((t) => (
            <div key={t.label}>
              <dd className="display text-3xl tabular-nums text-accent">{t.value}</dd>
              <dt className="mt-0.5 text-sm text-ink/65">{t.label}</dt>
            </div>
          ))}
        </dl>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-medium">Last 10 runs</p>
            {data.lastRun && (
              <p className="text-right text-xs text-ink/60">
                Latest: <span className="font-medium text-ink/80">{data.lastRun.miles} mi</span> at {data.lastRun.pace},{" "}
                {formatDate(data.lastRun.date)}
              </p>
            )}
          </div>
          <Sparkline points={data.spark} />
        </div>
      </div>
    </Reveal>
  );
}

function Sparkline({ points }: { points: StravaSummary["spark"] }) {
  const [hover, setHover] = useState<number | null>(null);
  if (points.length === 0) return <p className="mt-4 text-sm text-ink/60">No runs logged yet.</p>;

  const W = 420, H = 120, PAD = 6, GAP = 6;
  const max = Math.max(...points.map((p) => p.miles), 1);
  const bw = (W - PAD * 2 - GAP * (points.length - 1)) / points.length;
  const maxIdx = points.findIndex((p) => p.miles === max);
  const lastIdx = points.length - 1;

  return (
    <div className="mt-3">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Distance of the last ${points.length} runs, longest ${max} miles`}
        className="h-32 w-full overflow-visible"
        onMouseLeave={() => setHover(null)}
      >
        <line x1={PAD} x2={W - PAD} y1={H - 18} y2={H - 18} stroke="currentColor" className="text-line" strokeWidth="1" />
        {points.map((p, i) => {
          const h = Math.max(4, ((H - 18 - 22) * p.miles) / max);
          const x = PAD + i * (bw + GAP);
          const y = H - 18 - h;
          const active = hover === i;
          const labeled = active || (hover === null && (i === maxIdx || i === lastIdx));
          return (
            <g key={p.date} onMouseEnter={() => setHover(i)}>
              {/* hit target larger than the mark */}
              <rect x={x - GAP / 2} y={0} width={bw + GAP} height={H} fill="transparent" />
              <rect
                x={x}
                y={y}
                width={bw}
                height={h}
                rx={4}
                className={active ? "fill-terracotta" : "fill-accent"}
                opacity={hover === null || active ? 1 : 0.55}
              />
              {labeled && (
                <text x={x + bw / 2} y={y - 6} textAnchor="middle" className="fill-ink text-[11px] font-medium tabular-nums">
                  {p.miles}
                </text>
              )}
              <title>{`${p.miles} mi, ${formatDate(p.date)} (${p.name})`}</title>
            </g>
          );
        })}
        <text x={PAD} y={H - 4} className="fill-ink/50 text-[10px]">
          {formatDate(points[0].date)}
        </text>
        <text x={W - PAD} y={H - 4} textAnchor="end" className="fill-ink/50 text-[10px]">
          {formatDate(points[lastIdx].date)}
        </text>
      </svg>
      <p aria-live="polite" className="min-h-5 text-xs text-ink/60">
        {hover !== null ? `${points[hover].miles} mi on ${formatDate(points[hover].date)}: ${points[hover].name}` : "Hover a bar for the run."}
      </p>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function relativeTime(iso: string) {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 24 ? `${hrs} hr ago` : `${Math.round(hrs / 24)} d ago`;
}
