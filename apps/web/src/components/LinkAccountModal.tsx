'use client';

import React, { useState } from 'react';

interface LinkAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: (data: any) => void;
}

export function LinkAccountModal({ isOpen, onClose, onVerified }: LinkAccountModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/torn/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || 'Failed to authenticate with Torn API.');
      }

      setVerifiedData(json.data);
      if (onVerified) onVerified(json.data);
    } catch (err: any) {
      setError(err.message || 'Network error verifying Torn account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
            🔑
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Live Torn API Verification</h3>
            <p className="text-xs text-slate-400">Direct lookup via official Torn API v2</p>
          </div>
        </div>

        {!verifiedData ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-amber-300">🛡️ Zero Password & Direct Live Verification</p>
              <p>
                Enter your Torn API key. We query Torn in real time to fetch your actual level, work stats, current company, and faction status.
              </p>
              <p className="text-slate-500">Your key is never stored in plain text and never exposed to the browser.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Your Torn API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Torn API Key (Public or Limited)..."
                required
                className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm font-mono"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Querying Torn API v2...' : 'Authenticate Live'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
              ✓ Authenticated with Torn! Live profile and affiliations detected.
            </div>

            {/* Live Player & Affiliations Card */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Player:</span>
                <span className="font-bold text-white">
                  {verifiedData.player.name} [ID: {verifiedData.player.playerId}] (Lvl {verifiedData.player.level})
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Actual Work Stats:</span>
                <span className="font-mono text-slate-200">
                  {verifiedData.player.manualLabor.toLocaleString()} MAN • {verifiedData.player.intelligence.toLocaleString()} INT • {verifiedData.player.endurance.toLocaleString()} END
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Company Affiliation:</span>
                <span className={verifiedData.company.inCompany ? 'text-amber-300 font-semibold' : 'text-slate-500'}>
                  {verifiedData.company.inCompany
                    ? `${verifiedData.company.companyName} (${verifiedData.company.position})`
                    : 'Unemployed'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Faction Affiliation:</span>
                <span className={verifiedData.faction.inFaction ? 'text-indigo-300 font-semibold' : 'text-rose-400 font-semibold'}>
                  {verifiedData.faction.inFaction
                    ? `${verifiedData.faction.factionName} (${verifiedData.faction.position})`
                    : 'No Faction Joined'}
                </span>
              </div>
            </div>

            {/* Live Suggestions based on Affiliation */}
            {verifiedData.suggestions && verifiedData.suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Recommended Next Steps
                </h4>
                {verifiedData.suggestions.map((sug: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 text-xs flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-white">{sug.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sug.description}</p>
                    </div>
                    <a
                      href={sug.link}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] whitespace-nowrap"
                    >
                      {sug.actionText} →
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                Close & Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
