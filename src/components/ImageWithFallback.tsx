import React, { useState } from 'react';
import { BookOpen, PenTool, Pencil, FileText, FolderArchive, Package, Palette, Sparkles } from 'lucide-react';
import { getStationeryImage } from '../utils/stationeryImages.js';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: string;
  productName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  category,
  productName,
  className = '',
  fallbackSrc,
  ...props
}) => {
  const verifiedDefault = fallbackSrc || getStationeryImage(category);
  const [currentSrc, setCurrentSrc] = useState<string>(src || verifiedDefault);
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // If initial src changes, update
  React.useEffect(() => {
    if (src) {
      // Fix broken 404 unsplash image if it's the old invalid one
      if (src.includes('photo-1585336261026-7a42cf8964d5') || src.includes('photo-1456735190829-80ab072ac175')) {
        setCurrentSrc(getStationeryImage(category));
      } else {
        setCurrentSrc(src);
      }
      setHasError(false);
      setRetryCount(0);
    }
  }, [src, category]);

  const handleError = () => {
    if (retryCount === 0) {
      // Try guaranteed category image
      setRetryCount(1);
      setCurrentSrc(getStationeryImage(category, 1));
    } else if (retryCount === 1) {
      // Try general verified pens/stationery image
      setRetryCount(2);
      setCurrentSrc('https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=700&q=80');
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`bg-[#FFFDF5] border border-amber-200/80 flex flex-col items-center justify-center text-[#173F5F] p-4 text-center select-none bg-notebook-lines relative overflow-hidden ${className}`}>
        <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-[#20639B] mb-2">
          <BookOpen className="w-6 h-6 text-[#173F5F]" />
        </div>
        <span className="text-xs font-bold text-[#173F5F] line-clamp-2 px-1 leading-snug">
          {productName || alt || 'Stationery Item'}
        </span>
        <span className="text-[10px] text-[#8C6D1F] font-semibold mt-1 bg-[#FFF9DB] px-2 py-0.5 rounded">
          Urdu Bazar Certified
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <img
        src={currentSrc}
        alt={alt || productName || 'Lahore Stationers Mall Product'}
        className="w-full h-full object-cover transition-transform duration-300"
        onError={handleError}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
        {...props}
      />
    </div>
  );
};
