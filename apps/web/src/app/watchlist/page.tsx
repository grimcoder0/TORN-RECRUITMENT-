'use client';

import React, { useState } from 'react';

export default function WatchlistPage() {
  const [filter, setFilter] = useState<'ALL' | 'COMPANIES' | 'FACTIONS' | 'MARKETPLACE'>('ALL');

  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 'w-1',
      type: 'COMPANY',
      title: 'Apex Petroleum Corp',
      detail: '10★ Oil Rig • 18/20 Employees',
      lastEvent: '2 Open Positions Detected by Torn sync engine',
      eventTime: '15m ago',
      link: '/companies',
      activeAlerts: true,
    },
    {
      id: 'w-2',
      type: 'FACTION',
      title: 'Omega Syndicate [OMEGA]',
      detail: 'Diamond Tier • 4.85M Respect • 96/100 Members',
      lastEvent: 'Recruitment status updated to ACTIVELY RECRUITING',
      eventTime: '1h ago',
      link: '/factions',
      activeAlerts: true,
    },
    {
      id: 'w-3',
      type: 'MARKETPLACE',
      title: 'Phoenix Resurgence [PHX]',
      detail: 'Platinum Faction Sale • Asking: $1.2B',
      lastEvent: 'Price reduced from $1.35B to $1.2B (-$150M)',
      eventTime: '4h ago',
      link: '/marketplace',
      activeAlerts: true,
    },
    {
      id: 'w-4',
      type: 'COMPANY',
      title: 'Sugar Rush Delights',
      detail: '10★ Sweet Shop • 14/15 Employees',
      lastEvent: 'New Rotational Training program posted by director',
      eventTime: 'Yesterday',
      link: '/jobs',
      activeAlerts: false,
    },
  ]);

  const toggleAlert = (id: string) => {
    setWatchlistItems(
      watchlistItems.map((item) =>
        item.id === id ? { ...item, activeAlerts: !item.activeAlerts } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setWatchlistItems(watchlistItems.filter((item) => item.id !== id));
  };

  const filtered = watchlistItems.filter((item) => {
    if (filter === 'COMPANIES' && item.type !== 'COMPANY') return false;
    if (filter === 'FACTIONS' && item.type !== 'FACTION') return false;
    if (filter === 'MARKETPLACE' && item.type !== 'MARKETPLACE') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-2">
              Entity Monitoring & Vacancy Tracking (Section 23)
            </div>
            <h1 className="text-3xl font-black text-white">Your Watchlist</h1>
            <p className="text-sm text-slate-400 mt-1">
              Receive real-time notifications whenever tracked companies open positions, factions change recruit status, or marketplace listings adjust prices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  filter === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('COMPANIES')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  filter === 'COMPANIES' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setFilter('FACTIONS')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  filter === 'FACTIONS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Factions
              </button>
              <button
                onClick={() => setFilter('MARKETPLACE')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  filter === 'MARKETPLACE' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Marketplace
              </button>
            </div>

            <a
              href="/"
              className="h-9 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Home
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-amber-400">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400">{item.detail}</p>
                <p className="text-xs text-emerald-400 pt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item.lastEvent} <span className="text-slate-500">({item.eventTime})</span>
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-center">
                <button
                  onClick={() => toggleAlert(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    item.activeAlerts
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {item.activeAlerts ? '🔔 Notifications Active' : '🔕 Muted'}
                </button>
                <a
                  href={item.link}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20"
                >
                  View Details →
                </a>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 text-xs"
                  title="Remove from watchlist"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
