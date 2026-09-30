"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.coerce.number().min(0.01, "Discount must be positive"),
  minOrderValue: z.coerce.number().min(0, "Minimum order cannot be negative").default(0),
  expiryDate: z.string().min(1, "Expiry date is required"),
  isActive: z.boolean().default(true),
});

type CouponFormValues = z.infer<typeof couponSchema>;

export function CouponManagement() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  const form = useForm({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discountType: "PERCENTAGE",
      discountValue: 0,
      minOrderValue: 0,
      expiryDate: new Date().toISOString().split('T')[0],
      isActive: true,
    },
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  async function fetchCoupons() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      setCoupons(data);
    } catch (error) {
      toast.error("Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data: z.infer<typeof couponSchema>) {
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/admin/coupons/${selectedCoupon?.id}` : "/api/admin/coupons";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(isEditing ? "Coupon updated" : "Coupon created");
      form.reset();
      setIsEditing(false);
      await fetchCoupons();
    } catch (error) {
      toast.error("An error occurred while saving the coupon");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Coupon deleted");
      await fetchCoupons();
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  }

  function handleEdit(coupon: any) {
    setSelectedCoupon(coupon);
    setIsEditing(true);
    form.reset({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: Number(coupon.discountValue),
      minOrderValue: Number(coupon.minOrderValue),
      expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0],
      isActive: coupon.isActive,
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Input 
            placeholder="Search coupon codes..." 
            className="pl-9"
            onChange={(e) => {
              const term = e.target.value.toUpperCase();
              setCoupons(prev => prev.filter(c => c.code.toUpperCase().includes(term)));
            }}
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
              <DialogDescription>
                Set up a promotional code to offer discounts to your customers.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <Input {...form.register("code")} placeholder="e.g. HEALTH20" />
                  {form.formState.errors.code && <p className="text-xs text-red-500">{form.formState.errors.code.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Type</label>
                  <select {...form.register("discountType")} className="w-full p-2 border rounded-md bg-white text-sm">
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount ($)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value</label>
                  <Input type="number" step="0.01" {...form.register("discountValue")} placeholder="10.00" />
                  {form.formState.errors.discountValue && <p className="text-xs text-red-500">{form.formState.errors.discountValue.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Order Value</label>
                  <Input type="number" step="0.01" {...form.register("minOrderValue")} placeholder="50.00" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input type="date" {...form.register("expiryDate")} />
                {form.formState.errors.expiryDate && <p className="text-xs text-red-500">{form.formState.errors.expiryDate.message}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" {...form.register("isActive")} id="isActiveCoupon" className="rounded border-slate-300" />
                <label htmlFor="isActiveCoupon" className="text-sm font-medium">Active</label>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Coupon</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Discount</TableHead>
              <TableHead className="font-semibold">Min Order</TableHead>
              <TableHead className="font-semibold">Expiry</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  No coupons found. Create one to start your promotion.
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-bold font-mono">{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.discountType === "PERCENTAGE" 
                      ? `${coupon.discountValue}%` 
                      : `$${coupon.discountValue}`}
                  </TableCell>
                  <TableCell>${coupon.minOrderValue}</TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {coupon.isActive ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(coupon)}>
                      <Pencil className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
