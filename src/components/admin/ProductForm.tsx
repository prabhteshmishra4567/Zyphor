"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";

const createSlug = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ProductForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [sku, setSku] = useState(initialData?.sku ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(String(initialData?.price ?? ""));
  const [originalPrice, setOriginalPrice] = useState(String(initialData?.originalPrice ?? ""));
  const [stock, setStock] = useState(String(initialData?.stock ?? 0));
  const [image, setImage] = useState(initialData?.images[0] ?? initialData?.image ?? "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericPrice = Number(price);
    const numericOriginalPrice = Number(originalPrice || price);
    const numericStock = Number(stock);
    const productId = initialData?.id ?? `product-${Date.now()}`;

    onSave({
      ...initialData,
      id: productId,
      sku: sku.trim(),
      name: name.trim(),
      slug: createSlug(slug || name),
      description: description.trim(),
      shortDescription: description.trim(),
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      discountPrice: undefined,
      rating: initialData?.rating ?? 0,
      reviewCount: initialData?.reviewCount ?? 0,
      category: category.trim(),
      images: image.trim() ? [image.trim()] : [],
      image: image.trim(),
      stock: numericStock,
      stockStatus: numericStock === 0 ? "Out of Stock" : numericStock <= 20 ? "Low Stock" : "In Stock",
      isFeatured,
      featured: isFeatured,
      isBestseller: initialData?.isBestseller ?? false,
      bestseller: initialData?.bestseller ?? false,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="product-name" className="text-sm font-medium text-slate-700">Product name</label>
          <Input id="product-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Product name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="product-sku" className="text-sm font-medium text-slate-700">SKU</label>
          <Input id="product-sku" value={sku} onChange={(event) => setSku(event.target.value)} placeholder="SKU" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="product-category" className="text-sm font-medium text-slate-700">Category</label>
          <Input id="product-category" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="product-slug" className="text-sm font-medium text-slate-700">URL slug</label>
          <Input id="product-slug" value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="Generated from product name" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="product-price" className="text-sm font-medium text-slate-700">Price</label>
          <Input id="product-price" type="number" min="0.01" step="0.01" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="0.00" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="product-original-price" className="text-sm font-medium text-slate-700">Compare-at price</label>
          <Input id="product-original-price" type="number" min="0.01" step="0.01" value={originalPrice} onChange={(event) => setOriginalPrice(event.target.value)} placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <label htmlFor="product-stock" className="text-sm font-medium text-slate-700">Stock</label>
          <Input id="product-stock" type="number" min="0" step="1" value={stock} onChange={(event) => setStock(event.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="product-image" className="text-sm font-medium text-slate-700">Image URL</label>
        <Input id="product-image" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." />
      </div>

      <div className="space-y-2">
        <label htmlFor="product-description" className="text-sm font-medium text-slate-700">Description</label>
        <textarea id="product-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} required className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" checked={isFeatured} onChange={(event) => setIsFeatured(event.target.checked)} />
        Feature this product
      </label>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Product
        </Button>
      </div>
    </form>
  );
}
