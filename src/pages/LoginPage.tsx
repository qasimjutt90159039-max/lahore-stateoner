import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, loginAsDemoAdmin, loginAsDemoCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) navigate('/account');
  };

  const handleDemoAdmin = async () => {
    setSubmitting(true);
    const ok = await loginAsDemoAdmin();
    setSubmitting(false);
    if (ok) navigate('/admin');
  };

  const handleDemoCustomer = async () => {
    setSubmitting(true);
    const ok = await loginAsDemoCustomer();
    setSubmitting(false);
    if (ok) navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider">
          Urdu Bazar Stationery Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
          Sign In to Your Account
        </h1>
        <p className="text-xs text-stone-500">
          Access your orders, saved addresses, and wholesale quotation requests.
        </p>
      </div>

      {/* One-Click Quick Login Buttons */}
      <div className="bg-[#FFFDF5] border border-amber-200 rounded-xl p-4 space-y-2.5">
        <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-700" /> Demo Quick Access:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDemoCustomer}
            disabled={submitting}
            className="bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold py-2 px-3 rounded-lg shadow-2xs flex items-center justify-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Demo Customer
          </button>
          <button
            type="button"
            onClick={handleDemoAdmin}
            disabled={submitting}
            className="bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-2xs flex items-center justify-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6C85F]" /> Demo Admin
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@domain.com"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#20639B] font-bold hover:underline">
            Create Customer Account
          </Link>
        </div>
      </div>
    </div>
  );
};
