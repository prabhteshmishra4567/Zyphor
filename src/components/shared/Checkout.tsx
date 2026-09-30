"use client";

import React, { useState } from "react";
import { ShoppingBag, CreditCard, Truck, User, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "info", title: "Customer Info", icon: User },
  { id: "shipping", title: "Shipping", icon: Truck },
  { id: "payment", title: "Payment", icon: CreditCard },
];

export const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState("info");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });

  const nextStep = () => {
    if (currentStep === "info") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("payment");
  };

  const prevStep = () => {
    if (currentStep === "shipping") setCurrentStep("info");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-12">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-3 flex-1 relative">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10",
                currentStep === step.id ? "bg-brand-primary text-white scale-110" : 
                idx < STEPS.findIndex(s => s.id === currentStep) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
              )}>
                {idx < STEPS.findIndex(s => s.id === currentStep) ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              {idx !== STEPS.length - 1 && (
                <div className={cn(
                  "h-1 flex-1 mx-2 transition-colors duration-300",
                  idx < STEPS.findIndex(s => s.id === currentStep) ? "bg-green-500" : "bg-border"
                )} />
              )}
              <span className={cn(
                "text-sm font-medium whitespace-nowrap",
                currentStep === step.id ? "text-brand-primary" : "text-muted-foreground"
              )}>{step.title}</span>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div className="space-y-6">
          {currentStep === "info" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === "shipping" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="123 Health Ave"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ZIP / Postal Code</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary"
                    placeholder="10001"
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === "payment" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold">Payment Method</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-2xl border-2 border-brand-primary bg-brand-accent/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <CreditCard className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Credit / Debit Card</p>
                      <p className="text-xs text-muted-foreground">Stripe Secure Checkout</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-4 border-brand-primary" />
                </div>
                <div className="p-4 rounded-2xl border border-border bg-background flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-border" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-8">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              disabled={currentStep === "info"}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button 
              onClick={nextStep} 
              className="px-8"
              disabled={currentStep === "payment"}
            >
              {currentStep === "payment" ? "Complete Purchase" : "Continue"}
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 p-6 space-y-6">
          <h3 className="text-lg font-bold">Order Summary</h3>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => {
              const itemImage = item.image ?? item.images?.[0] ?? "";
              const itemPrice = item.discountPrice ?? item.price;

              return (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img src={itemImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">${(itemPrice * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-brand-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full py-6 text-base" onClick={() => alert("Redirecting to Stripe...")}>
            Pay Now
          </Button>
        </Card>
      </div>
    </div>
  );
};
