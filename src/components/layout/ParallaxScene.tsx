import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingMeshes } from './FloatingMeshes';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return mobile;
}

function SceneContents({
  scrollY,
  pointer,
  isMobile,
}: {
  scrollY: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number; clientX: number; clientY: number; vx: number; vy: number }>;
  isMobile: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={0.55} />
      <FloatingMeshes scrollY={scrollY} pointer={pointer} isMobile={isMobile} />
    </>
  );
}

export const ParallaxScene = () => {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const scrollY = useRef(0);
  const pointer = useRef({ x: 0, y: 0, clientX: 0, clientY: 0, vx: 0, vy: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let hasLast = false;

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    const onPointer = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      if (hasLast) {
        pointer.current.vx = ((e.clientX - lastX) / dt) * 16;
        pointer.current.vy = ((e.clientY - lastY) / dt) * 16;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      hasLast = true;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.clientX = e.clientX;
      pointer.current.clientY = e.clientY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContents scrollY={scrollY} pointer={pointer} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};
