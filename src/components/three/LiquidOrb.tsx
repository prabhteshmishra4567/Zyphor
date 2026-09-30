"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

interface LiquidOrbProps {
  color?: string;
  size?: number;
  position?: [number, number, number];
  scale?: number;
}

export const LiquidOrb = ({ color = "#06b6d4", size = 1, position = [0, 0, 0], scale = 1 }: LiquidOrbProps) => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};
