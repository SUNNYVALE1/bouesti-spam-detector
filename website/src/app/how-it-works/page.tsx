import React from 'react';
import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import { ArrowRight, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | BOUESTI Spam Email Detection System',
  description: 'Step-by-step breakdown of the spam email detection pipeline: raw email preprocessing, TF-IDF vectorization (10,000 features), Logistic Regression inference, and real-time prediction. Built on the Enron Spam Dataset with NLTK lemmatization.',
  openGraph: {
    title: 'How Spam Detection Works | BOUESTI ML Pipeline',
    description: 'NLP pipeline: Text cleaning → Stopword removal → TF-IDF features → Logistic Regression → Spam/Ham prediction. Detailed technical breakdown.',
    type: 'website',
  },
};



export default function HowItWorksPage() {
  return (
    <PageTransition className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">How The System Works</h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          An architectural breakdown of the natural language processing, TF-IDF feature extraction, and machine learning classification pipeline.
        </p>
      </div>

      {/* Pipeline Diagram Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-xl font-bold text-white text-center relative z-10">System Architecture Pipeline</h2>
        
        <style>{`
          @keyframes slide-fade-x {
            0% { transform: translateX(-6px); opacity: 0.2; }
            50% { transform: translateX(4px); opacity: 1; }
            100% { transform: translateX(-6px); opacity: 0.2; }
          }
          @keyframes slide-fade-y {
            0% { transform: translateY(-6px); opacity: 0.2; }
            50% { transform: translateY(4px); opacity: 1; }
            100% { transform: translateY(-6px); opacity: 0.2; }
          }
          .animate-flow-x { animation: slide-fade-x 2s infinite ease-in-out; }
          .animate-flow-y { animation: slide-fade-y 2s infinite ease-in-out; }
        `}</style>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center text-xs font-semibold uppercase tracking-wider relative z-10">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl w-full md:w-auto flex-1 space-y-1 relative group hover:border-emerald-500/30 transition-colors">
            <div className="text-emerald-400 font-bold text-sm">1. Raw Email</div>
            <div className="text-slate-500 font-mono text-[10px]">Subject & Body</div>
          </div>
          
          <div className="shrink-0 text-emerald-400 md:animate-flow-x animate-flow-y">
            <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl w-full md:w-auto flex-1 space-y-1 relative group hover:border-amber-500/30 transition-colors">
            <div className="text-amber-400 font-bold text-sm">2. Preprocessing</div>
            <div className="text-slate-500 font-mono text-[10px]">Clean & Lemmatize</div>
          </div>
          
          <div className="shrink-0 text-amber-400 md:animate-flow-x animate-flow-y" style={{ animationDelay: '0.4s' }}>
            <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </div>
          
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl w-full md:w-auto flex-1 space-y-1 relative group hover:border-teal-500/30 transition-colors">
            <div className="text-teal-400 font-bold text-sm">3. TF-IDF Vectors</div>
            <div className="text-slate-500 font-mono text-[10px]">10,000 Features</div>
          </div>
          
          <div className="shrink-0 text-teal-400 md:animate-flow-x animate-flow-y" style={{ animationDelay: '0.8s' }}>
            <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
          </div>
          
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl w-full md:w-auto flex-1 space-y-1 relative group hover:border-emerald-500/30 transition-colors">
            <div className="text-emerald-400 font-bold text-sm">4. ML Inference</div>
            <div className="text-slate-500 font-mono text-[10px]">Supervised Model</div>
          </div>
          
          <div className="shrink-0 text-emerald-400 md:animate-flow-x animate-flow-y" style={{ animationDelay: '1.2s' }}>
            <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          
          <div className="bg-emerald-950 border border-emerald-800 p-4 rounded-xl w-full md:w-auto flex-1 space-y-1 relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="text-emerald-300 font-bold text-sm">5. Prediction</div>
            <div className="text-slate-400 font-mono text-[10px]">Spam or Ham</div>
          </div>
        </div>
      </div>

      {/* Step Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center text-blue-400 font-bold text-base">
            1
          </div>
          <h3 className="text-lg font-bold text-white">Data Preprocessing</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>Emails are cleaned by stripping HTML tags, web URLs, email addresses, numbers, and special characters.</li>
            <li>Text is converted to lowercase and tokenized into individual word tokens.</li>
            <li>Common English stop words (e.g. &quot;the&quot;, &quot;is&quot;, &quot;at&quot;) are filtered out.</li>
            <li>Words are reduced to their base root form using NLTK WordNet lemmatization.</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-base">
            2
          </div>
          <h3 className="text-lg font-bold text-white">Feature Extraction (TF-IDF)</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>Term Frequency-Inverse Document Frequency (TF-IDF) converts text into numerical vectors.</li>
            <li>Important spam-related words receive high weights; frequent generic words receive low scores.</li>
            <li>Extracts unigrams and bigrams (single words and word pairs) for rich contextual understanding.</li>
            <li>Configured with a maximum vocabulary size of 10,000 features.</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 bg-teal-950 rounded-xl flex items-center justify-center text-teal-400 font-bold text-base">
            3
          </div>
          <h3 className="text-lg font-bold text-white">Machine Learning Models</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Multinomial Naive Bayes:</strong> Fast probabilistic classifier for text baselines.</li>
            <li><strong>Support Vector Machine (SVM):</strong> Geometric hyperplane classifier optimized for high dimensions.</li>
            <li><strong>Logistic Regression:</strong> Interpretable linear logit model selected for deployment.</li>
            <li><strong>Random Forest:</strong> Robust decision-tree ensemble algorithm.</li>
          </ul>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 bg-emerald-950 rounded-xl flex items-center justify-center text-emerald-400 font-bold text-base">
            4
          </div>
          <h3 className="text-lg font-bold text-white">Evaluation & Deployment</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>Trained using 5-fold cross-validation with 80% train, 10% validation, and 10% test split.</li>
            <li>Evaluated on Accuracy, Precision, Recall, F1-Score, ROC Curves, and Confusion Matrices.</li>
            <li>The best-performing model (Logistic Regression, F1: 0.9896) was selected for final web deployment.</li>
            <li>Predictions complete in under 10ms with confidence score calculations.</li>
          </ul>
        </div>
      </div>

      {/* Dataset Info Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Database className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Enron Spam Dataset Specifications</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-300 font-medium">
          <div className="space-y-1">
            <div className="text-slate-500 text-xs">Dataset Size</div>
            <div className="text-white font-bold text-base">33,716 Emails</div>
            <div className="text-xs text-slate-400">51% Spam (17,171) / 49% Ham (16,545)</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-500 text-xs">Data Split Strategy</div>
            <div className="text-white font-bold text-base">80% / 10% / 10%</div>
            <div className="text-xs text-slate-400">Training / Validation / Testing</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-500 text-xs">Preprocessed Clean Corpus</div>
            <div className="text-white font-bold text-base">30,483 Unique Emails</div>
            <div className="text-xs text-slate-400">3,222 duplicates removed</div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

