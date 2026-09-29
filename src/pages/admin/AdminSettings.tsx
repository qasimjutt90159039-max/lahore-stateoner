import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AdminSettings } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';

export const AdminSettingsPage: React.FC = () => {
  const { token, isAdmin, loginAsDemoAdmin } = useAuth();
  const [settings, setSettings] = useState<AdminSettings>({
    storeName: 'Lahore Stationers Mall',
    phone: '+92 323 4304600',
    address: 'Kabeer Street, Urdu Bazar, Lahore 54000, Pakistan',
    email: '',
    businessHours: 'Mon - Sat: 9:00 AM - 8:30 PM (Sunday Closed)',
    facebookUrl: '',
    instagramUrl: '',
    announcementText: 'Wholesale Stationery • Kabeer Street, Urdu Bazar Lahore • Cash on Delivery & Bulk Quotations Available',
    minimumWholesaleOrderValue: 5000,
    defaultDeliveryFee: 200,
    freeDeliveryThreshold: 4000,
    priceNotice: 'Prices and availability may change. Please confirm before final purchase.'
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        if (d) setSettings(d);
      })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        alert('Failed to save settings. Please verify admin privileges.');
      }
    } catch {
      alert('Error updating settings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
            Store & Business Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure Urdu Bazar store contact details, email, delivery fees, and notices.
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

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Store settings successfully updated!
          </div>
        )}

        <div className="space-y-4">
          <h2 className="font-extrabold text-sm text-[#173F5F] uppercase tracking-wider border-b border-stone-100 pb-2">
            1. Store Identity & Verified Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Store Phone / WhatsApp</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-stone-700 mb-1">Urdu Bazar Physical Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Store Email (Configurable by Admin)
              </label>
              <input
                type="text"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="Leave blank or configure official email"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Business Hours</label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h2 className="font-extrabold text-sm text-[#173F5F] uppercase tracking-wider border-b border-stone-100 pb-2">
            2. Delivery & Minimum Order Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Standard Delivery Fee (PKR)</label>
              <input
                type="number"
                value={settings.defaultDeliveryFee}
                onChange={(e) => setSettings({ ...settings, defaultDeliveryFee: Number(e.target.value) })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Free Delivery Threshold (PKR)</label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Min Wholesale Order (PKR)</label>
              <input
                type="number"
                value={settings.minimumWholesaleOrderValue}
                onChange={(e) => setSettings({ ...settings, minimumWholesaleOrderValue: Number(e.target.value) })}
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-stone-700 mb-1">Top Announcement Bar Text</label>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-stone-700 mb-1">Required Pricing Notice</label>
            <input
              type="text"
              value={settings.priceNotice}
              onChange={(e) => setSettings({ ...settings, priceNotice: e.target.value })}
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
        >
          <Save className="w-4 h-4" />
          Save Store Settings
        </button>
      </form>
    </div>
  );
};
