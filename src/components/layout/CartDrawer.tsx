"use client";

import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full max-w-md bg-background z-[70] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={onClose}>Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const itemId = item.productId ?? item.id;
                const itemImage = item.image ?? item.images?.[0] ?? "";
                const itemPrice = item.discountPrice ?? item.price;

                return (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border">
                      <img src={itemImage} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-semibold line-clamp-1">{item.name}</h3>
                      <p className="text-sm font-bold text-brand-primary">
                        ${itemPrice}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                          <button 
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                            className="p-1 hover:bg-muted"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(itemId)}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border space-y-4 bg-muted/30">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button className="w-full py-6 text-base" onClick={() => window.location.href = '/checkout'}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
