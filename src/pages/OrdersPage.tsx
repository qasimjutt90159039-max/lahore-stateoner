import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck, XCircle, ArrowRight } from 'lucide-react';
import { Order } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

export const OrdersPage: React.FC = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Delivered</span>;
      case 'Shipped':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Shipped</span>;
      case 'Processing':
      case 'Ready':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded">{status}</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">Cancelled</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">{status}</span>;
    }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <Package className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800">Please Sign In to View Orders</h2>
        <p className="text-xs text-stone-500">Log in with your customer account to track current deliveries and past purchases.</p>
        <Link to="/login" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-5 py-2.5 rounded-lg">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          My Order History
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Tracking stationery dispatches from Urdu Bazar, Lahore.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-stone-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Package className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-800">No orders found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You haven't placed any stationery orders with this account yet.
          </p>
          <Link to="/shop" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-4 py-2 rounded-lg">
            Shop Catalog Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="space-y-0.5">
                  <span className="font-mono text-xs font-bold text-[#173F5F]">{o.orderNumber}</span>
                  <p className="text-[11px] text-stone-400">Placed on {new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(o.status)}
                  <span className="text-sm font-extrabold text-[#173F5F]">
                    PKR {o.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#173F5F]"></span>
                      <span className="font-medium line-clamp-1">{it.productName}</span>
                      <span className="text-stone-400">({it.packSize})</span>
                    </div>
                    <span className="font-semibold text-stone-900 shrink-0">
                      {it.quantity}x @ PKR {it.unitPrice}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2">
                <span>Destination: <b>{o.address}, {o.city}</b></span>
                <span>Payment: <b>{o.paymentMethod}</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
