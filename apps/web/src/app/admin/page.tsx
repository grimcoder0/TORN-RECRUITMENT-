'use client';

import React, { useState } from 'react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'MODERATION' | 'DISCOVERY' | 'AUDIT'>('OVERVIEW');

  const reports = [
    {
      id: 'rep-01',
      targetType: 'MARKETPLACE LISTING',
      targetName: 'Suspicious 10★ Oil Rig Sale',
      reportedBy: 'VigilantPlayer [94012]',
      reason: 'Possible wash offer or unverified directorship claim',
      status: 'OPEN',
      time: '25m ago',
    },
    {
      id: 'rep-02',
      targetType: 'USER MESSAGE',
      targetName: 'Player ID [449102]',
      reportedBy: 'SugarRush [19401]',
      reason: 'Soliciting external payments outside Torn mechanics',
      status: 'UNDER_REVIEW',
      time: '1h ago',
    },
  ];

  const discoveryJobs = [
    {
      id: 'job-comp-sync',
      name: 'Company Vacancy Scan (Torn API v2)',
      frequency: 'Every 5 minutes',
      lastRun: '1m ago',
      status: 'HEALTHY',
      recordsProcessed: 420,
      openingsFound: 14,
    },
    {
      id: 'job-fact-sync',
      name: 'Faction Roster & Capacity Ingestion',
      frequency: 'Every 15 minutes',
      lastRun: '8m ago',
      status: 'HEALTHY',
      recordsProcessed: 180,
      openingsFound: 8,
    },
    {
      id: 'job-stale-detector',
      name: 'Stale Opportunity Expiry Worker',
      frequency: 'Every 30 minutes',
      lastRun: '22m ago',
      status: 'HEALTHY',
      recordsProcessed: 95,
      openingsFound: 0,
    },
  ];

  const auditLogs = [
    {
      id: 'log-1',
      action: 'DIRECTOR_VERIFICATION_APPROVED',
      user: 'Admin (System)',
      resource: 'Company #84920 (Apex Petroleum Corp)',
      time: '12m ago',
    },
    {
      id: 'log-2',
      action: 'LISTING_PRICE_CHANGED',
      user: 'ShadowBroker [2841920]',
      resource: 'Listing #list-comp-101 ($900M -> $850M)',
      time: '45m ago',
    },
    {
      id: 'log-3',
      action: 'TORN_API_KEY_LINKED',
      user: 'CandyQueen [1940121]',
      resource: 'AES-256 Encrypted Credential Stored',
      time: '2h ago',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-semibold mb-2">
              🛡️ Super Admin & Moderation Panel
            </div>
            <h1 className="text-3xl font-black text-white">System Health & Moderation</h1>
            <p className="text-sm text-slate-400 mt-1">
              Section 30 compliance: Audit logs, Torn API v2 rate-limit health, discovery jobs, and anti-scam triage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs">
              <button
                onClick={() => setActiveTab('OVERVIEW')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeTab === 'OVERVIEW' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('MODERATION')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeTab === 'MODERATION' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Reports ({reports.length})
              </button>
              <button
                onClick={() => setActiveTab('DISCOVERY')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeTab === 'DISCOVERY' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Discovery Jobs
              </button>
              <button
                onClick={() => setActiveTab('AUDIT')}
                className={`px-3 py-1.5 rounded-lg font-semibold ${
                  activeTab === 'AUDIT' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Audit Logs
              </button>
            </div>

            <a
              href="/"
              className="h-9 px-4 flex items-center rounded-xl text-xs font-semibold border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300"
            >
              ← Platform Home
            </a>
          </div>
        </div>

        {/* API Health Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Torn API v2 Gateway</span>
            <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </div>
            <p className="text-[11px] text-slate-500">Latency: 142ms • Rate Limit: 100/min</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Token Bucket Quota</span>
            <div className="text-2xl font-black text-white">
              72 / 90 <span className="text-xs font-normal text-slate-400">safe max</span>
            </div>
            <p className="text-[11px] text-slate-500">Zero rate-limit penalties logged</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Auto-Discovered Vacancies</span>
            <div className="text-2xl font-black text-amber-400">412 Positions</div>
            <p className="text-[11px] text-slate-500">Fresh within last 15 minutes</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Open Reports</span>
            <div className="text-2xl font-black text-rose-400">2 Items</div>
            <p className="text-[11px] text-slate-500">Triage response target: &lt; 2 hrs</p>
          </div>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Moderation Queue</h3>
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{rep.targetName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-semibold">
                        {rep.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{rep.reason}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      <span>Reported by: {rep.reportedBy}</span>
                      <span>{rep.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Discovery Engine Sync Status</h3>
              <div className="space-y-3">
                {discoveryJobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{job.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                        {job.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="p-2 rounded-lg bg-slate-900">
                        <div className="text-[10px] text-slate-500">Processed</div>
                        <div className="font-bold text-slate-200">{job.recordsProcessed}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900">
                        <div className="text-[10px] text-slate-500">Openings</div>
                        <div className="font-bold text-amber-400">{job.openingsFound}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900">
                        <div className="text-[10px] text-slate-500">Last Synced</div>
                        <div className="font-bold text-slate-300">{job.lastRun}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Moderation Tab */}
        {activeTab === 'MODERATION' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Full Moderation Queue</h3>
            <div className="space-y-3">
              {reports.map((rep) => (
                <div key={rep.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-300">
                        {rep.targetType}
                      </span>
                      <h4 className="font-bold text-white text-sm">{rep.targetName}</h4>
                    </div>
                    <p className="text-xs text-slate-300">{rep.reason}</p>
                    <p className="text-[11px] text-slate-500">Reported by {rep.reportedBy} • {rep.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300">
                      Dismiss
                    </button>
                    <button className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-sm shadow-rose-500/20">
                      Resolve & Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discovery Tab */}
        {activeTab === 'DISCOVERY' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Scheduled Discovery Jobs</h3>
            <div className="space-y-3">
              {discoveryJobs.map((j) => (
                <div key={j.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{j.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Cadence: {j.frequency} • Last cycle: {j.lastRun}</p>
                    <p className="text-xs text-emerald-400 mt-1">Processed {j.recordsProcessed} organizations, found {j.openingsFound} live openings</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20">
                    Trigger Manual Ingestion Now ⚡
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'AUDIT' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Immutable Platform Audit Trail (Section 30)</h3>
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <span className="font-mono text-amber-400 font-semibold">{log.action}</span>
                    <p className="text-slate-300">{log.resource}</p>
                  </div>
                  <div className="text-right text-slate-400 text-[11px]">
                    <div>{log.user}</div>
                    <div className="text-slate-500 text-[10px]">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
