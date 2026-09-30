"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export const ParticleField = ({ count = 1000, color = "#06b6d4" }: { count?: number; color?: string }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      p[i] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const ref = useRef<any>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <Points ref={ref} positions={points} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={1}
        />
      </Points>
    </group>
  );
};
