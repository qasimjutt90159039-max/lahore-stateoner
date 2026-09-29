import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Clock, Mail } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton.js';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#173F5F] text-stone-300 pt-12 pb-8 border-t-4 border-[#F6C85F]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight block">
                LAHORE STATIONERS MALL
              </span>
              <p className="text-xs text-[#F6C85F] font-semibold tracking-wide uppercase mt-1">
                Stationery • School • Office • Art & Craft • Wholesale
              </p>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Serving retail customers, schools, universities, offices and bulk stationery buyers in Urdu Bazar, Lahore. Browse over 140+ quality writing, paper, and filing supplies.
            </p>
            <div className="pt-1">
              <WhatsAppButton
                type="general"
                label="Direct WhatsApp Support"
                className="text-xs py-2 px-3"
              />
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F6C85F] pl-2">
              Shop Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/writing" className="hover:text-white transition-colors">
                  Pens & Writing Instruments
                </Link>
              </li>
              <li>
                <Link to="/notebooks" className="hover:text-white transition-colors">
                  Notebooks & Registers
                </Link>
              </li>
              <li>
                <Link to="/school-supplies" className="hover:text-white transition-colors">
                  Back-to-School Supplies
                </Link>
              </li>
              <li>
                <Link to="/office-supplies" className="hover:text-white transition-colors">
                  Office & Desk Accessories
                </Link>
              </li>
              <li>
                <Link to="/art-craft" className="hover:text-white transition-colors">
                  Art, Paints & Craft Items
                </Link>
              </li>
              <li>
                <Link to="/paper" className="hover:text-white transition-colors">
                  A4 Paper, Card Sheets & Copier Paper
                </Link>
              </li>
              <li>
                <Link to="/files-folders" className="hover:text-white transition-colors">
                  Files, Binders & Folders
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Wholesale & Bulk Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F6C85F] pl-2">
              Wholesale Portal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/wholesale" className="hover:text-white transition-colors font-semibold text-[#F6C85F]">
                  Request Bulk Quotation
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-white transition-colors">
                  Wholesale Cartons & Master Packs
                </Link>
              </li>
              <li>
                <Link to="/school-supplies" className="hover:text-white transition-colors">
                  Institutional School Orders
                </Link>
              </li>
              <li>
                <Link to="/office-supplies" className="hover:text-white transition-colors">
                  Corporate Procurement
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Wholesale Order FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Store Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#F6C85F] pl-2">
              Contact Urdu Bazar
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F6C85F] shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  Kabeer Street, Urdu Bazar,<br />
                  Lahore 54000, Pakistan
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F6C85F] shrink-0" />
                <a href="tel:+923234304600" className="hover:text-white font-medium">
                  +92 323 4304600
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-stone-400">
                <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:30 PM (Sun Closed)</span>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 bg-black/20 p-2.5 rounded-lg border border-white/5">
                Payment: <b>Cash on Delivery</b> throughout Lahore & delivery via cargo across Pakistan.
              </div>
            </div>
          </div>
        </div>

        {/* Pricing disclaimer strictly required by business instructions */}
        <div className="py-4 text-center text-[11px] text-stone-400 border-b border-white/5">
          Notice: Prices and availability may change. Please confirm before final purchase. WhatsApp inquiry is not automatically a confirmed order.
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} Lahore Stationers Mall. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-200">About Store</Link>
            <Link to="/contact" className="hover:text-stone-200">Contact</Link>
            <Link to="/faq" className="hover:text-stone-200">FAQs</Link>
            <Link to="/admin" className="text-[#F6C85F] hover:underline font-semibold">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
