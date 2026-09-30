"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, HeartOff } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30">
            <Heart className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">My <span className="text-red-400">Wishlist</span></h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <HeartOff className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-slate-400 mb-8">Save your favorite wellness products for later.</p>
            <Link href="/shop">
              <Button variant="secondary" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                Explore Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:border-red-500/30 transition-all"
                >
                  <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-slate-900">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110" />
                    <button 
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{product.name}</h3>
                    <p className="text-white font-bold text-lg">${product.price}</p>
                    
                    <div className="flex gap-3 pt-4">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button variant="glass" className="w-full rounded-xl py-3">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        variant="secondary" 
                        className="flex-1 rounded-xl py-3 bg-cyan-500 hover:bg-cyan-600 text-white border-none flex items-center justify-center gap-2"
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
