"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "danger" | "default" | "destructive";
}

export const Badge = ({ className, variant = "primary", ...props }: BadgeProps) => {
  const variants = {
    primary: "bg-brand-primary text-brand-primary-foreground",
    secondary: "bg-brand-secondary text-brand-secondary-foreground",
    outline: "border border-border text-muted-foreground",
    success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    destructive: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
