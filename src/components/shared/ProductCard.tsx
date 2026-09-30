"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;
  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === "Out of Stock";

  return (
    <div className="group relative bg-background rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0] ?? product.image ?? ""}
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && <Badge variant="primary">Featured</Badge>}
          {discount > 0 && (
            <Badge variant="secondary" className="bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
        </div>

        <Button 
          type="button"
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full glass opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id)}
        >
          <Heart className={cn("w-4 h-4", isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500")} />
        </Button>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/60 to-transparent">
          <Link href={`/products/${product.slug}`}>
            <Button variant="secondary" className="w-full py-2 text-xs gap-2">
              <Eye className="w-3 h-3" /> Quick View
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            {product.category}
          </p>
          <h3 className="font-semibold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-current" : "text-muted-foreground")} 
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.discountPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.price}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              ${product.discountPrice || product.price}
            </span>
          </div>
          
          <Button
            size="icon"
            className="w-9 h-9 rounded-full"
            aria-label={`Add ${product.name} to cart`}
            disabled={isOutOfStock}
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        <div className="pt-2">
          <Badge variant={product.stockStatus === "In Stock" ? "success" : product.stockStatus === "Low Stock" ? "warning" : "outline"}>
            {product.stockStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
};
