import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.js';
import { ProductCard } from '../components/ProductCard.js';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <Heart className="w-12 h-12 text-stone-300 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800">Your Wishlist is Empty</h2>
        <p className="text-xs text-stone-500">Save pens, registers, paper and stationery supplies to purchase later.</p>
        <Link to="/shop" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-5 py-2.5 rounded-lg">
          Browse Stationery Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          My Saved Wishlist ({wishlist.length} Items)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Items saved for quick re-ordering or wholesale price reference.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
