"use client";

import React from "react";
import { Package, User, Calendar, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface OrderDetailProps {
  order: {
    id: string;
    createdAt: string;
    totalAmount: string;
    status: string;
    paymentStatus: string;
    shippingAddress: string;
    customer: { name: string; email: string; phone: string };
    items: Array<{
      productId: string;
      product: { name: string; image: string };
      quantity: number;
      price: string;
    }>;
  };
}

export const OrderDetails = ({ order }: OrderDetailProps) => {
  const statusSteps = ["PENDING", "CONFIRMED", "PROCESSING", "PACKED", "SHIPPED", "DELIVERED"];
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="primary">{order.status}</Badge>
          <Badge variant="outline">{order.paymentStatus}</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-primary" /> Order Items
            </h3>
            <div className="divide-y divide-border">
              {order.items.map((item, i) => (
                <div key={i} className="py-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                      <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-brand-primary">${order.totalAmount}</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-primary" /> Delivery Timeline
            </h3>
            <div className="relative flex justify-between">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                    i <= currentStepIndex ? "bg-brand-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {i < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{i+1}</span>}
                  </div>
                  <span className="text-[10px] mt-2 font-medium uppercase tracking-tighter text-center w-20">{step}</span>
                </div>
              ))}
              <div className="absolute top-4 left-0 right-0 h-1 bg-border -z-0" />
              <div 
                className="absolute top-4 left-0 h-1 bg-brand-primary transition-all duration-500 -z-0" 
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }} 
              />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-brand-primary" /> Customer
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-muted-foreground">{order.customer.email}</p>
              <p className="text-muted-foreground">{order.customer.phone}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-primary" /> Payment
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium">Stripe Card</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="success">{order.paymentStatus}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-primary" /> Shipping
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {order.shippingAddress}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
