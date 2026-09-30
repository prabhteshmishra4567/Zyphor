"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "dark";
  hoverable?: boolean;
}

export const Card = ({ 
  variant = "default", 
  hoverable = false, 
  className, 
  children, 
  ...props 
}: CardProps) => {
  const variants = {
    default: "bg-card text-card-foreground border border-border",
    glass: "glass",
    dark: "bg-slate-900 text-white border border-slate-800",
  };

  return (
    <div
      className={cn(
        "rounded-3xl overflow-hidden transition-all duration-300",
        hoverable && "hover:-translate-y-1 hover:shadow-xl",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
