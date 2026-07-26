import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { Loader } from "lucide-react";
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
    return <Loader className="size-10 animate-spin" />;
  }

  const handleAddToCart = async () => {
    try {
      if(user && user.isVerified) {
        await addToCart(product._id, quantity);
        toast.success("Product added to cart");
      }
      else{
        toast.error("Please login before adding products to cart");
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full bg-gray-800 rounded-2xl shadow-lg p-8">
      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl max-h-[500px] object-cover transform transition duration-300 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl text-white font-bold mb-4">{product.name}</h1>
          <p className="text-yellow-600 text-2xl font-semibold mb-6">${Number(product.price).toFixed(2)}</p>
          <p className="text-gray-300 mb-8">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-white font-bold">Quantity</p>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-xl font-semibold text-white">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:opacity-90 transition"
        >
          Add to Cart
        </button>

        {/* Seller-only delete button */}
        {user ? (
          user.role === "seller" && product.sellerID === user._id && (
            <button
              onClick={async () => {
                await deleteProduct(product._id);
                navigate("/");
              }}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
            >
              Delete Product
            </button>
          )
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}
