import { useState, useEffect } from 'react';
import { useProductsStore } from '../store/productsStore';
import { useCategoryStore } from '../store/categoryStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import { DollarSign, Package, Image, Edit3, ArrowRight } from 'lucide-react';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { createProduct } = useProductsStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [categoryID, setCategoryID] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !stock || !categoryID) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createProduct(name, description, price, image, stock, categoryID);
      toast.success('Product created!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to create product');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-8 space-y-6">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">Add New Product</h1>
        <p className="font-['Inter'] text-sm text-[#8A8577] mt-2">List a new item for sale</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input icon={Edit3} placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input icon={Package} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input icon={DollarSign} type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input icon={Package} type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <Input icon={Image} placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        
        <div>
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-[#FAF7F0] border border-[#1C1B1A]/20 text-[#1C1B1A] focus:border-[#C9A227] focus:outline-none font-['Inter'] text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="group w-full py-3 bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] rounded-full font-['Inter'] font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Add Product <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;