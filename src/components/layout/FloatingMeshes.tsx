import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type MotifKind = 'bars' | 'scatter' | 'network' | 'donut' | 'matrix' | 'axes' | 'funnel' | 'trend';

interface MeshConfig {
  kind: MotifKind;
  position: [number, number, number];
  scale: number;
  spin: [number, number, number];
  parallax: number;
  opacity: number;
}

interface FloatingMeshesProps {
  scrollY: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number; clientX: number; clientY: number; vx: number; vy: number }>;
  isMobile: boolean;
}

interface Obstacle {
  left: number;
  top: number;
  right: number;
  bottom: number;
  cx: number;
  cy: number;
}

// Homes biased to page sides — data-science motifs
const DESKTOP_MESHES: MeshConfig[] = [
  { kind: 'bars', position: [-5.2, 1.6, -2], scale: 0.55, spin: [0.08, 0.28, 0.04], parallax: 0.95, opacity: 0.55 },
  { kind: 'donut', position: [5.4, -0.4, -3], scale: 0.5, spin: [0.18, 0.12, 0.22], parallax: 0.75, opacity: 0.48 },
  { kind: 'network', position: [4.8, 2.4, -4], scale: 0.48, spin: [0.1, 0.32, 0.1], parallax: 0.5, opacity: 0.42 },
  { kind: 'scatter', position: [-5.0, -1.6, -3.5], scale: 0.5, spin: [0.12, 0.22, 0.08], parallax: 0.7, opacity: 0.45 },
  { kind: 'trend', position: [-4.6, -2.6, -5], scale: 0.42, spin: [0.1, 0.2, 0.06], parallax: 0.4, opacity: 0.4 },
  { kind: 'matrix', position: [5.6, 1.8, -6], scale: 0.55, spin: [0.06, 0.24, 0.04], parallax: 0.35, opacity: 0.28 },
  { kind: 'axes', position: [-5.8, 0.6, -5.5], scale: 0.45, spin: [0.2, 0.1, 0.15], parallax: 0.45, opacity: 0.38 },
  { kind: 'funnel', position: [5.2, -2.6, -2.5], scale: 0.4, spin: [0.25, 0.14, 0.12], parallax: 0.9, opacity: 0.44 },
];

const MOBILE_MESHES = DESKTOP_MESHES.slice(0, 4).map((m) => ({
  ...m,
  opacity: m.opacity * 0.55,
  scale: m.scale * 0.7,
  position: [m.position[0] * 0.72, m.position[1], m.position[2]] as [number, number, number],
}));

const STROKE = '#a1a1aa';
const FILL = '#d4d4d8';
const ACCENT = '#71717a';
const FALLBACK_SELECTOR = 'main h1, main p, main button';
const SPRING = 3.8;
const DAMPING = 4.8;
const CURSOR_RADIUS = 100;
const TEXT_PAD = 56;
const MAX_SPEED = 14;
const RESOLVE_ITERS = 2;
const TEXT_BOUNCE = 0.18;
const CURSOR_BOUNCE = 0.65;
const MIN_KICK = 2.2;
const FLIP_SPIN = 4;
const SLIDE_FRICTION = 0.88;
const POS_BLEND = 0.7;

function Mat({ opacity, wireframe = false, color = STROKE }: { opacity: number; wireframe?: boolean; color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      wireframe={wireframe}
      transparent
      opacity={opacity}
      roughness={0.55}
      metalness={0.1}
      side={THREE.DoubleSide}
    />
  );
}

/** Bar chart — histogram columns */
function BarsMotif({ opacity }: { opacity: number }) {
  const heights = [0.55, 1.1, 0.75, 1.45, 0.95];
  return (
    <group>
      {heights.map((h, i) => (
        <mesh key={i} position={[(i - 2) * 0.38, h / 2 - 0.5, 0]}>
          <boxGeometry args={[0.28, h, 0.28]} />
          <Mat opacity={opacity} wireframe={i % 2 === 0} color={i % 2 === 0 ? STROKE : FILL} />
        </mesh>
      ))}
      <mesh position={[0, -0.55, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.1, 0.04, 0.04]} />
        <Mat opacity={opacity * 0.8} color={ACCENT} />
      </mesh>
    </group>
  );
}

/** Scatter cloud — data points */
function ScatterMotif({ opacity }: { opacity: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number, number][] = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const r = 0.35 + (i % 5) * 0.12;
      pts.push([Math.cos(a) * r, Math.sin(a * 1.3) * r * 0.7, Math.sin(a) * 0.25, 0.06 + (i % 3) * 0.025]);
    }
    return pts;
  }, []);
  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]}>
          <sphereGeometry args={[p[3], 10, 10]} />
          <Mat opacity={opacity} wireframe={i % 3 === 0} />
        </mesh>
      ))}
    </group>
  );
}

/** Neural / graph network — nodes + edges */
function NetworkMotif({ opacity }: { opacity: number }) {
  const nodes = useMemo(
    () =>
      [
        [0, 0, 0],
        [0.7, 0.45, 0.2],
        [-0.65, 0.4, -0.15],
        [0.55, -0.55, 0.1],
        [-0.5, -0.5, 0.25],
        [0.1, 0.75, -0.3],
      ] as [number, number, number][],
    []
  );
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [2, 5],
    [3, 4],
  ];
  return (
    <group>
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={n}>
          <sphereGeometry args={[i === 0 ? 0.16 : 0.1, 12, 12]} />
          <Mat opacity={opacity} wireframe={i !== 0} color={i === 0 ? FILL : STROKE} />
        </mesh>
      ))}
      {edges.map(([a, b], i) => {
        const pa = new THREE.Vector3(...nodes[a]);
        const pb = new THREE.Vector3(...nodes[b]);
        const mid = pa.clone().add(pb).multiplyScalar(0.5);
        const dir = pb.clone().sub(pa);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={`e-${i}`} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.015, 0.015, len, 6]} />
            <Mat opacity={opacity * 0.7} color={ACCENT} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Donut / pie chart */
function DonutMotif({ opacity }: { opacity: number }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.22, 12, 36]} />
        <Mat opacity={opacity} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.7, 0.12, 8, 24, Math.PI * 0.7]} />
        <Mat opacity={opacity * 0.9} color={FILL} />
      </mesh>
    </group>
  );
}

/** Confusion-matrix / grid */
function MatrixMotif({ opacity }: { opacity: number }) {
  const cells = useMemo(() => {
    const c: [number, number, number][] = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        c.push([(x - 1) * 0.4, (y - 1) * 0.4, 0]);
      }
    }
    return c;
  }, []);
  return (
    <group>
      {cells.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.28, 0.28, 0.08]} />
          <Mat opacity={opacity * (0.5 + (i % 3) * 0.15)} wireframe={i % 2 === 0} />
        </mesh>
      ))}
    </group>
  );
}

/** XYZ axes — feature space */
function AxesMotif({ opacity }: { opacity: number }) {
  return (
    <group>
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 6]} />
        <Mat opacity={opacity} color={STROKE} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 6]} />
        <Mat opacity={opacity} color={FILL} />
      </mesh>
      <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 6]} />
        <Mat opacity={opacity} color={ACCENT} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.08, 10, 10]} />
        <Mat opacity={opacity} />
      </mesh>
    </group>
  );
}

/** Conversion funnel */
function FunnelMotif({ opacity }: { opacity: number }) {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.55, 0.4, 0.28, 6]} />
        <Mat opacity={opacity} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.25, 0.28, 6]} />
        <Mat opacity={opacity * 0.85} color={FILL} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.25, 0.12, 0.28, 6]} />
        <Mat opacity={opacity} wireframe />
      </mesh>
    </group>
  );
}

/** Line / trend chart — rising polyline of markers */
function TrendMotif({ opacity }: { opacity: number }) {
  const pts = [
    [-0.8, -0.35, 0],
    [-0.4, -0.1, 0],
    [0, 0.15, 0],
    [0.4, 0.05, 0],
    [0.8, 0.55, 0],
  ] as [number, number, number][];
  return (
    <group>
      {pts.map((p, i) => (
        <mesh key={`p-${i}`} position={p}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <Mat opacity={opacity} />
        </mesh>
      ))}
      {pts.slice(0, -1).map((p, i) => {
        const a = new THREE.Vector3(...p);
        const b = new THREE.Vector3(...pts[i + 1]);
        const mid = a.clone().add(b).multiplyScalar(0.5);
        const dir = b.clone().sub(a);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(1, 0, 0),
          dir.clone().normalize()
        );
        return (
          <mesh key={`l-${i}`} position={mid.toArray()} quaternion={quat}>
            <boxGeometry args={[len, 0.03, 0.03]} />
            <Mat opacity={opacity * 0.75} color={ACCENT} />
          </mesh>
        );
      })}
    </group>
  );
}

function DataMotif({ kind, opacity }: { kind: MotifKind; opacity: number }) {
  switch (kind) {
    case 'bars':
      return <BarsMotif opacity={opacity} />;
    case 'scatter':
      return <ScatterMotif opacity={opacity} />;
    case 'network':
      return <NetworkMotif opacity={opacity} />;
    case 'donut':
      return <DonutMotif opacity={opacity} />;
    case 'matrix':
      return <MatrixMotif opacity={opacity} />;
    case 'axes':
      return <AxesMotif opacity={opacity} />;
    case 'funnel':
      return <FunnelMotif opacity={opacity} />;
    case 'trend':
      return <TrendMotif opacity={opacity} />;
  }
}

function collectObstacles(): Obstacle[] {
  const tagged = document.querySelectorAll('[data-mesh-collider]');
  const nodes = tagged.length > 0 ? tagged : document.querySelectorAll(FALLBACK_SELECTOR);
  const obstacles: Obstacle[] = [];
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  nodes.forEach((node) => {
    const el = node as HTMLElement;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return;
    if (r.bottom < -40 || r.top > vh + 40 || r.right < -40 || r.left > vw + 40) return;

    const left = r.left - TEXT_PAD;
    const top = r.top - TEXT_PAD;
    const right = r.right + TEXT_PAD;
    const bottom = r.bottom + TEXT_PAD;
    obstacles.push({
      left,
      top,
      right,
      bottom,
      cx: (left + right) / 2,
      cy: (top + bottom) / 2,
    });
  });

  return obstacles;
}

function screenRadius(scale: number, z: number, camera: THREE.Camera, height: number) {
  const dist = Math.max(0.5, camera.position.z - z);
  const vFov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
  const worldPerPixel = (2 * Math.tan(vFov / 2) * dist) / height;
  return Math.max(18, (scale * 1.05) / worldPerPixel);
}

function worldDeltaFromScreen(
  dxPx: number,
  dyPx: number,
  z: number,
  camera: THREE.Camera,
  width: number,
  height: number
) {
  const dist = Math.max(0.5, camera.position.z - z);
  const vFov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
  const worldH = 2 * Math.tan(vFov / 2) * dist;
  const worldW = worldH * (width / height);
  return {
    x: (dxPx / width) * worldW,
    y: -(dyPx / height) * worldH,
  };
}

/** Minimum translation to push circle fully outside AABB; prefers horizontal when close. */
function resolveCircleAabb(
  sx: number,
  sy: number,
  r: number,
  box: Obstacle
): { dx: number; dy: number } | null {
  const inside = sx >= box.left && sx <= box.right && sy >= box.top && sy <= box.bottom;

  if (inside) {
    const toL = sx - box.left + r;
    const toR = box.right - sx + r;
    const toT = sy - box.top + r;
    const toB = box.bottom - sy + r;
    const minH = Math.min(toL, toR);
    const minV = Math.min(toT, toB);
    if (minH <= minV * 1.25) {
      return toL < toR ? { dx: -toL, dy: 0 } : { dx: toR, dy: 0 };
    }
    return toT < toB ? { dx: 0, dy: -toT } : { dx: 0, dy: toB };
  }

  const nearestX = THREE.MathUtils.clamp(sx, box.left, box.right);
  const nearestY = THREE.MathUtils.clamp(sy, box.top, box.bottom);
  const ox = sx - nearestX;
  const oy = sy - nearestY;
  const dist = Math.hypot(ox, oy) || 0.001;
  if (dist >= r) return null;
  const push = r - dist;
  return { dx: (ox / dist) * push, dy: (oy / dist) * push };
}

function resolveCircleCircle(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number
): { dx: number; dy: number } | null {
  const dx = ax - bx;
  const dy = ay - by;
  const dist = Math.hypot(dx, dy) || 0.001;
  const minDist = ar + br;
  if (dist >= minDist) return null;
  const push = minDist - dist;
  return { dx: (dx / dist) * push, dy: (dy / dist) * push };
}

/** Soft slide along text: kill inward speed, keep tangent, gentle rebound — no random kick. */
function slideOffSurface(
  vel: THREE.Vector3,
  mtvDx: number,
  mtvDy: number,
  z: number,
  camera: THREE.Camera,
  vw: number,
  vh: number,
  restitution = TEXT_BOUNCE
) {
  const len = Math.hypot(mtvDx, mtvDy) || 1;
  const n = worldDeltaFromScreen(mtvDx / len, mtvDy / len, z, camera, vw, vh);
  const nLen = Math.hypot(n.x, n.y) || 1;
  const wx = n.x / nLen;
  const wy = n.y / nLen;
  const tx = -wy;
  const ty = wx;

  const vin = vel.x * wx + vel.y * wy;
  const vt = vel.x * tx + vel.y * ty;

  // Bounce normal if hitting; otherwise zero inward stick
  let newVin = vin < 0 ? -vin * restitution : 0;

  vel.x = wx * newVin + tx * vt * SLIDE_FRICTION;
  vel.y = wy * newVin + ty * vt * SLIDE_FRICTION;
}

/** Reflect + powered kick for cursor (flipper) — cursor only. */
function flipperBounce(
  vel: THREE.Vector3,
  mtvDx: number,
  mtvDy: number,
  z: number,
  camera: THREE.Camera,
  vw: number,
  vh: number,
  extraKick = 0,
  batVx = 0,
  batVy = 0
) {
  const len = Math.hypot(mtvDx, mtvDy) || 1;
  const n = worldDeltaFromScreen(mtvDx / len, mtvDy / len, z, camera, vw, vh);
  const nLen = Math.hypot(n.x, n.y) || 1;
  const wx = n.x / nLen;
  const wy = n.y / nLen;

  const vin = vel.x * wx + vel.y * wy;
  if (vin < 0) {
    vel.x -= (1 + CURSOR_BOUNCE) * vin * wx;
    vel.y -= (1 + CURSOR_BOUNCE) * vin * wy;
  }
  const kick = Math.max(MIN_KICK, -vin * 0.15) + extraKick * 0.45;
  vel.x += wx * kick;
  vel.y += wy * kick;

  // Mild scatter — not chaotic
  const tx = -wy;
  const ty = wx;
  const side = Math.random() > 0.5 ? 1 : -1;
  vel.x += tx * side * (0.25 + Math.random() * 0.4);
  vel.y += ty * side * (0.25 + Math.random() * 0.4);

  if (batVx || batVy) {
    const bat = worldDeltaFromScreen(batVx, batVy, z, camera, vw, vh);
    vel.x += bat.x * 0.025;
    vel.y += bat.y * 0.025;
  }
}

export const FloatingMeshes = ({ scrollY, pointer, isMobile }: FloatingMeshesProps) => {
  const meshes = isMobile ? MOBILE_MESHES : DESKTOP_MESHES;
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Group | null)[]>([]);
  const velocities = useRef(meshes.map(() => new THREE.Vector3()));
  const spinBoost = useRef(meshes.map(() => 0));
  const bounceCd = useRef(meshes.map(() => 0));
  const bases = useMemo(
    () => meshes.map((m) => new THREE.Vector3(...m.position)),
    [meshes]
  );
  const obstaclesRef = useRef<Obstacle[]>([]);
  const screenPos = useRef(meshes.map(() => ({ x: 0, y: 0, r: 40 })));
  const proj = useMemo(() => new THREE.Vector3(), []);
  const home = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    velocities.current = meshes.map(() => new THREE.Vector3());
    spinBoost.current = meshes.map(() => 0);
    bounceCd.current = meshes.map(() => 0);
    meshRefs.current = meshRefs.current.slice(0, meshes.length);
    screenPos.current = meshes.map(() => ({ x: 0, y: 0, r: 40 }));
  }, [meshes]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const refresh = (t = 0) => {
      if (t - last > 50) {
        obstaclesRef.current = collectObstacles();
        last = t;
      }
      raf = requestAnimationFrame(refresh);
    };
    obstaclesRef.current = collectObstacles();
    raf = requestAnimationFrame(refresh);
    const onResize = () => {
      obstaclesRef.current = collectObstacles();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.04);
    const group = groupRef.current;
    if (!group) return;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.current.y * 0.05, 0.05);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.current.x * 0.06, 0.05);

    const scroll = scrollY.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = pointer.current.clientX;
    const cy = pointer.current.clientY;

    // Pass 1: spin + spring + integrate
    for (let i = 0; i < meshes.length; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;
      const config = meshes[i];
      const base = bases[i];
      const vel = velocities.current[i];

      const boost = spinBoost.current[i];
      mesh.rotation.x += (config.spin[0] + boost * 0.4) * dt;
      mesh.rotation.y += (config.spin[1] + boost) * dt;
      mesh.rotation.z += (config.spin[2] + boost * 0.3) * dt;
      spinBoost.current[i] = Math.max(0, boost - dt * 6);
      bounceCd.current[i] = Math.max(0, bounceCd.current[i] - dt);

      const scrollFactor = scroll * 0.002 * config.parallax;
      home.set(base.x, base.y - scrollFactor, base.z + scrollFactor * 0.3);

      vel.x += (home.x - mesh.position.x) * SPRING * dt;
      vel.y += (home.y - mesh.position.y) * SPRING * dt;
      vel.z += (home.z - mesh.position.z) * SPRING * dt;

      vel.multiplyScalar(Math.exp(-DAMPING * dt));
      const speed = vel.length();
      if (speed > MAX_SPEED) vel.multiplyScalar(MAX_SPEED / speed);

      mesh.position.x += vel.x * dt;
      mesh.position.y += vel.y * dt;
      mesh.position.z += vel.z * dt;
    }

    // Pass 2: hard resolve (MTV) — collision always wins; bounce only on first iter
    for (let iter = 0; iter < RESOLVE_ITERS; iter++) {
      for (let i = 0; i < meshes.length; i++) {
        const mesh = meshRefs.current[i];
        if (!mesh) continue;
        const config = meshes[i];
        const vel = velocities.current[i];

        mesh.getWorldPosition(proj);
        proj.project(camera);
        let sx = (proj.x * 0.5 + 0.5) * vw;
        let sy = (-proj.y * 0.5 + 0.5) * vh;
        const r = screenRadius(config.scale, mesh.position.z, camera, vh);
        screenPos.current[i] = { x: sx, y: sy, r };

        let totalDx = 0;
        let totalDy = 0;
        let cursorHit = false;
        const canImpulse = iter === 0 && bounceCd.current[i] <= 0;

        // Text — smooth slide / soft rebound
        for (const box of obstaclesRef.current) {
          const mtv = resolveCircleAabb(sx, sy, r, box);
          if (!mtv) continue;
          totalDx += mtv.dx;
          totalDy += mtv.dy;
          if (iter === 0) {
            slideOffSurface(vel, mtv.dx, mtv.dy, mesh.position.z, camera, vw, vh);
          }
        }

        // Cursor — bat / flipper
        {
          const mtv = resolveCircleCircle(sx, sy, r, cx, cy, CURSOR_RADIUS);
          if (mtv) {
            totalDx += mtv.dx;
            totalDy += mtv.dy;
            if (canImpulse) {
              const batSpeed = Math.hypot(pointer.current.vx, pointer.current.vy);
              flipperBounce(
                vel,
                mtv.dx,
                mtv.dy,
                mesh.position.z,
                camera,
                vw,
                vh,
                2 + Math.min(5, batSpeed * 0.15),
                pointer.current.vx,
                pointer.current.vy
              );
              cursorHit = true;
            }
          }
        }

        // Peers — soft slide
        for (let j = 0; j < meshes.length; j++) {
          if (i === j) continue;
          const other = screenPos.current[j];
          const mtv = resolveCircleCircle(sx, sy, r, other.x, other.y, other.r);
          if (!mtv) continue;
          totalDx += mtv.dx * 0.5;
          totalDy += mtv.dy * 0.5;
          if (iter === 0) {
            slideOffSurface(vel, mtv.dx, mtv.dy, mesh.position.z, camera, vw, vh, 0.12);
          }
        }

        if (cursorHit) {
          bounceCd.current[i] = 0.12;
          spinBoost.current[i] = Math.min(FLIP_SPIN, spinBoost.current[i] + 5);
        }

        const speed = vel.length();
        if (speed > MAX_SPEED) vel.multiplyScalar(MAX_SPEED / speed);

        if (totalDx !== 0 || totalDy !== 0) {
          // Blend correction so hits don't snap/jitter
          const blend = iter === 0 ? POS_BLEND : Math.min(1, POS_BLEND + 0.35);
          const world = worldDeltaFromScreen(totalDx * blend, totalDy * blend, mesh.position.z, camera, vw, vh);
          mesh.position.x += world.x;
          mesh.position.y += world.y;
          sx += totalDx * blend;
          sy += totalDy * blend;
          screenPos.current[i] = { x: sx, y: sy, r };
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      {meshes.map((config, i) => (
        <group
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={config.position}
          scale={config.scale}
        >
          <DataMotif kind={config.kind} opacity={config.opacity} />
        </group>
      ))}
    </group>
  );
};
