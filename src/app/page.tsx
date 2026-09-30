import "./globals.css";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  HeartPulse,
  Leaf,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const businessSolutions = [
  {
    title: "PCD Pharma",
    description:
      "Explore business opportunities with a growing product portfolio and professional support for distributors and healthcare partners.",
    icon: Building2,
  },
  {
    title: "Third Party Manufacturing",
    description:
      "Build your brand with dependable product development, packaging support and quality-oriented manufacturing partnerships.",
    icon: Factory,
  },
  {
    title: "Nutraceutical Products",
    description:
      "Discover wellness-focused formulations designed for modern nutritional and preventive healthcare needs.",
    icon: HeartPulse,
  },
  {
    title: "Ayurvedic Products",
    description:
      "Explore herbal and Ayurvedic product ranges that blend traditional wellness with modern quality standards.",
    icon: Leaf,
  },
];

const productHighlights = [
  {
    name: "ZYMOX 625",
    image: "/products/Zymox-625.jpeg",
    category: "Tablets",
    description: "Amoxycillin 500 mg + Clavulanic Acid 125 mg",
  },
  {
    name: "Zythro 500",
    image: "/products/Zythro-500.jpeg",
    category: "Capsules",
    description: "Pharmaceutical formulations for acute support and daily care.",
  },
  {
    name: "ZYQ10 FORTE",
    image: "/products/ZYQ10 FORTE.jpeg",
    category: "Nutraceuticals",
    description: "Comprehensive wellness support with essential nutrients.",
  },
  {
    name: "Zyvit Forte",
    image: "/products/Zyvit-Forte.jpeg",
    category: "Nutraceuticals",
    description: "Wellness-focused formulations for strength and vitality.",
  },
  {
    name: "Zydol-SP",
    image: "/products/Zydol-SP.jpeg",
    category: "Pharmaceutical",
    description: "Product support for pain relief and therapeutic care.",
  },
  {
    name: "Zyfer-XT",
    image: "/products/Zyfer-XT.jpeg",
    category: "Healthcare",
    description: "Targeted support for day-to-day wellness and management.",
  },
];

const trustPoints = [
  "Quality-focused product range",
  "Reliable business support for PCD and distribution partners",
  "Third-party manufacturing solutions",
  "Consistent service and transparent communication",
  "Growth-oriented healthcare portfolio",
];

export default function Home() {
  return (
    <CartProvider>
      <WishlistProvider>
        <main className="min-h-screen bg-[#f5f7f4] text-slate-800">
          <Header />

          <section className="relative overflow-hidden pt-28 pb-16 md:pt-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,92,59,0.12),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(26,163,154,0.12),_transparent_35%)]" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                    PCD Pharma • Third Party Manufacturing • Nutraceutical • Ayurvedic
                  </p>
                  <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-6xl">
                    Quality Medicines,
                    <span className="block text-emerald-700">Better Healthcare</span>
                  </h1>
                  <p className="mt-6 max-w-xl text-lg text-slate-600">
                    ZYPHOR PHARMACEUTICAL is a growing healthcare company focused on delivering quality pharmaceutical, nutraceutical and Ayurvedic products backed by trusted business support.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/shop">
                      <Button variant="primary" size="lg" className="rounded-full px-7">
                        View Products
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" size="lg" className="rounded-full px-7 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white">
                        Send Enquiry
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="text-2xl font-bold text-slate-900">500+</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Products</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="text-2xl font-bold text-slate-900">PCD</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Support</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="text-2xl font-bold text-slate-900">24/7</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Response</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
                    <img
                      src="/products/Zyvit-Forte.jpeg"
                      alt="Zyvit Forte product"
                      className="h-[480px] w-full rounded-[1.5rem] object-cover"
                    />
                  </div>
                  <div className="absolute -left-4 bottom-8 rounded-2xl border border-emerald-200 bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Quality Focused</div>
                        <div className="text-xs text-slate-500">Manufacturing & sourcing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Our Business Solutions</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Building healthcare partnerships that last
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {businessSolutions.map(({ icon: Icon, title, description }) => (
                <div key={title} className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Explore Our Products</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                    Discover our growing portfolio
                  </h2>
                </div>
                <Link href="/shop">
                  <Button variant="secondary" className="rounded-full px-6">
                    View All Products
                  </Button>
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {productHighlights.map((product) => (
                  <div key={product.name} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8faf7] shadow-sm transition-shadow hover:shadow-md">
                    <div className="bg-white p-4">
                      <img src={product.image} alt={product.name} className="h-72 w-full rounded-[1.5rem] object-contain" />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{product.category}</div>
                      <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                      <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                        Enquire now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Why choose us</p>
                <h3 className="mt-4 text-3xl font-bold">Committed to quality, trust and growth</h3>
                <div className="mt-8 space-y-4">
                  {trustPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                      <span className="text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Quality-Focused Approach</h4>
                  <p className="mt-3 text-slate-600">We focus on quality-oriented pharmaceutical products and dependable business solutions for healthcare markets.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Professional Support</h4>
                  <p className="mt-3 text-slate-600">From enquiry to order and business coordination, we aim to provide efficient communication and partnership support.</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:col-span-2">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Better healthcare for every business</h4>
                  <p className="mt-3 text-slate-600">Whether you are a distributor, stockist, retailer, PCD associate or healthcare business, we are ready to discuss your requirements and build long-term partnerships.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#f3f8f5] py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Browse Our Product Range</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">Quality healthcare products for better business</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {[
                  { name: "Tablets", icon: "💊" },
                  { name: "Capsules", icon: "💊" },
                  { name: "Syrups", icon: "🧴" },
                  { name: "Nutraceuticals", icon: "🌿" },
                  { name: "Ayurvedic", icon: "🌿" },
                ].map((category) => (
                  <div key={category.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <div className="text-4xl">{category.icon}</div>
                    <h3 className="mt-4 text-xl font-bold text-slate-900">{category.name}</h3>
                    <Link href="/shop" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      View Products <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-800 to-emerald-700 py-20 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">Let’s Build Together</p>
                  <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">Looking for pharmaceutical products or business opportunities?</h2>
                  <p className="mt-4 max-w-2xl text-emerald-50/90">
                    Whether you are a Pharma Distributor, Stockist, PCD Pharma Associate, Retailer or Business Owner, ZYPHOR PHARMACEUTICAL is ready to discuss your requirements.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop">
                    <Button variant="glass" className="rounded-full bg-white text-emerald-800 hover:bg-emerald-50">
                      View Products
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="glass" className="rounded-full border border-white/40 bg-transparent text-white hover:bg-white/10">
                      Send Enquiry
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </WishlistProvider>
    </CartProvider>
  );
}
