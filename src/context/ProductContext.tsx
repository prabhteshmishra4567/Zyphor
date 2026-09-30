"use client";

import React, { createContext, useContext, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { createLocalStorageStore, useLocalStorageStore } from "@/hooks/useLocalStorageStore";

interface ProductContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);
const productStore = createLocalStorageStore<Product[]>("zyphor-products", PRODUCTS);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, saveProducts] = useLocalStorageStore(productStore);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cached = window.localStorage.getItem("zyphor-products");
    if (!cached) {
      saveProducts(PRODUCTS);
      return;
    }

    try {
      const parsed = JSON.parse(cached) as Product[];
      const hasLegacyCatalog = !Array.isArray(parsed) || parsed.length < PRODUCTS.length;
      const hasOldBrandCatalog = parsed.some((item) => /Zyphor Vitality Syrup|Neuro-Focus Supplement|PureZinc Wellness Drops|SleepSync Magnesium|Zyphor Glow Skin Serum/.test(item.name));

      if (hasLegacyCatalog || hasOldBrandCatalog) {
        saveProducts(PRODUCTS);
      }
    } catch {
      saveProducts(PRODUCTS);
    }
  }, [saveProducts]);

  const addProduct = (product: Product) => {
    saveProducts([...products, product]);
  };

  const updateProduct = (product: Product) => {
    saveProducts(products.map((item) => item.id === product.id ? product : item));
  };

  const deleteProduct = (productId: string) => {
    saveProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}