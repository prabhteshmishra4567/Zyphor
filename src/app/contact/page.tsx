"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, CheckCircle2, MapPin, MessageSquareText, PhoneCall, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitError("");

    const formData = new FormData(event.currentTarget);
    const encodedData = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") encodedData.append(key, value);
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      if (!response.ok) throw new Error("Enquiry submission failed");
      setIsSubmitted(true);
    } catch {
      setSubmitError("We couldn't send your enquiry. Please call or WhatsApp us instead.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-slate-800">
      <Header />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Contact Us</p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            ZYPHOR PHARMACEUTICAL
          </h1>
          <p className="mt-4 text-lg text-slate-600">Quality Medicines, Better Healthcare</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone</div>
                  <a href="tel:+919557646757" className="mt-2 block text-xl font-bold text-slate-900">+91 95576 46757</a>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Address</div>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    Plot No. 128, Industrial Area Phase II, Baddi, Dist. Solan, Himachal Pradesh – 173205
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <MessageSquareText className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Business Enquiry</div>
                  <a
                    href="https://wa.me/919557646757"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-emerald-700"
                  >
                    WhatsApp Us <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-7 shadow-sm">
              <div className="flex items-center gap-3 text-emerald-700">
                <Building2 className="h-6 w-6" />
                <h3 className="text-xl font-bold">Let’s build a better healthcare business together</h3>
              </div>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Whether you are a Pharma Distributor, Stockist, PCD Pharma Associate, Retailer or Business Owner, we are ready to discuss your product and manufacturing requirements.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Product Enquiry</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Send your requirement</h2>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  name="product-enquiry"
                  method="POST"
                  action="/__forms.html"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="product-enquiry" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="enquiry-name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                      <input id="enquiry-name" name="name" required type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-company" className="mb-2 block text-sm font-medium text-slate-700">Company Name</label>
                      <input id="enquiry-company" name="company-name" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-mobile" className="mb-2 block text-sm font-medium text-slate-700">Mobile Number</label>
                      <input id="enquiry-mobile" name="mobile-number" required type="tel" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Your mobile number" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-location" className="mb-2 block text-sm font-medium text-slate-700">City / State</label>
                      <input id="enquiry-location" name="city-state" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="City / State" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-business" className="mb-2 block text-sm font-medium text-slate-700">Business Type</label>
                      <input id="enquiry-business" name="business-type" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Distributor / Retailer / PCD" />
                    </div>
                    <div>
                      <label htmlFor="enquiry-product" className="mb-2 block text-sm font-medium text-slate-700">Product Interested In</label>
                      <input id="enquiry-product" name="product-interest" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Product / category" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiry-quantity" className="mb-2 block text-sm font-medium text-slate-700">Required Quantity</label>
                    <input id="enquiry-quantity" name="required-quantity" type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Approximate quantity" />
                  </div>

                  <div>
                    <label htmlFor="enquiry-message" className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                    <textarea id="enquiry-message" name="message" rows={5} className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-emerald-500" placeholder="Tell us about your requirement..." />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full rounded-full bg-emerald-700 px-6 py-4 text-base font-bold text-white hover:bg-emerald-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Submit Enquiry <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                  {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">Thank you</h3>
                  <p className="mt-3 text-slate-700">
                    Your enquiry has been received successfully. Our team will contact you regarding product availability, pricing and business opportunities.
                  </p>
                  <Button variant="outline" className="mt-6 rounded-full border-emerald-700 text-emerald-700" onClick={() => setIsSubmitted(false)}>
                    Send Another Enquiry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
