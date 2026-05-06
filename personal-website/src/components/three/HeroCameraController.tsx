import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Camera that responds to scroll (descent) and mouse (parallax).
 * As user scrolls, camera submerges below the water surface.
 */
export default function HeroCameraController() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ pointer }) => {
    // Descent: camera moves down and forward as user scrolls
    const targetY = 3 - scrollProgress * 5; // 3 → -2 (submerge)
    const targetZ = 8 - scrollProgress * 4; // 8 → 4 (push in)

    // Mouse parallax (subtle)
    const mouseX = pointer.x * 0.6;
    const mouseY = pointer.y * 0.3;

    // Smooth lerp
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (targetY + mouseY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;

    // Look slightly ahead of center
    const lookTarget = new THREE.Vector3(0, targetY - 2, 0);
    const currentLook = new THREE.Vector3();
    camera.getWorldDirection(currentLook);
    camera.lookAt(lookTarget);
  });

  return null;
}
