'use client';

import React, { useState, useCallback } from 'react';
import {
  ShieldAlert, CheckCircle2, AlertTriangle, FileText, Upload,
  RefreshCw, Sparkles, ChevronDown, ChevronUp, Download,
  X, AlertCircle, Info
} from 'lucide-react';
import Papa from 'papaparse';

interface ClassificationResult {
  prediction: 'Spam' | 'Ham';
  confidence: number;
  probability: number;
  indicators: { word: string; weight: number }[];
  processedText: string;
}

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

const SAMPLE_EMAILS = [
  {
    label: 'Sample 1 — Advertising Spam (Lottery Scam)',
    value: "Subject: Congratulations!!! You Won $1,000,000!!!\n\nDear Winner, CONGRATULATIONS!!! You have been selected as the lucky winner of our international lottery draw! You have won ONE MILLION DOLLARS!!! To claim your prize, please send us your bank account details and a small processing fee of $500. Act now! This offer expires in 24 hours!!! Click here now: http://fake-lottery-scam.com/claim"
  },
  {
    label: 'Sample 2 — Phishing Email (Account Suspension)',
    value: "Subject: URGENT: Your Account Will Be Suspended\n\nDear Valued Customer, We have detected unusual activity on your account. Your account will be suspended within 24 hours if you do not verify your information immediately. Please click the link below and enter your login credentials to restore access: http://fake-bank-login.com/verify"
  },
  {
    label: 'Sample 3 — Legitimate Work Email',
    value: "Subject: Project Update - Q3 Marketing Campaign\n\nHi Team, I hope this email finds you well. I wanted to share the latest updates on our Q3 marketing campaign. The creative assets have been finalized and approved by the design team. We are on track to launch next Monday as scheduled."
  },
  {
    label: 'Sample 4 — Order Confirmation',
    value: "Subject: Your Order #12345 Has Been Shipped\n\nHi John, Thank you for your purchase! Your order #12345 has been shipped and is on its way. Tracking Number: 1Z999AA10123456784. Estimated Delivery: August 12, 2026."
  }
];

let toastCounter = 0;

export default function ClassifierWidget() {
  const [emailInput, setEmailInput] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [showPreprocessed, setShowPreprocessed] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [batchRowCount, setBatchRowCount] = useState(0);
  const [batchResults, setBatchResults] = useState<{ total: number; spam: number; ham: number; data: any[] } | null>(null);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const showToast = useCallback((type: Toast['type'], title: string, message: string) => {
    const id = ++toastCounter;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const classifyText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    if (text.length > 50000) {
      showToast('error', 'Input Too Long', 'Your email exceeds the 50,000 character limit. Please shorten it.');
      return;
    }
    setIsClassifying(true);
    setResult(null);
    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: text })
      });
      if (res.ok) {
        const data: ClassificationResult = await res.json();
        setResult(data);
        if (data.prediction === 'Spam') {
          showToast('error', 'Spam Detected', `Classified as SPAM with ${data.confidence}% confidence.`);
        } else {
          showToast('success', 'Legitimate Email', `Classified as HAM with ${data.confidence}% confidence.`);
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast('error', 'Classification Failed', errData.error || 'The server returned an error. Please try again.');
      }
    } catch {
      showToast('error', 'Network Error', 'Could not reach the classification server. Check your connection.');
    } finally {
      setIsClassifying(false);
    }
  }, [showToast]);

  const handleClassify = () => classifyText(emailInput);

  const handleClear = () => {
    setEmailInput('');
    setResult(null);
    setShowPreprocessed(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsBatchProcessing(true);
    setBatchResults(null);
    setBatchRowCount(0);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (parsed) => {
        const rows = parsed.data as any[];
        setBatchRowCount(rows.length);

        if (rows.length === 0) {
          showToast('error', 'Empty File', 'The CSV file contains no data rows.');
          setIsBatchProcessing(false);
          return;
        }
        if (rows.length > 5000) {
          showToast('error', 'File Too Large', `Max 5,000 rows allowed. Your file has ${rows.length.toLocaleString()} rows.`);
          setIsBatchProcessing(false);
          return;
        }

        showToast('info', 'Processing Started', `Classifying ${rows.length.toLocaleString()} emails — please wait.`);
        const emails = rows.map((row) => row.email || row.text || row.message || Object.values(row).join(' '));

        try {
          const res = await fetch('/api/batch-classify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emails })
          });
          if (res.ok) {
            const data = await res.json();
            const processedData = rows.map((row, i) => {
              const apiResult = data.results[i] || { prediction: 'Unknown', confidence: 0 };
              return { ...row, 'Predicted Class': apiResult.prediction, 'Confidence (%)': apiResult.confidence };
            });
            setBatchResults({ total: data.total, spam: data.spamCount, ham: data.hamCount, data: processedData });
            const spamPct = Math.round((data.spamCount / data.total) * 100);
            showToast('success', 'Batch Complete', `Processed ${data.total.toLocaleString()} emails — ${data.spamCount} spam (${spamPct}%), ${data.hamCount} legitimate.`);
          } else {
            const errData = await res.json().catch(() => ({}));
            showToast('error', 'Batch Failed', errData.error || 'Server error during batch processing.');
          }
        } catch {
          showToast('error', 'Network Error', 'Could not reach the batch server. Check your connection.');
        } finally {
          setIsBatchProcessing(false);
        }
      },
      error: () => {
        showToast('error', 'CSV Parse Error', 'Could not read the file. Make sure it is a valid CSV.');
        setIsBatchProcessing(false);
      }
    });
  };

  const downloadBatchCSV = () => {
    if (!batchResults) return;
    const csv = Papa.unparse(batchResults.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'spam_classification_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('success', 'Download Started', 'Your results CSV is downloading now.');
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 space-y-8 sm:space-y-12">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 w-80 max-w-[calc(100vw-2rem)] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-2xl animate-fade-in text-sm ${
              toast.type === 'success' ? 'bg-emerald-950/95 border-emerald-700/60 text-emerald-100'
              : toast.type === 'error'  ? 'bg-red-950/95 border-red-700/60 text-red-100'
              : 'bg-blue-950/95 border-blue-700/60 text-blue-100'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {toast.type === 'error'   && <AlertCircle  className="w-4 h-4 text-red-400" />}
              {toast.type === 'info'    && <Info         className="w-4 h-4 text-blue-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs tracking-wide">{toast.title}</p>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button onClick={() => dismissToast(toast.id)} aria-label="Dismiss" className="shrink-0 text-slate-400 hover:text-white transition mt-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Single Email Classifier */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-xl">
        <div className="space-y-1.5 sm:space-y-2">
          <label htmlFor="sample-select" className="text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Or test with a sample email:</span>
          </label>
          <select
            id="sample-select"
            value={SAMPLE_EMAILS.find(s => s.value === emailInput) ? emailInput : ''}
            onChange={(e) => {
              if (e.target.value) {
                setEmailInput(e.target.value);
                setResult(null);
                classifyText(e.target.value);
              }
            }}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:border-emerald-500 transition truncate"
          >
            <option value="">-- Select a preset sample email --</option>
            {SAMPLE_EMAILS.map((sample, idx) => (
              <option key={idx} value={sample.value}>{sample.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <textarea
            aria-label="Email content"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Paste full email content here (subject line + email body)..."
            rows={6}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-500 transition leading-relaxed resize-y"
          />
          {emailInput.length > 40000 && (
            <p className="text-[11px] text-amber-400 font-medium">
              Warning: {emailInput.length.toLocaleString()} / 50,000 characters
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <button onClick={handleClear} className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-slate-800 transition flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleClassify}
            disabled={!emailInput.trim() || isClassifying}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition border border-emerald-400/40"
          >
            {isClassifying ? <span className="animate-pulse">Classifying...</span> : <><ShieldAlert className="w-4 h-4" /><span>Classify Email</span></>}
          </button>
        </div>
      </div>

      {/* Result Panel */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${result.prediction === 'Spam' ? 'bg-red-950/40 border-red-800/80 text-red-200' : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'}`}>
            <div className="flex items-center gap-3">
              {result.prediction === 'Spam' ? <ShieldAlert className="w-10 h-10 text-red-500 shrink-0" /> : <CheckCircle2 className="w-10 h-10 text-emerald-500 shrink-0" />}
              <div>
                <h3 className="text-2xl font-black tracking-wide">{result.prediction === 'Spam' ? '🚫 SPAM DETECTED' : '✅ LEGITIMATE EMAIL'}</h3>
                <p className="text-xs text-slate-300 mt-0.5">Confidence Score: <strong className="text-white font-bold">{result.confidence}%</strong></p>
              </div>
            </div>
            <div className="w-full sm:w-48 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold"><span>Confidence</span><span>{result.confidence}%</span></div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className={`h-full transition-all duration-500 ${result.prediction === 'Spam' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${result.confidence}%` }} />
              </div>
            </div>
          </div>

          {result.indicators.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><span>Trigger Words &amp; Key Features</span></h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {result.indicators.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 font-medium truncate">{item.word}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${item.weight > 0 ? 'bg-red-950 text-red-400 border border-red-800/60' : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'}`}>
                      {item.weight > 0 ? `+${item.weight.toFixed(2)}` : item.weight.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-slate-800/80 pt-4">
            <button onClick={() => setShowPreprocessed(!showPreprocessed)} className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition">
              {showPreprocessed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{showPreprocessed ? 'Hide Preprocessed Text' : 'View Cleaned Preprocessed Text'}</span>
            </button>
            {showPreprocessed && (
              <div className="mt-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                {result.processedText || 'No text remaining after cleaning.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Batch CSV Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Upload className="w-6 h-6 text-teal-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Batch CSV Email Classifier</h3>
            <p className="text-xs text-slate-400">Upload any CSV with an email, text, or message column. Max 5,000 rows per upload.</p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 text-center bg-slate-950/50 transition cursor-pointer relative z-0">
          <input type="file" accept=".csv" aria-label="Upload CSV file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          <div className="space-y-2 pointer-events-none">
            <FileText className="w-10 h-10 text-slate-500 mx-auto" />
            <div className="text-sm font-semibold text-slate-200">
              {isBatchProcessing ? `Classifying ${batchRowCount.toLocaleString()} emails — please wait...` : 'Click or Drag & Drop CSV file here'}
            </div>
            <div className="text-xs text-slate-500">Supports standard Enron or multi-row CSV files · Max 5,000 rows</div>
          </div>
        </div>

        {batchResults && (
          <div className="bg-slate-950 border border-emerald-800/40 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />Batch Processing Complete</h4>
                <p className="text-xs text-slate-400">
                  Processed <strong className="text-white">{batchResults.total.toLocaleString()}</strong> emails:{' '}
                  <strong className="text-red-400">{batchResults.spam.toLocaleString()} Spam</strong> detected,{' '}
                  <strong className="text-emerald-400">{batchResults.ham.toLocaleString()} Legitimate</strong>.
                </p>
              </div>
              <button onClick={downloadBatchCSV} className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-md shrink-0">
                <Download className="w-4 h-4" /><span>Download Results CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
