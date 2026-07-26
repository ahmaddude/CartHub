import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { useCategoryStore } from "../store/categoryStore";
import { Loader, Grid3X3, List } from "lucide-react";
import FlipCard from "../components/productCard";

const CategoriesPage = () => {
  const { fetchProducts, allProducts, categoryProducts, getCP } = useProductsStore();
  const { fetchCategories, categories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  if (!allProducts || allProducts.length === 0)
    return <Loader className="animate-spin text-white mx-auto mt-10" />;

  const displayedProducts = selectedCategory ? categoryProducts : allProducts;

  const handleCategoryClick = (catID) => {
    setSelectedCategory(catID);
    setShowMobileCategories(false); // Close mobile menu after selection
    if (catID) {
      getCP(catID);
    }
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return "All Products";
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : "All Products";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Category Toggle */}
      <div className="lg:hidden bg-gray-800 p-4 border-b border-gray-700">
        <button
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
        >
          <List className="w-5 h-5" />
          <span className="font-medium">{getSelectedCategoryName()}</span>
        </button>
      </div>

      {/* Mobile Categories Dropdown */}
      {showMobileCategories && (
        <div className="lg:hidden bg-gray-800 border-b border-gray-700">
          <div className="p-4 space-y-2">
            <button
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                !selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
              onClick={() => handleCategoryClick(null)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4" />
                </div>
                <span className="font-medium">All Products</span>
              </div>
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === cat._id ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
                onClick={() => handleCategoryClick(cat._id)}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={cat.image || '/placeholder-category.png'} 
                    alt={cat.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar Categories */}
        <div className="hidden lg:block w-80 bg-gray-800 min-h-screen border-r border-gray-700">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Categories</h2>
            <div className="space-y-3">
              <button
                className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 ${
                  !selectedCategory 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:scale-102'
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Grid3X3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg">All Products</span>
                    <p className="text-sm opacity-75">{allProducts.length} items</p>
                  </div>
                </div>
              </button>
              
              {categories.map(cat => (
                <button
                  key={cat._id}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 ${
                    selectedCategory === cat._id 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200 hover:scale-102'
                  }`}
                  onClick={() => handleCategoryClick(cat._id)}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={cat.image || '/placeholder-category.png'} 
                      alt={cat.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-gray-600"
                    />
                    <div>
                      <span className="font-semibold text-lg">{cat.name}</span>
                      <p className="text-sm opacity-75">
                        {categoryProducts && selectedCategory === cat._id ? categoryProducts.length : '...'} items
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{getSelectedCategoryName()}</h1>
            <p className="text-gray-400">{displayedProducts.length} products found</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {displayedProducts.map(product => (
              <FlipCard 
                key={product._id} 
                product={product}
                frontContent={
                  <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain mb-4"
                    />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center">{product.name}</h2>
                    <p className="text-gray-600 text-lg font-semibold">${Number(product.price).toFixed(2)}</p>
                  </div>
                }
                backContent={
                  <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">Product Details</h3>
                    <p className="text-gray-600 text-center mb-4 text-sm flex-1 overflow-y-auto">
                      {product.description}
                    </p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full">
                      Add to Cart
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;