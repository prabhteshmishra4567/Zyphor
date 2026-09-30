"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a premium loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing Ring Animation */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-32 h-32 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin"
          style={{ animationDuration: '1.5s' }}
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute w-40 h-40 rounded-full border border-cyan-500/10"
        />
        
        {/* Brand Logo/Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-4xl font-bold text-white tracking-[0.3em] uppercase">
            Zyphor
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent mt-2"
          />
        </motion.div>

        {/* Atmospheric Glow */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full" />
      </div>
    </motion.div>
  );
}
