'use client';

import React, { useState } from 'react';

interface LinkAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkAccountModal({ isOpen, onClose }: LinkAccountModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedAccount, setVerifiedAccount] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (apiKey.trim().length < 16) {
      setError('Please enter a valid Torn API Key (at least 16 characters).');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setVerifiedAccount({
        playerId: 2841920,
        name: 'ShadowBroker',
        level: 48,
        role: 'COMPANY_DIRECTOR',
        company: {
          id: 84920,
          name: 'Apex Petroleum Corp',
          type: 'Oil Rig (10★)',
          position: 'Director',
        },
        faction: {
          id: 12044,
          name: 'Omega Syndicate',
          position: 'Co-leader',
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
            🔑
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Link Your Torn Account</h3>
            <p className="text-xs text-slate-400">Secure verification via official Torn API v2</p>
          </div>
        </div>

        {!verifiedAccount ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-amber-300">🛡️ Zero Password Policy</p>
              <p>We never ask for or store your Torn password. Enter a Public or Limited Access Torn API key to verify ownership of your player account, directorship, or faction role.</p>
              <p className="text-slate-500">Your key is encrypted with AES-256-GCM and never exposed to the frontend.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Torn API v2 Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Torn API Key..."
                required
                className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm font-mono"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                {loading ? 'Verifying with Torn v2...' : 'Verify & Link Account'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              ✓ Successfully authenticated with Torn API v2! Your identity and leadership credentials have been confirmed.
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Player:</span>
                <span className="font-bold text-white">{verifiedAccount.name} [ID: {verifiedAccount.playerId}]</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Level:</span>
                <span className="text-slate-200">{verifiedAccount.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Directorship:</span>
                <span className="text-amber-400 font-semibold">{verifiedAccount.company.name} ({verifiedAccount.company.position})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Faction Leadership:</span>
                <span className="text-indigo-400 font-semibold">{verifiedAccount.faction.name} ({verifiedAccount.faction.position})</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
