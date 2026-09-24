'use client';

import React, { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'WORKSTATS' | 'ROLES'>('PROFILE');

  const [profile, setProfile] = useState({
    name: 'ShadowBroker',
    playerId: 2841920,
    level: 48,
    rank: 'Mastermind',
    age: '1,420 days',
    company: 'Apex Petroleum Corp (Director)',
    faction: 'Omega Syndicate [OMEGA] (Co-leader)',
    manualLabor: 52400,
    intelligence: 38200,
    endurance: 65100,
    desiredSalary: 2500000,
    preferredTraining: 'ROTATIONAL_TRAINING',
    lookingForJob: false,
    lookingForFaction: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-2">
              Verified Torn Identity (Torn API v2)
            </div>
            <h1 className="text-3xl font-black text-white">{profile.name} [{profile.playerId}]</h1>
            <p className="text-sm text-slate-400 mt-1">
              Level {profile.level} • {profile.rank} • Age {profile.age}
            </p>
          </div>

          <a
            href="/"
            className="h-10 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
          >
            ← Back to Home
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 w-fit text-xs">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'PROFILE' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Identity & Roles
          </button>
          <button
            onClick={() => setActiveTab('WORKSTATS')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'WORKSTATS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matching Preferences & Stats
          </button>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            ✓ Profile and matching preferences updated successfully!
          </div>
        )}

        {activeTab === 'PROFILE' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Verified Organizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block">Company Role</span>
                  <span className="text-sm font-bold text-white block mt-1">{profile.company}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-2 inline-block">
                    ✓ DIRECTOR VERIFIED
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-xs text-slate-500 block">Faction Role</span>
                  <span className="text-sm font-bold text-white block mt-1">{profile.faction}</span>
                  <span className="text-[10px] text-indigo-400 font-semibold mt-2 inline-block">
                    ✓ CO-LEADER VERIFIED
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Torn API Credential Status</h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Key Access Level:</span>
                  <span className="text-slate-200 font-semibold">Limited Access (Permitted)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Encryption Method:</span>
                  <span className="text-amber-400 font-mono font-semibold">AES-256-GCM at Rest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Synced with Torn v2:</span>
                  <span className="text-slate-300">Just now</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'WORKSTATS' && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">Work Stats (Auto-Evaluated in Matching Engine)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Manual Labor</label>
                  <input
                    type="number"
                    value={profile.manualLabor}
                    onChange={(e) => setProfile({ ...profile, manualLabor: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Intelligence</label>
                  <input
                    type="number"
                    value={profile.intelligence}
                    onChange={(e) => setProfile({ ...profile, intelligence: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Endurance</label>
                  <input
                    type="number"
                    value={profile.endurance}
                    onChange={(e) => setProfile({ ...profile, endurance: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Minimum Desired Salary ($ / Day)</label>
                  <input
                    type="number"
                    step="100000"
                    value={profile.desiredSalary}
                    onChange={(e) => setProfile({ ...profile, desiredSalary: Number(e.target.value) })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Training Program</label>
                  <select
                    value={profile.preferredTraining}
                    onChange={(e) => setProfile({ ...profile, preferredTraining: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="ROTATIONAL_TRAINING">Rotational Training (Multi-Stage)</option>
                    <option value="FREE_TRAINING">Free Training Only</option>
                    <option value="PAID_TRAINING">Paid Training</option>
                    <option value="NO_TRAINING">No Training Needed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
              >
                Save Matching Preferences
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
