import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [companyName, setCompanyName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setSubmitting(true);
    const ok = await register({ name, email, password, phone, city, companyName });
    setSubmitting(false);
    if (ok) navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#20639B] uppercase tracking-wider">
          New Customer & Wholesale Buyer
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173F5F]">
          Create Your Account
        </h1>
        <p className="text-xs text-stone-500">
          Save your dispatch addresses and track your orders from Urdu Bazar Lahore.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tariq Mehmood"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Email Address <span className="text-red-500">*</span>
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
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0323 1234567"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lahore"
                className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              School / Business Name (Optional)
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Al-Hadi School or Individual"
              className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {submitting ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#20639B] font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
