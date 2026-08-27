'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-emerald-900/60 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden border-2 border-amber-500 shrink-0">
            <Image
              src="/bouesti-logo.jpg"
              alt="BOUESTI Logo"
              width={48}
              height={48}
              priority
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="leading-none font-black tracking-tight text-white text-sm sm:text-lg group-hover:text-emerald-400 transition">BOUESTI SPAM DETECTOR</span>
            <span className="text-[9px] sm:text-[11px] text-amber-400 font-semibold tracking-wide mt-0.5 sm:mt-1">Dept. of Computing & Info Science</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-200">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/classify" className="hover:text-emerald-400 transition">Classifier</Link>
          <Link href="/results" className="hover:text-emerald-400 transition">Model Results</Link>
          <Link href="/how-it-works" className="hover:text-emerald-400 transition">How It Works</Link>
          <Link href="/about" className="hover:text-emerald-400 transition">About</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>
        </nav>

        {/* Desktop CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/classify"
            className="hidden sm:flex bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5 border border-emerald-400/40"
          >
            <span>Classify Now</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition flex items-center justify-center"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-emerald-900/80 px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-1 font-semibold text-xs sm:text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              Home
            </Link>
            <Link
              href="/classify"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              Email Spam Classifier
            </Link>
            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              Model Results & Plots
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              How It Works
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              About Project & Team
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-slate-900 text-slate-200 hover:text-emerald-400 transition border-l-2 border-transparent hover:border-emerald-500"
            >
              Contact Team
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/classify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition border border-emerald-400/40"
            >
              <span>Classify Email Now</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-emerald-900/60 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 md:col-span-2">
            <div className="flex items-center gap-3 font-bold text-white text-base sm:text-lg">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-0.5 border border-amber-500 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                <Image src="/bouesti-logo.jpg" alt="BOUESTI Logo" width={40} height={40} className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-emerald-400 font-extrabold">BOUESTI Spam Email Detection System</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              An intelligent, machine learning-powered classification platform developed as a B.Sc Final Year Project in Computer Science at Bamidele Olumilua University of Education, Science and Technology, Ikere-Ekiti (BOUESTI).
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border-l-2 border-emerald-500 pl-2">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition">Home</Link></li>
              <li><Link href="/classify" className="hover:text-emerald-400 transition">Email Classifier</Link></li>
              <li><Link href="/results" className="hover:text-emerald-400 transition">Model Performance</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">About Project</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition">Contact Team</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border-l-2 border-amber-500 pl-2">
              Academic Credits
            </h4>
            <p className="text-xs text-slate-300 space-y-1 font-medium">
              <span className="block text-amber-400 font-bold">Supervised by: Mrs. Ariyo</span>
              <span className="block">Dept. of Computing & Information Science</span>
              <span className="block text-slate-400">BOUESTI, Ikere-Ekiti, Ekiti State</span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
          <p>© 2026 BOUESTI Computer Science Department. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
