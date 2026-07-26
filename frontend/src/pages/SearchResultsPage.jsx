import { useProductsStore } from '../store/productsStore';
import FlipCard from '../components/productCard'; 
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


    const SearchResultsPage = () => {
        const { searchProducts,searchResults } = useProductsStore();
        const [searchParams] = useSearchParams();
        const query = searchParams.get('q') || '';

        useEffect(() => {
            if(query) {
                searchProducts(query);
            }
        },[query, searchProducts])


            return (
                <div className="p-4 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
                {searchResults.map((product) => (
                <FlipCard key={product._id} product={product} />
                ))}
                </div>
            )
        }
        export default SearchResultsPage;