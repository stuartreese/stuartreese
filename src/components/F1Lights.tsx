"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Formula 1 start-light easter egg with a reaction-time game.
 * Triggers: type "f1" anywhere, or dispatch a window "f1:start" event.
 * Five red lights come on one per second, then go out after a random hold.
 * Hit space, click, or tap the moment they go out. Jump early and you get a penalty.
 */

type Phase = "idle" | "arming" | "hold" | "go" | "jump" | "result";

export function F1Lights() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const [reaction, setReaction] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("f1-best");
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });
  const goAt = useRef<number>(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const start = useCallback(() => {
    clearTimers();
    setOpen(true);
    setPhase("arming");
    setLit(0);
    setReaction(null);
    for (let i = 1; i <= 5; i++) {
      timers.current.push(window.setTimeout(() => setLit(i), i * 1000));
    }
    timers.current.push(
      window.setTimeout(() => {
        setPhase("hold");
        const holdMs = 800 + Math.random() * 2200;
        timers.current.push(
          window.setTimeout(() => {
            setLit(0);
            goAt.current = performance.now();
            setPhase("go");
          }, holdMs),
        );
      }, 5000),
    );
  }, []);

  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
    setPhase("idle");
    setLit(0);
  }, []);

  const react = useCallback(() => {
    if (phase === "arming" || phase === "hold") {
      clearTimers();
      setLit(0);
      setPhase("jump");
      return;
    }
    if (phase === "go") {
      const ms = Math.round(performance.now() - goAt.current);
      setReaction(ms);
      setBest((b) => (b === null || ms < b ? ms : b));
      setPhase("result");
    }
  }, [phase]);

  // Persist the best time.
  useEffect(() => {
    if (best !== null) {
      try {
        localStorage.setItem("f1-best", String(best));
      } catch {}
    }
  }, [best]);

  // Keyboard trigger ("f1") and controls.
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (open) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          return;
        }
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (phase === "result" || phase === "jump") start();
          else react();
        }
        return;
      }
      if (typing) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-2);
      if (buffer === "f1") {
        buffer = "";
        start();
      }
    };
    const onCustom = () => start();
    window.addEventListener("keydown", onKey);
    window.addEventListener("f1:start", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("f1:start", onCustom);
    };
  }, [open, phase, start, close, react]);

  useEffect(() => () => clearTimers(), []);

  if (!open) return null;

  const verdict =
    reaction === null
      ? ""
      : reaction < 200
        ? "Verstappen would be nervous."
        : reaction < 300
          ? "Podium reflexes."
          : reaction < 450
            ? "Solid midfield start."
            : "Anti-stall. Try again.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Formula 1 start lights reaction game"
      className="fixed inset-0 z-[60] flex select-none flex-col items-center justify-center bg-[#0b0b0c] text-white"
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-no-react]")) return;
        if (phase === "result" || phase === "jump") start();
        else react();
      }}
    >
      <button
        type="button"
        data-no-react
        onClick={close}
        className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
      >
        Close (Esc)
      </button>

      <p className="mb-8 font-mono text-xs uppercase tracking-[0.35em] text-white/50">Lights out and away we go</p>

      <div className="flex gap-3 rounded-3xl border border-white/10 bg-[#141416] p-4 shadow-[0_0_80px_-20px_rgba(229,50,45,0.6)] sm:gap-4 sm:p-6">
        {[1, 2, 3, 4, 5].map((col) => (
          <div key={col} className="flex flex-col gap-3 rounded-2xl bg-black/60 p-2 sm:p-3">
            {[0, 1].map((row) => (
              <span
                key={row}
                className={`f1-light block h-10 w-10 rounded-full bg-[#3a1210]/60 sm:h-14 sm:w-14 ${lit >= col ? "on" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 h-24 text-center">
        {phase === "arming" || phase === "hold" ? (
          <p className="text-lg text-white/70">Wait for it. Hit space or tap the instant the lights go out.</p>
        ) : null}
        {phase === "go" && <p className="display text-4xl text-[#e5322d] sm:text-5xl">GO!</p>}
        {phase === "jump" && (
          <>
            <p className="display text-3xl text-[#e5322d]">Jump start!</p>
            <p className="mt-2 text-white/60">Five second penalty. Tap or press space to try again.</p>
          </>
        )}
        {phase === "result" && reaction !== null && (
          <>
            <p className="display text-5xl tabular-nums sm:text-6xl">
              {reaction}
              <span className="text-2xl text-white/50"> ms</span>
            </p>
            <p className="mt-2 text-white/70">{verdict}</p>
            <p className="mt-1 text-sm text-white/40">
              {best !== null && `Your best: ${best} ms. `}Tap or press space to go again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
