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

const BUGS = ['BUG', 'CRASH', 'FIX', 'ISSUE', 'OOPS', 'HOTFIX'];

type Pipe = { x: number; gapY: number; label: string; passed: boolean };

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

    const drawOfficeBg = () => {
      // Floor tiles
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, W, H);

      // Subtle grid lines (office floor tiles)
      ctx.strokeStyle = 'rgba(0,0,0,0.04)';
      ctx.lineWidth = 1;
      const tileSize = 40;
      for (let x = 0; x < W; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H - 20);
        ctx.stroke();
      }
      for (let y = 0; y < H - 20; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Window silhouette on the left side
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      ctx.fillRect(20, 40, 80, 100);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 40, 80, 100);
      ctx.beginPath();
      ctx.moveTo(60, 40);
      ctx.lineTo(60, 140);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(20, 90);
      ctx.lineTo(100, 90);
      ctx.stroke();
    };

    const loop = () => {
      const g = gameRef.current;
      // Update
      if (state === 'playing') {
        g.tick++;
        g.vy += GRAVITY;
        g.y += g.vy;

        if (g.tick % PIPE_INTERVAL === 0) {
          const gapY = 80 + Math.random() * (H - 160 - PIPE_GAP);
          g.pipes.push({ x: W, gapY, label: BUGS[Math.floor(Math.random() * BUGS.length)], passed: false });
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

      // Draw
      drawOfficeBg();

      // Office partitions (bug obstacles)
      g.pipes.forEach(p => {
        // Partition body
        ctx.fillStyle = '#111';
        ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H - p.gapY - PIPE_GAP - 20);

        // Partition edges (3D effect)
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(p.x + PIPE_W - 4, 0, 4, p.gapY);
        ctx.fillRect(p.x + PIPE_W - 4, p.gapY + PIPE_GAP, 4, H - p.gapY - PIPE_GAP - 20);

        // Bug label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px ui-sans-serif, system-ui';
        ctx.save();
        ctx.translate(p.x + PIPE_W / 2, p.gapY - 12);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'right';
        ctx.fillText(p.label, 0, 4);
        ctx.restore();

        // Small bug icon on top partition
        ctx.fillStyle = '#fff';
        ctx.font = '10px ui-sans-serif, system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('🐛', p.x + PIPE_W / 2, p.gapY - 4);

        // Small bug icon on bottom partition
        ctx.fillText('🐛', p.x + PIPE_W / 2, p.gapY + PIPE_GAP + 14);
      });

      // Office floor (ground)
      ctx.fillStyle = '#111';
      ctx.fillRect(0, H - 20, W, 20);
      // Floor baseboard line
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H - 20);
      ctx.lineTo(W, H - 20);
      ctx.stroke();

      // Dani (bug catcher)
      const dx = 80;
      ctx.save();
      ctx.translate(dx, g.y);
      const tilt = Math.max(-0.5, Math.min(1, g.vy / 12));
      ctx.rotate(tilt);
      // Body
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      // Net handle stick
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 5);
      ctx.lineTo(22, 12);
      ctx.stroke();
      // Net circle
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(26, 15, 6, 0, Math.PI * 2);
      ctx.stroke();
      // D label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', 0, 1);
      ctx.restore();

      // Score (bugs caught)
      ctx.fillStyle = '#111';
      ctx.font = 'bold 32px ui-sans-serif, system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(String(g.score), W / 2, 50);

      // Ready screen
      if (state === 'ready') {
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fillRect(30, H / 2 - 65, W - 60, 130);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 65, W - 60, 130);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 18px ui-sans-serif, system-ui';
        ctx.fillText('Help Dani catch office bugs', W / 2, H / 2 - 22);
        ctx.font = '13px ui-sans-serif, system-ui';
        ctx.fillText('Avoid the cubicle walls', W / 2, H / 2 + 2);
        ctx.fillText('Tap canvas or press Space to jump', W / 2, H / 2 + 24);
      }

      // Death screen
      if (state === 'dead') {
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.fillRect(30, H / 2 - 80, W - 60, 160);
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 80, W - 60, 160);
        ctx.fillStyle = '#111';
        ctx.font = 'bold 22px ui-sans-serif, system-ui';
        ctx.fillText('Bugs escaped!', W / 2, H / 2 - 38);
        ctx.font = '14px ui-sans-serif, system-ui';
        ctx.fillText(`Caught: ${g.score}  ·  Best: ${Math.max(best, g.score)}`, W / 2, H / 2 - 6);
        ctx.font = '13px ui-sans-serif, system-ui';
        ctx.fillText('Tap canvas or press Space to retry', W / 2, H / 2 + 22);
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
