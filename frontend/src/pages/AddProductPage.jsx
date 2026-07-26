import { useState, useEffect } from 'react';
import { useProductsStore } from '../store/productsStore';
import { useCategoryStore } from '../store/categoryStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import {  DollarSign, Package, Image, Edit3 } from 'lucide-react';

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
      navigate('/'); // redirect to home or product list
    } catch (err) {
      console.error(err);
      toast.error('Failed to create product');
    }
  };

  return (
      <div className="w-full max-w-2xl bg-gray-900 text-white rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Edit3}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Package}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            icon={DollarSign}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            icon={Package}
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <Input
            icon={Image}
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-gray-300">Category</label>
            <select
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Add Product
          </button>
        </form>
      </div>
  );
};

export default AddProductPage;
