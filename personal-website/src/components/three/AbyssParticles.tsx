import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  count?: number;
  color?: string;
  spread?: number;
  yRange?: [number, number];
}

/**
 * Bioluminescent particles that drift through the scene.
 * Used in multiple depth zones with different configurations.
 */
export default function AbyssParticles({
  count = 150,
  color = '#00ffa3',
  spread = 20,
  yRange = [-2, 6],
}: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * spread,
        yRange[0] + Math.random() * (yRange[1] - yRange[0]),
        (Math.random() - 0.5) * spread,
      ] as [number, number, number],
      speed: 0.03 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      scale: 0.01 + Math.random() * 0.03,
      pulseSpeed: 0.4 + Math.random() * 0.8,
    }));
  }, [count, spread, yRange]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Slow, languid drifting — like deep-sea organisms
      const x = p.position[0] + Math.sin(time * p.speed + p.phase) * 0.4;
      const y = p.position[1] + Math.sin(time * p.speed * 0.5 + p.phase) * 0.2;
      const z = p.position[2] + Math.cos(time * p.speed * 0.6 + p.phase) * 0.3;

      dummy.position.set(x, y, z);

      // Slow breathing pulse
      const pulse = 1 + Math.sin(time * p.pulseSpeed + p.phase) * 0.3;
      dummy.scale.setScalar(p.scale * pulse);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
