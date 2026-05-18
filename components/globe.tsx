"use client";

import { useEffect, useRef, useState } from "react";
import {
  geoDistance,
  geoGraticule,
  geoOrthographic,
  geoPath,
} from "d3-geo";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";

const CALGARY: [number, number] = [-114.0719, 51.0447];
const SIZE = 260;
const TILT = 18;
const SPEED = 0.12;

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Edmonton",
        }),
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const topo = landTopo as unknown as Parameters<typeof feature>[0];
    const landObj = (landTopo as unknown as { objects: { land: unknown } })
      .objects.land as Parameters<typeof feature>[1];
    const land = feature(topo, landObj);
    const graticule = geoGraticule().step([15, 15])();

    const projection = geoOrthographic()
      .scale(SIZE / 2 - 8)
      .translate([SIZE / 2, SIZE / 2])
      .clipAngle(90);

    const path = geoPath(projection, ctx);

    let lambda = -CALGARY[0];
    let rafId = 0;
    let last = performance.now();
    let visible = true;

    const onVis = () => {
      visible = !document.hidden;
      if (visible) {
        last = performance.now();
        rafId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(rafId);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = (now: number = performance.now()) => {
      const dt = Math.min(64, now - last);
      last = now;
      lambda += (SPEED * dt) / 16;
      if (lambda > 180) lambda -= 360;

      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--foreground").trim() || "#0a0a0a";
      const rule = styles.getPropertyValue("--rule").trim() || "rgba(0,0,0,0.1)";
      const muted = styles.getPropertyValue("--muted").trim() || "rgba(0,0,0,0.4)";
      const accent = styles.getPropertyValue("--accent").trim() || "#d97706";

      projection.rotate([lambda, -TILT]);
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = rule;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      path(land);
      ctx.fillStyle = fg;
      ctx.fill();

      const center: [number, number] = [-lambda, TILT];
      if (geoDistance(CALGARY, center) < Math.PI / 2) {
        const point = projection(CALGARY);
        if (point) {
          const [cx, cy] = point;
          const t = (now / 1000) % 2;
          const pulse = 1 + (t < 1 ? t : 2 - t) * 0.6;

          ctx.beginPath();
          ctx.arc(cx, cy, 7 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = 0.15;
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.beginPath();
          ctx.arc(cx, cy, 5, 0, Math.PI * 2);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.fill();
        }
      }

      if (visible) rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="flex flex-col items-start">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
        Location
      </div>
      <div className="mt-1 text-[15px] font-medium">Calgary, Alberta</div>
      <div className="text-[12px] text-[color:var(--muted)] tabular-nums">
        51.05°N · 114.07°W{time && ` · ${time} MT`}
      </div>
      <canvas ref={canvasRef} className="mt-3" aria-label="Rotating globe with Calgary highlighted" />
    </div>
  );
}
