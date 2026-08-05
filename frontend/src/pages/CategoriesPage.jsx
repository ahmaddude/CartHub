import { useEffect, useState } from "react";
import { useProductsStore } from "../store/productsStore";
import { useCategoryStore } from "../store/categoryStore";
import { Loader, Grid3X3, List, X } from "lucide-react";
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
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-[#C9A227]" />
      </div>
    );

  const displayedProducts = selectedCategory ? categoryProducts : allProducts;

  const handleCategoryClick = (catID) => {
    setSelectedCategory(catID);
    setShowMobileCategories(false);
    if (catID) {
      getCP(catID);
    }
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategory) return "All Products";
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : "All Products";
  };

  const getCategoryCount = (catId) => {
    return allProducts.filter(p => p.categoryID?._id === catId).length;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] w-full mx-auto">
      <div className="lg:hidden bg-white border-b border-[#1C1B1A]/10 px-4 py-3">
        <button
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          className="flex items-center gap-2 text-[#1C1B1A] hover:text-[#C9A227] transition-colors font-['Inter'] text-sm"
        >
          {showMobileCategories ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
          <span className="font-medium">{getSelectedCategoryName()}</span>
        </button>
      </div>

      {showMobileCategories && (
        <div className="lg:hidden bg-white border-b border-[#1C1B1A]/10">
          <div className="p-4 space-y-2">
            <button
              className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-['Inter'] text-sm ${
                !selectedCategory ? 'bg-[#1C1B1A] text-[#FAF7F0]' : 'bg-[#FAF7F0] hover:bg-[#1C1B1A]/10 text-[#1C1B1A]'
              }`}
              onClick={() => handleCategoryClick(null)}
            >
              <div className="flex items-center gap-3">
                <Grid3X3 className="w-4 h-4" />
                <span className="font-medium">All Products</span>
              </div>
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-['Inter'] text-sm ${
                  selectedCategory === cat._id ? 'bg-[#1C1B1A] text-[#FAF7F0]' : 'bg-[#FAF7F0] hover:bg-[#1C1B1A]/10 text-[#1C1B1A]'
                }`}
                onClick={() => handleCategoryClick(cat._id)}
              >
                <div className="flex items-center gap-3">
                  <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="font-medium">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex">
        <div className="hidden lg:block w-80 bg-white min-h-screen border-r border-[#1C1B1A]/10">
          <div className="p-6">
            <h2 className="font-['Fraunces'] text-2xl font-medium text-[#1C1B1A] mb-6">Categories</h2>
            <div className="space-y-3">
              <button
                className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-[#1C1B1A] text-[#FAF7F0]'
                    : 'bg-[#FAF7F0] hover:bg-[#1C1B1A]/10 text-[#1C1B1A]'
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C9A227]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Grid3X3 className="w-6 h-6 text-[#C9A227]" />
                  </div>
                  <div>
                    <span className="font-['Inter'] font-semibold">All Products</span>
                    <p className="font-['Inter'] text-sm opacity-70">{allProducts.length} items</p>
                  </div>
                </div>
              </button>
              
              {categories.map(cat => (
                <button
                  key={cat._id}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 ${
                    selectedCategory === cat._id
                      ? 'bg-[#1C1B1A] text-[#FAF7F0]'
                      : 'bg-[#FAF7F0] hover:bg-[#1C1B1A]/10 text-[#1C1B1A]'
                  }`}
                  onClick={() => handleCategoryClick(cat._id)}
                >
                  <div className="flex items-center gap-4">
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <span className="font-['Inter'] font-semibold">{cat.name}</span>
                      <p className="font-['Inter'] text-sm opacity-70">
                        {getCategoryCount(cat._id)} items
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="font-['Fraunces'] text-3xl font-medium text-[#1C1B1A]">{getSelectedCategoryName()}</h1>
            <p className="font-['Inter'] text-sm text-[#8A8577] mt-1">{displayedProducts.length} products found</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map(product => (
              <FlipCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;