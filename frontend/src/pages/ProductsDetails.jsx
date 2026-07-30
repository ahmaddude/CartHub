import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { Loader, ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const { product, getProductById, deleteProduct } = useProductsStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  if (!product) {
    return <Loader className="size-10 animate-spin text-[#C9A227]" />;
  }

  const handleAddToCart = async () => {
    try {
      if (user && user.isVerified) {
        await addToCart(product._id, quantity);
        toast.success("Product added to cart");
      } else {
        toast.error("Please login before adding products to cart");
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full mx-auto px-4">
      <div className="flex justify-center items-center">
        <div className="relative">
          <div className="absolute -inset-3 border border-[#C9A227]/30 rounded-2xl -rotate-2" />
          <img
            src={product.image}
            alt={product.name}
            className="relative rounded-xl max-h-[500px] object-cover bg-white shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#C9A227] font-['Inter'] text-xs tracking-[0.25em] uppercase">
            <span>Product Details</span>
          </div>
          <h1 className="font-['Fraunces'] text-4xl font-medium text-[#1C1B1A] mb-4">{product.name}</h1>
          <p className="font-['Fraunces'] text-2xl text-[#C9A227] font-medium mb-6">${Number(product.price).toFixed(2)}</p>
          <p className="font-['Inter'] text-[#8A8577] leading-relaxed mb-8">{product.description}</p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="font-['Inter'] text-sm font-semibold text-[#1C1B1A]">Quantity</span>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full bg-[#FAF7F0] flex items-center justify-center hover:bg-[#1C1B1A] hover:text-[#FAF7F0] transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-['Inter'] text-xl font-semibold text-[#1C1B1A] w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 rounded-full bg-[#FAF7F0] flex items-center justify-center hover:bg-[#1C1B1A] hover:text-[#FAF7F0] transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="group bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] font-['Inter'] font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Add to Cart <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>

        {user && user.role === "seller" && product.sellerID === user._id && (
          <button
            onClick={async () => {
              await deleteProduct(product._id);
              navigate("/");
            }}
            className="mt-4 font-['Inter'] text-sm text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} /> Delete Product
          </button>
        )}
      </div>
    </div>
  );
}