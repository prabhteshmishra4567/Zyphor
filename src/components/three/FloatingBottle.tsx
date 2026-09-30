"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Cylinder, MeshWobbleMaterial } from "@react-three/drei";

interface FloatingBottleProps {
  color?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const FloatingBottle = ({
  color = "#1e3a8a",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: FloatingBottleProps) => {
  const bottleRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (bottleRef.current) {
      bottleRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale} ref={bottleRef}>
        <Cylinder args={[0.6, 0.6, 2, 32]} position={[0, 0, 0]}>
          <MeshWobbleMaterial 
            color={color} 
            factor={0.1} 
            speed={1} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </Cylinder>
        <Cylinder args={[0.2, 0.2, 0.5, 32]} position={[0, 1.25, 0]}>
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
        </Cylinder>
        <Cylinder args={[0.22, 0.22, 0.1, 32]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </Cylinder>
      </group>
    </Float>
  );
};
