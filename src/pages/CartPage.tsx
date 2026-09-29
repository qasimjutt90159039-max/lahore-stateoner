import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  Building2,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { ImageWithFallback } from '../components/ImageWithFallback.js';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    generateWhatsAppCartLink
  } = useCart();
  const { user } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponMsg({ text: 'Coupon applied successfully!', isError: false });
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try URDUBAZAR10', isError: true });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800">Your Stationery Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          Explore our collection of over 140+ writing, school, office and wholesale stationery products.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#173F5F] hover:bg-[#20639B] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
          >
            <span>Start Shopping Stationery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const whatsAppLink = generateWhatsAppCartLink(user?.name);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your items, apply wholesale quantity rates, or send your cart to our Urdu Bazar WhatsApp desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Product Details
            </span>
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:underline font-semibold"
            >
              Clear Cart
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {items.map((item) => (
              <div
                key={item.productId}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left: Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                    <ImageWithFallback
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      category={item.product.category}
                      productName={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#20639B] uppercase">
                      {item.product.brand}
                    </span>
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="font-bold text-sm text-stone-800 hover:text-[#20639B] transition-colors block line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-stone-400">
                      Pack: {item.product.packSize} • SKU: {item.product.sku}
                    </p>

                    {item.isWholesaleTier ? (
                      <span className="inline-flex items-center gap-1 bg-[#FFF9DB] text-[#8C6D1F] text-[10px] font-bold px-2 py-0.5 rounded">
                        <Sparkles className="w-2.5 h-2.5" /> Wholesale Rate Applied
                      </span>
                    ) : (
                      item.product.wholesaleAvailable && (
                        <span className="text-[10px] text-stone-400">
                          (Wholesale rate PKR {item.product.wholesalePrice} on {item.product.minWholesaleQty || 10}+ pcs)
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Right: Quantity & Pricing */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1.5 hover:bg-stone-200 text-stone-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-stone-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1.5 hover:bg-stone-200 text-stone-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[5rem]">
                    <div className="text-sm font-extrabold text-[#173F5F]">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      PKR {item.unitPrice} each
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
            <Link
              to="/shop"
              className="text-xs font-semibold text-[#20639B] hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary & Checkout */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <h2 className="font-extrabold text-base text-[#173F5F] border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            {/* Coupon Code Section */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Discount Coupon Code
              </label>
              {couponCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-4 h-4" /> {couponCode}
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-red-600 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter URDUBAZAR10"
                    className="flex-1 bg-[#F7F9FC] border border-stone-300 rounded-lg px-3 py-2 text-xs uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs px-3.5 py-2 rounded-lg"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] mt-1 ${couponMsg.isError ? 'text-red-500' : 'text-emerald-600'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">PKR {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-PKR {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee (Lahore / Pakistan)</span>
                <span className="font-bold text-stone-900">
                  {deliveryFee === 0 ? <span className="text-emerald-600">FREE (Orders &gt; PKR 4,000)</span> : `PKR ${deliveryFee}`}
                </span>
              </div>

              <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-extrabold text-[#173F5F]">
                <span>Total Amount</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="bg-[#FFFDF5] p-3 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Payment Method: Cash on Delivery (COD)</p>
              <p className="text-[11px] text-stone-500">
                Pay in cash when your parcel is delivered to your school, office, or residence.
              </p>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* WhatsApp Cart Inquiry Button */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Cart Order via WhatsApp</span>
            </a>

            <p className="text-[11px] text-stone-400 text-center">
              Notice: Prices and availability may change. Please confirm before final purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
