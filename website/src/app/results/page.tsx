import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, BarChart3, CheckCircle2, ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Model Results & Performance | BOUESTI Spam Detection System',
  description: 'Detailed comparison of 4 machine learning models (Logistic Regression, SVM, Random Forest, Naive Bayes) evaluated on 33,716 Enron emails. Logistic Regression achieved 99.00% accuracy and 0.9896 F1-Score — selected as the deployed spam detection model.',
  openGraph: {
    title: 'ML Model Results | BOUESTI Spam Email Detection System',
    description: '4-model ML comparison: Logistic Regression 99.00%, SVM 98.95%, Random Forest 98.44%, Naive Bayes 98.39%. Full evaluation metrics and training plots.',
    type: 'website',
  },
};


// Hardcoded comparison metrics for all 4 models
const MODEL_COMPARISON_DATA = [
  {
    name: 'Logistic Regression',
    accuracy: '99.00%',
    precision: '98.57%',
    recall: '99.35%',
    f1Score: '0.9896',
    trainingTime: '5.18s',
    tp: 2896,
    tn: 3140,
    fp: 42,
    fn: 19,
    deployed: true
  },
  {
    name: 'Support Vector Machine',
    accuracy: '98.95%',
    precision: '98.57%',
    recall: '99.25%',
    f1Score: '0.9891',
    trainingTime: '9.15s',
    tp: 2893,
    tn: 3140,
    fp: 42,
    fn: 22,
    deployed: false
  },
  {
    name: 'Random Forest',
    accuracy: '98.44%',
    precision: '97.73%',
    recall: '99.04%',
    f1Score: '0.9838',
    trainingTime: '265.48s',
    tp: 2887,
    tn: 3115,
    fp: 67,
    fn: 28,
    deployed: false
  },
  {
    name: 'Multinomial Naive Bayes',
    accuracy: '98.39%',
    precision: '98.35%',
    recall: '98.28%',
    f1Score: '0.9832',
    trainingTime: '7.04s',
    tp: 2865,
    tn: 3134,
    fp: 48,
    fn: 50,
    deployed: false
  }
];

const CHARTS = [
  { title: '1. Model Metrics Comparison', file: '/results/metrics_comparison.png', desc: 'Comparison of Accuracy, Precision, Recall, and F1-Score across all 4 algorithms.' },
  { title: '2. Confusion Matrices', file: '/results/confusion_matrices.png', desc: 'True Positive, True Negative, False Positive, and False Negative counts for each model.' },
  { title: '3. ROC Curves & AUC Score', file: '/results/roc_curves.png', desc: 'Receiver Operating Characteristic curves showing false positive vs true positive rate tradeoffs.' },
  { title: '4. Training Time Comparison', file: '/results/training_time.png', desc: 'Execution time in seconds for model training and 5-fold cross-validation.' },
  { title: '5. Feature Importance & Top Words', file: '/results/feature_importance.png', desc: 'Top TF-IDF feature weights that indicate spam vs ham classification.' }
];

export default function ResultsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Model Performance & Results</h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Evaluation metrics and performance plots derived from training 4 machine learning models on 33,716 Enron emails with 5-fold cross-validation.
        </p>
      </div>

      {/* Best Model Highlight Box */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-600/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/40 px-3 py-1 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Selected Best Model for Deployment</span>
          </div>
          <h2 className="text-3xl font-black text-white">Logistic Regression</h2>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Selected for production deployment based on achieving the highest overall F1-Score (0.9896) and highest Accuracy (99.00%) with low false negative rates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto text-center shrink-0 z-10">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="text-2xl font-black text-blue-400">99.00%</div>
            <div className="text-xs text-slate-400 font-medium">Accuracy</div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-1">
            <div className="text-2xl font-black text-teal-400">0.9896</div>
            <div className="text-xs text-slate-400 font-medium">F1-Score</div>
          </div>
        </div>
      </div>

      {/* Model Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span>4-Model Algorithm Performance Comparison</span>
          </h3>
          <span className="text-xs text-slate-400">Test Split: 6,097 Emails</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3.5 px-4">Model Algorithm</th>
                <th className="py-3.5 px-4">Accuracy</th>
                <th className="py-3.5 px-4">Precision</th>
                <th className="py-3.5 px-4">Recall</th>
                <th className="py-3.5 px-4">F1-Score</th>
                <th className="py-3.5 px-4">Training Time</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {MODEL_COMPARISON_DATA.map((model, idx) => (
                <tr key={idx} className={`hover:bg-slate-800/40 transition ${model.deployed ? 'bg-blue-950/20' : ''}`}>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    {model.deployed && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                    <span>{model.name}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-100 font-bold">{model.accuracy}</td>
                  <td className="py-4 px-4 text-slate-300">{model.precision}</td>
                  <td className="py-4 px-4 text-slate-300">{model.recall}</td>
                  <td className="py-4 px-4 text-blue-400 font-bold">{model.f1Score}</td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-xs">{model.trainingTime}</td>
                  <td className="py-4 px-4">
                    {model.deployed ? (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        DEPLOYED
                      </span>
                    ) : (
                      <span className="bg-slate-800 text-slate-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        EVALUATED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Original PNG Charts Showcase */}
      <div className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-bold text-white">Python Training Visualizations & Plots</h3>
          <p className="text-sm text-slate-400 mt-1">
            Original graphical plot figures generated directly from the scikit-learn model evaluation pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CHARTS.map((chart, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">{chart.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{chart.desc}</p>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 flex items-center justify-center min-h-[260px] relative">
                <Image
                  src={chart.file}
                  alt={chart.title}
                  width={600}
                  height={400}
                  className="max-h-72 w-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

