import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { Header } from "@/components/layout/Header";

export default function AdminProductsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Product Management</h1>
            <p className="text-slate-500">Manage your healthcare inventory, pricing, and visibility.</p>
          </div>
          <ProductManagement />
        </div>
      </main>
    </div>
  );
}
