'use client';

import React, { useState } from 'react';

export default function FactionsDirectoryPage() {
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const factions = [
    {
      id: 12044,
      name: 'Omega Syndicate',
      tag: 'OMEGA',
      respect: '4,850,290',
      capacity: 100,
      members: 96,
      vacancies: 4,
      leader: 'ApexWarlord [104921]',
      coLeader: 'ShadowBroker [2841920]',
      tier: 'Diamond Tier (Ranked Warring)',
      focusCategory: 'WAR',
      status: 'LEADER VERIFIED — ACTIVELY RECRUITING',
      statusType: 'verified',
      lastSynced: '12m ago',
      warExpectation: 'Mandatory Ranked Wars',
      chainReq: '100+ hits on 10k chains',
      ocExpectation: 'PA Team (Political Assassination 2.0)',
      benefits: 'Full Armory Access, Free Energy Cans, War Pay Out',
    },
    {
      id: 29410,
      name: 'Underworld Cartel',
      tag: 'UWC',
      respect: '3,100,000',
      capacity: 90,
      members: 86,
      vacancies: 4,
      leader: 'SyndicateDon [55210]',
      coLeader: 'CrimeBoss [18492]',
      tier: 'Dedicated Organized Crime 2.0 Syndicate',
      focusCategory: 'OC',
      status: 'LEADER VERIFIED — ACTIVELY RECRUITING',
      statusType: 'verified',
      lastSynced: '8m ago',
      warExpectation: 'Casual / Low Requirement',
      chainReq: 'Optional',
      ocExpectation: 'Daily High-Yield OC 2.0 planning, max crime exp splits',
      benefits: 'Full Crime Armory, Max Crime Success Perks',
    },
    {
      id: 8840,
      name: 'Phoenix Resurgence',
      tag: 'PHX',
      respect: '2,140,800',
      capacity: 90,
      members: 87,
      vacancies: 3,
      leader: 'FireBrand [840192]',
      coLeader: 'AshMaker [719201]',
      tier: 'Platinum Tier (Warring & Training)',
      focusCategory: 'WAR',
      status: 'TORN DISCOVERED',
      statusType: 'discovered',
      lastSynced: '24m ago',
      warExpectation: 'Bi-weekly Ranked Wars',
      chainReq: '50 hits per chain',
      ocExpectation: 'BMB / Plane Hijacking',
      benefits: 'Gym Gains Booster, Steadfast Perks',
    },
    {
      id: 19402,
      name: 'St. Jude Emergency Responders',
      tag: 'SJER',
      respect: '1,200,450',
      capacity: 80,
      members: 78,
      vacancies: 2,
      leader: 'DrNeedles [39201]',
      coLeader: 'MedicOne [94029]',
      tier: 'Dedicated Revive Specialist',
      focusCategory: 'REVIVE',
      status: 'TORN DISCOVERED',
      statusType: 'discovered',
      lastSynced: '5m ago',
      warExpectation: 'No Wars (Reviving Contracts Only)',
      chainReq: 'Optional',
      ocExpectation: 'Casual Crime slots',
      benefits: '75+ Skill Revives, Xanax Supplied for Reviving',
    },
  ];

  const filtered = factions.filter((f) => {
    if (tierFilter === 'WAR' && f.focusCategory !== 'WAR') return false;
    if (tierFilter === 'REVIVE' && f.focusCategory !== 'REVIVE') return false;
    if (tierFilter === 'OC' && f.focusCategory !== 'OC') return false;
    if (statusFilter === 'OPEN' && f.vacancies === 0) return false;
    if (statusFilter === 'VERIFIED' && f.statusType !== 'verified') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Torn API v2 Discovery Engine
            </div>
            <h1 className="text-3xl font-black text-white">Torn Faction Directory</h1>
            <p className="text-sm text-slate-400 mt-1">
              Discovered and leader-verified factions, ranked war, reviving, and dedicated Organized Crime (OC) focuses.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Faction Focuses</option>
              <option value="OC">Organized Crime (OC) Only</option>
              <option value="WAR">Ranked Warring Only</option>
              <option value="REVIVE">Reviving Only</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open Positions Detected</option>
              <option value="VERIFIED">Leader Verified Only</option>
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
          {filtered.map((f) => (
            <div
              key={f.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    f.statusType === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : f.statusType === 'discovered'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {f.status}
                </span>
                <span className="text-xs text-slate-500">Last checked: {f.lastSynced}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {f.name} <span className="text-amber-400 font-mono text-sm">[{f.tag}]</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">{f.tier} • Leader: {f.leader}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                <div>
                  <div className="text-xs text-slate-500">Respect</div>
                  <div className="text-sm font-bold text-amber-400">{f.respect}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Roster</div>
                  <div className="text-sm font-bold text-slate-200">{f.members} / {f.capacity}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Open Spots</div>
                  <div className={`text-sm font-bold ${f.vacancies > 0 ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {f.vacancies > 0 ? `${f.vacancies} Open` : 'Full'}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">OC 2.0 Focus:</span>
                  <span className="text-amber-400 font-semibold">{f.ocExpectation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">War Expectation:</span>
                  <span className="text-slate-200">{f.warExpectation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Perks & Benefits:</span>
                  <span className="text-emerald-400 text-right">{f.benefits}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <a
                  href={`https://www.torn.com/factions.php?step=profile&ID=${f.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Torn Faction Page ↗
                </a>
                {f.vacancies > 0 && (
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20">
                    Apply / Contact Leader
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
