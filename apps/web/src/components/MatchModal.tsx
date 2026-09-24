'use client';

import React from 'react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  userStats?: {
    level: number;
    manual: number;
    intelligence: number;
    endurance: number;
  };
}

export function MatchModal({ isOpen, onClose, jobTitle, companyName, userStats }: MatchModalProps) {
  if (!isOpen) return null;

  // Use actual user work stats if provided, or clean baseline defaults
  const level = userStats?.level || 1;
  const manual = userStats?.manual || 0;
  const intelligence = userStats?.intelligence || 0;
  const endurance = userStats?.endurance || 0;

  // Requirements for target job
  const reqLevel = 30;
  const reqManual = 45000;
  const reqInt = 30000;
  const reqEnd = 60000;

  const levelPassed = level >= reqLevel;
  const manualPassed = manual >= reqManual;
  const intPassed = intelligence >= reqInt;
  const endPassed = endurance >= reqEnd;

  const passedCount = [levelPassed, manualPassed, intPassed, endPassed].filter(Boolean).length;
  const matchPercentage = Math.round((passedCount / 4) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Actual Stat Match Evaluation</h3>
            <p className="text-xs text-slate-400">{jobTitle} at {companyName}</p>
          </div>
        </div>

        <div className="space-y-4 my-4">
          {/* User's Verified Live Stats */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-amber-400">
              Your Actual Torn Work Stats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>Level: <span className="font-bold text-white">{level}</span></div>
              <div>Manual Labor: <span className="font-mono text-white">{manual.toLocaleString()}</span></div>
              <div>Intelligence: <span className="font-mono text-white">{intelligence.toLocaleString()}</span></div>
              <div>Endurance: <span className="font-mono text-white">{endurance.toLocaleString()}</span></div>
            </div>
            {!userStats && (
              <p className="text-[11px] text-amber-400/80 pt-1">
                *Link your Torn API key on the homepage to populate your real live stats automatically.
              </p>
            )}
          </div>

          {/* Breakdown Against Job Requirements */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Requirement Breakdown</h4>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${matchPercentage === 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {matchPercentage}% Matched
              </span>
            </div>

            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Level (Min {reqLevel}):</span>
                {levelPassed ? (
                  <span className="text-emerald-400 font-semibold">✓ Met</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Deficit (-{reqLevel - level})</span>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Manual ({reqManual.toLocaleString()}):</span>
                {manualPassed ? (
                  <span className="text-emerald-400 font-semibold">✓ Met</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqManual - manual).toLocaleString()})</span>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Intelligence ({reqInt.toLocaleString()}):</span>
                {intPassed ? (
                  <span className="text-emerald-400 font-semibold">✓ Met</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqInt - intelligence).toLocaleString()})</span>
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-400">Endurance ({reqEnd.toLocaleString()}):</span>
                {endPassed ? (
                  <span className="text-emerald-400 font-semibold">✓ Met</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqEnd - endurance).toLocaleString()})</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            Close
          </button>
          <a
            href="https://www.torn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
          >
            Apply Directly in Torn →
          </a>
        </div>
      </div>
    </div>
  );
}
