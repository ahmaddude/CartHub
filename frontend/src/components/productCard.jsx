import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function FlipCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[400px] cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-4 flex flex-col items-center justify-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-48 h-48 object-contain mb-4"
          />
          <h2 className="font-['Fraunces'] text-lg font-medium text-[#1C1B1A] text-center">{product?.name}</h2>
          <p className="font-['Inter'] text-[#C9A227] font-semibold mt-1">${Number(product?.price).toFixed(2)}</p>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-2xl shadow-lg border border-[#1C1B1A]/10 p-4 flex flex-col items-center justify-center">
          <h3 className="font-['Fraunces'] text-lg font-medium text-[#1C1B1A] mb-2">{product?.name}</h3>
          <p className="font-['Inter'] text-sm text-[#8A8577] text-center mb-4 line-clamp-3">{product?.description}</p>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product?._id}`); }}
            className="group bg-[#1C1B1A] hover:bg-[#C9A227] text-[#FAF7F0] px-6 py-2 rounded-full font-['Inter'] text-sm font-semibold transition-colors duration-300 flex items-center gap-2"
          >
            Check it out <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;