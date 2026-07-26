import { useEffect } from 'react';
import { useProductsStore } from '../store/productsStore';
import { Loader } from 'lucide-react';
import AddProductCard from '../components/AddProductCard'
import FlipCard from '../components/productCard'; 
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
   const { fetchProducts,allProducts,searchProducts, } = useProductsStore();   
const navigate = useNavigate();
   

  useEffect(() => {
    fetchProducts();
    
  }, [fetchProducts]);
if(!allProducts||allProducts.length===0)return <Loader className="animate-spin" />

 
  return (
    <div className='pb-25' >
    
       {/* Best Seller Section */}
<div className="p-5 jp-4 bg-gradient-to-r from-gray-600 via-gray-300  rounded-xl shadow-2xl flex flex-col md:flex-row items-center  relative">
  {/* Ribbon Badge */}
  

  {/* Product Image */}
  <img
    src={allProducts[allProducts.length-1]?.image}
    alt={allProducts[allProducts.length-1]?.name}
    className="w-150 h-100 object-contain  rounded-xl  md:mb-0 "
  />

  {/* Product Info */}
  <div className="text-white max-w-md">
    <h2 className="text-6xl font-bold mb-2">Best Seller</h2>
    <h3 className="text-3xl font-semibold mb-2">{allProducts[allProducts.length-1]?.name}</h3>
    <p className="mb-4">{allProducts[allProducts.length-1]?.description}</p>
    <p className="text-xl font-bold mb-4">${Number(allProducts[allProducts.length-1]?.price).toFixed(2)}</p>
    <button onClick={() => navigate(`/product/${allProducts[allProducts.length-1]?._id}`)}
 className="bg-white text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
      Check it out
    </button>
  </div>
</div>

      
      {/* products */}
      
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {allProducts.map((product) => (
    <FlipCard key={product._id} product={product} />
  ))}
</div>
   
     
    </div>
  )
  
}

export default HomePage
