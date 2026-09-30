"use client";

import React, { createContext, useContext } from "react";
import { Product } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { createLocalStorageStore, useLocalStorageStore } from "@/hooks/useLocalStorageStore";

type WishlistItem = Product;

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const wishlistStore = createLocalStorageStore<WishlistItem[]>("zyphor-wishlist", []);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useLocalStorageStore(wishlistStore);
  const { products } = useProducts();

  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === productId)) return prev;
      const product = products.find(p => p.id === productId);
      if (!product) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
