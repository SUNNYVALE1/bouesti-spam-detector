import React from 'react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, Cpu, BarChart3, Database, CheckCircle2, Sparkles, AlertTriangle, Zap, Lock } from 'lucide-react';
import HeroAnimation from '@/components/HeroAnimation';

export const metadata: Metadata = {
  title: 'Home | BOUESTI Spam Email Detection System',
  description: 'A sophisticated machine learning system built for email classification and threat detection.',
};

export default function HomePage() {
  return (
    <PageTransition className="space-y-12 sm:space-y-20 pb-16">
      {/* 1. Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950/20 to-slate-950 pt-10 pb-14 sm:py-20 border-b border-emerald-900/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              {/* BOUESTI Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-950/90 border border-emerald-700/50 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-md">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <span className="truncate">BOUESTI B.Sc Computer Science Final Year Project</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
                Intelligent{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  Spam Email Detection
                </span>{' '}
                System
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-slate-300 max-w-xl leading-relaxed px-2 lg:px-0 mx-auto lg:mx-0">
                Machine Learning-Powered Classification for Secure Email Communication using TF-IDF Feature Extraction and High-Accuracy Supervised Classifiers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 pt-2">
                <Link
                  href="/classify"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition border border-emerald-400/30"
                >
                  <span>Try Classifier Now</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </Link>
                <Link
                  href="/results"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-800 transition flex items-center justify-center gap-2"
                >
                  <span>View Model Results</span>
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* Right: Animated Scene */}
            <div className="hidden lg:block h-[380px] xl:h-[420px]">
              <HeroAnimation />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Responsive Key Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">33,716</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Enron Emails Trained</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="text-2xl sm:text-4xl font-black text-amber-400">4 ML</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium font-medium">Algorithms Compared</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="text-2xl sm:text-4xl font-black text-teal-400">99.00%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium font-medium">Accuracy Achieved</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="text-2xl sm:text-4xl font-black text-emerald-300">&lt; 10ms</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium font-medium">Real-Time Latency</div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How The System Works</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            End-to-end natural language processing pipeline converting raw email content into accurate predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-400 font-bold">
              1
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">1. Input Email Text</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Paste email text or choose from preset phishing and legitimate work email test samples.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-amber-950 rounded-xl flex items-center justify-center text-amber-400 font-bold">
              2
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">2. Feature Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Text is cleaned, tokenized, lemmatized, and converted into 10,000 TF-IDF numerical feature vectors.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-teal-950 rounded-xl flex items-center justify-center text-teal-400 font-bold">
              3
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">3. Instant Prediction</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get immediate Spam vs. Legitimate status banner, confidence score meter, and highlighted trigger words.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Model Comparison Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Evaluated ML Models</h2>
            <p className="text-xs sm:text-sm text-slate-400">Trained on 33,716 Enron emails with 5-fold cross-validation.</p>
          </div>
          <Link href="/results" className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <span>See Full Results & Charts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-emerald-500/50 p-5 rounded-2xl space-y-2 relative shadow-lg">
            <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">DEPLOYED</span>
            <h4 className="font-bold text-base text-white">Logistic Regression</h4>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400"><span>Accuracy:</span><strong className="text-white">99.00%</strong></div>
              <div className="flex justify-between text-slate-400"><span>F1-Score:</span><strong className="text-emerald-400">0.9896</strong></div>
              <div className="flex justify-between text-slate-400"><span>Recall:</span><strong className="text-white">99.35%</strong></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-base text-white">Support Vector Machine</h4>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400"><span>Accuracy:</span><strong className="text-white">98.95%</strong></div>
              <div className="flex justify-between text-slate-400"><span>F1-Score:</span><strong className="text-slate-200">0.9891</strong></div>
              <div className="flex justify-between text-slate-400"><span>Recall:</span><strong className="text-white">99.25%</strong></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-base text-white">Random Forest</h4>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400"><span>Accuracy:</span><strong className="text-white">98.44%</strong></div>
              <div className="flex justify-between text-slate-400"><span>F1-Score:</span><strong className="text-slate-200">0.9838</strong></div>
              <div className="flex justify-between text-slate-400"><span>Recall:</span><strong className="text-white">99.04%</strong></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-base text-white">Multinomial Naive Bayes</h4>
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-400"><span>Accuracy:</span><strong className="text-white">98.39%</strong></div>
              <div className="flex justify-between text-slate-400"><span>F1-Score:</span><strong className="text-slate-200">0.9832</strong></div>
              <div className="flex justify-between text-slate-400"><span>Recall:</span><strong className="text-white">98.28%</strong></div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

