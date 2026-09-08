import { useEffect, useRef } from "react";

type Mode = "patrol" | "converge" | "sweep";

type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Lightweight canvas swarm: agents drift, link to nearby neighbours, and
 * change behaviour with the selected mode. Purely visual, no data needed.
 */
export function SwarmCanvas({ mode = "patrol", count = 46 }: { mode?: Mode; count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<Mode>(mode);
  const pointer = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const agents: Agent[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < count; i++) {
      agents.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      pointer.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      const m = modeRef.current;
      const cx = w / 2;
      const cy = h / 2;

      for (const a of agents) {
        if (m === "converge") {
          a.vx += (cx - a.x) * 0.00045;
          a.vy += (cy - a.y) * 0.00045;
        } else if (m === "sweep") {
          a.vx += 0.012;
          a.vy += Math.sin(t * 3 + a.x * 0.01) * 0.012;
        } else {
          a.vx += Math.cos(t + a.y * 0.008) * 0.006;
          a.vy += Math.sin(t + a.x * 0.008) * 0.006;
        }

        const dx = a.x - pointer.current.x;
        const dy = a.y - pointer.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          const f = 26 / d2;
          a.vx += dx * f;
          a.vy += dy * f;
        }

        const sp = Math.hypot(a.vx, a.vy);
        const max = m === "sweep" ? 1.9 : 1.2;
        if (sp > max) {
          a.vx = (a.vx / sp) * max;
          a.vy = (a.vy / sp) * max;
        }
        a.vx *= 0.995;
        a.vy *= 0.995;
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < -20) a.x = w + 20;
        if (a.x > w + 20) a.x = -20;
        if (a.y < -20) a.y = h + 20;
        if (a.y > h + 20) a.y = -20;
      }

      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a = agents[i]!;
          const b = agents[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 118) {
            ctx.strokeStyle = `rgba(60, 226, 205, ${(1 - dist / 118) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const a of agents) {
        ctx.fillStyle = "rgba(120, 245, 226, 0.95)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(60, 226, 205, 0.14)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
