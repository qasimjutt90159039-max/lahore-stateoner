import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '../types/index.js';
import { ImageWithFallback } from './ImageWithFallback.js';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-stone-200/80 hover:border-stone-300 shadow-xs hover:shadow-lg transition-all duration-250 flex flex-col h-full overflow-hidden">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
        {product.discount && product.discount > 0 && (
          <span className="bg-[#ED553B] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
            -{product.discount}%
          </span>
        )}
        {product.wholesaleAvailable && (
          <span className="bg-[#173F5F] text-[#F6C85F] text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Bulk Rate
          </span>
        )}
        {product.stockStatus === 'low_stock' && (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded border border-amber-200">
            Low Stock
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        aria-label="Save to Wishlist"
        className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-500 hover:text-red-500 hover:bg-white shadow-xs transition-colors"
      >
        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image Container with Hover Zoom */}
      <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-stone-50">
        <ImageWithFallback
          src={product.thumbnail}
          alt={product.name}
          category={product.category}
          productName={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350 ease-out"
        />
        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={handleQuickView}
            className="bg-white/95 text-[#173F5F] text-xs font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-white flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
          <span className="font-medium text-[#20639B] uppercase tracking-wider">{product.brand}</span>
          <span className="text-stone-400">{product.packSize}</span>
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="font-semibold text-sm text-[#17202A] line-clamp-2 hover:text-[#20639B] transition-colors mb-2 leading-snug"
        >
          {product.name}
        </Link>

        {/* Pricing Area */}
        <div className="mt-auto pt-2 border-t border-stone-100 flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#173F5F]">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                PKR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Wholesale Tier Notice */}
          {product.wholesaleAvailable && (
            <div className="flex items-center justify-between text-[11px] bg-[#FFF9DB] text-[#8C6D1F] px-2 py-1 rounded">
              <span>Wholesale: <b>PKR {product.wholesalePrice}</b></span>
              <span className="text-[10px] text-stone-500">Min {product.minWholesaleQty || 10} pcs</span>
            </div>
          )}

          {/* Add to Cart CTA */}
          <div className="mt-2.5">
            <button
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                added
                  ? 'bg-emerald-600 text-white'
                  : product.stockStatus === 'out_of_stock'
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-[#173F5F] hover:bg-[#20639B] text-white active:scale-98'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added to Cart
                </>
              ) : product.stockStatus === 'out_of_stock' ? (
                'Out of Stock'
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
