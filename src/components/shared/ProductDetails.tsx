"use client";

import React, { useState } from "react";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    shortDescription: string;
    ingredients: string;
    usageInstructions: string;
    warnings: string;
    stockStatus: string;
    images: string[];
    isPrescription: boolean;
  };
}

export const ProductDetails = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-muted border border-border">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                  selectedImage === idx ? "border-brand-primary scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.isPrescription && <Badge variant="danger">Prescription Required</Badge>}
            </div>
            <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "text-muted-foreground")} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} Verified Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-foreground">${product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-muted-foreground line-through">${product.price}</span>
                <Badge variant="secondary" className="bg-red-500 text-white">-{discount}%</Badge>
              </div>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Purchase Section */}
          <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg bg-background">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <Button className="flex-1 gap-2 py-6 text-base">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" /> Fast Delivery
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4" /> 30-Day Returns
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Secure Payment
              </div>
            </div>
          </div>

          {/* Medical Details */}
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <Info className="w-5 h-5 text-brand-primary mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-brand-primary">Healthcare Disclaimer</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This product is for informational purposes. Always consult a licensed healthcare professional 
                  before starting any new medication or supplement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Ingredients" className="p-0">
                <div className="p-4 text-sm text-muted-foreground leading-relaxed">
                  {product.ingredients}
                </div>
              </Card>
              <Card title="Instructions" className="p-0">
                <div className="p-4 text-sm text-muted-foreground leading-relaxed">
                  {product.usageInstructions}
                </div>
              </Card>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-700">Important Warnings</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.warnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
