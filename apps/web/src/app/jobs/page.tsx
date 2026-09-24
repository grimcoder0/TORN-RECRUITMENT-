'use client';

import React, { useState } from 'react';
import { MatchModal } from '@/components/MatchModal';

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [trainingFilter, setTrainingFilter] = useState('ALL');

  const jobs = [
    {
      id: 1,
      title: 'Offshore Drilling Lead & Trainer',
      companyName: 'Apex Petroleum Corp',
      companyType: 'Oil Rig',
      stars: 10,
      salary: '$2,500,000 / day',
      openings: 2,
      trainingType: 'ROTATIONAL',
      trainingDesc: 'Rotational 3-Stage: Extraction (14d) -> Refinement (14d) -> Operations',
      status: 'DIRECTOR VERIFIED — ACTIVELY RECRUITING',
      statusType: 'verified',
      lastChecked: '3m ago',
      stats: { manual: 45000, int: 30000, end: 60000, minLevel: 30 },
      perks: 'Free daily training cans, top medical coverage, holiday bonuses',
    },
    {
      id: 2,
      title: 'Confectionery Logistics Coordinator',
      companyName: 'Sugar Rush Delights',
      companyType: 'Sweet Shop',
      stars: 10,
      salary: '$1,800,000 / day',
      openings: 1,
      trainingType: 'FREE',
      trainingDesc: 'Free Daily Director Train rotation',
      status: 'DIRECTOR VERIFIED — ACTIVELY RECRUITING',
      statusType: 'verified',
      lastChecked: 'Just now',
      stats: { manual: 20000, int: 35000, end: 25000, minLevel: 25 },
      perks: 'Candy perk usage allowed, flexible drug cooldowns',
    },
    {
      id: 3,
      title: 'Heavy Transport Hauler',
      companyName: 'Titan Freight & Logistics',
      companyType: 'Logistics',
      stars: 7,
      salary: '$1,200,000 / day',
      openings: 3,
      trainingType: 'PAID',
      trainingDesc: 'Paid training programs available upon request',
      status: 'TORN DISCOVERED',
      statusType: 'discovered',
      lastChecked: '14m ago',
      stats: { manual: 35000, int: 15000, end: 40000, minLevel: 20 },
      perks: 'Fast promotion to Fleet Captain',
    },
  ];

  const filtered = jobs.filter((j) => {
    if (typeFilter !== 'ALL' && j.companyType !== typeFilter) return false;
    if (trainingFilter !== 'ALL' && j.trainingType !== trainingFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Advanced Recruitment & Training Programs
            </div>
            <h1 className="text-3xl font-black text-white">Find Torn Jobs</h1>
            <p className="text-sm text-slate-400 mt-1">
              Filter positions by salary, required work stats, and training models (Free, Rotational, Paid).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Company Types</option>
              <option value="Oil Rig">Oil Rig</option>
              <option value="Sweet Shop">Sweet Shop</option>
              <option value="Logistics">Logistics</option>
            </select>

            <select
              value={trainingFilter}
              onChange={(e) => setTrainingFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Training Types</option>
              <option value="ROTATIONAL">Rotational Training Programs</option>
              <option value="FREE">Free Training</option>
              <option value="PAID">Paid Training</option>
            </select>

            <a
              href="/"
              className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      job.statusType === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-xs text-slate-500">Checked: {job.lastChecked}</span>
                </div>
                <span className="text-sm font-black text-emerald-400">{job.salary}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-amber-300 font-semibold">{job.companyName}</span> • {job.companyType} ({'★'.repeat(job.stars)}) • {job.openings} Openings
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Training Program:</span>
                  <span className="text-amber-400 font-medium">{job.trainingDesc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stat Requirements:</span>
                  <span className="text-slate-200">
                    MAN: {job.stats.manual.toLocaleString()} | INT: {job.stats.int.toLocaleString()} | END: {job.stats.end.toLocaleString()} (Min Lvl {job.stats.minLevel})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Benefits & Perks:</span>
                  <span className="text-slate-300">{job.perks}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  Test Auto-Match with Your Stats ⚡
                </button>
                <a
                  href="https://www.torn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                >
                  Apply Directly in Torn →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedJob && (
        <MatchModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          jobTitle={selectedJob.title}
          companyName={selectedJob.companyName}
        />
      )}
    </div>
  );
}
