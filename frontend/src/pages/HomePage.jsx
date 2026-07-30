import { useEffect } from 'react';
import { useProductsStore } from '../store/productsStore';
import { Loader, ArrowRight, Sparkles } from 'lucide-react';
import AddProductCard from '../components/AddProductCard'
import FlipCard from '../components/productCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { fetchProducts, allProducts, searchProducts, } = useProductsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!allProducts || allProducts.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FAF7F0]">
        <Loader className="animate-spin text-[#C9A227]" size={32} />
        <p className="font-['Inter'] text-sm tracking-[0.2em] uppercase text-[#8A8577]">
          Loading the collection
        </p>
      </div>
    );

  const bestSeller = allProducts[allProducts.length - 1];

  return (
    <div className="pb-24 bg-[#FAF7F0] min-h-screen">

      {/* Best Seller Section */}
      <section className="relative overflow-hidden bg-[#1C1B1A] mx-8 mt-3 rounded-2xl md:mx-20 md:mt-6">
        {/* subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #FAF7F0 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="relative flex flex-col md:flex-row items-center gap-10 p-8 md:p-16">
          {/* Decorative background elements */}
          <div className="absolute top-6 right-6 w-72 h-72 border-2 border-[#C9A227]/20 rounded-full" />
          <div className="absolute -bottom-32 right-10 w-[28rem] h-[28rem] border-2 border-[#C9A227]/15 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#C9A227]/30 rounded-full" />
          <div className="absolute bottom-16 right-1/3 w-3 h-3 bg-[#C9A227]/25 rounded-full" />
          <div className="absolute top-24 right-[45%] w-2 h-2 bg-[#C9A227]/35 rounded-full" />
          <div className="absolute -left-4 top-1/2 w-20 h-20 bg-[#C9A227]/10 rounded-full blur-xl" />
          <div className="absolute right-12 top-1/3 w-32 h-32 bg-[#C9A227]/8 rounded-full blur-2xl" />

          {/* Image with ticket-style price tag */}
          <div className="relative shrink-0">
            <div className="absolute -inset-3 border border-[#C9A227]/30 rounded-2xl -rotate-2" />
            <img
              src={bestSeller?.image}
              alt={bestSeller?.name}
              className="relative w-full max-w-sm h-80 object-contain rounded-xl bg-[#FAF7F0]/5"
            />
            <div className="absolute -bottom-4 -right-4 bg-[#C9A227] text-[#1C1B1A] px-4 py-2 rounded-lg shadow-lg rotate-3 font-['Inter'] font-semibold text-sm">
              ${Number(bestSeller?.price).toFixed(2)}
            </div>
          </div>

          {/* Copy */}
          <div className="max-w-md relative z-10">
            <div className="flex items-center gap-2 mb-4 text-[#C9A227]">
              <Sparkles size={16} />
              <span className="font-['Inter'] text-xs tracking-[0.25em] uppercase">
                Featured · No. 01
              </span>
            </div>
            <h2 className="font-['Fraunces'] text-5xl md:text-6xl font-medium text-[#FAF7F0] mb-4 leading-[1.05]">
              Best Seller
            </h2>
            <h3 className="font-['Fraunces'] text-2xl text-[#C9A227] mb-4">
              {bestSeller?.name}
            </h3>
            <p className="font-['Inter'] text-[#D8D4C8] mb-8 leading-relaxed">
              {bestSeller?.description}
            </p>
            <button
              onClick={() => navigate(`/product/${bestSeller?._id}`)}
              className="group inline-flex items-center gap-2 bg-[#FAF7F0] text-[#1C1B1A] font-['Inter'] font-semibold px-7 py-3 rounded-full hover:bg-[#C9A227] transition-colors duration-300"
            >
              Check it out
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-8 md:px-20 mt-32">
        <div className="flex items-end justify-between mb-8 border-b border-[#1C1B1A]/10 pb-4">
          <h2 className="font-['Fraunces'] text-3xl text-[#1C1B1A]">
            The Collection
          </h2>
          <span className="font-['Inter'] text-xs tracking-[0.2em] uppercase text-[#8A8577]">
            {allProducts.length} pieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {allProducts.map((product) => (
            <FlipCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage