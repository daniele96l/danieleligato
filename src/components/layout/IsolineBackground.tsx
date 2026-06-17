import { useEffect, useRef } from 'react';

const MS_EDGES: number[][] = [
  [],
  [0, 3],
  [1, 0],
  [1, 3],
  [2, 1],
  [0, 3, 2, 1],
  [2, 0],
  [2, 3],
  [3, 2],
  [0, 2],
  [1, 0, 3, 2],
  [1, 2],
  [1, 3],
  [0, 1],
  [0, 3],
  [],
];

export const IsolineBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef<{ x: number; y: number; t: number; phase: number }[]>([]);
  const activeRipplesRef = useRef<{ x: number; y: number; t: number; phase: number }[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cellSize = 14;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove);

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      ripplesRef.current.push({ x, y, t: 0, phase: Math.random() * Math.PI * 2 });
    };
    window.addEventListener('mousedown', onClick);

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--primary').trim() || '220 90% 56%';
    const foreground = styles.getPropertyValue('--foreground').trim() || '0 0% 10%';

    let t = 0;

    const field = (x: number, y: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const s = 0.007;

      let v =
        Math.sin(x * s + t * 0.8) * Math.cos(y * s * 0.92 - t * 0.6) +
        Math.sin((x * 0.85 + y * 0.65) * s * 1.1 + t * 0.4) * 0.65 +
        Math.cos(x * s * 1.25 - y * s * 0.75 + t * 0.35) * 0.45 +
        Math.sin(x * s * 0.55 - y * s * 1.35 - t * 0.5) * 0.35;

      const dx = x - mx;
      const dy = y - my;
      const falloff = Math.exp(-(dx * dx + dy * dy) / (320 * 320));
      v += falloff * 0.55 * Math.sin(t * 2.5 + x * 0.02 + y * 0.015);

      for (const ripple of activeRipplesRef.current) {
        const rdx = x - ripple.x;
        const rdy = y - ripple.y;
        const dist = Math.hypot(rdx, rdy);
        const radius = ripple.t * 320;
        const ringDist = Math.abs(dist - radius);
        const ring = Math.exp(-(ringDist * ringDist) / (55 * 55));
        const fade = 1 - ripple.t;
        v += ring * fade * 1.4 * Math.sin(dist * 0.04 - ripple.t * 10 + ripple.phase);
      }

      return v;
    };

    const lerp = (a: number, b: number, v0: number, v1: number, threshold: number) => {
      const d = v1 - v0;
      const f = Math.abs(d) < 1e-6 ? 0.5 : (threshold - v0) / d;
      return a + (b - a) * f;
    };

    const draw = () => {
      t += 0.001;

      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += 0.008;
        if (ripples[i].t >= 1) ripples.splice(i, 1);
      }
      activeRipplesRef.current = ripples.slice();

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;
      const values = new Float32Array(cols * rows);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          values[j * cols + i] = field(i * cellSize, j * cellSize);
        }
      }

      const levels = 16;
      const minLevel = -1.6;
      const maxLevel = 1.6;

      for (let l = 0; l < levels; l++) {
        const threshold = minLevel + (l / (levels - 1)) * (maxLevel - minLevel);
        const progress = l / (levels - 1);
        const alpha = 0.05 + (1 - Math.abs(progress - 0.5) * 2) * 0.14;
        const isAccent = l % 4 === 0;
        const color = isAccent ? primary : foreground;

        ctx.beginPath();
        ctx.lineWidth = isAccent ? 1.05 : 0.65;
        ctx.strokeStyle = `hsl(${color} / ${alpha})`;

        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const x = i * cellSize;
            const y = j * cellSize;

            const v0 = values[j * cols + i];
            const v1 = values[j * cols + i + 1];
            const v2 = values[(j + 1) * cols + i + 1];
            const v3 = values[(j + 1) * cols + i];

            let idx = 0;
            if (v0 >= threshold) idx |= 1;
            if (v1 >= threshold) idx |= 2;
            if (v2 >= threshold) idx |= 4;
            if (v3 >= threshold) idx |= 8;

            const edges = MS_EDGES[idx];
            if (!edges.length) continue;

            const pts = [
              [lerp(x, x + cellSize, v0, v1, threshold), y],
              [x + cellSize, lerp(y, y + cellSize, v1, v2, threshold)],
              [lerp(x, x + cellSize, v3, v2, threshold), y + cellSize],
              [x, lerp(y, y + cellSize, v0, v3, threshold)],
            ];

            for (let e = 0; e < edges.length; e += 2) {
              const p0 = pts[edges[e]];
              const p1 = pts[edges[e + 1]];
              ctx.moveTo(p0[0], p0[1]);
              ctx.lineTo(p1[0], p1[1]);
            }
          }
        }

        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <canvas ref={canvasRef} aria-hidden="true" className="block opacity-70" />
    </div>
  );
};
