"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ProductDetails() {
  const params = useParams();
  const { products } = useProducts();

  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/shop" className="mt-4 inline-flex items-center gap-2 text-brand-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Return to products
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-brand-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex aspect-square items-center justify-center border border-border bg-white p-8">
            <img src={product.images[0] ?? product.image ?? ""} alt={product.name} className="h-full w-full object-contain" />
          </div>

          <article className="space-y-8">
            <header className="border-b border-border pb-6">
              <p className="text-sm font-semibold uppercase text-brand-primary">{product.category}</p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-lg leading-7 text-muted-foreground">
                {product.shortDescription || product.description}
              </p>
            </header>

            <a
              href={`https://wa.me/919557646757?text=${encodeURIComponent("Hello, I would like to enquire about " + product.name + ".")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 bg-brand-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Enquire on WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <section>
              <h2 className="text-xl font-semibold">What it is</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{product.description}</p>
            </section>

            {product.benefits?.length ? (
              <section>
                <h2 className="text-xl font-semibold">What it does</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
                  {product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>
              </section>
            ) : null}

            {(product.ingredients || product.directions || product.warnings) && (
              <section className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold">Product information</h2>
                <dl className="mt-4 space-y-4">
                  {product.ingredients && <div><dt className="font-medium">Composition</dt><dd className="mt-1 text-muted-foreground">{product.ingredients}</dd></div>}
                  {product.directions && <div><dt className="font-medium">Directions</dt><dd className="mt-1 text-muted-foreground">{product.directions}</dd></div>}
                  {product.warnings && <div><dt className="font-medium">Precautions</dt><dd className="mt-1 text-muted-foreground">{product.warnings}</dd></div>}
                </dl>
              </section>
            )}
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}
