import { useEffect, useMemo, useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { useProductsStore } from "../store/productsStore";
import { useAuthStore } from "../store/authStore";
import { Package, ShoppingBag, TrendingUp, Store, DollarSign } from "lucide-react";

const STATUSES = ["Pending", "Shipped", "Delivered", "Cancelled"];
const STATUS_BG = { Pending: "bg-yellow-100 text-yellow-700", Shipped: "bg-blue-100 text-blue-700", Delivered: "bg-green-100 text-green-700", Cancelled: "bg-red-100 text-red-700" };
const STATUS_TAB = { Pending: "border-yellow-400 text-yellow-700", Shipped: "border-blue-400 text-blue-700", Delivered: "border-green-400 text-green-700", Cancelled: "border-red-400 text-red-700" };

const SellerDashboardPage = () => {
  const { sellerOrders, sellerStats, getSellerOrders, updateOrderStatus } = useOrderStore();
  const { allProducts, fetchProducts } = useProductsStore();
  const { user } = useAuthStore();
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getSellerOrders();
    fetchProducts();
  }, [getSellerOrders, fetchProducts]);

  const myProducts = allProducts.filter((p) => p.sellerID === user?._id || p.sellerID?._id === user?._id);

  const monthlyRevenue = useMemo(() => {
    const map = {};
    sellerOrders.forEach((o) => {
      if (o.status === "Delivered" || o.status === "Shipped") {
        const key = new Date(o.createdAt).toLocaleString("default", { month: "short", year: "2-digit" });
        map[key] = (map[key] || 0) + o.totalAmount;
      }
    });
    return Object.entries(map).slice(-6);
  }, [sellerOrders]);

  const revMax = monthlyRevenue.length > 0 ? Math.max(...monthlyRevenue.map(([, v]) => v), 1) : 1;

  const filteredOrders = statusFilter === "All"
    ? sellerOrders
    : sellerOrders.filter((o) => o.status === statusFilter);

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

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8">
        <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-6 flex items-center gap-2">
          <DollarSign size={20} className="text-[#C9A227]" /> Revenue
        </h2>
        {monthlyRevenue.length === 0 ? (
          <p className="font-['Inter'] text-sm text-[#8A8577] text-center py-8">No revenue data yet.</p>
        ) : (
          <div className="flex items-end justify-between gap-3 h-52">
            {monthlyRevenue.map(([label, amount]) => {
              const pct = (amount / revMax) * 100;
              return (
                <div key={label} className="flex flex-col items-center gap-2 flex-1">
                  <span className="font-['Inter'] text-xs text-[#1C1B1A] font-semibold">${amount.toFixed(0)}</span>
                  <div className="w-full rounded-lg bg-gradient-to-t from-[#C9A227] to-[#C9A227]/40 transition-all duration-700" style={{ height: `${Math.max(pct, 5)}%` }} />
                  <span className="font-['Inter'] text-xs text-[#8A8577]">{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8">
        <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2"><Package size={20} className="text-[#C9A227]" /> Products</span>
          <span className="font-['Inter'] text-sm text-[#8A8577] font-normal">{myProducts.length} total</span>
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
          {myProducts.length === 0 && <p className="font-['Inter'] text-sm text-[#8A8577] col-span-full text-center py-8">No products yet.</p>}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#C9A227]" /> Orders
          </h2>
          <span className="font-['Inter'] text-sm text-[#8A8577]">{sellerOrders.length} total</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-colors ${
              statusFilter === "All" ? "bg-[#1C1B1A] text-[#FAF7F0]" : "bg-[#FAF7F0] text-[#8A8577] hover:text-[#1C1B1A]"
            }`}
          >
            All ({sellerOrders.length})
          </button>
          {STATUSES.map((s) => {
            const count = sellerStats ? sellerStats[s.toLowerCase()] : 0;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-colors border ${
                  statusFilter === s ? `${STATUS_TAB[s]} border-2` : "border-[#1C1B1A]/10 text-[#8A8577] hover:text-[#1C1B1A]"
                }`}
              >
                {s} ({count})
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
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
              {filteredOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-10 text-[#8A8577]">No {statusFilter === "All" ? "" : statusFilter.toLowerCase()} orders.</td></tr>
              ) : (
                filteredOrders.map((order) => (
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
                      <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${STATUS_BG[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="py-4 px-2 text-[#8A8577] text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={statusUpdating === order._id}
                        className="bg-[#FAF7F0] border border-[#1C1B1A]/20 rounded-lg px-2 py-1.5 text-xs font-['Inter'] text-[#1C1B1A] focus:outline-none focus:border-[#C9A227]"
                      >
                        {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
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
