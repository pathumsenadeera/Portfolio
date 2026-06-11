'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import { Text, MeshTransmissionMaterial, Environment, RoundedBox } from '@react-three/drei';

function NeonEdges({ size = 2.2 }: { size?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      const t = performance.now() / 1000;
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.3 + 0.5;
      ref.current.rotation.y += 0.006;
      ref.current.rotation.z = Math.cos(t * 0.2) * 0.15;
    }
  });

  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size)), [size]);
  const innerEdgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(size * 0.85, size * 0.85, size * 0.85)), [size]);

  // Sphere positions (static to avoid hydration issues)
  const spheres = useMemo(() => [
    { pos: [0.5, 0.5, 0.5] as [number, number, number], scale: 0.18 },
    { pos: [-0.4, -0.3, 0.6] as [number, number, number], scale: 0.15 },
    { pos: [0.3, -0.5, -0.4] as [number, number, number], scale: 0.2 },
    { pos: [-0.6, 0.4, -0.3] as [number, number, number], scale: 0.14 },
    { pos: [0.1, 0.7, -0.5] as [number, number, number], scale: 0.16 },
    { pos: [-0.3, -0.7, 0.2] as [number, number, number], scale: 0.22 },
    { pos: [0.6, -0.2, 0.4] as [number, number, number], scale: 0.13 },
  ], []);

  // Question mark positions
  const marks = useMemo(() => [
    { pos: [0, 0, 0.6] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
    { pos: [0.6, 0, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number] },
    { pos: [0, -0.6, 0] as [number, number, number], rot: [-Math.PI / 2, 0, 0] as [number, number, number] },
  ], []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={ref}>
        {/* Outer neon edges (optional, keeping faint for structure) */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#aaff00" transparent opacity={0.3} />
        </lineSegments>

        {/* Liquid Glass faces */}
        <RoundedBox args={[size, size, size]} radius={0.3} smoothness={8}>
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={2}
            chromaticAberration={0.15}
            anisotropy={0.2}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1.3}
            color="#e6ffe6"
            transmission={1}
            roughness={0}
            ior={1.5}
            transparent
            envMapIntensity={2}
          />
        </RoundedBox>

        {/* Neon green spheres inside */}
        {spheres.map((s, i) => (
          <mesh key={i} position={s.pos}>
            <sphereGeometry args={[s.scale, 16, 16]} />
            <meshStandardMaterial
              color="#aaff00"
              emissive="#88cc00"
              emissiveIntensity={0.8}
              transparent
              opacity={0.75}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Question marks inside */}
        {marks.map((m, i) => (
          <Text
            key={`mark-${i}`}
            position={m.pos}
            rotation={m.rot}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
          >
            ?
          </Text>
        ))}
        
        {/* Text inside the cube like the reference */}
        <Text
          position={[0, 0.4, 0.5]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          Creative
        </Text>

        {/* Center glow */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="#aaff00" transparent opacity={0.06} />
        </mesh>

        {/* Corner glow points */}
        {[
          [1.1, 1.1, 1.1], [-1.1, 1.1, 1.1], [1.1, -1.1, 1.1], [1.1, 1.1, -1.1],
          [-1.1, -1.1, 1.1], [-1.1, 1.1, -1.1], [1.1, -1.1, -1.1], [-1.1, -1.1, -1.1],
        ].map((pos, i) => (
          <mesh key={`corner-${i}`} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#aaff00" transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function GlassCube() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#aaff00" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#88cc00" />
        <pointLight position={[0, 4, -5]} intensity={0.3} color="#ffffff" />
        
        {/* Environment map for realistic glass reflection */}
        <Environment preset="city" />
        
        <NeonEdges />
      </Canvas>
    </div>
  );
}
