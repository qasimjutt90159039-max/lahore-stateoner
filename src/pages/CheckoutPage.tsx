import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Building2,
  ArrowRight,
  Package,
  Phone
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { Order } from '../types/index.js';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discount, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form Fields
  const [firstName, setFirstName] = useState(user?.name ? user.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(user?.name ? user.name.split(' ').slice(1).join(' ') : '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'Lahore');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const [placing, setPlacing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (items.length === 0 && !confirmedOrder) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Your Cart is Empty</h2>
        <p className="text-xs text-stone-500">Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-4 py-2.5 rounded-lg">
          Browse Stationery Catalog
        </Link>
      </div>
    );
  }

  // Order Confirmed Screen
  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase text-emerald-700 tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Order Placed Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
              Thank You For Your Order!
            </h1>
            <p className="text-xs text-stone-500">
              Your order number is <b className="text-stone-900 font-mono text-sm">{confirmedOrder.orderNumber}</b>
            </p>
          </div>

          <div className="bg-[#FFFDF5] border border-amber-200 rounded-xl p-4 text-xs text-stone-700 text-left space-y-2">
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500">Customer:</span>
              <span className="font-bold">{confirmedOrder.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500">Contact Phone:</span>
              <span className="font-bold">{confirmedOrder.phone}</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="font-bold">{confirmedOrder.address}, {confirmedOrder.city}</span>
            </div>
            <div className="flex justify-between border-b border-amber-200/60 pb-2">
              <span className="text-stone-500">Payment Method:</span>
              <span className="font-bold text-emerald-700">Cash on Delivery (COD)</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-extrabold text-[#173F5F]">
              <span>Total Payable Amount:</span>
              <span>PKR {confirmedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            Our Urdu Bazar team will verify your phone number and parcel contents before dispatching your package.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/orders"
              className="bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors"
            >
              View Order in Account
            </Link>
            <Link
              to="/shop"
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-5 py-3 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !phone || !address || !city) {
      alert('Please fill out all required shipping details.');
      return;
    }

    setPlacing(true);
    try {
      const orderPayload = {
        userId: user?.id,
        customerName: `${firstName} ${lastName}`.trim(),
        phone,
        email,
        address,
        city,
        area,
        postalCode,
        orderNotes,
        items: items.map(i => ({
          productId: i.productId,
          productName: i.product.name,
          sku: i.product.sku,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          totalPrice: i.unitPrice * i.quantity,
          packSize: i.product.packSize,
          thumbnail: i.product.thumbnail
        })),
        subtotal,
        discount,
        deliveryFee
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const orderData = await res.json();
        setConfirmedOrder(orderData);
        clearCart();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to place order');
      }
    } catch (err) {
      alert('Network error while placing order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          Checkout & Delivery Information
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Complete your dispatch address to receive your stationery order via Cash on Delivery.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-xs">
          <h2 className="font-extrabold text-base text-[#173F5F] border-b border-stone-100 pb-3">
            1. Delivery Address & Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Muhammad"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Tariq"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Mobile / Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0323 1234567"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@domain.com"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Street Address, Shop No, or School Name <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. House #14, Street #2, Near Main Market or Al-Hadi School Campus"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lahore"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Area / Town
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Model Town / Gulberg"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="54000"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Order Notes (Optional)
            </label>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="e.g. Please deliver between 10am and 4pm"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          {/* Payment Method Notice */}
          <div className="pt-2">
            <h2 className="font-extrabold text-base text-[#173F5F] border-b border-stone-100 pb-2 mb-3">
              2. Payment Method
            </h2>
            <div className="p-4 rounded-xl border-2 border-[#173F5F] bg-[#F7F9FC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-[#173F5F] bg-white"></div>
                <div>
                  <p className="font-bold text-xs text-stone-900">Cash on Delivery (COD)</p>
                  <p className="text-[11px] text-stone-500">Pay cash upon parcel arrival at your doorstep.</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Standard
              </span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <h2 className="font-extrabold text-base text-[#173F5F] border-b border-stone-100 pb-3">
              Items Summary ({items.length})
            </h2>

            <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
              {items.map((i) => (
                <div key={i.productId} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-stone-800 line-clamp-1">{i.product.name}</p>
                    <p className="text-stone-400 text-[11px]">
                      {i.quantity} x PKR {i.unitPrice} ({i.product.packSize})
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">
                    PKR {(i.unitPrice * i.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-800">PKR {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-PKR {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-stone-800">
                  {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `PKR ${deliveryFee}`}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-extrabold text-[#173F5F]">
                <span>Total Amount</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing}
              className="w-full bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              {placing ? 'Processing Order...' : 'Place Order (Cash on Delivery)'}
            </button>

            <div className="text-[11px] text-stone-400 text-center space-y-1">
              <p>📍 Shipped directly from Kabeer Street, Urdu Bazar, Lahore.</p>
              <p>Prices and availability may change. Please confirm before final purchase.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
