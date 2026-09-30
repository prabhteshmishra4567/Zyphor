"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Eye, MessageCircle, Search } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products } = useProducts();

  const filteredProducts = useMemo(() => products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [products, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="border-b border-border bg-white pt-32 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-brand-primary">Zyphor Pharmaceutical</p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">Product portfolio</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Explore our pharmaceutical and healthcare range. Open a product to learn more about it.
              </p>
            </div>
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_15rem]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              placeholder="Search product name or category"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full border border-border bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </label>
          <label className="sr-only" htmlFor="product-category">Filter by category</label>
          <select
            id="product-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full border border-border bg-white px-3 py-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((category) => (
              <option key={category.slug} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group border border-border bg-white">
                <Link href={`/products/${product.slug}`} className="block" aria-label={`View details for ${product.name}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={product.images[0] ?? product.image ?? ""}
                      alt={product.name}
                      className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
                <div className="border-t border-border p-4">
                  <p className="text-xs font-semibold uppercase text-brand-primary">{product.category}</p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{product.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {product.shortDescription || product.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex min-h-10 items-center gap-2 border border-brand-primary px-3 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      View details
                    </Link>
                    <a
                      href={`https://wa.me/919557646757?text=${encodeURIComponent("Hello, I would like to enquire about " + product.name + ".")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 bg-brand-primary px-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Enquire on WhatsApp
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="border-y border-border py-12 text-center text-muted-foreground">
            No products match your search. Try another name or category.
          </p>
        )}
      </section>
      <Footer />
    </main>
  );
}
