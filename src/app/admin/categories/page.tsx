import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { CategoryManagement } from "@/components/admin/CategoryManagement";

export default function AdminCategoriesPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Category Management</h1>
            <p className="text-slate-500">Organize your healthcare products into intuitive categories for better discovery.</p>
          </div>
          <CategoryManagement />
        </div>
      </main>
    </div>
  );
}
