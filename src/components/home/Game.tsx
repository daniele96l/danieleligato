import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bug, RotateCcw } from 'lucide-react';

const W = 420;
const H = 560;
const GRAVITY = 0.28;
const FLAP = -5.5;
const PIPE_GAP = 190;
const PIPE_W = 68;
const PIPE_SPEED = 1.7;
const PIPE_INTERVAL = 120; // frames
const GROUND = 24;

const BUGS = ['BUG', 'CRASH', 'NPE', 'OOPS', 'TODO', 'HOTFIX', 'LEAK', '404'];

type Pipe = { x: number; gapY: number; label: string; passed: boolean; caught: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; char: string };
type Flash = { x: number; y: number; life: number };

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const Game = ({ open, onOpenChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('office-bugs-best') || 0));
  const [state, setState] = useState<'ready' | 'playing' | 'dead'>('ready');

  const gameRef = useRef({
    y: H / 2,
    vy: 0,
    pipes: [] as Pipe[],
    particles: [] as Particle[],
    flashes: [] as Flash[],
    shake: 0,
    tick: 0,
    score: 0,
  });

  const reset = useCallback(() => {
    gameRef.current = { y: H / 2, vy: 0, pipes: [], particles: [], flashes: [], shake: 0, tick: 0, score: 0 };
    setScore(0);
    setState('ready');
  }, []);

  const flap = useCallback(() => {
    if (state === 'dead') { reset(); return; }
    if (state === 'ready') setState('playing');
    gameRef.current.vy = FLAP;
  }, [state, reset]);

  useEffect(() => { if (open) reset(); }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, flap]);

  const spawnCatchFX = (x: number, y: number) => {
    const g = gameRef.current;
    g.flashes.push({ x, y, life: 18 });
    g.shake = 6;
    const chars = ['✶', '✱', '✦', '+', '·', '✺'];
    for (let i = 0; i < 18; i++) {
      const a = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
      const sp = 2 + Math.random() * 3;
      g.particles.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1,
        life: 0, max: 28 + Math.random() * 12,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
  };

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;

    const drawOfficeBg = (scroll: number) => {
      // Wall
      ctx.fillStyle = '#f5f5f4';
      ctx.fillRect(0, 0, W, H);

      // Ceiling band with fluorescent lights
      ctx.fillStyle = '#ececea';
      ctx.fillRect(0, 0, W, 26);
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, 26); ctx.lineTo(W, 26); ctx.stroke();
      // Light fixtures
      ctx.fillStyle = '#111';
      for (let i = 0; i < 4; i++) {
        const lx = 30 + i * 100 - (scroll * 0.2) % 100;
        ctx.fillRect(lx, 6, 60, 6);
        ctx.fillStyle = 'rgba(255,255,200,0.5)';
        ctx.fillRect(lx + 2, 12, 56, 3);
        ctx.fillStyle = '#111';
      }

      // Wall paneling lines
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, 180); ctx.lineTo(W, 180); ctx.stroke();

      // Background desks silhouette (parallax)
      const offset = (scroll * 0.4) % 120;
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      for (let i = -1; i < 5; i++) {
        const dx = i * 120 - offset;
        // monitor
        ctx.fillRect(dx + 20, H - GROUND - 80, 50, 34);
        ctx.fillRect(dx + 40, H - GROUND - 46, 10, 8);
        ctx.fillRect(dx + 30, H - GROUND - 38, 30, 4);
        // desk
        ctx.fillRect(dx + 10, H - GROUND - 30, 80, 6);
        ctx.fillRect(dx + 14, H - GROUND - 24, 4, 24);
        ctx.fillRect(dx + 82, H - GROUND - 24, 4, 24);
      }

      // Floor
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, H - GROUND, W, GROUND);
      // Floor planks
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      const planks = 8;
      for (let i = 0; i < planks; i++) {
        const px = (i * 60 - scroll * 1.5) % (W + 60);
        ctx.beginPath();
        ctx.moveTo(px, H - GROUND);
        ctx.lineTo(px, H);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.moveTo(0, H - GROUND); ctx.lineTo(W, H - GROUND); ctx.stroke();
    };

    const loop = () => {
      const g = gameRef.current;

      if (state === 'playing') {
        g.tick++;
        g.vy += GRAVITY;
        g.y += g.vy;

        if (g.tick % PIPE_INTERVAL === 0) {
          const gapY = 60 + Math.random() * (H - GROUND - 80 - PIPE_GAP);
          g.pipes.push({ x: W, gapY, label: BUGS[Math.floor(Math.random() * BUGS.length)], passed: false, caught: false });
        }
        g.pipes.forEach(p => p.x -= PIPE_SPEED);
        g.pipes = g.pipes.filter(p => p.x + PIPE_W > -20);

        const dx = 80, r = 16;
        if (g.y + r > H - GROUND || g.y - r < 0) setState('dead');

        for (const p of g.pipes) {
          // Cubicle walls collision
          if (dx + r > p.x && dx - r < p.x + PIPE_W) {
            if (g.y - r < p.gapY || g.y + r > p.gapY + PIPE_GAP) { setState('dead'); break; }
          }
          // Bug pickup in middle of the gap
          const bugX = p.x + PIPE_W / 2;
          const bugY = p.gapY + PIPE_GAP / 2;
          if (!p.caught) {
            const ddx = bugX - dx, ddy = bugY - g.y;
            if (ddx * ddx + ddy * ddy < (r + 12) ** 2) {
              p.caught = true;
              g.score++;
              setScore(g.score);
              spawnCatchFX(bugX, bugY);
            }
          }
          if (!p.passed && p.x + PIPE_W < dx - r) p.passed = true;
        }

        // Particles update
        g.particles.forEach(pt => {
          pt.x += pt.vx; pt.y += pt.vy;
          pt.vy += 0.18; pt.vx *= 0.98;
          pt.life++;
        });
        g.particles = g.particles.filter(pt => pt.life < pt.max);
        g.flashes.forEach(f => f.life--);
        g.flashes = g.flashes.filter(f => f.life > 0);
        if (g.shake > 0) g.shake -= 0.6;
      }

      // Camera shake
      const shake = Math.max(0, g.shake);
      const sx = (Math.random() - 0.5) * shake;
      const sy = (Math.random() - 0.5) * shake;
      ctx.save();
      ctx.translate(sx, sy);

      drawOfficeBg(g.tick);

      // Cubicle partitions
      g.pipes.forEach(p => {
        // Top partition
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        // Top cap
        ctx.fillStyle = '#111';
        ctx.fillRect(p.x - 3, p.gapY - 10, PIPE_W + 6, 10);
        // Bottom partition
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H - GROUND - (p.gapY + PIPE_GAP));
        ctx.fillStyle = '#111';
        ctx.fillRect(p.x - 3, p.gapY + PIPE_GAP, PIPE_W + 6, 10);

        // Fabric texture
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 1;
        for (let yy = 6; yy < p.gapY - 12; yy += 6) {
          ctx.beginPath(); ctx.moveTo(p.x + 2, yy); ctx.lineTo(p.x + PIPE_W - 2, yy); ctx.stroke();
        }
        for (let yy = p.gapY + PIPE_GAP + 14; yy < H - GROUND - 2; yy += 6) {
          ctx.beginPath(); ctx.moveTo(p.x + 2, yy); ctx.lineTo(p.x + PIPE_W - 2, yy); ctx.stroke();
        }
        // Edge highlight
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fillRect(p.x, 0, 2, p.gapY);
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, 2, H - GROUND - (p.gapY + PIPE_GAP));

        // Bug in middle of gap
        if (!p.caught) {
          const bugX = p.x + PIPE_W / 2;
          const bugY = p.gapY + PIPE_GAP / 2;
          // pulsing halo
          const pulse = 1 + Math.sin(g.tick * 0.15) * 0.15;
          ctx.fillStyle = 'rgba(0,0,0,0.08)';
          ctx.beginPath(); ctx.arc(bugX, bugY, 18 * pulse, 0, Math.PI * 2); ctx.fill();
          // bug body
          ctx.font = '22px ui-sans-serif, system-ui';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🐛', bugX, bugY);
          // label tag
          ctx.fillStyle = '#111';
          const tw = ctx.measureText(p.label).width;
          ctx.font = 'bold 9px ui-monospace, monospace';
          const lw = Math.max(tw, ctx.measureText(p.label).width) + 8;
          ctx.fillRect(bugX - lw / 2, bugY + 14, lw, 12);
          ctx.fillStyle = '#fff';
          ctx.fillText(p.label, bugX, bugY + 20);
        }
      });

      // Dani
      const dx = 80;
      ctx.save();
      ctx.translate(dx, g.y);
      const tilt = Math.max(-0.5, Math.min(1, g.vy / 12));
      ctx.rotate(tilt);
      // shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath(); ctx.ellipse(2, 18, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
      // body
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill();
      // net stick
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(24, 14); ctx.stroke();
      // net
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(28, 17, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath(); ctx.arc(28, 17, 6, 0, Math.PI * 2); ctx.fill();
      // D
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', 0, 1);
      ctx.restore();

      // Particles
      g.particles.forEach(pt => {
        const t = 1 - pt.life / pt.max;
        ctx.globalAlpha = t;
        ctx.fillStyle = '#111';
        ctx.font = `bold ${10 + t * 6}px ui-sans-serif, system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(pt.char, pt.x, pt.y);
      });
      ctx.globalAlpha = 1;

      // Flash rings
      g.flashes.forEach(f => {
        const t = f.life / 18;
        ctx.globalAlpha = t;
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(f.x, f.y, (1 - t) * 36 + 6, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(f.x, f.y, (1 - t) * 22 + 4, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Score
      ctx.fillStyle = '#111';
      ctx.font = 'bold 34px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(String(g.score), W / 2, 56);

      ctx.restore();

      if (state === 'ready') {
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.fillRect(30, H / 2 - 70, W - 60, 140);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 70, W - 60, 140);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 18px ui-sans-serif, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Help Dani catch office bugs 🐛', W / 2, H / 2 - 28);
        ctx.font = '13px ui-sans-serif, system-ui';
        ctx.fillText('Fly through the cubicle gaps', W / 2, H / 2 - 4);
        ctx.fillText('Grab the bug in the middle to score', W / 2, H / 2 + 18);
        ctx.font = '12px ui-monospace, monospace';
        ctx.fillText('SPACE / TAP to flap', W / 2, H / 2 + 44);
      }

      if (state === 'dead') {
        ctx.fillStyle = 'rgba(255,255,255,0.96)';
        ctx.fillRect(30, H / 2 - 80, W - 60, 160);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 80, W - 60, 160);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 22px ui-sans-serif, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Bugs escaped!', W / 2, H / 2 - 38);
        ctx.font = '14px ui-sans-serif, system-ui';
        ctx.fillText(`Caught: ${g.score}  ·  Best: ${Math.max(best, g.score)}`, W / 2, H / 2 - 6);
        ctx.font = '13px ui-sans-serif, system-ui';
        ctx.fillText('Tap or press Space to retry', W / 2, H / 2 + 22);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, state, best]);

  useEffect(() => {
    if (state === 'dead' && score > best) {
      setBest(score);
      localStorage.setItem('office-bugs-best', String(score));
    }
  }, [state, score, best]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bug className="w-5 h-5" />
            Office Bug Hunt
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onClick={flap}
            onTouchStart={(e) => { e.preventDefault(); flap(); }}
            className="rounded-lg border border-border cursor-pointer touch-none shadow-sm"
            style={{ width: '100%', maxWidth: W, height: 'auto' }}
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Caught </span>
                <b className="text-foreground text-lg">{score}</b>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Best </span>
                <b className="text-foreground text-lg">{Math.max(best, score)}</b>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={reset} className="gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
