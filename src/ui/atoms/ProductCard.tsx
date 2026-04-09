import React from "react";
import { Product } from "@/API/models/Product";

const ProductCard: React.FC<Product> = ({
  slug,
  title,
  powerOutput,
  priceGross,
  gallery,
}) => {
  const hasImage = gallery && gallery.length > 0;

  return (
    <a
      href={`/produkt?slug=${slug}`}
      className="group bg-white rounded-xl border-2 border-[#f2f2f2] hover:border-[#e0e0e0] transition-colors overflow-hidden block"
    >
      {/* Image */}
      <div className="p-4 flex relative items-center justify-center bg-white">
        {hasImage ? (
          <img
            src={gallery[0]}
            alt={title}
            className="w-full  object-contain aspect-square"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
            Brak zdjęcia
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <span className="bg-primary-100 text-black font-bold rounded-[40px] py-2 px-4 block whitespace-nowrap text-sm">
            Zapytaj o dostępność
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 border-t-2 border-[#f2f2f2] pt-5">
        <h3 className="font-bold text-base leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        {powerOutput && (
          <p className="text-[14px] mb-2">Moc maksymalna: {powerOutput}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          {priceGross ? (
            <p className="text-sm font-medium">{priceGross} brutto</p>
          ) : (
            <span />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFD006"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
