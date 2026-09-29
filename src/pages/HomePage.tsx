import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  PackageCheck,
  Layers,
  Phone,
  FileSpreadsheet,
  CheckCircle2,
  PenTool,
  Pencil,
  BookOpen,
  FileText,
  FolderArchive,
  GraduationCap,
  Briefcase,
  Palette,
  Highlighter
} from 'lucide-react';
import { Product, Category } from '../types/index.js';
import { ProductCard } from '../components/ProductCard.js';
import { QuickViewModal } from '../components/QuickViewModal.js';
import { WhatsAppButton } from '../components/WhatsAppButton.js';
import { ImageWithFallback } from '../components/ImageWithFallback.js';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [schoolProducts, setSchoolProducts] = useState<Product[]>([]);
  const [officeProducts, setOfficeProducts] = useState<Product[]>([]);
  const [artProducts, setArtProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products?limit=100'),
          fetch('/api/categories')
        ]);
        if (prodRes.ok) {
          const data = await prodRes.json();
          const all: Product[] = data.products || [];
          setFeaturedProducts(all.filter(p => p.featured).slice(0, 8));
          setSchoolProducts(all.filter(p => p.category === 'School Supplies' || p.category === 'Pencils').slice(0, 4));
          setOfficeProducts(all.filter(p => p.category === 'Office & Desk Accessories' || p.category === 'Files & Folders').slice(0, 4));
          setArtProducts(all.filter(p => p.category === 'Art & Craft').slice(0, 4));
          setBestSellers(all.filter(p => p.bestSeller).slice(0, 8));
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FFFDF5] border-b border-stone-200 pt-8 pb-14 sm:py-16 bg-grid-paper">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#173F5F]/10 text-[#173F5F] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#ED553B] animate-pulse"></span>
              Urdu Bazar Lahore Wholesale & Retail
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#173F5F] tracking-tight leading-tight">
              Everything You Need to Write, Create & Organize
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Your stationery destination in Urdu Bazar, Lahore — from everyday school supplies to professional office and wholesale stationery.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-[#173F5F] hover:bg-[#20639B] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 group text-sm sm:text-base"
              >
                <span>Shop Stationery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/wholesale"
                className="bg-[#F6C85F] hover:bg-[#edbe50] text-[#173F5F] font-bold px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm sm:text-base border border-amber-300"
              >
                <Layers className="w-4 h-4" />
                <span>Wholesale Inquiry</span>
              </Link>
              <WhatsAppButton
                type="wholesale"
                variant="outline"
                label="WhatsApp Urdu Bazar"
                className="text-sm py-3 px-4"
              />
            </div>

            {/* Quick Micro Badges */}
            <div className="flex flex-wrap gap-4 pt-4 text-xs font-semibold text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Over 140+ Catalog Items
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cash on Delivery (COD)
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bulk Tier Pricing
              </div>
            </div>
          </div>

          {/* Right Stationery Desk Visual Scene with Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80"
                alt="Stationery desk scene with notebooks, pens and office tools"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F5F]/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#F6C85F] text-[#173F5F] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                  Urdu Bazar Wholesale Hub
                </span>
                <p className="text-sm font-bold mt-1">Kabeer Street, Urdu Bazar, Lahore</p>
                <p className="text-xs text-stone-200">Supplying schools, offices & retailers across Pakistan</p>
              </div>
            </div>

            {/* Floating Stationery Badge 1 */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-xl shadow-xl border border-stone-200 flex items-center gap-3 animate-bounce [animation-duration:4s]">
              <div className="w-10 h-10 rounded-lg bg-[#FFF9DB] flex items-center justify-center text-[#8C6D1F]">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Original Brands</p>
                <p className="text-[10px] text-stone-500">Dollar, Piano, Faber-Castell</p>
              </div>
            </div>

            {/* Floating Stationery Badge 2 */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white p-3 rounded-xl shadow-xl border border-stone-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#173F5F]/10 flex items-center justify-center text-[#173F5F]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">Institutional Quotes</p>
                <p className="text-[10px] text-stone-500">Schools & Offices Welcome</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (4 Cards required) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-[#173F5F]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#173F5F]/10 flex items-center justify-center text-[#173F5F] mb-3">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#17202A] mb-1">Wide Product Range</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              School, office, art and everyday stationery from trusted local and international makers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-[#173F5F]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#F6C85F]/20 flex items-center justify-center text-amber-800 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#17202A] mb-1">Wholesale Friendly</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Products suitable for shops, schools, offices and bulk buyers with tiered wholesale pricing.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-[#173F5F]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#20639B]/10 flex items-center justify-center text-[#20639B] mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#17202A] mb-1">Urdu Bazar Lahore</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Located at Kabeer Street, Urdu Bazar, Lahore. Rooted in Pakistan's historic book & stationery market.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-[#173F5F]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#17202A] mb-1">Easy Ordering</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Browse products and place your order online with Cash on Delivery or request a WhatsApp quote.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider">
              Browse By Department
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
              Stationery Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#20639B] hover:text-[#173F5F] flex items-center gap-1 group"
          >
            <span>Explore All 15 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 12).map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-xl border border-stone-200 p-3.5 flex flex-col items-center text-center hover:border-[#20639B] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFFDF5] border border-stone-200 overflow-hidden mb-2.5 p-1 group-hover:scale-105 transition-transform">
                <ImageWithFallback
                  src={cat.bannerImage}
                  alt={cat.name}
                  category={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-[#20639B] line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {cat.productCount}+ items
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#ED553B] uppercase tracking-wider">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
              Featured Stationery
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-semibold text-[#20639B] hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* 5. UNIQUE WHOLESALE BANNER (Paper Invoice / Order Sheet Design) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative bg-[#FFFDF5] border-2 border-dashed border-[#F6C85F] rounded-2xl p-6 sm:p-10 shadow-lg overflow-hidden bg-notebook-lines">
          {/* Paper Clip Visual Element */}
          <div className="absolute top-3 right-6 hidden sm:block">
            <div className="w-6 h-14 rounded-full border-4 border-stone-400 -rotate-12 opacity-40"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-[#173F5F] text-[#F6C85F] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                Stationery Wholesaler • Urdu Bazar
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#173F5F] tracking-tight">
                Buying for a School, Office or Stationery Shop?
              </h2>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
                Send us your bulk requirement and request a wholesale quotation. We specialize in supply cartons, student examination packs, office filing kits, and academic bundles.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-stone-700">
                <div className="bg-white/80 p-2.5 rounded-lg border border-stone-200">
                  📋 Formal Invoiced Quotation
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-stone-200">
                  📦 Master Carton Packaging
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-stone-200">
                  🚚 Cargo Dispatch Across PK
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                to="/wholesale"
                className="bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3.5 px-6 rounded-xl shadow-md text-center text-sm transition-all"
              >
                Request Bulk Quote
              </Link>
              <WhatsAppButton
                type="wholesale"
                label="WhatsApp Wholesale Desk"
                className="w-full text-sm py-3"
              />
              <p className="text-[11px] text-stone-500 text-center">
                Urdu Bazar Desk: +92 323 4304600
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SCHOOL ESSENTIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-50 to-stone-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" /> Academic Season Ready
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
                Back-to-School Essentials
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Pencils, geometry boxes, student registers, erasers & sharpening tools.
              </p>
            </div>
            <Link
              to="/school-supplies"
              className="bg-[#20639B] hover:bg-[#173F5F] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Shop School Supplies →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {schoolProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. OFFICE ESSENTIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-stone-50 to-amber-50/50 border border-stone-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Corporate & Accounting
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
                Office & Desk Essentials
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Box files, calculators, heavy staplers, A4 copy paper & organizers.
              </p>
            </div>
            <Link
              to="/office-supplies"
              className="bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Shop Office Supplies →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {officeProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. ART & CRAFT SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Fine Arts & Creative Media
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
                Art & Craft Supplies
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Poster paints, acrylics, pastels, sketch books, canvas boards & clay sets.
              </p>
            </div>
            <Link
              to="/art-craft"
              className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1 self-start sm:self-auto"
            >
              Explore Art Supplies →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {artProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#F6C85F] uppercase tracking-wider text-amber-700">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
              Top Selling Stationery
            </h2>
          </div>
          <Link to="/shop?sort=best_seller" className="text-xs sm:text-sm font-semibold text-[#20639B] hover:underline">
            View Ranking →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* 10. CONTACT / URDU BAZAR VISIT CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#173F5F] text-white rounded-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="bg-[#ED553B] text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
              Urdu Bazar Lahore Wholesaler
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Visit Lahore Stationers Mall or Order Remotely
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Located at Kabeer Street, Urdu Bazar, Lahore 54000. Whether you require a single geometry set or 50 cartons of copy paper, our desk is ready to assist.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#F6C85F] font-semibold pt-1">
              <span>📍 Kabeer Street, Urdu Bazar, Lahore</span>
              <span>📞 +92 323 4304600</span>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/contact"
              className="bg-white hover:bg-stone-100 text-[#173F5F] font-bold py-3 px-5 rounded-xl text-center text-sm shadow transition-colors"
            >
              Get Store Directions
            </Link>
            <WhatsAppButton
              type="general"
              label="Instant WhatsApp Inquiry"
              className="w-full text-sm py-3"
            />
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
