import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FlipCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
const navigate = useNavigate();

  return (
    <div
      className="relative w-[300px] h-[400px] cursor-pointer [perspective:1000px] m-2"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-48 h-48 object-contain mb-4"
          />
          <h2 className="text-xl font-bold">{product?.name}</h2>
          <p className="text-gray-600">${Number(product?.price).toFixed(2)}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <p className="text-gray-600 text-center mb-4">{product?.description}</p>
          <button onClick={(e)=>{e.stopPropagation();navigate(`/product/${product?._id}`)}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Check it out
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
