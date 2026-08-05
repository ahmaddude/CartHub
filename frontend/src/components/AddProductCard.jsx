import { useEffect, useState } from 'react'
import { useProductsStore } from '../store/productsStore';
import { toast } from 'react-hot-toast';
import { useCategoryStore } from '../store/categoryStore';
import { Camera, Loader, Upload } from 'lucide-react';

const AddProductCard = () => {
  const { createProduct } = useProductsStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const { fetchCategories, categories } = useCategoryStore()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setprice] = useState("")
  const [stock, setStock] = useState("")
  const [categoryID, setCategoryID] = useState("")

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (!categories || categories.length === 0) return (
    <div className="w-full min-h-[40vh] flex items-center justify-center">
      <Loader className="animate-spin text-[#C9A227]" />
    </div>
  );

  const handleaddP = async (e) => {
    e.preventDefault();
    try {
      await createProduct(name, description, price, selectedImg, stock, categoryID);
      toast.success("Product created successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-6">
      <form onSubmit={handleaddP} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] placeholder-[#8A8577] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm" />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] placeholder-[#8A8577] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm" />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] placeholder-[#8A8577] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm" />

        <div className="flex flex-col items-center gap-4 py-4 border-2 border-dashed border-[#1C1B1A]/20 rounded-xl">
          <img
            src={selectedImg || "/placeholder.png"}
            alt="Product"
            className="size-32 object-cover rounded-xl"
          />
          <label htmlFor="product-image-upload" className="cursor-pointer flex items-center gap-2 text-[#C9A227] hover:text-[#1C1B1A] transition-colors font-['Inter'] text-sm">
            <Upload size={16} /> Upload Image
            <input type="file" id="product-image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] placeholder-[#8A8577] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm" />
        <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm">
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>

        <button type="submit"
          className="w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProductCard