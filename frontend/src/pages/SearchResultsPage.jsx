import { useProductsStore } from '../store/productsStore';
import FlipCard from '../components/productCard';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchResultsPage = () => {
  const { searchProducts, searchResults } = useProductsStore();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="text-center font-['Inter'] text-[#8A8577] mt-10">
        <Search className="mx-auto mb-4 text-[#C9A227]" size={48} />
        <p>No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <p className="font-['Inter'] text-sm text-[#8A8577] mb-8">
        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<strong className="text-[#1C1B1A]">{query}</strong>"
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((product) => (
          <FlipCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;