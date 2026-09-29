import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Send,
  Phone,
  Package,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types/index.js';
import { WhatsAppButton } from '../components/WhatsAppButton.js';
import { ProductCard } from '../components/ProductCard.js';

export const WholesalePage: React.FC = () => {
  const [wholesaleProducts, setWholesaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [buyerName, setBuyerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requiredProducts, setRequiredProducts] = useState('');
  const [quantityEstimate, setQuantityEstimate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/products?wholesaleAvailable=true&limit=8')
      .then(res => res.json())
      .then(data => setWholesaleProducts(data.products || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !phone || !requiredProducts) {
      alert('Please fill out your name, contact phone and required products list.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName,
          businessName,
          phone,
          email,
          requiredProducts,
          quantityEstimate,
          message
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit quote request. Please call or WhatsApp us directly.');
      }
    } catch (err) {
      alert('Network error while submitting quote request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header Banner */}
      <div className="relative bg-[#173F5F] text-white rounded-2xl p-8 sm:p-12 overflow-hidden bg-dots-pattern">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F6C85F] text-[#173F5F] px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" /> Urdu Bazar Wholesale Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Wholesale Stationery & Bulk Procurement
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Supplying schools, tuition academies, colleges, corporate offices, banks and local retailers across Pakistan directly from Kabeer Street, Urdu Bazar, Lahore.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-stone-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C85F]" /> Master Carton & Loose Box Tiers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C85F]" /> Formal Stamp Invoices
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F6C85F]" /> Cargo Dispatch Nationwide
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Quotation Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-stone-800">Quotation Request Received</h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you, <b>{buyerName}</b>. Our Urdu Bazar wholesale desk will review your requirement and contact you at <b>{phone}</b> with formal pricing and carton availability.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-4 py-2.5 rounded-lg"
                >
                  Submit Another Inquiry
                </button>
                <WhatsAppButton
                  type="wholesale"
                  label="Speed Up via WhatsApp"
                  className="text-xs py-2.5 px-4"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xl font-bold text-[#173F5F]">Request Wholesale Quotation</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Fill in your required stationery quantities below for rapid wholesale rate quotation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Buyer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Akhtar Hussain"
                    className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Business / Institution Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Al-Hadi Grammar School / Zenith Tech"
                    className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0323 1234567"
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
                    placeholder="e.g. procurement@school.edu.pk"
                    className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Required Stationery Products & Brands <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={requiredProducts}
                  onChange={(e) => setRequiredProducts(e.target.value)}
                  placeholder="e.g. 50 Cartons of A4 70gsm Copy Paper, 200 Faber-Castell HB Pencils, 100 Bahadur Registers, 50 Box Files..."
                  className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Estimated Quantity or Target Date
                </label>
                <input
                  type="text"
                  value={quantityEstimate}
                  onChange={(e) => setQuantityEstimate(e.target.value)}
                  placeholder="e.g. 50 Cartons / Needed before October 15th"
                  className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Additional Notes / Delivery Destination
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention delivery city (Lahore, Multan, Faisalabad, etc.) or specific packing instructions."
                  className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting Quote Request...' : 'Request Wholesale Quote'}
                </button>

                <WhatsAppButton
                  type="wholesale"
                  variant="outline"
                  label="Direct WhatsApp Quote"
                  className="sm:w-auto"
                />
              </div>

              <p className="text-[11px] text-stone-400 text-center pt-1">
                Notice: Prices and availability may change. Please confirm before final purchase.
              </p>
            </form>
          )}
        </div>

        {/* Right: How Wholesale Works */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFFDF5] border border-amber-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-[#173F5F] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-700" />
              Wholesale Buying at Urdu Bazar
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Urdu Bazar is Pakistan's premier wholesale stationery epicenter. Lahore Stationers Mall aggregates direct factory carton pricing for institutions without middleman markups.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#173F5F] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <p><b>Submit Requirements:</b> List products, brands, or pack numbers in the form or via WhatsApp.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#173F5F] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <p><b>Receive Detailed Quotation:</b> We calculate wholesale unit costs, carton weights and cargo fees.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#173F5F] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <p><b>Dispatch & Payment:</b> Local delivery in Lahore via van with Cash on Delivery, or cargo transport across Punjab and Pakistan.</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3 text-xs text-stone-700">
            <h4 className="font-bold text-stone-900">Urdu Bazar Wholesale Desk</h4>
            <p>📍 Kabeer Street, Urdu Bazar, Lahore 54000</p>
            <p>📞 Phone: <b>+92 323 4304600</b></p>
            <p>⏰ Hours: Monday to Saturday, 9:00 AM – 8:30 PM</p>
          </div>
        </div>
      </div>

      {/* Popular Wholesale Master Bundles */}
      <div className="space-y-6 pt-6">
        <div>
          <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider">
            Ready-To-Ship Cartons
          </span>
          <h2 className="text-2xl font-extrabold text-[#173F5F]">
            Wholesale Packs & Bundles
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {wholesaleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
