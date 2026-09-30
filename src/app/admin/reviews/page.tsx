import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { ReviewManagement } from "@/components/admin/ReviewManagement";

export default function AdminReviewsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Review Moderation</h1>
            <p className="text-slate-500">Review and manage customer feedback to maintain brand trust and quality.</p>
          </div>
          <ReviewManagement />
        </div>
      </main>
    </div>
  );
}
