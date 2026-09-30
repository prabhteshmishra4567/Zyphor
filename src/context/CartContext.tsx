"use client";

import React, { createContext, useContext } from "react";
import { Product } from "@/types";
import { useProducts } from "@/context/ProductContext";
import { createLocalStorageStore, useLocalStorageStore } from "@/hooks/useLocalStorageStore";

type CartItem = Product & {
  quantity: number;
  image?: string;
  productId?: string;
  discountPrice?: number;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const cartStore = createLocalStorageStore<CartItem[]>("zyphor-cart", []);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorageStore(cartStore);
  const { products } = useProducts();

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const product = products.find(p => p.id === productId);
      if (!product) return prev;
      return [...prev, {
        ...product,
        quantity: 1,
        productId: product.id,
        image: product.images[0] ?? product.image ?? "",
        discountPrice: product.discountPrice ?? product.price,
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + ((item.discountPrice ?? item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
