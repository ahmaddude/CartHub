import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing your order...</h2>
          <p className="text-gray-600">Please wait while we finalize your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>
        
        {/* Floating circles decoration */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-100 rounded-full opacity-20"></div>
        
        {/* Success animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          {/* Pulse rings */}
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-200 animate-ping opacity-20"></div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-300 animate-ping opacity-10" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Thank you for your order
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What happens next?</h3>
            <div className="space-y-3 text-left">
              
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">Your items will be prepared for shipping</p>
              </div>
              
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = '/order'}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105"
            >
              View Orders
            </button>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 pt-6 opacity-30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}