import { useEffect, useRef } from 'react';

export const IsolineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
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

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
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
          const wob =
            Math.sin(a * 3 + t * 1.5 + i * 0.4) * 8 +
            Math.cos(a * 5 - t + i * 0.7) * 5;
          const r = baseR + wob;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * 0.85;

          // Cursor distortion: lines near the mouse get extra wiggle
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.hypot(dx, dy);
          const falloff = Math.exp(-dist * dist / (280 * 280));
          const cursorWiggle = falloff * 30 * Math.sin(t * 4 + a * 6 + i * 0.5);

          const rDistorted = r + cursorWiggle;
          const xDistorted = cx + Math.cos(a) * rDistorted;
          const yDistorted = cy + Math.sin(a) * rDistorted * 0.85;

          if (s === 0) ctx.moveTo(xDistorted, yDistorted);
          else ctx.lineTo(xDistorted, yDistorted);
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
