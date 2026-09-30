"use client";

import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";
import { useProducts } from "@/context/ProductContext";
import { CATEGORIES } from "@/data/categories";

export const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const { products } = useProducts();
  const filteredProducts = useMemo(() => products
    .filter((product) => {
      const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesMinimum = minimumPrice === "" || product.price >= Number(minimumPrice);
      const matchesMaximum = maximumPrice === "" || product.price <= Number(maximumPrice);
      return matchesSearch && matchesCategory && matchesMinimum && matchesMaximum && product.rating >= minimumRating;
    })
    .sort((left, right) => {
      if (sortBy === "price-low") return left.price - right.price;
      if (sortBy === "price-high") return right.price - left.price;
      if (sortBy === "rating") return right.rating - left.rating;
      return right.reviewCount - left.reviewCount;
    }), [products, searchQuery, selectedCategories, minimumPrice, maximumPrice, minimumRating, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => current.includes(category)
      ? current.filter((item) => item !== category)
      : [...current, category]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Shop Header */}
      <div className="bg-brand-primary text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-secondary/10 skew-y-3 translate-y-10" />
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold">Our Pharmacy</h1>
          <p className="text-brand-primary-foreground/80 max-w-2xl mx-auto">
            Premium quality healthcare products delivered with care. 
            Browse our certified selection of OTC medicines and wellness supplements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={cn(
          "fixed lg:relative z-40 w-full lg:w-64 bg-background border border-border rounded-2xl p-6 transition-all duration-300 shadow-xl lg:shadow-none",
          isFilterOpen ? "inset-0 translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-lg">Filters</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsFilterOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-8">
            {/* Search */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Product name..." 
                  className="w-full bg-muted border border-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</label>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 text-sm cursor-pointer group">
                    <input type="checkbox" checked={selectedCategories.includes(cat.name)} onChange={() => toggleCategory(cat.name)} className="w-4 h-4 rounded border-border accent-brand-primary" />
                    <span className="group-hover:text-brand-primary transition-colors">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price Range</label>
              <div className="flex items-center gap-4">
                <input type="number" min="0" placeholder="Min" value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm" />
                <span className="text-muted-foreground">-</span>
                <input type="number" min="0" placeholder="Max" value={maximumPrice} onChange={(event) => setMaximumPrice(event.target.value)} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minimum Rating</label>
              <div className="flex flex-col gap-2">
                {[5, 4, 3, 2, 1, 0].map((star) => (
                  <label key={star} className="flex items-center gap-2 text-sm cursor-pointer group">
                    <input type="radio" name="minimum-rating" checked={minimumRating === star} onChange={() => setMinimumRating(star)} className="w-4 h-4 accent-brand-primary" />
                    <span className="group-hover:text-brand-primary transition-colors">{star === 0 ? "Any rating" : `${star} Stars & Up`}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> of {products.length} products</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="lg:hidden flex gap-2" onClick={() => setIsFilterOpen(true)}>
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </Button>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="bg-transparent text-sm font-medium outline-none border-none cursor-pointer hover:text-brand-primary">
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && <p className="col-span-full py-12 text-center text-muted-foreground">No products match these filters.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
