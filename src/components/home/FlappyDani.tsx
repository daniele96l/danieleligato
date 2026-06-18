import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const W = 420;
const H = 560;
const GRAVITY = 0.45;
const FLAP = -7.5;
const PIPE_GAP = 160;
const PIPE_W = 60;
const PIPE_SPEED = 2.2;
const PIPE_INTERVAL = 95; // frames

const JOBS = ['ML Engineer', 'Data Scientist', 'AI Founder', 'Quant Dev', 'Research', 'Staff MLE', 'CTO', 'PhD'];

type Pipe = { x: number; gapY: number; label: string; passed: boolean };

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const FlappyDani = ({ open, onOpenChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('flappy-dani-best') || 0));
  const [state, setState] = useState<'ready' | 'playing' | 'dead'>('ready');

  const gameRef = useRef({
    y: H / 2,
    vy: 0,
    pipes: [] as Pipe[],
    tick: 0,
    score: 0,
  });

  const reset = useCallback(() => {
    gameRef.current = { y: H / 2, vy: 0, pipes: [], tick: 0, score: 0 };
    setScore(0);
    setState('ready');
  }, []);

  const flap = useCallback(() => {
    if (state === 'dead') { reset(); return; }
    if (state === 'ready') setState('playing');
    gameRef.current.vy = FLAP;
  }, [state, reset]);

  useEffect(() => {
    if (!open) return;
    reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, flap]);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;

    const loop = () => {
      const g = gameRef.current;
      // Update
      if (state === 'playing') {
        g.tick++;
        g.vy += GRAVITY;
        g.y += g.vy;

        if (g.tick % PIPE_INTERVAL === 0) {
          const gapY = 80 + Math.random() * (H - 160 - PIPE_GAP);
          g.pipes.push({ x: W, gapY, label: JOBS[Math.floor(Math.random() * JOBS.length)], passed: false });
        }
        g.pipes.forEach(p => p.x -= PIPE_SPEED);
        g.pipes = g.pipes.filter(p => p.x + PIPE_W > -20);

        // Collisions
        const dx = 80, r = 16;
        if (g.y + r > H - 20 || g.y - r < 0) setState('dead');
        for (const p of g.pipes) {
          if (dx + r > p.x && dx - r < p.x + PIPE_W) {
            if (g.y - r < p.gapY || g.y + r > p.gapY + PIPE_GAP) { setState('dead'); break; }
          }
          if (!p.passed && p.x + PIPE_W < dx - r) {
            p.passed = true;
            g.score++;
            setScore(g.score);
          }
        }
      }

      // Draw - monochrome to match site
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, W, H);

      // subtle isolines bg
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, i * 40, 0, Math.PI * 2);
        ctx.stroke();
      }

      // pipes (job offers)
      g.pipes.forEach(p => {
        ctx.fillStyle = '#111';
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H - p.gapY - PIPE_GAP - 20);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px ui-sans-serif, system-ui';
        ctx.save();
        ctx.translate(p.x + PIPE_W / 2, p.gapY - 10);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'right';
        ctx.fillText(p.label, 0, 4);
        ctx.restore();
      });

      // ground
      ctx.fillStyle = '#111';
      ctx.fillRect(0, H - 20, W, 20);

      // Dani (bird)
      const dx = 80;
      ctx.save();
      ctx.translate(dx, g.y);
      const tilt = Math.max(-0.5, Math.min(1, g.vy / 12));
      ctx.rotate(tilt);
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', 0, 1);
      ctx.restore();

      // score
      ctx.fillStyle = '#111';
      ctx.font = 'bold 32px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(String(g.score), W / 2, 50);

      if (state === 'ready') {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fillRect(40, H / 2 - 50, W - 80, 100);
        ctx.strokeStyle = '#111';
        ctx.strokeRect(40, H / 2 - 50, W - 80, 100);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 18px ui-sans-serif, system-ui';
        ctx.fillText('Help Dani chase jobs', W / 2, H / 2 - 12);
        ctx.font = '14px ui-sans-serif, system-ui';
        ctx.fillText('Tap / Space to flap', W / 2, H / 2 + 16);
      }
      if (state === 'dead') {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(40, H / 2 - 70, W - 80, 140);
        ctx.strokeStyle = '#111';
        ctx.strokeRect(40, H / 2 - 70, W - 80, 140);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 22px ui-sans-serif, system-ui';
        ctx.fillText('Rejected!', W / 2, H / 2 - 30);
        ctx.font = '14px ui-sans-serif, system-ui';
        ctx.fillText(`Score: ${g.score}  ·  Best: ${Math.max(best, g.score)}`, W / 2, H / 2);
        ctx.fillText('Tap to retry', W / 2, H / 2 + 28);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, state, best]);

  useEffect(() => {
    if (state === 'dead' && score > best) {
      setBest(score);
      localStorage.setItem('flappy-dani-best', String(score));
    }
  }, [state, score, best]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>🐤 Flappy Dani — chasing jobs</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onClick={flap}
            onTouchStart={(e) => { e.preventDefault(); flap(); }}
            className="rounded-md border border-border cursor-pointer touch-none"
            style={{ width: '100%', maxWidth: W, height: 'auto' }}
          />
          <div className="flex w-full justify-between text-sm text-muted-foreground">
            <span>Score: <b className="text-foreground">{score}</b></span>
            <span>Best: <b className="text-foreground">{Math.max(best, score)}</b></span>
          </div>
          <Button variant="outline" size="sm" onClick={reset} className="w-full">Reset</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
