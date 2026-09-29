import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppButton } from '../components/WhatsAppButton.js';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do you sell wholesale stationery?',
    answer: 'Yes. Lahore Stationers Mall is a stationery wholesaler located at Kabeer Street, Urdu Bazar, Lahore. We provide wholesale carton rates, institutional supplies, and bulk order discounts for retail shops, schools, academies, and corporate offices across Pakistan.'
  },
  {
    question: 'How can I place an order?',
    answer: 'You can browse products online, add items to your shopping cart, and proceed through checkout choosing Cash on Delivery (COD). Alternatively, you can generate a WhatsApp cart summary from the Cart page or submit a bulk quotation through our Wholesale Portal.'
  },
  {
    question: 'Can I request bulk pricing?',
    answer: 'Yes. If you require higher quantities than listed on individual product cards, you can visit our /wholesale portal and submit your specific quantity requirements. Our sales counter will evaluate current factory batches and provide a custom quotation.'
  },
  {
    question: 'What stationery categories are available?',
    answer: 'Our catalog contains 140+ products spanning Pens & Writing, Graphite & Colored Pencils, Notebooks & Registers, Copy & Card Paper, Files & Folders, School Supplies, Office & Desk Accessories, Art & Craft Materials, Markers & Highlighters, Adhesives & Packaging, and Bulk Wholesale Starter Packs.'
  },
  {
    question: 'Can I contact the store through WhatsApp?',
    answer: 'Yes. Our verified WhatsApp customer support number is +92 323 4304600. You can use the WhatsApp buttons located across the website to inquire about product prices, confirm stock availability, or discuss bulk dispatches.'
  },
  {
    question: 'How can I check product availability?',
    answer: 'Each product page indicates real-time warehouse inventory indicators. Because Urdu Bazar wholesale inventory turns over rapidly, we also recommend using our WhatsApp Inquiry button to confirm current batch counts for large carton volumes.'
  },
  {
    question: 'Can businesses request a formal quotation?',
    answer: 'Yes. Schools, universities, companies, and organizations can submit their tender or procurement lists through our Wholesale Portal (/wholesale) to receive an itemized quotation.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173F5F] tracking-tight">
          Common Questions & Ordering Guide
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Helpful answers about retail purchasing, Urdu Bazar wholesale supplies, delivery and quotations.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-xs"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-stone-800 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#20639B] shrink-0" />
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${
                  openIdx === idx ? 'rotate-180 text-[#173F5F]' : ''
                }`}
              />
            </button>

            {openIdx === idx && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still have questions card */}
      <div className="bg-[#FFFDF5] border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-[#173F5F]">Have a Specific Inquiry?</h3>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          Feel free to reach out directly to our Urdu Bazar store representative during business hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <WhatsAppButton
            type="general"
            label="WhatsApp: +92 323 4304600"
            className="text-xs py-2.5 px-4"
          />
          <Link
            to="/contact"
            className="bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Store Contact Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
