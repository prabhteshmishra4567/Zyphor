"use client";

import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }
    setIsLoading(true);
    
    // Mock registration success
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ type: "success", text: "Account created successfully!" });
      setTimeout(() => router.push("/login"), 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Join Zyphor</h1>
          <p className="text-muted-foreground">Create your account for a premium healthcare experience</p>
        </div>

        <Card className="p-8 shadow-xl border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div className={`p-3 rounded-lg text-sm font-medium ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {message.text}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input 
                type="text" 
                required 
                className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input 
                type="email" 
                required 
                className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <input 
                type="password" 
                required 
                className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" /> Confirm Password
              </label>
              <input 
                type="password" 
                required 
                className="w-full p-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-brand-secondary transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <div className="p-4 rounded-xl bg-muted border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                <CheckCircle2 className="w-3 h-3" /> Secure Account
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                By creating an account, you agree to Zyphor&apos;s Terms of Service and Privacy Policy. We use industry-standard encryption to protect your data.
              </p>
            </div>

            <Button className="w-full py-6 text-base gap-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-primary font-bold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};
