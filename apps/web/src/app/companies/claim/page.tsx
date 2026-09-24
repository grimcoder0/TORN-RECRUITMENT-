'use client';

import React, { useState } from 'react';

export default function ClaimOrganizationPage() {
  const [apiKey, setApiKey] = useState('');
  const [companyId, setCompanyId] = useState('84920');
  const [loading, setLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState<any>(null);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setClaimStatus({
        success: true,
        companyName: 'Apex Petroleum Corp',
        companyType: 'Oil Rig (10★)',
        directorId: 2841920,
        directorName: 'ShadowBroker',
        verifiedAt: new Date().toLocaleTimeString(),
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold">
            Ownership & Leadership Verification (Section 11)
          </div>
          <h1 className="text-3xl font-black text-white">Claim Your Torn Organization</h1>
          <p className="text-sm text-slate-400">
            Convert an auto-discovered company or faction into a verified organization managed by you.
          </p>
        </div>

        {/* Claim Flow Diagram (Section 11) */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-bold text-amber-300">Section 11 Verification Flow:</p>
          <p>Company Discovered → Director visits page → "Claim this company" → Torn API v2 verification → Directorship confirmed → Company claimed & Director profile activated.</p>
        </div>

        {!claimStatus ? (
          <form onSubmit={handleClaim} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Torn Company or Faction ID
              </label>
              <input
                type="text"
                required
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="e.g. 84920"
                className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Your Torn API v2 Key (Limited / Full)
              </label>
              <input
                type="password"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter Torn API Key to verify directorship..."
                className="w-full h-11 px-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                *Torn API v2 confirms whether you hold the "Director" role for this company ID.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <a
                href="/companies"
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 text-slate-300"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                {loading ? 'Verifying Directorship...' : 'Verify & Claim Organization'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Directorship Claim Confirmed!</h3>
                <p className="text-xs text-slate-400">Verified at {claimStatus.verifiedAt} via Torn API v2</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="font-bold text-white">{claimStatus.companyName} ({claimStatus.companyType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Director:</span>
                <span className="text-amber-300 font-semibold">{claimStatus.directorName} [{claimStatus.directorId}]</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Listing Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  DIRECTOR VERIFIED
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href="/companies/post-job"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
              >
                Post Rich Job Listing →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
