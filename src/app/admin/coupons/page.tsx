import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { CouponManagement } from "@/components/admin/CouponManagement";

export default function AdminCouponsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Coupon Management</h1>
            <p className="text-slate-500">Create and manage promotional discount codes to drive sales and reward loyalty.</p>
          </div>
          <CouponManagement />
        </div>
      </main>
    </div>
  );
}
