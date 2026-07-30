import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { ShoppingBag, ArrowRight, Minus, Plus, X } from "lucide-react";

const CartPage = () => {
  const { cartProducts, getCartProducts, updateQuantity, removeFromCart, checkout } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="text-center font-['Inter'] text-[#8A8577] mt-10">
        <ShoppingBag className="mx-auto mb-4 text-[#C9A227]" size={48} />
        <p>Your cart is empty</p>
      </div>
    );
  }

  const totalCount = cartProducts.reduce((acc, p) => acc + p.quantity, 0);
  const totalPriceOfItems = cartProducts.reduce((acc, p) => acc + p.quantity * p.product.price, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const redirectUrl = await checkout();
      if (redirectUrl) window.location.href = redirectUrl;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-['Fraunces'] text-4xl font-medium text-[#1C1B1A]">Your Cart</h1>
        <p className="font-['Inter'] text-[#8A8577] mt-2">{totalCount} {totalCount === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 overflow-hidden">
        <div className="divide-y divide-[#1C1B1A]/10">
          {cartProducts.map((p) => (
            <div key={p.product._id} className="flex items-center gap-6 p-6">
              <img
                src={p.product.image}
                alt={p.product.name}
                className="w-20 h-20 rounded-xl object-cover bg-[#FAF7F0]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-['Inter'] font-semibold text-[#1C1B1A] truncate">{p.product.name}</p>
                <p className="font-['Inter'] text-[#C9A227] font-medium mt-1">${Number(p.product.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(p.product._id, "decrement")}
                  className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center hover:bg-[#1C1B1A] hover:text-[#FAF7F0] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-['Inter'] font-semibold text-[#1C1B1A] w-6 text-center">{p.quantity}</span>
                <button
                  onClick={() => updateQuantity(p.product._id, "increment")}
                  className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center hover:bg-[#1C1B1A] hover:text-[#FAF7F0] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="font-['Inter'] font-semibold text-[#1C1B1A] w-20 text-right">
                ${(p.product.price * p.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(p.product._id)}
                className="text-[#8A8577] hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[#FAF7F0] px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => window.location.href = "/"}
            className="font-['Inter'] text-sm text-[#8A8577] hover:text-[#1C1B1A] transition-colors"
          >
            Continue Shopping
          </button>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-['Inter'] text-sm text-[#8A8577]">Total</p>
              <p className="font-['Inter'] font-bold text-xl text-[#1C1B1A]">${totalPriceOfItems.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="group bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] px-8 py-3 rounded-full font-['Inter'] font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              {isCheckingOut ? "Processing..." : <>Checkout <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;