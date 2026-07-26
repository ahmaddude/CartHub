import { create } from 'zustand';
import axios from 'axios';
const API_URL = import.meta.env.MODE==="development"?'http://localhost:5000/api/auth': '/api/auth';

export const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      set({ categories: res.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  createCategory:async(name,description)=>{
    try {
      const res=await axios.post(`${API_URL}/create-category`,{name,description});
      console.log("category created",res)
    } catch (error) {
      console.error(error)
    
  }
  }
}));
