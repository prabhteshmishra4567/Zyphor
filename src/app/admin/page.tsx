"use client";

import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { TrendingUp, Package, Users, ShoppingCart } from "lucide-react";

const STATS = [
  { label: "Total Revenue", value: "$128,430", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
  { label: "Total Orders", value: "1,240", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Total Customers", value: "856", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  { label: "Active Products", value: "342", icon: Package, color: "text-orange-600", bg: "bg-orange-100" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back, Admin. Here is what's happening today.</p>
          </div>
          <Button>Download Report</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <Card key={i} className="p-6 flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-lg font-bold mb-4">Revenue Growth</h3>
            <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
              [Revenue Chart Component - Recharts implementation coming next]
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-xs font-bold">Order #ZYP{1000 + i}</p>
                      <p className="text-[10px] text-slate-500">2 mins ago</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600">$45.00</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
