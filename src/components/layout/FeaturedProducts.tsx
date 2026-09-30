"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";

const FeaturedProduct = ({ product, index }: { product: Product, index: number }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]"
    >
      <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-slate-900">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
            <Button variant="glass" size="sm" className="rounded-full p-3 h-12 w-12 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </Button>
          </Link>
          <Button aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product.id)} variant="glass" size="sm" className="rounded-full p-3 h-12 w-12 flex items-center justify-center bg-cyan-500 text-white border-cyan-400 hover:bg-cyan-600">
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{product.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-xl">${product.price}</p>
            <p className="text-slate-500 text-sm line-through">${product.originalPrice}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
          ))}
          <span className="text-slate-400 text-xs ml-2">({product.reviewCount} reviews)</span>
        </div>
        
        <Link href={`/products/${product.slug}`}>
          <Button variant="secondary" className="w-full py-6 rounded-xl font-bold tracking-wide">
            View Details
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function FeaturedProducts() {
  const { products } = useProducts();
  // Get a subset of bestsellers or featured products
  const featured = products.filter(p => p.bestseller || p.featured || p.isBestseller || p.isFeatured).slice(0, 6);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="text-left">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            Curated Selection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Premium <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Bestsellers</span>
          </motion.h2>
        </div>
        <Link href="/shop">
          <Button variant="secondary" className="px-8 py-4 rounded-full font-bold group flex items-center gap-2">
            Explore All Products
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {featured.map((product, i) => (
          <FeaturedProduct key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
