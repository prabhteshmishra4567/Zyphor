import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  isBestseller: z.boolean().default(false),
  ingredients: z.string().optional(),
  usageInstructions: z.string().optional(),
  warnings: z.string().optional(),
  isPrescription: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof ProductSchema>;
