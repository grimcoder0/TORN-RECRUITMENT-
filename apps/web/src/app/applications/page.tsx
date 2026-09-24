'use client';

import React, { useState } from 'react';

export default function ApplicationsPage() {
  const [filter, setFilter] = useState('ALL');

  const applications = [
    {
      id: 'app-101',
      title: 'Offshore Drilling Specialist',
      organization: 'Apex Petroleum Corp (10★ Oil Rig)',
      type: 'COMPANY',
      directorOrLeader: 'ShadowBroker [2841920]',
      salaryOffered: '$2,500,000 / day',
      status: 'INTEREST REGISTERED',
      appliedAt: '2 hours ago',
      tornInstruction: 'Visit the official Torn Company page to submit your in-game application. Director has been alerted.',
      tornLink: 'https://www.torn.com/companies.php?step=profile&ID=84920',
    },
    {
      id: 'app-102',
      title: 'Ranked War Specialist',
      organization: 'Omega Syndicate [OMEGA]',
      type: 'FACTION',
      directorOrLeader: 'ApexWarlord [104921]',
      salaryOffered: 'War Pay + Cache Cuts',
      status: 'UNDER REVIEW BY LEADER',
      appliedAt: '1 day ago',
      tornInstruction: 'Leader viewed your stats match. Reach out on Torn mail or Discord to coordinate war loadout.',
      tornLink: 'https://www.torn.com/factions.php?step=profile&ID=12044',
    },
    {
      id: 'app-103',
      title: 'Confectionery Logistics',
      organization: 'Sugar Rush Delights (10★ Sweet Shop)',
      type: 'COMPANY',
      directorOrLeader: 'CandyQueen [1940121]',
      salaryOffered: '$1,800,000 / day',
      status: 'OFFER ACCEPTED',
      appliedAt: '3 days ago',
      tornInstruction: 'Hired in Torn! Active employment detected by sync engine.',
      tornLink: 'https://www.torn.com/companies.php?step=profile&ID=91024',
    },
  ];

  const filtered = applications.filter((app) => {
    if (filter === 'COMPANY' && app.type !== 'COMPANY') return false;
    if (filter === 'FACTION' && app.type !== 'FACTION') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Application & Interest Tracking
            </div>
            <h1 className="text-3xl font-black text-white">Your Applications & Interest</h1>
            <p className="text-sm text-slate-400 mt-1">
              Track your expressions of interest and official Torn application routes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('COMPANY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filter === 'COMPANY' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setFilter('FACTION')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  filter === 'FACTION' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Factions
              </button>
            </div>

            <a
              href="/"
              className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Home
            </a>
          </div>
        </div>

        {/* Section 26 Clarification Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-xs space-y-1">
          <p className="font-bold text-amber-300 flex items-center gap-2">
            <span>ℹ️</span> Native Application Protocol (Master Spec Section 26)
          </p>
          <p className="text-slate-400">
            Platform applications represent tracked interest and matching between players and directors/leaders. Official in-game joining is completed through Torn's native interface using the direct links provided below.
          </p>
        </div>

        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {app.status}
                  </span>
                  <span className="text-xs text-slate-500">Submitted: {app.appliedAt}</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">{app.salaryOffered}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{app.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="text-amber-300 font-semibold">{app.organization}</span> • Contact: {app.directorOrLeader}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p>{app.tornInstruction}</p>
                <a
                  href={app.tornLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 whitespace-nowrap shadow-sm shadow-amber-500/20"
                >
                  Complete in Torn ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
