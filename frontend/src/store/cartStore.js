import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

export const useCartStore = create((set, get) => ({
  cart: null,
  cartProducts: [],
  url: null,

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        `${API_URL}/add-to-cart`,
        { productId, quantity },
        { withCredentials: true }
      );
      set({ cart: res.data.cart });
    } catch (err) {
      console.error(err);
    }
  },

  getCartProducts: async () => {
    try {
      const res = await axios.get(`${API_URL}/view-cart`, { withCredentials: true });
      set({ cartProducts: res.data.cart?.items || [] });
    } catch (err) {
      console.error(err);
    }
  },

  updateQuantity: async (productId, operation) => {
    const item = get().cartProducts.find((p) => p.product._id === productId);
    const newQty = operation === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

    const cartProducts = get().cartProducts.map((p) => {
      if (p.product._id === productId) return { ...p, quantity: newQty };
      return p;
    });
    set({ cartProducts });

    try {
      await axios.put(
        `${API_URL}/update-cart/${productId}`,
        { quantity: newQty },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  },

  removeFromCart: async (productId) => {
    const cartProducts = get().cartProducts.filter((p) => p.product._id !== productId);
    set({ cartProducts });

    try {
      await axios.delete(
        `${API_URL}/delete-item/${productId}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  },

  checkout: async () => {
    try {
      const res = await axios.post(`${API_URL}/create-payment`, {}, { withCredentials: true });
      set({ url: res.data.url });
      return res.data.url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}));
