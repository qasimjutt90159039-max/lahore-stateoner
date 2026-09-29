import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  Layers,
  ArrowRight,
  TrendingUp,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { Order } from '../../types/index.js';

export const AdminDashboard: React.FC = () => {
  const { user, token, isAdmin, loginAsDemoAdmin } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch('/api/orders', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRecentOrders(data.slice(0, 5));
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const updateOrderStatus = async (orderId: string, status: string) => {
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
        setRecentOrders(prev =>
          prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: status as any } : o))
        );
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#173F5F] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#F6C85F] text-[#173F5F] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              Urdu Bazar Admin Control
            </span>
            <span className="text-xs text-stone-300">Logged in as {user?.email || 'Store Manager'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Store Management Dashboard
          </h1>
        </div>

        {!isAdmin && (
          <button
            onClick={loginAsDemoAdmin}
            className="bg-[#F6C85F] hover:bg-[#edbe50] text-[#173F5F] text-xs font-bold px-4 py-2.5 rounded-lg self-start sm:self-auto shadow-xs"
          >
            Activate Full Admin Permissions
          </button>
        )}
      </div>

      {/* Admin Subnav Links */}
      <div className="flex flex-wrap gap-2 text-xs font-bold border-b border-stone-200 pb-3">
        <Link to="/admin" className="px-3 py-1.5 bg-[#173F5F] text-white rounded-lg">
          Overview
        </Link>
        <Link to="/admin/products" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg">
          Products ({stats?.totalProducts || 140}+)
        </Link>
        <Link to="/admin/orders" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg">
          Orders ({stats?.totalOrders || 0})
        </Link>
        <Link to="/admin/wholesale" className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg">
          Wholesale Quotes ({stats?.wholesaleRequestsCount || 0})
        </Link>
        <Link to="/admin/settings" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg">
          Store Settings
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Catalog Products</span>
            <Package className="w-4 h-4 text-[#20639B]" />
          </div>
          <p className="text-2xl font-extrabold text-[#173F5F]">{stats?.totalProducts || 151}</p>
          <p className="text-[11px] text-stone-400">140+ Seeded Urdu Bazar Items</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900">{stats?.totalOrders || 0}</p>
          <p className="text-[11px] text-emerald-600 font-medium">{stats?.completedOrders || 0} Delivered</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Wholesale Quotes</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-900">{stats?.wholesaleRequestsCount || 0}</p>
          <p className="text-[11px] text-stone-400">Schools & Offices Inquiries</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Total Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#173F5F]" />
          </div>
          <p className="text-2xl font-extrabold text-[#173F5F]">
            PKR {(stats?.totalRevenue || 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400">Cash on Delivery Orders</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-extrabold text-base text-[#173F5F]">Recent Customer Orders</h2>
          <Link to="/admin/orders" className="text-xs text-[#20639B] font-bold hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 uppercase font-semibold">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">City</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-stone-50/60">
                  <td className="p-3.5 font-mono font-bold text-[#173F5F]">{o.orderNumber}</td>
                  <td className="p-3.5 font-semibold text-stone-800">{o.customerName}</td>
                  <td className="p-3.5 text-stone-600">{o.city}</td>
                  <td className="p-3.5 text-stone-600">{o.items.length} items</td>
                  <td className="p-3.5 font-extrabold text-stone-900">PKR {o.total.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                      o.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-[11px] font-medium"
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
