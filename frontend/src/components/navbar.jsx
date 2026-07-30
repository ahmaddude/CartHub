import {useState,useEffect} from "react";
import { useAuthStore } from '../store/authStore';
import { useProductsStore } from '../store/productsStore'; 
import {  useNavigate } from "react-router-dom";
import {  Search, X, Menu, ShoppingBag } from 'lucide-react';

function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts } = useProductsStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };
   const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value.trim();
      if (term !== '') {
        searchProducts(term);
        navigate('/search');
      }
    }
  };
  const {isAuthenticated,logout}=useAuthStore();
  const onLogout=async()=>{
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    console.log(error)
  }
}

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#1C1B1A]/10 px-4 py-3 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <button onClick={()=>navigate('/')} className="font-['Fraunces'] text-2xl font-medium text-[#1C1B1A] tracking-tight">
          Store
        </button>

        <div className="hidden lg:flex items-center gap-8">
          <div className="relative flex items-center gap-2 text-[#8A8577] border border-[#1C1B1A]/20 rounded-full px-4 py-1.5 focus-within:border-[#C9A227] transition-colors">
            <Search size={16} />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm text-[#1C1B1A] placeholder:text-[#8A8577] w-48"
            />
          </div>

          <div className="flex items-center gap-6">
            {isAuthenticated && <>
              <button onClick={() => navigate('/cart')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                <ShoppingBag size={16} /> Cart
              </button>
              <button onClick={() => navigate('/order')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors">Orders</button>
            </>}
            <button onClick={()=>navigate('/categories')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors">Categories</button>
            {isAuthenticated && user && user.role==="seller" &&
              <button onClick={()=>navigate('/add-Product')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors">Add Product</button>
            }
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate('/profile')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors">Account</button>
              <button onClick={onLogout} className="font-['Inter'] text-sm bg-[#1C1B1A] text-[#FAF7F0] px-4 py-1.5 rounded-full hover:bg-[#C9A227] transition-colors">Log Out</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] transition-colors">Log In</button>
              <button onClick={() => navigate('/signup')} className="font-['Inter'] text-sm bg-[#1C1B1A] text-[#FAF7F0] px-4 py-1.5 rounded-full hover:bg-[#C9A227] transition-colors">Sign Up</button>
            </>
          )}
        </div>

        <button className="lg:hidden text-[#1C1B1A]" onClick={() => setOpenNav(!openNav)}>
          {openNav ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {openNav && (
        <div className="lg:hidden mt-4 pb-4 space-y-4 border-t border-[#1C1B1A]/10 pt-4">
          <div className="relative flex items-center gap-2 text-[#8A8577] border border-[#1C1B1A]/20 rounded-full px-4 py-2">
            <Search size={16} />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm text-[#1C1B1A] placeholder:text-[#8A8577] w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {isAuthenticated && <>
              <button onClick={() => navigate('/cart')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] py-1">Cart</button>
              <button onClick={() => navigate('/order')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] py-1">Orders</button>
            </>}
            <button onClick={()=>navigate('/categories')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] py-1">Categories</button>
            {isAuthenticated && user && user.role==="seller" &&
              <button onClick={()=>navigate('/add-Product')} className="font-['Inter'] text-sm text-[#1C1B1A] hover:text-[#C9A227] py-1">Add Product</button>
            }
          </div>
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate('/profile')} className="font-['Inter'] text-sm border border-[#1C1B1A]/20 text-[#1C1B1A] px-4 py-1.5 rounded-full">Account</button>
                <button onClick={onLogout} className="font-['Inter'] text-sm bg-[#1C1B1A] text-[#FAF7F0] px-4 py-1.5 rounded-full">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="font-['Inter'] text-sm border border-[#1C1B1A]/20 text-[#1C1B1A] px-4 py-1.5 rounded-full">Log In</button>
                <button onClick={() => navigate('/signup')} className="font-['Inter'] text-sm bg-[#1C1B1A] text-[#FAF7F0] px-4 py-1.5 rounded-full">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default StickyNavbar