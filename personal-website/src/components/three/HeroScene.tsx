import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import WaterSurface from './WaterSurface';
import AbyssParticles from './AbyssParticles';
import HeroLighting from './HeroLighting';
import HeroCameraController from './HeroCameraController';

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-void" />;

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-water to-void" />
    );
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <HeroLighting />
          <WaterSurface />
          <AbyssParticles count={150} />
          <HeroCameraController />
          <fog attach="fog" args={['#030806', 4, 18]} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
