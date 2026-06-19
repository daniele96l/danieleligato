import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bug, RotateCcw, Play, Terminal } from 'lucide-react';

const W = 420;
const H = 560;
const GRAVITY = 0.28;
const FLAP = -5.5;
const PIPE_GAP = 190;
const PIPE_W = 68;
const PIPE_SPEED = 1.7;
const PIPE_INTERVAL = 120;
const GROUND = 24;

const BUGS = [
  'SyntaxError', 'NullPtr', 'OffByOne', 'undefined', 'RaceCond',
  'MemLeak', 'StackOverflow', 'TypeError', 'InfLoop', 'SegFault',
];

const CODE_LINES = [
  'const fix = () => bug.catch();',
  'if (!ready) throw new Error();',
  'while (bugs.length) ship();',
  'return await debug(stack);',
  'function flap() { y += dy; }',
  'export default Dani;',
  'try { commit(); } catch {}',
  '// TODO: handle edge case',
  'npm run dev --turbo',
  'git rebase -i HEAD~3',
];

type Pipe = { x: number; gapY: number; label: string; passed: boolean; caught: boolean };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; char: string; color?: string };
type Jet = { x: number; y: number; vx: number; vy: number; life: number; max: number; text: string };
type Flash = { x: number; y: number; life: number };

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export const Game = ({ open, onOpenChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('code-bugs-best') || 0));
  const [state, setState] = useState<'ready' | 'playing' | 'dead'>('ready');
  const [started, setStarted] = useState(false);

  const gameRef = useRef({
    y: H / 2,
    vy: 0,
    pipes: [] as Pipe[],
    particles: [] as Particle[],
    jets: [] as Jet[],
    flashes: [] as Flash[],
    shake: 0,
    tick: 0,
    score: 0,
  });

  const reset = useCallback(() => {
    gameRef.current = { y: H / 2, vy: 0, pipes: [], particles: [], jets: [], flashes: [], shake: 0, tick: 0, score: 0 };
    setScore(0);
    setState('ready');
  }, []);

  const fireJet = useCallback(() => {
    const g = gameRef.current;
    const snippets = ['{}', '()', '=>', '0x', '01', '++', '//', '<>', ';;', 'fn'];
    for (let i = 0; i < 7; i++) {
      g.jets.push({
        x: 78 + (Math.random() - 0.5) * 4,
        y: g.y + 12 + Math.random() * 4,
        vx: -1.2 - Math.random() * 1.4,
        vy: 1.5 + Math.random() * 2.2,
        life: 0,
        max: 26 + Math.random() * 14,
        text: snippets[Math.floor(Math.random() * snippets.length)],
      });
    }
  }, []);

  const flap = useCallback(() => {
    if (state === 'dead') { reset(); return; }
    if (state === 'ready') setState('playing');
    gameRef.current.vy = FLAP;
    fireJet();
  }, [state, reset, fireJet]);

  // Show start screen each time dialog opens
  useEffect(() => {
    if (open) {
      setStarted(false);
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (!open || !started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, started, flap]);

  const spawnCatchFX = (x: number, y: number) => {
    const g = gameRef.current;
    g.flashes.push({ x, y, life: 22 });
    g.shake = 7;
    const chars = ['✓', '✶', '+', '·', '{}', '</>', ';'];
    for (let i = 0; i < 22; i++) {
      const a = (Math.PI * 2 * i) / 22 + Math.random() * 0.3;
      const sp = 2 + Math.random() * 3.5;
      g.particles.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1,
        life: 0, max: 30 + Math.random() * 14,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
  };

  useEffect(() => {
    if (!open || !started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;

    const drawCodeBg = (scroll: number) => {
      // Editor background
      ctx.fillStyle = '#0e0e10';
      ctx.fillRect(0, 0, W, H);

      // Title bar
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, W, 22);
      // Window dots
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.beginPath(); ctx.arc(12 + i * 14, 11, 4, 0, Math.PI * 2); ctx.fill();
      });
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('dani.ts — bug-hunter', W / 2, 14);

      // Gutter (line numbers)
      ctx.fillStyle = '#141417';
      ctx.fillRect(0, 22, 28, H - 22);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath(); ctx.moveTo(28, 22); ctx.lineTo(28, H); ctx.stroke();

      // Scrolling code lines
      ctx.textAlign = 'left';
      ctx.font = '11px ui-monospace, monospace';
      const lineH = 18;
      const totalLines = Math.ceil((H - 22) / lineH) + 2;
      const yOffset = (scroll * 0.6) % lineH;
      for (let i = 0; i < totalLines; i++) {
        const yy = 22 + i * lineH - yOffset + 12;
        const idx = (i + Math.floor(scroll * 0.6 / lineH)) % CODE_LINES.length;
        const ln = ((i + Math.floor(scroll * 0.6 / lineH)) % 99) + 1;
        // line number
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.textAlign = 'right';
        ctx.fillText(String(ln).padStart(2, ' '), 24, yy);
        // code
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(120,200,255,0.18)';
        ctx.fillText(CODE_LINES[(idx + CODE_LINES.length) % CODE_LINES.length], 34, yy);
      }

      // Status bar (floor)
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(0, H - GROUND, W, GROUND);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '10px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('main*', 8, H - GROUND + 15);
      ctx.fillText('UTF-8', 60, H - GROUND + 15);
      ctx.textAlign = 'right';
      ctx.fillText('TypeScript', W - 8, H - GROUND + 15);
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
        if (g.y + r > H - GROUND || g.y - r < 22) setState('dead');

        for (const p of g.pipes) {
          if (dx + r > p.x && dx - r < p.x + PIPE_W) {
            if (g.y - r < p.gapY || g.y + r > p.gapY + PIPE_GAP) { setState('dead'); break; }
          }
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

        g.particles.forEach(pt => {
          pt.x += pt.vx; pt.y += pt.vy;
          pt.vy += 0.18; pt.vx *= 0.98;
          pt.life++;
        });
        g.particles = g.particles.filter(pt => pt.life < pt.max);
        g.jets.forEach(j => {
          j.x += j.vx; j.y += j.vy;
          j.vy += 0.05; j.vx *= 0.99;
          j.life++;
        });
        g.jets = g.jets.filter(j => j.life < j.max && j.y < H - GROUND);
        g.flashes.forEach(f => f.life--);
        g.flashes = g.flashes.filter(f => f.life > 0);
        if (g.shake > 0) g.shake -= 0.6;
      }

      const shake = Math.max(0, g.shake);
      const sx = (Math.random() - 0.5) * shake;
      const sy = (Math.random() - 0.5) * shake;
      ctx.save();
      ctx.translate(sx, sy);

      drawCodeBg(g.tick);

      // Code block obstacles (curly braces)
      g.pipes.forEach(p => {
        // Top block
        ctx.fillStyle = '#27272a';
        ctx.fillRect(p.x, 22, PIPE_W, p.gapY - 22);
        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(p.x, p.gapY - 8, PIPE_W, 8);
        // Bottom block
        ctx.fillStyle = '#27272a';
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, H - GROUND - (p.gapY + PIPE_GAP));
        ctx.fillStyle = '#3f3f46';
        ctx.fillRect(p.x, p.gapY + PIPE_GAP, PIPE_W, 8);

        // Edge accent (syntax green)
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(p.x, 22, 2, p.gapY - 22);
        ctx.fillRect(p.x + PIPE_W - 2, p.gapY + PIPE_GAP, 2, H - GROUND - (p.gapY + PIPE_GAP));

        // Faux code inside blocks
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.font = '9px ui-monospace, monospace';
        ctx.textAlign = 'left';
        for (let yy = 32; yy < p.gapY - 14; yy += 12) {
          const len = 4 + Math.abs(Math.floor(yy + p.x)) % 7;
          ctx.fillText('░'.repeat(len), p.x + 4, yy);
        }
        for (let yy = p.gapY + PIPE_GAP + 16; yy < H - GROUND - 4; yy += 12) {
          const len = 4 + Math.abs(Math.floor(yy + p.x)) % 7;
          ctx.fillText('░'.repeat(len), p.x + 4, yy);
        }

        // Braces decoration
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 14px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('{', p.x + PIPE_W / 2, p.gapY - 14);
        ctx.fillText('}', p.x + PIPE_W / 2, p.gapY + PIPE_GAP + 16);

        // Bug
        if (!p.caught) {
          const bugX = p.x + PIPE_W / 2;
          const bugY = p.gapY + PIPE_GAP / 2;
          const pulse = 1 + Math.sin(g.tick * 0.15) * 0.2;
          // red error halo
          ctx.fillStyle = 'rgba(239,68,68,0.18)';
          ctx.beginPath(); ctx.arc(bugX, bugY, 22 * pulse, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(bugX, bugY, 18, 0, Math.PI * 2); ctx.stroke();
          // bug
          ctx.font = '22px ui-sans-serif, system-ui';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🐛', bugX, bugY);
          // label tag (error style)
          ctx.font = 'bold 9px ui-monospace, monospace';
          const tw = ctx.measureText(p.label).width + 10;
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(bugX - tw / 2, bugY + 14, tw, 13);
          ctx.fillStyle = '#fff';
          ctx.fillText(p.label, bugX, bugY + 21);
          ctx.textBaseline = 'alphabetic';
        }
      });

      // Dani (debugger)
      const dx = 80;
      ctx.save();
      ctx.translate(dx, g.y);
      const tilt = Math.max(-0.5, Math.min(1, g.vy / 12));
      ctx.rotate(tilt);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath(); ctx.ellipse(2, 18, 14, 4, 0, 0, Math.PI * 2); ctx.fill();

      // Jetpack (on Dani's back / underside)
      ctx.fillStyle = '#52525b';
      ctx.fillRect(-14, 6, 10, 14);
      ctx.fillStyle = '#71717a';
      ctx.fillRect(-14, 6, 10, 3);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(-12, 8, 2, 2);
      // nozzle
      ctx.fillStyle = '#27272a';
      ctx.fillRect(-12, 20, 6, 3);
      // idle flame when thrusting (vy negative = just flapped)
      if (g.vy < 0) {
        const flick = 4 + Math.random() * 4;
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.moveTo(-12, 23); ctx.lineTo(-9, 23 + flick); ctx.lineTo(-6, 23);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-11, 23); ctx.lineTo(-9, 23 + flick * 0.6); ctx.lineTo(-7, 23);
        ctx.closePath(); ctx.fill();
      }

      // body
      ctx.fillStyle = '#fafafa';
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.stroke();
      // net stick
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(24, 14); ctx.stroke();
      ctx.beginPath(); ctx.arc(28, 17, 7, 0, Math.PI * 2); ctx.stroke();
      // D
      ctx.fillStyle = '#111';
      ctx.font = 'bold 13px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', 0, 1);
      ctx.textBaseline = 'alphabetic';
      ctx.restore();

      // Jet trail (code lines fired by jetpack)
      g.jets.forEach(j => {
        const t = 1 - j.life / j.max;
        ctx.globalAlpha = Math.max(0, t);
        ctx.fillStyle = '#22c55e';
        ctx.font = `bold ${9 + t * 4}px ui-monospace, monospace`;
        ctx.textAlign = 'left';
        ctx.fillText(j.text, j.x, j.y);
      });
      ctx.globalAlpha = 1;

      // Particles
      g.particles.forEach(pt => {
        const t = 1 - pt.life / pt.max;
        ctx.globalAlpha = t;
        ctx.fillStyle = '#22c55e';
        ctx.font = `bold ${10 + t * 6}px ui-monospace, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(pt.char, pt.x, pt.y);
      });
      ctx.globalAlpha = 1;

      // Flash rings
      g.flashes.forEach(f => {
        const t = f.life / 22;
        ctx.globalAlpha = t;
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(f.x, f.y, (1 - t) * 40 + 6, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(f.x, f.y, (1 - t) * 26 + 4, 0, Math.PI * 2); ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Score (top)
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font = 'bold 30px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(g.score), W / 2, 60);

      ctx.restore();

      if (state === 'ready') {
        ctx.fillStyle = 'rgba(14,14,16,0.92)';
        ctx.fillRect(30, H / 2 - 70, W - 60, 140);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 70, W - 60, 140);
        ctx.fillStyle = '#fafafa';
        ctx.font = 'bold 16px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('> debug --catch-all 🐛', W / 2, H / 2 - 28);
        ctx.font = '12px ui-monospace, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('Fly through {} blocks', W / 2, H / 2 - 4);
        ctx.fillText('Grab bugs in the middle', W / 2, H / 2 + 18);
        ctx.fillStyle = '#22c55e';
        ctx.fillText('SPACE / TAP to flap', W / 2, H / 2 + 44);
      }

      if (state === 'dead') {
        ctx.fillStyle = 'rgba(14,14,16,0.96)';
        ctx.fillRect(30, H / 2 - 80, W - 60, 160);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, H / 2 - 80, W - 60, 160);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✗ Build failed', W / 2, H / 2 - 38);
        ctx.fillStyle = '#fafafa';
        ctx.font = '13px ui-monospace, monospace';
        ctx.fillText(`Caught: ${g.score}  ·  Best: ${Math.max(best, g.score)}`, W / 2, H / 2 - 6);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('Tap or press Space to retry', W / 2, H / 2 + 22);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, started, state, best]);

  useEffect(() => {
    if (state === 'dead' && score > best) {
      setBest(score);
      localStorage.setItem('code-bugs-best', String(score));
    }
  }, [state, score, best]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Code Bug Hunt
          </DialogTitle>
          <DialogDescription>
            Help Dani fly through the codebase and squash bugs.
          </DialogDescription>
        </DialogHeader>

        {!started ? (
          <div className="flex flex-col items-center gap-5 py-6 px-2 rounded-lg border border-border bg-[#0e0e10] text-[#fafafa] font-mono">
            <div className="text-xs text-[#22c55e]">$ ./dani --mode=debug</div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Bug className="w-6 h-6 text-[#ef4444]" />
              Code Bug Hunt
            </div>
            <div className="text-center text-sm text-white/70 max-w-[300px] leading-relaxed">
              You are <b className="text-white">Dani</b>, a flying debugger.
              Navigate through <span className="text-[#facc15]">{`{ }`}</span> code blocks
              and catch <span className="text-[#ef4444]">bugs</span> floating in the gaps.
            </div>
            <div className="text-xs text-white/50">
              Controls: <span className="text-[#22c55e]">SPACE</span> / <span className="text-[#22c55e]">TAP</span> to flap
            </div>
            <Button
              onClick={() => setStarted(true)}
              className="gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold"
            >
              <Play className="w-4 h-4" />
              Start Game
            </Button>
            {best > 0 && (
              <div className="text-xs text-white/40">Best run: {best} bugs caught</div>
            )}
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};
