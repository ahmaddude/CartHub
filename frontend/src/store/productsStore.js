import { create } from 'zustand';
import axios from 'axios';
const API_URL =import.meta.env.MODE==="development"? 'http://localhost:5000/api/auth': '/api/auth'; 


export const useProductsStore = create((set) => ({
  allProducts: [],
  searchResults:[],
  categoryProducts:[],
  product:null,
  setProducts: (products) =>
    set({ allProducts: products}),
  setProduct: (product) =>
    set({ product }),


  fetchProducts: async () => {
   try {
     const res = await axios.get(`${API_URL}/products`);
     set({allProducts: res.data.products});
   } catch (error) {
     console.error(error);
    
   }
  },

  getCP:async(categoryID)=>{
    try {
      const res = await axios.get(`${API_URL}/products`);
      const cres= res.data.products.filter(product=>product.categoryID._id===categoryID)
      set({categoryProducts:cres})
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  },

  searchProducts: async (searchTerm) => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const filteredProducts = res.data.products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      if(filteredProducts.length===0){
        console.log("No products found");

      }else{
        console.log("Products found");
      
      set({ searchResults: filteredProducts });}
    } catch (error) {
      console.error(error);
    }
  },

  getProductById:async(id)=>{
try {
  const res=await axios.get(`${API_URL}/product/${id}`);
  set({product:res.data.product})
} catch (error) {
  console.error(error);
}
  },

  createProduct: async (name, description, price, image, stock, categoryID) => {
  try {
    const res = await axios.post(
      `${API_URL}/create-product`,
      { name, description, price, image, stock, categoryID },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
},


  updateProduct:async(id,name,price,description,image,stock,categoryID)=>{
    try {
      const res=await axios.put(`${API_URL}/update-product/${id}`,{name,price,description,image,stock,categoryID},{withCredentials:true});
      console.log("product updated",res.data)
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct:async(productID)=>{
   
    try {
      const res= await axios.delete(`${API_URL}/delete-product/${productID}`,{withCredentials:true});
      console.log("product deleted" ,res.data)
    } catch (error) {
      console.error(error)
    }
  }

  }
))
