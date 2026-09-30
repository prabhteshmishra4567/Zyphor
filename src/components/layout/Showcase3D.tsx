"use client";

import React, { Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene } from "@/components/three/Scene";
import { FloatingBottle } from "@/components/three/FloatingBottle";
import { ParticleField } from "@/components/three/ParticleField";

export default function Showcase3D() {
  const { scrollYProgress } = useScroll();
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section className="relative h-[120vh] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter"
        >
          Precision in <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-violet-400 to-cyan-400 animate-gradient-x">
            Every Detail
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Experience the synergy of medical science and aesthetic perfection. 
          Designed for those who demand nothing less than the best in wellness.
        </motion.p>
      </motion.div>

      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
          <Scene>
            <FloatingBottle 
              position={[0, 0, 0]} 
              rotation={[0, 0, 0]} 
              scale={2.5} 
            />
            <ParticleField />
          </Scene>
        </Suspense>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-slate-500 text-sm font-medium uppercase tracking-widest"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
