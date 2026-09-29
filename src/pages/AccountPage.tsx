import React from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, Package, Heart, LogOut, MapPin, Phone, Building2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useWishlist } from '../context/WishlistContext.js';

export const AccountPage: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { wishlist } = useWishlist();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <UserIcon className="w-12 h-12 text-stone-400 mx-auto" />
        <h2 className="text-xl font-bold text-stone-800">Sign In to Your Account</h2>
        <p className="text-xs text-stone-500">Access your saved addresses, track shipments, and re-order supplies.</p>
        <Link to="/login" className="inline-block bg-[#173F5F] text-white text-xs font-bold px-5 py-2.5 rounded-lg">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F] tracking-tight">
          Customer Profile & Account
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Manage your Lahore Stationers Mall account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-12 h-12 rounded-full bg-[#173F5F] text-[#F6C85F] font-bold text-lg flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-sm text-stone-900 truncate">{user.name}</h2>
              <p className="text-xs text-stone-400 truncate">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Store Admin
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-stone-600">
            {user.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{user.address}, {user.city}</span>
              </div>
            )}
            {user.companyName && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-stone-400" />
                <span>{user.companyName}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 space-y-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="w-full bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#F6C85F]" /> Open Admin Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="w-full text-left text-xs font-semibold text-red-600 hover:bg-red-50 p-2.5 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out of Account
            </button>
          </div>
        </div>

        {/* Quick Nav Blocks */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/orders"
            className="bg-white rounded-xl border border-stone-200 p-5 hover:border-[#173F5F] transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#173F5F]/10 text-[#173F5F] flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-800">My Orders</h3>
              <p className="text-xs text-stone-500">Track shipments, view itemized receipts, and order statuses.</p>
            </div>
            <span className="text-xs text-[#20639B] font-bold mt-4 block">View History →</span>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white rounded-xl border border-stone-200 p-5 hover:border-[#173F5F] transition-all shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-stone-800">Saved Wishlist</h3>
              <p className="text-xs text-stone-500">{wishlist.length} stationery items saved for future purchase.</p>
            </div>
            <span className="text-xs text-[#20639B] font-bold mt-4 block">View Wishlist →</span>
          </Link>

          <Link
            to="/wholesale"
            className="bg-[#FFFDF5] rounded-xl border border-amber-200 p-5 hover:border-amber-400 transition-all shadow-xs flex flex-col justify-between sm:col-span-2"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-[#173F5F] text-[#F6C85F] px-2 py-0.5 rounded uppercase">
                Institutional & Wholesale
              </span>
              <h3 className="font-bold text-sm text-stone-900 mt-1">Need Bulk Supplies for a School or Office?</h3>
              <p className="text-xs text-stone-600">
                Submit an itemized bulk quotation request to receive factory-sealed carton pricing with cargo options across Pakistan.
              </p>
            </div>
            <span className="text-xs text-amber-800 font-bold mt-3 block">Request Wholesale Quote →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
