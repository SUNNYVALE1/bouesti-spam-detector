'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, GripHorizontal, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_SYSTEM_PROMPT } from '@/lib/projectKnowledge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hi! I am the **BOUESTI Project Assistant**. Ask me anything about this spam detection project — the students, the ML models, how it works, the accuracy, or the dataset!',
};

const SUGGESTED_QUESTIONS = [
  'Who built this project?',
  'What accuracy did the best model achieve?',
  'How does spam detection work?',
  'Why was Logistic Regression chosen?',
  'What is the Enron dataset?',
];

const WORKER_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || '';
const MODEL = '@cf/meta/llama-3.1-8b-fast-v2';
const MAX_INPUT_LENGTH = 500;
const MAX_HISTORY_PAIRS = 10; // keep last 10 user+assistant pairs

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || isLoading) return;

    if (!WORKER_URL) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userText },
        { role: 'assistant', content: 'The AI service is currently unavailable. Please check back shortly or explore the project pages directly.' },
      ]);
      return;
    }

    const userMsg: Message = { role: 'user', content: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Cap history: keep welcome message + last MAX_HISTORY_PAIRS pairs
      const conversationHistory = newMessages.slice(1); // skip welcome
      const cappedHistory = conversationHistory.slice(-(MAX_HISTORY_PAIRS * 2));

      const apiMessages = [
        { role: 'system', content: PROJECT_SYSTEM_PROMPT },
        ...cappedHistory.map((m) => ({ role: m.role, content: m.content })),
      ];

      const res = await fetch(`${WORKER_URL}/${MODEL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`AI service returned status ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.result?.response ||
        'I received your message but could not generate a response. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      const isNetworkError = err instanceof TypeError;
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isNetworkError
            ? 'I could not connect to the AI service. Please check your internet connection and try again.'
            : 'The AI service encountered an error. Please try again in a moment.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const charsLeft = MAX_INPUT_LENGTH - input.length;
  const isNearLimit = charsLeft <= 80;
  const isAtLimit = charsLeft <= 0;

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Project Assistant"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles size={18} />
            <span className="text-sm hidden sm:inline">Ask AI</span>
            <MessageCircle size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={{ left: -800, right: 0, top: -600, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' }}
            transition={{ duration: 0.2 }}
            style={{ touchAction: 'none' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-72 sm:w-96 h-[520px] max-h-[82vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-b border-slate-700 flex-shrink-0 cursor-grab active:cursor-grabbing select-none group">
              <GripHorizontal className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-100 leading-none">BOUESTI Assistant</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Powered by Cloudflare AI
                </p>
              </div>
              {/* Clear Chat */}
              <button
                onClick={clearChat}
                onPointerDown={(e) => e.stopPropagation()}
                className="text-slate-500 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-700/60"
                aria-label="Clear conversation"
                title="Clear chat"
              >
                <RotateCcw size={15} />
              </button>
              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1 bg-slate-700/50 hover:bg-slate-700 rounded-lg"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className={'flex gap-2 ' + (msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                  <div className={'w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ' + (msg.role === 'assistant' ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-slate-700 border border-slate-600')}>
                    {msg.role === 'assistant' ? <Bot size={13} className="text-emerald-400" /> : <User size={13} className="text-slate-300" />}
                  </div>
                  <div className={'max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ' + (msg.role === 'assistant' ? 'bg-slate-800 text-slate-100 rounded-tl-sm border border-slate-700' : 'bg-emerald-500 text-slate-950 font-medium rounded-tr-sm')}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:my-1 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Bot size={13} className="text-emerald-400" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={13} className="text-emerald-400 animate-spin" />
                    <span className="text-xs text-slate-400">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions — show until user has had 2 exchanges */}
            {messages.length < 4 && (
              <div className="px-3 pb-2 flex-shrink-0">
                <p className="text-[10px] text-slate-500 mb-1.5 font-semibold uppercase tracking-wide">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-[11px] text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 rounded-lg px-2.5 py-1 transition-colors disabled:opacity-40"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 p-3 bg-slate-800 border-t border-slate-700 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  id="ai-chat-input"
                  name="ai-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  placeholder="Ask about the project..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isAtLimit}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
              {isNearLimit && (
                <p className={`text-[10px] text-right font-medium ${isAtLimit ? 'text-red-400' : 'text-amber-400'}`}>
                  {charsLeft} characters left
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}