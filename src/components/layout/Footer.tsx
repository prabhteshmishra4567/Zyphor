"use client";

import React from "react";
import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Zyphor Pharmaceutical logo"
                className="h-12 w-auto max-w-[180px] object-contain"
              />
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Quality Medicines, Better Healthcare — focused on PCD Pharma, nutraceuticals, Ayurvedic products and third-party manufacturing support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Products</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Business</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>PCD Pharma</li>
              <li>Third Party Manufacturing</li>
              <li>Nutraceutical Products</li>
              <li>Ayurvedic Range</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Contact</h4>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-0.5 h-4 w-4 text-brand-primary" />
                <span>+91 95576 46757</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-primary" />
                <span>Plot No. 128, Industrial Area Phase II, Baddi, Dist. Solan, Himachal Pradesh – 173205</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} ZYPHOR PHARMACEUTICAL. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
