import { useEffect, useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { useProductsStore } from "../store/productsStore";
import { useAuthStore } from "../store/authStore";
import { Package, ShoppingBag, TrendingUp, Clock, CheckCircle, XCircle, Store, BarChart3 } from "lucide-react";

const STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];

const STATUS_COLORS = {
  Pending: { bar: "bg-yellow-400", text: "text-yellow-700", bg: "bg-yellow-50" },
  Shipped: { bar: "bg-blue-400", text: "text-blue-700", bg: "bg-blue-50" },
  Delivered: { bar: "bg-green-400", text: "text-green-700", bg: "bg-green-50" },
  Cancelled: { bar: "bg-red-400", text: "text-red-700", bg: "bg-red-50" },
};

const SellerDashboardPage = () => {
  const { sellerOrders, sellerStats, getSellerOrders, updateOrderStatus } = useOrderStore();
  const { allProducts, fetchProducts } = useProductsStore();
  const { user } = useAuthStore();
  const [statusUpdating, setStatusUpdating] = useState(null);

  useEffect(() => {
    getSellerOrders();
    fetchProducts();
  }, [getSellerOrders, fetchProducts]);

  const myProducts = allProducts.filter((p) => p.sellerID === user?._id || p.sellerID?._id === user?._id);
  const totalRevenue = sellerOrders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalSales = sellerOrders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => {
    return sum + o.items
      .filter((i) => i.product?.sellerID === user?._id || i.product?.sellerID?._id === user?._id)
      .reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  }, 0);

  const statsCards = sellerStats ? [
    { label: "Total Products", value: sellerStats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Orders", value: sellerStats.totalOrders, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Revenue", value: `$${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Pending", value: sellerStats.pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Shipped", value: sellerStats.shipped, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Delivered", value: sellerStats.delivered, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Cancelled", value: sellerStats.cancelled, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ] : [];

  const chartMax = sellerStats ? Math.max(sellerStats.pending, sellerStats.shipped, sellerStats.delivered, sellerStats.cancelled, 1) : 1;

  const handleStatusUpdate = async (orderId, newStatus) => {
    setStatusUpdating(orderId);
    await updateOrderStatus(orderId, newStatus);
    setStatusUpdating(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 space-y-10">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-4xl font-medium text-[#1C1B1A]">Seller Dashboard</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2">Manage your products and orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statsCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-5 text-center">
            <div className={`w-10 h-10 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="font-['Fraunces'] text-2xl font-medium text-[#1C1B1A]">{s.value}</p>
            <p className="font-['Inter'] text-xs text-[#8A8577] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8">
        <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-8 flex items-center gap-2">
          <BarChart3 size={20} className="text-[#C9A227]" /> Orders Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-['Inter'] text-sm text-[#8A8577] mb-5">Orders by Status</p>
            <div className="space-y-4">
              {STATUSES.map((s) => {
                const count = sellerStats ? sellerStats[s.toLowerCase()] : 0;
                const pct = chartMax > 0 ? (count / chartMax) * 100 : 0;
                const c = STATUS_COLORS[s];
                return (
                  <div key={s}>
                    <div className="flex justify-between font-['Inter'] text-sm mb-1.5">
                      <span className="text-[#1C1B1A] font-medium">{s}</span>
                      <span className="text-[#8A8577]">{count}</span>
                    </div>
                    <div className="w-full h-3 bg-[#FAF7F0] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#8A8577] mb-5">Status Distribution</p>
            <div className="flex items-end justify-center gap-3 h-48">
              {STATUSES.map((s) => {
                const count = sellerStats ? sellerStats[s.toLowerCase()] : 0;
                const pct = chartMax > 0 ? (count / chartMax) * 100 : 0;
                const c = STATUS_COLORS[s];
                return (
                  <div key={s} className="flex flex-col items-center gap-2 flex-1">
                    <span className="font-['Inter'] text-xs text-[#8A8577]">{count}</span>
                    <div
                      className={`w-full rounded-lg transition-all duration-700 ${c.bar}`}
                      style={{ height: `${Math.max(pct, 4)}%` }}
                    />
                    <span className="font-['Inter'] text-xs text-[#1C1B1A] font-medium">{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8">
        <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-6 flex items-center gap-2">
          <Store size={20} className="text-[#C9A227]" /> Your Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProducts.map((p) => (
            <div key={p._id} className="flex items-center gap-4 bg-[#FAF7F0] rounded-xl p-4">
              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-['Inter'] font-semibold text-[#1C1B1A] text-sm truncate">{p.name}</p>
                <p className="font-['Inter'] text-xs text-[#8A8577]">${p.price} · Stock: {p.stock}</p>
              </div>
            </div>
          ))}
          {myProducts.length === 0 && (
            <p className="font-['Inter'] text-sm text-[#8A8577] col-span-full text-center py-8">No products yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 overflow-hidden">
        <div className="p-8 pb-0">
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#C9A227]" /> Orders
          </h2>
        </div>
        <div className="overflow-x-auto p-8 pt-4">
          <table className="w-full font-['Inter'] text-sm">
            <thead>
              <tr className="border-b border-[#1C1B1A]/10">
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Order</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Customer</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Items</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Total</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Status</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Date</th>
                <th className="text-left py-3 px-2 text-[#8A8577] font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-10 text-[#8A8577]">No orders yet.</td></tr>
              ) : (
                sellerOrders.map((order) => (
                  <tr key={order._id} className="border-b border-[#1C1B1A]/5 hover:bg-[#FAF7F0] transition-colors">
                    <td className="py-4 px-2 font-semibold text-[#1C1B1A]">#{order._id.slice(-6)}</td>
                    <td className="py-4 px-2 text-[#8A8577]">{order.user?.name || "N/A"}</td>
                    <td className="py-4 px-2">
                      <div className="text-[#8A8577] text-xs space-y-0.5">
                        {order.items.map((item, i) => (
                          <div key={i}>{item.product?.name} x{item.quantity}</div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-2 font-semibold text-[#1C1B1A]">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>{order.status}</span>
                    </td>
                    <td className="py-4 px-2 text-[#8A8577] text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={statusUpdating === order._id}
                        className="bg-[#FAF7F0] border border-[#1C1B1A]/20 rounded-lg px-2 py-1.5 text-xs font-['Inter'] text-[#1C1B1A] focus:outline-none focus:border-[#C9A227]"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
