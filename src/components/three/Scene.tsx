"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, Environment } from "@react-three/drei";

type EnvironmentPreset =
  | "city"
  | "apartment"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";

interface SceneProps {
  children: React.ReactNode;
  cameraPos?: [number, number, number];
  controls?: boolean;
  environment?: EnvironmentPreset;
}

export const Scene = ({ 
  children, 
  cameraPos = [0, 0, 5], 
  controls = false, 
  environment = "city" 
}: SceneProps) => {
  return (
    <Canvas 
      shadows 
      gl={{ 
        antialias: true, 
        powerPreference: "high-performance",
        alpha: true 
      }}
      className="w-full h-full"
    >
      <PerspectiveCamera makeDefault position={cameraPos} />
      <Environment preset={environment} />
      <Stage intensity={0.5} environment={environment} adjustCamera={false}>
        {children}
      </Stage>
      {controls && <OrbitControls enableZoom={false} enablePan={false} />}
    </Canvas>
  );
};
