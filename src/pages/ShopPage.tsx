import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Product, Category } from '../types/index.js';
import { ProductCard } from '../components/ProductCard.js';
import { QuickViewModal } from '../components/QuickViewModal.js';

export const ShopPage: React.FC<{ initialCategory?: string }> = ({ initialCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states
  const categoryParam = searchParams.get('category') || initialCategory || '';
  const searchParam = searchParams.get('search') || '';
  const brandParam = searchParams.get('brand') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const wholesaleOnly = searchParams.get('wholesale') === 'true';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';

  const [searchInput, setSearchInput] = useState(searchParam);

  // Load categories
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Sync search input
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  // Load products based on query params
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    if (searchParam) params.set('search', searchParam);
    if (brandParam) params.set('brand', brandParam);
    if (sortParam) params.set('sort', sortParam);
    if (wholesaleOnly) params.set('wholesaleAvailable', 'true');
    if (minPriceParam) params.set('minPrice', minPriceParam);
    if (maxPriceParam) params.set('maxPrice', maxPriceParam);
    params.set('page', String(pageParam));
    params.set('limit', '24');

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => console.error('Fetch products error:', err))
      .finally(() => setLoading(false));
  }, [categoryParam, searchParam, brandParam, sortParam, wholesaleOnly, pageParam, minPriceParam, maxPriceParam]);

  const updateParam = (key: string, val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) {
      next.set(key, val);
    } else {
      next.delete(key);
    }
    next.set('page', '1'); // reset page
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('search', searchInput);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  const popularBrands = [
    'Dollar',
    'Piano',
    'Faber-Castell',
    'Dux',
    'Staedtler',
    'Double A',
    'Bahadur',
    'UHU',
    'Kangaro',
    'Pentel',
    'Uni-Ball'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Breadcrumb & Title */}
      <div className="mb-6 pb-4 border-b border-stone-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          {categoryParam
            ? `${categoryParam.toUpperCase()} CATALOG`
            : searchParam
            ? `Search: "${searchParam}"`
            : wholesaleOnly
            ? 'Wholesale Stationery Products'
            : 'All Stationery Products'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Showing {products.length} of {total} products available at Urdu Bazar wholesale rates.
        </p>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-bold text-[#173F5F] px-3 py-2 bg-stone-100 rounded-lg"
          >
            <Filter className="w-4 h-4" /> Filters {categoryParam || brandParam || searchParam ? '(Active)' : ''}
          </button>

          <select
            value={sortParam}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 font-medium"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="best_seller">Sort: Best Selling</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Sidebar Filters - Desktop (and Drawer for Mobile) */}
        <aside
          className={`lg:col-span-3 bg-white border border-stone-200 rounded-xl p-5 space-y-6 ${
            mobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto shadow-2xl' : 'hidden lg:block'
          }`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 lg:hidden">
              <span className="font-bold text-sm text-[#173F5F]">Filter Products</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-xs font-semibold text-stone-500 px-2 py-1 bg-stone-100 rounded"
              >
                Close
              </button>
            </div>
          )}

          {/* Search within shop */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Search Products
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Product, brand, SKU..."
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-[#20639B]"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Wholesale Filter Toggle */}
          <div className="bg-[#FFF9DB] p-3 rounded-lg border border-amber-200/80">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#8C6D1F]">
              <input
                type="checkbox"
                checked={wholesaleOnly}
                onChange={(e) => updateParam('wholesale', e.target.checked ? 'true' : '')}
                className="rounded text-[#173F5F] focus:ring-0 w-4 h-4"
              />
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wholesale Bulk Available Only</span>
            </label>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Categories
            </h4>
            <div className="space-y-1 max-h-52 overflow-y-auto pr-1 text-xs">
              <button
                onClick={() => updateParam('category', '')}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                  !categoryParam ? 'bg-[#173F5F] text-white font-bold' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                All Categories ({total})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateParam('category', c.name)}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    categoryParam.toLowerCase() === c.name.toLowerCase() ||
                    categoryParam.toLowerCase() === c.slug.toLowerCase()
                      ? 'bg-[#173F5F] text-white font-bold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-[10px] opacity-70">({c.productCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div>
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Popular Brands
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {popularBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => updateParam('brand', brandParam.toLowerCase() === b.toLowerCase() ? '' : b)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    brandParam.toLowerCase() === b.toLowerCase()
                      ? 'bg-[#20639B] text-white border-[#20639B] font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={clearAllFilters}
            className="w-full text-xs font-semibold py-2 px-3 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
          </button>
        </aside>

        {/* Products Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Sort & Count Bar (Desktop) */}
          <div className="hidden lg:flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-stone-200 text-xs">
            <span className="text-stone-500 font-medium">
              Showing <b className="text-stone-800">{products.length}</b> products
            </span>

            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Sort by:</span>
              <select
                value={sortParam}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 font-semibold text-stone-700 focus:outline-none focus:border-[#20639B]"
              >
                <option value="featured">Featured First</option>
                <option value="newest">New Arrivals</option>
                <option value="best_seller">Best Sellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 bg-white rounded-xl border border-stone-200 p-4 animate-pulse space-y-3">
                  <div className="aspect-square bg-stone-200 rounded-lg" />
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-4 bg-stone-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-800">No stationery products found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn't find any items matching your selected criteria. Try adjusting the search term or resetting your filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#173F5F] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#20639B] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => updateParam('page', String(Math.max(1, pageParam - 1)))}
                disabled={pageParam <= 1}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateParam('page', String(i + 1))}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    pageParam === i + 1
                      ? 'bg-[#173F5F] text-white'
                      : 'border border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => updateParam('page', String(Math.min(totalPages, pageParam + 1)))}
                disabled={pageParam >= totalPages}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>

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
