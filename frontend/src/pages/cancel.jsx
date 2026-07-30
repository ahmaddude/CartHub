import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Cancel() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full mx-auto flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-['Fraunces'] text-4xl md:text-5xl font-medium text-[#1C1B1A] mb-4">
              Payment Cancelled
            </h1>
            <p className="font-['Inter'] text-[#8A8577]">No worries, your cart is still saved!</p>
          </div>

          <div className="bg-[#FAF7F0] rounded-2xl p-6 border border-[#1C1B1A]/10">
            <p className="font-['Inter'] text-sm text-[#8A8577]">
              Your items are still in your cart. You can checkout again anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => window.location.href = '/cart'}
              className="flex-1 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] font-['Inter'] font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Return to Cart
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-[#FAF7F0] hover:bg-[#1C1B1A] text-[#1C1B1A] hover:text-[#FAF7F0] font-['Inter'] font-semibold py-4 px-8 rounded-full border border-[#1C1B1A]/20 transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}