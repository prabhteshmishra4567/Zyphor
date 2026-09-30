import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const MOCK_ORDER = {
  id: "order_payment_success_mock",
  totalAmount: 99.99,
  status: "PAID",
};

export default function PaymentSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const order = MOCK_ORDER;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12 text-center space-y-8">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
          <div className="relative bg-green-100 w-24 h-24 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-slate-500 text-lg">
            Thank you for choosing Zyphor. Your order <span className="font-mono font-bold text-slate-700">#{order.id.slice(-8).toUpperCase()}</span> has been placed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Order Total</p>
            <p className="text-xl font-bold text-slate-900">${Number(order.totalAmount).toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Status</p>
            <p className="text-xl font-bold text-green-600">{order.status}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Shipping</p>
            <p className="text-xl font-bold text-slate-900">Free</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 gap-2 px-8">
              View Order Details <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="w-full md:w-auto px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
