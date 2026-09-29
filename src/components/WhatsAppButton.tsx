import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  type?: 'product' | 'wholesale' | 'cart' | 'general';
  productName?: string;
  className?: string;
  variant?: 'primary' | 'outline' | 'floating' | 'pill';
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  type = 'general',
  productName = '',
  className = '',
  variant = 'primary',
  label
}) => {
  const phoneNumber = '923234304600';

  let message = 'Hello Lahore Stationers Mall, I am visiting your online store and have an inquiry.';
  if (type === 'product' && productName) {
    message = `Hello Lahore Stationers Mall, I am interested in ${productName}. Please provide the current price and availability.`;
  } else if (type === 'wholesale') {
    if (productName) {
      message = `Hello Lahore Stationers Mall, I want to purchase ${productName} in bulk. Please provide wholesale pricing and availability.`;
    } else {
      message = `Hello Lahore Stationers Mall, I am looking for wholesale rates and bulk quotations for my school/office/retail shop in Pakistan.`;
    }
  }

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (variant === 'floating') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all transform hover:scale-105 group font-medium text-sm"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Urdu Bazar WhatsApp</span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-medium px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
        <span>{label || 'WhatsApp Inquiry'}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59] font-medium px-4 py-2.5 rounded-lg text-sm transition-all shadow-sm ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-current" />
      <span>{label || 'WhatsApp Inquiry'}</span>
    </a>
  );
};
