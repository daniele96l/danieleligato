import { useEffect, useRef } from 'react';

export const IsolineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--primary').trim() || '220 90% 56%';
    const foreground = styles.getPropertyValue('--foreground').trim() || '0 0% 10%';

    let t = 0;

    // Scattered "centers" so there's no single focal point
    const seeds = Array.from({ length: 6 }, (_, i) => ({
      x: ((i * 137.5) % 100) / 100,
      y: ((i * 73.3) % 100) / 100,
      phase: i * 1.7,
    }));

    const draw = () => {
      t += 0.0008;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const rings = 16;
      const maxR = Math.hypot(width, height) * 0.55;

      for (let i = 0; i < rings; i++) {
        const progress = i / rings;
        const seed = seeds[i % seeds.length];
        const drift = 40;
        const cx = seed.x * width + Math.sin(t * 0.6 + seed.phase) * drift;
        const cy = seed.y * height + Math.cos(t * 0.5 + seed.phase * 1.3) * drift;

        const baseR = (0.1 + progress * 0.9) * maxR + Math.sin(t + i * 0.5) * 8;
        const alpha = (1 - progress) * 0.10 + 0.02;
        const isAccent = i % 4 === 0;
        const color = isAccent ? primary : foreground;
        ctx.beginPath();
        const segs = 120;
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          const wob =
            Math.sin(a * 3 + t * 0.6 + i * 0.4) * 6 +
            Math.cos(a * 5 - t * 0.4 + i * 0.7) * 4;
          const r = baseR + wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.9;

          const dx = x - mx;
          const dy = y - my;
          const dist = Math.hypot(dx, dy);
          const falloff = Math.exp(-(dist * dist) / (260 * 260));
          const cursorWiggle = falloff * 22 * Math.sin(t * 2 + a * 6 + i * 0.5);

          const rDistorted = r + cursorWiggle;
          const xD = cx + Math.cos(a) * rDistorted;
          const yD = cy + Math.sin(a) * rDistorted * 0.9;

          if (s === 0) ctx.moveTo(xD, yD);
          else ctx.lineTo(xD, yD);
        }
        ctx.closePath();
        ctx.lineWidth = isAccent ? 1 : 0.6;
        ctx.strokeStyle = `hsl(${color} / ${alpha})`;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none opacity-30"
    />
  );
};
