"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CategoryCard = ({ category, index }: { category: typeof CATEGORIES[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-royal-blue/20 group-hover:bg-royal-blue/0 transition-colors duration-500 z-0" />
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
              {category.count} Products
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {category.description}
            </p>
          </div>
          <Link href={`/categories/${category.slug}`}>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
        >
          Curated Collections
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          Browse by <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Category</span>
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.slug} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}
