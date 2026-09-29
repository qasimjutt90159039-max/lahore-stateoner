import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, BookOpen, Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton.js';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="bg-[#173F5F] text-white rounded-2xl p-8 sm:p-12 space-y-4">
        <span className="bg-[#F6C85F] text-[#173F5F] text-xs font-extrabold uppercase px-3 py-1 rounded tracking-wider inline-block">
          Stationery Wholesaler
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          About Lahore Stationers Mall
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Located at Kabeer Street, Urdu Bazar, Lahore 54000, Pakistan. A stationery wholesaler providing a comprehensive catalog of school, office, art, and paper supplies for both retail shoppers and bulk institutional buyers.
        </p>
      </div>

      {/* Focus Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#173F5F]/10 flex items-center justify-center text-[#173F5F]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17202A]">Comprehensive Stationery Range</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            From everyday ballpoint pens, graphite pencils, and exercise notebooks to specialized geometry sets and technical drafting instruments, our inventory covers all essential academic and professional supplies.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#20639B]/10 flex items-center justify-center text-[#20639B]">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17202A]">Office & Corporate Solutions</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We provide heavy-duty lever arch files, box files, 70/80 GSM printing paper reams, calculators, desktop organizers, and adhesives to keep corporate departments running smoothly.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F6C85F]/20 flex items-center justify-center text-amber-800">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#17202A]">Wholesale & Bulk Supply</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            As a wholesaler in Urdu Bazar, we specialize in bulk carton fulfillment, student semester supply packages, and educational tenders with transparent tiered volume pricing.
          </p>
        </div>
      </div>

      {/* Urdu Bazar Context Section */}
      <div className="bg-[#FFFDF5] border border-stone-200 rounded-2xl p-6 sm:p-10 space-y-4">
        <h2 className="text-2xl font-bold text-[#173F5F]">Rooted in Urdu Bazar, Lahore</h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
          Urdu Bazar in Lahore is historically renowned as the central wholesale hub for publishing, books, paper commerce, and stationery in Pakistan. Lahore Stationers Mall brings the advantages of Urdu Bazar pricing to digital retail and wholesale ordering, making direct market supply accessible beyond the physical market lanes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs font-semibold text-stone-800">
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Over 140+ Catalog Items</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cash on Delivery (COD)</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Wholesale Price Tiers</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-stone-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bulk Quotation System</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-100 p-6 sm:p-8 rounded-2xl border border-stone-200">
        <div>
          <h3 className="text-lg font-bold text-stone-900">Looking for Bulk Stationery or Quotes?</h3>
          <p className="text-xs text-stone-600 mt-0.5">Submit your list of required items or browse the complete store online.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/wholesale"
            className="bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors shadow-xs"
          >
            Request Wholesale Quote
          </Link>
          <WhatsAppButton
            type="wholesale"
            variant="outline"
            label="WhatsApp Desk"
          />
        </div>
      </div>
    </div>
  );
};
