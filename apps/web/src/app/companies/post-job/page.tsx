'use client';

import React, { useState } from 'react';

interface TrainingStageItem {
  stage: number;
  position: string;
  durationDays: number;
  targetGain: string;
}

export default function PostJobPage() {
  const [positionTitle, setPositionTitle] = useState('');
  const [openings, setOpenings] = useState(1);
  const [salary, setSalary] = useState(2500000);
  const [trainingModel, setTrainingModel] = useState<'NO_TRAINING' | 'FREE_TRAINING' | 'PAID_TRAINING' | 'ROTATIONAL_TRAINING'>('ROTATIONAL_TRAINING');
  const [minLevel, setMinLevel] = useState(30);
  const [manual, setManual] = useState(45000);
  const [intelligence, setIntelligence] = useState(30000);
  const [endurance, setEndurance] = useState(60000);
  const [benefits, setBenefits] = useState('Free daily training cans, top medical perks');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic Multi-stage Rotational Training (Section 13)
  const [stages, setStages] = useState<TrainingStageItem[]>([
    { stage: 1, position: 'Junior Extractor', durationDays: 14, targetGain: '+3,500 MAN' },
    { stage: 2, position: 'Technical Refiner', durationDays: 14, targetGain: '+3,500 INT' },
    { stage: 3, position: 'Offshore Senior Specialist', durationDays: 28, targetGain: '+7,000 END' },
  ]);

  const addStage = () => {
    setStages([
      ...stages,
      {
        stage: stages.length + 1,
        position: `Stage ${stages.length + 1} Role`,
        durationDays: 14,
        targetGain: '+3,000 Stats',
      },
    ]);
  };

  const removeStage = (index: number) => {
    if (stages.length <= 1) return;
    setStages(stages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Director Recruitment Hub (Section 12 & 13)
            </div>
            <h1 className="text-3xl font-black text-white">Post Director-Verified Job Listing</h1>
            <p className="text-sm text-slate-400 mt-1">
              Create an enhanced vacancy listing with custom salary, minimum requirements, and multi-stage rotational training.
            </p>
          </div>
          <a
            href="/jobs"
            className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
          >
            ← Back to Jobs
          </a>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto border border-emerald-500/40">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Job Listing Published Successfully!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your position <span className="font-bold text-amber-300">{positionTitle || 'Offshore Specialist'}</span> is now active with status <span className="text-emerald-400 font-bold">DIRECTOR VERIFIED — ACTIVELY RECRUITING</span>.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="/jobs"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
              >
                View on Jobs Board →
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 text-slate-300"
              >
                Post Another Job
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Position & Openings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title / Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Drilling Engineer"
                    value={positionTitle}
                    onChange={(e) => setPositionTitle(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Open Positions</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={openings}
                    onChange={(e) => setOpenings(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Daily Salary ($)</label>
                  <input
                    type="number"
                    step="100000"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Training Model (Section 13)</label>
                  <select
                    value={trainingModel}
                    onChange={(e: any) => setTrainingModel(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="ROTATIONAL_TRAINING">Rotational Training (Multi-Stage)</option>
                    <option value="FREE_TRAINING">Free Training (Daily)</option>
                    <option value="PAID_TRAINING">Paid Training</option>
                    <option value="NO_TRAINING">No Training Provided</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rotational Training Config */}
            {trainingModel === 'ROTATIONAL_TRAINING' && (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                      Rotational Training Stages (Section 13)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Flexible sequential career progression through company positions</p>
                  </div>
                  <button
                    type="button"
                    onClick={addStage}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                  >
                    + Add Stage
                  </button>
                </div>

                <div className="space-y-3">
                  {stages.map((stg, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                        S{stg.stage}
                      </span>
                      <div className="flex-1 w-full">
                        <label className="text-[10px] text-slate-500 block mb-0.5">Stage Role</label>
                        <input
                          type="text"
                          value={stg.position}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].position = e.target.value;
                            setStages(updated);
                          }}
                          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        />
                      </div>
                      <div className="w-full md:w-36">
                        <label className="text-[10px] text-slate-500 block mb-0.5">Duration (Days)</label>
                        <input
                          type="number"
                          value={stg.durationDays}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].durationDays = Number(e.target.value);
                            setStages(updated);
                          }}
                          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        />
                      </div>
                      <div className="w-full md:w-44">
                        <label className="text-[10px] text-slate-500 block mb-0.5">Expected Gain</label>
                        <input
                          type="text"
                          value={stg.targetGain}
                          onChange={(e) => {
                            const updated = [...stages];
                            updated[idx].targetGain = e.target.value;
                            setStages(updated);
                          }}
                          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStage(idx)}
                        disabled={stages.length <= 1}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 mt-3 md:mt-3"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work Stat Requirements */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Statistical Job Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Min Level</label>
                  <input
                    type="number"
                    value={minLevel}
                    onChange={(e) => setMinLevel(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Req. Manual Labor</label>
                  <input
                    type="number"
                    step="1000"
                    value={manual}
                    onChange={(e) => setManual(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Req. Intelligence</label>
                  <input
                    type="number"
                    step="1000"
                    value={intelligence}
                    onChange={(e) => setIntelligence(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Req. Endurance</label>
                  <input
                    type="number"
                    step="1000"
                    value={endurance}
                    onChange={(e) => setEndurance(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Benefits & Company Perks</label>
                <textarea
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  className="w-full h-20 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href="/jobs"
                className="px-5 py-3 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                Publish Verified Job Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
