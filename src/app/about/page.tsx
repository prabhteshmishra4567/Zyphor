"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Factory, HeartPulse, Leaf, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const values = [
  {
    icon: ShieldCheck,
    title: "Quality-Oriented Products",
    description: "We aim to offer products that meet appropriate quality and regulatory requirements through our manufacturing and sourcing processes.",
  },
  {
    icon: BadgeCheck,
    title: "Consistency",
    description: "We value consistency in product quality, packaging and business service for sustained healthcare trust.",
  },
  {
    icon: Users,
    title: "Reliable Business Support",
    description: "Our team works to provide timely communication and professional assistance to our partners and distributors.",
  },
  {
    icon: Stethoscope,
    title: "Continuous Improvement",
    description: "We continuously improve our products, services and business processes to remain aligned with healthcare needs.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f4] text-slate-800">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">About Us</p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Quality Medicines,
            <span className="block text-emerald-700">Better Healthcare</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            ZYPHOR PHARMACEUTICAL is a pharmaceutical healthcare company engaged in PCD Pharma, pharmaceutical marketing, third-party manufacturing, nutraceutical and Ayurvedic products.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Who We Are</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Focused on safe, quality-driven healthcare</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our focus is to develop and promote a reliable range of healthcare products while building long-term relationships with PCD associates, distributors, stockists, retailers and healthcare businesses across India.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We believe that quality, consistency, transparency and professional service are the foundation of a successful pharmaceutical business.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Pharmaceutical Tablets",
                "Capsules",
                "Syrups & Oral Liquids",
                "Nutraceutical Products",
                "Ayurvedic Products",
                "Third-Party Manufacturing",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Our Quality Focus</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">The values guiding our business</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-[2rem] border border-slate-200 bg-[#f8faf7] p-7 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Factory className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Manufacturing Capabilities</h3>
            <p className="mt-3 text-slate-600">We work with manufacturing partners and facilities for tablets, capsules, syrups, nutraceuticals and Ayurvedic formulations.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <HeartPulse className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Marketing Capabilities</h3>
            <p className="mt-3 text-slate-600">We support our partners with product information, promotional material, digital marketing assistance and business coordination.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">PCD Pharma Business</h3>
            <p className="mt-3 text-slate-600">We offer opportunities for distributors, stockists and business partners seeking long-term pharmaceutical relationships.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="mt-3 text-slate-600">“To become a trusted name in the pharmaceutical and healthcare industry through quality products, professional service and long-term partnerships.”</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-800 to-emerald-700 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">Our Mission</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">To contribute to better healthcare through quality-oriented products and sustainable business opportunities.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/shop">
              <Button variant="glass" className="rounded-full bg-white text-emerald-800 hover:bg-emerald-50">
                View Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="glass" className="rounded-full border border-white/40 bg-transparent text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
