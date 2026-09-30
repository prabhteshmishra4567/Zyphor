import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { CustomerManagement } from "@/components/admin/CustomerManagement";
import { Header } from "@/components/layout/Header";

export default function AdminCustomersPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
            <p className="text-slate-500">Manage your customer base, account statuses, and spending history.</p>
          </div>
          <CustomerManagement />
        </div>
      </main>
    </div>
  );
}
