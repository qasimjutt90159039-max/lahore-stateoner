import React, { useState } from 'react';
import { X, Check, ShoppingBag, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types/index.js';
import { ImageWithFallback } from './ImageWithFallback.js';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { WhatsAppButton } from './WhatsAppButton.js';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const minWholesale = product.minWholesaleQty || 10;
  const isWholesaleQty = quantity >= minWholesale && product.wholesaleAvailable;
  const activeUnitPrice = isWholesaleQty ? product.wholesalePrice : product.price;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Column */}
        <div className="w-full md:w-1/2 bg-stone-50 relative aspect-square md:aspect-auto">
          <ImageWithFallback
            src={product.thumbnail}
            alt={product.name}
            category={product.category}
            productName={product.name}
            className="w-full h-full object-cover"
          />
          {product.wholesaleAvailable && (
            <div className="absolute bottom-3 left-3 bg-[#173F5F] text-[#F6C85F] text-xs font-semibold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Wholesale Available
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 overflow-y-auto flex flex-col">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#20639B] mb-1">
            {product.brand} • {product.category}
          </div>
          <h2 className="text-lg font-bold text-[#17202A] leading-tight mb-2">
            {product.name}
          </h2>
          <div className="text-xs text-stone-400 font-mono mb-3">
            SKU: {product.sku}
          </div>

          {/* Pricing Box */}
          <div className="bg-[#FFFDF5] border border-amber-200/80 rounded-xl p-3 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#173F5F]">
                PKR {activeUnitPrice.toLocaleString()}
              </span>
              {product.compareAtPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  PKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.wholesaleAvailable && (
              <p className="text-xs text-[#8C6D1F] mt-1 font-medium">
                Wholesale bulk rate of <b>PKR {product.wholesalePrice}</b> applies on {minWholesale}+ units.
              </p>
            )}
          </div>

          <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>

          <div className="text-xs text-stone-500 mb-4 space-y-1">
            <div><span className="font-semibold text-stone-700">Pack Size:</span> {product.packSize}</div>
            <div><span className="font-semibold text-stone-700">Stock:</span> {product.stock > 0 ? `${product.stock} units in Urdu Bazar warehouse` : 'Out of Stock'}</div>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="mt-auto pt-3 border-t border-stone-100 flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:bg-stone-200"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-sm font-semibold text-stone-800 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:bg-stone-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                  added ? 'bg-emerald-600 text-white' : 'bg-[#173F5F] hover:bg-[#20639B] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add PKR {(activeUnitPrice * quantity).toLocaleString()}
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp and Full Details Link */}
            <div className="flex items-center gap-2">
              <WhatsAppButton
                type="product"
                productName={product.name}
                variant="outline"
                className="flex-1"
                label="WhatsApp Price Check"
              />
              <Link
                to={`/products/${product.slug}`}
                onClick={onClose}
                className="text-xs text-[#20639B] hover:underline font-medium px-2 py-2 text-center"
              >
                Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
