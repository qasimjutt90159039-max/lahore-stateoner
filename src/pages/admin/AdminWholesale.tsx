import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, MessageSquare, Phone, CheckCircle2, Clock } from 'lucide-react';
import { WholesaleRequest } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';

export const AdminWholesale: React.FC = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState<WholesaleRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wholesale', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setRequests(d);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [token]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/wholesale/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: status as any } : r));
      }
    } catch {
      alert('Error updating status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
            Wholesale Quotation Inquiries ({requests.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review bulk requests from schools, tuition centers, offices, and stationary retailers.
          </p>
        </div>

        <Link
          to="/admin"
          className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-2 rounded-lg hover:bg-stone-200 self-start sm:self-auto"
        >
          ← Admin Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold">
              <tr>
                <th className="p-3">Buyer & Business</th>
                <th className="p-3">Contact Phone</th>
                <th className="p-3">Required Products</th>
                <th className="p-3">Estimated Quantity / Notes</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50/60">
                  <td className="p-3">
                    <p className="font-bold text-stone-900">{r.buyerName}</p>
                    <p className="text-stone-500 text-[11px]">{r.businessName}</p>
                  </td>
                  <td className="p-3 font-mono font-medium text-stone-800">
                    <a href={`tel:${r.phone}`} className="hover:underline text-[#20639B]">
                      {r.phone}
                    </a>
                  </td>
                  <td className="p-3 max-w-xs text-stone-700 font-medium">
                    <p className="line-clamp-2">{r.requiredProducts}</p>
                  </td>
                  <td className="p-3 max-w-xs text-stone-500 text-[11px]">
                    <p className="font-semibold text-stone-700">{r.quantityEstimate}</p>
                    <p className="italic line-clamp-1">{r.message}</p>
                  </td>
                  <td className="p-3 text-stone-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'Quoted' ? 'bg-blue-100 text-blue-800' :
                      r.status === 'Contacted' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1 text-xs font-semibold"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Completed">Completed</option>
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
