import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dark ocean surface — stylized, atmospheric.
 * 
 * Key visual qualities:
 * - Calm, ominous undulation (not stormy)
 * - Bright caustic network that dances across the surface
 * - Fresnel rim glow at glancing angles
 * - Bioluminescent highlights concentrated on wave crests
 * - Mouse creates concentric ripple rings (not a mound)
 * - Depth gradient (darker at distance, lighter near camera)
 */
export default function WaterSurface() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPos;
    varying vec3 vNormal;

    // 2D simplex noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Calm, slow waves — ominous, not stormy
      float wave1 = snoise(pos.xz * 0.2 + uTime * 0.08) * 0.4;
      float wave2 = snoise(pos.xz * 0.5 + uTime * 0.12 + 3.0) * 0.15;
      float wave3 = snoise(pos.xz * 1.2 + uTime * 0.15 + 7.0) * 0.05;

      // Mouse ripple — concentric rings, not a mound
      vec2 mouseWorld = uMouse * 6.0;
      float dist = length(pos.xz - mouseWorld);
      float ripple = sin(dist * 5.0 - uTime * 3.0) * exp(-dist * 0.4) * 0.08;

      float elevation = wave1 + wave2 + wave3 + ripple;
      pos.y += elevation;
      vElevation = elevation;
      vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

      // Compute normal from neighbors (for Fresnel)
      float eps = 0.1;
      float hL = snoise((pos.xz + vec2(-eps, 0.0)) * 0.2 + uTime * 0.08) * 0.4;
      float hR = snoise((pos.xz + vec2(eps, 0.0)) * 0.2 + uTime * 0.08) * 0.4;
      float hD = snoise((pos.xz + vec2(0.0, -eps)) * 0.2 + uTime * 0.08) * 0.4;
      float hU = snoise((pos.xz + vec2(0.0, eps)) * 0.2 + uTime * 0.08) * 0.4;
      vNormal = normalize(vec3(hL - hR, 2.0 * eps, hD - hU));

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPos;
    varying vec3 vNormal;

    // Caustic pattern — overlapping wave interference
    float causticPattern(vec2 uv, float time) {
      float c = 0.0;
      // Layer 1
      vec2 p1 = uv * 8.0 + time * 0.3;
      c += sin(p1.x + sin(p1.y + time)) * sin(p1.y + sin(p1.x + time * 0.7));
      // Layer 2 (rotated, different scale)
      vec2 p2 = uv * 12.0 - time * 0.2;
      float angle = 0.7;
      p2 = vec2(p2.x * cos(angle) - p2.y * sin(angle), p2.x * sin(angle) + p2.y * cos(angle));
      c += sin(p2.x + sin(p2.y * 1.3 + time * 0.5)) * sin(p2.y + sin(p2.x * 0.8 + time * 0.3));
      // Layer 3 (fine detail)
      vec2 p3 = uv * 18.0 + time * 0.15;
      c += sin(p3.x * 1.1 + sin(p3.y * 0.9 + time * 0.8)) * sin(p3.y * 1.2 + sin(p3.x + time * 0.4)) * 0.5;

      return c;
    }

    void main() {
      // Base colors
      vec3 deepColor = vec3(0.012, 0.031, 0.024);   // near void
      vec3 midColor = vec3(0.035, 0.075, 0.055);    // slightly brighter
      vec3 peakColor = vec3(0.05, 0.12, 0.08);      // wave crests

      // Distance-based depth gradient (darker at edges/distance)
      float distFromCenter = length(vUv - 0.5) * 2.0;
      float depthFade = 1.0 - smoothstep(0.3, 1.0, distFromCenter) * 0.6;

      // Elevation-based color mixing
      float elevNorm = smoothstep(-0.3, 0.4, vElevation);
      vec3 baseColor = mix(deepColor, midColor, elevNorm * depthFade);

      // Wave crest highlights
      float crestFactor = smoothstep(0.2, 0.45, vElevation);
      baseColor = mix(baseColor, peakColor, crestFactor);

      // ═══ CAUSTICS — the star of the show ═══
      float caustic = causticPattern(vUv, uTime);
      // Sharp, bright network
      float causticMask = smoothstep(0.6, 1.2, caustic);
      // Brighter in troughs (light concentrates in valleys)
      float troughBoost = (1.0 - elevNorm) * 0.7 + 0.3;
      vec3 causticColor = mix(
        vec3(0.0, 1.0, 0.64) * 0.4,   // green biolum
        vec3(0.0, 0.9, 1.0) * 0.3,    // cyan accent
        sin(uTime * 0.3 + vUv.x * 3.0) * 0.5 + 0.5
      );
      baseColor += causticColor * causticMask * troughBoost * depthFade;

      // ═══ FRESNEL — rim glow at glancing angles ═══
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
      fresnel = pow(fresnel, 3.0);
      vec3 fresnelColor = vec3(0.0, 1.0, 0.64) * 0.25;
      baseColor += fresnelColor * fresnel;

      // Final alpha — fade to invisible at edges (no visible boundary)
      float edgeFade = 1.0 - smoothstep(0.55, 0.95, distFromCenter);
      float alpha = 0.92 * edgeFade;

      gl_FragColor = vec4(baseColor, alpha);
    }
  `;

  useFrame(({ clock, pointer }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      0.05
    );
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[35, 35, 150, 150]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
