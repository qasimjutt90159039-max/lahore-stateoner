import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Clock, CheckCircle2, Truck } from 'lucide-react';
import { Order } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';

export const AdminOrders: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetch('/api/orders', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setOrders(d);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [token]);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: status as any } : o))
        );
      }
    } catch {
      alert('Error updating order status');
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
            Order Management ({orders.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Update order processing, packing and shipment stages for customer orders.
          </p>
        </div>

        <Link
          to="/admin"
          className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-2 rounded-lg hover:bg-stone-200 self-start sm:self-auto"
        >
          ← Admin Dashboard
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {['all', 'Pending', 'Confirmed', 'Processing', 'Ready', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
              filterStatus === st
                ? 'bg-[#173F5F] text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {st} {st === 'all' ? `(${orders.length})` : `(${orders.filter(o => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer Details</th>
                <th className="p-3">Shipping Address</th>
                <th className="p-3">Purchased Items</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50/60">
                  <td className="p-3 font-mono font-bold text-[#173F5F]">
                    {o.orderNumber}
                    <div className="text-[10px] text-stone-400 font-sans font-normal">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3 font-medium text-stone-800">
                    <p className="font-bold">{o.customerName}</p>
                    <p className="text-stone-400 text-[11px] font-mono">{o.phone}</p>
                  </td>
                  <td className="p-3 text-stone-600 max-w-xs">
                    {o.address}, <b>{o.city}</b>
                  </td>
                  <td className="p-3 text-stone-600">
                    <div className="space-y-0.5">
                      {o.items.map((it, idx) => (
                        <p key={idx} className="line-clamp-1 text-[11px]">
                          {it.quantity}x {it.productName}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-bold text-[#173F5F]">
                    PKR {o.total.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      o.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1 text-xs font-semibold text-stone-700"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Ready">Ready</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
