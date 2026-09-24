'use client';

import React, { useState } from 'react';

export default function CompaniesDirectoryPage() {
  const [starFilter, setStarFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const companies = [
    {
      id: 84920,
      name: 'Apex Petroleum Corp',
      type: 'Oil Rig',
      stars: 10,
      capacity: 20,
      employees: 18,
      vacancies: 2,
      director: 'ShadowBroker [2841920]',
      dailyIncome: '$24,500,000',
      status: 'TORN DISCOVERED',
      statusType: 'discovered',
      lastSynced: '4m ago',
    },
    {
      id: 91024,
      name: 'Sugar Rush Delights',
      type: 'Sweet Shop',
      stars: 10,
      capacity: 15,
      employees: 14,
      vacancies: 1,
      director: 'CandyQueen [1940121]',
      dailyIncome: '$12,800,000',
      status: 'DIRECTOR VERIFIED — ACTIVELY RECRUITING',
      statusType: 'verified',
      lastSynced: 'Just now',
    },
    {
      id: 74211,
      name: 'Titan Freight & Logistics',
      type: 'Logistics Management',
      stars: 7,
      capacity: 16,
      employees: 13,
      vacancies: 3,
      director: 'IronHauler [302910]',
      dailyIncome: '$9,200,000',
      status: 'TORN DISCOVERED',
      statusType: 'discovered',
      lastSynced: '18m ago',
    },
    {
      id: 61840,
      name: 'Velvet Lounge & Club',
      type: 'Pub',
      stars: 10,
      capacity: 10,
      employees: 10,
      vacancies: 0,
      director: 'NightOwl [819230]',
      dailyIncome: '$7,500,000',
      status: 'NO OPENINGS',
      statusType: 'full',
      lastSynced: '1h ago',
    },
  ];

  const filtered = companies.filter((c) => {
    if (starFilter !== 'ALL' && c.stars !== Number(starFilter)) return false;
    if (statusFilter === 'OPEN' && c.vacancies === 0) return false;
    if (statusFilter === 'VERIFIED' && c.statusType !== 'verified') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Torn API v2 Discovery Directory
            </div>
            <h1 className="text-3xl font-black text-white">Torn Company Directory</h1>
            <p className="text-sm text-slate-400 mt-1">
              Browse discovered and director-verified companies across Torn City.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Star Ratings</option>
              <option value="10">10 Stars ★★★★★</option>
              <option value="7">7+ Stars</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Opportunities</option>
              <option value="OPEN">Open Positions Detected</option>
              <option value="VERIFIED">Director Verified Only</option>
            </select>

            <a
              href="/"
              className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    c.statusType === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : c.statusType === 'discovered'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {c.status}
                </span>
                <span className="text-xs text-slate-500">Last checked: {c.lastSynced}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {c.name}
                  <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-normal">
                    {'★'.repeat(c.stars)}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">{c.type} • Director: {c.director}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                <div>
                  <div className="text-xs text-slate-500">Capacity</div>
                  <div className="text-sm font-bold text-slate-200">{c.capacity}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Employees</div>
                  <div className="text-sm font-bold text-slate-200">{c.employees}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Vacancies</div>
                  <div className={`text-sm font-bold ${c.vacancies > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {c.vacancies > 0 ? `${c.vacancies} Open` : 'Full'}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-slate-400">
                  Est. Daily Income: <span className="font-semibold text-slate-200">{c.dailyIncome}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://www.torn.com/companies.php?step=profile&ID=${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Torn Page ↗
                  </a>
                  {c.vacancies > 0 && (
                    <button className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20">
                      Apply / Claim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
