"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-4">
          <Card className="p-6 text-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
            <Button variant="outline" className="w-full text-sm">Edit Profile</Button>
          </Card>

          <nav className="flex flex-col gap-2">
            {["My Orders", "Addresses", "Wishlist", "Settings"].map((item) => (
              <Button key={item} variant="ghost" className="justify-start text-sm">
                {item}
              </Button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted" />
                    <div>
                      <p className="font-bold">Order #ZYP{5000 + i}</p>
                      <p className="text-xs text-muted-foreground">Delivered on Oct 12, 2023</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$124.00</p>
                    <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
