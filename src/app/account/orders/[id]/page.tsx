import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Calendar, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { notFound } from "next/navigation";

const MOCK_ORDER_DETAIL = {
  id: "order_details_mock_123",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalAmount: 129.99,
  status: "DELIVERED",
  paymentStatus: "PAID",
  shippingAddress: "123 Health St, Wellness City, WC 12345",
  items: [
    { id: "item_1", quantity: 1, price: 89.99, product: { name: "Premium Serum" } },
    { id: "item_2", quantity: 2, price: 20.00, product: { name: "Hydrating Mist" } },
  ]
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = MOCK_ORDER_DETAIL;
  const orderDate = new Date(order.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Link href="/account/orders" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to My Orders
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
                <p className="text-slate-500 text-sm font-mono">#{order.id.slice(-8).toUpperCase()}</p>
              </div>
              <Badge className={
                order.status === "DELIVERED" ? "bg-green-100 text-green-700 border-green-200" : 
                "bg-blue-100 text-blue-700 border-blue-200"
              }>
                {order.status}
              </Badge>
            </div>

            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product.name}</TableCell>
                      <TableCell className="text-center">{item.quantity}</TableCell>
                      <TableCell className="text-right">${Number(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Paid</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Order Date</p>
                  <p className="text-sm font-medium">{orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Shipping To</p>
                  <p className="text-sm font-medium line-clamp-1">{order.shippingAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Payment Status</p>
                  <p className="text-sm font-medium">{order.paymentStatus}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-sm font-semibold mb-4">Order Status Timeline</h4>
              <div className="space-y-4 relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-100" />
                {[
                  { label: "Order Placed", date: new Date(order.createdAt), active: true },
                  { label: "Confirmed", date: new Date(order.updatedAt), active: order.status !== "PENDING" },
                  { label: "Shipped", date: null, active: order.status === "SHIPPED" || order.status === "DELIVERED" },
                  { label: "Delivered", date: null, active: order.status === "DELIVERED" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative">
                    <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${step.active ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"}`}>
                      {step.active ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm ${step.active ? "font-semibold text-slate-900" : "text-slate-400"}`}>{step.label}</span>
                      {step.date && <span className="text-[10px] text-slate-400">{step.date.toLocaleDateString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
