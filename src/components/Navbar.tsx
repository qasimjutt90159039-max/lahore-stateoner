import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  Phone,
  Sparkles,
  Layers,
  ChevronDown,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useAuth } from '../context/AuthContext.js';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#173F5F] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#ED553B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
              Notice
            </span>
            <span className="truncate">
              Wholesale Stationery • Kabeer Street, Urdu Bazar Lahore • Cash on Delivery Available
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-200">
            <a
              href="tel:+923234304600"
              className="flex items-center gap-1.5 hover:text-[#F6C85F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F6C85F]" />
              <span>+92 323 4304600</span>
            </a>
            <span>|</span>
            <Link to="/wholesale" className="text-[#F6C85F] hover:underline font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Bulk Quote Request
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header / Logo & Actions */}
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-[#173F5F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo Branding */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#173F5F] leading-none">
              LAHORE STATIONERS MALL
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-stone-500 tracking-wider uppercase mt-1">
              Stationery • Wholesale • Office & School Supplies
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-6 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 140+ pens, notebooks, files, paper, brands..."
              className="w-full bg-[#F7F9FC] border border-stone-200 rounded-lg pl-3.5 pr-10 py-2 text-sm text-[#17202A] placeholder-stone-400 focus:outline-none focus:border-[#20639B] focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-500 hover:text-[#173F5F]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right Header Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-stone-600 hover:text-[#173F5F] hover:bg-stone-50 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#ED553B] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-1.5 p-2 rounded-lg text-stone-600 hover:text-[#173F5F] hover:bg-stone-50 transition-colors text-sm"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold">
                  {user ? user.name.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400 hidden xl:inline" />
              </button>

              {accountDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 text-xs font-medium"
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-stone-100">
                        <p className="font-bold text-stone-800 truncate">{user.name}</p>
                        <p className="text-stone-400 text-[11px] truncate">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Store Admin
                          </span>
                        )}
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700"
                      >
                        <UserIcon className="w-4 h-4 text-stone-400" /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 text-stone-700"
                      >
                        <Package className="w-4 h-4 text-stone-400" /> My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-amber-50 text-[#173F5F] font-bold border-t border-stone-100"
                        >
                          <Settings className="w-4 h-4 text-amber-600" /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setAccountDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 border-t border-stone-100"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-stone-500 border-b border-stone-100">
                        Welcome to Lahore Stationers
                      </div>
                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-stone-50 font-bold text-[#173F5F]"
                      >
                        Customer Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-stone-50 text-stone-700"
                      >
                        Create Account
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-amber-50 text-amber-800 font-semibold border-t border-stone-100"
                      >
                        Admin Portal Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon with Counter */}
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-[#173F5F] hover:bg-[#20639B] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#F6C85F] text-[#173F5F] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Primary Navigation Bar */}
      <nav className="hidden lg:block bg-white border-b border-stone-200 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1 font-semibold text-stone-700">
            <li>
              <Link to="/" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/school-supplies" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                School Supplies
              </Link>
            </li>
            <li>
              <Link to="/office-supplies" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Office Supplies
              </Link>
            </li>
            <li>
              <Link to="/writing" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Writing
              </Link>
            </li>
            <li>
              <Link to="/art-craft" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Art & Craft
              </Link>
            </li>
            <li>
              <Link to="/paper" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Paper
              </Link>
            </li>
            <li>
              <Link to="/files-folders" className="px-3 py-2.5 hover:text-[#20639B] transition-colors inline-block">
                Files & Folders
              </Link>
            </li>
            <li>
              <Link
                to="/wholesale"
                className="px-3 py-2.5 text-[#173F5F] bg-[#FFF9DB] hover:bg-[#F6C85F]/40 transition-colors inline-flex items-center gap-1.5 rounded-sm my-1 font-bold"
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" /> Wholesale Portal
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 text-xs font-semibold text-stone-500">
            <Link to="/about" className="hover:text-[#173F5F]">About</Link>
            <Link to="/faq" className="hover:text-[#173F5F]">FAQ</Link>
            <Link to="/contact" className="hover:text-[#173F5F]">Contact</Link>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] bottom-0 bg-white z-50 overflow-y-auto border-t border-stone-200 p-4 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, SKU..."
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg pl-3.5 pr-10 py-2.5 text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="space-y-1 font-semibold text-stone-800">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Shop All (140+ Products)
            </Link>
            <Link
              to="/wholesale"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-[#FFF9DB] text-amber-900 font-bold"
            >
              Wholesale Portal & Bulk Quotations
            </Link>
            <div className="pt-2 pb-1 text-xs font-bold text-stone-400 uppercase tracking-wider px-3">
              Categories
            </div>
            <Link to="/school-supplies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              School Supplies
            </Link>
            <Link to="/office-supplies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              Office Supplies
            </Link>
            <Link to="/writing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              Pens & Writing
            </Link>
            <Link to="/art-craft" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              Art & Craft
            </Link>
            <Link to="/paper" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              Paper Products
            </Link>
            <Link to="/files-folders" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-stone-100">
              Files & Folders
            </Link>

            <div className="pt-4 border-t border-stone-200 space-y-1 text-sm text-stone-600">
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2">About Store</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2">Contact Urdu Bazar</Link>
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2">FAQs</Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[#173F5F] font-bold">Admin Panel</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
