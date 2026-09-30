"use client";

import React, { useMemo, useState } from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Trash2, Edit, Plus, Search, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types";

export const ProductManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const filteredProducts = useMemo(() => products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    return !query || [product.name, product.sku, product.category].some((value) => value?.toLowerCase().includes(query));
  }), [products, searchQuery]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleSave = (product: Product) => {
    const slugExists = products.some((item) => item.slug === product.slug && item.id !== product.id);
    const savedProduct = slugExists ? { ...product, slug: `${product.slug}-${product.id.slice(-4)}` } : product;
    if (selectedProduct) {
      updateProduct(savedProduct);
    } else {
      addProduct(savedProduct);
    }
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm(`Delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button className="gap-2" onClick={() => { setSelectedProduct(null); setIsEditing(true); }}>
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {isEditing ? (
        <Card className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{selectedProduct ? "Edit Product" : "Create New Product"}</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Close</Button>
          </div>
          <ProductForm
            initialData={selectedProduct}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </Card>
      ) : (
        <div className="bg-background border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const stock = product.stock ?? (product.stockStatus === "Out of Stock" ? 0 : product.stockStatus === "Low Stock" ? 10 : 100);
                const stockStatus = stock === 0 ? "Out of Stock" : stock <= 20 ? "Low Stock" : "In Stock";
                const sku = product.sku ?? `ZYP-${product.id.toUpperCase()}`;

                return (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images[0] || product.image ? (
                        <img src={product.images[0] ?? product.image} alt="" className="w-10 h-10 rounded bg-muted object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center"><Package className="w-4 h-4 text-muted-foreground" /></div>
                      )}
                      <span className="font-medium">{product.name}</span>
                      {product.isFeatured && <Badge variant="primary" className="text-[8px] px-1">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{sku}</td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold">${product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold",
                      stock > 20 ? "bg-green-100 text-green-700" : stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                    )}>
                      {stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={stockStatus === "In Stock" ? "success" : stockStatus === "Low Stock" ? "warning" : "danger"}>{stockStatus}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button aria-label={`Edit ${product.name}`} title="Edit product" variant="ghost" size="icon" className="w-8 h-8" onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button aria-label={`Delete ${product.name}`} title="Delete product" variant="ghost" size="icon" className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(product)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );})}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">No products match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
