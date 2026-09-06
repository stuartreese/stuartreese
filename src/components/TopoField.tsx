"use client";

import { useEffect, useRef } from "react";

/**
 * Live topographic contour lines drawn on a canvas.
 * A slowly drifting noise field is sliced into iso-lines with marching squares.
 * The cursor (or a finger) raises a soft hill in the field, so the contours
 * bend and gather around it the way a real map wraps around a peak.
 */
export function TopoField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Value noise -----------------------------------------------------
    const PERM = new Uint8Array(512);
    const seedArr = Array.from({ length: 256 }, (_, i) => i);
    let seed = 1337;
    for (let i = 255; i > 0; i--) {
      seed = (seed * 16807) % 2147483647;
      const j = seed % (i + 1);
      [seedArr[i], seedArr[j]] = [seedArr[j], seedArr[i]];
    }
    for (let i = 0; i < 512; i++) PERM[i] = seedArr[i & 255];
    const hash = (x: number, y: number, z: number) => PERM[(PERM[(PERM[x & 255] + y) & 255] + z) & 255] / 255;
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const noise3 = (x: number, y: number, z: number) => {
      const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
      const xf = x - xi, yf = y - yi, zf = z - zi;
      const u = fade(xf), v = fade(yf), w = fade(zf);
      const c000 = hash(xi, yi, zi), c100 = hash(xi + 1, yi, zi);
      const c010 = hash(xi, yi + 1, zi), c110 = hash(xi + 1, yi + 1, zi);
      const c001 = hash(xi, yi, zi + 1), c101 = hash(xi + 1, yi, zi + 1);
      const c011 = hash(xi, yi + 1, zi + 1), c111 = hash(xi + 1, yi + 1, zi + 1);
      const x00 = lerp(c000, c100, u), x10 = lerp(c010, c110, u);
      const x01 = lerp(c001, c101, u), x11 = lerp(c011, c111, u);
      return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w) * 2 - 1;
    };

    // --- State -----------------------------------------------------------
    let width = 0, height = 0, dpr = 1;
    let cols = 0, rows = 0;
    const CELL = 16;
    let field = new Float32Array(0);
    const LEVELS = 11;
    const thresholds = Array.from({ length: LEVELS }, (_, i) => -0.85 + (1.7 * i) / (LEVELS - 1));

    const target = { x: -9999, y: -9999, on: false };
    const cursor = { x: -9999, y: -9999, strength: 0 };
    let t = Math.random() * 100;
    let raf = 0;
    let visible = true;
    let strokeStyle = "rgba(111,143,99,0.35)";
    let frame = 0;

    const readColor = () => {
      const c = getComputedStyle(canvas).color;
      strokeStyle = c;
    };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(r.width));
      height = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      field = new Float32Array(cols * rows);
      readColor();
      if (reduceMotion) draw();
    };

    const sample = () => {
      const scale = 0.0035;
      const sigma = Math.max(120, Math.min(width, height) * 0.22);
      const inv = 1 / (2 * sigma * sigma);
      const amp = 1.15 * cursor.strength;
      for (let j = 0; j < rows; j++) {
        const y = j * CELL;
        const dy = y - cursor.y;
        for (let i = 0; i < cols; i++) {
          const x = i * CELL;
          let v = noise3(x * scale, y * scale, t) * 0.75 + noise3(x * scale * 2.3 + 40, y * scale * 2.3, t * 1.4) * 0.25;
          if (amp > 0.001) {
            const dx = x - cursor.x;
            v += amp * Math.exp(-(dx * dx + dy * dy) * inv);
          }
          field[j * cols + i] = v;
        }
      }
    };

    // Marching squares: draw every iso-line for every threshold.
    const draw = () => {
      sample();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      ctx.strokeStyle = strokeStyle;

      for (let li = 0; li < LEVELS; li++) {
        const th = thresholds[li];
        ctx.globalAlpha = 0.55 + 0.45 * (1 - Math.abs(th) / 0.85);
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i];
            const b = field[j * cols + i + 1];
            const c = field[(j + 1) * cols + i + 1];
            const d = field[(j + 1) * cols + i];
            const idx = (a > th ? 8 : 0) | (b > th ? 4 : 0) | (c > th ? 2 : 0) | (d > th ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * CELL, y0 = j * CELL;
            // interpolated edge points
            const top = [x0 + CELL * ((th - a) / (b - a || 1e-6)), y0] as const;
            const right = [x0 + CELL, y0 + CELL * ((th - b) / (c - b || 1e-6))] as const;
            const bottom = [x0 + CELL * ((th - d) / (c - d || 1e-6)), y0 + CELL] as const;
            const left = [x0, y0 + CELL * ((th - a) / (d - a || 1e-6))] as const;
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 5: seg(top, left); seg(bottom, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(top, left); break;
              case 10: seg(top, right); seg(left, bottom); break;
            }
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      frame++;
      if (frame % 30 === 0) readColor();
      t += 0.0028;
      // ease the cursor hill toward the pointer
      const k = 0.12;
      if (target.on) {
        if (cursor.strength < 0.01) {
          cursor.x = target.x;
          cursor.y = target.y;
        }
        cursor.x += (target.x - cursor.x) * k;
        cursor.y += (target.y - cursor.y) * k;
        cursor.strength += (1 - cursor.strength) * 0.08;
      } else {
        cursor.strength += (0 - cursor.strength) * 0.05;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      target.on = true;
    };
    const onLeave = () => {
      target.on = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((en) => en.isIntersecting);
      if (visible && !reduceMotion && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(parent);

    const mo = new MutationObserver(readColor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (!reduceMotion) {
      parent.addEventListener("pointermove", onMove, { passive: true });
      parent.addEventListener("pointerleave", onLeave);
      parent.addEventListener("pointercancel", onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      parent.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${className}`} />;
}
