import { 
  Package, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "order_12345678",
    createdAt: new Date().toISOString(),
    totalAmount: 129.99,
    status: "DELIVERED",
    items: [
      { quantity: 1, product: { name: "Premium Serum" } },
      { quantity: 2, product: { name: "Hydrating Mist" } },
    ]
  },
  {
    id: "order_87654321",
    createdAt: new Date().toISOString(),
    totalAmount: 45.50,
    status: "PROCESSING",
    items: [
      { quantity: 1, product: { name: "Face Wash" } },
    ]
  }
];

export default function OrdersPage() {
  const orders = MOCK_ORDERS;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
          <p className="text-slate-500">Track and manage your healthcare product purchases.</p>
        </div>
        <div className="text-sm text-slate-400">
          Total Orders: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No orders yet</h3>
          <p className="text-slate-500 mb-6">Looks like you haven&apos;t placed any orders yet.</p>
          <Link href="/shop">
            <Button className="bg-blue-600 hover:bg-blue-700">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-blue-300 transition-colors">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-slate-600">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <Badge variant={
                    order.status === "DELIVERED" ? "default" : 
                    order.status === "CANCELLED" ? "destructive" : "secondary"
                  } className={
                    order.status === "DELIVERED" ? "bg-green-100 text-green-700 border-green-200" : ""
                  }>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-sm font-bold text-slate-900">${Number(order.totalAmount).toFixed(2)}</p>
                  </div>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      Details <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Package className="w-4 h-4" />
                  <span>{order.items.length} items ordered</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {item.product.name} x{item.quantity}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
