import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Atmospheric lighting for the abyss.
 * A moonlight from above, bioluminescent point lights below.
 */
export default function HeroLighting() {
  const mainLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ pointer, clock }) => {
    if (!mainLightRef.current) return;
    const time = clock.getElapsedTime();

    // Light softly follows cursor
    mainLightRef.current.position.x += (pointer.x * 4 - mainLightRef.current.position.x) * 0.02;
    mainLightRef.current.position.z += (-pointer.y * 2 - mainLightRef.current.position.z) * 0.02;

    // Subtle intensity pulse
    mainLightRef.current.intensity = 1.5 + Math.sin(time * 0.5) * 0.3;
  });

  return (
    <>
      {/* Moonlight from above — cold, dim */}
      <directionalLight
        position={[2, 10, 4]}
        intensity={0.1}
        color="#a0c4ff"
      />

      {/* Main bioluminescent light — follows cursor */}
      <pointLight
        ref={mainLightRef}
        position={[0, 4, 2]}
        intensity={1.5}
        color="#00ffa3"
        distance={12}
        decay={2}
      />

      {/* Deep cyan accent */}
      <pointLight
        position={[-6, -1, -4]}
        intensity={0.6}
        color="#00e5ff"
        distance={10}
        decay={2}
      />

      {/* Subtle warm vent glow from below */}
      <pointLight
        position={[4, -3, 2]}
        intensity={0.3}
        color="#ff6b35"
        distance={8}
        decay={2}
      />

      {/* Ambient — very dim, just enough to not be pure black */}
      <ambientLight intensity={0.03} color="#0a2018" />
    </>
  );
}
