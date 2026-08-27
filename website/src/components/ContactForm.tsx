'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-8 space-y-5 shadow-xl h-fit">
      <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
        <Mail className="w-5 h-5 text-teal-400" />
        <span>Send Us a Message</span>
      </h3>

      {submitted ? (
        <div className="bg-emerald-950/40 border border-emerald-800 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
          <h4 className="text-white font-bold text-lg">Message Sent!</h4>
          <p className="text-slate-400 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
            className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold underline underline-offset-4 mt-2"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-slate-300">Your Name</label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-300">Your Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. user@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-slate-300">Message / Inquiry</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Type your message here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition leading-relaxed resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition border border-emerald-400/40"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Submit Message</span>
          </button>
        </form>
      )}
    </div>
  );
}