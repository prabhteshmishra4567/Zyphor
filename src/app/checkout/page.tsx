"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, Truck, Lock, CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">Please add some wellness products to your cart before proceeding to checkout.</p>
            <Link href="/shop">
              <Button variant="secondary" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                Explore Shop
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setStep(3);
      clearCart();
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-16 gap-4">
          {[
            { id: 1, label: "Shipping" },
            { id: 2, label: "Payment" },
            { id: 3, label: "Confirmation" },
          ].map((s) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.id ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20' : 'bg-slate-800 text-slate-500'}`}>
                  {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : s.id}
                </div>
                <span className={`hidden md:block text-sm font-medium ${step === s.id ? 'text-white' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
              {s.id < 3 && <div className={`h-px w-12 md:w-24 ${step > s.id ? 'bg-cyan-500' : 'bg-slate-800'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">Shipping Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Full Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">Email Address</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-slate-400 text-sm font-medium">Shipping Address</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="123 Wellness Way" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">City</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-400 text-sm font-medium">ZIP Code</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="10001" />
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-full py-6 rounded-2xl text-lg font-bold bg-cyan-500 hover:bg-cyan-600 text-white border-none flex items-center justify-center gap-3"
                    onClick={() => setStep(2)}
                  >
                    Continue to Payment
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">Payment Details</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4">
                      <div className="space-y-2">
                        <label className="text-slate-400 text-sm font-medium">Card Number</label>
                        <div className="relative">
                          <input type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="**** **** **** 4242" />
                          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-slate-400 text-sm font-medium">Expiry Date</label>
                          <input type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-slate-400 text-sm font-medium">CVV</label>
                          <input type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" placeholder="***" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                      <Lock className="w-4 h-4" />
                      Your payment is secured with 256-bit AES encryption.
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      variant="glass" 
                      className="flex-1 py-6 rounded-2xl text-lg font-bold"
                      onClick={() => setStep(1)}
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-[2] py-6 rounded-2xl text-lg font-bold bg-cyan-500 hover:bg-cyan-600 text-white border-none"
                      disabled={isProcessing}
                      onClick={handlePayment}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Payment...
                        </div>
                      ) : (
                        "Complete Purchase"
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-cyan-500 flex items-center justify-center text-white">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white">Payment Successful!</h2>
                  <p className="text-slate-400 text-lg max-w-md mx-auto">
                    Thank you for choosing Zyphor. Your wellness journey begins now. Your order #ZYP-88291 is being processed.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                    <Link href="/account/orders">
                      <Button variant="secondary" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white border-none">
                      View My Orders
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button variant="glass" className="px-8 py-4 rounded-full">
                        Return to Shop
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-80">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden border border-white/10">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <span className="text-slate-300 text-sm truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="text-white text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Shipping</span>
                  <span>$15.00</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Tax (Est.)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-4">
                  <span>Total</span>
                  <span>${(cartTotal + 15 + (cartTotal * 0.08)).toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3 text-cyan-400 text-xs">
                <ShieldCheck className="w-4 h-4" />
                Secure Checkout Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
