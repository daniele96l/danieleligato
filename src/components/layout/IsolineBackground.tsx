import { useEffect, useRef } from 'react';

export const IsolineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
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
      mouseRef.current.x = mouseRef.current.tx = width / 2;
      mouseRef.current.y = mouseRef.current.ty = height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    // Read primary color from CSS variable
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--primary').trim() || '220 90% 56%';
    const foreground = styles.getPropertyValue('--foreground').trim() || '0 0% 10%';

    let t = 0;

    const draw = () => {
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;
      t += 0.003;

      ctx.clearRect(0, 0, width, height);

      const cx = m.x;
      const cy = m.y;
      const rings = 18;
      const maxR = Math.hypot(width, height) * 0.9;

      for (let i = 0; i < rings; i++) {
        const progress = i / rings;
        const baseR = progress * maxR + (Math.sin(t * 2 + i * 0.5) * 12);
        const alpha = (1 - progress) * 0.22 + 0.04;
        const isAccent = i % 4 === 0;
        const color = isAccent ? primary : foreground;
        ctx.beginPath();
        const segs = 120;
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          // Wobble the ring with low-frequency noise-ish trig
          const wob =
            Math.sin(a * 3 + t * 1.5 + i * 0.4) * 8 +
            Math.cos(a * 5 - t + i * 0.7) * 5;
          const r = baseR + wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.85;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.lineWidth = isAccent ? 1.1 : 0.7;
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
      className="fixed inset-0 -z-10 pointer-events-none opacity-70"
    />
  );
};
