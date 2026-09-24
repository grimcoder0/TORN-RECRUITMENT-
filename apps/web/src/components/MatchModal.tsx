'use client';

import React, { useState } from 'react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
}

export function MatchModal({ isOpen, onClose, jobTitle, companyName }: MatchModalProps) {
  const [level, setLevel] = useState(35);
  const [manual, setManual] = useState(52000);
  const [intelligence, setIntelligence] = useState(38000);
  const [endurance, setEndurance] = useState(65000);
  const [desiredSalary, setDesiredSalary] = useState(2000000);

  if (!isOpen) return null;

  const reqLevel = 30;
  const reqManual = 45000;
  const reqInt = 30000;
  const reqEnd = 60000;
  const offeredSalary = 2500000;

  const levelPassed = level >= reqLevel;
  const manualPassed = manual >= reqManual;
  const intPassed = intelligence >= reqInt;
  const endPassed = endurance >= reqEnd;
  const salaryPassed = offeredSalary >= desiredSalary;

  const passedCount = [levelPassed, manualPassed, intPassed, endPassed, salaryPassed].filter(Boolean).length;
  const totalCount = 5;
  const matchPercentage = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
            ⚡
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Transparent Opportunity Matching</h3>
            <p className="text-xs text-slate-400">{jobTitle} at {companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Adjust Your Work Stats</h4>
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Player Level:</span> <span className="font-semibold text-white">{level}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Manual Labor:</span> <span className="font-semibold text-white">{manual.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={manual}
                onChange={(e) => setManual(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Intelligence:</span> <span className="font-semibold text-white">{intelligence.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={intelligence}
                onChange={(e) => setIntelligence(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 flex justify-between">
                <span>Endurance:</span> <span className="font-semibold text-white">{endurance.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={endurance}
                onChange={(e) => setEndurance(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 mt-1"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Requirement Breakdown</h4>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${matchPercentage === 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {matchPercentage}% Matched
                </span>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Level (Min {reqLevel}):</span>
                  {levelPassed ? <span className="text-emerald-400 font-semibold">✓ Met ({level})</span> : <span className="text-rose-400 font-semibold">✗ Deficit (-{reqLevel - level})</span>}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Manual ({reqManual.toLocaleString()}):</span>
                  {manualPassed ? <span className="text-emerald-400 font-semibold">✓ Met</span> : <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqManual - manual).toLocaleString()})</span>}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Intelligence ({reqInt.toLocaleString()}):</span>
                  {intPassed ? <span className="text-emerald-400 font-semibold">✓ Met</span> : <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqInt - intelligence).toLocaleString()})</span>}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Endurance ({reqEnd.toLocaleString()}):</span>
                  {endPassed ? <span className="text-emerald-400 font-semibold">✓ Met</span> : <span className="text-rose-400 font-semibold">✗ Deficit (-{(reqEnd - endurance).toLocaleString()})</span>}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-400">Salary vs Expectation:</span>
                  {salaryPassed ? <span className="text-emerald-400 font-semibold">✓ Met (${offeredSalary.toLocaleString()})</span> : <span className="text-rose-400 font-semibold">✗ Below Expected</span>}
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              *Transparent matching provides full explanations of satisfied or deficit requirements without obscure scoring algorithms.
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
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
