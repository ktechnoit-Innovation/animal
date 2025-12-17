
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Cloud, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Stylized Green Trees
const Trees = ({ count = 40 }: { count?: number }) => {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 12; // Spread out from center
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const scale = 0.5 + Math.random() * 1;
      pos.push({ x, z, scale });
    }
    return pos;
  }, [count]);

  return (
    <group>
      {positions.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]} scale={p.scale}>
           {/* Trunk - Clean White/Grey */}
           <mesh position={[0, 1, 0]} castShadow receiveShadow>
             <cylinderGeometry args={[0.1, 0.2, 2, 8]} />
             <meshStandardMaterial color="#f1f5f9" roughness={0.6} />
           </mesh>
           {/* Leaves - Shades of Green (Nature) */}
           <mesh position={[0, 2.5, 0]} castShadow>
             <coneGeometry args={[1.2, 2.5, 8]} />
             <meshStandardMaterial color="#4ade80" roughness={0.3} transparent opacity={0.95} />
           </mesh>
           <mesh position={[0, 3.5, 0]} castShadow>
             <coneGeometry args={[0.9, 2, 8]} />
             <meshStandardMaterial color="#86efac" roughness={0.3} transparent opacity={0.95} />
           </mesh>
        </group>
      ))}
    </group>
  );
};

const SpiritAnimal = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
        const t = state.clock.getElapsedTime();
        // Gentle bobbing
        group.current.position.y = Math.sin(t) * 0.2 + 0.5;
        // Slow rotation
        group.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Abstract "Spirit" Representation */}
            <mesh castShadow>
                <icosahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color="#ffffff" roughness={0} metalness={0.8} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={1.5} transparent opacity={0.4} />
            </mesh>
        </Float>
        {/* Blue and Green sparkles */}
        <Sparkles count={20} scale={4} size={6} speed={0.4} opacity={0.8} color="#0ea5e9" />
        <Sparkles count={20} scale={5} size={4} speed={0.3} opacity={0.8} color="#4ade80" />
    </group>
  );
}

const Terrain = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[100, 100, 64, 64]} />
            <meshStandardMaterial color="#f0fdf4" roughness={0.5} metalness={0.05} />
        </mesh>
    )
}

export const NatureScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 5, 12], fov: 45 }} shadows dpr={[1, 2]}>
        {/* Soft Blue-Green Fog */}
        <fog attach="fog" args={['#f0fdf4', 5, 30]} />
        
        <ambientLight intensity={0.9} color="#e0f2fe" />
        <directionalLight 
            position={[5, 10, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[1024, 1024]} 
            color="#ffffff"
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#22c55e" />
        
        <group position={[0, -2, 0]}>
            <Terrain />
            <Trees />
            <SpiritAnimal />
        </group>

        {/* Floating dust/magic */}
        <Sparkles count={100} scale={20} size={2} speed={0.2} opacity={0.5} color="#86efac" />
        
        <Cloud opacity={0.4} speed={0.1} width={10} depth={1.5} segments={20} position={[-5, 5, -10]} color="#ffffff" />
        <Cloud opacity={0.4} speed={0.1} width={10} depth={1.5} segments={20} position={[5, 3, -8]} color="#ffffff" />

        <Environment preset="park" blur={0.8} />
      </Canvas>
    </div>
  );
};

export const HeroScene = NatureScene;
