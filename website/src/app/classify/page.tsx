// Server Component — NO 'use client' here so Google can read the page content
import type { Metadata } from 'next';
import ClassifierWidget from './ClassifierWidget';

export const metadata: Metadata = {
  title: 'Email Spam Classifier | BOUESTI Spam Detection System',
  description: 'Test our machine learning spam classifier live. Paste any email text and instantly classify it as spam or legitimate using our 99% accurate Logistic Regression model trained on 33,716 Enron emails. Supports single email and bulk CSV classification.',
  keywords: [
    'spam email classifier', 'email spam detector online', 'machine learning spam filter',
    'BOUESTI spam detection', 'real-time email classifier', 'phishing email detector',
    'logistic regression email classifier', 'TF-IDF spam detection', 'NLP email classification'
  ],
  openGraph: {
    title: 'Live Email Spam Classifier | BOUESTI Spam Detection System',
    description: 'Classify any email as spam or legitimate in real-time. 99% accurate ML model built on 33,716 Enron emails.',
    type: 'website',
  },
};

export default function ClassifierPage() {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">

      {/* Static header — rendered on the server so Google can read it */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Email Spam Detector
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto px-2">
          Real-time supervised machine learning email classification. Paste any email text or run sample
          phishing tests. Powered by a Logistic Regression model achieving <strong className="text-emerald-400">99.00% accuracy</strong> on
          the Enron Spam Dataset (33,716 emails). Supports single email and batch CSV classification.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">✓ 99% Accuracy</span>
          <span className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">⚡ Under 10ms</span>
          <span className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">📊 Batch CSV Support</span>
          <span className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">🔬 TF-IDF Feature Extraction</span>
        </div>
      </div>

      {/* Interactive widget — client-side only (useState, fetch, etc.) */}
      <ClassifierWidget />
    </div>
  );
}
