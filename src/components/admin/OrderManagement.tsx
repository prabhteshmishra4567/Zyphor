"use client";

import React, { useState } from "react";
import { Search, Filter, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { OrderDetails } from "@/components/admin/OrderDetails";
import { cn } from "@/lib/utils";

export const OrderManagement = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const orders = [
    { id: "ORD-9921", customer: "Sarah Connor", total: 124.50, status: "DELIVERED", date: "2023-10-20" },
    { id: "ORD-9922", customer: "Kyle Reese", total: 45.00, status: "SHIPPED", date: "2023-10-21" },
    { id: "ORD-9923", customer: "T-800", total: 210.00, status: "PENDING", date: "2023-10-22" },
  ];

  if (selectedOrderId) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedOrderId(null)} className="gap-2">
          ← Back to Orders
        </Button>
        <OrderDetails order={{
          id: selectedOrderId,
          createdAt: new Date().toISOString(),
          totalAmount: "124.50",
          status: "DELIVERED",
          paymentStatus: "PAID",
          shippingAddress: "123 Health Lane, Medicine City, NY 10001",
          customer: { name: "Sarah Connor", email: "sarah@example.com", phone: "+1 555-0101" },
          items: [
            { productId: "1", product: { name: "Vitamin C Complex", image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=800" }, quantity: 2, price: "24.99" },
            { productId: "2", product: { name: "Cough Syrup", image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800" }, quantity: 1, price: "15.50" },
          ]
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
            />
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-6 py-4 font-bold">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                <td className="px-6 py-4 text-sm font-bold">${order.total}</td>
                <td className="px-6 py-4">
                  <Badge variant={order.status === "DELIVERED" ? "success" : "outline"}>{order.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => setSelectedOrderId(order.id)}>
                    <Eye className="w-4 h-4" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
