import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";

const CartPage = () => {
  const { cartProducts, getCartProducts, updateQuantity, removeFromCart, checkout,   } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  if (!cartProducts || cartProducts.length === 0) {
    return <div className="text-black text-center mt-10">Your cart is empty</div>;
  }

  const totalCount = cartProducts.reduce((acc, p) => acc + p.quantity, 0);
  const totalPriceOfItems = cartProducts.reduce((acc, p) => acc + p.quantity * p.product.price, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // 1️⃣ Create order in backend
      

      
      const redirectUrl = await checkout();
      if (redirectUrl) window.location.href = redirectUrl;
      
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#F4F7FA] min-h-screen p-10">
      <div className="text-center mb-5">
        <h1 className="font-semibold pt-8 pb-6 text-4xl">Your cart</h1>
        <p className="text-base pb-7">{totalCount} items in your cart</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-[775px] rounded-xlg">
          <table className="max-w-[775px] w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartProducts.map((p) => (
                <tr key={p.product._id} className="border-b border-gray-200">
                  <td className="px-6 py-4 w-7/12">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded"
                          src={p.product.image}
                          alt={p.product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm text-gray-900 font-semibold overflow-hidden overflow-ellipsis">
                          {p.product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-semibold">
                    ${Number(p.product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-semibold">
                    <div className="flex items-center">
                      <button
                        className="mr-2 text-black bg-slate-200 rounded-full h-5 w-[20px]"
                        onClick={() => updateQuantity(p.product._id, "decrement")}
                      >
                        -
                      </button>
                      {p.quantity}
                      <button
                        className="ml-2 text-black w-[20px] h-5 rounded-full bg-[#e2e8f0]"
                        onClick={() => updateQuantity(p.product._id, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-semibold">
                    ${(p.product.price * p.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      className="text-gray-500"
                      onClick={() => removeFromCart(p.product._id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-10">
            <button
              className="px-6 py-3 font-bold text-gray-900 bg-white rounded-lg"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>

            <div className="flex flex-col px-5 py-4 bg-white max-w-[350px] rounded-lg">
              <div className="flex justify-between text-base font-bold">
                <div>Total Items:</div>
                <div>{totalCount}</div>
              </div>
              <div className="flex justify-between text-base font-bold mt-2">
                <div>Total Price:</div>
                <div>${totalPriceOfItems.toFixed(2)}</div>
              </div>
              <button
                className="mt-5 px-8 py-3 text-white bg-indigo-600 rounded-lg font-semibold"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Checking out..." : "Proceed to checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
