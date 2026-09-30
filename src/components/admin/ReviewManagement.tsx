"use client";

import React, { useState, useEffect } from "react";
import { Star, Eye, EyeOff, Trash2, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
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

type Review = {
  id: string;
  user?: { name?: string };
  product?: { name?: string };
  isVerified?: boolean;
  isHidden: boolean;
  rating: number;
  comment?: string;
};

export function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleVisibility(id: string, currentStatus: boolean) {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update review status");
      toast.success("Review visibility updated");
      await fetchReviews();
    } catch (error) {
      toast.error("An error occurred while updating visibility");
    }
  }

  async function deleteReview(id: string) {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Review deleted");
      await fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
    }
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
            placeholder="Search reviews by customer or product..." 
            className="pl-9"
            onChange={(e) => {
              const term = e.target.value.toLowerCase();
              setReviews(prev => prev.filter(r => 
                r.user?.name?.toLowerCase().includes(term) || 
                r.product?.name?.toLowerCase().includes(term)
              ));
            }}
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">Rating</TableHead>
              <TableHead className="font-semibold">Comment</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  No reviews found to moderate.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{review.user?.name || "Anonymous"}</span>
                      {review.isVerified && (
                        <Badge className="w-fit text-[10px] h-4 bg-blue-100 text-blue-700 border-blue-200 px-1">Verified</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{review.product?.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-slate-300"}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-slate-500 text-sm">
                    {review.comment}
                  </TableCell>
                  <TableCell>
                    {review.isHidden ? (
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200">Hidden</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 border-green-200">Visible</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleVisibility(review.id, review.isHidden)}
                      title={review.isHidden ? "Show Review" : "Hide Review"}
                    >
                      {review.isHidden ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeOff className="w-4 h-4 text-slate-600" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteReview(review.id)}
                      title="Delete Review"
                    >
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
