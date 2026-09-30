"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, ShoppingCart, Zap } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-bold text-white mb-2">
            {String(item.value).padStart(2, "0")}
          </div>
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const OfferCard = ({ product, offerTag }: { product: Product, offerTag: string }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
    >
      <div className="absolute -top-3 left-6 z-10">
        <span className="bg-linear-to-r from-cyan-500 to-violet-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {offerTag}
        </span>
      </div>
      
      <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-slate-900">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{product.name}</h3>
        <div className="flex justify-between items-center pt-4">
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">${product.price}</span>
            <span className="text-slate-500 text-sm line-through">${product.originalPrice}</span>
          </div>
          <Button 
            variant="secondary" 
            className="rounded-xl px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white border-none flex items-center gap-2"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4" />
            Grab Deal
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function OffersPage() {
  const { products } = useProducts();
  const dealProducts = products.filter(p => p.featured || p.bestseller || p.isFeatured || p.isBestseller).slice(0, 6);
  const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000); // 3 days from now

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap className="w-3 h-3" />
            Limited Time Offers
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Exclusive <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Wellness Deals</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
            Premium healthcare optimization, now more accessible. Grab these limited-time offers before they expire.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full" />
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealProducts.map((product, i) => (
            <OfferCard 
              key={product.id} 
              product={product} 
              offerTag={i % 2 === 0 ? "Flash Sale" : "Bundle Deal"} 
            />
          ))}
        </div>

        <div className="mt-24 p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
          <div className="flex justify-center mb-6">
            <Gift className="w-12 h-12 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Join the Zyphor Insider Club</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Get notified about secret drops, early access to new formulas, and member-only discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
            <Button variant="secondary" className="bg-cyan-500 text-white border-none px-6 py-3 rounded-xl font-bold">
              Join Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
