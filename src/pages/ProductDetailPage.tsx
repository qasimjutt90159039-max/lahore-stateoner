import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  Truck,
  Building2,
  Star,
  MessageSquare
} from 'lucide-react';
import { Product, Review } from '../types/index.js';
import { ImageWithFallback } from '../components/ImageWithFallback.js';
import { WhatsAppButton } from '../components/WhatsAppButton.js';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { ProductCard } from '../components/ProductCard.js';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'pack' | 'wholesale' | 'reviews'>('desc');
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setActiveImage(data.thumbnail);
        setQuantity(1);

        // Load reviews
        fetch(`/api/products/${data.id}/reviews`)
          .then(r => r.json())
          .then(revData => setReviews(revData))
          .catch(() => {});

        // Load related items in same category
        fetch(`/api/products?category=${encodeURIComponent(data.category)}&limit=4`)
          .then(r => r.json())
          .then(relData => {
            setRelated((relData.products || []).filter((p: Product) => p.id !== data.id).slice(0, 4));
          })
          .catch(() => {});
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-block w-8 h-8 border-4 border-[#173F5F] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-stone-500 mt-3">Loading product details from Urdu Bazar database...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-800">Product Not Found</h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">The requested stationery product does not exist or has been relocated.</p>
        <Link to="/shop" className="bg-[#173F5F] text-white text-xs font-bold px-5 py-3 rounded-lg hover:bg-[#20639B]">
          Return to Stationery Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const minWholesale = product.minWholesaleQty || 10;
  const isWholesaleTier = quantity >= minWholesale && product.wholesaleAvailable;
  const activePrice = isWholesaleTier ? product.wholesalePrice : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newComment) return;
    setReviewSubmitting(true);
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: newReviewer,
          rating: newRating,
          comment: newComment
        })
      });
      if (res.ok) {
        const addedRev = await res.json();
        setReviews(prev => [addedRev, ...prev]);
        setNewReviewer('');
        setNewComment('');
        alert('Thank you! Your verified review has been posted.');
      }
    } catch (err) {
      alert('Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="text-xs text-stone-500 flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#173F5F]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#173F5F]">Shop</Link>
        <span>/</span>
        <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#173F5F]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-stone-800 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery & Zoom Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm relative">
            <ImageWithFallback
              src={activeImage}
              alt={product.name}
              category={product.category}
              productName={product.name}
              className="w-full h-full object-cover"
            />
            {product.wholesaleAvailable && (
              <span className="absolute top-4 left-4 bg-[#173F5F] text-[#F6C85F] text-xs font-bold px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Wholesale Tier Available
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === img ? 'border-[#20639B] shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Pricing, Specs & Actions */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-[#20639B] tracking-wider">
                {product.brand}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17202A] mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-700">{product.rating}</span>
              <span className="text-xs text-stone-400">({reviews.length} customer reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-[#FFFDF5] border border-amber-200 rounded-xl p-4 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#173F5F]">
                PKR {activePrice.toLocaleString()}
              </span>
              {product.compareAtPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  PKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="bg-[#ED553B] text-white text-xs font-bold px-2 py-0.5 rounded">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {product.wholesaleAvailable && (
              <div className="pt-2 border-t border-amber-200/60 text-xs text-[#8C6D1F]">
                <p className="font-semibold">
                  Wholesale Bulk Rate: <b>PKR {product.wholesalePrice}</b> per unit when ordering {minWholesale}+ units.
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Order cartons and institutional packs with Cash on Delivery across Pakistan.
                </p>
              </div>
            )}
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div>
              <span className="text-stone-500 block">Pack Size:</span>
              <span className="font-bold text-stone-800">{product.packSize}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Unit Type:</span>
              <span className="font-bold text-stone-800">{product.unit}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Stock Status:</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Dispatch Location:</span>
              <span className="font-bold text-stone-800">Urdu Bazar, Lahore</span>
            </div>
          </div>

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-2 font-bold text-stone-600 hover:bg-stone-100"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-stone-800 text-sm min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3.5 py-2 font-bold text-stone-600 hover:bg-stone-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                  added ? 'bg-emerald-600 text-white' : 'bg-[#173F5F] hover:bg-[#20639B] text-white active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart (PKR {(activePrice * quantity).toLocaleString()})
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className={`p-3 rounded-xl border border-stone-300 transition-colors ${
                  inWishlist ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-stone-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#F6C85F] hover:bg-[#edbe50] text-[#173F5F] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm border border-amber-300 transition-colors shadow-xs"
              >
                Buy Now (Instant Checkout)
              </button>

              <WhatsAppButton
                type="product"
                productName={product.name}
                label="WhatsApp Price Inquiry"
                className="w-full text-xs sm:text-sm py-2.5"
              />
            </div>
          </div>

          {/* Reassurance Badges */}
          <div className="pt-4 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#20639B]" /> Cash on Delivery Available
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#20639B]" /> Urdu Bazar Wholesaler
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'desc' ? 'border-[#173F5F] text-[#173F5F]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'specs' ? 'border-[#173F5F] text-[#173F5F]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('pack')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'pack' ? 'border-[#173F5F] text-[#173F5F]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Pack Information
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'wholesale' ? 'border-[#173F5F] text-[#173F5F]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Wholesale Information
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reviews' ? 'border-[#173F5F] text-[#173F5F]' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="pt-6 text-sm text-stone-700 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-3">
              <p>{product.description}</p>
              <p className="text-xs text-stone-500">
                Manufactured by <b>{product.brand}</b>, distributed and wholesaled directly through Lahore Stationers Mall at Kabeer Street, Urdu Bazar, Lahore.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl">
              <table className="w-full text-xs">
                <tbody>
                  {Object.entries(product.specifications || {}).map(([k, v]) => (
                    <tr key={k} className="border-b border-stone-100">
                      <td className="py-2.5 font-bold text-stone-600 w-1/3">{k}</td>
                      <td className="py-2.5 text-stone-800">{v}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-600">Category</td>
                    <td className="py-2.5 text-stone-800">{product.category} ({product.subcategory})</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-stone-600">Product SKU</td>
                    <td className="py-2.5 text-stone-800 font-mono">{product.sku}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'pack' && (
            <div className="space-y-2 text-xs">
              <p><b>Pack Size:</b> {product.packSize}</p>
              <p><b>Unit of Sale:</b> {product.unit}</p>
              <p><b>Minimum Wholesale Threshold:</b> {product.minWholesaleQty || 10} {product.unit}s</p>
              <p className="text-stone-500 pt-2">
                All boxes and reams are packaged in factory sealed cartons to ensure pristine condition upon arrival.
              </p>
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="space-y-3 text-xs bg-[#FFFDF5] p-4 rounded-xl border border-amber-200">
              <h4 className="font-bold text-sm text-[#173F5F]">Wholesale Bulk Buyers</h4>
              <p>
                Lahore Stationers Mall provides bulk pricing to schools, academies, corporate businesses, banks, and stationery retailers across Pakistan.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  to="/wholesale"
                  className="bg-[#173F5F] text-white font-bold px-3 py-2 rounded-lg text-xs hover:bg-[#20639B]"
                >
                  Open Wholesale Quotation Form
                </Link>
                <WhatsAppButton
                  type="wholesale"
                  productName={product.name}
                  variant="outline"
                  label="Inquire via WhatsApp"
                />
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-xs text-stone-500">No reviews yet for this product. Be the first to review!</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-800">{r.userName}</span>
                        <span className="text-[10px] text-stone-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </div>
                      <p className="text-xs text-stone-600 mt-1">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3">
                <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">Leave a Review</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewer}
                      onChange={(e) => setNewReviewer(e.target.value)}
                      placeholder="e.g. Salman Stationery"
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-semibold"
                    >
                      <option value="5">★★★★★ (5 - Excellent)</option>
                      <option value="4">★★★★☆ (4 - Very Good)</option>
                      <option value="3">★★★☆☆ (3 - Average)</option>
                      <option value="2">★★☆☆☆ (2 - Fair)</option>
                      <option value="1">★☆☆☆☆ (1 - Poor)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience regarding paper quality, ink smoothness, or packing..."
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="bg-[#173F5F] hover:bg-[#20639B] text-white font-bold text-xs py-2 px-4 rounded-lg transition-colors"
                >
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold text-[#173F5F]">Similar Stationery Items</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
