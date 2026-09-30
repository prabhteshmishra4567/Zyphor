"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/three/Scene";
import { FloatingBottle } from "@/components/three/FloatingBottle";
import { LiquidOrb } from "@/components/three/LiquidOrb";
import { ParticleField } from "@/components/three/ParticleField";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen w-full bg-background" />;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background flex items-center">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Scene cameraPos={[0, 0, 6]} controls={false}>
          <ParticleField count={2000} color="#06b6d4" />
          <LiquidOrb color="#1e3a8a" size={1.5} position={[-3, 1, -2]} />
          <LiquidOrb color="#7c3aed" size={1} position={[3, -1, -3]} />
          <FloatingBottle color="#1e3a8a" position={[0, 0, 0]} />
        </Scene>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-bold tracking-wider uppercase mb-4 border border-brand-secondary/20">
              The Future of Wellness
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight tracking-tighter">
              Healthcare, <br />
              <span className="text-gradient">Reimagined.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
          >
            Experience a new era of health and vitality. Zyphor blends 
            cutting-edge science with premium care to deliver a wellness 
            experience that is as elegant as it is effective.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" variant="primary">
              Explore Products
            </Button>
            <Button size="lg" variant="outline">
              Discover Zyphor
            </Button>
          </motion.div>
        </div>

        {/* Right side is mostly for the 3D scene, but we can add floating UI elements */}
        <div className="hidden lg:block relative h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-1/4 right-0 glass p-4 rounded-2xl shadow-2xl max-w-xs"
          >
            <p className="text-sm font-medium italic">"A revolutionary approach to daily vitality. Simply stunning."</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-primary" />
              <span className="text-xs font-bold">Sarah J. — Wellness Expert</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
};
