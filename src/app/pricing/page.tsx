"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const PricingPlan = ({ plan, featured = false }: { plan: any, featured?: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-3xl transition-all ${
        featured 
        ? "bg-linear-to-b from-cyan-500/20 to-transparent border-2 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.2)]"
        : "bg-white/5 border border-white/10 backdrop-blur-sm"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">${plan.price}</span>
          <span className="text-slate-400 text-sm">/month</span>
        </div>
        <p className="text-slate-400 mt-4 text-sm">{plan.description}</p>
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
            <Check className="w-4 h-4 text-cyan-400" />
            {feature}
          </div>
        ))}
      </div>

      <Button 
        variant={featured ? "secondary" : "glass"} 
        className={`w-full py-4 rounded-xl font-bold ${featured ? "bg-cyan-500 text-white border-none" : ""}`}
      >
        Get Started
      </Button>
    </motion.div>
  );
};

export default function PricingPage() {
  const plans = [
    {
      name: "Essential",
      price: "29",
      description: "Basic wellness support for a healthier lifestyle.",
      features: [
        "Standard Product Access",
        "Basic Health Tracking",
        "Monthly Newsletter",
        "Email Support",
        "Standard Delivery"
      ]
    },
    {
      name: "Premium",
      price: "79",
      description: "Comprehensive care for the health-conscious individual.",
      features: [
        "Everything in Essential",
        "Priority Shipping",
        "Advanced Wellness Analytics",
        "Quarterly Consultation",
        "24/7 Priority Support",
        "Exclusive Early Access"
      ]
    },
    {
      name: "Elite",
      price: "149",
      description: "The ultimate healthcare experience for peak performance.",
      features: [
        "Everything in Premium",
        "White-Glove Delivery",
        "Personal Health Concierge",
        "Bi-Weekly Consultations",
        "Customized Supplement Plan",
        "VIP Member Events"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            Investment in Health
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Plans for <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Every Life</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Whether you're starting your wellness journey or optimizing peak performance, 
            Zyphor has a tailored plan to support your longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingPlan key={plan.name} plan={plan} featured={i === 1} />
          ))}
        </div>

        <div className="mt-24 p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Custom Enterprise Solutions</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Need healthcare solutions for your organization or a specialized clinic? 
            We provide scalable B2B wellness infrastructure.
          </p>
          <Button variant="secondary" className="bg-cyan-500 text-white border-none px-8 py-4 rounded-full font-bold">
            Contact Sales
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
