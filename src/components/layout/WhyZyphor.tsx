"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Scene } from "@/components/three/Scene";
import { FloatingBottle } from "@/components/three/FloatingBottle";
import { LiquidOrb } from "@/components/three/LiquidOrb";
import { ParticleField } from "@/components/three/ParticleField";
import { CheckCircle2 } from "lucide-react";

const BenefitCard = ({ title, description, icon: Icon, index }: { title: string, description: string, icon: any, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
  >
    <div className="shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function WhyZyphor() {
  const benefits = [
    {
      title: "Medical Precision",
      description: "Every product in our catalog undergoes rigorous pharmaceutical-grade quality control and verification.",
      icon: CheckCircle2
    },
    {
      title: "Futuristic Wellness",
      description: "Merging traditional healthcare with modern biotechnology for superior health outcomes.",
      icon: CheckCircle2
    },
    {
      title: "Transparent Sourcing",
      description: "Full traceability of every ingredient, from raw material to your doorstep.",
      icon: CheckCircle2
    },
    {
      title: "Eco-Conscious Care",
      description: "Sustainable packaging and ethically sourced components for a healthier planet.",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            The Zyphor Standard
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight"
          >
            Healthcare <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Elevated.</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {benefits.map((benefit, i) => (
              <BenefitCard key={i} {...benefit} icon={benefit.icon} index={i} />
            ))}
          </div>
        </div>

        <div className="relative h-125 lg:h-175 w-full">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full" />
          <Suspense fallback={<div className="w-full h-full bg-slate-900/50 animate-pulse rounded-3xl" />}>
            <Scene>
              <FloatingBottle position={[0, 0, 0]} scale={1.5} />
              <LiquidOrb position={[-2, 1, -1]} scale={0.8} color="#06b6d4" />
              <LiquidOrb position={[2, -1, -1]} scale={0.6} color="#8b5cf6" />
              <ParticleField />
            </Scene>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
