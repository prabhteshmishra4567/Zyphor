"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ShieldCheck, Truck, CreditCard, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

const FAQItem = ({ question, answer, icon: Icon, index }: { question: string, answer: string, icon: LucideIcon, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group hover:bg-white/5 transition-colors px-4 rounded-2xl -mx-4"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 group-hover:text-cyan-400'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
            {question}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-14 pb-6 text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Products & Quality",
      icon: ShieldCheck,
      questions: [
        {
          question: "Are Zyphor products pharmaceutical grade?",
          answer: "Yes. All Zyphor supplements and wellness products are manufactured in GMP-certified facilities and undergo rigorous third-party testing for purity and potency to ensure pharmaceutical-grade quality."
        },
        {
          question: "Do you sell prescription medicines?",
          answer: "Zyphor specializes in OTC (Over-The-Counter) wellness and healthcare products. We do not sell prescription-only medications without a verified legal authorization and medical prescription process."
        },
        {
          question: "How do I know which product is right for me?",
          answer: "We recommend consulting with a healthcare professional. However, you can use our product filters or contact our wellness concierge for a general guidance based on your goals."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping typically takes 3-5 business days. Priority shipping options are available for Premium and Elite members, reducing delivery time to 1-2 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we ship to most major regions. Please check our shipping policy page for a full list of supported countries and estimated delivery times."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order is dispatched, you will receive a tracking number via email. You can also track your current order status directly from your account dashboard."
        }
      ]
    },
    {
      title: "Payments & Returns",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, digital wallets (Apple Pay, Google Pay), and select cryptocurrency payments for a secure, modern checkout experience."
        },
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day money-back guarantee on all unopened products. If you are not satisfied with your experience, contact our support team for a hassle-free return."
        },
        {
          question: "Can I cancel my membership plan?",
          answer: "Yes, you can cancel your Essential, Premium, or Elite membership at any time through your account settings. No long-term contracts are required."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-sm mb-4"
          >
            Knowledge Base
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Frequently <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-violet-400">Asked Questions</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Find quick answers to common questions about our products, shipping, and wellness philosophy.
          </p>
        </div>

        <div className="space-y-16">
          {faqCategories.map((cat, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                  <cat.icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {cat.questions.map((q, idx) => (
                  <FAQItem 
                    key={idx} 
                    index={idx} 
                    question={q.question} 
                    answer={q.answer} 
                    icon={HelpCircle} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-3xl bg-linear-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 backdrop-blur-md text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Our wellness specialists are available to provide personalized guidance for your health goals.
          </p>
          <Link href="/contact">
            <Button variant="secondary" className="bg-cyan-500 text-white border-none px-8 py-4 rounded-full font-bold">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
