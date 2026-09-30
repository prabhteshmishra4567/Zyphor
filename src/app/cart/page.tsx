"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const shipping = 15.00;
  const taxRate = 0.08;
  const tax = cartTotal * taxRate;
  const discount = appliedCoupon === "ZYPHOR10" ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal + shipping + tax - discount;

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Your <span className="text-cyan-400">Cart</span></h1>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-24 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShoppingCart className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                <p className="text-slate-400 mb-8">Looks like you haven&apos;t added any wellness products yet.</p>
                <Link href="/shop">
                  <Button variant="secondary" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                    Explore Shop
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-cyan-500/30 transition-all"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden border border-white/10">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-2" />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">{item.category}</p>
                        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                        <p className="text-white font-bold text-lg">${item.price}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-slate-900 rounded-xl p-1 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="flex justify-end">
                  <Button 
                    variant="glass" 
                    className="text-slate-400 hover:text-white text-sm"
                    onClick={clearCart}
                  >
                    Clear All Items
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
              <h2 className="text-2xl font-bold text-white mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-white font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-cyan-400 font-medium">
                    <span>Discount (ZYPHOR10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-white text-2xl font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
                <Button 
                  variant="glass" 
                  className="px-4 py-3 rounded-xl"
                  onClick={() => {
                    if (coupon === "ZYPHOR10") setAppliedCoupon("ZYPHOR10");
                    else setAppliedCoupon(null);
                  }}
                >
                  Apply
                </Button>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button 
                  variant="secondary" 
                  className="w-full py-6 rounded-2xl text-lg font-bold bg-cyan-500 hover:bg-cyan-600 text-white border-none flex items-center justify-center gap-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
