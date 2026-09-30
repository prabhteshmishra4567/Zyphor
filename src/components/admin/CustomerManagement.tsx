"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  
  const customers = [
    { id: "C1", name: "Sarah Connor", email: "sarah@sky.net", phone: "+1 555-0101", orders: 12, spend: 1450.00, status: "Active" },
    { id: "C2", name: "Kyle Reese", email: "kyle@resistance.org", phone: "+1 555-0202", orders: 3, spend: 120.50, status: "Active" },
    { id: "C3", name: "T-800", email: "cyberdyne@tech.com", phone: "+1 555-0303", orders: 1, spend: 500.00, status: "Suspended" },
  ];

  if (selectedCustomer) {
    const customer = customers.find(c => c.id === selectedCustomer);
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedCustomer(null)} className="gap-2">
          ← Back to Customers
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground">
                {customer?.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{customer?.name}</h2>
                <Badge variant={customer?.status === "Active" ? "success" : "danger"}>{customer?.status}</Badge>
              </div>
            </div>
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{customer?.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="font-medium">{customer?.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Spend</span>
                <span className="font-bold text-brand-primary">${customer?.spend.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="flex-1 gap-2"><Save className="w-4 h-4" /> Update</Button>
              <Button variant="outline" className="flex-1 gap-2 text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /> Delete</Button>
            </div>
          </Card>
          <Card className="lg:col-span-2 p-6 space-y-6">
            <h3 className="text-lg font-bold">Order History</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 border border-border rounded-xl flex justify-between items-center hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg"><Package className="w-5 h-5" /></div>
                    <div>
                      <p className="text-sm font-bold">Order #ZYP{8000 + i}</p>
                      <p className="text-xs text-muted-foreground">Oct {10 + i}, 2023 • Delivered</p>
                    </div>
                  </div>
                  <span className="font-bold">$120.00</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Directory</h2>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Add Customer</Button>
      </div>
      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Orders</th>
              <th className="px-6 py-4 font-medium">Spending</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/50 transition-colors group">
                <td className="px-6 py-4 font-medium">{customer.name}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-col">
                    <span>{customer.email}</span>
                    <span className="text-xs text-muted-foreground">{customer.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{customer.orders} orders</td>
                <td className="px-6 py-4 text-sm font-bold">${customer.spend.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <Badge variant={customer.status === "Active" ? "success" : "danger"}>{customer.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer.id)}>
                    View Profile
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

// Dummy component to prevent import errors in the standalone file
const Package = ({ className }: { className?: string }) => <div className={className} />;
