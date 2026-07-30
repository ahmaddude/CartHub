import { useOrderStore } from "../store/orderStore";
import { useEffect } from "react";
import { Package, CreditCard, Calendar, Clock, ShoppingBag } from "lucide-react";

const OrderPage = () => {
  const { getOrders, orders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center font-['Inter'] text-[#8A8577] mt-10">
        <ShoppingBag className="mx-auto mb-4 text-[#C9A227]" size={48} />
        <p>You don't have any orders yet</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h1 className="font-['Fraunces'] text-4xl font-medium text-[#1C1B1A] text-center mb-10">Your Orders</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-['Inter'] text-sm font-semibold text-[#C9A227]">
                <Package className="w-5 h-5" />
                <span>Order #{order._id.slice(-6)}</span>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-['Inter'] font-bold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mb-4 space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between font-['Inter'] text-sm text-[#8A8577]">
                  <span>
                    {item?.product?.name}{" "}
                    <span className="text-[#1C1B1A]/60">x{item.quantity}</span>
                  </span>
                  <span>${(item.product?.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1C1B1A]/10 pt-3 space-y-2">
              <div className="flex items-center justify-between font-['Inter'] text-sm">
                <span className="flex items-center gap-2 text-[#8A8577]">
                  <CreditCard className="w-4 h-4 text-[#C9A227]" />
                  Total
                </span>
                <span className="font-semibold text-[#1C1B1A]">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 font-['Inter'] text-xs text-[#8A8577]">
                <Calendar className="w-4 h-4" />
                {new Date(order.createdAt).toLocaleDateString()}
                <Clock className="w-4 h-4 ml-3" />
                {new Date(order.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;