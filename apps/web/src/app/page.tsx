'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LinkAccountModal } from '@/components/LinkAccountModal';
import { MatchModal } from '@/components/MatchModal';

export default function Home() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedJobForMatch, setSelectedJobForMatch] = useState<any>(null);
  const [activeUser, setActiveUser] = useState<any>(null);

  // Live recruiting companies streaming from left
  const STREAMING_COMPANIES = [
    { name: 'Apex Petroleum Corp', type: '10★ Oil Rig', vacancies: 2, pay: '$2.5M/day', verified: true },
    { name: 'Sugar Rush Delights', type: '10★ Sweet Shop', vacancies: 1, pay: '$1.8M/day', verified: true },
    { name: 'Titan Freight Global', type: '7★ Logistics', vacancies: 3, pay: '$1.2M/day', verified: false },
    { name: 'Adult Toyland Empire', type: '10★ Adult Novelties', vacancies: 2, pay: '$2.0M/day', verified: true },
    { name: 'Velvet Lounge Club', type: '10★ Pub', vacancies: 1, pay: '$1.5M/day', verified: false },
    { name: 'Cybernetic Security', type: '8★ Cyber Security', vacancies: 4, pay: '$1.9M/day', verified: true },
  ];

  // Live recruiting factions streaming from right
  const STREAMING_FACTIONS = [
    { name: 'Omega Syndicate', tag: 'OMEGA', respect: '4.85M', focus: 'Diamond Ranked Warring', spots: 4 },
    { name: 'Phoenix Resurgence', tag: 'PHX', respect: '2.14M', focus: 'Platinum Ranked Warring', spots: 3 },
    { name: 'St. Jude Emergency', tag: 'SJER', respect: '1.20M', focus: 'Elite 75+ Revive Unit', spots: 2 },
    { name: 'Vanguard Legends', tag: 'VNG', respect: '3.60M', focus: 'Chain & Gym Boosting', spots: 5 },
    { name: 'Nightshade Mercenaries', tag: 'NSM', respect: '1.95M', focus: 'Contract Warring', spots: 1 },
  ];

  const POPULAR_CATEGORIES = [
    { name: 'Oil Rig & Heavy Industry', icon: '⚡' },
    { name: 'Adult Novelties & Erotica', icon: '🔥' },
    { name: 'Sweet Shop & Consumables', icon: '🍬' },
    { name: 'Logistics & Mining', icon: '🚚' },
    { name: 'Property & Real Estate', icon: '🏢' },
    { name: 'Fitness, Gyms & Health', icon: '💪' },
    { name: 'Ranked Warring Factions', icon: '⚔️' },
    { name: 'Reviving & Medical Factions', icon: '💉' },
    { name: 'Chain & Training Factions', icon: '🔗' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black overflow-x-hidden">
      {/* Top Utility Nav */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 bg-black flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:border-amber-500/50 transition-all">
                <Image
                  src="/logo.jpg"
                  alt="Torn Platform Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                  TORN<span className="text-amber-400">HUB</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  Recruitment & Market
                </span>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="/jobs" className="hover:text-amber-400 transition-colors">Find Jobs</a>
              <a href="/factions" className="hover:text-amber-400 transition-colors">Factions</a>
              <a href="/companies" className="hover:text-amber-400 transition-colors">Company Directory</a>
              <a href="/marketplace" className="hover:text-amber-400 transition-colors">Marketplace</a>
              <a href="/profile" className="hover:text-amber-400 transition-colors">My Profile</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {activeUser ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">{activeUser.player.name}</span>
                <span className="text-slate-400 font-mono">[{activeUser.player.playerId}]</span>
              </div>
            ) : (
              <button
                onClick={() => setIsLinkModalOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                Link Torn Account
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Logo Watermark & Radial Glow */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(245,158,11,0.12),transparent_60%)] animate-pulse-glow" />
        
        {/* Soft Background City Silhouette/Logo Accent */}
        <div className="absolute -top-10 right-1/2 translate-x-1/2 opacity-5 pointer-events-none w-[700px] h-[350px]">
          <Image
            src="/logo.jpg"
            alt="City Backdrop"
            width={700}
            height={350}
            className="object-cover rounded-3xl"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Torn API v2 Live Discovery Stream
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Live Torn Recruitment &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
              Organization Discovery
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Live vacancies streaming in real time. Link your Torn API key to authenticate, auto-match your actual stats, and discover opportunities across the city.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsLinkModalOpen(true)}
              className="px-6 py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              {activeUser ? 'Torn Account Connected ✓' : 'Connect Your Torn Key Now'}
            </button>
            <a
              href="/companies/claim"
              className="px-6 py-3.5 rounded-xl font-bold border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-all"
            >
              Claim Company / Faction
            </a>
          </div>

          {/* Active Detected Affiliations Banner */}
          {activeUser && (
            <div className="mt-10 p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 max-w-3xl mx-auto text-left space-y-3 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live Affiliation & Work Stats Detected
                </span>
                <span className="text-xs text-slate-400 font-mono">Player ID: {activeUser.player.playerId}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Current Company</span>
                  <span className={activeUser.company.inCompany ? 'text-amber-300 font-bold text-sm block mt-0.5' : 'text-slate-400 font-medium block mt-0.5'}>
                    {activeUser.company.inCompany ? `${activeUser.company.companyName} (${activeUser.company.position})` : 'Unemployed'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Current Faction</span>
                  <span className={activeUser.faction.inFaction ? 'text-indigo-300 font-bold text-sm block mt-0.5' : 'text-rose-400 font-bold text-sm block mt-0.5'}>
                    {activeUser.faction.inFaction ? `${activeUser.faction.factionName} (${activeUser.faction.position})` : 'No Faction Joined'}
                  </span>
                </div>
              </div>

              {/* Suggestions */}
              {activeUser.suggestions && activeUser.suggestions.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Actionable Recommendations for You
                  </span>
                  {activeUser.suggestions.map((sug: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div>
                        <p className="font-bold text-white">{sug.title}</p>
                        <p className="text-[11px] text-slate-400">{sug.description}</p>
                      </div>
                      <a href={sug.link} className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap">
                        {sug.actionText} →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* COOL ANIMATION: Live Streaming Recruiting Companies (Left to Right) */}
      <section className="py-6 border-b border-slate-800/80 bg-slate-950/80 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Live Recruiting Companies Streaming In (Left →)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Hover to pause</span>
        </div>

        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div className="animate-marquee-left flex gap-4">
            {[...STREAMING_COMPANIES, ...STREAMING_COMPANIES].map((comp, idx) => (
              <div
                key={idx}
                className="w-72 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between shrink-0 shadow-lg cursor-pointer"
                onClick={() => setSelectedJobForMatch({ title: 'Available Position', companyName: comp.name })}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    comp.verified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {comp.verified ? 'DIRECTOR VERIFIED' : 'TORN DISCOVERED'}
                  </span>
                  <span className="text-emerald-400 font-bold">{comp.pay}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm truncate">{comp.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{comp.type}</p>
                </div>
                <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-slate-800/80">
                  <span className="text-amber-300 font-semibold">{comp.vacancies} Positions Open</span>
                  <span className="text-xs text-slate-400 font-bold hover:text-white">Match Stats →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COOL ANIMATION: Live Streaming Recruiting Factions (Right to Left) */}
      <section className="py-6 border-b border-slate-800/80 bg-slate-900/30 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Live Recruiting Factions Streaming In (← Right)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Hover to pause</span>
        </div>

        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div className="animate-marquee-right flex gap-4">
            {[...STREAMING_FACTIONS, ...STREAMING_FACTIONS].map((fac, idx) => (
              <div
                key={idx}
                className="w-72 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between shrink-0 shadow-lg cursor-pointer"
                onClick={() => setSelectedJobForMatch({ title: fac.focus, companyName: fac.name })}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    {fac.tag} • {fac.respect} RESPECT
                  </span>
                  <span className="text-amber-300 font-semibold">{fac.spots} Spots</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm truncate">{fac.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{fac.focus}</p>
                </div>
                <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Ranked Warring</span>
                  <span className="text-xs text-indigo-300 font-bold hover:text-white">View Faction →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">Explore Torn Categories</h2>
            <p className="text-sm text-slate-400 mt-1">Live opportunities categorized across company industries and faction focuses</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_CATEGORIES.map((cat, idx) => (
            <a
              key={idx}
              href={cat.name.includes('Faction') ? '/factions' : '/companies'}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900 transition-all flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-amber-500/5"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{cat.icon}</span>
                <h4 className="font-bold text-slate-200 group-hover:text-white text-sm">{cat.name}</h4>
              </div>
              <span className="text-slate-600 group-hover:text-amber-400 transition-colors">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Modals */}
      <LinkAccountModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onVerified={(data) => setActiveUser(data)}
      />

      {selectedJobForMatch && (
        <MatchModal
          isOpen={!!selectedJobForMatch}
          onClose={() => setSelectedJobForMatch(null)}
          jobTitle={selectedJobForMatch.title}
          companyName={selectedJobForMatch.companyName}
          userStats={
            activeUser
              ? {
                  level: activeUser.player.level,
                  manual: activeUser.player.manualLabor,
                  intelligence: activeUser.player.intelligence,
                  endurance: activeUser.player.endurance,
                }
              : undefined
          }
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500">
        <p>Torn Recruitment & Marketplace Platform is an external tool and is not affiliated with or endorsed by Torn City.</p>
        <p className="mt-2">Zero stored passwords. Real-time verification via official Torn API v2.</p>
      </footer>
    </div>
  );
}
