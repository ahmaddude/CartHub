import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api/auth"
  : "/api/auth";

export const useOrderStore = create((set) => ({
  orders: [],
  sellerOrders: [],
  sellerStats: null,

  createOrder: async () => {
    try {
      const res = await axios.post(`${API_URL}/create-order`, {}, { withCredentials: true });
      console.log("Order created:", res.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  },

  getOrders: async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`, { withCredentials: true });
      set({ orders: res.data.orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  getSellerOrders: async () => {
    try {
      const res = await axios.get(`${API_URL}/seller-orders`, { withCredentials: true });
      set({ sellerOrders: res.data.orders, sellerStats: res.data.stats });
    } catch (error) {
      console.error("Error fetching seller orders:", error);
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await axios.put(`${API_URL}/update-order-status/${orderId}`, { status }, { withCredentials: true });
      set((state) => ({
        sellerOrders: state.sellerOrders.map((o) =>
          o._id === orderId ? { ...o, status } : o
        ),
        sellerStats: state.sellerStats ? {
          ...state.sellerStats,
          [status.toLowerCase()]: (state.sellerStats[status.toLowerCase()] || 0) + 1,
          [state.sellerOrders.find(o => o._id === orderId)?.status.toLowerCase()]: 
            Math.max(0, (state.sellerStats[state.sellerOrders.find(o => o._id === orderId)?.status.toLowerCase()] || 1) - 1)
        } : null
      }));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  },
}));
