'use client';

import React, { useState } from 'react';
import { LinkAccountModal } from '@/components/LinkAccountModal';
import { MatchModal } from '@/components/MatchModal';

const POPULAR_CATEGORIES = [
  { name: 'Oil Rig & Heavy Industry', count: 14, icon: '⚡' },
  { name: 'Adult Novelties & Erotica', count: 28, icon: '🔥' },
  { name: 'Sweet Shop & Consumables', count: 42, icon: '🍬' },
  { name: 'Logistics & Mining', count: 19, icon: '🚚' },
  { name: 'Property & Real Estate', count: 11, icon: '🏢' },
  { name: 'Fitness, Gyms & Health', count: 35, icon: '💪' },
  { name: 'Ranked Warring Factions', count: 62, icon: '⚔️' },
  { name: 'Reviving & Medical Factions', count: 15, icon: '💉' },
  { name: 'Chain & Training Factions', count: 88, icon: '🔗' },
];

const DISCOVERED_OPPORTUNITIES = [
  {
    id: 1,
    title: 'Offshore Drilling Specialist',
    companyName: 'Apex Petroleum Corp',
    companyType: 'Oil Rig',
    stars: 10,
    openings: 2,
    salary: '$2,500,000 / day',
    training: 'Rotational Training',
    status: 'TORN DISCOVERED',
    statusType: 'discovered',
    lastChecked: '4 mins ago',
    requirements: ['Manual: 45k+', 'Int: 30k+', 'End: 60k+'],
  },
  {
    id: 2,
    title: 'Director Confirmed Recruiter',
    companyName: 'Sugar Rush Delights',
    companyType: 'Sweet Shop',
    stars: 10,
    openings: 1,
    salary: '$1,800,000 / day',
    training: 'Free Training (Daily)',
    status: 'DIRECTOR VERIFIED — ACTIVELY RECRUITING',
    statusType: 'verified',
    lastChecked: 'Just now',
    requirements: ['High Energy', 'Active Daily', 'Min Level 25'],
  },
  {
    id: 3,
    title: 'Ranked War Specialist',
    companyName: 'Omega Syndicate',
    companyType: 'Faction (Diamond Tier)',
    stars: 5,
    openings: 4,
    salary: 'War Pay + Cache Cuts',
    training: 'Full Armory & Free Cans',
    status: 'LEADER VERIFIED',
    statusType: 'verified',
    lastChecked: '12 mins ago',
    requirements: ['Battle Stats: 500m+', 'Active on Discord', 'Energy Can Use'],
  },
];

export default function Home() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedJobForMatch, setSelectedJobForMatch] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Top Utility Nav */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20">
                T
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                TORN<span className="text-amber-400">HUB</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#jobs" className="hover:text-amber-400 transition-colors">Find Jobs</a>
              <a href="#factions" className="hover:text-amber-400 transition-colors">Factions</a>
              <a href="#companies" className="hover:text-amber-400 transition-colors">Company Directory</a>
              <a href="#marketplace" className="hover:text-amber-400 transition-colors">Marketplace</a>
              <a href="#matching" className="hover:text-amber-400 transition-colors">Auto-Match</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLinkModalOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLinkModalOpen(true)}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Link Torn Account
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Torn API v2 Live Discovery Engine Active
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Discover Torn Companies & Factions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Before They Even Advertise
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Our engine scans permitted Torn data to automatically detect open positions, employee vacancies, and faction opportunities. No waiting for directors to manually post.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#search" className="px-6 py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all">
              Browse Discovered Jobs
            </a>
            <button
              onClick={() => setIsLinkModalOpen(true)}
              className="px-6 py-3.5 rounded-xl font-bold border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-all cursor-pointer"
            >
              Claim Your Organization
            </button>
          </div>

          {/* 3-Step Guided Bar (Jobmonster Inspiration) */}
          <div className="mt-16 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/70 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur">
            <div
              onClick={() => setIsLinkModalOpen(true)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-3 border border-amber-500/30 group-hover:scale-105 transition-transform">
                1
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Link Torn Account</h3>
              <p className="text-xs text-slate-400 mt-1">Instant Torn API v2 verification. Zero passwords requested or stored.</p>
            </div>
            <div
              onClick={() => setSelectedJobForMatch(DISCOVERED_OPPORTUNITIES[0])}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-3 border border-amber-500/30 group-hover:scale-105 transition-transform">
                2
              </div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Transparent Matching</h3>
              <p className="text-xs text-slate-400 mt-1">Match work stats, preferred salaries, and rotational training stages.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-3 border border-amber-500/30">
                3
              </div>
              <h3 className="font-bold text-white text-sm">Apply & Marketplace</h3>
              <p className="text-xs text-slate-400 mt-1">Direct Torn application paths and verified company/faction sales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Search Bar */}
      <section id="search" className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search position (e.g. Director, Trainer, EE, Oil Rig...)"
              className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>
          <div className="w-full md:w-56">
            <select className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 text-sm">
              <option value="">All Company Types</option>
              <option value="oil">Oil Rig (10★)</option>
              <option value="sweet">Sweet Shop (10★)</option>
              <option value="an">Adult Novelties (10★)</option>
              <option value="pub">Pub / Restaurant</option>
            </select>
          </div>
          <div className="w-full md:w-56">
            <select className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 text-sm">
              <option value="">Training Preference</option>
              <option value="free">Free Training Only</option>
              <option value="rotational">Rotational Training</option>
              <option value="paid">Paid Training</option>
            </select>
          </div>
          <button className="h-12 px-8 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all text-sm whitespace-nowrap cursor-pointer">
            Search Jobs
          </button>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">Popular Torn Categories</h2>
            <p className="text-sm text-slate-400 mt-1">Live opportunities detected across company industries and faction tiers</p>
          </div>
          <a href="#categories" className="text-amber-400 hover:text-amber-300 font-semibold text-sm">
            View All Categories →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-200 group-hover:text-white text-sm">{cat.name}</h4>
                  <span className="text-xs text-slate-400 font-medium">{cat.count} Openings detected</span>
                </div>
              </div>
              <span className="text-slate-600 group-hover:text-amber-400 transition-colors">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Metric Counters */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-white">412</div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">Open Jobs Detected</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white">186</div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">Faction Openings</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white">94</div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">Verified Directors</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white">1,240</div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">Matched Candidates</div>
          </div>
        </div>
      </section>

      {/* Featured / Discovered Opportunities Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">Detected Opportunities & Verified Postings</h2>
            <p className="text-sm text-slate-400 mt-1">Distinguishing automatic Torn data signals from confirmed director listings</p>
          </div>
        </div>

        <div className="space-y-4">
          {DISCOVERED_OPPORTUNITIES.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      item.statusType === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs text-slate-500">Last checked: {item.lastChecked}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  <span className="font-semibold text-amber-300">{item.companyName}</span>
                  <span>•</span>
                  <span>{item.companyType} ({'★'.repeat(item.stars)})</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{item.salary}</span>
                  <span>•</span>
                  <span>{item.training}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.requirements.map((req, rIdx) => (
                    <span key={rIdx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-center">
                <button
                  onClick={() => setSelectedJobForMatch(item)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
                >
                  View Match & Stats
                </button>
                <button
                  onClick={() => setSelectedJobForMatch(item)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Express Interest
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <LinkAccountModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      />

      {selectedJobForMatch && (
        <MatchModal
          isOpen={!!selectedJobForMatch}
          onClose={() => setSelectedJobForMatch(null)}
          jobTitle={selectedJobForMatch.title}
          companyName={selectedJobForMatch.companyName}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
        <p>Torn Recruitment & Marketplace Platform is an external tool and is not affiliated with or endorsed by Torn City.</p>
        <p className="mt-2">Zero custodial payments. Zero stored passwords. Powered by official Torn API v2 integration.</p>
      </footer>
    </div>
  );
}
