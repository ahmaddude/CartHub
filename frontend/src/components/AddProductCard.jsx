import  { useEffect, useState } from 'react'
import { useProductsStore } from '../store/productsStore';
import {toast} from 'react-hot-toast';
import { useCategoryStore } from '../store/categoryStore';
import {motion} from 'framer-motion'
import {Camera, Loader} from 'lucide-react';

const AddProductCard = () => {
       const {createProduct} = useProductsStore();
       const [selectedImg,setSelectedImg]=useState(null);
       const {fetchCategories,categories} =useCategoryStore()
       const [name,setName]=useState("")
       const [description,setDescription]=useState("")
       const [price,setprice]=useState("")
       const [stock,setStock]=useState("")
       const [categoryID,setCategoryID]=useState("")


         useEffect(() => {
    
    fetchCategories();
    
  }, [fetchCategories]);
if(!categories||categories.length===0)return <Loader className="animate-spin" />


const handleaddP=async(e)=>{
  e.preventDefault();
try {
  await createProduct(name,description,price,selectedImg,stock,categoryID);
  toast.success("Product created successfully");
  window.location.reload(); 
  

} catch (error) {
  toast.error("Failed to create product ");
  console.error("Error creating product:", error);
}
}

 const handleImageUpload=async(e)=>{
    const file=e.target.files[0];
    if(!file)return;

    const reader=new FileReader();

    reader.readAsDataURL(file);

    reader.onload=async()=>{
      const base64Image=reader.result;
      setSelectedImg(base64Image);
       
  }}

  return (
    <div>
      <form onSubmit={handleaddP} className="mt-6 space-y-4">
  <div>
    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className=" p-2 rounded" />
  <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className=" p-2 rounded" />
  <input type="number" placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)} className=" p-2 rounded" />
  </div>
 <div> <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={ selectedImg || "/placeholder.png"}
              alt="Add Product image here"
              className="size-32  object-cover border-2 "
            />
            <label
              htmlFor="avatar-upload"
              
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                
              />
            </label>
          </div>
          
        </div>
  <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className=" p-2 rounded" />
  <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)} className="w-full p-2 rounded">
    <option value="">Select Category</option>
    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
  </select></div>

  <motion.button
    type="submit"
    className=" py-3 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    
  >
    Add Product
  </motion.button>
</form>

      
      
    </div>
  )
}

export default AddProductCard
