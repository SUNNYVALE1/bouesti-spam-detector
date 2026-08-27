'use client';

import React from 'react';

// Seeded pseudo-random for SSR safety (no Math.random on server)
function sr(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  const r = x - Math.floor(x);
  return min + r * (max - min);
}

const ORBS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  cx: sr(i, 5, 95),
  cy: sr(i + 100, 5, 95),
  size: sr(i + 200, 2, 6),
  duration: sr(i + 300, 6, 14),
  delay: sr(i + 400, 0, 9),
  color: ['#10b981', '#34d399', '#f59e0b', '#6ee7b7', '#a78bfa', '#38bdf8'][i % 6],
  opacity: sr(i + 500, 0.12, 0.45),
}));

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-72 sm:h-80 lg:h-full min-h-[340px]">
      <style>{`
        @keyframes orb-float {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          50%  { transform: translate(18px,-45px) scale(1.1); }
          85%  { opacity: 1; }
          100% { transform: translate(-8px,-80px) scale(0.7); opacity: 0; }
        }
        @keyframes spam-fly-1 {
          0%        { transform: translateX(0) rotate(0deg);   opacity: 0; }
          10%       { opacity: 1; }
          48%       { transform: translateX(-138px) rotate(-8deg); opacity: 1; }
          56%       { transform: translateX(-145px) scale(1.3) rotate(-8deg); opacity: 0.7; }
          62%       { transform: translateX(-155px) scale(0);  opacity: 0; }
          100%      { transform: translateX(0) rotate(0deg);   opacity: 0; }
        }
        @keyframes spam-fly-2 {
          0%        { transform: translate(0,0) rotate(5deg);  opacity: 0; }
          15%       { opacity: 1; }
          52%       { transform: translate(-120px,18px) rotate(0deg); opacity: 1; }
          62%       { transform: translate(-127px,18px) scale(1.3);   opacity: 0.6; }
          68%       { transform: translate(-134px,18px) scale(0);      opacity: 0; }
          100%      { transform: translate(0,0) rotate(5deg);  opacity: 0; }
        }
        @keyframes spam-fly-3 {
          0%        { transform: translate(0,0);   opacity: 0; }
          20%       { opacity: 1; }
          56%       { transform: translate(-105px,28px); opacity: 1; }
          65%       { transform: translate(-112px,28px) scale(0); opacity: 0; }
          100%      { transform: translate(0,0);   opacity: 0; }
        }
        @keyframes x-pop-1 {
          0%,52%  { opacity: 0; transform: scale(0); }
          60%     { opacity: 1; transform: scale(1.3); }
          68%     { opacity: 1; transform: scale(1); }
          82%     { opacity: 0; transform: scale(0.4); }
          100%    { opacity: 0; }
        }
        @keyframes x-pop-2 {
          0%,64%  { opacity: 0; transform: scale(0); }
          72%     { opacity: 1; transform: scale(1.3); }
          80%     { opacity: 1; transform: scale(1); }
          92%     { opacity: 0; transform: scale(0.4); }
          100%    { opacity: 0; }
        }
        @keyframes x-pop-3 {
          0%,68%  { opacity: 0; transform: scale(0); }
          76%     { opacity: 1; transform: scale(1.3); }
          84%     { opacity: 1; transform: scale(1); }
          95%     { opacity: 0; }
          100%    { opacity: 0; }
        }
        @keyframes shield-pulse {
          0%,100% { filter: drop-shadow(0 0 7px #10b981) drop-shadow(0 0 14px #10b98150); transform: scale(1); }
          50%     { filter: drop-shadow(0 0 14px #10b981) drop-shadow(0 0 28px #10b98180); transform: scale(1.04); }
        }
        @keyframes person-stress {
          0%,100% { transform: translateY(0) rotate(0deg); }
          25%     { transform: translateY(-2px) rotate(-1.2deg); }
          75%     { transform: translateY(2px)  rotate(1.2deg); }
        }
        @keyframes sweat-drip {
          0%,40%  { transform: translateY(0); opacity: 0.9; }
          100%    { transform: translateY(8px); opacity: 0; }
        }
        @keyframes scan-line {
          0%   { top: -2px; opacity: 0.5; }
          100% { top: 100%;  opacity: 0; }
        }
        @keyframes dot-blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.2; }
        }
        @keyframes spark {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50%     { opacity: 0.2; transform: scale(0.5); }
        }
      `}</style>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
        {ORBS.map(o => (
          <div
            key={o.id}
            className="absolute rounded-full"
            style={{
              left: `${o.cx}%`,
              top:  `${o.cy}%`,
              width:  `${o.size}px`,
              height: `${o.size}px`,
              background: o.color,
              opacity: o.opacity,
              boxShadow: `0 0 ${o.size * 4}px ${o.color}`,
              animation: `orb-float ${o.duration}s ${o.delay}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Scene card */}
      <div className="absolute inset-3 sm:inset-5 bg-slate-900/75 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none z-10"
          style={{ animation: 'scan-line 4s linear infinite' }}
        />

        <svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

          {/* ── PERSON (left, stressed) ── */}
          <g style={{ animation: 'person-stress 1.8s ease-in-out infinite' }}>
            {/* Head */}
            <circle cx="62" cy="56" r="21" fill="#94a3b8" />
            {/* Eyes – worried */}
            <ellipse cx="55" cy="52" rx="3.2" ry="3.8" fill="#1e293b" />
            <ellipse cx="69" cy="52" rx="3.2" ry="3.8" fill="#1e293b" />
            {/* Eye glint */}
            <circle cx="57" cy="50" r="1.2" fill="white" opacity="0.7" />
            <circle cx="71" cy="50" r="1.2" fill="white" opacity="0.7" />
            {/* Furrowed brows */}
            <path d="M50 43 Q57 40 61 43" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M63 43 Q67 40 74 43" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Worried mouth */}
            <path d="M55 66 Q62 62 69 66" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Sweat drop */}
            <g style={{ animation: 'sweat-drip 2s 0.5s ease-in infinite' }}>
              <path d="M78 48 Q80.5 44 83 48 Q83 53 78 53 Z" fill="#60a5fa" opacity="0.85"/>
            </g>

            {/* Body */}
            <rect x="44" y="80" width="36" height="46" rx="9" fill="#475569"/>

            {/* Left arm — raised to head */}
            <line x1="44" y1="92" x2="26" y2="62" stroke="#475569" strokeWidth="10" strokeLinecap="round"/>
            {/* Hand on forehead */}
            <circle cx="25" cy="59" r="8" fill="#94a3b8"/>

            {/* Right arm — hanging down */}
            <line x1="80" y1="92" x2="94" y2="114" stroke="#475569" strokeWidth="10" strokeLinecap="round"/>

            {/* Legs */}
            <line x1="55" y1="126" x2="49" y2="160" stroke="#475569" strokeWidth="10" strokeLinecap="round"/>
            <line x1="69" y1="126" x2="75" y2="160" stroke="#475569" strokeWidth="10" strokeLinecap="round"/>
          </g>

          {/* ── LAPTOP ── */}
          <rect x="36" y="143" width="52" height="32" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.8"/>
          <rect x="39"  y="146" width="46" height="26" rx="2" fill="#020617"/>
          {/* Screen glow lines */}
          <rect x="42" y="149" width="18" height="3" rx="1" fill="#10b981" opacity="0.85"/>
          <rect x="42" y="155" width="28" height="2" rx="1" fill="#334155" opacity="0.7"/>
          <rect x="42" y="160" width="22" height="2" rx="1" fill="#334155" opacity="0.4"/>
          {/* Cursor blink */}
          <rect x="62" y="149" width="2" height="3" rx="0.5" fill="#10b981" style={{ animation: 'dot-blink 1.1s ease-in-out infinite' }}/>
          {/* Base */}
          <rect x="32" y="175" width="60" height="4" rx="2" fill="#1e293b"/>
          <rect x="57" y="172" width="10" height="4" rx="1" fill="#1e293b"/>

          {/* ── SHIELD (center) ── */}
          <g style={{ animation: 'shield-pulse 2.2s ease-in-out infinite' }}>
            <path d="M150 42 L180 58 L180 108 Q180 138 150 152 Q120 138 120 108 L120 58 Z"
              fill="#052e16" stroke="#10b981" strokeWidth="2.5"/>
            {/* Inner ring */}
            <path d="M150 49 L174 63 L174 106 Q174 130 150 143 Q126 130 126 106 L126 63 Z"
              fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0.35"/>
            {/* Checkmark */}
            <path d="M137 97 L147 108 L165 86"
              stroke="#10b981" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </g>

          {/* Shield label */}
          <text x="150" y="165" textAnchor="middle" fill="#34d399" fontSize="7.5"
            fontFamily="monospace" fontWeight="bold" opacity="0.9">SPAM DETECTOR</text>

          {/* Sparks around shield */}
          {[
            { cx: 120, cy: 70, r: 2.2, delay: '0.2s' },
            { cx: 180, cy: 78, r: 2.5, delay: '0.6s' },
            { cx: 134, cy: 150, r: 2, delay: '0.9s' },
            { cx: 168, cy: 44, r: 1.8, delay: '0.4s' },
            { cx: 118, cy: 110, r: 1.5, delay: '1.1s' },
            { cx: 183, cy: 118, r: 2, delay: '0.7s' },
          ].map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#10b981"
              style={{ animation: `spark 1.4s ${s.delay} ease-in-out infinite` }}/>
          ))}

          {/* ── SPAM EMAILS ── */}
          {/* Email 1 */}
          <g style={{ animation: 'spam-fly-1 5s 0s infinite linear' }}>
            <g transform="translate(258,74)">
              <rect x="-20" y="-13" width="40" height="26" rx="3.5" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5"/>
              <polyline points="-20,-13 0,5 20,-13" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
              <text x="0" y="10" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">SPAM</text>
            </g>
          </g>
          <g transform="translate(127,78)" style={{ animation: 'x-pop-1 5s 0s infinite' }}>
            <circle cx="0" cy="0" r="11" fill="#dc2626"/>
            <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </g>

          {/* Email 2 */}
          <g style={{ animation: 'spam-fly-2 5s 1.6s infinite linear' }}>
            <g transform="translate(268,105)">
              <rect x="-20" y="-13" width="40" height="26" rx="3.5" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5"/>
              <polyline points="-20,-13 0,5 20,-13" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
              <text x="0" y="10" textAnchor="middle" fill="#fca5a5" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">SPAM</text>
            </g>
          </g>
          <g transform="translate(130,110)" style={{ animation: 'x-pop-2 5s 1.6s infinite' }}>
            <circle cx="0" cy="0" r="11" fill="#dc2626"/>
            <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </g>

          {/* Email 3 (phishing) */}
          <g style={{ animation: 'spam-fly-3 5s 3.2s infinite linear' }}>
            <g transform="translate(262,56)">
              <rect x="-20" y="-13" width="40" height="26" rx="3.5" fill="#7c2d12" stroke="#f97316" strokeWidth="1.5"/>
              <polyline points="-20,-13 0,5 20,-13" fill="none" stroke="#f97316" strokeWidth="1.5"/>
              <text x="0" y="10" textAnchor="middle" fill="#fdba74" fontSize="6" fontWeight="bold" fontFamily="sans-serif">PHISH</text>
            </g>
          </g>
          <g transform="translate(126,88)" style={{ animation: 'x-pop-3 5s 3.2s infinite' }}>
            <circle cx="0" cy="0" r="11" fill="#ea580c"/>
            <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </g>

          {/* ── STATUS BADGE (top right) ── */}
          <rect x="208" y="10" width="85" height="28" rx="6" fill="#052e16" stroke="#10b981" strokeWidth="1.5"/>
          <circle cx="220" cy="24" r="4.5" fill="#10b981"
            style={{ animation: 'dot-blink 1.5s ease-in-out infinite' }}/>
          <text x="228" y="20" fill="#34d399" fontSize="7" fontFamily="monospace" fontWeight="bold">ACTIVE</text>
          <text x="228" y="30" fill="#6ee7b7" fontSize="6" fontFamily="monospace">99.00% accuracy</text>
        </svg>
      </div>
    </div>
  );
}