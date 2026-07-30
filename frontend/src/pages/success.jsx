import { useEffect, useState } from "react";
import { useOrderStore } from "../store/orderStore";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Success() {
  const { createOrder } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const finalizeOrder = async () => {
      try {
        await createOrder();
        setOrderComplete(true);
      } catch (error) {
        console.error("Error finalizing order:", error);
      } finally {
        setIsProcessing(false);
      }
    };
    finalizeOrder();
  }, [createOrder]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-8 max-w-md w-full text-center">
          <div className="animate-spin w-12 h-12 border-2 border-[#C9A227] border-t-[#1C1B1A] rounded-full mx-auto mb-4"></div>
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#1C1B1A] mb-2">Processing your order...</h2>
          <p className="font-['Inter'] text-sm text-[#8A8577]">Please wait while we finalize your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg border border-[#1C1B1A]/10 p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#C9A227]/10 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-[#C9A227]" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-['Fraunces'] text-4xl md:text-5xl font-medium text-[#1C1B1A] mb-4">
              Payment Successful!
            </h1>
            <p className="font-['Inter'] text-[#8A8577]">Thank you for your order</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] font-['Inter'] font-semibold py-4 px-8 rounded-full transition-colors duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = '/order'}
              className="flex-1 bg-[#FAF7F0] hover:bg-[#1C1B1A] text-[#1C1B1A] hover:text-[#FAF7F0] font-['Inter'] font-semibold py-4 px-8 rounded-full border border-[#1C1B1A]/20 transition-colors duration-300"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}