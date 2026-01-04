import React from 'react';
import { Product } from '../types';
import { ICONS } from '../constants';
import { THUMBNAIL_PATTERNS } from './Thumbnails';

interface ProductCardProps {
  product: Product;
  userLevel: number;
  onPurchase: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, userLevel, onPurchase }) => {
  const isUnlocked = userLevel >= product.requiredLevel;
  const Thumbnail = THUMBNAIL_PATTERNS[product.id % THUMBNAIL_PATTERNS.length];

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden relative group ${!isUnlocked ? 'opacity-50' : ''}`}>
      <div className="w-full h-48 bg-black overflow-hidden">
        <Thumbnail className="w-full h-full text-purple-900 opacity-30 group-hover:opacity-50 transition-opacity" />
      </div>
      {product.limitedEdition && (
         <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            LIMITED
         </div>
      )}
      <div className="p-4">
        <p className="text-xs text-purple-400 font-semibold mb-1 uppercase">{product.vendorName}</p>
        <h3 className="text-white font-semibold truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="text-purple-400 font-bold">{product.price} CC</p>
          <div className="flex items-center text-sm text-gray-400">
            {isUnlocked ? ICONS.badge : ICONS.lock}
            <span>Lv. {product.requiredLevel}</span>
          </div>
        </div>
        <button
          onClick={() => onPurchase(product)}
          disabled={!isUnlocked}
          className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 enabled:hover:bg-purple-700 enabled:hover:shadow-lg enabled:hover:shadow-purple-700/50 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isUnlocked ? 'View Details' : 'Locked'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
