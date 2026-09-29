import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton.js';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message })
      });
      if (res.ok) {
        setSent(true);
      }
    } catch {
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#173F5F] tracking-tight">
          Contact Lahore Stationers Mall
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Wholesale and retail inquiries directly at Urdu Bazar, Lahore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#173F5F] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div>
              <span className="text-xs text-[#F6C85F] uppercase font-bold tracking-wider">
                Physical Location
              </span>
              <h2 className="text-xl font-bold mt-1">Lahore Stationers Mall</h2>
              <p className="text-xs text-stone-300 mt-1">Wholesale & Retail Stationery Distributor</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F6C85F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Urdu Bazar Address</p>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">
                    Kabeer Street, Urdu Bazar,<br />
                    Lahore 54000, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F6C85F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Store Phone</p>
                  <a href="tel:+923234304600" className="text-stone-200 hover:text-white font-mono text-sm block mt-0.5">
                    +92 323 4304600
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Email</p>
                  <p className="text-stone-400 mt-0.5 italic">Not publicly verified</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#F6C85F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Business Working Hours</p>
                  <p className="text-stone-300 mt-0.5">Monday to Saturday: 9:00 AM – 8:30 PM</p>
                  <p className="text-amber-300 text-[11px] mt-0.5 font-medium">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <WhatsAppButton
                type="general"
                label="Message on WhatsApp"
                className="w-full text-xs py-2.5"
              />
              <a
                href="tel:+923234304600"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-lg text-xs text-center transition-colors"
              >
                Call Store Desk: +92 323 4304600
              </a>
            </div>
          </div>

          {/* Urdu Bazar Heritage Card */}
          <div className="bg-[#FFFDF5] border border-amber-200 rounded-2xl p-6 text-xs text-stone-700 space-y-2">
            <h3 className="font-bold text-sm text-[#173F5F]">Market Note: Urdu Bazar Lahore</h3>
            <p className="leading-relaxed">
              Urdu Bazar is situated near Anarkali and Circular Road in Lahore. Parking for trucks and commercial cargo loaders is available through designated entry hours.
            </p>
          </div>
        </div>

        {/* Contact Form & Interactive Map Visual */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-xl font-bold text-[#173F5F]">Send an Online Message</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Have a question about specific stationery brands, carton packaging or delivery? Let us know.
            </p>
          </div>

          {sent ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">Message Delivered</h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Thank you for contacting Lahore Stationers Mall. Our Urdu Bazar counter representative will get back to you shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
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
                  Phone / WhatsApp Number
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
                  Message / Stationery Query <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify item requirements, quantity or delivery location..."
                  className="w-full bg-[#F7F9FC] border border-stone-300 rounded-lg px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#20639B] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#173F5F] hover:bg-[#20639B] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Sending Message...' : 'Send Message to Urdu Bazar'}
              </button>
            </form>
          )}

          {/* Location Map Illustration */}
          <div className="pt-4 border-t border-stone-100">
            <h3 className="font-bold text-xs text-stone-800 uppercase tracking-wider mb-2">
              Market Map & Vicinity
            </h3>
            <div className="h-48 rounded-xl bg-stone-100 border border-stone-200 relative overflow-hidden flex items-center justify-center p-4 text-center">
              <div className="space-y-1">
                <MapPin className="w-8 h-8 text-[#ED553B] mx-auto animate-bounce" />
                <p className="font-bold text-sm text-[#173F5F]">Kabeer Street, Urdu Bazar</p>
                <p className="text-xs text-stone-500">Lahore 54000, Punjab, Pakistan</p>
                <p className="text-[11px] text-stone-400">Convenient access via Circular Road & Anarkali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
