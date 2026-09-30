import { XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Payment Failed</h1>
        <p className="text-slate-500">
          Something went wrong with your payment. Please check your card details or try a different payment method.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/checkout">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
              <RefreshCcw className="w-4 h-4" /> Try Again
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="w-full">Back to Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
