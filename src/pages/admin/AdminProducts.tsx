import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Plus, Edit2, Trash2, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';

export const AdminProducts: React.FC = () => {
  const { token, loginAsDemoAdmin, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editWholesalePrice, setEditWholesalePrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);

  useEffect(() => {
    fetch('/api/products?limit=200')
      .then(r => r.json())
      .then(d => setProducts(d.products || []))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleStartEdit = (p: Product) => {
    setEditingProduct(p);
    setEditPrice(p.price);
    setEditWholesalePrice(p.wholesalePrice);
    setEditStock(p.stock);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          price: Number(editPrice),
          wholesalePrice: Number(editWholesalePrice),
          stock: Number(editStock)
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditingProduct(null);
      } else {
        alert('Failed to save update. Make sure you are signed in as admin.');
      }
    } catch {
      alert('Error updating product');
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
            Product Management ({products.length} Items)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Update retail prices, wholesale bulk tiers, and warehouse inventory stock.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isAdmin && (
            <button
              onClick={loginAsDemoAdmin}
              className="bg-[#F6C85F] text-[#173F5F] text-xs font-bold px-3 py-2 rounded-lg"
            >
              Sign In as Admin
            </button>
          )}
          <Link
            to="/admin"
            className="text-xs font-bold text-stone-600 bg-stone-100 px-3 py-2 rounded-lg hover:bg-stone-200"
          >
            ← Admin Dashboard
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, brand, category..."
            className="w-full bg-white border border-stone-300 rounded-lg pl-9 pr-3.5 py-2 text-xs text-stone-800"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#173F5F]">Edit Product: {editingProduct.name}</h3>
            <p className="text-xs text-stone-400 font-mono">SKU: {editingProduct.sku}</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Retail Price (PKR)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Wholesale Price (PKR)</label>
                <input
                  type="number"
                  value={editWholesalePrice}
                  onChange={(e) => setEditWholesalePrice(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-[#173F5F] rounded-lg hover:bg-[#20639B]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 uppercase font-semibold">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Retail Price</th>
                <th className="p-3">Wholesale Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70">
                  <td className="p-3 font-semibold text-stone-900 max-w-xs truncate">
                    {p.name}
                  </td>
                  <td className="p-3 font-mono text-stone-500">{p.sku}</td>
                  <td className="p-3 text-stone-600">{p.category}</td>
                  <td className="p-3 font-bold text-[#173F5F]">PKR {p.price}</td>
                  <td className="p-3 font-bold text-amber-800">PKR {p.wholesalePrice}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.stock > 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.stock} {p.unit}s
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleStartEdit(p)}
                      className="p-1.5 text-[#20639B] hover:bg-blue-50 rounded"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
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
